import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Cookies from 'js-cookie'


Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRoutes = [
    {
        path: '/programme',
        component: () => import('@/layout'),
        name:'开行方案编制',
        meta: { title: '开行方案编制', icon: 'form' },
        children: [
            {
                path: 'base',
                name: '基础信息及参数导入',
                component: () => import('@/views/programme/base'),
                meta: { title: '基础信息及参数导入'}
            },
            {
                path: 'routescheme',
                name: '选择交路方案',
                component: () => import('@/views/programme/routescheme'),
                meta: { title: '选择交路方案'}
            },
            {
                path: 'drawrunning',
                name: '铺画运行图',
                component: () => import('@/views/programme/drawrunning'),
                meta: { title: '铺画运行图'}
            },
            {
                path: 'verunning',
                name: '运行图校验',
                component: () => import('@/views/programme/verunning'),
                meta: { title: '运行图校验'}
            }
        ]
    },
    {
        path: '/choseline',
        name: '线路选择',
        hidden: true,
        component: () => import('@/views/programme/choseLine'),
        meta: { title: '线路选择'}
    },
    {
        path: '/emergency',
        component: () => import('@/layout/empty'),
        name:'应急会商指挥',
        meta: { title: '应急会商指挥', icon: 'form' },
        hidden: true,
        children: [
            {
                path: 'rainstorm',
                name: '暴雨机场大面积航延',
                component: () => import('@/views/emergency/rainstorm'),
                meta: { title: '暴雨机场大面积航延'}
            }
        ]
    },
    {
        path: '/monitor',
        name:'开行方案编制',
        component: () => import('@/views/monitor'),
        hidden: true
    },
    {
        path: '/analysis',
        name:'历史数据分析',
        component: () => import('@/views/analysis'),
        hidden: true
    },
    {
        path: '/setting',
        name:'系统参数设置',
        component: () => import('@/views/setting'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    }
]


let routes = [...constantRoutes]
console.log(routes);
const createRouter = () => new Router({
    scrollBehavior: () => ({ y: 0 }),
    mode:'history',
    // base: BASEROUTER,
    routes:constantRoutes
})

const router = createRouter()


router.beforeEach((to, from, next) => {
    // if(localStorage.getItem('token') && localStorage.getItem('token') != ''){
    //     if(to.path == '/login'){
    //         next('/')
    //     }else{
    //         next()
    //     }
    // }else{
    //     if(to.path == '/login'){
    //         next()
    //     }else{
    //         next('/login')
    //     }
    // }
    next()



})

Vue.prototype.$resetRoute = function(){
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
