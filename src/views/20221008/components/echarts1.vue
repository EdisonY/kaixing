<template>
    <div class="component-Echarts">
        <div class="chart" ref="echart"></div>
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
    color:['#f5fc2a','#00fa95','#be1910','#00fa95'],
    legend: {
        data: ['实际断面客流', '预测断面客流','实际运力','计划运力'],
        right:20,
        textStyle:{
            color:'#fff'
        },
        icon:'roundRect'
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
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
            name: '实际运力',
            type: 'line',
            step: 'end',
            showSymbol: false,
            data: [50, 32, 40, 44, 59, 30, 10],
            lineStyle:{
                color:'#f5fc2a'
            }
        },
        {
            name: '计划运力',
            type: 'line',
            step: 'end',
            showSymbol: false,
            data: [20, 12, 30, 24, 19, 50, 20],
            lineStyle:{
                color:'#00fa95'
            }
        },
        {
            name: '预测断面客流',
            type: 'line',
            data: [15, 30, 16, 5, 42, 23],
            showSymbol: false,
            lineStyle:{
                width:2,
                type:'dotted',  //'dotted'点型虚线 'solid'实线 'dashed'线性虚线
                color:'#be1910'
            }
        },
        {
            name: '实际断面客流',
            type: 'line',
            stack: 'Total',
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 1,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 1,
                        color: '#000'
                    },
                    {
                        offset: 0,
                        color: '#00fa95'
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [40, 32, 10, 64, 90, 30, 25]
        },
    ]
};

export default {
    name: "Echarts",
    data() {
        return {
            
        };
    },
    created() {
        
    },
    computed: {},
    mounted() {
        let charts = this.$echarts.init(this.$refs.echart);
        charts.setOption(option, true);
    },
    //移除事件监听
    beforeDestroy() {

    },
    methods: {
        

    },
};
</script>

<style scoped>
.component-Echarts .chart{width: 100%;height: 100%;}
</style>
