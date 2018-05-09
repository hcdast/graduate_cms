import { param2Obj } from '@/utils'
const userMap = {
    god : {
        id : 10001,
        role : 1,
        openId : 'god',
        avatar : 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name : '超级管理员',
        school: 1001
    },
    admin : {
        id : 10002,
        role : 2,
        openId : 'admin',
        avatar : 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name : '运营管理员',
        school: 1002
    },
    schoolAdmin : {
        id : 10003,
        role : 3,
        openId : 'schoolAdmin',
        avatar : 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name : '驾校管理员',
        school: 10001
    }
}
export default {
    loginByUsername : config => {
        const { username } = JSON.parse ( config.body )
        return userMap[ username ]
    },
    getUserInfo : config => {
        // const { openId } = JSON.parse ( config.body )
        const { token } = param2Obj ( config.url )
        if (userMap[ token ]) {
            return userMap[ token ]
        } else {
            return false
        }
    },
    logout : () => 'success'
}
