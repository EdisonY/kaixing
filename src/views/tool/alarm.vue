<template>
    <div class="alarm submainnew">
        <div class="grid-content grid-content-2">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>报警/事件查询</span>
                    <p>
                        <el-input style="width:200px;ver" placeholder="请输入内容"></el-input>
                        <el-button type="success" size="small">查询</el-button>
                        <el-button type="danger" size="small">重置</el-button>
                    </p>
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
                            prop="address"
                            label="专业">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="报警/事件描述">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="报警状态">
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>

        </div>

        <div class="grid-content grid-content-2">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>报警等级管理</span>
                    <p>
                        <el-button type="success" size="small">全选</el-button>
                        <el-button type="info" size="small">取消</el-button>
                        <el-button type="warning" size="small">设置</el-button>
                        <el-button type="danger" size="small">重置</el-button>
                    </p>
                </div>
                <div class="item">
                    <el-table
                    :data="tableData"
                    style="width: 100%">
                        <el-table-column
                            prop="date"
                            label="报警等级">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="报警描述">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="显示形式">
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
    name: "alarm",
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
