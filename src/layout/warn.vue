<template>
    <el-dialog
        class="innerDetail cheme plan warn"
        title="运行图方案选择"
        width="30%"
        :append-to-body="true"
        :visible.sync="warn">
        <div class="content">
            <!-- <h4>大客流</h4> -->
            <el-card style="margin-bottom:40px">
                <p>{{warnData}}</p>
            </el-card>
            <div class="btn">
                <!-- <el-button type="primary" size="small" @click="solve(0)">确认</el-button>
                <el-button type="success" size="small" @click="solve(1)">取消</el-button> -->
                <el-button type="danger" size="small" @click="warn = false">关闭</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import stroe from '../store/index'
export default{
    data () {
        return {
            warn:false,
            warnData:{}
        }
    },
    watch: {
        warnAState:function name(newV,oldV) {
            this.warnData = newV.msg
            if(newV.msg.noticeCode == 0){
                this.$EventBus.$emit('reload')
            }else{
                this.warn = true
            }
            
        }
    },
    computed: {
        warnAState () {
            return this.$store.state.springboard.warn
        }
    },
    mounted () {
        this.$EventBus.$on('showPlan',()=>{
            this.innerDrawer1 = true
        })  
    },
    methods:{
    }
}
</script>

<style lang="scss" scoped>
.cheme .content{padding:20px 0 0 0;}
.cheme .el-dialog__body{padding-bottom: 0 !important;position: relative;}
.cheme .el-card{margin-bottom: 20px;}
.cheme .btn{position: absolute;right:20px;bottom:20px}
.cheme p strong{color: red;font-weight: bold;}
.plan .el-card__body label{width: 100%;margin-bottom: 10px;}
.plan .el-card__body .el-radio.is-bordered+.el-radio.is-bordered{margin: 0;}
.warn{z-index: 2011 !important;}
.warn h4{font-size: 25px;padding: 10px 0;}
</style>
