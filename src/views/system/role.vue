<template>
    <div class="role submainnew">

        <div class="grid-content">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>信息发布</span>
                    <p>
                        <el-button type="success" size="small">添加</el-button>
                        <el-button type="info" size="small">编辑</el-button>
                        <el-button type="danger" size="small">删除</el-button>
                    </p>
                </div>
                <div class="item">
                    <el-table
                    :data="tableData"
                    style="width: 100%">
                        <el-table-column
                            prop="id"
                            label="用户ID">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="用户名称">
                        </el-table-column>
                        <el-table-column
                            prop="youxiang"
                            label="邮箱">
                        </el-table-column>
                        <el-table-column
                            prop="lianxi"
                            label="联系方式">
                        </el-table-column>
                        <el-table-column
                            prop="bumen"
                            label="部门">
                        </el-table-column>
                        <el-table-column
                            prop="zhiwei"
                            label="职位">
                        </el-table-column>
                        <el-table-column
                            prop="guanli"
                            label="管理员">
                        </el-table-column>
                        <el-table-column
                            prop="quanxian"
                            label="权限">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template slot-scope="scope">
                                <el-button type="success" size="small">确认</el-button>
                                <el-button type="danger" size="small">删除</el-button>
                            </template>
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
    name: "role",
    data(){
        return{
            tableData: [{
                id:'1',
                name:'王多余',
                youxiang:'morefish@164.com',
                lianxi:'2315665',
                bumen:'总调',
                zhiwei:'主任',
                guanli:'张宏',
                quanxian:'全部'
            },{
                id:'2',
                name:'张朝阳',
                youxiang:'cy@164.com',
                lianxi:'2315665',
                bumen:'总调',
                zhiwei:'职员',
                guanli:'张宏',
                quanxian:'全部'
            },{
                id:'3',
                name:'李斯特',
                youxiang:'list@164.com',
                lianxi:'2315665',
                bumen:'总调',
                zhiwei:'职员',
                guanli:'张宏',
                quanxian:'全部'
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
</style>
