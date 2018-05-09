import Vue from 'vue'
import Router from 'vue-router'
const _import = require ( './_import_' + process.env.NODE_ENV )
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading
Vue.use ( Router )
/* layout */
// import Layout from '../views/layout/Layout'
import notfound from '../views/errorPage/404.vue'
import dashboard from '../views/dashboard/index.vue'


/**
 *
 **/
export const constantRouterMap = [
    { path : '/login', component : _import ( 'login/index' ), hidden : true },
    { path : '/authredirect', component : _import ( 'login/authredirect' ), hidden : true },
    { path : '/404', component : _import ( 'errorPage/404' ), hidden : true },
    { path : '/401', component : _import ( 'errorPage/401' ), hidden : true },
    {
        path : '/',
        component : resolve => require(['../views/layout/Layout'], resolve),
        redirect : '/dashboard',
        icon : 'people',
        meta : { role : [ 1 ] },
        noDropdown : true,
        hidden : true,
        children : [ { path : 'dashboard', component : _import ( 'dashboard/index' ), name : '首页' } ]
    },
    /*{
     path : '/introduction',
     component : Layout,
     meta : { role : [1] },
     redirect : '/introduction/index',
     icon : 'people',
     noDropdown : true,
     children : [ { path : 'index', component : _import ( 'introduction/index' ), name : '关于我们' } ]
     }*/
]
export default new Router ( {
    // mode: 'history', //后端支持可开
    scrollBehavior : () => ({ y : 0 }),
    routes : constantRouterMap
} )
export const asyncRouterMap = [
    {
      path: '/community',
      component: resolve => require(['../views/layout/Layout'], resolve),
      name : '权限组管理',
      icon : 'component',
      meta : { role : [1,2] },
      children : [
        {
          path:'office',
          component :resolve => require(['../views/community/office.vue'], resolve),
          name : '教务管理员',
          meta : { role : [1] }
        },
        {
          path:'academy',
          component :resolve => require(['../views/community/academy.vue'], resolve),
          name : '学院管理员',
          meta : { role : [1] }
        },
        {
          path:'class',
          component :resolve => require(['../views/community/class.vue'], resolve),
          name : '班级管理员',
          meta : { role : [1,2] }
        },
      ]
    },
    {
      path : '/studentImformation',
      component : resolve => require(['../views/layout/Layout'] , resolve),
      name : '学籍信息管理',
      meta : { role : [1,2,3] },
      icon : 'content',
      children : [
        {
            path : 'message',
            component : resolve => require([ '../views/studentImformation/message.vue'], resolve),
            name : '学籍信息维护',
        }
      ]
    },
    {
      path : '/initialize',
      component : resolve => require(['../views/layout/Layout'] , resolve),
      name : '初始化信息管理',
      meta : { role : [1,2] },
      icon : 'data',
      children : [
        {
          path : 'initialize',
          component : resolve => require([ '../views/initialize/initialize.vue'], resolve),
          name : '信息初始化',
          meta : { role : [ 1 ] }
        },
        {
          path : 'academyManage',
          component : resolve => require([ '../views/initialize/academyManage.vue'], resolve),
          name : '院系信息管理',
          meta : { role : [ 1,2 ] }
        },
        {
          path : 'classManage',
          component : resolve => require([ '../views/initialize/classManage.vue'], resolve),
          name : '班级信息管理',
          meta : { role : [ 1,2 ] }
        },
      ]
    },
    { path : '*', redirect : '/404', hidden : true }
  ]
