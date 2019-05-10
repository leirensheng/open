const getters = {
  hasLogin: state => state.user.hasLogin || sessionStorage.getItem('hasLogin'),
  sidebar: state => state.app.sidebar,
  hasUserRoute: state => state.user.hasUserRoute,
  device: state => state.app.device,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  routes: state => state.user.routes,
  isManager: state => state.user.isManager,

};
export default getters;
