<template>
    <div class="people submainnew">
        <el-row :gutter="10">
            <el-col :span="14">
                <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>人员列表</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <el-table
                            :data="tableData"
                            style="width: 100%">
                                <el-table-column
                                    prop="gangwei"
                                    label="岗位">
                                </el-table-column>
                                <el-table-column
                                    prop="weizhi"
                                    label="位置">
                                </el-table-column>
                                <el-table-column
                                    prop="yingji"
                                    label="应急工作">
                                </el-table-column>
                                <el-table-column
                                    prop="lianxi"
                                    label="联系方式">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>

                </div>
                <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>专家信息</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <el-table
                            :data="tableData"
                            style="width: 100%">
                                <el-table-column
                                    prop="xingming"
                                    label="姓名">
                                </el-table-column>
                                <el-table-column
                                    prop="zhuanye"
                                    label="专业领域">
                                </el-table-column>
                                <el-table-column
                                    prop="lianxi"
                                    label="联系方式">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>

                </div>
            </el-col>
            <el-col :span="10">
                <div class="grid-content">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>应急</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <el-table
                            :data="tableData"
                            style="width: 100%">
                                <el-table-column
                                    prop="wupin"
                                    label="物品">
                                </el-table-column>
                                <el-table-column
                                    prop="weizhi"
                                    label="位置">
                                </el-table-column>
                                <el-table-column
                                    prop="shualiang"
                                    label="数量">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>

                </div>
            </el-col>
        </el-row>

        

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
    name: "people",
    data(){
        return{
            tableData: [{
                gangwei:'值班站长',
                weizhi:'进站区1号',
                yingji:'全面负责车站工作',
                lianxi:'固定电话',
                xingming:'张三',
                zhuanye:'应急维修',
                wupin:'应急沙袋',
                shuliang:20
            }, {
                gangwei:'值班站长',
                weizhi:'进站区1号',
                yingji:'全面负责车站工作',
                lianxi:'固定电话',
                xingming:'张三',
                zhuanye:'应急维修',
                wupin:'应急沙袋',
                shuliang:20
            }, {
                gangwei:'值班站长',
                weizhi:'进站区1号',
                yingji:'全面负责车站工作',
                lianxi:'固定电话',
                xingming:'张三',
                zhuanye:'应急维修',
                wupin:'应急沙袋',
                shuliang:20
            }, {
                gangwei:'值班站长',
                weizhi:'进站区1号',
                yingji:'全面负责车站工作',
                lianxi:'固定电话',
                xingming:'张三',
                zhuanye:'应急维修',
                wupin:'应急沙袋',
                shuliang:20
            }, {
                gangwei:'值班站长',
                weizhi:'进站区1号',
                yingji:'全面负责车站工作',
                lianxi:'固定电话',
                xingming:'张三',
                zhuanye:'应急维修',
                wupin:'应急沙袋',
                shuliang:20
            }, {
                gangwei:'值班站长',
                weizhi:'进站区1号',
                yingji:'全面负责车站工作',
                lianxi:'固定电话',
                xingming:'张三',
                zhuanye:'应急维修',
                wupin:'应急沙袋',
                shuliang:20
            }, {
                gangwei:'值班站长',
                weizhi:'进站区1号',
                yingji:'全面负责车站工作',
                lianxi:'固定电话',
                xingming:'张三',
                zhuanye:'应急维修',
                wupin:'应急沙袋',
                shuliang:20
            }, {
                gangwei:'值班站长',
                weizhi:'进站区1号',
                yingji:'全面负责车站工作',
                lianxi:'固定电话',
                xingming:'张三',
                zhuanye:'应急维修',
                wupin:'应急沙袋',
                shuliang:20
            }, {
                gangwei:'值班站长',
                weizhi:'进站区1号',
                yingji:'全面负责车站工作',
                lianxi:'固定电话',
                xingming:'张三',
                zhuanye:'应急维修',
                wupin:'应急沙袋',
                shuliang:20
            }, {
                gangwei:'值班站长',
                weizhi:'进站区1号',
                yingji:'全面负责车站工作',
                lianxi:'固定电话',
                xingming:'张三',
                zhuanye:'应急维修',
                wupin:'应急沙袋',
                shuliang:20
            }, {
                gangwei:'值班站长',
                weizhi:'进站区1号',
                yingji:'全面负责车站工作',
                lianxi:'固定电话',
                xingming:'张三',
                zhuanye:'应急维修',
                wupin:'应急沙袋',
                shuliang:20
            }, {
                gangwei:'值班站长',
                weizhi:'进站区1号',
                yingji:'全面负责车站工作',
                lianxi:'固定电话',
                xingming:'张三',
                zhuanye:'应急维修',
                wupin:'应急沙袋',
                shuliang:20
            }, ]
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
.passengerflow .el-card{height:calc((100vh - 110px) / 3)}
</style>
