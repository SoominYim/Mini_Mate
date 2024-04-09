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

router.beforeEach((to, from, next) => {
  // '/pdf' 경로로 이동할 때만 overflow를 hidden으로 설정
  if (to.path === "/pdf") {
    document.documentElement.style.overflow = "hidden";
  } else {
    document.documentElement.style.overflow = ""; // 다른 경로로 이동할 때는 overflow 스타일을 제거
  }
  next();
});

export default router;
