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
        path:'/',
        redirect:'/line/comprehensive'
    },
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
        path: '/offlinescheme',
        name: '离线方案对比',
        hidden: true,
        component: () => import('@/views/offlin/offlinescheme'),
        meta: { title: '离线方案对比'}
    },
    {
        path: '/offlineresult',
        name: '离线方案对比结果',
        hidden: true,
        component: () => import('@/views/offlin/offlineresult'),
        meta: { title: '离线方案对比结果'}
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
                component: () => import('@/views/emergency'),
                meta: { title: '暴雨机场大面积航延'}
            },
            {
                path: 'majorevent',
                name: '重大活动运营',
                component: () => import('@/views/emergency/MajorEvent'),
                meta: { title: '重大活动运营'}
            },
            {
                path: 'daily',
                name: '常规运营',
                component: () => import('@/views/emergency/Daily'),
                meta: { title: '常规运营'}
            }
        ]
    },
    {
        path: '/cctv',
        component: () => import('@/layout/empty'),
        name:'CCTV监控',
        meta: { title: 'CCTV监控', icon: 'form' },
        hidden: true,
        children: [
            {
                path: 'marshalling',
                name: 'CCTV编组',
                component: () => import('@/views/cctv/marshalling'),
                meta: { title: 'CCTV编组'}
            },
            {
                path: 'preview',
                name: 'CCTV实时监控',
                component: () => import('@/views/cctv/preview'),
                meta: { title: 'CCTV实时监控'}
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
        path: '/line/comprehensive',
        name:'线网综合图',
        component: () => import('@/views/line/comprehensive'),
        hidden: true
    },
    {
        path: '/line/marshalling',
        name: '线网集群',
        hidden: true,
        component: () =>
            import ('@/views/marshalling'),
        meta: { title: '线网集群', type: true }
    },
    {
        path: '/line/passengerflow',
        name:'客流信息',
        component: () => import('@/views/line/passengerflow'),
        hidden: true
    },
    {
        path: '/line/driving',
        name:'行车信息',
        component: () => import('@/views/line/driving'),
        hidden: true
    },
    {
        path: '/line/energy',
        name:'能耗信息',
        component: () => import('@/views/line/energy'),
        hidden: true
    },
    {
        path: '/line/monitor',
        name:'设备监视',
        component: () => import('@/views/line/monitor'),
        hidden: true
    },
    {
        path: '/line/alarm',
        name:'报警信息',
        component: () => import('@/views/line/alarm'),
        hidden: true
    },
    {
        path: '/line/plane',
        name:'车站平面图',
        component: () => import('@/views/line/plane'),
        hidden: true
    },
    {
        path: '/situation/detailed',
        name:'专业性指标详细展示',
        component: () => import('@/views/situation/detailed'),
        hidden: true
    },
    {
        path: '/situation/trend',
        name:'指标趋势分析',
        component: () => import('@/views/situation/trend'),
        hidden: true
    },


    {
        path: '/policy/driving',
        name:'行车辅助决策',
        component: () => import('@/views/policy/driving'),
        hidden: true
    },
    {
        path: '/policy/passengerflow',
        name:'客流辅助决策',
        component: () => import('@/views/policy/passengerflow'),
        hidden: true
    },
    {
        path: '/policy/people',
        name:'人员物资辅助',
        component: () => import('@/views/policy/people'),
        hidden: true
    },
    {
        path: '/policy/assessment',
        name:'重大事件后评估',
        component: () => import('@/views/policy/assessment'),
        hidden: true
    },

    {
        path: '/consultation/management',
        name:'应急处置',
        component: () => import('@/views/consultation/management'),
        hidden: true
    },
    {
        path: '/consultation/soldier',
        name:'应急单兵接入',
        component: () => import('@/views/consultation/soldier'),
        hidden: true
    },


    {
        path: '/tool/command',
        name:'信息与命令',
        component: () => import('@/views/tool/command'),
        hidden: true
    },
    {
        path: '/tool/alarm',
        name:'报警',
        component: () => import('@/views/tool/alarm'),
        hidden: true
    },
    {
        path: '/tool/message',
        name:'消息',
        component: () => import('@/views/tool/message'),
        hidden: true
    },
    {
        path: '/tool/important',
        name:'重要活动',
        component: () => import('@/views/tool/important'),
        hidden: true
    },
    {
        path: '/tool/report',
        name:'报表',
        component: () => import('@/views/tool/report'),
        hidden: true
    },

    {
        path: '/system/indicator',
        name:'指标配置管理',
        component: () => import('@/views/system/indicator'),
        hidden: true
    },
    {
        path: '/system/role',
        name:'角色权限管理',
        component: () => import('@/views/system/role'),
        hidden: true
    },
    {
        path: '/system/function',
        name:'系统功能',
        component: () => import('@/views/system/function'),
        hidden: true
    },
    {
        path: '/system/about',
        name:'关于综合决策',
        component: () => import('@/views/system/about'),
        hidden: true
    },
    {
        path: '/new',
        name:'新增标签',
        component: () => import('@/views/new'),
        hidden: true
    },
    {
        path: '/nav01',
        name:'导航01',
        component: () => import('@/views/20221008/nav01'),
        hidden: true
    },
    {
        path: '/tmp/container1',
        name:'容器1',
        component: () => import('@/views/tmp/container1'),
        meta: { url: 'http://frp.funenc.xyz:7245/link/YYl2chSc'},
        hidden: true
    },
    {
        path: '/tmp/container2',
        name:'容器2',
        component: () => import('@/views/tmp/container2'),
        meta: { url: 'http://frp.funenc.xyz:7245/link/DqAzVYn3'},
        hidden: true
    },
    {
        path: '/tmp/container3',
        name:'容器3',
        component: () => import('@/views/tmp/container3'),
        meta: { url: 'http://frp.funenc.xyz:7245/link/XN5OcWPk'},
        hidden: true
    },
    {
        path: '/tmp/container4',
        name:'容器4',
        component: () => import('@/views/tmp/container4'),
        meta: { url: 'http://172.51.216.64/sdss/tc.html?name=img1016.png'},
        hidden: true
    },
        // {
    //     path: '/tmp/container5',
    //     name:'容器5',
    //     component: () => import('@/views/tmp/container'),
    //     meta: { url: 'http://frp.funenc.xyz:7245/link/YYl2chSc'},
    //     hidden: true
    // },
            // {
    //     path: '/tmp/container6',
    //     name:'容器6',
    //     component: () => import('@/views/tmp/container'),
    //     meta: { url: 'http://frp.funenc.xyz:7245/link/YYl2chSc'},
    //     hidden: true
    // },

    
    
    
    
    
    
    
    




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
