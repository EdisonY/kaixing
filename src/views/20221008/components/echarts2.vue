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
        text: "人数",
        textStyle: {
            color: "#fff",
        },
        left: -5,
    },
    color:['#f5fc2a','#00fa95','#be1910','#00fa95'],
    legend: {
        data: ['曲线', '虚线','柱状图', '柱状图空心'],
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
            name: '曲线',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: [50, 32, 40, 44, 59, 30, 10],
            lineStyle:{
                color:'#f5fc2a'
            }
        },
        {
            name: '虚线',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20],
            showSymbol: false,
            lineStyle:{
                width:2,
                type:'dotted',  //'dotted'点型虚线 'solid'实线 'dashed'线性虚线
                color:'#00fa95'
            }
        },
        {
            name:'柱状图',
            data: [70, 110, 130],
            type: 'bar',
            barWidth:'30%',
            itemStyle: {
                color: "#5470c6",
                barBorderRadius: [10, 10, 0, 0],
            }
        },
        {
            name:'柱状图空心',
            data: [,,,70, 110, 130],
            type: 'bar',
            barWidth:'30%',
            itemStyle: {
                color: "transparent",
                borderColor:'#5470c6',
                borderWidth:2,
                barBorderRadius: [10, 10, 0, 0],
            },
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
