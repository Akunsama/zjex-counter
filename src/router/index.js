import Vue from 'vue'
import Router from 'vue-router'

import Index from './map/Index'
import EquityRegister from './map/EquityRegister'
import AboutUs from './map/AboutUs'
import Home from './map/Home'

//import Register from './map/Register'


//重定向 放最后面
import Redirect from './map/Redirect'

Vue.use(Router)

export default new Router({
//	mode: 'history',
    routes: [
        Index, //首页模块
        EquityRegister,//股权登记页面
        AboutUs,//关于我们
        Home,//进入控台
     // Register, //注册页模块

        Redirect, //路由重定向(访问不存在的页面时，重定向到这个页面) 放最后面
    ]
})




///* layout */
//import Layout from '../views/layout/Layout';
//
//// 首页
//const homepage = resolve => require(['@/views/homepage/index'], resolve)
//// 股权登记
//// const homeregis = resolve => require(['@/views/homeregis/index'], resolve)
//// 关于我们
//// const aboutus = resolve => require(['@/views/aboutus/index'], resolve)
//
//// 注册
//// const register = resolve => require(['@/views/register/index'], resolve)
//
//// 登陆
//// const login = resolve => require(['@/views/login/index'], resolve)
//
//
///* error page */
//const Err404 = resolve => require(['@/views/error/404'], resolve)
//const Err401 = resolve => require(['@/views/error/401'], resolve)
//
//
//
//export const constantRouterMap = [
//{ path: '/404', component: Err404, hidden: true },
//{ path: '/401', component: Err401, hidden: true },
//{
//  path: '/',
//  component: Layout,
//  children: [{ path: '/homepage/index', component: homepage ,name: '首页'}]
//},
//{
//   path: '/homeregis',
//   component: Layout,
//   children: [{ path: '/homeregis/index', component: homepage, name: '股权登记' }]
// },
// {
//   path: '/aboutus',
//   component: Layout,
//   children: [{ path: '/aboutus/index', component: homepage, name: '关于我们' }]
// }
//]
//export default new Router({
//// mode: 'history', //后端支持可开
//// scrollBehavior: () => ({ y: 0 }),
//routes: constantRouterMap
//});
//
