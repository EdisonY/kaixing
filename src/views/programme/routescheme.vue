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
            <!-- <el-col :span="3" style="text-align:center;">
                <h3>客流信息</h3>
                <el-button type="primary">客流加载</el-button>
            </el-col>
            <el-col :span="7">
                <div class="yl">断面客流预留</div>
            </el-col> -->
            <el-col :span="10">
                <div class="yl">
                    <iframe frameborder="0" width="100%" height="300" src="http://172.51.216.61:8011/seabed/preview/70986fa19c404915accccfef982c9ce0"></iframe>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="yl">
                    <iframe frameborder="0" width="100%" height="300" src="http://172.51.216.61:8011/seabed/preview/130263dd57a6419fb41e94a72bc14586"></iframe>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="yl">
                    <iframe frameborder="0" width="100%" height="300" src="http://172.51.216.61:8011/seabed/preview/dc7cc8eeeb3b451293a227733723271e"></iframe>
                </div>
            </el-col>
        </el-row>
         <el-row>
            <el-col :span="3" style="text-align:center;padding-top:15px">
                <h3>交路方案选择</h3>
            </el-col>
            <el-col :span="21" style="text-align:right;padding-top:15px;">
                <el-button size="medium" @click="sc('历史交路铺设方式查询成功！')">历史交路铺设方式</el-button>
            </el-col>
        </el-row>
        <div class="chose">
            <el-table
            :data="tableData"
            border
            style="width: 100%">
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
                <el-table-column
                    fixed="right"
                    label="操作"
                    align="center"
                    width="200">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
                        <el-button @click="open()" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="margin: 0 0 0 20px">
            <el-button @click="addTime()">添加条数</el-button>
            <el-button @click="sc('开行方案生成成功')" type="primary">生成开行方案</el-button>
            <el-button type="primary">导入历史方案</el-button>
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
        <el-dialog
        title="选择交路方案详情"
        :visible.sync="dialogVisible1"
        width="40%"
        class="detailDia"
        :before-close="handleClose">
            <el-table
                ref="singleTable"
                :data="detailsData"
                highlight-current-row
                border
                @current-change="handleCurrentChange"
                style="width: 100%">
                <el-table-column
                property="date"
                label="方案单选"
                align="center"
                width="100">
                </el-table-column>
                <el-table-column
                property="name"
                label="序号"
                align="center"
                width="50">
                </el-table-column>
                <el-table-column
                property="address"
                align="center"
                label="交路选择">
                </el-table-column>
                <el-table-column
                property="station"
                align="center"
                label="跳停车站">
                </el-table-column>
                <el-table-column
                property="message"
                align="center"
                label="编组信息">
                </el-table-column>
                <el-table-column
                property="bili"
                align="center"
                label="交路比例">
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
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
            dialogVisible1:false,
            tableData: [{
                id: '05:00:00 - 07:00:00',
                name: '交路1：3号航站楼-东直门 跳停车站：无 编组信息：4L 交路比例：无',
            }, {
                id: '07:00:00 - 09:00:00',
                name: '交路1：3号航站楼-东直门 跳停车站：无 编组信息：4L 交路比例：无',
            }, {
                id: '09:00:00 - 11:00:00',
                name: '交路1：3号航站楼-东直门 跳停车站：无 编组信息：4L 交路比例：无',
            }],
            detailsData:[{
                date:'方案一',
                name:'1',
                address:'3号航站楼-东直门',
                station:'无',
                message:'4L',
                bili:'无'
            },{
                date:'方案二',
                name:'1',
                address:'3号航站楼-东直门',
                station:'无',
                message:'4L',
                bili:'无'
            },{
                date:'方案三',
                name:'1',
                address:'3号航站楼-东直门',
                station:'无',
                message:'4L',
                bili:'无'
            },{
                date:'方案一',
                name:'1',
                address:'3号航站楼-东直门',
                station:'无',
                message:'4L',
                bili:'无'
            }],
            currentRow: null
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
            this.dialogVisible1 = false
        },
        handleClick(){
            this.dialogVisible1 = true
        },
        setCurrent(row) {
            this.$refs.singleTable.setCurrentRow(row);
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        open() {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        sc(msg){
            this.$message({
                type: 'success',
                message: msg
            });
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
.el-table tr{cursor:pointer}
.detailDia .el-table th.is-leaf{background: #409eff;color: #fff;}
.detailDia .el-table__body tr.current-row>td{background: #fed24b;}
</style>