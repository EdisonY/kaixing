<template>
    <div class="soldier submainnew">
        <el-row :gutter="10">
            <el-col :span="16">
                <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>单兵画面</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <img src="../../assets/new/img6.png"/>
                        </div>
                    </el-card>

                </div>

                <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>实时位置</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <img src="../../assets/new/img7.png"/>
                        </div>
                    </el-card>

                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>记录</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <el-timeline class="time">
                                <el-timeline-item
                                v-for="(activity, index) in activities"
                                :key="index"
                                :timestamp="activity.timestamp">
                                {{activity.content}}
                                </el-timeline-item>
                            </el-timeline>
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
    name: "soldier",
    data(){
        return{
            activities: [{
                content: '7号线北京西站道岔P09202故障 维修时间10分钟 检修人员 - 张三',
                timestamp: '2018-04-15'
                }, {
                content: '7号线北京西站道岔P09202故障 正在检修 检修人员 - 张三',
                timestamp: '2018-04-13'
                }, {
                content: '7号线北京西站道岔P09202故障',
                timestamp: '2018-04-11'
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
.soldier .time{padding: 20px;color: #fff;}
.soldier .time .el-timeline-item__content{color: #ffd04b;}
</style>
