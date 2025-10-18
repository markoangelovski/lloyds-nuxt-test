import fs from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { directus, readItems } from "./directusUtils.js";

// ✅ Recreate __dirname and __filename in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataPath = resolve(__dirname, "data", "directusLangs.ts");

try {
  console.log("Fetching Directus languages...");
  const data = await directus.request(readItems("languages"));

  const langs = JSON.stringify(data.map((lang) => lang.code));

  console.log(`Directus languages fetched: ${langs}`);

  const template = `/**
 * NOTICE: This file is generated automatically using the /utils/getDirectusLangs.js script.
 */

export const directusLangs = ${langs}`;

  fs.writeFileSync(dataPath, template);
} catch (error) {
  console.error("Error getting Directus languages: ", error);
}
