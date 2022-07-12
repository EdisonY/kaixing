<template>
    <div class="message submainnew">
        <div class="grid-content">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>消息列表</span>
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
                            label="时间">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="内容">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="操作者">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="结果">
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
    name: "message",
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
