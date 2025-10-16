<template>
    <PageBuilder v-if="page" :page="page" />
    <!-- {{ console.log("Page: ", JSON.stringify(page, null, 2)) }} -->
</template>

<script setup>
const { $directus, $readItems } = useNuxtApp();

const { path } = useRoute();
const { params } = useRoute();

const { locale: languages_code } = params;

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

const { data: page } = await useAsyncData(
    path,
    () => {
        return $directus.request(
            $readItems("page", {
                filter: {
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
            })
        );
    },
    {
        transform: (data) => {
            return data[0];
        },
    }
);

useHead({
    htmlAttrs: {
        lang: languages_code,
    }
})

useSeoMeta({
    title: unref(page).seo_metadata.translations[0].title,
    ogTitle: unref(page).seo_metadata.translations[0].title,
    description: unref(page).seo_metadata.translations[0].description,
    ogDescription: unref(page).seo_metadata.translations[0].description,
    // ogImage: `${$directus.url}assets/${unref(page).seo_metadata.mog_image.image}`,
    // twitterCard: `${$directus.url}assets/${unref(page).seo_metadata.mog_image.image}`,
})

// Error Handling
if (!unref(page)) {
    throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}
</script>
