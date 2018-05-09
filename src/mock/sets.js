/**
 * Created by Nemo on 2017/12/26.
 */
import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const users = []
const total = 100

for( let i=0; i<total; i++){
    users.push(Mock.mock({
        openId: Mock.Random.string(12),
        head: Mock.Random.string(12),
        nickname: Mock.Random.name(),
        realname: Mock.Random.cname(),
        description: Mock.Random.csentence(),
        userType: Mock.Random.integer(0,2),
        phone: Mock.Random.string(11),
        sex: Mock.Random.integer(0, 1),
        createtime: Mock.Random.datetime('y-MM-dd HH:mm:ss'),
        lastlaunchtime: Mock.Random.datetime('y-MM-dd HH:mm:ss'),
        status: Mock.Random.integer(0, 1)
    }))
}

export default {
    getUsers: config => {
        const { openId, roleType,nameType,userType, keyword,limit, page } = param2Obj(config.url)
        let filterusers = users.filter(item => {
            if(userType && item.userType!==userType) return false;
            return true
        })
        const pageList = filterusers.filter((item,index) => index < limit * page && index >= limit * (page - 1))

        return {
            total: filterusers.length,
            data: pageList
        }
    },
    getAdmins: config=>{
        const { openId,roleType,workType,adminType,keyword,limit,page} = param2Obj(config.url)
        let filteradmins = admins.filter(item =>{
            if(adminType && item.adminType!==adminType) return false;
            return false
        })
        const pageList=filteradmins.filter((item,index)=>index <limit * page && index >=limit*(page-1))

        return {
            total: filteradmins.length,
            data : pageList
        }
    },
    getStudents: config=>{
        const { openId,orderStatus, school,orderType,keyword,limit,page} = param2Obj(config.url)
        let filterorders = orders.filter(item =>{
            if(orderType && item.orderType!==orderType) return false;
            return false
        })
        const pageList=filterorders.filter((item,index)=>index <limit * page && index >=limit*(page-1))

        return {
            total: filterorders.length,
            data : pageList
        }
    },
    getOrders: config=>{
        const { openId,orderStatus, school,orderType,keyword,limit,page} = param2Obj(config.url)
        let filterorders = orders.filter(item =>{
            if(orderType && item.orderType!==orderType) return false;
            return false
        })
        const pageList=filterorders.filter((item,index)=>index <limit * page && index >=limit*(page-1))

        return {
            total: filterorders.length,
            data : pageList
        }
    }
}

