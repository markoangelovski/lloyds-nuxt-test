import {
  createDirectus,
  staticToken,
  rest,
  readItem,
  readItems,
} from "@directus/sdk";

const directus = createDirectus(process.env.DIRECTUS_URL)
  .with(staticToken(process.env.DIRECTUS_SERVER_TOKEN))
  .with(rest());

export default defineNuxtPlugin(() => {
  return {
    provide: { directus, readItem, readItems },
  };
});
