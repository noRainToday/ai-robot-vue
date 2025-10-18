<script setup lang="ts">
import ItemTitle from "./ItemTitle.vue";
import { Conversation } from "@common/types";
import { Icon as IconifyIcon } from "@iconify/vue";
defineProps<Conversation>();
const _PIN_ICON_SIZE = 16 as const;
</script>

<template>
  <div
    class="conversation-desc text-tx-secondary flex justify-between items-center text-sm loading-5"
  >
    <span>
      {{ selectedModel }}
      <!-- 置顶表示符 -->
      <iconify-icon
        class="inline-block"
        v-if="pinned"
        icon="material-symbols:keep-rounded"
        :width="_PIN_ICON_SIZE"
        :height="_PIN_ICON_SIZE"
      />
    </span>
  </div>
  <div class="w-full flex items-center">
    <!-- 复选框 预留 -->
    <!-- <div class="flex-auto"> -->
    <item-title :title="title" />
    <!-- </div> -->
  </div>
</template>

<style scoped></style>
