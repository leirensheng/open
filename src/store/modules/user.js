import {
  login,
  logout,
  getInfo,
} from '@/api/login';


const user = {
  state: {
    hasLogin: false,
    hasUserRoute: false,
    name: '',
    avatar: '',
    routes: [],
  },

  mutations: {
    SAVE_LOGIN_STATE: (state, hasLogin) => {
      state.hasLogin = hasLogin;
      sessionStorage.setItem('hasLogin', 1);
    },
    SAVE_USER_ROUTE_STATE: (state, hasUserRoute) => {
      state.hasUserRoute = hasUserRoute;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },

    SAVE_ROUTES: (state, routes) => {
      state.routes = routes;
    },
  },

  actions: {
    // 登录
    Login({
      commit,
    }, userInfo) {
      const username = userInfo.username.trim();

      return login(username, userInfo.password).then(({ model: { menuList } }) => {
        commit('SAVE_LOGIN_STATE', true);
        // 存放在localStorage，因为刷新页面不再请求login获取路由了
        localStorage.setItem('menuList', JSON.stringify(menuList));
      });
    },

    // 获取用户信息
    getUserInfo({
      commit,
    }) {
      return new Promise((resolve, reject) => {
        getInfo().then(({ model }) => {
          const { name, avatar } = model;
          commit('SET_NAME', name);
          commit('SET_AVATAR', avatar);
          resolve(name);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 登出
    LogOut({
      commit,

    }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_NAME', '');
          commit('SET_AVATAR', '');
          commit('SAVE_LOGIN_STATE', false);
          commit('SAVE_ROUTES', []);
          sessionStorage.clear();
          localStorage.clear();
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },


  },
};

export default user;
