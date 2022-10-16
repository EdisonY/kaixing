<template>
    <div class="base">
        <el-row>
            <el-col :span="24">
                <div class="subwayLine">
                    <img src="@/assets/line.png" />
                </div>
            </el-col>
        </el-row>
        <el-row style="text-align:center;border-bottom:3px solid #ccc">
            <div class="yl">
                <iframe frameborder="0" width="100%" height="350" src="http://172.51.216.61:8011/seabed/preview/f89a88e9711445feb279e0a58cc481a3"></iframe>
            </div>
        </el-row>
        <el-row>
            <h3>TOP信息</h3>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div class="yl">
                        <iframe class="test" frameborder="0" width="100%" height="350" src="http://172.51.216.61:8011/seabed/preview/8831f9d1e7da43ca84d8223a6530085f"></iframe>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <div class="yl">
                        <iframe class="test" frameborder="0" width="100%" height="350" src="http://172.51.216.61:8011/seabed/preview/ae38325cfc2f42cda33c95f454eec0c0"></iframe>
                    </div>
                </div>
            </el-col>
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