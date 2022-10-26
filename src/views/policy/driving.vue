<template>
    <div class="driving submainnew">
        <el-row :gutter="10">
            <el-col :span="14">
                <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>列车资源</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <div class="echarts" ref="echart"></div>
                        </div>
                    </el-card>

                </div>
            </el-col>
            <el-col :span="10">
                <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>运输计划调整预览</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <div class="echarts" ref="echart1"></div>
                        </div>
                    </el-card>

                </div>
            </el-col>
        </el-row>
        <div class="grid-content grid-content-2">

            <iframe frameborder="0" width="100%" height="100%" src="http://172.51.216.72:41003/#/common?rowHeight=50&viewTime=25200"></iframe>

        </div>
        

    </div>
</template>

<script>
import echarts from "echarts";
var charts = null
var charts1 = null
var option = {
    grid:{
        left:30,
        top:10,
        right:0,
        bottom:20
    },
    backgroundColor:'#000',
    xAxis: {
    type: 'category',
    data:  ['10-11', '10-12', '10-13', '10-14', '10-15', '10-16', '10-17']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Step Start',
      type: 'line',
      step: 'start',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Step Middle',
      type: 'line',
      step: 'middle',
      data: [220, 282, 201, 234, 290, 430, 410]
    },
    {
      name: 'Step End',
      type: 'line',
      step: 'end',
      data: [450, 432, 401, 454, 590, 530, 510]
    }
  ]
}
var option1 = {
    grid:{
        left:50,
        top:10,
        right:0,
        bottom:20
    },
    backgroundColor:'#000',
     xAxis: [
    {
      type: 'category',
      data: ['10-11', '10-12', '10-13', '10-14', '10-15', '10-16', '10-17'],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Precipitation',
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        formatter: '{value} ml'
      }
    },
    {
      type: 'value',
      name: 'Temperature',
      min: 0,
      max: 25,
      interval: 5,
      axisLabel: {
        formatter: '{value} °C'
      }
    }
  ],
  series: [
    {
      name: 'Evaporation',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' ml';
        }
      },
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
    },
    {
      name: 'Precipitation',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' ml';
        }
      },
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
      ]
    },
    {
      name: 'Temperature',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value + ' °C';
        }
      },
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    }
  ]
}

export default {
    name: "driving",
    data(){
        return{

        }
    },
    created(){

    },
    computed: {

    },
    mounted(){
        charts = this.$echarts.init(this.$refs.echart,'dark');
        charts.setOption(option, true);
        charts1 = this.$echarts.init(this.$refs.echart1,'dark');
        charts1.setOption(option1, true);
    },
    methods:{

    }
};
</script>

<style scoped>
.passengerflow .el-card{height:calc((100vh - 110px) / 3)}
</style>
