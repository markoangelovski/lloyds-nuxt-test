<script setup>
const props = defineProps({
    page: Object,
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

/**
 * Resolve async component dynamically based on collection name - previous version, left it here in case it is needed.
 */
// const getAsyncComponentOld = (collection) => {
//     // console.log("[PageBuilder] Looking for:", collection);
//     if (!collection) return Fallback;

//     const pascalName = toPascalCase(collection);
//     // console.log("[PageBuilder] Converted to:", pascalName);

//     // const blockKey = Object.keys(blockModules).find((key) =>
//     //     key.endsWith(`${pascalName}.vue`)
//     // );
//     // if (blockKey) {
//     //     console.log("[PageBuilder] Found in block:", blockKey);
//     //     return defineAsyncComponent(blockModules[blockKey]);
//     // }

//     const rootKey = Object.keys(rootModules).find((key) =>
//         key.endsWith(`${pascalName}.vue`)
//     );
//     if (rootKey) {
//         // console.log("[PageBuilder] Found in root:", rootKey);
//         return defineAsyncComponent(rootModules[rootKey]);
//     }

//     // console.warn("[PageBuilder] No match for:", pascalName);
//     return Fallback;
// };

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
    <div id="content">
        <template v-for="component in page.components" :key="component.id">
            <component v-if="component?.collection" :is="getAsyncComponent(component.collection)"
                :data="component.item">
                <template #fallback>
                    <div class="component-loading">Loading...</div>
                </template>
            </component>
        </template>
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
