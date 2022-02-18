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
        path: '/proramme',
        component: Layout,
        name:'开行方案编制',
        alwaysShow: false,
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
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },
]


let routes = [...constantRoutes]
const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    mode:'history',
    // base: BASEROUTER,
    routes:constantRoutes
})

const router = createRouter()


router.beforeEach((to, from, next) => {
    if(localStorage.getItem('token') && localStorage.getItem('token') != ''){
        if(to.path == '/login'){
            next('/')
        }else{
            next()
        }
    }else{
        if(to.path == '/login'){
            next()
        }else{
            next('/login')
        }
    }
    // next()



    // if(to.path == '/rungraph' || to.path == '/pfbasic' || to.path == '/simulation' || to.path == '/indicator'){
    //     store.state.app.sidebar.opened = false
    // }else{
    //     store.state.app.sidebar.opened = true
    // }
    // if(kg){
    //     kg = false
    //     if(sessionStorage.getItem('line') != '' && typeof(sessionStorage.getItem('line')) == 'string'){
    //         next()
    //     }else if(to.path == '/choseline' || to.path == '/login'){
    //         next()
    //     }else{
    //         Vue.prototype.$message.error('请先选择线路！')
    //         next('/choseline')
    //     }
    //     setTimeout(()=>{
    //         kg = true
    //     })
    // }

    // next()
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
