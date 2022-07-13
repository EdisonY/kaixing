<template>
    <div class="choseLine">
        <h2>线路选择</h2>
        <div class="radioMain">
            <el-radio v-model="radio1"
                label="1"
                border
                disabled>1号线</el-radio>
            <el-radio v-model="radio1"
                label="2"
                border
                disabled>2号线</el-radio>
            <el-radio v-model="radio1"
                label="3"
                border
                disabled>4号线</el-radio>
            <el-radio v-model="radio1"
                label="4"
                border
                disabled>5号线</el-radio>
            <el-radio v-model="radio1"
                label="5"
                border
                disabled>6号线</el-radio>
            <el-radio v-model="radio1"
                label="6"
                border
                disabled>7号线</el-radio>
            <el-radio v-model="radio1"
                label="7"
                border
                disabled>8号线</el-radio>
            <el-radio v-model="radio1"
                label="8"
                border
                disabled>9号线</el-radio>
            <el-radio v-model="radio1"
                label="9"
                border
                disabled>10号线</el-radio>
            <el-radio v-model="radio1"
                label="10"
                border
                disabled>11号线</el-radio>
            <el-radio v-model="radio1"
                label="11"
                border
                disabled>13号线</el-radio>
            <el-radio v-model="radio1"
                label="12"
                border
                disabled>14号线</el-radio>
            <el-radio v-model="radio1"
                label="13"
                border
                disabled>15号线</el-radio>
            <el-radio v-model="radio1"
                label="14"
                border
                disabled>16号线</el-radio>
            <el-radio v-model="radio1"
                label="15"
                border
                disabled>17号线</el-radio>
            <el-radio v-model="radio1"
                label="16"
                border
                disabled>19号线</el-radio>
            <el-radio v-model="radio1"
                label="17"
                border
                disabled>八通线</el-radio>
            <el-radio v-model="radio1"
                label="18"
                border
                disabled>昌平线</el-radio>
            <el-radio v-model="radio1"
                label="19"
                border
                disabled>大兴线</el-radio>
            <el-radio v-model="radio1"
                label="20"
                border
                disabled>房山线</el-radio>
            <el-radio v-model="radio1"
                label="21"
                border
                disabled>亦庄线</el-radio>
            <el-radio v-model="radio1"
                label="22"
                border
                disabled>燕房线</el-radio>
            <el-radio v-model="radio1"
                label="23"
                border
                disabled>S1号线</el-radio>
            <el-radio v-model="radio1"
                label="24"
                border>首都机场线</el-radio>
            <el-radio v-model="radio1"
                label="25"
                border
                disabled>大兴机场线</el-radio>
            <el-radio v-model="radio1"
                label="26"
                border
                disabled>西郊线</el-radio>
            <el-radio v-model="radio1"
                label="27"
                border
                disabled>亦庄T1线</el-radio>
        </div>
        <el-button type="primary"
            @click="jump()">确定</el-button>
    </div>
</template>

<script>
export default {
    name: "index",
    components: {},
    data() {
        return {
            radio1: "24",
        };
    },
    created() {
        var self = this;
        // TODO  实际上接口还不能调用，先用测试数据
        // this.$api.get("/api/op/stations?lineId=21").then((res) => {
        //     if (res.success) {
        //         localStorage.setItem(
        //             "stations",
        //             JSON.stringify(res.data.stations)
        //         );
        //         self.$api.get("/api/op/routeconfig?lineId=21").then((res1) => {
        //             if (res1.success) {
        //                 localStorage.setItem(
        //                     "routeconfig",
        //                     JSON.stringify(res1.data.configs)
        //                 );
        //                 var tmpRoute = [];
        //                 for (
        //                     let index = 0;
        //                     index < res1.data.configs[0].routes.length;
        //                     index++
        //                 ) {
        //                     tmpRoute[index] = {};
        //                     tmpRoute[index].value = index;
        //                     tmpRoute[index].label = "";
        //                     tmpRoute[index].startStation =
        //                         res1.data.configs[0].routes[index].startStation;
        //                     tmpRoute[index].endStation =
        //                         res1.data.configs[0].routes[index].endStation;
        //                     var a,
        //                         b = "";
        //                     for (let i = 0; i < res.data.stations.length; i++) {
        //                         if (
        //                             res1.data.configs[0].routes[index]
        //                                 .startStation ==
        //                             res.data.stations[i].stationId
        //                         ) {
        //                             a = res.data.stations[i].stationName;
        //                         }
        //                         if (
        //                             res1.data.configs[0].routes[index]
        //                                 .endStation ==
        //                             res.data.stations[i].stationId
        //                         ) {
        //                             b = res.data.stations[i].stationName;
        //                         }
        //                         tmpRoute[index].label = a + " - " + b;
        //                     }
        //                 }
        //                 localStorage.setItem(
        //                     "tmpRoute",
        //                     JSON.stringify(tmpRoute)
        //                 );
        //             }
        //         });
        //     }
        // });

        localStorage.setItem(
            "tmpRoute",
            JSON.stringify([
                {
                    value: 0,
                    label: "北新桥 - T2航站楼",
                    startStation: 2105,
                    endStation: 2104,
                },
                {
                    value: 1,
                    label: "T2航站楼 - 北新桥",
                    startStation: 2104,
                    endStation: 2105,
                },
            ])
        );
        localStorage.setItem(
            "stations",
            JSON.stringify([
                {
                    stationId: 2101,
                    stationName: "东直门",
                    nextId: 2102,
                    major: true,
                },
                {
                    stationId: 2102,
                    stationName: "三元桥",
                    nextId: 2103,
                    major: true,
                },
                {
                    stationId: 2103,
                    stationName: "T3航站楼",
                    nextId: 2104,
                    major: false,
                },
                {
                    stationId: 2104,
                    stationName: "T2航站楼",
                    nextId: 0,
                    major: false,
                },
                {
                    stationId: 2105,
                    stationName: "北新桥",
                    nextId: 2101,
                    major: false,
                },
            ])
        );
        localStorage.setItem(
            "routeconfig",
            JSON.stringify([
                {
                    configId: 1,
                    routes: [
                        {
                            crossRouteId: 1,
                            lineWayId: 37,
                            direction: "上行",
                            startStation: 2105,
                            endStation: 2104,
                            skipStations: [2101, 2102, 2103, 2104, 2105, 0],
                            trainTypes: ["4L"],
                        },
                        {
                            crossRouteId: 1,
                            lineWayId: 65526,
                            direction: "下行",
                            startStation: 2104,
                            endStation: 2105,
                            skipStations: [2104, 2102, 2101, 2105, 0],
                            trainTypes: ["4L"],
                        },
                    ],
                    ratios: ["1:1"],
                },
            ])
        );
    },
    computed: {},
    mounted() {},
    methods: {
        jump() {
            this.$emit("choseline");
        },
    },
    destroyed() {},
};
</script>

<style>
.choseLine {
    padding: 40px;
}
.choseLine h2 {
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 20px;
}
.choseLine .radioMain {
    padding: 10px 0 20px 0;
}
.choseLine .radioMain label {
    margin: 0 10px 10px 10px;
    background: #fff;
}
</style>