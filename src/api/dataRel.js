import fetch from '@/fetch';

export function list(data) {
  return fetch({
    url: '/open/supplier/dataRel/index',
    method: 'post',
    data,
  });
}


// 修改
export function update(data) {
  return fetch({
    url: '/open/supplier/dataRel/update',
    method: 'post',
    data,
  });
}
// 导出
export function exportExcel(params) {
  return fetch({
    url: '/open/supplier/dataRel/export',
    method: 'get',
    params,
    responseType: 'blob',
  });
}

// export function download(params) {
//   return fetch({
//     url: '/open/supplier/dataRel/download',
//     method: 'get',
//     params,
//     responseType: 'blob',
//   });
// }
// 导入
export function upload(data) {
  return fetch({
    url: '/open/supplier/dataRel/import',
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}
