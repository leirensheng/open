import fetch from '@/fetch';

export default function getRoute() {
  return fetch({
    url: '/getRoute',
     method: 'get',
  });
}
