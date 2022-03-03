<template>
    <div class="drawrunning">
        <el-row style="border-bottom:3px solid #ccc">
            <el-col :span="10">
                <div class="yl">
                    <iframe frameborder="0" width="100%" height="300" src="http://172.51.216.61:8011/seabed/preview/f2d12fd36204481a8af5f3b1f3ab4a54"></iframe>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="yl">
                    <iframe frameborder="0" width="100%" height="300" src="http://172.51.216.61:8011/seabed/preview/d0899ec7fb054de6b72b5ced886e714e"></iframe>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="yl">
                    <iframe frameborder="0" width="100%" height="300" src="http://172.51.216.61:8011/seabed/preview/0cc0a57ec0f648c88120827b762b2fcf"></iframe>
                </div>
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
                        align="center"
                        label="起止时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="交路方式"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        align="center"
                        label="跳停车站">
                    </el-table-column>
                    <el-table-column
                        prop="xinxi"
                        align="center"
                        label="编组信息">
                    </el-table-column>
                    <el-table-column
                        prop="duishu"
                        align="center"
                        label="开行对数">
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    align="center"
                    label="操作"
                    width="100">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="edit(scope.row)" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <p style="text-align:right;padding:15px 0 0 0;"><el-button type="primary" @click="ph('运行图铺画成功！')">铺画运行图</el-button></p>
            </div>
        </el-row>
        <el-row style="padding:0 20px">
            <el-col :span="24" style="text-align:center;">
                <div class="yl">
                    <iframe frameborder="0" width="100%" height="300" src="http://172.51.216.62:41002/apps/hello-change/#/program/rungraph1"></iframe>
                </div>
            </el-col>
            <p style="text-align:right;padding:15px 0 0 0;">
                 <el-button type="success" @click="ph('运行图校验成功！')">启动运行图校验</el-button>
                 <el-button type="primary" @click="ph('运行图保存成功！')">保存运行图</el-button>
            </p>
        </el-row>
        <el-dialog
        title="开行方案修改"
        class="drawEdit"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
            <ul>
                <li>
                    <strong>起止时间</strong>
                    <div class="diaMain">
                        {{tmp.date}}
                    </div>
                </li>
                <li>
                    <strong>交路方式</strong>
                    <div class="diaMain">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </li>
                <li>
                    <strong>跳停车站</strong>
                    <div class="diaMain">
                        <el-select v-model="value1" placeholder="请选择">
                            <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </li>
                <li>
                    <strong>编组信息</strong>
                    <div class="diaMain">
                        {{tmp.xinxi}}
                    </div>
                </li>
                <li>
                    <strong>开行对数</strong>
                    <div class="diaMain">
                        <el-select v-model="value2" placeholder="请选择">
                            <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
                <el-button type="primary" @click="ph('修改成功！'),dialogVisible = false" size="medium">确 定</el-button>
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
            dialogVisible:false,
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
            }],
            tmp:[],
            options:[{
                value: '选项1',
                label: '3号航站楼-东直门'
                }, {
                value: '选项2',
                label: '2号航站楼-东直门'
            }],
            options1:[{
                value: '选项1',
                label: '无'
                }, {
                value: '选项2',
                label: '三元桥'
            }],
            options2:[{
                value: '选项1',
                label: '15对'
                }, {
                value: '选项2',
                label: '20对'
            }],
            value:'选项1',
            value1:'选项1',
            value2:'选项1',
        }
    },
    created () {
        
    },
    computed: {
        
    },
    mounted(){
        
    },
    methods:{
        ph(msg){
            this.$message({
                type: 'success',
                message: msg
            });
        },
        edit(data){
            this.tmp = JSON.parse(JSON.stringify(data))
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
.drawrunning h3{padding: 15px 0;color: #fff;font-weight: bold;}
.drawrunning .el-row{padding: 10px 20px;}
.drawEdit ul{width: 400px;margin: 0 auto;text-align: left;}
.drawEdit ul li{width: 100%;display: block;height: 40px;line-height: 40px;margin-bottom: 20px;}
.drawEdit ul li strong{float: left;width: 120px;font-size: 16px;font-weight: bold;}
.drawEdit ul li .diaMain{float: left;width: 200px;}
</style>