const getters = {
  hasLogin: state => state.user.hasLogin || sessionStorage.getItem('hasLogin') === 'true',
  sidebar: state => state.app.sidebar,
  hasUserRoute: state => state.user.hasUserRoute,
  device: state => state.app.device,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  routes: state => state.user.routes,
  isManager: state => state.user.isManager,
  systemName: state => state.user.systemName,
  userName: state => state.user.userName,
  id: state => state.user.id,
  password: state => state.user.password,

};
export default getters;
