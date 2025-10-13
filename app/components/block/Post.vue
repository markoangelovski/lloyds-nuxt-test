<script setup>
const props = defineProps({
    data: Object,
});
</script>

<template>
    <div class="flow-root">
        <dl class="-my-3 divide-y divide-gray-200 text-sm">
            <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt class="font-medium text-gray-900">ID</dt>

                <dd class="text-gray-700 sm:col-span-2">
                    {{ props.data.typycode_post.id }}
                </dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt class="font-medium text-gray-900">Title</dt>

                <dd class="text-gray-700 sm:col-span-2">
                    {{ props.data.typycode_post.title }}
                </dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt class="font-medium text-gray-900">Body</dt>

                <dd class="text-gray-700 sm:col-span-2">
                    {{ props.data.typycode_post.body }}
                </dd>
            </div>
        </dl>
    </div>
</template>