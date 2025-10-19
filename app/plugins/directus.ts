import { readItem, readItems } from "@directus/sdk";

import { directus } from "../../utils/directusUtils";

export default defineNuxtPlugin(() => {
  return {
    provide: { directus, readItem, readItems },
  };
});
