<template>
    <div class="component-page component-analysis">
        <div class="bg">
            <el-row class="row">
                <span class="inner-title">需求输入</span>
            </el-row>
            <el-row class="row inputDiv">
                <el-col :span="24">
                    <div class="insideDiv">
                        <span class="inner-prop">总人数</span><br/>
                        <el-input class="inputS" v-model="zrs"></el-input>
                    </div>
                    <div class="insideDiv">
                        <span class="inner-prop">活动日期</span><br/>
                        <el-date-picker
                            v-model="value0"
                            type="date"
                            value-format="yyyy-MM-DD"
                            class="inputS"
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <div class="insideDiv">
                        <span class="inner-prop">活动时间</span><br/>
                        <el-time-picker
                            v-model="value1"
                            value-format="HH:mm:ss"
                            class="inputS"
                            placeholder="任意时间点">
                        </el-time-picker>
                        至
                        <el-time-picker
                            arrow-control
                            v-model="value2"
                            class="inputS"
                            value-format="HH:mm:ss"
                            placeholder="任意时间点">
                        </el-time-picker>
                    </div>
                    <div class="insideDiv">
                        <span class="inner-prop">地铁分担率</span><br/>
                        <el-input class="inputS inputSmall" v-model="fdl"></el-input> %
                    </div>
                </el-col>
            </el-row>
        </div>

        <el-row style="padding:40px 0 0 0" class="Tab">
            <!-- <el-radio-group v-model="selectedLine" @change="handleChnageLine">
                <el-radio-button :key="index" v-for="(item,index) in lineList" :label="item.label">
                    <span v-if="!item.chose" @dblclick="editTab(index)">{{item.label}}</span>
                    <el-input v-if="item.chose" class="inputS inputSmallTab" v-model="item.label"></el-input>
                </el-radio-button>
            </el-radio-group> -->
            <span v-for="(item,index) in lineList" :key="index" @click="handleChnageLine(index)" @dblclick="editTab(index)" :class="{'active':item.chose}" class="tab">
                <b v-if="!item.edit">{{item.plan_name}}</b>
                <el-input v-if="item.edit" class="inputS inputSmallTab" v-model="item.plan_name" ref="tabInput">
                    <el-button slot="append" icon="el-icon-circle-check" @click="saveTab()"></el-button>
                </el-input>
                <!-- <i v-if="item.edit" class="el-icon-circle-check"></i> -->
            </span>
            <i class="el-icon-plus" @click="addTab()"></i>
        </el-row>

        <div class="bg">
            <el-row class="row">
                <span class="inner-title">参数设置</span>
            </el-row>
            <el-row class="row inputDiv">
                <el-col :span="24">
                    <div class="insideDiv">
                        <span class="inner-prop">浮动系数</span><br/>
                        <el-input class="inputS inputSmall" v-model="tmpData.float_rate"></el-input> %
                    </div>
                    <div class="insideDiv">
                        <span class="inner-prop">疏散高峰时间</span><br/>
                        <el-time-picker
                            v-model="tmpData.start_time"
                            value-format="HH:mm:ss"
                            class="inputS"
                            placeholder="任意时间点">
                        </el-time-picker>
                        至
                        <el-time-picker
                            arrow-control
                            v-model="tmpData.end_time"
                            value-format="HH:mm:ss"
                            class="inputS"
                            placeholder="任意时间点">
                        </el-time-picker>
                    </div>
                    <div class="insideDiv">
                        <span class="inner-prop">&nbsp;</span><br/>
                        <el-button size="mini" type="primary" @click="handleClick" class="rightConfig">开始客流预测</el-button>
                    </div>
                </el-col>
            </el-row>
            </br>
            <el-row>
                <el-col :span="12">
                    <el-row class="row">
                        <span class="inner-title">环球度假区 - OD量（人次）</span>
                    </el-row>
                    <div class="chart" ref="echart2"></div>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="11">
                    <el-row class="row">
                        <span class="inner-title">分时进站量（人次）</span>
                    </el-row>
                    <div class="chart" ref="echart1"></div>
                    <el-button style="margin:10px;float:right" type="primary" class="rightConfig" @click="save()">保存</el-button>
                </el-col>
            </el-row>
        </div>
        
    </div>
