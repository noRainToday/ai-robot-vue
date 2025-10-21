<script setup lang="ts">
import SearchBar from "./SearchBar.vue";
import ListItem from "./ListItem.vue";
import { useConversitionFilter } from "@renderer/hooks/useConversitionFilter";
import { Conversation } from '@common/types';
import { useContextMenu } from './useContextMenu';
import { createContextMenu } from '@renderer/utils/contextMenu';
import { CONVERSATION_ITEM_MENU_IDS, MENU_IDS } from '@common/constants';
import { useConversationsStore } from '@renderer/stores/conversations';


const { conversations } = useConversitionFilter();
const { handle: handleListContextMenu } = useContextMenu();
const conversationsStore = useConversationsStore();

const conversationItemActionPolicy = new Map([
  [CONVERSATION_ITEM_MENU_IDS.DEL, async () => {
    console.log('删除');
  }],
  [CONVERSATION_ITEM_MENU_IDS.RENAME, async () => {
    console.log('重命名');
  }],
  [CONVERSATION_ITEM_MENU_IDS.PIN, async (item: Conversation) => {
    if (item.pinned) {
      await conversationsStore.unpinConversation(item.id);
      return;
    }
    await conversationsStore.pinConversation(item.id);
  }],
])

async function handleItemContextMenu(item: Conversation) {
  const clickItem = await createContextMenu(MENU_IDS.CONVERSATION_ITEM, void 0) as CONVERSATION_ITEM_MENU_IDS;
  const action = conversationItemActionPolicy.get(clickItem);
  action && await action?.(item);
}



</script>

<template>
  <div class="conversation-list px-2 pt-3 h-[100vh] flex flex-col" :style="{ width: 'calc(100% - 57px)' }"
    @contextmenu.prevent.stop="handleListContextMenu">
    <SearchBar class="mt-3" />
    <ul class="flex-auto overflow-auto">
      <template v-for="item in conversations" :key="item.id">
        <li v-if="item.type !== 'divider'" @contextmenu.prevent.stop="handleItemContextMenu(item)"
          class="cursor-pointer p-2 mt-2 rounded-md hover:bg-input flex flex-col items-start gap-2">
          <list-item v-bind="item" />
        </li>
        <li v-else class="divider my-2 h-px bg-input"></li>
      </template>
    </ul>
  </div>
</template>

<style scoped></style>
