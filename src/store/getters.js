const getters = {
    aid : state => state.user.aid,
    init: state => state.user.init,
    academeIdOfStore: state => state.user.academeIdOfStore,
    sidebar : state => state.app.sidebar,
    visitedViews : state => state.app.visitedViews,
    account : state => state.user.account,
    realName : state => state.user.realName,
    introduction : state => state.user.introduction,
    roles : state => state.user.roles,
    permission_routers : state => state.permission.routers,
    addRouters : state => state.permission.addRouters,
}
export default getters
