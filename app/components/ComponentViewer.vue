<script setup>
const { params } = useRoute();
const props = defineProps({
    component: Object,
});

// Import all root and block components
const rootModules = import.meta.glob("~/components/*.vue");
// const blockModules = import.meta.glob('~/components/block/*.vue');

/**
 * Convert Directus collection name to PascalCase component name
 * e.g., "block_post" => "BlockPost"
 */
const toPascalCase = (str) =>
    str
        .split("_")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join("");

const Fallback = {
    template: "<div>component not found</div>",
};

const cache = new Map();
/**
 * Resolve async component dynamically based on collection name
 */
const getAsyncComponent = (collection) => {
    if (!collection) return Fallback;
    if (cache.has(collection)) return cache.get(collection);

    const pascalName = toPascalCase(collection);

    const match = Object.keys(rootModules).find((key) =>
        key.endsWith(`${pascalName}.vue`)
    );

    const component = match ? defineAsyncComponent(rootModules[match]) : Fallback;

    cache.set(collection, component);
    return component;
};
</script>

<template>
    <!-- {{ console.log(component) }} -->
    <div id="content">
        <component v-if="component" :is="getAsyncComponent(params.collection)" :data="component">
            <template #fallback>
                <div class="component-loading">Loading...</div>
            </template>
        </component>
    </div>
</template>

<style scoped>
.component-loading {
    min-height: 50px;
    background: #f5f5f5;
    animation: pulse 1.2s infinite;
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}
</style>
