import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },

  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    beforeEnter: (to, from, next) => {
      localStorage.getItem("token") ? next({ name: "Accueil" }) : next();
    },
  },
  {
    path: "/accueil",
    name: "Accueil",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Accueil.vue"),
    beforeEnter: (to, from, next) => {
      localStorage.getItem("token") ? next() : next({ name: "Login" });
    },
  },
  {
    path: "/:refuge",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/RecapChiens.vue"),
    beforeEnter: (to, from, next) => {
      localStorage.getItem("token") ? next() : next({ name: "Login" });
    },
  },
  {
    path: "/fiche",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/FicheChien.vue"),
    beforeEnter: (to, from, next) => {
      localStorage.getItem("token") ? next() : next({ name: "Login" });
    },
  },
  {
    path: "/reserves",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Reserves.vue"),
    beforeEnter: (to, from, next) => {
      localStorage.getItem("token") ? next() : next({ name: "Login" });
    },
  },
  {
    path: "/optionnes",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Optionnes.vue"),
    beforeEnter: (to, from, next) => {
      localStorage.getItem("token") ? next() : next({ name: "Login" });
    },
  },
  {
    path: "/users",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/AllUsers.vue"),
    beforeEnter: (to, from, next) => {
      localStorage.getItem("token") ? next() : next({ name: "Login" });
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
