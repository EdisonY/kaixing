<template>
    <div class="comprehensive submainnew">
        <el-row :gutter="10">
            <el-col :span="6">
                <div class="grid-content">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>asdasd</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <div class="echarts" ref="echart"></div>
                        </div>
                    </el-card>

                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>asdasd</span>
                            <p></p>
                        </div>
                        <div class="item">

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
    name: "comprehensive",
    data(){
        return{

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
