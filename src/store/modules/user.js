import { loginByUsername, logout, getUserInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { checkUserLogin } from '../../newapi/login';
const user = {
    state : {
        aid : null,
        status : '',
        // openId : getToken (),
        account : '',
        realName : '',
        introduction : '',
        roles : [],
        schoolId: null,
        init: null,

    },
    mutations : {
        SET_AID : ( state, id ) => {
            state.aid = id
        },

        SET_ACCOUNT : ( state, account ) => {
            state.account = account
        },
        SET_ROLES : ( state, authority ) => {
            state.roles.push( authority)
        },
        SET_SCHOOLID : (state, schoolId) => {
            state.schoolId = schoolId
        },
        SET_REALNAME: (state, realName) => {
            state.realName = realName
        },
        SET_INIT: (state, isInit) => {
            state.init = isInit
        }
    },
    actions : {
        // 用户名登录
        /*LoginByUsername( { commit }, userInfo ) {
            const username = userInfo.username.trim ()
            return new Promise ( ( resolve, reject ) => {
                loginByUsername ( username, userInfo.password ).then ( response => {
                    const data = response.data
                    setToken ( response.data.openId )
                    commit ( 'SET_TOKEN', data.openId )
                    resolve ()
                } ).catch ( error => {
                    reject ( error )
                } )
            } )
        },*/
        CheckUserLogin({commit}, userInfo){
            return new Promise( (resolve, reject) => {
                checkUserLogin(userInfo).then(response =>{
                    /*if(response.status!=200){
                        this.$message.error ( '请求失败，网络原因请重试！' );
                    }else {
                        if(response.data.data||response.data.code!=0) this.$message.error ( '请求失败，网络原因请重试！' );
                        else{
                            sessionStorage.setItem('user', JSON.stringify(userInfo))
                            resolve ( response )
                        }
                    }*/
                    sessionStorage.setItem('user', JSON.stringify(userInfo))
                    resolve ( response )

                }).catch( error => {
                    reject( error )
                })
            })
        },
        GetUserInfo({commit},userInfo){
            return new Promise( (resolve, reject) => {
                checkUserLogin(userInfo).then(response =>{
                    const data = response.data.data
                    sessionStorage.setItem('user', JSON.stringify(userInfo))
                    commit ( 'SET_AID', data[1].id)
                    commit ( 'SET_ROLES', data[1].authority )
                    commit ( 'SET_ACCOUNT', data[1].account )
                    commit ( 'SET_SCHOOLID', data[1].schoolId )
                    commit ( 'SET_REALNAME', data[1].realName )
                    commit ( 'SET_INIT', data[0].isInit )
                    resolve ( response )
                }).catch( error => {
                    reject( error )
                })
            })
        },
        // 获取用户信息
        /*GetUserInfo( { commit, state } ) {
            return new Promise ( ( resolve, reject ) => {
                getUserInfo ( state.openId ).then ( response => {
                    if (! response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
                        reject ( 'error' )
                    }
                    const data = response.data
                    commit ( 'SET_ROLES', data.role )
                    commit ( 'SET_NAME', data.name )
                    commit ( 'SET_AVATAR', data.avatar )
                    commit ( 'SET_SCHOOL', data.school )
                    resolve ( response )
                } ).catch ( error => {
                    reject ( error )
                } )
            } )
        },*/
        // },
        // 登出
        LogOut( { commit, state } ) {
            return new Promise ( resolve => {
                sessionStorage.removeItem('user')
                resolve ()
            } )
        },
        // 前端 登出
        FedLogOut( { commit } ) {
            return new Promise ( resolve => {
               sessionStorage.removeItem('user')
               resolve ()
            } )
        },
        // 动态修改权限
        /*ChangeRole( { commit }, role ) {
            return new Promise ( resolve => {
                commit ( 'SET_TOKEN', role )
                setToken ( role )
                getUserInfo ( role ).then ( response => {
                    const data = response.data
                    commit ( 'SET_ROLES', data.role )
                    commit ( 'SET_NAME', data.name )
                    commit ( 'SET_AVATAR', data.avatar )
                    commit ( 'SET_INTRODUCTION', data.introduction )
                    resolve ()
                } )
            } )
        }*/
    }
}
export default user
