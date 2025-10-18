import "dotenv/config";
import { createDirectus, staticToken, rest, readItems } from "@directus/sdk";

const directus = createDirectus(process.env.DIRECTUS_URL || "")
  .with(staticToken(process.env.DIRECTUS_SERVER_TOKEN || ""))
  .with(rest());

export { directus, readItems };
