<script setup lang="ts">
import NativeToolTip from "../NativeToolTip.vue";
import { useConversationsStore } from "@renderer/stores/conversations";
const { sidebarWidth } = storeToRefs(useConversationsStore());
interface ItemTitleProps {
  title: string;
}

defineOptions({ name: "ItemTitle" });

const props = defineProps<ItemTitleProps>();

const isTitleOverflow = ref(false);
const { title } = props;
const titleRef = useTemplateRef<HTMLElement>("titleRef");

/**
 *  监听title是否溢出
 *  溢出时显示tooltip
 */
function onTitleOverflow() {
  if (titleRef.value) {
    // titleRef.value.scrollWidth 可滚动宽度
    // titleRef.value.clientWidth 可见宽度
    isTitleOverflow.value =
      titleRef.value.scrollWidth > titleRef.value.clientWidth;
  }
}
// 监听侧边栏的宽度与title的变化
watch([() => sidebarWidth.value, () => props.title], onTitleOverflow);

onMounted(() => {
  onTitleOverflow();
  window.addEventListener("resize", onTitleOverflow);
});

onUnmounted(() => {
  window.removeEventListener("resize", onTitleOverflow);
});
</script>

<template>
  <h2
    ref="titleRef"
    class="conversation-title w-full text-tx-secondary font-semibold loading-5 truncate"
  >
    <template v-if="isTitleOverflow">
      <native-tool-tip :content="title">
        {{ title }}
      </native-tool-tip>
    </template>
    <template v-else> {{ title }}</template>
  </h2>
</template>
