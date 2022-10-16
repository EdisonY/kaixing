<template>
    <div class="comprehensive submainnew">
        <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>报警信息</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <el-table
                                :data="tableData"
                                style="width: 100%">
                                <el-table-column
                                    prop="date"
                                    label="日期时间">
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label="报警等级">
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="车站">
                                </el-table-column>
                                <el-table-column
                                    prop="address1"
                                    label="专业">
                                </el-table-column>
                                <el-table-column
                                    prop="address2"
                                    label="报警描述">
                                </el-table-column>
                                <el-table-column
                                    prop="address3"
                                    label="报警状态">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>

                </div>
        <el-row :gutter="10">
            <el-col :span="12">
                <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>各级报警数量</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <div class="echarts" ref="echart1"></div>
                        </div>
                    </el-card>

                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>报警分类占比</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <div class="echarts" ref="echart2"></div>
                        </div>
                    </el-card>

                </div>
            </el-col>
        </el-row>

        

    </div>
</template>

<script>
import echarts from "echarts";
var charts1 = null
var charts2 = null

var option1 = {
    grid:{
        left:50,
        top:10,
        right:0,
        bottom:20
    },
    backgroundColor:'#000',
     dataset: {
    source: [
      ['score', 'amount', 'product'],
      [89.3, 58212, '1号线'],
      [57.1, 78254, '2号线'],
      [74.4, 41032, '13号线'],
      [50.1, 12755, '4号线'],
      [89.7, 20145, '5号线'],
      [68.1, 79146, '6号线'],
      [19.6, 91852, '7号线'],
      [10.6, 101852, '8号线'],
      [32.7, 20112, '10号线']
    ]
  },
  xAxis: { name: 'amount' },
  yAxis: { type: 'category' },
  visualMap: {
    orient: 'horizontal',
    left: 'center',
    top:-30,
    min: 10,
    max: 100,
    dimension: 0,
    inRange: {
      color: ['#65B581', '#FFCE34', '#FD665F']
    }
  },
  series: [
    {
      type: 'bar',
      encode: {
        // Map the "amount" column to X axis.
        x: 'amount',
        // Map the "product" column to Y axis
        y: 'product'
      }
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
        { value: 40, name: '行车' },
        { value: 38, name: '客流' },
        { value: 32, name: '设备' },
      ]
    }
  ]
}

export default {
    name: "comprehensive",
    data(){
        return{
            tableData: [{
                date: '2022年4月13日 12：00：00',
                name: '1级',
                address: '北京西站',
                address1: '车辆',
                address2: '列车1001第三车厢着火',
                address3: '报警待确认',
            }, {
                date: '2022年4月13日 12：00：00',
                name: '1级',
                address: '北京西站',
                address1: '车辆',
                address2: '列车1001第三车厢着火',
                address3: '报警待确认',
            }, {
                date: '2022年4月13日 12：00：00',
                name: '1级',
                address: '北京西站',
                address1: '车辆',
                address2: '列车1001第三车厢着火',
                address3: '报警待确认',
            }, {
                date: '2022年4月13日 12：00：00',
                name: '1级',
                address: '北京西站',
                address1: '车辆',
                address2: '列车1001第三车厢着火',
                address3: '报警待确认',
            }, {
                date: '2022年4月13日 12：00：00',
                name: '1级',
                address: '北京西站',
                address1: '车辆',
                address2: '列车1001第三车厢着火',
                address3: '报警待确认',
            }, {
                date: '2022年4月13日 12：00：00',
                name: '1级',
                address: '北京西站',
                address1: '车辆',
                address2: '列车1001第三车厢着火',
                address3: '报警待确认',
            }, {
                date: '2022年4月13日 12：00：00',
                name: '1级',
                address: '北京西站',
                address1: '车辆',
                address2: '列车1001第三车厢着火',
                address3: '报警待确认',
            }, ]
        }
    },
    created(){

    },
    computed: {

    },
    mounted(){
        charts1 = this.$echarts.init(this.$refs.echart1,'dark');
        charts1.setOption(option1, true);

        charts2 = this.$echarts.init(this.$refs.echart2,'dark');
        charts2.setOption(option2, true);
    },
    methods:{

    }
};
</script>

<style scoped>
.passengerflow .el-card{height:calc((100vh - 110px) / 3)}
</style>
