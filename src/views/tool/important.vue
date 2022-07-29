<template>
    <div class="important submainnew">
         <img src="../../assets/new/img13.png"/>
        <!-- <el-row :gutter="10">
            <el-col :span="10">
                <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>活动位置</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <img src="../../assets/new/img8.png"/>
                        </div>
                    </el-card>

                </div>
                <div class="grid-content grid-content-2">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>天气预报</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <img src="../../assets/new/img9.png"/>
                        </div>
                    </el-card>

                </div>
            </el-col>
            <el-col :span="14">
                <div class="grid-content">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>预知重要活动</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <img src="../../assets/new/img10.png"/>
                        </div>
                    </el-card>

                </div>
            </el-col>
        </el-row> -->

        

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
    name: "important",
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
