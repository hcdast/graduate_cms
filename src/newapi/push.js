/**
 * 社区管理api
 */
import axios from 'axios';

let baseURL = process.env.BASE_API;
// let baseURL = "http://120.27.231.217:8090/backend";

// 推送
export const sendPush = params => {
    return axios({
        method: 'post',
        url:`${baseURL}/sendPush`,
        // 跨域
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
}

// 获取推送历史
export const getNotificationList = params => {
    return axios({
        method: 'post',
        url:`${baseURL}/getNotificationList`,
        // 跨域
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
}
