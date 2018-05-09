/**
 * Created by Nemo on 2018/1/9.
 */
import axios from 'axios';

let baseURL = process.env.BASE_API;
// let baseURL = "https://xuechemaster.com/driver/article";
baseURL = baseURL.replace(/backend/,'article')
/*
* 添加/修改文章
* */
export const updateArticle = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/updateArticle`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};

export const getArticleDetailList = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/getArticleDetailList`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};

export const getArticleDetail = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/getArticleDetail`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
};

export const uploadURL = process.env.BASE_API + '/uploadResourceFile'
