<template>
    <div class="cctv marshalling">
        <el-card class="search">
            <el-select v-model="value" placeholder="编组类型">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="value" placeholder="车站">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="value" placeholder="上下行">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" size="small">搜索</el-button>
            
        </el-card>
        <el-card class="table">
            <el-button type="success" size="small" class="newGroup" @click="showEdit()">新增编组</el-button>
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="name"
                align="center"
                label="名称">
                </el-table-column>
                <el-table-column
                prop="type"
                align="center"
                label="类型">
                </el-table-column>
                <el-table-column
                prop="station"
                align="center"
                label="车站">
                </el-table-column>
                <el-table-column
                prop="updown"
                align="center"
                label="上下行">
                </el-table-column>
                <el-table-column
                    prop="id"
                    align="center"
                    label="摄像头ID">
                    <template slot-scope="scope">
                        <el-tag v-for="item in scope.row.id">{{item}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="操作">
                    <template slot-scope="scope">
                        <router-link to="/cctv/preview">
                            <el-button type="primary" size="small">预览</el-button>
                        </router-link>
                        <el-button type="warning" size="small" @click="showEdit()">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog
            class="groupDia"
            title="CCTV编组"
            :visible.sync="dialogVisible"
            width="40%"
            :before-close="handleClose">
            <ul>
                <li>
                    <strong>名称</strong>
                    <div class="mainDiv">
                        <el-input v-model="input" placeholder="请输入内容" class="shortInput"></el-input>
                    </div>
                </li>
                <li>
                    <strong>类型</strong>
                    <div class="mainDiv">
                        <el-input v-model="input" placeholder="请输入内容" class="shortInput"></el-input>
                    </div>
                </li>
                <li>
                    <strong>车站</strong>
                    <div class="mainDiv">
                        <el-input v-model="input" placeholder="请输入内容" class="shortInput"></el-input>
                    </div>
                </li>
                <li>
                    <strong>上下行</strong>
                    <div class="mainDiv">
                        <el-input v-model="input" placeholder="请输入内容" class="shortInput"></el-input>
                    </div>
                </li>
                <li>
                    <strong>摄像头</strong>
                    <div class="mainDiv">
                        <el-transfer v-model="value1" :data="data" :titles="['全部', '已选定']"></el-transfer>
                    </div>
                </li>
            </ul>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
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
        const generateData = _ => {
            const data = [];
            for (let i = 1; i <= 15; i++) {
                data.push({
                    key: i,
                    label: `摄像头 ${ i }`
                });
            }
            return data;
        };
        return {
            data: generateData(),
            value1: [1, 4],
            dialogVisible:false,
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            value: '',
            tableData: [{
                name: '火灾预警',
                type:'火灾',
                station:'新宫',
                updown:'上行',
                id:[1,4,5,6],
            }, {
                name: '火灾预警',
                type:'火灾',
                station:'新宫',
                updown:'上行',
                id:[1,4,5,6],
            }, {
                name: '火灾预警',
                type:'火灾',
                station:'新宫',
                updown:'上行',
                id:[1,4,5,6],
            }, {
                name: '火灾预警',
                type:'火灾',
                station:'新宫',
                updown:'上行',
                id:[1,4,5,6],
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
         showEdit(){
             this.dialogVisible = true
         }
    },
    destroyed() {
    }
}
</script>

<style>
.cctv{height:calc(100vh - 60px);padding: 20px;}
.cctv h1{margin: 0;padding-bottom: 20px;}
.cctv .newGroup{float: right;margin-bottom: 20px;}
.cctv .search{margin-bottom: 20px;}
.cctv .el-tag{margin: 0 2px;}
.cctv .table{height: calc(100vh - 200px);}
.groupDia ul{padding-bottom: 20px;width: 100%;float: left;}
.groupDia ul li{padding-bottom: 10px;width: 100%;min-height: 32px;box-sizing: content-box;}
.groupDia ul li strong{float: left;line-height: 32px;margin-right: 10px;width: 80px;text-align: right;font-weight: bold;}
.groupDia ul li .mainDiv{float: left;width: 600px;}
.groupDia ul li .mainDiv .shortInput{width: 300px;}
.cctv .el-table__header-wrapper .cell{font-weight: bold;color: #555;}
</style>