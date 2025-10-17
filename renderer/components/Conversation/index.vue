<script setup lang="ts">
import SearchBar from './SearchBar.vue';
import ListItem from './ListItem.vue';

import { useConversitionFilter } from '@renderer/hooks/useConversitionFilter';
const { conversations } = useConversitionFilter();

</script>

<template>
    <div class="m-2" :style="{ width: 'calc(100% - 57px)' }">
        <SearchBar />

        <ul class="flex-auto overflow-auto">
            <template v-for="item in conversations" :key="item.id">
                <li v-if="item.type !== 'divider'"
                    class="cursor-pointer p-2 mt-2 rounded-md hover:bg-input flex flex-col items-start gap-2">
                    <list-item v-bind="item" />
                </li>
                <li v-else class="divider my-2 h-px bg-input"></li>
            </template>
        </ul>
    </div>
</template>

<style scoped></style>