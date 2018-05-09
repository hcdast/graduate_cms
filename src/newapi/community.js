/**
 * Created by Nemo on 2018/1/2.
 */
import axios from 'axios';

let baseURL = process.env.BASE_API;
// let baseURL = "http://graduation.dobell.me/graduation/graduation";

// export const getUserList = params => { return axios.post(`${baseURL}/getUserList`, params);};

/*
* 用户封禁/解封
* */
export const updateAdmin = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/admin/deleteOrResumeAdminByid`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};
/*
 * 获取超级管理员列表
 * */
export const getSupperAdmin = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/admin/getSupperAdminList`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};
/**
 * 获取学院管理员
 * @param {*} params
 */
export const getAcademeAdmin = params => {
    return axios({
        method : 'post',
        url : `${baseURL}/admin/getAcademeAdminByNameAnd`,
        header : {
            'Content-type' : 'application/x-www-form-urlencoded'
        },
        params : params
    })
};
/*
获取班级管理员
*/
export const getClassAdmin = params => {
    return axios({
        method : 'post',
        url : `${baseURL}/admin/getClassAdminByNameAnd`,
        header : {
            'Content-type' : 'application/x-www-form-urlencoded'
        },
        params : params
    })
};

/****
 * 通过学院ID获取名称
 */
export const getAcademeName = params => {
    return axios({
        method : 'post',
        url : `${baseURL}/academe/getAcademeById`,
        header : {
            'Content-type' : 'application/x-www-form-urlencoded'
        },
        params : params
    })
};


/*
* 新增管理员
* */
export const createdAdmin = params => {
    return axios({
        method : 'post',
        url : `${baseURL}/admin/addAdmin`,
        header : {
            'Content-type' : 'application/x-www-form-urlencoded'
        },
        params : params
    })
};

/**
 *获取所有的院系**/
export const getAcademy = params => {
    return axios({
        method : 'post',
        url : `${baseURL}/academe/getAcademeList`,
        header : {
            'Content-type' : 'application/x-www-form-urlencoded'
        },
        params : params
    })
};
// 获取所有的专业
export const getMajor = params => {
    return axios({
        method : 'post',
        url : `${baseURL}/major/getMajorList`,
        header : {
            'Content-type' : 'application/x-www-form-urlencoded'
        },
        params : params
    })
};
// 获取所有的班级
export const getClass = params => {
    return axios({
        method : 'post',
        url : `${baseURL}/schoolclass/getSchoolClassList`,
        header : {
            'Content-type' : 'application/x-www-form-urlencoded'
        },
        params : params
    })
};


// 上传Excel表格数据
export const importStudentBatch = params => {
    return axios({
        method : 'post',
        url : `${baseURL}/importStudentBatch`,
        header : {
            'Content-type' : 'application/x-www-form-urlencoded'
        },
        params : params
    })
};

export const updateOrder = params => {
    return axios ({
        method : 'post',
        url : `${baseURL}/updateOrder`,
        header : {
            'Content-type' : 'application/x-www-form-urlencoded'
        },
        params : params
    })
}
