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
// 文档目录列表
export function docMenu(params) {
  return fetch({
    url: '/open/supplier/documentMenu/listAll',
    method: 'get',
    params,
  });
}

// 保存目录
export function saveMenu(data) {
  return fetch({
    url: '/open/supplier/documentMenu/save',
    method: 'post',
    data,
  });
}
// 接口目录顺序交换
export function changeSeq(data) {
  return fetch({
    url: '/open/supplier/documentMenu/changeSeq',
    method: 'post',
    data,
  });
}
// 删除目录
export function deleteMenu(params) {
  return fetch({
    url: '/open/supplier/documentMenu/delete',
    method: 'get',
    params,
  });
}
// 文档和目录
export function menuAndDoc(params) {
  return fetch({
    url: '/open/supplier/documentMenu/listAndDocument',
    method: 'get',
    params,
  });
}
// 文档详情
export function docView(params) {
  return fetch({
    url: '/open/supplier/document/view',
    method: 'get',
    params,
  });
}
// 文档编辑或者新增
export function docSave(data) {
  return fetch({
    url: 'open/supplier/document/save',
    method: 'post',
    data,
  });
}
// 文档搜索
export function search(params) {
  return fetch({
    url: 'open/supplier/document/listAllAndMenu',
    method: 'get',
    params,
  });
}
