<script setup lang="ts">
import { NConfigProvider } from 'naive-ui';
import TitleBar from '@renderer/components/TitleBar.vue';
import DragRegion from '@renderer/components/DragRegion.vue';
import NavBar from '@renderer/components/NavBar.vue';
import ResizeDivider from './components/ResizeDivider.vue';
const asideWidth = ref(320);
const asideheight = ref(100);
onMounted(() => {
});
</script>
<template>
  <n-config-provider class="h-full w-[100vw] flex text-tx-primary">
    <aside class="sidebar h-full flex flex-shrink-0 flex-col " :style="{ width: asideWidth + 'px' }">
      {{ asideWidth }} - {{ asideheight }}
      <div class="flex-auto flex">
        <nav-bar />
        <div class="flex-auto">
          conversation-list
        </div>
        <div>
          <resize-divider direction="vertical" :max-size="800" :min-size="320" :size="asideWidth"
            @update:size="asideWidth = $event" />
        </div>

      </div>
    </aside>
    <div class="flex-auto">
      <title-bar>
        <drag-region class="w-full" />
      </title-bar>
      Main

      <div class="h-full flex  flex-col justify-between">
        <div>
          我是内容
        </div>

        <div>
          <resize-divider direction="horizontal" valIsNagetive :max-size="600" :min-size="200" :size="asideheight"
            @update:size="asideheight = $event" />
          <div :style="{ height: asideheight + 'px' }" class="bg-[#f0f0f0]">
            请输入你想和我聊的内容
          </div>
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