import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import communityAPI from './community'

Mock.setup({
  timeout: '350-600'
})

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername);
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout);
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo);

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList);
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle);
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv);

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser);
Mock.mock(/\/community\/getUsers/, 'get', communityAPI.getUsers);


Mock.mock(/\/search\/admin/, 'get', remoteSearchAPI.searchAdmin);
Mock.mock(/\/community\/getAdmins/, 'get',communityAPI.getAdmins);

Mock.mock(/\/community\/getUsers/, 'get', communityAPI.getUsers)
Mock.mock(/\/community\/getOrders/, 'get', communityAPI.getOrders)

Mock.mock(/\/search\/order/, 'get', remoteSearchAPI.searchOrder);
Mock.mock(/\/community\/getOrders/, 'get', communityAPI.getOrders);
// export default Mock
