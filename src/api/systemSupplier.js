import fetch from '@/fetch';

export function list(data) {
  return fetch({
    url: '/open/supplier/systemSupplier/index',
    method: 'post',
    data,
  });
}

export function update(data) {
  return fetch({
    url: '/open/supplier/systemSupplier/update',
    method: 'post',
    data,
  });
}

export function logout() {
  return fetch({
    url: '/user/logout',
    method: 'post',
  });
}
