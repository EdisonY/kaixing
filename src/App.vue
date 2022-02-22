<template>
    <div id="app">
        <div class="nav">
            <el-menu 
            :default-active="activeIndex" 
            class="el-menu-demo" 
            mode="horizontal" 
            @select="handleSelect"
            background-color="#000c17"
            text-color="#fff"
            active-text-color="#ffd04b">
                <el-submenu index="1">
                    <template slot="title">运输计划管理</template>
                    <el-menu-item index="1-1">
                        <router-link to="/choseline">开行方案</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-2">
                        <router-link to="/offlinescheme">离线方案对比</router-link>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item index="2"><router-link to="/monitor">日常监控</router-link></el-menu-item>
                <el-submenu index="3">
                    <template slot="title">应急会商指挥</template>
                    <el-menu-item index="3-1">
                        <router-link to="/emergency/rainstorm">暴雨机场大面积航班延误</router-link>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item index="4"><router-link to="/analysis">历史数据分析</router-link></el-menu-item>
                <el-menu-item index="5"><router-link to="/setting">系统参数设置</router-link></el-menu-item>
            </el-menu>
        </div>
        <div class="subMain">
            <router-view />
        </div>
    </div>
</template>

<script>
import root from '@/layout/components/root.vue'
export default {
    name: 'App',
    components: { root },
    data(){
        return{
            activeIndex: '1-1',
        }
    },
    async created() {
        
    },
    methods: {
        handleSelect(key, keyPath) {
        console.log(key, keyPath);
    }
    }
}
</script>
<style>
html body{font-family:'Microsoft YaHei' !important;}
body,html{height:100%;}
.clearfix:after{content:" ";display:block;clear:both;height:0}
.fl{float:left}
.fr{float:right}
*{margin:0;padding:0}
fieldset,img,input{border:0;background:none}
address,caption,cite,code,dfn,em,i,optgroup,strong,th,var{font-style:normal;font-weight:400}
h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:400}
button,input,optgroup,option,select,textarea{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;*font-size:100%}
body{line-height:1.5;}
li,ol,ul{list-style:none}
a{text-decoration:none}
a:focus,input:focus,button:focus{outline:none}

</style>