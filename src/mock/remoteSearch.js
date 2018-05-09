import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const admins = []
const count = 100

for (let i = 0; i < count; i++) {
    admins.push(Mock.mock({
        name: '@first'
    }))
}
// NameList.push({ name: 'mockPan' })


export default {
    searchUser: config => {
        const { openId, roleType,nameType,userType, keyword,limit, page } = param2Obj(config.url);
        const mockNameList = NameList.filter(item => {
            const lowerCaseName = item.name.toLowerCase()
            if (name && lowerCaseName.indexOf(name.toLowerCase()) < 0) return false;
            return true
        });
        return { items: mockNameList }
    },
    searchAdmin: config => {
        const { name } = param2Obj(config.url);
        const mockNameList = NameList.filter(item => {
            const lowerCaseName = item.name.toLowerCase()
            if (name && lowerCaseName.indexOf(name.toLowerCase()) < 0) return false;
            return true
        });
        return { items: mockNameList }
    },
    searchStudent: config => {
        const { name } = param2Obj(config.url);
        const mockNameList = NameList.filter(item => {
            const lowerCaseName = item.name.toLowerCase()
            if (name && lowerCaseName.indexOf(name.toLowerCase()) < 0) return false;
            return true
        });
        return { items: mockNameList }
    },
    searchOrder: config => {
        const { name } = param2Obj(config.url);
        const mockNameList = NameList.filter(item => {
            const lowerCaseName = item.name.toLowerCase()
            if (name && lowerCaseName.indexOf(name.toLowerCase()) < 0) return false;
            return true
        });
        return { items: mockNameList }
    }
}