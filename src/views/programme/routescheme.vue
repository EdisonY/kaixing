<template>
    <div class="routescheme">
        <el-row>
            <el-col :span="24">
                <div class="subwayLine">
                    <img src="@/assets/line.png" />
                </div>
            </el-col>
        </el-row>
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
         <el-row>
            <el-col :span="3" style="text-align:center;padding-top:15px">
                <h3>交路方案选择</h3>
            </el-col>
            <el-col :span="21" style="text-align:right;padding-top:15px;">
                <el-button size="medium">历史交路铺设方式</el-button>
            </el-col>
        </el-row>
        <div class="chose">
            <el-table
            :data="tableData"
            border
            style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <span>{{ props.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="起止时间"
                    align="center"
                    width="180"
                    prop="id">
                    <template slot="header" slot-scope="scope">
                        起止时间<br>
                        <el-tag type="danger" size="mini" >高峰</el-tag>
                        <el-tag type="warning" size="mini" >平峰</el-tag>
                        <el-tag type="success" size="mini" >闲时</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    label="交路方案"
                    header-align="center"
                    prop="name">
                </el-table-column>
            </el-table>
        </div>
        <div style="margin: 0 0 0 20px">
            <el-button @click="addTime()">添加条数</el-button>
            <el-button type="primary">生成开行方案</el-button>
        </div>
        <el-dialog
            title="添加条数"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-time-select
                placeholder="起始时间"
                v-model="startTime"
                :picker-options="{
                start: '05:00',
                step: '01:00',
                end: '24:00'
                }">
            </el-time-select>
            <el-time-select
                placeholder="结束时间"
                v-model="endTime"
                :picker-options="{
                start: '05:00',
                step: '01:00',
                end: '24:00',
                minTime: startTime
                }">
            </el-time-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false" size="medium">确 定</el-button>
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
            startTime: '',
            endTime: '',
            dialogVisible:false,
            tableData: [{
                id: '12987122',
                name: '好滋好味鸡蛋仔',
            }, {
                id: '12987123',
                name: '好滋好味鸡蛋仔',
            }, {
                id: '12987125',
                name: '好滋好味鸡蛋仔',
            }, {
                id: '12987126',
                name: '好滋好味鸡蛋仔',
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
        addTime(){
            this.dialogVisible = true
        },
        handleClose(){
            this.dialogVisible = false
        }
    },
    destroyed() {
    }
}
</script>

<style>
.subwayLine img{width: 100%;}
.routescheme h3{padding: 0 0 15px 0;color: #fff;font-weight: bold;}
.routescheme .el-row{padding: 10px 20px;}
.chose{padding: 0 20px 20px 20px ;}
.el-dialog__body{text-align: center;}
</style>