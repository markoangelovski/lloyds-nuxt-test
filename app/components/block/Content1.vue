<script setup>
const { data } = defineProps({
    data: Object,
});
</script>

<template>
    <section class="mt-20 bg-white text-blueGray-700 dark:bg-gray-900 dark:text-gray-200">
        <div class="container flex flex-col items-center px-5 py-16 mx-auto md:flex-row lg:px-28">
            <div class="flex flex-col items-start mb-16 text-left lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:mb-0">
                <h2
                    class="mb-8 text-xs font-semibold tracking-widest uppercase title-font text-black dark:text-gray-300">
                    {{ data.tagline }}
                </h2>

                <h1 class="mb-8 text-2xl font-black tracking-tighter title-font text-black md:text-5xl dark:text-white">
                    {{ data.title }}
                </h1>

                <p class="mb-8 text-base leading-relaxed text-left text-blueGray-600 dark:text-gray-400">
                    {{ data.body }}
                </p>

                <div class="flex flex-col justify-center lg:flex-row">
                    <DetailButton v-if="data.CTA" :data="data.CTA" />
                </div>
            </div>

            <div class="w-full lg:w-1/3 lg:max-w-lg md:w-1/2">
                <DetailImage v-if="data.image" :data="data.image" />
            </div>
        </div>
    </section>
</template>
