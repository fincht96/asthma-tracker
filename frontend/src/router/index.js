import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated == true) {
        next("/dashboard");
      } else {
        next();
      }
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated == true) {
        next("/dashboard");
      } else {
        next();
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated == true) {
        next("/dashboard");
      } else {
        next();
      }
    },
  },

  {
    path: "/signup",
    name: "SignUp",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SignUp.vue"),

    beforeEnter: (to, from, next) => {
      if (store.state.authenticated == false) {
        next();
      } else {
        next("/dashboard");
      }
    },
  },


  {
    path: "/account",
    name: "Account",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Account.vue"),

    beforeEnter: (to, from, next) => {
      if (store.state.authenticated == false) {
        next("/login");
      } else {
        next();
      }
    },
  },

  {
    path: "/dashboard",
    name: "Dashboard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Dashboard.vue"),

    beforeEnter: (to, from, next) => {
      if (store.state.authenticated == false) {
        next("/login");
      } else {
        next();
      }
    },
  },



];

const router = new VueRouter({
  mode: "history",
  linkExactActiveClass: "is-active",
  base: process.env.BASE_URL,
  routes,
  store,
});

export default router;
