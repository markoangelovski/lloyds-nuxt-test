<script setup>
const { data } = defineProps({
    data: Object,
});

</script>

<template>
    <NuxtLink v-if="data.external_link" :to="data.external_link" :title="data.alt_text" target="_blank"
        class="cursor-pointer flex items-center px-6 py-2 mt-auto font-semibold text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-lg hover:bg-blue-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 rounded-lg">
        {{ data.label }}
    </NuxtLink>

    <NuxtLink v-if="data.internal_link" :to="data.internal_link.slug" :title="data.alt_text"
        class="cursor-pointer flex items-center px-6 py-2 mt-auto font-semibold text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-lg hover:bg-blue-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 rounded-lg">
        {{ data.label }}
    </NuxtLink>
</template>
