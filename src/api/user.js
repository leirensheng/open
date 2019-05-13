import fetch from '@/fetch';

export function list(data) {
  return fetch({
    url: '/open/supplier/user/index',
     method: 'post',
    data,
  });
}

export function save(data) {
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

export function enable(data) {
  return fetch({
    url: '/open/supplier/user/active',
     method: 'post',
    data,
  });
}

export function disable(data) {
  return fetch({
    url: '/open/supplier/user/stop',
     method: 'post',
    data,
  });
}
