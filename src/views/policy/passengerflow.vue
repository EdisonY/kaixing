<template>
    <div class="passengerflow submainnew">
        <el-row :gutter="10">
            <el-col :span="14">
                <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>路网客运量</span>
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
                            <span>线路客运量</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <div class="echarts" ref="echart1"></div>
                        </div>
                    </el-card>

                </div>
            </el-col>
        </el-row>

        <el-row :gutter="10">
            <el-col :span="10">
                <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>单线路各站进出站客流 - 7号线</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <div class="echarts" ref="echart2"></div>
                        </div>
                    </el-card>

                </div>
            </el-col>
            <el-col :span="14">
                <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>单站15分钟进出站量、换入/换出量 - 北京西站</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <div class="echarts" ref="echart3"></div>
                        </div>
                    </el-card>

                </div>
            </el-col>
        </el-row>

        

    </div>
</template>

<script>
import echarts from "echarts";

const LINES=[
    '1号线', '2号线','5号线', '6号线', '7号线', 
    '8号线','9号线','10号线','13号线','19号线'
];
let xAxisData = [];
let data1 = [];
let data2 = [];
for (let i = 0; i < 10; i++) {
  xAxisData.push(`${i*2+4}:00`);
  data1.push(+(Math.random() * 2).toFixed(2));
  data2.push(+(Math.random() * 5).toFixed(2));
}
var emphasisStyle = {
  itemStyle: {
    shadowBlur: 10,
    shadowColor: 'rgba(0,0,0,0.3)'
  }
};

import echarts from "echarts";
let xAxisData1 = [];
let data11 = [];
let data22 = [];
for (let i = 0; i < 10; i++) {
    xAxisData1.push(LINES[i]);
    data11.push(+(Math.random() * 2).toFixed(2));
    data22.push(+(Math.random() * 5).toFixed(2));
}

var charts = null
var charts1 = null
var charts2 = null
var charts3 = null

var option = {
    grid:{
        left:20,
        top:10,
        right:0,
        bottom:20
    },
    backgroundColor:'#000',
  tooltip: {},
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
      data: data2
    }
  ]
};

var option1 = {
    grid:{
        left:20,
        top:10,
        right:0,
        bottom:20
    },
    backgroundColor:'#000',
  tooltip: {},
  xAxis: {
    data: xAxisData1,
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
      data: data11
    },
    {
      name: 'bar2',
      type: 'bar',
      stack: 'one',
      emphasis: emphasisStyle,
      data: data22
    }
  ]
};

var option2 = {
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
      data: ['北京西站','湾子站','达官营站','广安门内站','菜市口站','虎坊桥站','珠市口站'],
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
const data3 = (function () {
  let res = [];
  let len = 10;
  while (len--) {
    res.push(Math.round(Math.random() * 1000));
  }
  return res;
})();
const data4 = (function () {
  let res = [];
  let len = 0;
  while (len < 10) {
    res.push(+(Math.random() * 10 + 5).toFixed(1));
    len++;
  }
  return res;
})();
var option3 = {
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
      data: data3
    },
    {
      name: 'Dynamic Line',
      type: 'line',
      data: data4
    }
  ]
}
app.count = 11;
setInterval(function () {
  let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
  data3.shift();
  data3.push(Math.round(Math.random() * 1000));
  data4.shift();
  data4.push(+(Math.random() * 10 + 5).toFixed(1));
  categories.shift();
  categories.push(axisData);
  categories2.shift();
  categories2.push(app.count++);
  charts3.setOption({
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
        data: data3
      },
      {
        data: data4
      }
    ]
  });
}, 2100);
export default {
    name: "passengerflow",
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
        charts3.setOption(option3, true);
},
    methods:{

    }
};
</script>

<style scoped>
</style>
