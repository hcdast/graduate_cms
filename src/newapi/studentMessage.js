/**
 * Created by Nemo on 2018/1/2.
 */
import axios from 'axios';

let baseURL = process.env.BASE_API;
// let baseURL = "http://graduation.dobell.me/graduation/graduation";

// 获取表格数据
export const getStudentListParam = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/student/getStudentListByFiveParam`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};

// 跟新学生status
export const updateStudent = data => {
    return axios({
        method: 'post',
        url: `${baseURL}/student/updateStudentList`,
        headers: {
            'Content-type': 'application/json'
        },
        data:data
    })
};

// 班级管理员获取学生
export const getStudentListClass = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/student/getStudentByAdminClassList`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};
