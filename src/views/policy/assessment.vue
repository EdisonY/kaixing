<template>
    <div class="assessment submainnew">
        <el-row :gutter="10">
            <el-col :span="12">
                <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>运营数据</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <el-table
                            :data="tableData"
                            style="width: 100%">
                            <el-table-column
                                prop="date"
                                label="日期">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="姓名">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="地址">
                            </el-table-column>
                            </el-table>
                        </div>
                    </el-card>

                </div>
                <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>运营简报</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <h4>
                                2022年2月20日暴雨事件首都机场线10列车、4车站、28命站务人员、共延长2小时，10号线20列车、45个车站、315名站务人员、共演延长2小时，应急处置时长22分03秒，共疏散旅客数<span style="color:red;font-size:26px">3456</span>，无人员伤亡，无设备损失。
                            </h4>
                        </div>
                    </el-card>

                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>统计</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <div class="echarts" ref="echart1"></div>
                        </div>
                    </el-card>
                </div>
                <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>列车晚点信息</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <el-table
                            :data="tableData"
                            style="width: 100%">
                            <el-table-column
                                prop="date"
                                label="日期">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="姓名">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="地址">
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
import echarts from "echarts";
var charts = null
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
export default {
    name: "assessment",
    data(){
        return{
            tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
    },
    created(){

    },
    computed: {

    },
    mounted(){
        charts = this.$echarts.init(this.$refs.echart1,'dark');
        charts.setOption(option1, true);
    },
    methods:{

    }
};
</script>

<style scoped>
.assessment h4{padding: 20px 10px;line-height: 26px;font-size: 20px;text-indent: 2em;}
</style>
