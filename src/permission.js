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
import {
  getToken,
} from '@/utils/auth'; // 验权
import getRoute from '@/api/accessRoute';

NProgress.configure({
  showSpinner: false,
}); // NProgress Configuration

const whiteList = ['/login']; // 不重定向白名单
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/welcome/index' });
      NProgress.done();
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const [{ roles }, { data: routes }] = await Promise.all([store.dispatch('getUserInfo'), getRoute()]);
            const paths = routes.map(one => one.path);
            // 找出第一层的路由
           const firstRoute = [...new Set(routes.map(one => `/${one.path.split('/')[1]}`))];

           const targetRoutes = roles[0] == 'admin' ? adminRoutes : userRoutes;
          // 前端的第一层路由
          const frontFirstRoute = targetRoutes.filter(one => firstRoute.includes(one.path));

          //  找出有权限的路由,这里默认只找了2层的
           const accessRoutes = frontFirstRoute.map(one => {
              one.children = one.children.filter(childRoute => paths.includes(`${one.path}/${childRoute.path}`));
              return one;
            });

          store.commit('SAVE_ROUTES', [...basicRoutes, ...accessRoutes, lastRoute]);

          router.addRoutes([...accessRoutes, lastRoute]);
          next({ ...to, replace: true });
        } catch (error) {
          console.log(error);
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken');
          Message.error(error || 'Has Error');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token */

    if (whiteList.indexOf(to.path) !== -1) {
       // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
