import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/example1",
  },
  {
    path: "/example1",
    name: "example1",
    component: () => import("../pages/Example1Page.vue"),
  },
  {
    path: "/example2",
    name: "example2",
    component: () => import("../pages/Example2Page.vue"),
  },
  {
    path: "/example3",
    name: "example3",
    component: () => import("../pages/Example3Page.vue"),
  },
  {
    path: "/example4",
    name: "example4",
    component: () => import("../pages/Example4Page.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
