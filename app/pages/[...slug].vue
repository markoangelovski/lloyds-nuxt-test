<template>
    <PageBuilder v-if="page" :page="page" />
    <!-- {{ console.log("Page [/slug]: ", JSON.stringify(page, null, 2)) }} -->
</template>

<script setup>
import { directusLangs } from "../../utils/data/directusLangs.ts";
const { $directus, $readItems } = useNuxtApp();

const { path } = useRoute();

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

const unrefPage = unref(page);

// Error Handling
if (!unrefPage) {
    throw createError({
        statusCode: 404,
        statusMessage: `Page Not Found: ${JSON.stringify(filter, null, 2)}`,
    });
}

let routeRules = { ssr: true };

// Fully static: render_type === "static", max_age === 0
if (
    unrefPage.seo_metadata.render_type === "static" &&
    !unrefPage.seo_metadata.max_age
)
    routeRules = { isr: true };

// Static with cache: render_type === "static", max_age > 0
if (
    unrefPage.seo_metadata.render_type === "static" &&
    unrefPage.seo_metadata.max_age
)
    routeRules = { isr: unrefPage.seo_metadata.max_age };

defineRouteRules(routeRules);

useHead({
    htmlAttrs: {
        lang: languages_code,
    },
});

useSeoMeta({
    title: unref(page).seo_metadata.translations[0].title,
    ogTitle: unref(page).seo_metadata.translations[0].title,
    description: unref(page).seo_metadata.translations[0].description,
    ogDescription: unref(page).seo_metadata.translations[0].description,
    // ogImage: `${$directus.url}assets/${unref(page).seo_metadata.mog_image.image}`,
    // twitterCard: `${$directus.url}assets/${unref(page).seo_metadata.mog_image.image}`,
});
</script>
