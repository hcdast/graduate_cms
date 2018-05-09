/**
 * 社区管理api
 */
import axios from 'axios';

let baseURL = process.env.BASE_API;
// let baseURL = "http://120.27.231.217:8090/backend";

// 社区内容管理
export const getMicroblogList = params =>{
    return axios({
        method: 'post',
        url:`${baseURL}/getMicroblogList`,
        // 跨域
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};
// 更新内容
export const updateMicroblogStatus = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/updateMicroblogStatus`,
        // 跨域
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
}


// 举报处理
export const getReportList = params =>{
    return axios({
        method: 'post',
        url:`${baseURL}/getReportList`,
        // 跨域
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
}

// 修改举报
export const updateReport = params =>{
    return axios({
        method: 'post',
        url:`${baseURL}/updateReport`,
        // 跨域
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
}

// 获取所属模块
export const getMicroblogTopicList = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/getMicroblogTopicList`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
}

//Banner管理
export const getBannerList = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/getBannerList`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
}
//上传banner
export const updateBanner = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/updateBanner`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
}

export const getHomePicList = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/getHomePicList`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
}

export const updateHomePic = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/updateHomePic`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
}