const searchKey = ref<string>("");
import { useConversationStore } from "@renderer/stores/conversition";

export const useConversitionFilter = () => {
  const { allConversations } = useConversationStore();
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
