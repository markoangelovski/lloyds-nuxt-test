<script setup>
const props = defineProps({
    data: Object,
});
</script>

<template>
    <article class="p-4 mb-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <h2 class="text-lg font-semibold mb-2">{{ props.data.typycode_post.title }}</h2>
        <p class="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {{ props.data.typycode_post.body }}
        </p>
    </article>
</template>
