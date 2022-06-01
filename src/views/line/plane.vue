<template>
    <div class="plane submainnew">
        <div class="grid-content">

                    <img src="../../assets/new/img3.png" />

                </div>

        

    </div>
</template>

<script>

export default {
    name: "plane",
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
