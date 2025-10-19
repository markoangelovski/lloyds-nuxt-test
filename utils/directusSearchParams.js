export const statusFilter =
  process.env.NODE_ENV === "production"
    ? { _eq: "published" }
    : { _in: ["draft", "published"] };

/**
 * Search params for fetching the entire page from Directus
 */
export const getDirectusPage = {
  filter: {
    status: { _neq: "archived", ...statusFilter },
    seo_metadata: {
      translations: {
        slug: { _eq: unref(pageFilter) },
        languages_code: { _eq: languages_code },
      },
    },
  },
  fields: [
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
  ],
  deep: {
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
  },
};
