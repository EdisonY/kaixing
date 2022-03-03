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
            <!-- <el-col :span="3">
                <div class="grid-content bg-purple-dark">
                    <h3>分时最大断面客流</h3>
                    <el-button type="primary">客流加载</el-button>
                </div>
            </el-col>
            <el-col :span="21">
                <div class="grid-content bg-purple-dark">
                    <div class="yl">
                        <iframe frameborder="0" width="100%" height="300" src="http://172.51.216.61:8011/seabed/preview/f2d12fd36204481a8af5f3b1f3ab4a54"></iframe>
                    </div>
                </div>
            </el-col> -->
            <div class="yl">
                <iframe frameborder="0" width="100%" height="300" src="http://172.51.216.61:8011/seabed/preview/f2d12fd36204481a8af5f3b1f3ab4a54"></iframe>
            </div>
        </el-row>
        <el-row>
            <h3>TOP信息</h3>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div class="yl">
                        <iframe frameborder="0" width="100%" height="300" src="http://172.51.216.61:8011/seabed/preview/0cc0a57ec0f648c88120827b762b2fcf"></iframe>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <div class="yl">
                        <iframe frameborder="0" width="100%" height="300" src="http://172.51.216.61:8011/seabed/preview/d0899ec7fb054de6b72b5ced886e714e"></iframe>
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
</style>