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
                            <el-link v-if="scope.row.date == '站台滞留人数告警'" type="danger" @click="showAlert(scope.row)">{{ scope.row.date }}</el-link>
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
        <el-row>
            <el-col :span="2" style="text-align:center;">
                <h3>方案详情</h3>
            </el-col>
            <div class="yl">
                <!-- <iframe frameborder="0" width="100%" height="300" src="http://172.51.216.62:41002/apps/hello-change/#/program/rungraph1"></iframe> -->
                <img src="@/assets/tmp/addafter.png">
            </div>
        </el-row>
        <el-dialog
        title="站台滞留人数告警"
        :visible.sync="dialogVisible1"
        width="40%"
        class="detailDia"
        :before-close="handleClose">
            <ul>
                <li>告警数量：1</li>
                <li>告警持续时长：9min</li>
                <li>告警位置：3号航站楼站</li>
            </ul>
            <table class="selfTable">
                <tr class="thead">
                    <th colspan="2">岗位</th>
                    <th>
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
                        处置措施
                    </th>
                </tr>
                <tr v-for="item in detailsData" :key="item.label">
                    <td v-if="item.row" rowspan="5" style="width:100px">车站</td>
                    <td :colspan="item.cow">{{item.gangwei}}</td>
                    <td>
                        <el-checkbox v-model="item.check" :key="item.label" @change="handleCheckedCitiesChange"></el-checkbox>
                        {{item.cuoshi}}
                    </td>
                </tr>
            </table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">关 闭</el-button>
                <el-button type="success" v-if="isIndeterminate || checkAll" @click="ph('站场通知成功！')">通知站场</el-button>
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
                duishu:'22:53-22:58'
            },{
                date: '站台滞留人数告警',
                name: '2',
                address: '9min',
                xinxi:'2号航站楼',
                duishu:'22:56-22:05'
            },{
                date: '站台滞留超过一次告警',
                name: '17',
                address: '5min',
                xinxi:'3号航站楼',
                duishu:'22:53-22:58'
            },{
                date: '分方向换成预测预警',
                name: '1',
                address: '3min',
                xinxi:'三元桥',
                duishu:'22:53-22:56'
            },{
                date: '区间满载率',
                name: '1',
                address: '5min',
                xinxi:'L1001',
                duishu:'22:53-22:58'
            },{
                date: '列车满载率',
                name: '1',
                address: '5min',
                xinxi:'L1001',
                duishu:'22:53-22:58'
            }],
            detailsData:[{
                gangwei:'OCC行车调度',
                cuoshi:'加强相邻换乘站的客流监视，做加车准备',
                cow:2,
                label:'1',
                check:false
            },{
                gangwei:'客流调度',
                cuoshi:'加强相邻车站的客流监视，做关联限流准备',
                cow:2,
                label:'2',
                check:false
            },{
                gangwei:'值班站长',
                cuoshi:'支援人员到位后，安排支援人员岗位',
                row:5,
                label:'3',
                check:false
            },{
                gangwei:'客运值班员',
                cuoshi:'放置铁马等物品，引导乘客，关注站厅及出入口客流情况',
                label:'4',
                check:false
            },{
                gangwei:'客服中心',
                cuoshi:'加强乘客广播，保障乘客安全，协助客运值班员引导乘客进入付费区',
                label:'5',
                check:false
            },{
                gangwei:'站台岗',
                cuoshi:'加强站台巡视，维护现场秩序，重点关注站台楼扶梯与列车关门情况',
                label:'6',
                check:false
            },{
                gangwei:'售检票',
                cuoshi:'改变部分自动检票机运行模式，缓解进站强度',
                label:'7',
                check:false
            }],
            isIndeterminate: false,
            checkAll: false,
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
            for (let index = 0; index < this.detailsData.length; index++) {
                this.detailsData[index].check = false
            }
            this.isIndeterminate = false
            this.checkAll = false
        },
        handleClick(){
            this.dialogVisible1 = true
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        handleCheckAllChange(val) {
            var tmp = 0;
            for (let index = 0; index < this.detailsData.length; index++) {
                if(this.detailsData[index].check){
                    tmp++
                }
            }
            if(tmp == this.detailsData.length){
                for (let index = 0; index < this.detailsData.length; index++) {
                    this.detailsData[index].check = false
                    this.isIndeterminate = false
                    this.checkAll = false
                }
            }else{
                for (let index = 0; index < this.detailsData.length; index++) {
                    this.detailsData[index].check = true
                    this.isIndeterminate = false
                    this.checkAll = true
                }
            }
        },
        handleCheckedCitiesChange(value) {
            var tmp = 0;
            for (let index = 0; index < this.detailsData.length; index++) {
                if(this.detailsData[index].check){
                    tmp++
                }
            }
            
            if(tmp > 0){
                this.isIndeterminate = true
                if(tmp == this.detailsData.length){
                    this.isIndeterminate = false
                    this.checkAll = true
                }
            }else{
                this.isIndeterminate = false
                this.checkAll = false
            }
        },
        ph(msg){
            this.$message({
                type: 'success',
                message: msg
            });
            this.handleClose()
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
.verunning .el-dialog__body ul{text-align: left;margin: -15px 0 20px 0;font-size: 14px;font-weight: bold;}
.verunning .selfTable{width: 100%;border-left: 1px solid #ebeef5;border-bottom: 1px solid #ebeef5;border-spacing: 0;}
.verunning .selfTable tr{line-height: 40px;}
.verunning .selfTable tr:hover,.verunning .selfTable .thead{background-color: #f5f7fa;}
.verunning .selfTable tr td,.verunning .selfTable tr th{border-right: 1px solid #ebeef5;border-top: 1px solid #ebeef5;text-align: center;position: relative;}
.verunning .selfTable tr td label,.verunning .selfTable tr th label{position: absolute;left:5px}
</style>