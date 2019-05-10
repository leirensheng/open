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

export function docMenu(params) {
  return fetch({
    url: '/open/supplier/documentMenu/listAll',
    method: 'get',
    params,
  });
}


export function saveMenu(data) {
  return fetch({
    url: '/open/supplier/documentMenu/save',
    method: 'post',
    data,
  });
}

export function changeSeq(data) {
  return fetch({
    url: '/open/supplier/documentMenu/changeSeq',
    method: 'post',
    data,
  });
}

export function deleteMenu(params) {
  return fetch({
    url: '/open/supplier/documentMenu/delete',
    method: 'get',
    params,
  });
}

export function menuAndDoc(params) {
  return fetch({
    url: '/open/supplier/documentMenu/listAndDocument',
    method: 'get',
    params,
  });
}

export function docView(params) {
  return fetch({
    url: '/open/supplier/document/view',
    method: 'get',
    params,
  });
}
