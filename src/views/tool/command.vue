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
                            prop="line"
                            label="线路">
                        </el-table-column>
                        <el-table-column
                            prop="station"
                            label="车站">
                        </el-table-column>
                        <el-table-column
                            prop="type"
                            label="操作类型">
                        </el-table-column>
                        <el-table-column
                            prop="obj"
                            label="发布对象">
                        </el-table-column>
                        <el-table-column
                            prop="state"
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
                    :data="tableData2"
                    style="width: 100%">
                        <el-table-column
                            prop="reason"
                            label="原因">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="地点">
                        </el-table-column>
                        <el-table-column
                            prop="person1"
                            label="参与人员">
                        </el-table-column>
                        <el-table-column
                            prop="person2"
                            label="触发人员">
                        </el-table-column>
                        <el-table-column
                            prop="process"
                            label="处置过程">
                        </el-table-column>
                        <el-table-column
                            prop="result"
                            label="初步结论">
                        </el-table-column>
                        <el-table-column
                            prop="effect"
                            label="影响情况">
                        </el-table-column>
                        <el-table-column
                            prop="action"
                            label="后续行动">
                        </el-table-column>
                        <el-table-column
                            prop="plat"
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
            tableData: [{
                line:"7号线",
                station:"",
                type:"检查",
                obj:"7号线行调",
                state:"已发布"
            },{
                line:"八通线",
                station:"",
                type:"检查",
                obj:"八通线行调",
                state:"已发布"
            }],
            tableData2:[{
                reason:"大客流",
                address:"环球度假区",
                person1:"站务",
                person2:"站长",
                process:"",
                result:"客流达到预计70%",
                effect:"不影响临站",
                action:"无",
                plat:""
            },{
                reason:"大客流",
                address:"环球度假区",
                person1:"站务",
                person2:"站长",
                process:"接环球度假区园区电话，核对互联网数据，15分钟后散场高峰抵达进站口",
                result:"加强客流引导",
                effect:"本站",
                action:"检查进站口铁马摆放",
                plat:""
            }]
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
