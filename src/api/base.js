import fetch from '@/fetch';
// 根据id查询供应商
export function findSupplerById(data) {
  return fetch({
    url: '/open/supplier/externalInterface/findSupplerById',
     method: 'post',
     data,
  });
}
// 查询主体
export function findCorporationList(data) {
  return fetch({
    url: '/open/supplier/externalInterface/findCorporationList',
     method: 'post',
     data,
  });
}
