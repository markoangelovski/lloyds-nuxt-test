<template>
  <PageBuilder v-if="page" :page="page" />
  <!-- {{ console.log("Page [/slug]: ", JSON.stringify(page, null, 2)) }} -->
</template>

<script setup>
import { TrimDirectusObj } from "~~/utils/directusUtils.js";
import { directusLangs } from "../../utils/data/directusLangs.js";
const { $directus, $readItems, $readItem } = useNuxtApp();

const { path, query } = useRoute();

const lang = path.split("/")[1];

const languages_code = directusLangs.includes(lang) ? lang : "en"; // default languages code for main lang pages

const pageFilter = computed(() => {
  let finalPath;

  if (path === "/") {
    // Match the homepage
    finalPath = "/";
  } else if (path.endsWith("/")) {
    // Remove any other trailing slash
    finalPath = path.slice(0, -1);
  } else {
    // Match any other page
    finalPath = path;
  }

  return finalPath;
});

const statusFilter =
  process.env.NODE_ENV === "production"
    ? { _eq: "published" }
    : { _in: ["draft", "published"] };

const fields = [
  "*",
  {
    seo_metadata: ["*", { translations: ["*"] }],
    components: [
      "*",
      {
        item: [
          "*",
          {
            block_content1: ["*"],
            image: [
              "*",
              {
                translations: ["*"],
              },
            ],
            cta: [
              "*",
              {
                internal_link: [
                  "*",
                  {
                    translations: ["*"],
                  },
                ],
                translations: ["*"],
              },
            ],
            translations: ["*"],
          },
        ],
      },
    ],
  },
];

const deep = {
  seo_metadata: {
    translations: {
      _filter: {
        languages_code: { _eq: languages_code },
      },
    },
  },
  components: {
    // https://github.com/directus/directus/issues/16715#issuecomment-1363870913
    "item:block_content1": {
      image: {
        translations: {
          _filter: {
            languages_code: { _eq: languages_code },
          },
        },
      },
      cta: {
        translations: {
          _filter: {
            languages_code: { _eq: languages_code },
          },
        },
        internal_link: {
          translations: {
            _filter: {
              languages_code: { _eq: languages_code },
            },
          },
        },
      },
      translations: {
        _filter: {
          languages_code: { _eq: languages_code },
        },
      },
    },
  },
};

const { data: page } = await useAsyncData(
  path,
  async () => {
    try {
      const page = await $directus.request(
        $readItems("page", {
          filter: {
            status: { _neq: "archived", ...statusFilter },
            seo_metadata: {
              translations: {
                slug: { _eq: unref(pageFilter) },
                languages_code: { _eq: languages_code },
              },
            },
          },
          fields,
          deep,
        })
      );

      if (Object(query).hasOwnProperty("version") && query.version !== "main") {
        const versionedPage = await $directus.request(
          $readItem("page", page[0].id, {
            version: query.version,
            fields,
            deep,
          })
        );

        if (versionedPage) return [versionedPage];
      }

      return page;
    } catch (error) {
      console.error(
        `Error fetching versioned page:\n path: ${path}\n query: ${JSON.stringify(
          query
        )} \n Error: `,
        error
      );
    }
  },
  {
    transform: (data) => {
      return TrimDirectusObj(data[0]);
    },
  }
);

const unrefPage = unref(page);

// Error Handling
if (!unrefPage) {
  throw createError({
    statusCode: 404,
    statusMessage: `Page Not Found`,
  });
}

useHead({
  htmlAttrs: {
    lang: languages_code,
  },
});

useSeoMeta({
  title: unrefPage.seo_metadata.translations[0].title,
  ogTitle: unrefPage.seo_metadata.translations[0].title,
  description: unrefPage.seo_metadata.translations[0].description,
  ogDescription: unrefPage.seo_metadata.translations[0].description,
  // ogImage: `${$directus.url}assets/${unrefPage.seo_metadata.mog_image.image}`,
  // twitterCard: `${$directus.url}assets/${unrefPage.seo_metadata.mog_image.image}`,
});
</script>
