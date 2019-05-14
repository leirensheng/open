import fetch from '@/fetch';

export function list(data) {
  return fetch({
    url: '/open/supplier/system/index',
    method: 'post',
    data,
  });
}

// 新增
export function add(data) {
  return fetch({
    url: '/open/supplier/system/save',
    method: 'post',
    data,
  });
}
// 修改
export function update(data) {
  return fetch({
    url: '/open/supplier/system/update',
    method: 'post',
    data,
  });
}
