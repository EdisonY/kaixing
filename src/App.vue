<template>
    <div id="app">
        <div class="nav">
            <!-- <el-menu :default-active="activeIndex"
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
                <el-menu-item index="2">
                    <router-link to="/monitor">日常监控</router-link>
                </el-menu-item>
                <el-submenu index="3">
                    <template slot="title">应急会商指挥</template>
                    <el-menu-item index="3-1">
                        <router-link to="/emergency/rainstorm">暴雨机场大面积航班延误</router-link>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item index="4">
                    <router-link to="/analysis">历史数据分析</router-link>
                </el-menu-item>
                <el-menu-item index="5">
                    <router-link to="/setting">系统参数设置</router-link>
                </el-menu-item>
                <el-submenu index="6">
                    <template slot="title">CCTV监控</template>
                    <el-menu-item index="6-1">
                        <router-link to="/cctv/marshalling">CCTV编组</router-link>
                    </el-menu-item>
                    <el-menu-item index="6-2">
                        <router-link to="/cctv/preview">CCTV实时监控</router-link>
                    </el-menu-item>
                </el-submenu>
            </el-menu> -->
            
            

            <el-menu :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#000c17"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-submenu index="1">
                    <template slot="title">线网运营监察</template>
                    <el-menu-item index="1-1">
                        <router-link to="/line/comprehensive">综合线网图</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-2">
                        <router-link to="/new">客流监控</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-3">
                        <router-link to="/line/driving">行车监控</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-4">
                        <router-link to="/line/energy">能耗监控</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-5">
                        <router-link to="/line/monitor">设备监视</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-6">
                        <router-link to="/cctv/preview">CCTV实时监控</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-7">
                        <router-link to="/line/alarm">报警及处置</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-8">
                        <router-link to="/line/plane">平面图</router-link>
                    </el-menu-item>
                    <!-- <el-menu-item index="1-8">
                        <router-link to="/tool/important">重保活动</router-link>
                    </el-menu-item> -->
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">平行推演</template>
                    <!-- <el-menu-item index="2-1">
                        <router-link to="/choseline">常规运营</router-link>
                    </el-menu-item> -->

                    <el-submenu index="2-1">
                        <template slot="title">离线推演</template>
                        <el-menu-item index="2-1-1">
                            <router-link to="/choseline">开行方案验证</router-link>
                        </el-menu-item>
                        <el-menu-item index="2-1-2">
                            <router-link to="/offlinescheme">运行图比选</router-link>
                        </el-menu-item>
                    </el-submenu>

                    <el-menu-item index="2-2">
                        <router-link to="/line/comprehensive">在线推演</router-link>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">态势研判</template>

                    <el-menu-item index="3-1">
                        <router-link to="/tmp/container1">综合评价</router-link>
                    </el-menu-item>
                    <el-menu-item index="3-2">
                        <router-link to="/line/passengerflow">态势评估</router-link>
                    </el-menu-item>
                    <el-submenu index="3-3">
                        <template slot="title">趋势分析</template>
                        <el-menu-item index="3-3-1">
                            <router-link to="/tmp/container2">客流指标</router-link>
                        </el-menu-item>
                        <el-menu-item index="3-3-2">
                            <router-link to="/tmp/container3">行车指标</router-link>
                        </el-menu-item>
                        <el-menu-item index="3-3-3">
                            <router-link to="/line/energy">能耗指标</router-link>
                        </el-menu-item>
                        <el-menu-item index="3-3-4">
                            <router-link to="/line/monitor">设备健康指标</router-link>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item index="3-4">
                        <router-link to="/system/indicator">指标配置管理</router-link>
                    </el-menu-item>

                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">综合决策优化</template>
                    <el-menu-item index="4-1">
                        <router-link to="/policy/driving">行车辅助决策</router-link>
                    </el-menu-item>
                    <el-menu-item index="4-2">
                        <router-link to="/policy/passengerflow">客流辅助决策</router-link>
                    </el-menu-item>
                    <el-menu-item index="4-3">
                        <router-link to="/policy/people">人员物资辅助决策</router-link>
                    </el-menu-item>
                    <!-- <el-menu-item index="4-4">
                        <router-link to="/policy/assessment">重大事件后评估</router-link>
                    </el-menu-item> -->
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">事件处置</template>

                    <el-menu-item index="5-1">
                        <router-link to="/choseline">预案编制</router-link>
                    </el-menu-item>
                    <el-menu-item index="5-2">
                        <router-link to="/tmp/container4">活动时间表</router-link>
                    </el-menu-item>
                    <el-submenu index="5-3">
                        <template slot="title">活跃事件</template>
                        <el-menu-item index="5-3-1">
                            <router-link to="/emergency/rainstorm">暴雨0906</router-link>
                        </el-menu-item>
                        <el-menu-item index="5-3-1">
                            <router-link to="/emergency/majorevent">跨年夜1231</router-link>
                        </el-menu-item>
                    </el-submenu>                    
                    <el-menu-item index="5-4">
                        <router-link to="/consultation/soldier">应急单兵</router-link>
                    </el-menu-item>
                    <!-- <el-menu-item index="5-5" disabled>
                        <router-link to="/consultation/management">应急通信录</router-link>
                    </el-menu-item>
                    <el-menu-item index="5-6" disabled>
                        <router-link to="/consultation/management">应急物资</router-link>
                    </el-menu-item> -->
                    <el-menu-item index="5-7">
                        <router-link to="/consultation/management">应急会商</router-link>
                    </el-menu-item>
                    <el-menu-item index="5-8">
                        <router-link to="/tool/command">信息与命令</router-link>
                    </el-menu-item>

                </el-submenu>
                <!-- <el-submenu index="6">
                    <template slot="title">报表</template>
                    <el-menu-item index="6-1">
                        <router-link to="/tool/command">信息与命令</router-link>
                    </el-menu-item>
                    <el-menu-item index="6-2">
                        <router-link to="/tool/alarm">报警</router-link>
                    </el-menu-item>
                    <el-menu-item index="6-3">
                        <router-link to="/tool/message">消息</router-link>
                    </el-menu-item>
                    <el-menu-item index="6-5">
                        <router-link to="/tool/report">报表</router-link>
                    </el-menu-item>
                </el-submenu> -->

                <el-menu-item index="6"><router-link to="/tool/report">报表</router-link></el-menu-item>

                <el-submenu index="7">
                    <template slot="title">系统配置</template>
                    <!-- <el-menu-item index="7-1">
                        <router-link to="/system/indicator">指标配置管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="7-2">
                        <router-link to="/monitor">预案管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="7-3">
                        <router-link to="/system/role">角色权限管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="7-4">
                        <router-link to="/system/function">系统功能</router-link>
                    </el-menu-item>
                    <el-menu-item index="7-5">
                        <router-link to="/system/about">关于综合决策</router-link>
                    </el-menu-item> -->

                    <el-menu-item index="7-1">
                        <router-link to="/tool/message">操作记录</router-link>
                    </el-menu-item>
                    <el-menu-item index="7-2">
                        <router-link to="/system/role">用户管理</router-link>
                    </el-menu-item>
                    <!-- <el-menu-item index="7-3">
                        <router-link to="/system/function">系统设置</router-link>
                    </el-menu-item> -->
                    <el-menu-item index="7-4">
                        <router-link to="/system/about">关于</router-link>
                    </el-menu-item>

                </el-submenu>
                <!-- <el-submenu index="8">
                    <template slot="title">CCTV监控</template>
                    <el-menu-item index="8-1">
                        <router-link to="/cctv/marshalling">CCTV编组</router-link>
                    </el-menu-item>
                    <el-menu-item index="8-2">
                        <router-link to="/cctv/preview">CCTV实时监控</router-link>
                    </el-menu-item>
                </el-submenu> -->
                <!-- <el-menu-item index="8"><router-link to="/nav01">导航01</router-link></el-menu-item> -->
            </el-menu>
            <img class="logo" src="../src/assets/basie/logotop.png" />
        </div>
        <div class="subMain">
            <router-view />
        </div>
    </div>
