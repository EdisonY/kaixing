<template>
    <div class="drawrunning">
        <el-row style="border-bottom:3px solid #ccc">
            <el-col :span="3" style="text-align:center;">
                <h3>客流信息</h3>
                <el-button type="primary">客流加载</el-button>
            </el-col>
            <el-col :span="7">
                <div class="yl">断面客流预留</div>
            </el-col>
            <el-col :span="7">
                <div class="yl">OD量预留</div>
            </el-col>
            <el-col :span="7">
                <div class="yl">断面客流TOP5预留</div>
            </el-col>
        </el-row>
        <el-row style="border-bottom:3px solid #ccc">
            <el-col :span="3" style="text-align:center;">
                <h3>开行方案</h3>
            </el-col>
            <div class="drawTable">
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
                <p style="text-align:right;padding:15px 0 0 0;"><el-button type="primary">铺画运行图</el-button></p>
            </div>
        </el-row>
        <el-row style="padding:0 20px">
            <el-col :span="24" style="text-align:center;">
                <div class="yl">运行图预留</div>
            </el-col>
            <p style="text-align:right;padding:15px 0 0 0;">
                 <el-button type="success">启动运行图校验</el-button>
                 <el-button type="primary">保存运行图</el-button>
            </p>
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
/* .drawrunning{padding: 20px 0 0 0;} */
.drawrunning h3{padding: 15px 0;color: #fff;font-weight: bold;}
/* .drawTable{padding: 0 20px 20px 20px;} */
.drawrunning .el-row{padding: 10px 20px;}
</style>