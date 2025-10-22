import "dotenv/config";
import fs from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createDirectus, staticToken, rest, readItems } from "@directus/sdk";

export const directus = createDirectus(process.env.DIRECTUS_URL || "")
  .with(staticToken(process.env.DIRECTUS_SERVER_TOKEN || ""))
  .with(rest());

// ✅ Recreate __dirname and __filename in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataPath = resolve(__dirname, "data");

const createRouteRules = async () => {
  try {
    if (process.env.NUXT_ENVIRONMENT !== "production") {
      console.log(
        `Building in env: ${process.env.NUXT_ENVIRONMENT}, skipping build the Route Rules.`
      );
      return;
    }

    console.log("Fetching Pages metadata...");
    const metaData = await directus.request(
      readItems("seo_metadata", {
        fields: [
          "render_type",
          "max_age",
          { translations: ["languages_code", "slug"] },
        ],
      })
    );
    const routeRules = {};

    metaData.forEach((page) => {
      page.translations.forEach((translation) => {
        routeRules[translation.slug] = {};

        if (page.render_type !== "static") {
          routeRules[translation.slug]["ssr"] = true;
        } else if (!page.max_age) {
          routeRules[translation.slug]["isr"] = true;
        } else {
          routeRules[translation.slug]["isr"] = page.max_age;
        }
        console.log(
          "Generating route rule for slug:",
          translation.slug,
          routeRules[translation.slug]
        );
      });
    });

    const template = `/**
* NOTICE: This file is generated automatically using the ${__filename} script.
*/

export const routeRules = ${JSON.stringify(routeRules, null, 2)}`;

    fs.writeFileSync(`${dataPath}/routeRules.ts`, template);
  } catch (error) {
    console.error("Error creating Route Rules: ", error);
  }
};

await createRouteRules();