</template>

<script>
import root from "@/layout/components/root.vue";
export default {
    name: "App",
    components: { root },
    data() {
        return {
            activeIndex: "1-1",
        };
    },
    async created() {},
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
    },
};
</script>
<style>
html body {
    font-family: "Microsoft YaHei" !important;
}
body,
html {
    height: 100%;
}
.clearfix:after {
    content: " ";
    display: block;
    clear: both;
    height: 0;
}
.fl {
    float: left;
}
.fr {
    float: right;
}
* {
    margin: 0;
    padding: 0;
}
fieldset,
img,
input {
    border: 0;
    background: none;
}
address,
caption,
cite,
code,
dfn,
em,
i,
optgroup,
strong,
th,
var {
    font-style: normal;
    font-weight: 400;
}
h1,
h2,
h3,
h4,
h5,
h6 {
    font-size: 100%;
    font-weight: 400;
}
button,
input,
optgroup,
option,
select,
textarea {
    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    *font-size: 100%;
}
body {
    line-height: 1.5;
}
li,
ol,
ul {
    list-style: none;
}
a {
    text-decoration: none;
}
a:focus,
input:focus,
button:focus {
    outline: none;
}
.nav {position: relative;}
.nav .logo{height: 50px;width: auto;position: absolute;right: 20px;top: 5px;}
.subMain{
    height: calc(100% - 60px);
}
</style>