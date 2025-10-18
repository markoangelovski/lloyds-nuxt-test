<script setup>
const { $directus } = useNuxtApp();

const { data } = defineProps({
    data: Object,
});

</script>

<template>
    <NuxtImg :src="`${$directus.url}assets/${data.image_link}`" :title="data.title" :alt="data.description" />
</template>