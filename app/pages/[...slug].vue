<template>
    <PageBuilder v-if="page" :page="page" />
</template>

<script setup>
const { $directus, $readItems } = useNuxtApp();

const { path } = useRoute();

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

    return { slug: { _eq: finalPath } };
});

const { data: page } = await useAsyncData(
    path,
    () => {
        return $directus.request(
            $readItems("page", {
                filter: { seo_metadata: unref(pageFilter) },
                fields: [
                    "*",
                    {
                        seo_metadata: ["*"],
                        components: ["*"
                            ,
                            {
                                item: ["*", { CTA: ["*", { internal_link: ["slug"] }], image: ["*"] }],
                            },
                        ],

                    },
                ],
            })
        );
    },
    {
        transform: (data) => {
            return data[0];
        },
    }
);



// Error Handling
if (!unref(page)) {
    throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}
</script>
