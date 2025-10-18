/**'
 * pinia 用来做数据存储
 */

import { defineStore } from "pinia";
import { Conversation } from "@common/types";
import { conversations as testConversations } from "@renderer/testData";

export const useConversationStore = defineStore("conversation", () => {
  // sidebarWidth 侧边栏宽度
  const sidebarWidth = ref(320);
  // 输入问题对话框高度
  const talkInputHeight = ref(200);
  // 侧边栏 - 对话列表
  const conversations = ref<Conversation[]>(testConversations);
  const allConversations = computed(() => conversations.value);
  // 改变侧边栏宽度
  const changeSidebarWidth = (width: number) => {
    sidebarWidth.value = width;
  };
  // 改变输入问题对话框高度
  const changeTalkInputHeight = (height: number) => {
    talkInputHeight.value = height;
  };
  return {
    sidebarWidth,
    changeSidebarWidth,
    conversations,
    allConversations,
    talkInputHeight,
    changeTalkInputHeight,
  };
});