</template>

<script>
import echarts from "echarts";

// let xAxisData = [];
// let data1 = [];
// let data2 = [];
// for (let i = 0; i < 100; i++) {
//   xAxisData.push('Class' + i);
//   data1.push(+(Math.random() * 2).toFixed(2));
//   data2.push(+(Math.random() * 5).toFixed(2));
// }

const option = {
    grid: {
        left: 50,
        top: 10,
        right: 0,
        bottom: 40,
    },
    legend: {
        data: ['历史分析结果', '活动增量'],
        right: '0%',
        textStyle:{
            color:'#fff'
        }
    },
    title: {
        show:false,
        text: "2022年1月3日环球度假区站分时进站量",
        textStyle: {
            color: "#fff",
        },
        left: -5,
    },
    tooltip:{
        trigger:'item'
    },
    backgroundColor: "",
    xAxis: {
        axisLabel: {
            show: true,
            textStyle: {
                color: "#fff",
            },
            rotate: 45,
        },
        data: [],
        axisLine: { onZero: true },
        splitLine: { show: false },
        splitArea: { show: false },
    },
    yAxis: {
        axisLabel: {
            show: true,
            textStyle: {
                color: "#fff",
            },
        },
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: {show: false},
        splitArea: {show: false}
    },
    series: [
    {
            type: "bar",
            name:'历史分析结果',
            data: '',
            itemStyle: {
                color: "#3644e0",
                // barBorderRadius: [6, 6, 0, 0],
            },
            tooltip:{
                formatter:'历史分析结果 : {c}'
            },
            stack: 'one',
        },
        {
            type: "bar",
            name:'活动增量',
            data: '',
            itemStyle: {
                color: "#f1696a",
                // barBorderRadius: [6, 6, 0, 0],
            },
            tooltip:{
                formatter:'活动增量 : {c}'
            },
            stack: 'one',
        },
    ],
};

const option1 = {
    grid: {
        left: 50,
        top: 10,
        right: 0,
        bottom: 40,
    },
    title: {
        text: "",
        textStyle: {
            color: "#fff",
        },
        left: -5,
    },
    backgroundColor: "",
    tooltip: {},
    xAxis: {
        axisLabel: {
            show: true,
            textStyle: {
                color: "#fff",
            },
            rotate: 45,
        },
        data: [],
        axisLine: { onZero: true },
        splitLine: { show: false },
        splitArea: { show: false },
    },
    yAxis: {
        axisLabel: {
            show: true,
            textStyle: {
                color: "#fff",
            },
        },
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: {show: false},
        splitArea: {show: false}
    },
    series: [
        {
            type: "bar",
            barWidth:'50%',
            data: [],
            itemStyle: {
                color: "#5470c6",
                barBorderRadius: [6, 6, 0, 0],
            },
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(48, 56, 69, 0.4)',
                barBorderRadius: [6, 6, 0, 0],
            },
        },
    ],
};

