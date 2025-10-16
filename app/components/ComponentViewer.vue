<script setup>
const componentMap = {
    block_post: resolveComponent("BlockPost"),
    block_content1: resolveComponent("BlockContent1"),

    btn_std_1: resolveComponent("DetailButton"),
    image_hoc: resolveComponent("DetailImage"),
};

const { params } = useRoute();

const props = defineProps({
    component: Object,
});

</script>

<template>
    <div id="content">
        <component :is="componentMap[params.collection]" v-if="component" :data="component" />
    </div>
</template>
