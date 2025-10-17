<script setup lang="ts">
const props = defineProps<{
    title: string;
}>()
const isTitleOverflow = ref(false);
const { title } = props;
</script>

<template>
    <h2 ref="titleRef" class="conversation-title w-full text-tx-secondary font-semibold loading-5 truncate">
        <template v-if="isTitleOverflow">
            <native-tooltip :content="title">
                {{ title }}
            </native-tooltip>
        </template>
        <template v-else>
            {{ title }}
        </template>
    </h2>
</template>

<style scoped></style>