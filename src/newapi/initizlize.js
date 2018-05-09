import axios from 'axios';

let baseURL = process.env.BASE_API;
// let baseURL = "http://graduation.dobell.me/graduation/graduation";

// export const getUserList = params => { return axios.post(`${baseURL}/getUserList`, params);};

/*
* 用户初始化
* */
export const initialize = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/student/initStudent`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};
//核对表格数据
export const checkForm = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/student/studentCheck`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};
// 添加操作记录
export const addOperation = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/operation/addOperation`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};

// 获取操作记录
export const getOperationList = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/operation/getOperationList`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};

// 获取院系信息
export const getAcademyMessage = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/major/getMajorByAcademeId`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};
// 获取班级信息
export const getClassMessage = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/schoolclass/getClassByAcademeAndMajorId`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};

// 用户格式化
export const  deleteAllMessage = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/student/deleteAllForever`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};