let tabIndex = 0
export default {
    name: "nav01",
    data() {
        return {
            stations: [],
            lineList: [],
            selectedLine: "常规方案",
            tmpData:{},
            value0: '2022-02-11',
            value1: '15:00:00',
            value2: '20:00:00',
            value3: '15:00:00',
            value4: '20:00:00',
            zrs:'60000',
            fd:'20',
            fdl:"58"
        };
    },
    created() {
        var self = this
        this.$api.get('/zbAPI/traffic_plan/').then(res => {
            var tmp = res.data.plan_data
            for (let index = 0; index < tmp.length; index++) {
                if(index == 0){
                    tmp[index].chose = true
                }else{
                    tmp[index].chose = false
                }
                tmp[index].edit = false
            }
            self.lineList = tmp
            self.handleChnageLine(0)
        })
    },
    computed: {},
    mounted() {
        window.addEventListener("resize", this.resizefunc);
        this.$nextTick(() => {
            // this.getData();
        });
        // this.handleClick()        
    },
    //移除事件监听
    beforeDestroy() {
        window.removeEventListener("resize", this.resizefunc);
        this.resizefunc = null;
    },
    methods: {
        addTab(){
            tabIndex = this.lineList.length
            tabIndex++
            if(tabIndex > 4){
                this.$message.error('超过最大限制！');
            }else{
                for (let index = 0; index < this.lineList.length; index++) {
                    this.lineList[index].chose = false
                    this.lineList[index].edit = false
                }
                this.lineList.push({
                    float_rate:22,
                    plan_id:tabIndex,
                    share_rate:20,
                    start_time:'20:00:00',
                    end_time:'23:00:00',
                    plan_name:'调整方案' + tabIndex,
                    chose:true,
                    edit:false
                })
                this.tmpData = this.lineList[this.lineList.length - 1]
                this.selectedLine = '调整方案' + tabIndex
            }
            
        },
        handleClick() {
            var self = this

            console.log(this.tmpData);

            var tmp1 = {
                station_name:'环球度假区',
                date:this.value0,
                sum_count:this.zrs,
                share_rate:this.fdl,
                float_rate:this.tmpData.float_rate,
                start_time:this.tmpData.start_time,
                end_time:this.tmpData.end_time,
                activity_start_time:this.value1,
                activity_end_time:this.value2
            }

            console.log();

            const charts1 = self.$echarts.init(self.$refs.echart1);
            charts1.showLoading({ text: '正在加载数据' });
            const charts2 = self.$echarts.init(self.$refs.echart2);
            charts2.showLoading({ text: '正在加载数据' });
            this.$api.post2('/zbAPI/prediction_od/',tmp1).then(res => {
                if(res.data.code == 200){
                    const tmpEchartOption1 = JSON.parse(JSON.stringify(option))
                    tmpEchartOption1.title.text = '';
                    tmpEchartOption1.xAxis.data = res.data.station_entry_data[0].entry_time_x_list;
                    tmpEchartOption1.series[0].data = res.data.station_entry_data[0].entry_num_y_list;
                    tmpEchartOption1.series[1].data = res.data.station_entry_data[0].float_z_list;
                    charts1.hideLoading()
                    charts1.setOption(tmpEchartOption1, true);


                    const tmpEchartOption2 = JSON.parse(JSON.stringify(option1))
                    tmpEchartOption2.title.text = '';
                    tmpEchartOption2.xAxis.data = res.data.section_od_top_dict[0].station_x_list;
                    tmpEchartOption2.series[0].data = res.data.section_od_top_dict[0].station_y_list;
                    charts2.hideLoading()
                    charts2.setOption(tmpEchartOption2, true);

                }
            })
        },
        handleChnageLine(i) {
            for (let index = 0; index < this.lineList.length; index++) {
                if(index != i){
                    this.lineList[index].chose = false
                    this.lineList[index].edit = false
                }
            }
            this.tmpData = this.lineList[i]
            this.lineList[i].chose = true
            this.handleClick()
        },
        resizefunc() {
            this.$echarts.init(this.$refs.echart1).resize(); //多个echarts则在此处添加
            this.$echarts.init(this.$refs.echart2).resize(); //多个echarts则在此处添加
        },
        save(){
            this.$message({
                message: '保存成功！',
                type: 'success'
            });
        },
        saveTab(){
            this.save()
            for (let index = 0; index < this.lineList.length; index++) {
                this.lineList[index].edit = false
            }
        },
        editTab(index){
            for (let index = 0; index < this.lineList.length; index++) {
                this.lineList[index].edit = false
            }
            
            this.lineList[index].edit = true
            this.$nextTick(() => {
                this.$refs.tabInput[0].$el.querySelector('input').focus();
            })
        }
    },
};
</script>

<style scoped>
.inner-prop {
    color: #606266;
    margin-left: 5px;
    margin-right: 20px;
}
.row {
    margin: 10px 0;
}
.flex6 {
    flex: 6;
}
.flex7 {
    flex: 7;
}
.chart {height: calc(100vh - 600px);padding: 5px;}
.inputDiv .insideDiv{float: left;margin-right: 50px;}
.el-icon-plus{cursor: pointer;}
.Tab{user-select:none}
.component-analysis .tab{cursor: pointer;display: inline-block;font-size: 14px;}
.component-analysis .tab b{font-weight: normal;padding: 12px 20px;display: inline-block;}
.component-analysis .active{background: #1d1e39;color: #b5b6b6;}
</style>
