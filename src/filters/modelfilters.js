/**
 * 所属模块的过滤
 */

 import { getMicroblogTopicList } from '../newapi/society'
 import store from '../store/index'

 export function getMicroblogTopics(callback){
     let params = {
         aid:store.getters.aid,
         page:1,
         size:100
     };
     let microblogTopics = [];
     getMicroblogTopicList(params).then((res)=>{
        if(res.status!=200){
            return false;
        }else {
            if(!res.data||res.data.code !=0){
                return false;
            }else{
                for(let i =0; i< res.data.data.length; i++){
                    microblogTopics.push({
                        key: res.data.data[i].name,
                        val: res.data.data[i].id
                    })
                }
            }
        }
        callback(microblogTopics)
     })

 }
