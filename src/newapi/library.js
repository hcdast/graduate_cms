import axios from 'axios';

// let baseURL = 'http://120.27.231.217:8090/backend';

let baseURL = process.env.BASE_API;
// 数据获取
export const getExerciseList = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/getExerciseList`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};

export const updateExercise = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/updateExercise`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};

// 标签库列表
export const getExerciseLabelList = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/getExerciseLabelList`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};

// 标签库列表修改
export const updateExerciseLabel = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/updateExerciseLabel`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};