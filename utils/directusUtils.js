import "dotenv/config";
import { createDirectus, staticToken, rest, readItems } from "@directus/sdk";

const directus = createDirectus(process.env.DIRECTUS_URL || "")
  .with(staticToken(process.env.DIRECTUS_SERVER_TOKEN || ""))
  .with(rest());

/**
 * Takes in the response object from Directus, traverses through the nodes and removoes the extra keys.
 */
function TrimDirectusObj(
  obj,
  fieldsToRemove = [
    "sort",
    "user_created",
    "date_created",
    "user_updated",
    "date_updated",
    "entry_title",
  ]
) {
  if (Array.isArray(obj)) {
    // If it's an array, recursively process each element
    return obj.map((item) => TrimDirectusObj(item, fieldsToRemove));
  } else if (obj !== null && typeof obj === "object") {
    // If it's an object, recursively process its keys
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (!fieldsToRemove.includes(key)) {
        acc[key] = TrimDirectusObj(value, fieldsToRemove);
      }
      return acc;
    }, {});
  }
  // For primitives, just return the value
  return obj;
}

export { directus, readItems, TrimDirectusObj };
