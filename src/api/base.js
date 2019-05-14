import fetch from '@/fetch';

export function findSupplerById(data) {
  return fetch({
    url: '/open/supplier/externalInterface/findSupplerById',
     method: 'post',
     data,
  });
}

export function findCorporationList(data) {
  return fetch({
    url: '/open/supplier/externalInterface/findCorporationList',
     method: 'post',
     data,
  });
}
