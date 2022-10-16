<template>
    <div class="component-page">
        <el-row class="row">
            <span class="inner-title">需求输入</span>
        </el-row>
        <el-row class="row">
            <el-col :span="24">
                <span class="inner-prop">总人数</span>
                <el-input style="width:80px"></el-input>
                <span class="inner-prop">总人数</span>
                <span class="inner-prop">地铁分担率</span>
                <el-input style="width:80px"></el-input>
                <span class="inner-prop">%</span>
            </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row class="row">
            <span class="inner-title">需求输入</span>
        </el-row>
        <el-row style="padding:10px 0 0 10px">
            <el-radio-group v-model="selectedLine"
                @change="handleChnageLine">
                <el-radio-button :key="index"
                    v-for="(item,index) in lineList"
                    :label="item"></el-radio-button>
            </el-radio-group>
        </el-row>
        <el-row class="row">
            <el-col :span="22">
                <span class="inner-prop">浮动系数</span>
                <el-input style="width:80px"></el-input>
                <span class="inner-prop">%</span>
                <span class="inner-prop">客流高峰时间</span>
                <el-input style="width:80px"></el-input>
                <span class="inner-prop">%</span>
            </el-col>
            <el-col :span="2">
                <el-button size="mini"
                    type="primary">开始客流预测</el-button>
            </el-col>
        </el-row>

        <!-- echart -->
        <el-row class="flex6">
            <el-col class="chart"
                :span="10">
                <el-table :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column prop="date"
                        label="日期"
                        width="180">
                    </el-table-column>
                    <el-table-column prop="name"
                        label="姓名"
                        width="180">
                    </el-table-column>
                    <el-table-column prop="address"
                        label="地址">
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col class="chart"
                :span="14">
                <div class="chart"
                    ref="echart1"></div>
            </el-col>
        </el-row>
        <el-row class="row">
            <el-button size="mini"
                style="margin:10px;float:right"
                type="primary">保存</el-button>
        </el-row>
    </div>
</template>

<script>
import echarts from "echarts";

const emphasisStyle = {
    itemStyle: {
        shadowBlur: 10,
        shadowColor: "rgba(0,0,0,0.3)",
    },
};

const option = {
    grid: {
        left: 30,
        top: 40,
        right: 0,
        bottom: 40,
        borderWidth: "1",
        borderColor: "red",
    },
    title: {
        text: "2022年1月3日环球度假区站分时进站量",
        textStyle: {
            color: "#303133",
        },
        left: "center",
    },
    backgroundColor: "#FFF",
    tooltip: {},
    xAxis: {
        axisLabel: {
            show: true,
            textStyle: {
                color: "#606266",
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
                color: "#606266",
            },
        },
    },
    series: [
        {
            name: "bar",
            type: "bar",
            emphasis: emphasisStyle,
            data: [],
            itemStyle: {
                color: "#5470c6",
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
                stationid: "",
                ptype: "",
                prange: "",
                prange_date: "",
            },
            selectedLine: "",
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
        };
    },
    created() {},
    computed: {},
    mounted() {
        window.addEventListener("resize", this.resizefunc);
        this.$nextTick(() => {
            this.getData();
        });
    },
    //移除事件监听
    beforeDestroy() {
        window.removeEventListener("resize", this.resizefunc);
        this.resizefunc = null;
    },
    methods: {
        async handleClick() {
            console.log(this.query);

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
.inner-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #409eff;
    margin-left: 5px;
    margin-right: 20px;
}

.inner-prop {
    color: #606266;
    margin-left: 5px;
    margin-right: 20px;
}

.component-page {
    display: flex;
    flex-direction: column;
    background: #fff;
    height: calc(100vh - 80px);
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
    padding: 5px;
}
</style>
