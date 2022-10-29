<template>
    <div class="component-Echarts">
        <div class="chart"
            ref="echart"></div>
    </div>
</template>

<script>
import echarts from "echarts";

const option = {
    grid: {
        left: 30,
        top: 40,
        right: 0,
        bottom: 40,
    },
    title: {
        text: "客流（万人次）",
        textStyle: {
            color: "#fff",
        },
        left: -5,
    },
    color: ["#f5fc2a", "#00fa95", "#be1910", "#00fa95"],
    legend: {
        data: [
            { name: "实际断面客流", icon: "rect" },
            { name: "预测断面客流" ,icon:"line"},
            { name: "实际运力" ,icon:"line"},
            { name: "计划运力",icon:"line" }
        ],
        right: 20,
        textStyle: {
            color: "#fff",
        },
    },
    backgroundColor: "",
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
        axisTick: { show: false },
        splitArea: { show: false },
    },
    series: [
        {
            name: "实际运力",
            type: "line",
            step: "end",
            showSymbol: false,
            data: [],
            lineStyle: {
                color: "#f5fc2a",
            },
        },
        {
            name: "计划运力",
            type: "line",
            step: "end",
            showSymbol: false,
            data: [],
            lineStyle: {
                color: "#00fa95",
            },
        },
        {
            name: "预测断面客流",
            type: "line",
            data: [],
            showSymbol: false,
            lineStyle: {
                width: 2,
                type: "dashed", //'dotted'点型虚线 'solid'实线 'dashed'线性虚线
                color: "#be1910",
                
            },
        },
        {
            name: "实际断面客流",
            type: "line",
            stack: "Total",
            lineStyle: {
                width: 0,
            },
            showSymbol: false,
            areaStyle: {
                opacity: 1,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 1,
                        color: "#000",
                    },
                    {
                        offset: 0,
                        color: "#00fa95",
                    },
                ]),
            },
            emphasis: {
                focus: "series",
            },
            data: [],
        },
    ],
};

export default {
    name: "Echarts",
    data() {
        return {
            charts: null,
            mock: {
                x: ["5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00"],
                lineyellow: [50, 32, 40, 44, 59, 30, 10],
                linegreen: [20, 12, 30, 24, 19, 50, 20],
                linered: [15, 30, 16, 5, 42, 23],
                stackgreen: [40, 32, 10, 64, 90, 30, 25],
            },
        };
    },
    created() {},
    computed: {},
    mounted() {
        window.addEventListener("resize", this.resizefunc);
        this.charts = this.$echarts.init(this.$refs.echart);
        this.setData();
    },
    //移除事件监听
    beforeDestroy() {
        window.removeEventListener("resize", this.resizefunc);
        this.resizefunc = null;
    },
    methods: {
        setData(data) {
            if (!data) {
                data = this.mock;
            }
            option.xAxis.data = data.x;
            option.series[0].data = data.lineyellow;
            option.series[1].data = data.linegreen;
            option.series[2].data = data.linered;
            option.series[3].data = data.stackgreen;

            this.charts.setOption(option, true);
        },
        resizefunc() {
            this.$echarts.init(this.$refs.echart).resize(); //多个echarts则在此处添加
        },
    },
};
</script>

<style scoped>
.component-Echarts {
    padding: 5px;
    background: #0002;
}
.component-Echarts .chart {
    width: 100%;
    height: 100%;
}
</style>
