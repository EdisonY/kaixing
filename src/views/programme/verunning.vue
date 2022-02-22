<template>
    <div class="verunning">
         <el-row style="border-bottom:3px solid #ccc">
            <el-col :span="2" style="text-align:center;">
                <h3>校验结果</h3>
            </el-col>
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="对比指标"
                        align="center"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="告警数量"
                        align="center"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        align="center"
                        label="告警持续时长">
                    </el-table-column>
                    <el-table-column
                        prop="xinxi"
                        align="center"
                        label="告警位置">
                    </el-table-column>
                    <el-table-column
                        prop="duishu"
                        align="center"
                        label="告警持续时间">
                    </el-table-column>
                </el-table>
        </el-row>
        <el-row style="border-bottom:3px solid #ccc">
            <el-col :span="2" style="text-align:center;">
                <h3>方案详情</h3>
            </el-col>
            <div class="yl">运行图预留</div>
        </el-row>
    </div>
</template>

<script>


export default {
    name: 'index',
    components:{
    },
    data () {
        return {
            tableData: [{
                date: '进站量告警',
                name: '1',
                address: '5min',
                xinxi:'2号航站楼',
                duishu:'22:43-22:56'
            },{
                date: '车站滞留人数告警',
                name: '2',
                address: '9min',
                xinxi:'2号航站楼',
                duishu:'22:43-22:56'
            },{
                date: '站台滞留超过一次告警',
                name: '17',
                address: '5min',
                xinxi:'3号航站楼',
                duishu:'22:43-22:56'
            },{
                date: '分方向换成预测预警',
                name: '1',
                address: '3min',
                xinxi:'三元桥',
                duishu:'22:43-22:56'
            },{
                date: '区间满载率',
                name: '1',
                address: '5min',
                xinxi:'L1001',
                duishu:'22:43-22:56'
            }]
        }
    },
    created () {
        
    },
    computed: {
        
    },
    mounted(){
        
    },
    methods:{
        
    },
    destroyed() {
    }
}
</script>

<style>
.verunning h3{padding: 15px 0;color: #fff;font-weight: bold;}
.verunning .el-row{padding: 10px 20px;}
.verunning .yl{margin: 0;}

</style>