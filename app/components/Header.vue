<template>
    <header
        class="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-700">
        <h1 class="text-xl font-bold">Lloyds Nuxt Test</h1>
        <nav class="flex items-center space-x-4">
            <NuxtLink v-for="meta in metadata" :key="meta.id" :to="meta.slug" class="hover:underline">
                {{ meta.entry_title }}</NuxtLink>
        </nav>
    </header>
</template>

<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp();

const { data: metadata } = await useAsyncData("seo_metadata", () => {
    return $directus.request(
        $readItems("seo_metadata", {
            fields: ["id", "entry_title", "slug"],
        })
    );
});
</script>
