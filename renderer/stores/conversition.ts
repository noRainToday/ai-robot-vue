/**'
 * pinia 用来做数据存储
 */

import { defineStore } from "pinia";
import { Conversation } from "@common/types";
import { conversations as testConversations } from "@renderer/testData";

export const useConversationStore = defineStore("conversation", () => {
  const conversations = ref<Conversation[]>(testConversations);

  const allConversations = computed(() => conversations.value);
  return {
    conversations,
    allConversations,
  };
});
