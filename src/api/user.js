import fetch from '@/fetch';

export function list(data) {
  return fetch({
    url: '/open/supplier/user/index',
     method: 'post',
    data,
  });
}

export function add(data) {
  return fetch({
    url: '/open/supplier/user/save',
     method: 'post',
    data,
  });
}

export function update(data) {
  return fetch({
    url: '/open/supplier/user/update',
     method: 'post',
    data,
  });
}

export function enable(params) {
  return fetch({
    url: '/open/supplier/user/active',
     method: 'get',
    params,
  });
}

export function disable(params) {
  return fetch({
    url: '/open/supplier/user/stop',
     method: 'get',
     params,
  });
}
