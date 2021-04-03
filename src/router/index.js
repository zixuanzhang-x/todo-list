import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "@/views/Homepage.vue";
import TodosPage from "@/views/TodosPage.vue";
import TodoPage from "@/views/TodoPage.vue";
import DonePage from "@/views/DonePage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";

import { auth } from "@/firebaseConfig.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Homepage",
    component: Homepage,
  },
  {
    path: "/todos",
    name: "TodosPage",
    component: TodosPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/todos/:category",
    name: "TodosPage",
    component: TodosPage,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/todo/:id",
    name: "TodoPage",
    component: TodoPage,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/done",
    name: "DonePage",
    component: DonePage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/done/:category",
    name: "DonePage",
    component: DonePage,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "*",
    name: "NotFoundPage",
    component: NotFoundPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// this makes the router check each change in routes -- if their "meta" says it requires auth, it will check for auth.
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  // ! why not just use the following?
  // console.log(to.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next("/");
  } else if (!requiresAuth && auth.currentUser) {
    next("/todos");
  } else {
    next();
  }
});

export default router;
