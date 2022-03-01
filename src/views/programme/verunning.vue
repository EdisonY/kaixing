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
                        <template slot-scope="scope">
                            <el-link v-if="scope.row.date == '车站滞留人数告警'" type="danger" @click="showAlert(scope.row)">{{ scope.row.date }}</el-link>
                            <span v-else>{{ scope.row.date }}</span>
                        </template>
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
        <el-dialog
        title="车站滞留人数告警"
        :visible.sync="dialogVisible1"
        width="40%"
        class="detailDia"
        :before-close="handleClose">
            <ul>
                <li>告警数量：1</li>
                <li>告警持续时长：9min</li>
                <li>告警位置：3号航站楼站</li>
            </ul>
            <!-- <el-table
                ref="singleTable"
                :data="detailsData"
                highlight-current-row
                border
                style="width: 100%">
                <el-table-column
                property="gangwei"
                label="岗位"
                align="center"
                width="120">
                </el-table-column>
                <el-table-column
                align="center"
                width="120">
                </el-table-column>
                <el-table-column
                property="cuoshi"
                label="处置措施"
                align="left">
                </el-table-column>
            </el-table> -->
            <table class="selfTable">
                <tr class="thead">
                    <th colspan="2">岗位</th>
                    <th>处置措施</th>
                </tr>
                <tr>
                    <td colspan="2">OCC行车调度	</td>
                    <td>加强相邻换乘站的客流监视，做加车准备</td>
                </tr>
                <tr>
                    <td colspan="2">客流调度</td>
                    <td>加强相邻车站的客流监视，做关联限流准备</td>
                </tr>
                <tr>
                    <td rowspan="5" style="width:100px">车站</td>
                    <td style="width:120px">值班站长</td>
                    <td>支援人员到位后，安排支援人员岗位</td>
                </tr>
                <tr>
                    <td>客运值班员</td>
                    <td>放置铁马等物品，引导乘客，关注站厅及出入口客流情况</td>
                </tr>
                <tr>
                    <td>客服中心</td>
                    <td>加强乘客广播，保障乘客安全，协助客运值班员引导乘客进入付费区</td>
                </tr>
                <tr>
                    <td>站台岗</td>
                    <td>加强站台巡视，维护现场秩序，重点关注站台楼扶梯与列车关门情况</td>
                </tr>
                <tr>
                    <td>售检票</td>
                    <td>改变部分自动检票机运行模式，缓解进站强度</td>
                </tr>
            </table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">关 闭</el-button>
                <!-- <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button> -->
            </span>
        </el-dialog>
    </div>
</template>

<script>


export default {
    name: 'index',
    components:{
    },
    data () {
        return {
            dialogVisible1:false,
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
            }],
            detailsData:[{
                gangwei:'OCC行车调度',
                cuoshi:'加强相邻换乘站的客流监视，做加车准备',
            },{
                gangwei:'客流调度',
                cuoshi:'加强相邻车站的客流监视，做关联限流准备',
            },{
                gangwei:'值班站长',
                cuoshi:'支援人员到位后，安排支援人员岗位',
            },{
                gangwei:'客运值班员',
                cuoshi:'放置铁马等物品，引导乘客，关注站厅及出入口客流情况',
            },{
                gangwei:'客服中心',
                cuoshi:'加强乘客广播，保障乘客安全，协助客运值班员引导乘客进入付费区',
            },{
                gangwei:'站台岗',
                cuoshi:'加强站台巡视，维护现场秩序，重点关注站台楼扶梯与列车关门情况',
            },{
                gangwei:'售检票',
                cuoshi:'改变部分自动检票机运行模式，缓解进站强度',
            }],
        }
    },
    created () {
        
    },
    computed: {
        
    },
    mounted(){
        
    },
    methods:{
        showAlert(data){
            this.dialogVisible1 = true
        },
        handleClose(){
            this.dialogVisible = false
            this.dialogVisible1 = false
        },
        handleClick(){
            this.dialogVisible1 = true
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },
    },
    destroyed() {
    }
}
</script>

<style>
.verunning h3{padding: 15px 0;color: #fff;font-weight: bold;}
.verunning .el-row{padding: 10px 20px;}
.verunning .yl{margin: 0;}
.verunning .el-dialog__body ul{text-align: left;margin: -25px 0 10px 0;font-size: 14px;font-weight: bold;}
.verunning .selfTable{width: 100%;border-left: 1px solid #ebeef5;border-bottom: 1px solid #ebeef5;border-spacing: 0;}
.verunning .selfTable tr{line-height: 40px;}
.verunning .selfTable tr:hover,.verunning .selfTable .thead{background-color: #f5f7fa;}
.verunning .selfTable tr td,.verunning .selfTable tr th{border-right: 1px solid #ebeef5;border-top: 1px solid #ebeef5;text-align: center;}
</style>