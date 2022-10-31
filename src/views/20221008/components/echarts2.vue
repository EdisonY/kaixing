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
        left: 50,
        top: 40,
        right: 20,
        bottom: 40,
    },
    title: {
        text: "人数",
        textStyle: {
            color: "#fff",
        },
        left: -5,
    },
    color: ["#f5fc2a", "#be1910", "#be1910", "#00fa95"],
    legend: {
        data: [
            { name: "离线预测进站量",icon: "line" },
            { name: "历史峰值",icon: "line" },
            { name: "已经发生的进站量",icon: "rect" },
            { name: "实时预测进站量" ,icon: "line",color:"#00fa95"},
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
            name: "离线预测进站量",
            type: "line",
            showSymbol: false,
            smooth: true,
            data: [],
            lineStyle: {
                color: "#f5fc2a",
            },
        },
        {
            name: "历史峰值",
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
            name: "已经发生的进站量",
            data: [],
            type: "bar",
            barWidth: "30%",
            itemStyle: {
                color: "#5470c6",
                barBorderRadius: [2, 2, 0, 0],
            },
        },
        {
            name: "实时预测进站量",
            data: [],
            type: "bar",
            barWidth: "30%",
            itemStyle: {
                color: "transparent",
                borderColor: "#00fa95",
                borderWidth: 2,
                barBorderRadius: [5, 5, 0, 0],
            },
        },
    ],
};

export default {
    name: "Echarts",
    data() {
        return {
            charts:null,
            mock: {
                x: ["5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00"],
                lineyellow: [50, 32, 40, 44, 59, 30, 10],
                linered: [5, 20, 36, 10, 10, 20],
                bar: [70, 110, 130],
                barblock: [, , , 70, 110, 130],
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
        setData(data){
            if (!data) {
                data = this.mock;
            }
            option.xAxis.data = data.x;
            option.series[0].data = data.lineyellow;
            option.series[1].data = data.linered;
            option.series[2].data = data.bar;
            option.series[3].data = data.barblock;
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
