import fetch from '@/fetch';
// 根据id查询供应商
export function findSupplerById(params) {
  return fetch({
    url: '/open/supplier/externalInterface/findSupplerById',
     method: 'get',
     params,
  });
}
// 查询主体
export function findCorporationList(params) {
  return fetch({
    url: '/open/supplier/externalInterface/findCorporationList',
     method: 'get',
     params,
  });
}

// 查询区域
export function findRegion(params) {
  return fetch({
    url: '/open/supplier/externalInterface/findRegion',
     method: 'get',
     params,
  });
}
