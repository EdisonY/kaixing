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
                        label="起止时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="交路方式"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="跳停车站">
                    </el-table-column>
                    <el-table-column
                        prop="xinxi"
                        label="编组信息">
                    </el-table-column>
                    <el-table-column
                        prop="duishu"
                        label="开行对数">
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
                date: '05:00:00-07:00:00',
                name: '3号航站楼-东直门',
                address: '无',
                xinxi:'4L',
                duishu:'15对'
            },{
                date: '05:00:00-07:00:00',
                name: '3号航站楼-东直门',
                address: '无',
                xinxi:'4L',
                duishu:'15对'
            },{
                date: '05:00:00-07:00:00',
                name: '3号航站楼-东直门',
                address: '无',
                xinxi:'4L',
                duishu:'15对'
            },{
                date: '05:00:00-07:00:00',
                name: '3号航站楼-东直门',
                address: '无',
                xinxi:'4L',
                duishu:'15对'
            },{
                date: '05:00:00-07:00:00',
                name: '3号航站楼-东直门',
                address: '无',
                xinxi:'4L',
                duishu:'15对'
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