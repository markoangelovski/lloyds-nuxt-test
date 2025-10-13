<script setup>
const { $directus } = useNuxtApp();

const { data } = defineProps({
    data: Object,
});

</script>

<template>
    <NuxtImg :src="`${$directus.url}assets/${data.image}`" :title="data.title" :alt="data.description" />
</template>