<template>
    <div class="drawrunning">
        <div class="row">
            <div class="yl">
                <iframe frameborder="0"
                    width="100%"
                    height="100%"
                    src="http://172.51.216.61:8011/seabed/preview/70986fa19c404915accccfef982c9ce0"></iframe>
            </div>
            <div class="yl">
                <iframe frameborder="0"
                    width="100%"
                    height="100%"
                    src="http://172.51.216.61:8011/seabed/preview/130263dd57a6419fb41e94a72bc14586"></iframe>
            </div>
            <div class="yl">
                <iframe frameborder="0"
                    width="100%"
                    height="100%"
                    src="http://172.51.216.61:8011/seabed/preview/dc7cc8eeeb3b451293a227733723271e"></iframe>
            </div>
        </div>
        <div style="flex:1; border-bottom: 3px solid #ccc;">
            <h3>开行方案</h3>
            <div class="drawTable">
                <table class="selfTable">
                    <tr class="thead">
                        <th colspan="2"
                            style="width:100px">起止时间</th>
                        <th>交路方式</th>
                        <th>跳停车站</th>
                        <th>编组信息</th>
                        <th>开行对数</th>
                    </tr>
                    <tbody v-for="item in tableData"
                        :key="item.label">
                        <tr v-for="(items,index) in item.crossRouteList">
                            <td style="width:100px"
                                v-if="index == 0 && item.crossRouteList.length > 1"
                                :colspan="item.crossRouteList.length > 1 ? item.crossRouteList.length : 0"
                                :rowspan="item.crossRouteList.length">{{formatTime(item.startTime)}} - {{formatTime(item.endTime)}}</td>
                            <td>
                                <el-select v-model="items.tmpRout"
                                    placeholder="请选择">
                                    <el-option v-for="item in tmpRoute"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </td>
                            <td>
                                <el-select v-model="items.stopOrNotList1"
                                    placeholder="请选择">
                                    <el-option v-for="items in stations"
                                        :key="items.stationId"
                                        :label="items.stationName"
                                        :value="items.stationId">
                                    </el-option>
                                </el-select>
                            </td>
                            <td>{{items.trainTypeGroup}}</td>
                            <td>{{items.onLineTrainCount}}</td>
                        </tr>
                    </tbody>

                </table>

                <p style="text-align:right;padding:15px 0 0 0;">
                    <el-button type="primary"
                        @click="showrungrap = true,ph('运行图铺画成功！')">铺画运行图</el-button>
                </p>
            </div>
        </div>
        <div class="row"
            style="flex:1;"
            v-show="showrungrap">
            <div class="yl">
                <iframe frameborder="0"
                    width="100%"
                    height="300px"
                    src="http://172.51.216.72:41003/#/common?rowHeight=50&viewTime=25200"></iframe>
                <p style="text-align:right;padding:15px 0 0 0;">
                    <el-button type="success"
                        @click="ph('运行图校验成功！')">启动运行图校验</el-button>
                    <el-button type="primary"
                        @click="ph('运行图保存成功！')">保存运行图</el-button>
                </p>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: "index",
    components: {},
    data() {
        return {
            dialogVisible: false,
            showrungrap: false,
            tableData: [
                {
                    startTime: 25200,
                    endTime: 32400,
                    crossRouteCount: 2,
                    crossRouteList: [
                        {
                            crossRouteId: 1,
                            trainTypeGroup: "4A",
                            lineWayId: 37,
                            tmpRout: 0,
                            startStationId: 2101,
                            endStationId: 2103,
                            onLineTrainCount: 20,
                            stopOrNotList: [
                                {
                                    stationId: 2101,
                                    stopOrNot: true,
                                },
                                {
                                    stationId: 2102,
                                    stopOrNot: true,
                                },
                                {
                                    stationId: 2103,
                                    stopOrNot: true,
                                },
                                {
                                    stationId: 2104,
                                    stopOrNot: false,
                                },
                            ],
                            stopOrNotList1: 2104,
                        },
                        {
                            crossRouteId: 2,
                            trainTypeGroup: "4A",
                            lineWayId: 65526,
                            tmpRout: 1,
                            startStationId: 2104,
                            endStationId: 2101,
                            onLineTrainCount: 10,
                            stopOrNotList: [
                                {
                                    stationId: 2103,
                                    stopOrNot: false,
                                },
                                {
                                    stationId: 2104,
                                    stopOrNot: true,
                                },
                                {
                                    stationId: 2102,
                                    stopOrNot: true,
                                },
                                {
                                    stationId: 2101,
                                    stopOrNot: true,
                                },
                            ],
                            stopOrNotList1: 2103,
                        },
                    ],
                },
                {
                    startTime: 32400,
                    endTime: 61200,
                    crossRouteCount: 2,
                    crossRouteList: [
                        {
                            crossRouteId: 1,
                            trainTypeGroup: "4A",
                            lineWayId: 11,
                            tmpRout: 0,
                            startStationId: 2101,
                            endStationId: 2103,
                            onLineTrainCount: 20,
                            stopOrNotList: [
                                {
                                    stationId: 2101,
                                    stopOrNot: true,
                                },
                                {
                                    stationId: 2102,
                                    stopOrNot: true,
                                },
                                {
                                    stationId: 2103,
                                    stopOrNot: true,
                                },
                                {
                                    stationId: 2104,
                                    stopOrNot: false,
                                },
                            ],
                            stopOrNotList1: 2104,
                        },
                        {
                            crossRouteId: 2,
                            trainTypeGroup: "4A",
                            lineWayId: 65526,
                            tmpRout: 1,
                            startStationId: 2104,
                            endStationId: 2101,
                            onLineTrainCount: 20,
                            stopOrNotList: [
                                {
                                    stationId: 2103,
                                    stopOrNot: false,
                                },
                                {
                                    stationId: 2104,
                                    stopOrNot: true,
                                },
                                {
                                    stationId: 2102,
                                    stopOrNot: true,
                                },
                                {
                                    stationId: 2101,
                                    stopOrNot: true,
                                },
                            ],
                            stopOrNotList1: 2103,
                        },
                    ],
                },
                {
                    startTime: 61200,
                    endTime: 68400,
                    crossRouteCount: 2,
                    crossRouteList: [
                        {
                            crossRouteId: 1,
                            trainTypeGroup: "4A",
                            lineWayId: 37,
                            tmpRout: 0,
                            startStationId: 2101,
                            endStationId: 2103,
                            onLineTrainCount: 20,
                            stopOrNotList: [
                                {
                                    stationId: 2101,
                                    stopOrNot: true,
                                },
                                {
                                    stationId: 2102,
                                    stopOrNot: true,
                                },
                                {
                                    stationId: 2103,
                                    stopOrNot: true,
                                },
                                {
                                    stationId: 2104,
                                    stopOrNot: false,
                                },
                            ],
                            stopOrNotList1: 2104,
                        },
                        {
                            crossRouteId: 2,
                            trainTypeGroup: "4A",
                            lineWayId: 65526,
                            tmpRout: 1,
                            startStationId: 2104,
                            endStationId: 2101,
                            onLineTrainCount: 20,
                            stopOrNotList: [
                                {
                                    stationId: 2103,
                                    stopOrNot: false,
                                },
                                {
                                    stationId: 2104,
                                    stopOrNot: true,
                                },
                                {
                                    stationId: 2102,
                                    stopOrNot: true,
                                },
                                {
                                    stationId: 2101,
                                    stopOrNot: true,
                                },
                            ],
                            stopOrNotList1: 2103,
                        },
                    ],
                },
                {
                    startTime: 68400,
                    endTime: 79200,
                    crossRouteCount: 2,
                    crossRouteList: [
                        {
                            crossRouteId: 1,
                            trainTypeGroup: "4A",
                            lineWayId: 37,
                            tmpRout: 0,
                            startStationId: 2101,
                            endStationId: 2103,
                            onLineTrainCount: 20,
                            stopOrNotList: [
                                {
                                    stationId: 2101,
                                    stopOrNot: true,
                                },
                                {
                                    stationId: 2102,
                                    stopOrNot: true,
                                },
                                {
                                    stationId: 2103,
                                    stopOrNot: true,
                                },
                                {
                                    stationId: 2104,
                                    stopOrNot: false,
                                },
                            ],
                            stopOrNotList1: 2104,
                        },
                        {
                            crossRouteId: 2,
                            trainTypeGroup: "4A",
                            lineWayId: 65526,
                            tmpRout: 1,
                            startStationId: 2104,
                            endStationId: 2101,
                            onLineTrainCount: 20,
                            stopOrNotList: [
                                {
                                    stationId: 2103,
                                    stopOrNot: false,
                                },
                                {
                                    stationId: 2104,
                                    stopOrNot: true,
                                },
                                {
                                    stationId: 2102,
                                    stopOrNot: true,
                                },
                                {
                                    stationId: 2101,
                                    stopOrNot: true,
                                },
                            ],
                            stopOrNotList1: 2103,
                        },
                    ],
                },
            ],
            tmp: [],
            stations: JSON.parse(localStorage.getItem("stations")),
            tmpRoute: JSON.parse(localStorage.getItem("tmpRoute")),
        };
    },
    created() {
        // this.$api.post('/api/op/plan',{"flowId":1,"routeData":{"a":1}}).then(res => {
        //     this.tableData = res.data.timeSectionList
        // })
    },
    computed: {},
    mounted() {},
    methods: {
        ph(msg) {
            this.$message({
                type: "success",
                message: msg,
            });
        },
        formatTime(time) {
            let hour = parseInt(time / 3600)
                .toString()
                .padStart(2, "0");
            let minute = parseInt((time % 3600) / 60)
                .toString()
                .padStart(2, "0");
            let second = parseInt(time % 60)
                .toString()
                .padStart(2, "0");
            return `${hour}:${minute}:${second}`;
        },
    },
    destroyed() {},
};
</script>

<style>
.drawrunning {
    width: 100%;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
}

.drawrunning > .row {
    display: flex;
    flex-direction: row;
    border-bottom: 3px solid #ccc;
}

.row > .yl {
    flex: 1;
}

.drawrunning h3 {
    padding: 15px 0;
    color: #fff;
    font-weight: bold;
}
</style>