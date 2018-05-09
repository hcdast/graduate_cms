/**
 * Created by Nemo on 2018/1/12.
 */
/*
* 一些基本数据过滤器
* */

import { getAcademy, getMajor, getClass } from '../newapi/community'
import store from '../store/index'

export function getAcademys(callback) {
    let academys = [];
    getAcademy().then((res) => {
        if(res.status!=200) {
            return false;
        }else {
            if(!res.data || res.data.code!=0){
                return false;
            }else {
                for(let i =0; i< res.data.data.length; i++){
                    academys.push({
                        key: res.data.data[i].academeName,
                        val: res.data.data[i].id
                    })
                }
            }
        }
        callback(academys)
    })
 }

export function getMajors(callback){
    let majors=[];
    getMajor().then((res)=>{
        if(res.status!=200){
            return false;
        }else {
            if(!res.data||res.data.code !=0){
                return false;
            }else{
                for(let i =0; i< res.data.data.length; i++){
                    majors.push({
                        key: res.data.data[i].majorName,
                        val: res.data.data[i].id,
                        acaid: res.data.data[i].academeId
                    })
                }
            }
        }
        callback(majors)
    })
}

export function getClasses(callback){
    let classes = [];
    getClass().then((res)=>{
        if(res.status!=200){
            return false;
        }else {
            if(!res.data||res.data.code !=0){
                return false;
            }else{
                for(let i =0; i< res.data.data.length; i++){
                    classes.push({
                        key: res.data.data[i].className,
                        val: res.data.data[i].id,
                        acaid: res.data.data[i].academeId,
                        majid: res.data.data[i].majorId,
                    })
                }
            }
        }
        callback(classes)
    })
}

