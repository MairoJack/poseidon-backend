import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Layout from "@/layout/Layout.vue";
import { getStore } from "@/utils/storage.js";
import { getUserInfo } from "@/api/index.js";
import store1 from "@/store/index.js";
import { useStore } from "vuex";
const routes = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/main",
    component: Layout,
    icon: "el-icon-s-home",
    meta: { title: "工作台" },
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "工作台",
        icon: "el-icon-s-home",
        meta: { title: "工作台" },
        component: () => import("@/views/Dashboard.vue"),
      },
    ],
  },
  {
    path: "/college",
    component: Layout,
    name: "海神学院",
    icon: "el-icon-school",
    meta: { title: "海神学院" },
    children: [
      {
        path: "/college-list",
        name: "学院列表",
        icon: "el-icon-s-data",
        meta: { title: "学院列表" },
        component: () => import("@/views/College.vue"),
      },
      {
        path: "/college-add",
        name: "添加学院",
        icon: "el-icon-document-add",
        meta: { title: "添加学院" },
        component: () => import("@/views/CollegeAdd.vue"),
      },
    ],
  },
  {
    path: "/lecture",
    component: Layout,
    name: "活动讲座",
    icon: "el-icon-monitor",
    meta: { title: "活动讲座" },
    children: [
      {
        path: "/lecture-list",
        name: "活动讲座列表",
        icon: "el-icon-s-data",
        meta: { title: "活动讲座列表" },
        component: () => import("@/views/Lecture.vue"),
      },
      {
        path: "/lecture-add",
        name: "添加活动讲座",
        icon: "el-icon-document-add",
        meta: { title: "添加活动讲座" },
        component: () => import("@/views/LectureDetail.vue"),
      },
      {
        path: "/lecture-edit/:id(\\d+)",
        name: "编辑活动讲座",
        meta: { title: "编辑活动讲座" },
        hidden: true,
        component: () => import("@/views/LectureDetail.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
      requireAuth: false,
    },
    component: () => import("@/views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

NProgress.configure({ showSpinner: false });
const whiteList = ["/login"];
router.beforeEach((to, from, next) => {
  NProgress.start();
  document.title = to.meta.title;

  const token = getStore("token");
  if (token) {
    const store = useStore();
    // const name = store1.getters.name;
    // console.log(store1.getters.name);
    console.log(store);
    if (name) {
      console.log("123");
      next();
    } else {
      getUserInfo().then((res) => {
        store.commit("SET_NAME", res.username);
        next({ ...to, replace: true });
      });
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login?redirect=${to.path}");
      NProgress.done();
    }
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
