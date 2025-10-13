<template>

    <ComponentViewer v-if="component" :component="component" />
</template>

<script setup>
const { $directus, $readItem } = useNuxtApp();

const { params } = useRoute();

const { data: component } = await useAsyncData("component-preview", () => {
    return $directus.request($readItem(params.collection, params.id, {
        fields: [
            "*",
            {
                CTA: ["*"],
                image: ["*"],
                internal_link: ["*"],
            },
        ],
    }));
});


// Error Handling
if (!unref(component)) {
    throw createError({ statusCode: 404, statusMessage: "Component Not Found" });
}
</script>
