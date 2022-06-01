<template>
    <div class="detailed submainnew">
        <el-row :gutter="10">
            <el-col :span="8">
                <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>路网15分钟进出站量</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <div class="echarts" ref="echart"></div>
                        </div>
                    </el-card>

                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>客流量</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <div class="echarts" ref="echart1"></div>
                        </div>
                    </el-card>

                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>客流票种分布</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <div class="echarts" ref="echart2"></div>
                        </div>
                    </el-card>

                </div>
            </el-col>
        </el-row>

        <el-row :gutter="10">
            <el-col :span="8">
                <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>线路客运量</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <div class="echarts" ref="echart3"></div>
                        </div>
                    </el-card>

                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>路网瞬时客流量</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <div class="echarts" ref="echart4"></div>
                        </div>
                    </el-card>

                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>线路间换乘客流</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <div class="echarts" ref="echart5"></div>
                        </div>
                    </el-card>

                </div>
            </el-col>
        </el-row>


    </div>
</template>

<script>
import echarts from "echarts";
var charts = null
var charts1 = null
var charts2 = null
var charts3 = null
var charts4 = null
var charts5 = null

var option = {
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
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
let xAxisData = [];
let data1 = [];
let data3 = [];
for (let i = 0; i < 10; i++) {
  xAxisData.push('Class' + i);
  data1.push(+(Math.random() * 2).toFixed(2));
  data3.push(+(Math.random() * 5).toFixed(2));
}
var emphasisStyle = {
  itemStyle: {
    shadowBlur: 10,
    shadowColor: 'rgba(0,0,0,0.3)'
  }
};
var option1 = {
    grid:{
        left:30,
        top:10,
        right:0,
        bottom:20
    },
    backgroundColor:'#000',
     xAxis: {
    data: xAxisData,
    name: 'X Axis',
    axisLine: { onZero: true },
    splitLine: { show: false },
    splitArea: { show: false }
  },
  yAxis: {},
  series: [
    {
      name: 'bar',
      type: 'bar',
      stack: 'one',
      emphasis: emphasisStyle,
      data: data1
    },
    {
      name: 'bar2',
      type: 'bar',
      stack: 'one',
      emphasis: emphasisStyle,
      data: data3
    }
  ]
}

var option2 = {
    grid:{
        left:30,
        top:10,
        right:0,
        bottom:20
    },
    backgroundColor:'#000',
    series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [50, 100],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: [
        { value: 40, name: 'rose 1' },
        { value: 38, name: 'rose 2' },
        { value: 32, name: 'rose 3' },
        { value: 30, name: 'rose 4' },
        { value: 28, name: 'rose 5' },
        { value: 26, name: 'rose 6' },
        { value: 22, name: 'rose 7' },
        { value: 18, name: 'rose 8' }
      ]
    }
  ]
    
}
const categories = (function () {
  let now = new Date();
  let res = [];
  let len = 10;
  while (len--) {
    res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
    now = new Date(+now - 2000);
  }
  return res;
})();
const categories2 = (function () {
  let res = [];
  let len = 10;
  while (len--) {
    res.push(10 - len - 1);
  }
  return res;
})();
const data = (function () {
  let res = [];
  let len = 10;
  while (len--) {
    res.push(Math.round(Math.random() * 1000));
  }
  return res;
})();
const data2 = (function () {
  let res = [];
  let len = 0;
  while (len < 10) {
    res.push(+(Math.random() * 10 + 5).toFixed(1));
    len++;
  }
  return res;
})();
var option4 = {
    grid:{
        left:30,
        top:10,
        right:0,
        bottom:20
    },
    backgroundColor:'#000',
    xAxis: [
    {
      type: 'category',
      boundaryGap: true,
      data: categories
    },
    {
      type: 'category',
      boundaryGap: true,
      data: categories2
    }
  ],
  yAxis: [
    {
      type: 'value',
      scale: true,
      name: 'Price',
      max: 30,
      min: 0,
      boundaryGap: [0.2, 0.2]
    },
    {
      type: 'value',
      scale: true,
      name: 'Order',
      max: 1200,
      min: 0,
      boundaryGap: [0.2, 0.2]
    }
  ],
  series: [
    {
      name: 'Dynamic Bar',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: data
    },
    {
      name: 'Dynamic Line',
      type: 'line',
      data: data2
    }
  ]
}
app.count = 11;
setInterval(function () {
  let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
  data.shift();
  data.push(Math.round(Math.random() * 1000));
  data2.shift();
  data2.push(+(Math.random() * 10 + 5).toFixed(1));
  categories.shift();
  categories.push(axisData);
  categories2.shift();
  categories2.push(app.count++);
  charts4.setOption({
    xAxis: [
      {
        data: categories
      },
      {
        data: categories2
      }
    ],
    series: [
      {
        data: data
      },
      {
        data: data2
      }
    ]
  });
}, 2100);
// prettier-ignore
const hours = [
    '12a', '1a', '2a', '3a', '4a', '5a', '6a',
    '7a', '8a', '9a', '10a', '11a',
    '12p', '1p', '2p', '3p', '4p', '5p',
    '6p', '7p', '8p', '9p', '10p', '11p'
];
// prettier-ignore
const days = [
    'Saturday', 'Friday', 'Thursday',
    'Wednesday', 'Tuesday', 'Monday', 'Sunday'
];
// prettier-ignore
const data5 = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]];
var option5 = {
    grid:{
        left:30,
        top:10,
        right:0,
        bottom:20
    },
    backgroundColor:'#000',
    tooltip: {
    formatter: function (params) {
      return (
        params.value[2] +
        ' commits in ' +
        hours[params.value[1]] +
        ' of ' +
        days[params.value[0]]
      );
    }
  },polar: {},
    angleAxis: {
    type: 'category',
    data: hours,
    boundaryGap: false,
    splitLine: {
      show: true
    },
    axisLine: {
      show: false
    }
  },
  radiusAxis: {
    type: 'category',
    data: days,
    axisLine: {
      show: false
    },
    axisLabel: {
      rotate: 45
    }
  },
  series: [
    {
      name: 'Punch Card',
      type: 'scatter',
      coordinateSystem: 'polar',
      symbolSize: function (val) {
        return val[2] * 2;
      },
      data: data5,
      animationDelay: function (idx) {
        return idx * 5;
      }
    }
  ]
}

export default {
    name: "detailed",
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

        charts2 = this.$echarts.init(this.$refs.echart2,'dark');
        charts2.setOption(option2, true);

        charts3 = this.$echarts.init(this.$refs.echart3,'dark');
        charts3.setOption(option, true);

        charts4 = this.$echarts.init(this.$refs.echart4,'dark');
        charts4.setOption(option4, true);

        charts5 = this.$echarts.init(this.$refs.echart5,'dark');
        charts5.setOption(option5, true);
},
    methods:{

    }
};
</script>

<style scoped>
.passengerflow .el-card{height:calc((100vh - 110px) / 3)}
</style>
