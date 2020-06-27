import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [
  { path: "/", redirect: "/user" },

  {
    path: "/user",
    component: () => import("@/views/login_and_regiseter/LoginRegisterBar.vue"),
    redirect: "/user/login",
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/components/LoginForm")
      },
      {
        path: "register",
        name: "register",
        component: () => import("@/components/RegisterForm")
      }
    ]
  },
  {
    path: "/console",
    name: "console",
    component: () => import("@/views/console/ConseleIndex"),
    redirect: "/infoIndex",
    children: [
      {
        path: "/infoIndex",
        name: "infoIndex",
        component: () => import("@/views/info/InfoIndex.vue")
      },
      {
        path: "/infoCategory",
        name: "infoCategory",
        component: () => import("@/views/info/InfoCategory.vue")
      },
      {
        path: "/infoDetailed/:newsId",
        name: "InfoDetailed",
        component: () => import("@/views/info/InfoDetailed.vue"),
        props: true
      },

      {
        path: "/userIndex",
        name: "UserIndex",
        component: () => import("@/views/userinfo/UserIndex.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});
const whiteRouter = ["login", "register"];
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  if (whiteRouter.includes(to.name)) next();
  else if (!token) next({ name: "login" });
  else next();
});

export default router;
