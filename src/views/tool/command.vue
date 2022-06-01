<template>
    <div class="command submainnew">
        <div class="grid-content grid-content-2">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>命令发布</span>
                    <p></p>
                </div>
                <div class="item">
                    <el-table
                    :data="tableData"
                    style="width: 100%">
                        <el-table-column
                            prop="date"
                            label="线路">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="车站">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="操作类型">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="发布对象">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="确认发布">
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>

        </div>

        <div class="grid-content grid-content-2">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>信息发布</span>
                    <p>
                        <el-button type="success" size="small">添加</el-button>
                        <el-button type="info" size="small">编辑</el-button>
                        <el-button type="warning" size="small">确认</el-button>
                        <el-button type="danger" size="small">删除</el-button>
                    </p>
                </div>
                <div class="item">
                    <el-table
                    :data="tableData"
                    style="width: 100%">
                        <el-table-column
                            prop="date"
                            label="原因">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="地点">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="参与人员">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="触发人员">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="处置过程">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="初步结论">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="影响情况">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="后续行动">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="平台">
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>

        </div>

        

    </div>
</template>

<script>
import echarts from "echarts";
var charts = null
var option = {
    grid:{
        left:30,
        top:10,
        right:0,
        bottom:20
    },
    backgroundColor:'#000',
}

export default {
    name: "command",
    data(){
        return{
            tableData: []
        }
    },
    created(){

    },
    computed: {

    },
    mounted(){
        charts = this.$echarts.init(this.$refs.echart,'dark');
        charts.setOption(option, true);
    },
    methods:{

    }
};
</script>

<style scoped>
.passengerflow .el-card{height:calc((100vh - 110px) / 3)}
</style>
