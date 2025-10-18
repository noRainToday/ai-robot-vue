<script setup lang="ts">
import { storeToRefs } from "pinia";
import { NConfigProvider } from "naive-ui";
import TitleBar from "@renderer/components/TitleBar.vue";
import DragRegion from "@renderer/components/DragRegion.vue";
import NavBar from "@renderer/components/NavBar.vue";
import ResizeDivider from "./components/ResizeDivider.vue";
import ConversationList from "@renderer/components/Conversation/index.vue";
import { useConversationStore } from "@renderer/stores/conversition";

const { changeSidebarWidth } = useConversationStore();
const { sidebarWidth } = storeToRefs(useConversationStore());
// 侧边栏宽度改变时触发
const onSidebarWidthChange = (width: number) => {
  changeSidebarWidth(width);
};
</script>
<template>
  <n-config-provider class="h-full w-[100vw] flex text-tx-primary">
    <aside
      class="sidebar h-full flex flex-shrink-0 flex-col"
      :style="{ width: sidebarWidth + 'px' }"
    >
      <div class="flex-auto flex">
        <nav-bar />
        <Conversation-list />
        <resize-divider
          direction="vertical"
          :max-size="800"
          :min-size="320"
          :size="sidebarWidth"
          @update:size="onSidebarWidthChange"
        />
      </div>
    </aside>
    <div class="flex-auto p-2">
      <title-bar>
        <drag-region class="w-full" />
      </title-bar>
      Main

      <div class="h-full flex flex-col justify-between">
        <div>我是内容</div>

        <div>
          <!-- <resize-divider
            direction="horizontal"
            valIsNagetive
            :max-size="600"
            :min-size="200"
            :size="asideheight"
            @update:size="asideheight = $event"
          /> -->
        </div>
      </div>
    </div>
  </n-config-provider>
</template>

<style scoped>
.sidebar {
  background-color: var(--bg-color);
  box-shadow: -3px -2px 10px rgba(101, 101, 101, 0.2);
}
</style>
