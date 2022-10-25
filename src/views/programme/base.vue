<template>
    <div class="base">
        <el-row>
            <el-col :span="24">
                <div class="subwayLine">
                    <img src="@/assets/line.png" />
                </div>
            </el-col>
        </el-row>
        <el-row style="text-align:center;">
            <div class="yl">
                <iframe frameborder="0" width="100%" height="700" src="http://frp.funenc.xyz:7245/link/oTcnnEFV"></iframe>
            </div>
        </el-row>
    </div>
</template>

<script>


export default {
    name: 'index',
    components:{
    },
    data () {
        return {
            
        }
    },
    created () {
        
    },
    computed: {
        
    },
    mounted(){
        
    },
    methods:{
        
    },
    destroyed() {
    }
}
</script>

<style>
.subwayLine img{width: 100%;}
.base h3{padding: 0 0 15px 0;color: #fff;font-weight: bold;}
.base .el-row{padding: 10px 20px;}
.test{
    transform: scale(1.4);
    transform-origin:0 0;
}
</style>