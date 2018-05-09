import axios from 'axios';

// let baseURL = 'http://120.27.231.217:8090/backend';

let baseURL = process.env.BASE_API;
// 入驻驾校
export const getSchoolList = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/getSchoolList`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};

// 入驻驾校修改
export const updateSchool = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/updateSchool`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};
// 审核
export const getSchoolApplyList = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/getSchoolApplyList`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};

// 审核修改
export const updateSchoolApply = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/updateSchoolApply`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};

// 班型
export const getClassList = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/getClassList`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};

//班型修改
export const updateClass = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/updateClass`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};

// 教练
export const getTeacherList = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/getTeacherList`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};

//教练修改
export const updateTeacher = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/updateTeacher`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};

// 训练场
export const getGroundList = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/getGroundList`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};

// 训练场修改
export const updateGround = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/updateGround`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};
export const getSchool = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/getSchoolDetail`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
}
export const getSchoolPictureList = (aid,schoolId) => {
    return axios({
        method: 'post',
        url: `${baseURL}/getSchoolPictureList`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: {
            aid: aid,
            schoolId: schoolId
        }
    })
}