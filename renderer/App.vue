<script setup lang="ts">
import { storeToRefs } from "pinia";
import { NConfigProvider } from "naive-ui";

import NavBar from "@renderer/components/NavBar.vue";
import ResizeDivider from "./components/ResizeDivider.vue";
import ConversationList from "@renderer/components/Conversation/index.vue";
import { useConversationsStore } from "@renderer/stores/conversations";

const { changeSidebarWidth } = useConversationsStore();
const { sidebarWidth } = storeToRefs(useConversationsStore());
// 侧边栏宽度改变时触发
const onSidebarWidthChange = (width: number) => {
  changeSidebarWidth(width);
};
</script>
<template>
  <n-config-provider class="h-full w-[100vw] flex text-tx-primary">
    <aside class="sidebar h-full flex flex-shrink-0 flex-col" :style="{ width: sidebarWidth + 'px' }">
      <div class="flex-auto flex">
        <nav-bar />
        <Conversation-list />

      </div>
    </aside>
    <resize-divider direction="vertical" :max-size="800" :min-size="320" :size="sidebarWidth"
      @update:size="onSidebarWidthChange" />
    <div class="flex-auto p-2">
      <Router-view />
    </div>
  </n-config-provider>
</template>

<style scoped>
.sidebar {
  background-color: var(--bg-color);
  box-shadow: -3px -2px 10px rgba(101, 101, 101, 0.2);
}
</style>
