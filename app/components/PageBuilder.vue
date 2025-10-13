<script setup>
const componentMap = {
    block_post: resolveComponent("BlockPost"),
    block_content1: resolveComponent("BlockContent1"),
};

const props = defineProps({
    page: Object,
});
</script>

<template>
    <div id="content">
        <template v-for="component in page.components" :key="component.id">
            <component :is="componentMap[component.collection]" v-if="component && component.collection"
                :data="component.item" />
        </template>
    </div>
</template>
