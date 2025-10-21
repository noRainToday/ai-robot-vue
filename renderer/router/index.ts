import { createRouter, createMemoryHistory } from "vue-router";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@renderer/views/index.vue"),
    },
  ],
});
export default router;
