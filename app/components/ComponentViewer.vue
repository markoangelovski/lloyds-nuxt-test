<script setup>
import { defineAsyncComponent } from 'vue';

const props = defineProps({
    page: Object,
});

// Import all root and block components
const rootModules = import.meta.glob('~/components/*.vue');
const blockModules = import.meta.glob('~/components/block/*.vue');

/**
 * Convert Directus collection name to PascalCase component name
 * e.g., "block_post" => "BlockPost"
 */
const toPascalCase = (str) =>
    str
        .split('_')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join('');

/**
 * Resolve async component dynamically based on collection name
 */
const getAsyncComponent = (collection) => {
    if (!collection) return null;

    const pascalName = toPascalCase(collection);

    // Check in block folder first
    const blockKey = Object.keys(blockModules).find((key) =>
        key.endsWith(`${pascalName}.vue`)
    );
    if (blockKey) return defineAsyncComponent(blockModules[blockKey]);

    // Check in root folder
    const rootKey = Object.keys(rootModules).find((key) =>
        key.endsWith(`${pascalName}.vue`)
    );
    if (rootKey) return defineAsyncComponent(rootModules[rootKey]);

    return null; // Component not found
};
</script>

<template>
    <div id="content">
        <template v-for="component in page.components" :key="component.id">
            <!-- Use client:lazy to hydrate only when visible -->
            <component v-if="component && component.collection" :is="getAsyncComponent(component.collection)"
                :data="component.item" client:lazy>
                <!-- fallback content while loading -->
                <template #placeholder>
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
