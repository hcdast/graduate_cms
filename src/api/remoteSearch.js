import fetch from '@/utils/fetch'

export function userSearch(name) {
  return fetch({
    url: '/search/user',
    method: 'get',
    params: { name }
  })
}
export function adminSearch(name) {
  return fetch({
      url:'/search/admin',
      method: 'get',
      params:{ name }
  })
}
export function studentSearch(name){
  return fetch( {
      url : '/search/student',
      method : 'get',
      params : { name }
  })
}
export function orderSearch(name){
  return fetch({
      url:'/search/order',
      method:'get',
      params:{ name }
  })
}