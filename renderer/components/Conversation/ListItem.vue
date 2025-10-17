<script setup lang="ts">
import ItemTitle from './ItemTitle.vue';
import { Conversation } from "@common/types";
defineProps<Conversation>();
</script>

<template>

    <div>
        {{ selectedModel }}
    </div>
    <div>
        <ItemTitle :title="title" />
    </div>
</template>

<style scoped></style>