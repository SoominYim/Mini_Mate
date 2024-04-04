import { createRouter, createWebHistory } from "vue-router";
import MiniHome from "../views/MiniHome";
import MiniLunch from "@/views/MiniLunch";
import MiniCoffee from "@/views/MiniCoffee";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
