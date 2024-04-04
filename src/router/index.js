import { createRouter, createWebHistory } from "vue-router";
import MiniHome from "../views/MiniHome";
import MiniLunch from "@/views/MiniLunch";
import MiniCoffee from "@/views/MiniCoffee";
import MiniPdf from "@/views/MiniPdf";

const routes = [
  {
    path: "/",
    name: "home",
    component: MiniHome,
  },
  {
    path: "/lunch",
    name: "lunch",
    component: MiniLunch,
  },
  {
    path: "/coffee",
    name: "coffee",
    component: MiniCoffee,
  },
  {
    path: "/pdf",
    name: "pdf",
    component: MiniPdf,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
