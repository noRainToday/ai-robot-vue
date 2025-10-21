const searchKey = ref<string>("");
import { useConversationsStore } from "@renderer/stores/conversations";

export const useConversitionFilter = () => {
  const { allConversations } = useConversationsStore();
  const filteredConversations = computed(() => {
    if (!searchKey.value) {
      return allConversations;
    }
  });
  return {
    searchKey,
    conversations: filteredConversations,
  };
};
