<template>
    <div class="management submainnew">
        <el-row :gutter="10">
            <el-col :span="10">
                <div class="grid-content">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>视频会商</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <img src="../../assets/new/img4.png" />
                        </div>
                    </el-card>

                </div>
            </el-col>
            <el-col :span="14">
                <div class="grid-content grid-content-4">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>CCTV</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <img src="../../assets/new/img5.png" />
                        </div>
                    </el-card>

                </div>
                <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>人物及物资调配</span>
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
                <div class="grid-content grid-content-4">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>方案发布</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <ul>
                                <li>
                                    <el-button type="primary" size="small">停运方案</el-button>
                                    01002次车停运
                                </li>
                                <li>
                                    <el-button type="primary" size="small">封站方案</el-button>
                                    北京西站封站
                                </li>
                                <li>
                                    <el-button type="primary" size="small">跳停方案</el-button>
                                    01002次车在北京西站通过不停车
                                </li>
                            </ul>
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
    name: "management",
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
.management ul li{padding: 0 0 5px 10px;}
</style>
