<template>
    <div class="function submainnew">
        <div class="grid-content">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>系统功能</span>
                            <p></p>
                        </div>
                        <div class="item">
                            <img src="../../assets/new/img12.png"/>
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
    name: "function",
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
