<template>
    <div class="dashboard-container">
        <!-- <el-button @click="drewPlan()" style="position:absolute;z-index:99999">默认按钮</el-button> -->
        <lib_common ref="grap"
            :rungrapData="rungrapData" />
    </div>
</template>

<script>
import lib_common from "./lib_common";
import { initWebSocket } from "@/utils/oldws";
export default {
    name: "Rungrap",
    data() {
        return {
            rungrapData: {},
        };
    },
    components: {
        lib_common,
    },
    created() {
        var self = this;
        var data = {
            msgId: 1,
            msgType: 103,
            requestId: "12345678",
            session: this.$getCurrentDate(),
            timestamp: this.$getCurrentDate(),
            data: 2,
        };
        initWebSocket();
        this.rungrapData.multiply = this.$route.meta.type;
        self.rungrapData.station = [
            [0, 0, "燕化站"],
            [1, 1, "老城区站"],
            [2, 1, "饶乐府站"],
            [3, 1, "顾八路站"],
            [4, 1, "阎富路站"],
            [5, 1, "星城站"],
            [6, 1, "阎村站"],
            [7, 1, "大紫草坞"],
            [8, 1, "阎村北站"]
        ];

        // self.rungrapData.station = [
        // [0, 0, "北京西站"],
        //     [1, 3.7, "湾子站"],
        //     [2, 2.5, "达官营站"],
        //     [3, 4.2, "广安门内站"],
        //     [4, 3.5, "菜市口站"],
        //     [5, 2.7, "虎坊桥站"],
        //     [6, 3.1, "珠市口站"],
        //     [7, 2.7, "桥湾站"],
        //     [8, 2.8, "磁器口站"],
        //     [9, 3.1, "广渠门内站"],
        //     [10, 3.4, "广渠门外站"],
        //     [11, 3.3, "双井站"],
        //     [12, 3.4, "九龙山站"],
        //     [13, 2.6, "大郊亭站"],
        //     [14, 2.6, "百子湾站"],
        //     [15, 2.8, "化工站"],
        //     [16, 3.5, "南楼梓庄站"],
        //     [17, 2.7, "欢乐谷景区站"],
        //     [18, 3.9, "垡头站"],
        //     [19, 3.2, "双合站"],
        //     [20, 2, "焦化厂车辆段"],
        //     [21, 2.8, "焦化厂站"],
        //     [22, 4, "黄厂村站"],
        //     [23, 4.2, "豆各庄站"],
        //     [24, 5.2, "黑庄户站"],
        //     [25, 5.9, "万盛南街西口站"],
        //     [26, 4.6, "云景东路站"],
        //     [27, 3, "小马庄站"],
        //     [28, 3.1, "高楼金站"],
        //     [29, 3.8, "张家湾停车场"],
        //     [30, 4, "施园站"],
        //     [31, 4, "环球影城站"],
        // ];

        // *配置上下行线路及坐标主颜色，组件内已默认，可自定义设置
        this.rungrapData.colors = ["#5793f3", "#d14a61"];

        // *确认获取到运行图源数据后，将源数据挂载到浏览器本地session中，key值为rungrap。并执行运行图组件内的initData方法
        // * window.sessionStorage.setItem('rungrap',your get data
        function initData() {
            self.$nextTick(() => {
                self.$refs.grap.initData();
            });
        }
    },
    mounted() {},
    methods: {
        getRungrapClick(params) {
            console.log(params);
        },
        drewPlan() {
            this.$refs.grap.drewPlan();
        },
    },
    beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.dashboard-container {
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    z-index: 99;
    min-height: 953px;
}
</style>
