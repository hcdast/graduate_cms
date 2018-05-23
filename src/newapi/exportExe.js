import axios from 'axios';
import qs from 'qs';//转化data为querystring

let baseURL = "http://api.dobell.me/phpstatic/excel/";
// let baseURL = "http://graduation.dobell.me/graduation/graduation";

// 导出毕业一览表
export const exportGraduateListParam = data => {
    return axios({
        method: 'post',
        url: `${baseURL}/ExcelBuilder1.php`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data), // 参数
        responseType: 'blob' // 表明返回服务器返回的数据类型 **重要的地方**
    })
};

// 导出分会审批表
export const exportJudeListParam = data => {
    return axios({
        method: 'post',
        url: `${baseURL}/ExcelBuilder2.php`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data:qs.stringify(data),
        responseType: 'blob' // 表明返回服务器返回的数据类型 **重要的地方**
    })
};
