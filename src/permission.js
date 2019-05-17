import router from './router';
import {
basicRoutes, userRoutes, adminRoutes, lastRoute,
} from './router';
import store from './store';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
import {
  Message,
} from 'element-ui';

import getRoute from '@/api/accessRoute';

NProgress.configure({
  showSpinner: false,
}); // NProgress Configuration

const whiteList = ['/login/index', '/', '/doc/index']; // 不重定向白名单
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (store.getters.hasLogin) {
    if (to.path === '/login/index') { // 已经登录不允许跳转登录页
      next({ path: '/welcome/index' });
    } else if (store.getters.name) {
      next();
     } else {
        try {
           await store.dispatch('getUserInfo');
           const routes = JSON.parse(localStorage.getItem('menuList'));
           const paths = routes.map(one => one.url);
            // 找出第一层的路由
           const firstPath = [...new Set(paths.map(one => `/${one.split('/')[1]}`))];

           const targetRoutes = [...adminRoutes, ...userRoutes];
          // 前端的第一层路由
          const frontFirstRoute = targetRoutes.filter(one => firstPath.includes(one.path));

          //  找出有权限的路由,这里默认只找了2层的
           const accessRoutes = frontFirstRoute.map(one => {
              one.children = one.children.filter(childRoute => paths.includes(`${one.path}/${childRoute.path}`));
              return one;
            });

          store.commit('SAVE_ROUTES', [...basicRoutes, ...accessRoutes, lastRoute]);
          router.addRoutes([...accessRoutes, lastRoute]);

        // 判断是否有用户中心的路由，用于显示 用户中心 还是 管理中心
         const hasUserRoute = userRoutes.some(one => firstPath.includes(one.path));
         store.commit('SAVE_USER_ROUTE_STATE', hasUserRoute);

          next({ ...to, replace: true });
        } catch (error) {
          console.log(error);
          Message.error(error || 'Has Error');
          next(`/login/index?redirect=${to.path}`);
          NProgress.done();
        }
      }
  } else if (whiteList.indexOf(to.path) !== -1) { // 未登录但是允许跳转的路由，直接通过
     next();
   } else { // 未登录非白名单，都重定向到登录页
     next(`/login/index?redirect=${to.path}`);
     NProgress.done(); // 结束Progress
   }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
