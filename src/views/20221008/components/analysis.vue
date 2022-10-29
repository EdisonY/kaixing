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
                            class="inputS"
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <div class="insideDiv">
                        <span class="inner-prop">活动时间</span><br/>
                        <el-time-picker
                            v-model="value1"
                            :picker-options="{selectableRange: '18:30:00 - 20:30:00'}"
                            class="inputS"
                            placeholder="任意时间点">
                        </el-time-picker>
                        至
                        <el-time-picker
                            arrow-control
                            v-model="value2"
                            :picker-options="{selectableRange: '18:30:00 - 20:30:00'}"
                            class="inputS"
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
                            v-model="value1"
                            :picker-options="{selectableRange: '18:30:00 - 20:30:00'}"
                            class="inputS"
                            placeholder="任意时间点">
                        </el-time-picker>
                        至
                        <el-time-picker
                            arrow-control
                            v-model="value2"
                            :picker-options="{selectableRange: '18:30:00 - 20:30:00'}"
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
                    <el-button style="margin:10px;float:right" type="primary" class="rightConfig">保存</el-button>
                </el-col>
            </el-row>
        </div>
        
    </div>
</template>

<script>
import echarts from "echarts";

let xAxisData = [];
let data1 = [];
let data2 = [];
for (let i = 0; i < 100; i++) {
  xAxisData.push('Class' + i);
  data1.push(+(Math.random() * 2).toFixed(2));
  data2.push(+(Math.random() * 5).toFixed(2));
}
const option = {
    grid: {
        left: 30,
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
            rotate: 90,
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
            name: "bar",
            type: "bar",
            data: data2,
            itemStyle: {
                color: "#3644e0",
                // barBorderRadius: [6, 6, 0, 0],
            },
            stack: 'one',
        },
        {
            name: "bar2",
            type: "bar",
            data: data1,
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
        left: 30,
        top: 10,
        right: 0,
        bottom: 70,
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
            name: "bar",
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
            value0:'',
            value1: new Date(2016, 9, 10, 18, 40),
            value2: new Date(2016, 9, 10, 18, 40),
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
        var tmp = {
            station_name:'环球度假区',
            passenger_type:'workday',
            passenger_filter:'max_value'
        }
        const charts1 = self.$echarts.init(self.$refs.echart1);
        charts1.showLoading({ text: '正在加载数据' });
        // this.$api.post2('/zbAPI/get_od_data/',tmp).then(res => {
        //     if(res.data.code == 200){
        //         const tmpEchartOption1 = JSON.parse(JSON.stringify(option))
        //         tmpEchartOption1.title.text = '';
        //         tmpEchartOption1.xAxis.data = res.data.x_station_name_list;
        //         tmpEchartOption1.series[0].data = res.data.y_d_value_list;
        //         charts1.hideLoading()
        //         charts1.setOption(tmpEchartOption1, true);
        //     }
        // })
        charts1.hideLoading()
        charts1.setOption(option, true);

        const charts2 = self.$echarts.init(self.$refs.echart2);
        charts2.showLoading({ text: '正在加载数据' });
        this.$api.post2('/zbAPI/get_od_data/',tmp).then(res => {
            if(res.data.code == 200){
                const tmpEchartOption2 = JSON.parse(JSON.stringify(option1))
                tmpEchartOption2.title.text = '';
                tmpEchartOption2.xAxis.data = res.data.x_station_name_list;
                tmpEchartOption2.series[0].data = res.data.y_d_value_list;
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
            console.log(this.query);
            let data = await this.mockData(1);
            let opt1 = this.getOptions(1, data);
            let charts1 = this.$echarts.init(this.$refs.echart1, "dark");
            charts1.setOption(opt1, true);

            let data2 = await this.mockData(2);
            let opt2 = this.getOptions(2, data);
            let charts2 = this.$echarts.init(this.$refs.echart2, "dark");
            charts2.setOption(opt2, true);
        },
        async handleChnageLine(value) {
            console.log(value);

            // for (let index = 0; index < this.lineList.length; index++) {
            //     if(value == this.lineList[index].label){
            //         this.selectedLine = this.lineList[index].value
            //     }
                
            // }

            this.selectedLine = value;

            // let data = await this.mockData(3);
            // let opt3 = this.getOptions(3, data);
            // let charts3 = this.$echarts.init(this.$refs.echart3, "dark");
            // charts3.setOption(opt3, true);

            // data = await this.mockData(4);
            // let opt4 = this.getOptions(4, data);
            // let charts4 = this.$echarts.init(this.$refs.echart4, "dark");
            // charts4.setOption(opt4, true);
        },
        async getData() {
            let data = await this.mockData();
            this.stations = data.stations;
            // this.lineList = data.lineList;
        },
        getOptions(chartnum, data) {
            if (chartnum == 1) {
                option.xAxis.axisLabel.rotate = 90;
                option.title.text = "分时进站量";
            } else if (chartnum == 2) {
                option.xAxis.axisLabel.rotate = 45;
                option.title.text = "OD量";
            } else if (chartnum == 3) {
                option.xAxis.axisLabel.rotate = 90;
                option.title.text = "分时最大断面客流";
            } else if (chartnum == 4) {
                option.xAxis.axisLabel.rotate = 45;
                option.title.text = "各个断面最大客流量";
            }
            option.xAxis.data = data.x;
            option.series[0].data = data.y;
            option.series[1].data = data.y;
            return option;
        },
        resizefunc() {
            this.$echarts.init(this.$refs.echart1).resize(); //多个echarts则在此处添加
        },
        mockData(chartnum, exdata) {
            return new Promise((resolve, reject) => {
                if (chartnum === 1 || chartnum === 3) {
                    let x = [];
                    let y = [];
                    for (let i = 5; i < 23; i++) {
                        x.push(`${i}:00`);
                        x.push(`${i}:15`);
                        x.push(`${i}:30`);
                        x.push(`${i}:45`);
                        y.push(parseInt(Math.random() * 3000));
                        y.push(parseInt(Math.random() * 3000));
                        y.push(parseInt(Math.random() * 3000));
                        y.push(parseInt(Math.random() * 3000));
                    }
                    resolve({ x, y });
                } else if (chartnum === 2) {
                    let x = [];
                    let y = [];
                    for (let i = 1; i < 23; i++) {
                        x.push(`随机${i}车站`);
                        y.push(parseInt(Math.random() * 800));
                    }
                    resolve({ x, y });
                } else if (chartnum === 4) {
                    let x = [];
                    let y = [];
                    for (let i = 5; i < 23; i++) {
                        x.push(`${i}:00`);
                        x.push(`${i}:15`);
                        x.push(`${i}:30`);
                        x.push(`${i}:45`);
                        y.push(parseInt(Math.random() * 1600));
                        y.push(parseInt(Math.random() * 1600));
                        y.push(parseInt(Math.random() * 1600));
                        y.push(parseInt(Math.random() * 1600));
                    }
                    resolve({ x, y });
                } else {
                    resolve({
                        stations: [
                            {
                                stationid: "花乡东桥",
                                stationname: "花乡东桥",
                            },
                            {
                                stationid: "北京西",
                                stationname: "北京西",
                            },
                            {
                                stationid: "西直门",
                                stationname: "西直门",
                            },
                            {
                                stationid: "国贸",
                                stationname: "国贸",
                            },
                            {
                                stationid: "六里桥",
                                stationname: "六里桥",
                            },
                        ],
                    });
                }
            });
        },
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
.chart {
    height: 100%;
    min-height: 300px;
    padding: 5px;
}
.inputDiv .insideDiv{float: left;margin-right: 50px;}
.el-icon-plus{cursor: pointer;}
</style>
