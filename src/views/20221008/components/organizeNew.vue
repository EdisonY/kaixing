<template>
    <div class="component-page">
        
        <el-row>
            <el-radio-group v-model="selectedLine" @change="handleChnageLine">
                <el-radio-button :key="index" v-for="(item,index) in lineList" :label="item.label"></el-radio-button>
            </el-radio-group>
        </el-row>
        <div class="bg">
            <el-row class="row">
                <el-col :span="12">
                    <div class="chart" ref="echart1"></div>
                </el-col>
                <el-col :span="12">
                    <div class="chart" ref="echart2"></div>
                </el-col>
                <el-col :span="24">&nbsp;</el-col>
                <el-col :span="24">
                    <el-table
                        :data="tableData2"
                        class="componentTable"
                        style="width: 100%">
                        <el-table-column
                            prop="date"
                            label="线路名称"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="线路关系"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            align="center"
                            label="运行图名称">
                        </el-table-column>
                        <el-table-column
                            prop="xinxi"
                            align="center"
                            label="是否调整">
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
let xAxisData = [];
let data1 = [];
for (let i = 0; i < 10; i++) {
  xAxisData.push('Class' + i);
  data1.push(+(Math.random() * 2).toFixed(2));
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
            data: [],
            itemStyle: {
                color: "#3644e0",
                barBorderRadius: [6, 6, 0, 0],
            },
            stack: 'one',
        },
        {
            name: "bar2",
            type: "bar",
            data: [],
            itemStyle: {
                color: "#f1696a",
                barBorderRadius: [6, 6, 0, 0],
            },
            stack: 'one',
        },
    ],
};
export default {
    name: "nav01",
    data() {
        return {
            selectedLine: "环球度假区（本站）",
            lineList: [{
                value:'0',
                label:'环球度假区（本站）'
            },{
                value:'1',
                label:'双井'
            },{
                value:'2',
                label:'国贸'
            },{
                value:'3',
                label:'磁器口'
            }],
            tableData2: [{
                date: '进站量告警',
                name: '1',
                address: '5min',
                xinxi:'环球度假区站',
                duishu:'22:53-22:58'
            },{
                date: '站台滞留人数告警',
                name: '2',
                address: '9min',
                xinxi:'环球度假区站',
                duishu:'22:56-22:05'
            },{
                date: '站台滞留超过一次告警',
                name: '17',
                address: '5min',
                xinxi:'环球度假区站',
                duishu:'22:53-22:58'
            },{
                date: '分方向换成预测预警',
                name: '1',
                address: '3min',
                xinxi:'环球度假区站',
                duishu:'22:53-22:56'
            },{
                date: '区间满载率',
                name: '1',
                address: '5min',
                xinxi:'环球度假区站',
                duishu:'22:53-22:58'
            },{
                date: '列车满载率',
                name: '1',
                address: '5min',
                xinxi:'环球度假区站',
                duishu:'22:53-22:58'
            }],
        };
    },
    created() {},
    computed: {},
    mounted() {
        window.addEventListener("resize", this.resizefunc);

        this.$nextTick(() => {
            this.getData();
        });
        this.handleClick()

    },
    //移除事件监听
    beforeDestroy() {
        window.removeEventListener("resize", this.resizefunc);
        this.resizefunc = null;
    },
    methods: {
        async handleChnageLine(value) {
            this.selectedLine = value;
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
.chart {height: 300px;padding: 5px;width: 100%;}
</style>
