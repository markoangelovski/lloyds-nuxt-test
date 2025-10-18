<template>
    <header
        class="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-700">
        <NuxtLink to="/" class="hover:underline">
            <h1 class="text-xl font-bold">Lloyds Nuxt Test</h1>
        </NuxtLink>
        <nav class="flex items-center space-x-4">
            <NuxtLink v-if="metadata" v-for="meta in metadata.translations" :key="meta.id" :to="meta.slug"
                class="hover:underline">
                {{ meta.languages_code }}</NuxtLink>
        </nav>
        <a :href="$directus.url.href" target="_blank">D</a>
    </header>
</template>

<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp();
const { path } = useRoute();

const { data: metadata } = await useAsyncData(
    "seo_metadata",
    () => {
        return $directus.request(
            $readItems("seo_metadata", {
                filter: { translations: { slug: { _eq: path } } },
                fields: ["*", { translations: ["*"] }],
            })
        );
    },
    { transform: (data) => data[0] }
);
</script>
