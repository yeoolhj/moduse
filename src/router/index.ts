import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/example1",
  },
  {
    path: "/example1",
    name: "example1",
    component: () => import("../pages/example1.vue"),
  },
  {
    path: "/example2",
    name: "example2",
    component: () => import("../pages/example2.vue"),
  },
  {
    path: "/example3",
    name: "example3",
    component: () => import("../pages/example3.vue"),
  },
  {
    path: "/example4",
    name: "example4",
    component: () => import("../pages/example4.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
