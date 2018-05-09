/**
 * Created by Nemo on 2018/2/2.
 */
import axios from 'axios';

let baseURL = process.env.BASE_API;
// let baseURL = "https://xuechemaster.com/driver/article";
export const updateSchoolPicture = (params) =>{
    return axios({
        method: 'post',
        url: `${baseURL}/updateSchoolPicture`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    })
}
