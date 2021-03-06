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
    redirect: 'welcome/index',
    component: Layout,

  },
  {
    path: '/doc',
    hidden: true,
    redirect: 'doc/index',
    component: Layout,
     children: [
       {
         path: 'index',
         component: () => import('@/views/document/docView.vue'),
       },
     ],
  },
  {
    path: '/login',
    hidden: true,
    redirect: 'login/index',
    component: Layout,
     children: [
       {
         path: 'index',
         component: () => import('@/views/login/index'),
        },
     ],
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
    alwaysShow: true,
    meta: {
      title: '账号',
    },
    children: [
       {
        path: 'index',
        name: 'Account',
        component: () => import('@/views/user/account.vue'),
        meta: {
          noCache: true,
          title: '账号信息',
        },
       },
    ],
  },
  // {
  //   path: '/test-params',
  //   component: Layout,
  //   alwaysShow: true,
  //   hidden: true,
  //   meta: {
  //     title: '测试参数',
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'TestParams',
  //       component: () => import('@/views/user/testParams.vue'),
  //       meta: {
  //         title: '测试参数',
  //       },
  //      },
  //   ],
  // },
  {
    path: '/business',
    component: Layout,
    meta: {
      title: '对接商家信息',
    },
    alwaysShow: true,
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
        hidden: true,
        component: () => import('@/views/user/fail/index.vue'),
        meta: {
          noCache: true,
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
        hidden: true,
        component: () => import('@/views/output/dict/dict.vue'),
        meta: {
          noCache: true,
          title: '字典维护',
        },
       },
       {
        path: 'user',
        name: 'User',
        hidden: true,
        component: () => import('@/views/output/user/user.vue'),
        meta: {
          noCache: true,
          title: '对接用户管理',
        },
       },
       {
        path: 'business',
        name: 'Business',
        hidden: true,
        component: () => import('@/views/output/business/business.vue'),
        meta: {
          title: '对接商家管理',
          noCache: true,
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
        name: 'DocManage',
        component: () => import('@/views/document/docManage.vue'),
        meta: {
          title: '接口文档管理',
        },
       },
       {
        path: 'edit',
        hidden: true,
        name: 'DocEdit',
        component: () => import('@/views/document/components/docEdit.vue'),
        meta: {
          noCache: true,
          title: '添加/编辑文档',
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
