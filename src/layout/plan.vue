<template>
    <el-dialog
        class="innerDetail cheme plan"
        title="运行图方案选择"
        width="30%"
        :append-to-body="true"
        :visible.sync="innerDrawer1"
        >
        <div class="content">
            <el-card>
                <h4>{{innerData.alarmTypeDetailStr}}</h4>
                <p>{{innerData.orderNum}}次列车（车组号:{{innerData.trainId}}）在{{innerData.alarmSite}}发生{{innerData.alarmTypeDetailStr}}</p>
            </el-card>
            <el-card style="margin-bottom:40px">
                <h4>方案选择</h4>
                <div v-if="plan.admRunGraphCases"> <el-radio v-for="(item,index) in plan.admRunGraphCases" :key="index" v-model="radio1" :label="item.caseCode" border>
                    <!-- <span v-for="(item,index) in item.adjustStatisticalDatas" :key="index">
                        {{item.adjustStatisticalDatas[index].name}} : {{item.adjustStatisticalDatas[index].trianNumbers[0]}}
                    </span> -->
                    {{item.adjustStatisticalDatas[0].name}} : {{item.adjustStatisticalDatas[0].trianNumbers[0]}}
                    </el-radio></div>
               <!-- <div v-else> 
                  <el-radio v-for="(item,index) in innerData.admRunGraphCases" :key="index" v-model="radio1" :label="item.caseCode" border>
                   {{item.adjustStatisticalDatas[0].name}} : {{item.adjustStatisticalDatas[0].trianNumbers[0]}}
                   </el-radio></div> -->
                       <div v-else> 
                  <el-radio v-for="(item3,index3) in innerData.admRunGraphCases" :key="index3" v-model="radio1" :label="item3.caseCode" border>
               <span v-for="(item4,index4) in item3.adjustStatisticalDatas" :key="index4">
                        {{item4.name}} : {{item4.trianNumbers[0]}}
                    </span>
                   </el-radio></div>
            </el-card>
            <div class="btn">
                <el-button type="primary" size="small" @click="solve(0)">预览</el-button>
                <el-button type="success" size="small" @click="solve(1)"  v-if="innerData.btnStatusShow === undefined || innerData.btnStatusShow == 1">执行</el-button>
                <el-button type="danger" size="small" @click="innerDrawer1 = false">关闭</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import stroe from '../store/index'
export default{
    data () {
        return {
            innerDrawer1:false,
            innerData:{},
            radio1:1,
            plan:{},
        }
    },
    watch: {
        modulesAState:function name(newV,oldV) {
            this.innerData = newV.msg
        },
        planState:function name(newV,oldV) {
            this.plan = newV.msg.data
            this.innerDrawer1 = true
        }
    },
    computed: {
        modulesAState () {
            return this.$store.state.springboard.scheme
        },
        planState(){
            return this.$store.state.springboard.plan
        }
    },
    mounted () {
        this.$EventBus.$on('showPlan',(item)=>{
            console.log('应急打开的plan',item);
            this.innerData = item.resData
            this.innerData.btnStatusShow = item.buttonStatus
            this.innerDrawer1 = true
        })  
         this.$EventBus.$on('closePlan',()=>{
           this.innerDrawer1 = false
        })  
    },
    methods:{
        solve(state){
            var self = this
            var alarmInfo = {
                "alarmSite": this.plan.alarmSite,
                "orderNum": this.plan.orderNum,
                "trainId": this.plan.trainId,
                "tableInfoId": this.plan.tableInfoId,
                "alarmTypeDetailStr": this.plan.alarmTypeDetailStr,
                "alarmType": this.plan.alarmType,
            }//之前传的数据
            var alarmInfo1 = {
                "tableInfoId": this.plan.tableInfoId? this.plan.tableInfoId:this.innerData.tableInfoId,
                "executeStep":this.innerData.executeStep,
                "caseCode":this.radio1
            }
            if(state){
                //执行
                if(!this.plan.admRunGraphCases){
                this.$api.post('/api/iids-flat-adm/runGraph/confirm',alarmInfo1).then(res => {
                    if(res.success){
                        self.$notify.success({
                            title: '执行成功',
                            message: res.message
                        });
                        self.innerDrawer1 = false
                        self.$EventBus.$emit('reload')
                        self.$router.push({ path: 'emergency' })
                    }
                })
                }else{
                this.$api.post('/api/iids-flat-adm/runGraph/confirm',alarmInfo1).then(res => {
                    if(res.success){
                        self.$notify.success({
                            title: '执行成功',
                            message: res.message
                        });
                        self.innerDrawer1 = false
                        self.$EventBus.$emit('reload')
                        self.$router.push({ path: 'emergency' })
                    }
                })
                }    
            }else{
                //预览       
                this.$api.post('/api/iids-flat-adm/web/trainGraph',alarmInfo1).then(res => {
                    if(res.success){
                        console.log('运行图数据',res.data);
                        this.getStation()
                        
                        this.$EventBus.$emit('getconfirmInfo',alarmInfo1)
                        this.$EventBus.$emit('getShow',(this.innerData.btnStatusShow != undefined ? this.innerData.btnStatusShow:1) )
                        stroe.dispatch("springboard/getRunData", Math.random());
                        // self.innerDrawer1 = false
                        window.sessionStorage.setItem('rungrap',JSON.stringify(res.data.trains))
                        sessionStorage.setItem("rungrap", JSON.stringify(res.data.trains));
                        // self.$refs.grap.initData()
                        // self.$router.push({ path: 'emergency' })

                    }
                })
            }

            
        },
        getStation(){
          this.$api.post('/api/iids-flat-adm/web/trainGraph/station').then(res1 => {
            if(res1.success){
                    res1.data = Array.from(res1.data)
                    localStorage.setItem('myStation',JSON.stringify(res1.data))
                    }
                })                  
        }
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
</style>
