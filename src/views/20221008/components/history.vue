<template>
    <div class="component-page">
        <el-row class="row">
            <el-col :span="24">
                <span class="inner-title">目标车站</span>
                <el-select v-model="query.stationid" class="inputS"
                    placeholder="请选择">
                    <el-option v-for="item in stations"
                        :key="item.stationid"
                        :label="item.stationname"
                        :value="item.stationid">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row class="row">
            <el-col :span="24">
                <span class="inner-title">客流类型</span>
                <el-radio-group v-model="query.ptype" class="inputS">
                    <el-radio label="工作日">工作日</el-radio>
                    <el-radio label="休息日">休息日</el-radio>
                    <el-radio label="节假日">节假日</el-radio>
                    <el-radio label="活动日">活动日</el-radio>
                </el-radio-group>
            </el-col>
        </el-row>
        <el-row class="row">
            <el-col :span="22">
                <span class="inner-title">客流选择</span>
                <el-radio-group v-model="query.prange" class="inputS">
                    <el-radio label="最大值">最大值</el-radio>
                    <el-radio label="60天均值">60天均值</el-radio>
                    <el-radio label="特定日">特定日</el-radio>
                    <el-date-picker :disabled="query.prange!='特定日'"
                        v-model="query.prange_date"
                        value-format="yyyy-MM-DD HH:mm:ss"
                        type="date"
                        class="inputS"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-radio-group>
            </el-col>
            <el-col :span="2">
                <el-button size="mini" type="primary" @click="handleClick" class="rightConfig">确认</el-button>
            </el-col>
        </el-row>
        <!-- echart -->
        <el-row class="flex6">
            <el-col class="chart"
                :span="12">
                <div class="chart"
                    ref="echart1"></div>
            </el-col>
            <el-col class="chart"
                :span="12">
                <div class="chart"
                    ref="echart2"></div>
            </el-col>
        </el-row>
        <!-- echart -->
        <el-row style="padding:10px 0 0 0">
            <el-radio-group v-model="selectedLine"
                @change="handleChnageLine">
                <el-radio-button :key="index"
                    v-for="(item,index) in lineList"
                    :label="item"></el-radio-button>
            </el-radio-group>
        </el-row>
        <el-row class="flex7 linbottom">
            <el-col class="chart"
                :span="12">
                <div class="chart" ref="echart3"></div>
            </el-col>
            <el-col class="chart"
                :span="12">
                <div class="chart" ref="echart4"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import echarts from "echarts";

const option = {
    grid: {
        left: 30,
        top: 50,
        right: 0,
        bottom: 40,
    },
    title: {
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

export default {
    name: "nav01",
    data() {
        return {
            stations: [],
            lineList: [],
            query: {
                stationid: "花乡东桥",
                ptype: "60天均值",
                prange: "最大值",
                prange_date: "",
            },
            selectedLine: "",
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
        this.handleChnageLine('1号线')
    },
    //移除事件监听
    beforeDestroy() {
        window.removeEventListener("resize", this.resizefunc);
        this.resizefunc = null;
    },
    methods: {
        async handleClick() {
            if (this.query.stationid && this.query.prange && this.query.ptype) {
                let data = await this.mockData(1);
                let opt1 = this.getOptions(1, data);
                let charts1 = this.$echarts.init(this.$refs.echart1, "dark");
                charts1.setOption(opt1, true);

                data = await this.mockData(2);
                let opt2 = this.getOptions(2, data);
                let charts2 = this.$echarts.init(this.$refs.echart2, "dark");
                charts2.setOption(opt2, true);
            } else {
                this.$message({
                    message: "请选择条件",
                    type: "warning",
                });
            }

       
        },
        async handleChnageLine(value) {
            this.selectedLine = value;
            let data = await this.mockData(3);
            let opt3 = this.getOptions(3, data);
            let charts3 = this.$echarts.init(this.$refs.echart3, "dark");
            charts3.setOption(opt3, true);

            data = await this.mockData(4);
            let opt4 = this.getOptions(4, data);
            let charts4 = this.$echarts.init(this.$refs.echart4, "dark");
            charts4.setOption(opt4, true);
        },
        async getData() {
            let data = await this.mockData();
            this.stations = data.stations;
            this.lineList = data.lineList;
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
            return option;
        },
        resizefunc() {
            this.$echarts.init(this.$refs.echart1).resize(); //多个echarts则在此处添加
            this.$echarts.init(this.$refs.echart2).resize(); //多个echarts则在此处添加
            this.$echarts.init(this.$refs.echart3).resize(); //多个echarts则在此处添加
            this.$echarts.init(this.$refs.echart4).resize(); //多个echarts则在此处添加
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
                        lineList: [
                            "1号线",
                            "2号线",
                            "4号线",
                            "9号线",
                            "10号线",
                            "13号线",
                        ],
                    });
                }
            });
        },
    },
};
</script>

<style scoped>


.component-page .el-radio{color: #a1a2a3;}
.linbottom{background: #1d1e39;}
.rightConfig{padding-left:30px;padding-right:30px;}
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
    padding: 5px;
}
</style>
