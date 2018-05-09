/**
 * Created by Nemo on 2017/11/16.
 */
import fetch from '@/utils/fetch'
export function fetchUsers ( params ) {
    return fetch ( {
        url : '/community/getUsers',
        method : 'get',
        params: params
    })
}
export function fetchAdmins ( params ) {
    return fetch({
        url : '/community/getAdmins',
        method : 'get',
        params:params
    })
}
export function fetchStudents (params){
    return fetch({
        url:'/community/getStudents',
        method: 'get',
        params:params
    })
}
export function fetchOrders (params){
    return fetch({
        url:'/community/getOrders',
        method : 'get',
        params:params
    })
}
