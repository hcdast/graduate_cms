/**
 * Created by Nemo on 2018/1/12.
 */
import axios from 'axios';

let baseURL = process.env.BASE_API;
// let baseURL = "http://120.27.231.217:8090/backend";
export const getSchoolList = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/getSchoolList`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
}