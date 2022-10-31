<template>
    <div class="component-page">
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

        <el-row style="padding:40px 0 0 0">
            <el-radio-group v-model="selectedLine" @change="handleChnageLine">
                <el-radio-button :key="index" v-for="(item,index) in lineList" :label="item.label"></el-radio-button>
            </el-radio-group>
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
                        <el-input class="inputS inputSmall" v-model="fd"></el-input> %
                    </div>
                    <div class="insideDiv">
                        <span class="inner-prop">疏散高峰时间</span><br/>
                        <el-time-picker
                            v-model="value3"
                            value-format="HH:mm:ss"
                            class="inputS"
                            placeholder="任意时间点">
                        </el-time-picker>
                        至
                        <el-time-picker
                            arrow-control
                            v-model="value4"
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
                        <span class="inner-title">活动目的车站排名</span>
                    </el-row>
                    <div class="chart" ref="echart2"></div>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="11">
                    <el-row class="row">
                        <span class="inner-title">分时进站量</span>
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
    title: {
        show:false,
        text: "2022年1月3日环球度假区站分时进站量",
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
            data: '',
            itemStyle: {
                color: "#3644e0",
                // barBorderRadius: [6, 6, 0, 0],
            },
            stack: 'one',
        },
        {
            type: "bar",
            data: '',
            itemStyle: {
                color: "#f1696a",
                // barBorderRadius: [6, 6, 0, 0],
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
            lineList: [{
                value:'0',
                label:'常规方案'
            },
                // {
                //     value:'1',
                //     label:'调整方案1'
                // }
            ],
            query: {
                stationid: "",
                ptype: "",
                prange: "",
                prange_date: "",
            },
            selectedLine: "常规方案",
            tableData: [
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄",
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1517 弄",
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1519 弄",
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1516 弄",
                },
            ],
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
        

    },
    computed: {},
    mounted() {
        window.addEventListener("resize", this.resizefunc);
        this.$nextTick(() => {
            // this.getData();
        });
        // this.handleClick()

        var self = this

        var tmp1 = {
            station_name:'环球度假区',
            date:this.value0,
            sum_count:this.zrs,
            share_rate:this.fdl,
            float_rate:this.fd,
            start_time:this.value3,
            end_time:this.value4,
            activity_start_time:this.value1,
            activity_end_time:this.value2
        }
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
    //移除事件监听
    beforeDestroy() {
        window.removeEventListener("resize", this.resizefunc);
        this.resizefunc = null;
    },
    methods: {
        addTab(){
            tabIndex++
            if(tabIndex > 3){
                this.$message.error('超过最大限制！');
            }else{
                this.lineList.push({
                    value:tabIndex,
                    label:'调整方案' + tabIndex
                })
                this.selectedLine = '调整方案' + tabIndex
            }
            
        },

        async handleClick() {
            var self = this
            var tmp1 = {
                station_name:'环球度假区',
                date:this.value0,
                sum_count:this.zrs,
                share_rate:this.fdl,
                float_rate:this.fd,
                start_time:this.value3,
                end_time:this.value4,
                activity_start_time:this.value1,
                activity_end_time:this.value2
            }
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
        async handleChnageLine(value) {
            console.log(value);
            this.selectedLine = value;
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
</style>
