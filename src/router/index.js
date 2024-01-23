import { createRouter, createWebHistory } from "vue-router";
import MiniHome from "../views/MiniHome.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: MiniHome,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
