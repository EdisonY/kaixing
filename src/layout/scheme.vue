<template>
    <el-dialog
        class="innerDetail cheme"
        title="辅助解决方案"
        width="30%"
        :append-to-body="true"
        @close="close"
        :visible.sync="innerDrawer">
        <div class="content">
            <el-card>
                <h4>{{innerData.alarmTypeDetailStr}}</h4>
                <p>{{innerData.orderNum}}次列车（车组号:{{innerData.trainId}}）在{{innerData.alarmSite}}发生{{innerData.alarmTypeDetailStr}}</p>
            </el-card>
            <el-card>
                <h4>处置详情</h4>
                <p v-for="(item,index) in innerData.dispose">{{index+1}}.{{item}}</p>
            </el-card>
            <!-- <el-alert v-if="innerData.status == '方案已执行'" :title="innerData.status" type="success" show-icon :closable="false"></el-alert>
            <el-alert v-else-if="innerData.status == '方案待执行'" :title="innerData.status" type="info" show-icon :closable="false"></el-alert>
            <el-alert v-else-if="innerData.status == '方案已放弃'" :title="innerData.status" type="error" show-icon :closable="false"></el-alert> -->
            <p><strong>{{second}}</strong>秒后自动关闭</p>        
            <div class="btn">
                <el-button type="danger" size="small" @click="solve(1)">放弃</el-button>
                <el-button type="success" size="small" @click="solve(0)">执行</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import stroe from '../store/index'
export default{
    data () {
        return {
            innerDrawer:false,
            innerData:{},
            alarmInfo:{},
            second:30,
            countdown:null
        }
    },
    watch: {
        modulesAState:function name(newV,oldV) {
            console.log('辅助方案',newV);
            
            var self = this

            this.innerData = newV.msg
            this.innerDrawer = true
            
            this.second = 30
            this.countdown = setInterval(() => {
                self.second--
                if(self.second == 0){
                    self.innerDrawer = false
                    clearInterval(this.countdown)
                }
            }, 1000);
        },
        case:function name(newV,oldV) {
            this.alarmInfo = newV.msg
        },
    },
    computed: {
        modulesAState () {
            return this.$store.state.springboard.scheme
        },
        case () {
            return this.$store.state.springboard.case
        }
    },
    methods:{
        solve(state){
            var self = this

            var updatState = {
                // boxId:self.innerData.boxId,
                infoId:self.innerData.tableInfoId,
                tag:state != 1 ? self.innerData.alarmState : 0
            }
            self.$api.post2('/api/iids-flat-adm/alert_detail_box/update_status',updatState).then(res => {
                if(res.success){
                    self.$notify.success({
                        title: '更新成功',
                        message: res.message
                    });
                    self.$EventBus.$emit('reload')
                }else{
                    // self.$notify.error({
                    //     title: '错误',
                    //     message: res.message
                    // }); 
                }
                self.innerDrawer = false
            })
            this.$EventBus.$emit('reload')
            if(state){
                //放弃
                var auxiliaryDecision = {
                    "tag":0,
                    "alarmTypeDetail": this.innerData.alarmTypeDetail >9999 ? parseInt(this.innerData.alarmTypeDetail/100) : this.innerData.alarmTypeDetail,
                    "executeStep": this.innerData.alarmTypeDetail > 9999 ? -99 : 0,
                    "tableInfoId":this.innerData.tableInfoId,
                    "vId": this.innerData.vid,
                    "stepList":this.innerData.dispose,
                    "aidDesSubStepDtoList":this.innerData.aidDesSubStepDtoList
                }
                this.$api.post('/api/iids-flat-adm/aid_decision/execute',auxiliaryDecision).then(res => {
                    self.$EventBus.$emit('reload')
                    // if(res.success){
                    //     self.$api.post('/api/iids-flat-adm/runGraph/case',{'tableInfoId':self.innerData.tableInfoId}).then(res => {
                    //         if(res.data && res.data.length > 1){
                    //             stroe.dispatch("springboard/getPlanData", res.data);
                    //             self.drawer = false
                    //             updatState(0)
                    //         }else{
                    //             self.$notify.error({
                    //                 title: '错误',
                    //                 message: res.message
                    //             });
                    //         }
                    //     })
                    // }else{
                    //     self.$notify.error({
                    //         title: '错误',
                    //         message: res.message
                    //     });
                    // }
                })
            }else{
                //执行
                var auxiliaryDecision = {
                    "tag":this.innerData.alarmState,
                    "alarmTypeDetail": this.innerData.alarmTypeDetail,
                    "executeStep": this.innerData.executeStep,
                    "tableInfoId":this.innerData.tableInfoId,
                    "vId": this.innerData.vid,
                    "stepList":this.innerData.dispose,
                    "aidDesSubStepDtoList":this.innerData.aidDesSubStepDtoList
                }
                this.$api.post('/api/iids-flat-adm/aid_decision/execute',auxiliaryDecision).then(res => {
                    self.$EventBus.$emit('reload')
                    // if(res.success){
                    //     self.$api.post('/api/iids-flat-adm/runGraph/case',{'tableInfoId':self.innerData.tableInfoId}).then(res => {
                    //         if(res.data && res.data.length > 1){
                    //             stroe.dispatch("springboard/getPlanData", res.data);
                    //             self.drawer = false
                    //             updatState(1)
                    //         }else{
                    //             self.$notify.error({
                    //                 title: '错误',
                    //                 message: res.message
                    //             });
                    //         }
                    //     })
                    // }else{
                    //     self.$notify.error({
                    //         title: '错误',
                    //         message: res.message
                    //     });
                    // }
                })
            }
            function updatState(index){
                var updatState = {
                    // boxId:self.innerData.boxId,
                    infoId:self.innerData.tableInfoId,
                    tag:index == 1 ? self.innerData.alarmState : 0
                }
                self.$api.post('/api/iids-flat-adm/alert_detail_box/update_status',updatState).then(res => {
                    if(res.success){
                        self.$notify.success({
                            title: '更新成功',
                            message: res.message
                        });
                        self.$EventBus.$emit('reload')
                    }else{
                    //    self.$notify.error({
                    //         title: '错误',
                    //         message: res.message
                    //     }); 
                    }
                })
            }

        },
        close(){
            this.innerDrawer = false
            clearInterval(this.countdown)
            this.countdown =  null
        }
    }
}
</script>

<style lang="scss" scoped>
// .cheme{z-index: 2011 !important}
.cheme .content{padding:20px 0 0 0;}
.cheme .el-dialog__body{padding-bottom: 0 !important;position: relative;}
.cheme .el-card{margin-bottom: 20px;}
.cheme .btn{position: absolute;right:20px;bottom:20px}
.cheme p strong{color: red;font-weight: bold;}
</style>
