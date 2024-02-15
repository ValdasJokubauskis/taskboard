import { createRouter, createWebHistory } from "vue-router";
import Board from "./components/Board.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/0" },
    { path: "/:index?", component: Board, props: true },
  ],
});

export default router;
