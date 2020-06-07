import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "../views/404.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// import user_layout from "../layouts/UserLayout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // name: "Home",
    // meta: {icon:"", title:"XXX"},
    redirect: "/dashboard"
  },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: { icon: "dashboard", title: "仪表盘" },
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout.vue"),
    children: [
      {
        path: "/dashboard/workplace",
        name: "workplace",
        meta: { icon: "", title: "工作台" },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "../views/Dashboard/Workplace.vue"
          )
      },
      {
        path: "/dashboard/monitor",
        name: "moniter",
        meta: { icon: "", title: "监控页" },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "../views/Dashboard/Monitor.vue"
          )
      },
      {
        path: "/dashboard/analysis",
        name: "moniter",
        meta: { icon: "", title: "分析页" },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis.vue"
          )
      },
      {
        path: "/dashboard/test_work",
        name: "test_work",
        meta: { icon: "", title: "功能测试页" },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "../views/Dashboard/TestWork.vue"
          )
      },
      {
        path: "/dashboard",
        redirect: "/dashboard/monitor"
      }
    ]
  },
  {
    path: "/form",
    name: "form",
    meta: { icon: "form", title: "表单页" },
    component: () => import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout.vue"),
    // component: { render: h => h("router-view") },
    children: [
      {
        path: "/form",
        redirect: "/form/basic_form"
      },
      {
        path: "/form/basic_form",
        name: "basic_form",
        meta: { icon: "", title: "基础表单" },
        component: () =>
          import(/* webpackChunkName: "form" */ "../views/Form/BasicForm.vue")
      },
      {
        path: "/form/advanced_form",
        name: "advanced_form",
        meta: { icon: "", title: "高级表单" },
        component: () =>
          import(
            /* webpackChunkName: "form" */ "../views/Form/AdvancedForm.vue"
          )
      },
      {
        path: "/form/step_form", // 分步表单
        name: "step_form",
        meta: { icon: "", title: "分布表单" },
        hideChildrenInMenu: true,
        component: () =>
          import(/* webpackChunkName: "form" */ "../views/Form/StepForm"),
        children: [
          {
            path: "/form/step_form/info",
            name: "step_form_info",
            component: () =>
              import(
                /* webpackChunkName: "form" */ "../views/Form/StepForm/Step1.vue"
              )
          },
          {
            path: "/form/step_form/confirm",
            name: "step_form_confirm",
            component: () =>
              import(
                /* webpackChunkName: "form" */ "../views/Form/StepForm/Step2.vue"
              )
          },
          {
            path: "/form/step_form/result",
            name: "step_form_result",
            component: () =>
              import(
                /* webpackChunkName: "form" */ "../views/Form/StepForm/Step3.vue"
              )
          },
          {
            path: "/form/step_form",
            redirect: "/form/step_form/info"
          }
        ]
      }
    ]
  },
  {
    path: "/user",
    name: "User",
    hideInMenu: true,
    component: () =>
      import(/*webpackChunkName:"layout"*/ "../layouts/UserLayout.vue"), // 方法3
    // component: {render: h => h("router-view")},   // 方法2
    // component: user_layout,    // 方法1
    children: [
      {
        path: "/user",
        redirect: "/user/login",
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/*webpackChunkName:"user"*/ "../views/user/Login.vue")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/user/Register.vue")
      }
    ]
  },
  {
    // 用于相应不存在的路由
    path: "*",
    name: "NotFound",
    hideInMenu: true,
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path != from.path) {
    // 当源和目标URL相同，只有参数不同时，不显示进度条
    // 例如：对于主题和风格的切换，不需要进度条
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
