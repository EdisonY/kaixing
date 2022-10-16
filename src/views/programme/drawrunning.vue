<template>
    <div class="drawrunning">
        <el-row style="border-bottom:3px solid #ccc">
            <el-col :span="24">
                <div class="yl">
                    <iframe frameborder="0" width="100%" height="600" src="http://172.16.1.111/link/oTcnnEFV"></iframe>
                </div>
            </el-col>
       
        </el-row>
        <el-row style="border-bottom:3px solid #ccc">
            <el-col :span="3" style="text-align:center;">
                <h3>开行方案</h3>
            </el-col>
            <div class="drawTable">
                <table class="selfTable">
                    <tr class="thead">
                        <th colspan="2" style="width:100px">起止时间</th>
                        <th>交路方式</th>
                        <th>跳停车站</th>
                        <th>编组信息</th>
                        <th>开行对数</th>
                    </tr>
                    <tbody v-for="item in tableData" :key="item.label">
                        <tr v-for="(items,index) in item.crossRouteList">
                            <td style="width:100px" v-if="index == 0 && item.crossRouteList.length > 1" :colspan="item.crossRouteList.length > 1 ? item.crossRouteList.length : 0" :rowspan="item.crossRouteList.length">{{formatTime(item.startTime)}} - {{formatTime(item.endTime)}}</td>
                            <td>
                                <el-select v-model="items.tmpRout" placeholder="请选择">
                                    <el-option
                                        v-for="item in tmpRoute"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </td>
                            <td>
                                <el-select v-model="items.stopOrNotList1" placeholder="请选择">
                                    <el-option
                                         v-for="items in stations"
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

                <p style="text-align:right;padding:15px 0 0 0;"><el-button type="primary" @click="showrungrap = true,ph('运行图铺画成功！')">铺画运行图</el-button></p>
            </div>
        </el-row>
        <el-row style="padding:0 20px" v-if="showrungrap">
            <el-col :span="24" style="text-align:center;">
                <div class="yl">
                    <iframe frameborder="0" width="100%" height="380" src="http://172.16.1.110:41000/#/common?rowHeight=50&viewTime=25200"></iframe>
                    <!-- <img src="@/assets/tmp/addafter.png"> -->
                </div>
            </el-col>
            <p style="text-align:right;padding:15px 0 0 0;">
                 <el-button type="success" @click="ph('运行图校验成功！')">启动运行图校验</el-button>
                 <el-button type="primary" @click="ph('运行图保存成功！')">保存运行图</el-button>
            </p>
        </el-row>
    </div>
</template>

<script>


