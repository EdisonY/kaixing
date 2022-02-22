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
            <el-col :span="3">
                <div class="grid-content bg-purple-dark">
                    <h3>分时最大断面客流</h3>
                    <el-button type="primary">客流加载</el-button>
                </div>
            </el-col>
            <el-col :span="21">
                <div class="grid-content bg-purple-dark">
                    <div class="yl">断面客流预留</div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <h3>TOP信息</h3>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div class="yl">断面客流预留</div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <div class="yl">断面客流预留</div>
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