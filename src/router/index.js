import Vue from 'vue';
import Router from 'vue-router';

/* Layout */
import Layout from '../views/layout/Layout.vue';

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
* */

export const basicRoutes = [
  {
    path: '/',
    hidden: true,
    component: () => import('@/views/home/home.vue'),
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },

  {
    path: '/welcome',
    redirect: 'welcome/index',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/welcome/welcome.vue'),
        },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },
];
export const lastRoute = {
  path: '*',
  redirect: '/404',
  hidden: true,
};
export const userRoutes = [
  {
    path: '/account',
    component: Layout,
    children: [
       {
        path: 'index',
        name: 'Account',
        component: () => import('@/views/user/account.vue'),
        meta: {
          title: '账号信息',
          icon: 'a',
        },
       },
    ],
  },
  {
    path: '/test-params',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'TestParams',
        component: () => import('@/views/user/testParams.vue'),
        meta: {
          title: '测试参数',
          icon: 'a',
        },
       },
    ],
  },
  {
    path: '/business',
    component: Layout,
    meta: {
      title: '对接商家信息',
    },

    children: [
      {
        path: 'info',
        name: 'Info',
        component: () => import('@/views/user/info.vue'),
        meta: {
          title: '对接商家信息',
        },
       },
       {
        path: 'fail',
        name: 'Fail',
        component: () => import('@/views/user/fail/index.vue'),
        meta: {
          title: '对接失败明细',
        },
       },
    ],
  },
];


export const adminRoutes = [
  {
    path: '/admin',
    meta: {
      title: '管理员',
    },
    alwaysShow: true,
    component: Layout,
    children: [
      {
        path: 'member',
        name: 'Member',
        component: () => import('@/views/member/memberManagement.vue'),
        meta: {
          title: '人员管理',
        },
       },
    ],
  },
  {
      path: '/input',
      meta: {
        title: '输入接口管理',
      },
      alwaysShow: true,
      component: Layout,
      children: [
         {
          path: 'dayou',
          name: 'Dayou',
          component: () => import('@/views/input/dayou.vue'),
          meta: {
            title: '大有ERP',
          },
         },
         {
          path: 'changyuan',
          name: 'Changyuan',
          component: () => import('@/views/input/changyuan.vue'),
          meta: {
            title: '长远ERP',
          },
         },
         {
          path: 'yongxin',
          name: 'Yongxin',
          component: () => import('@/views/input/yongxin.vue'),
          meta: {
            title: '用心ERP',
          },
         },
      ],
  },
  {
    path: '/output',
    meta: {
      title: '输出接口管理',
    },
    redirect: 'system',
    alwaysShow: true,
    component: Layout,
    children: [
       {
        path: 'system',
        name: 'System',
        component: () => import('@/views/output/system.vue'),
        meta: {
          title: '输出接口管理',
        },
       },
       {
        path: 'dict',
        name: 'Dict',
        component: () => import('@/views/output/dict/dict.vue'),
        meta: {
          title: '字典维护',
        },
       },
       {
        path: 'user',
        name: 'User',
        component: () => import('@/views/output/user.vue'),
        meta: {
          title: '对接用户管理',
        },
       },
       {
        path: 'business',
        name: 'Business',
        component: () => import('@/views/output/business.vue'),
        meta: {
          title: '对接商家管理',
        },
       },
    ],
  },

  {
    path: '/document',
    meta: {
      title: '接口文档',
    },
    alwaysShow: true,
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'DocList',
        component: () => import('@/views/document/docList.vue'),
        meta: {
          title: '接口文档管理',
        },
       },
       {
        path: 'edit',
        name: 'DocEdit',
        component: () => import('@/views/document/docEdit.vue'),
        meta: {
          title: '接口文档编辑',
        },
       },
    ],
  },
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: [...basicRoutes],

  // routes: [...basicRoutes, ...adminRoute, lastRoute],
});
