import {
  login,
  logout,
  getInfo,
} from '@/api/login';
import router from '@/router';

const user = {
  state: {
    hasLogin: false,
    hasUserRoute: false,
    name: '',
    avatar: '',
    routes: [],
    isManager: false,
    systemName: '',
    userName: '',
    id: '',
    password: '',
  },

  mutations: {
    SAVE_LOGIN_STATE: (state, hasLogin) => {
      state.hasLogin = hasLogin;
      sessionStorage.setItem('hasLogin', hasLogin);
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
    SET_IS_MANAGER: (state, isManager) => {
      state.isManager = isManager;
    },

    SET_SYSTEMNAME: (state, name) => {
      state.systemName = name;
    },
    SET_USER_NAME: (state, name) => {
      state.userName = name;
    },
    SET_ID: (state, id) => {
      state.id = id;
    },
    SET_PASSWORD: (state, password) => {
      state.password = password;
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
          const {
          systemName, name, username, avatar, password, isManager, id,
         } = model;
          commit('SET_NAME', name);
          commit('SET_ID', id);

          commit('SET_USER_NAME', username);
          commit('SET_PASSWORD', password);


          commit('SET_AVATAR', avatar);
          commit('SET_IS_MANAGER', isManager);
          commit('SET_SYSTEMNAME', systemName);

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
          sessionStorage.clear();
          localStorage.clear();
          location.reload();
          // rout
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },


  },
};

export default user;
