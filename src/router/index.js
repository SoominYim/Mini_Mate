import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "../views/MiniHome.vue"),
  },
  {
    path: "/lunch",
    name: "lunch",
    component: () => import(/* webpackChunkName: "lunch" */ "../views/MiniLunch.vue"),
  },
  {
    path: "/coffee",
    name: "coffee",
    component: () => import(/* webpackChunkName: "coffee" */ "../views/MiniCoffee.vue"),
  },
  {
    path: "/pdf",
    name: "pdf",
    component: () => import(/* webpackChunkName: "pdf" */ "../views/MiniPdf.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
