import axios from 'axios';

let baseURL = process.env.BASE_API;

// 今日整体趋势
export const getTodayData = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/getTodayData`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};

// 整体趋势
export const getTrendData = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/getTrendData`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};

// 社区分析
export const getCommunityData = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/getCommunityData`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};

// 预约分析
export const getAppointmentData = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/getAppointmentData`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};

// 题库分析
export const getExerciseData = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/getExerciseData`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
}

