<template>
    <el-dialog
        class="innerDetail cheme plan warn"
        :title="eme"
        width="30%"
        :append-to-body="true"
        :visible.sync="showeme">
        <div class="content">
            <!-- <h4>大客流</h4> -->
            <el-card style="margin-bottom:40px">
                <p v-if="emeconfirmData.alarmInfo.alarmSite && emeconfirmData.alarmTypeDetailStr">在{{emeconfirmData.alarmInfo.alarmSite}}发生{{emeconfirmData.alarmTypeDetailStr}}</p>
                <p v-else> 无数据</p>
            </el-card>
            <div class="btn">
                <el-button type="primary" size="small" @click="showeme = false">确认</el-button>
                <el-button type="danger" size="small" @click="showeme = false">关闭</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import stroe from '../store/index'
export default{
    data () {
        return {
          showeme:false,
          emeconfirmData:{
              alarmInfo:{alarmSite:'默认'},
              alarmTypeDetailStr:'默认'
          },
          eme:''
        }
    },
    watch: {
    emeconfirmState:function name(newV,oldV) {
            this.emeconfirmData = newV.msg
            // if(newV.msg.noticeCode == 0){
            //     this.$EventBus.$emit('reload')
            // }else{
            //     this.warn = true
            // }
            this.showeme =true
        }
    },
    computed: {
       emeconfirmState () {
            return this.$store.state.springboard.emeconfirm
        }
    },
    mounted () {
        this.$EventBus.$on('showeme',()=>{
            this.showeme = true
        }),
         this.$EventBus.$on('geteme',(msg)=>{
            this.eme = msg
        })   
    },
    methods:{
        
    }
}
</script>

<style scoped>
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
