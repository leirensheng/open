import fetch from '@/fetch';

export function list(params) {
  return fetch({
    url: '/open/supplier/document/list',
    method: 'get',
    params,
  });
}

export function hide(params) {
  return fetch({
    url: '/open/supplier/document/disable',
    method: 'get',
    params,
  });
}

export function show(params) {
  return fetch({
    url: '/open/supplier/document/enable',
    method: 'get',
    params,
  });
}
