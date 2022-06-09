<template>
    <div class="alarm">
        <div class="ABtable">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="time"
                width="200"
                align="center"
                label="报警时间">
                </el-table-column>
                <el-table-column
                prop="type"
                width="160"
                align="center"
                label="类型">
                </el-table-column>
                <el-table-column
                prop="grading"
                width="160"
                align="center"
                label="分级">
                </el-table-column>
                <el-table-column
                prop="form"
                width="160"
                align="center"
                label="来源">
                </el-table-column>
                <el-table-column
                prop="influence"
                align="center"
                label="影响">
                </el-table-column>
                <el-table-column
                prop="suggest"
                align="center"
                label="分析建议">
                </el-table-column>
                <el-table-column
                align="center"
                width="160"
                label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary">确认</el-button>
                        <el-button size="mini" type="danger">忽略</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="alarmBottom">
            <el-row :gutter="10">
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <div ref="numDom" class="ABcheart"></div>
                        <div class="cheartBottom">
                            <el-button size="mini" @click="randomNum()">线路</el-button>
                            <el-button size="mini" @click="randomNum()">类型</el-button>
                            <el-button size="mini" @click="randomNum()">等级</el-button>
                            <el-button size="mini" @click="randomNum()">确认</el-button>
                        </div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-light ABmiddle">
                        <div class="ABsearch">
                            <el-button size="mini">按类型</el-button>
                            <el-button size="mini">按等级</el-button>
                            <label>
                                开始时间
                                <el-date-picker
                                v-model="value1"
                                type="datetime"
                                placeholder="选择日期时间">
                                </el-date-picker>
                            </label>
                            <label>
                                结束时间
                                <el-date-picker
                                v-model="value2"
                                type="datetime"
                                placeholder="选择日期时间">
                                </el-date-picker>
                            </label>
                            <p>
                                <el-button size="mini" type="primary">查询</el-button>
                                <el-button size="mini" type="success">导出</el-button>
                                <el-button size="mini" type="danger">打印</el-button>
                            </p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple lastdom">
                        <div ref="lastDom" class="ABcheart"></div>
                        <div class="lastRight">
                            <el-button size="mini" @click="randomLast()">报警</el-button>
                            <el-button size="mini" @click="randomLast()">事件</el-button>
                            <ul>
                                <li>总数：45</li>
                                <li>已处理：10</li>
                                <li>已确认：10</li>
                                <li>已忽略：25</li>
                            </ul>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import echarts from "echarts";
var NumberPeople = {
    grid:{
        bottom:30,
        right:20
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "line"
        }
    },
    xAxis: {
        type: 'category',
        axisLine:{
            lineStyle:{
                color:'#29304D'
            }
        },
        axisLabel:{
            color:'#fff'
        },
        boundaryGap:false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value',
        name:'态势分析',
        nameTextStyle:{
            fontSize:14
        },
        nameGap:27,
        axisLine:{
            show:false,
            lineStyle:{
                color:'#fff'
            }
        },
        splitLine:{
            lineStyle:{
                color:'#29304D'
            }
        },
        axisTick:{
            show:false
        }
    },
    series: [{
        data: [10, 50, 20, 60, 40, 20, 40],
        type: 'line',
        itemStyle: {
            color: "#333fff",
            borderColor: "#fff",
            borderWidth: 3,
            shadowColor: 'rgba(0, 0, 0, .3)',
            shadowBlur: 0,
            shadowOffsetY: 2,
            shadowOffsetX: 2,
        },
        // smooth: true,
        showSymbol:false,
        symbol: 'emptyCircle',
        areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(31, 38, 126, 1)'
            }, {
                offset: 1,
                color: 'rgba(51, 63, 255, 0)'
            }])
        }
    }]
};

var last = {
    tooltip: {
        trigger: 'item'
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: '80%',
            data: [
                { value: 48, name: 'Search Engine' },
                { value: 35, name: 'Direct' },
                { value: 58, name: 'Email' },
                { value: 84, name: 'Union Ads' },
                { value: 30, name: 'Video Ads' }
            ],
            label: {
                show: false
            },
            emphasis: {
                itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}
export default {
    name: 'monitor',
    data () {
        return {
            value1: '',
            value2: '',
            tableData: [{
                time: '2022-04-22 12:22:00',
                type:'事件',
                grading:'3',
                form:'A出口',
                influence:'最近列车满载率上升，乘客舒适度下降 ',
                suggest:'PIS引导或者减少发车间隔'
            },{
                time: '2022-04-22 12:22:00',
                type:'事件',
                grading:'3',
                form:'A出口',
                influence:'最近列车满载率上升，乘客舒适度下降 ',
                suggest:'PIS引导或者减少发车间隔'
            },{
                time: '2022-04-22 12:22:00',
                type:'事件',
                grading:'3',
                form:'A出口',
                influence:'最近列车满载率上升，乘客舒适度下降 ',
                suggest:'PIS引导或者减少发车间隔'
            }],
            myChart2:null,
            myChart3:null,
        }
    },
    created () {
        
    },
    mounted () {
        this.myChart2 = this.$echarts.init(this.$refs.numDom)
        this.myChart2.setOption(NumberPeople);
        this.myChart3 = this.$echarts.init(this.$refs.lastDom)
        this.myChart3.setOption(last);
        
    },
    methods: {
        randomNum(){
            for (let index = 0; index < NumberPeople.series[0].data.length; index++) {
                NumberPeople.series[0].data[index] = Math.floor(Math.random() * (100 - 1)) + 1;
            }
            this.myChart2.setOption(NumberPeople);
        },
        randomLast(){
            for (let index = 0; index < last.series[0].data.length; index++) {
                last.series[0].data[index].value = Math.floor(Math.random() * (100 - 1)) + 1;
            }
            this.myChart3.setOption(last);
        }
    }
}
</script>

<style>
.alarm{position: relative;height: calc(100vh - 60px);}
.alarmBottom{overflow: hidden;position: absolute;bottom: 0;left: 0;width: 100%;padding: 0 10px;}
.alarmBottom .grid-content{height: 300px;border:1px solid #3e3e3e;border-radius: 5px;}
.alarmBottom .grid-content .ABcheart{height: 260px;}
.alarmBottom .cheartBottom{text-align: right;padding-right: 20px;}
.alarmBottom .ABsearch{position: relative;height: 100%;padding: 20px 0 0 20px;}
.alarmBottom .ABsearch label{display: block;margin:20px 0 0 0}
.alarmBottom .ABsearch p{position: absolute;right: 10px;bottom: 10px;}
.alarmBottom .lastdom .ABcheart,.alarmBottom .lastdom .lastRight{width: 60%;height: 100%;float: left;}
.alarmBottom .lastdom .lastRight{width: 40%;padding: 20px 0 0 0;}
.alarmBottom .lastdom .lastRight ul{padding: 20px 0 0 0;}
.alarm .ABtable{height: calc(100vh - 360px);padding: 10px;}
/* .alarmBottom .ABmiddle{background: #999;} */
</style>
