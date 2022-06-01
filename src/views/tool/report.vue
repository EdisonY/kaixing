<template>
    <div class="report submainnew">
        <div class="grid-content">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>报表管理</span>
                    <p>
                         <el-button type="success" size="small">发布</el-button>
                        <el-button type="info" size="small">选择</el-button>
                        <el-button type="warning" size="small">编辑</el-button>
                        <el-button type="danger" size="small">删除</el-button>
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
                            label="内容">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="来源">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="操作人">
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
    name: "report",
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
