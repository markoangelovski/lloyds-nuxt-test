<template>
    <ComponentViewer v-if="component" :component="component" />
</template>

<script setup>
definePageMeta({
    layout: "component",
});

const { $directus, $readItem } = useNuxtApp();

const { params } = useRoute();

const { data: component } = await useAsyncData("component-preview", () => {
    return $directus.request(
        $readItem(params.collection, params.id, {
            fields: [
                "*",
                {
                    image: ["*", { translations: ["*"] }],
                    cta: ["*", { internal_link: ["*", { translations: ["*"] }] }, { translations: ["*"] }],
                    translations: ["*"],
                },
            ],
        })
    );
});

// Error Handling
if (!unref(component)) {
    throw createError({ statusCode: 404, statusMessage: "Component Not Found" });
}
</script>
