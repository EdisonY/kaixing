<template>
    <div class="passengerflow submainnew">
        <el-row :gutter="10">
            <el-col :span="14">
                <div class="grid-content grid-content-3">
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
                <el-row :gutter="10">
                    <el-col :span="10">
                        <div class="grid-content grid-content-3">
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
                    <el-col :span="10">
                        <div class="grid-content grid-content-3">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>车站客运量</span>
                                    <p></p>
                                </div>
                                <div class="item">
                                    <div class="echarts" ref="echart2"></div>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content grid-content-3">
                            <img src="../../assets/new/img1.png"/>
                        </div>
                    </el-col>
                </el-row>
                <div class="grid-content grid-content-3" style="margin-top:10px">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>车站分时客运量</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <div class="echarts" ref="echart3"></div>
                        </div>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="grid-content grid-content-2">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>指标TOP</span>
                            <p></p>
                        </div>
                        <div class="item">
                             <el-table
                                :data="tableData"
                                style="width: 100%">
                                <el-table-column
                                    prop="date"
                                    label="进出站客流TOP10"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label="换乘客流TOP10"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="断面客流TOP10">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </div>
                <div class="grid-content grid-content-2">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>重点车站监视</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <el-table
                                :data="tableData"
                                style="width: 100%">
                                <el-table-column
                                    prop="date"
                                    label="进出站客流TOP10"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label="换乘客流TOP10"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="断面客流TOP10">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
        
    </div>
</template>

<script>
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
    xAxis: {
        type: 'category',
        data: ['北京西站', '湾子站', '达官营站', '广安门内站', '菜市口站', '虎坊桥站', '珠市口站']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
        }
    ]
}

export default {
    name: "passengerflow",
    data(){
        return{
            tableData: [{
                date: '北京西站 30221',
                name: '百子湾站 28334',
                address: '东直门 345'
            }, {
                date: '九龙山站 28334',
                name: '北京西站 22000',
                address: '花乡东桥站 122'
            }, {
                date: '达官营站 22000',
                name: '九龙山站 100',
                address: '呼家楼站 201'
            }, {
                date: '双井站 15345',
                name: '达官营站 12003',
                address: '知春路站 23'
            }, {
                date: '百子湾站 12003',
                name: '双井站 11672',
                address: '大望路站 18'
            }, ]
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
        charts1.setOption(option, true);

        charts2 = this.$echarts.init(this.$refs.echart2,'dark');
        charts2.setOption(option1, true);

        charts3 = this.$echarts.init(this.$refs.echart3,'dark');
        charts3.setOption(option, true);
    },
    methods:{

    }
};
</script>

<style scoped>
/* .passengerflow .el-card{height:calc((100vh - 110px) / 3)} */
.passengerflow .grid-content-3 img{width: 100%;height: 100%;}
</style>