export default {
    name: 'index',
    components:{
    },
    data () {
        return {
            dialogVisible:false,
            showrungrap:false,
            tableData: [{
                "startTime": 25200,
                "endTime": 32400,
                "crossRouteCount": 2,
                "crossRouteList": [{
                    "crossRouteId": 1,
                    "trainTypeGroup": "4A",
                    "lineWayId": 37,
                    "tmpRout":0,
                    "startStationId": 2101,
                    "endStationId": 2103,
                    "onLineTrainCount": 20,
                    "stopOrNotList": [{
                        "stationId": 2101,
                        "stopOrNot": true
                    }, {
                        "stationId": 2102,
                        "stopOrNot": true
                    }, {
                        "stationId": 2103,
                        "stopOrNot": true
                    }, {
                        "stationId": 2104,
                        "stopOrNot": false
                    }],
                    "stopOrNotList1":2104
                }, {
                    "crossRouteId": 2,
                    "trainTypeGroup": "4A",
                    "lineWayId": 65526,
                    "tmpRout":1,
                    "startStationId": 2104,
                    "endStationId": 2101,
                    "onLineTrainCount": 10,
                    "stopOrNotList": [{
                        "stationId": 2103,
                        "stopOrNot": false
                    }, {
                        "stationId": 2104,
                        "stopOrNot": true
                    }, {
                        "stationId": 2102,
                        "stopOrNot": true
                    }, {
                        "stationId": 2101,
                        "stopOrNot": true
                    }],
                    "stopOrNotList1":2103
                }]
            }, {
                "startTime": 32400,
                "endTime": 61200,
                "crossRouteCount": 2,
                "crossRouteList": [{
                    "crossRouteId": 1,
                    "trainTypeGroup": "4A",
                    "lineWayId": 11,
                    "tmpRout":0,
                    "startStationId": 2101,
                    "endStationId": 2103,
                    "onLineTrainCount": 20,
                    "stopOrNotList": [{
                        "stationId": 2101,
                        "stopOrNot": true
                    }, {
                        "stationId": 2102,
                        "stopOrNot": true
                    }, {
                        "stationId": 2103,
                        "stopOrNot": true
                    }, {
                        "stationId": 2104,
                        "stopOrNot": false
                    }],
                    "stopOrNotList1":2104
                }, {
                    "crossRouteId": 2,
                    "trainTypeGroup": "4A",
                    "lineWayId": 65526,
                    "tmpRout":1,
                    "startStationId": 2104,
                    "endStationId": 2101,
                    "onLineTrainCount": 20,
                    "stopOrNotList": [{
                        "stationId": 2103,
                        "stopOrNot": false
                    }, {
                        "stationId": 2104,
                        "stopOrNot": true
                    }, {
                        "stationId": 2102,
                        "stopOrNot": true
                    }, {
                        "stationId": 2101,
                        "stopOrNot": true
                    }],
                    "stopOrNotList1":2103
                }]
            }, {
                "startTime": 61200,
                "endTime": 68400,
                "crossRouteCount": 2,
                "crossRouteList": [{
                    "crossRouteId": 1,
                    "trainTypeGroup": "4A",
                    "lineWayId": 37,
                    "tmpRout":0,
                    "startStationId": 2101,
                    "endStationId": 2103,
                    "onLineTrainCount": 20,
                    "stopOrNotList": [{
                        "stationId": 2101,
                        "stopOrNot": true
                    }, {
                        "stationId": 2102,
                        "stopOrNot": true
                    }, {
                        "stationId": 2103,
                        "stopOrNot": true
                    }, {
                        "stationId": 2104,
                        "stopOrNot": false
                    }],
                    "stopOrNotList1":2104
                }, {
                    "crossRouteId": 2,
                    "trainTypeGroup": "4A",
                    "lineWayId": 65526,
                    "tmpRout":1,
                    "startStationId": 2104,
                    "endStationId": 2101,
                    "onLineTrainCount": 20,
                    "stopOrNotList": [{
                        "stationId": 2103,
                        "stopOrNot": false
                    }, {
                        "stationId": 2104,
                        "stopOrNot": true
                    }, {
                        "stationId": 2102,
                        "stopOrNot": true
                    }, {
                        "stationId": 2101,
                        "stopOrNot": true
                    }],
                    "stopOrNotList1":2103
                }]
            }, {
                "startTime": 68400,
                "endTime": 79200,
                "crossRouteCount": 2,
                "crossRouteList": [{
                    "crossRouteId": 1,
                    "trainTypeGroup": "4A",
                    "lineWayId": 37,
                    "tmpRout":0,
                    "startStationId": 2101,
                    "endStationId": 2103,
                    "onLineTrainCount": 20,
                    "stopOrNotList": [{
                        "stationId": 2101,
                        "stopOrNot": true
                    }, {
                        "stationId": 2102,
                        "stopOrNot": true
                    }, {
                        "stationId": 2103,
                        "stopOrNot": true
                    }, {
                        "stationId": 2104,
                        "stopOrNot": false
                    }],
                    "stopOrNotList1":2104
                }, {
                    "crossRouteId": 2,
                    "trainTypeGroup": "4A",
                    "lineWayId": 65526,
                    "tmpRout":1 ,
                    "startStationId": 2104,
                    "endStationId": 2101,
                    "onLineTrainCount": 20,
                    "stopOrNotList": [{
                        "stationId": 2103,
                        "stopOrNot": false
                    }, {
                        "stationId": 2104,
                        "stopOrNot": true
                    }, {
                        "stationId": 2102,
                        "stopOrNot": true
                    }, {
                        "stationId": 2101,
                        "stopOrNot": true
                    }],
                    "stopOrNotList1":2103
                }]
            }],
            tmp:[],
            stations:JSON.parse(localStorage.getItem('stations')),
            tmpRoute:JSON.parse(localStorage.getItem('tmpRoute')),
        }
    },
    created () {
        // this.$api.post('/api/op/plan',{"flowId":1,"routeData":{"a":1}}).then(res => {
        //     this.tableData = res.data.timeSectionList
        // })
    },
    computed: {
        
    },
    mounted(){
        
    },
    methods:{
        ph(msg){
            this.$message({
                type: 'success',
                message: msg
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
    destroyed() {
    }
}
</script>

<style>
.drawrunning h3{padding: 15px 0;color: #fff;font-weight: bold;}
.drawrunning .el-row{padding: 10px 20px;}
.drawEdit ul{width: 400px;margin: 0 auto;text-align: left;}
.drawEdit ul li{width: 100%;display: block;height: 40px;line-height: 40px;margin-bottom: 20px;}
.drawEdit ul li strong{float: left;width: 120px;font-size: 16px;font-weight: bold;}
.drawEdit ul li .diaMain{float: left;width: 200px;}
</style>