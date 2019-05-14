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

// 新增

export function add(data) {
  return fetch({
    url: '/open/supplier/systemSupplier/save',
    method: 'post',
    data,
  });
}

// 同步基础属性接口失败明细
export function partsFailList(data) {
  return fetch({
    url: '/open/supplier/outerSyncFail/parts/index',
    method: 'post',
    data,
  });
}
// 同步价格接口失败明细
export function priceFailList(data) {
  return fetch({
    url: '/open/supplier/outerSyncFail/price/index',
    method: 'post',
    data,
  });
}

// 禁用
export function disable(data) {
  return fetch({
    url: '/open/supplier/systemSupplier/stop',
    method: 'post',
    data,
  });
}

// 启用
export function enable(data) {
  return fetch({
    url: '/open/supplier/systemSupplier/active',
    method: 'post',
    data,
  });
}
