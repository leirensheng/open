import fetch from '@/fetch';

export function list(data) {
  return fetch({
    url: '/open/supplier/externalInterface/index',
    method: 'post',
    data,
  });
}

// 新增
export function add(data) {
  return fetch({
    url: '/open/supplier/externalInterface/save',
    method: 'post',
    data,
  });
}
// 修改
export function update(data) {
  return fetch({
    url: '/open/supplier/externalInterface/update',
    method: 'post',
    data,
  });
}
// 禁用
export function disable(params) {
  return fetch({
    url: '/open/supplier/externalInterface/stop',
    method: 'get',
    params,
  });
}
// 启用
export function enable(params) {
  return fetch({
    url: '/open/supplier/externalInterface/active',
    method: 'get',
    params,
  });
}
