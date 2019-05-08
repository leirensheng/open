import fetch from '@/fetch';

export function login(loginName, password) {
  return fetch({
    url: '/open/supplier/login',
    method: 'post',
    data: {
      loginName,
      password,
    },
  });
}

export function getInfo() {
  return fetch({
    url: '/open/supplier/user/viewCurrentLoginInfo',
    method: 'get',
  });
}

export function logout() {
  return fetch({
    url: '/user/logout',
    method: 'post',
  });
}
