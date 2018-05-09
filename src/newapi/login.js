/**
 * Created by Nemo on 2018/1/2.
 */
import axios from 'axios';

let baseURL = process.env.BASE_API;
// let baseURL = "http://graduation.dobell.me/graduation/graduation";

// export const checkUserLogin = params => { return axios.post(`${baseURL}/checkUserLogin`, params);};
export const checkUserLogin = params => {
    return axios({
        method: 'post',
        url: `${baseURL}/admin/checkAdminLogin`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
}
