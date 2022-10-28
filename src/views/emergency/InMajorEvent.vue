<template>
    <div class="page">
        <el-row class="row-padding">
            <el-col class="flex-col"
                style="display:flex;flex-direction:column"
                :span="6">
                <p class="maintitle">{{emergencyName}}</p>
                <div class="innerpanel"
                    style="flex:1">
                    <p class="innertitle">应急流程</p>
                    <div class="divline"></div>
                    <flow-diagram ref="flowdiagram"
                        @next="flowNext" />
                </div>
                <div class="btn-panel">
                    <div>
                        <span class="title">客流</span>
                        <span class="btn"
                            @click="changeWorkArea('客流-网')">网</span>
                        <span class="btn"
                            @click="changeWorkArea('客流-线')">线</span>
                        <span class="btn"
                            @click="changeWorkArea('客流-站')">站</span>
                        <span class="btn"
                            @click="changeWorkArea('客流-车')">车</span>
                    </div>
                    <div>
                        <span class="title">行车</span>
                        <span class="btn"
                            @click="changeWorkArea('行车-运行图')">运行图</span>
                        <span class="btn"
                            @click="changeWorkArea('行车-正线')">正线</span>
                        <span class="btn"
                            @click="changeWorkArea('行车-段场')">段场</span>
                    </div>
                    <div>
                        <span class="title">其他</span>
                        <span class="btn"
                            @click="changeWorkArea('其他-车站平面图')">车站平面图</span>
                        <span class="btn"
                            @click="changeWorkArea('其他-视频画面')">视频画面</span>
                    </div>

                    <div>
                        <span class="title">周边</span>
                        <span class="btn"
                            @click="changeWorkArea('周边-天气')">天气</span>
                        <span class="btn"
                            @click="changeWorkArea('周边-路况')">路况</span>
                    </div>
                </div>
            </el-col>
            <el-col class="flex-col flex-col-middle"
                :span="13">
                <div class="mainmenu">
                    <el-button type="primary"
                        size="mini"
                        class="menubtn"
                        @click="topClick('应急通知')"
                        round>应急通知</el-button>
                    <el-button type="primary"
                        size="mini"
                        class="menubtn"
                        @click="topClick('应急会商')"
                        round>应急会商</el-button>
                    <el-button type="primary"
                        size="mini"
                        class="menubtn"
                        @click="topClick('信息监视')"
                        round>客流监控</el-button>
                </div>
                <div class="innerpanel">
                    <p class="innertitle">应急预案</p>
                    <div class="divline"></div>
                    <div class="middle-panel">
                        <Comprehensive style="height:calc(100vh - 150px)"
                            v-if="currentView == '2D线网图'" />
                        <div  style="height:100%;width:100%"
                            v-if="currentView == '客流监视及滚动预测'">
                            <h1>两个ECHART控件</h1>
                        </div>
                        <div  style="height:100%;width:100%"
                            v-if="currentView == '客流波动及处置措施'">
                            <h1>客流波动及处置措施 ...</h1>
                        </div>
                        <div style="height:100%;width:100%"
                            v-if="currentView == '运行图调整'">
                            <iframe style="width: 100%;height: 33%;"
                                src="http://172.51.216.72:41005/sample"
                                frameborder="0"></iframe>
                            <iframe style="width: 100%;height: 33%;"
                                src="http://172.51.216.72:41003/#/common?rowHeight=120&viewTime=25200&linename=计划运行图"
                                frameborder="0"></iframe>
                            <iframe style="width: 100%;height: 33%;"
                                src="http://172.51.216.72:41003/#/common?rowHeight=120&viewTime=25200&linename=调整后运行图"
                                frameborder="0"></iframe>
                        </div>
                        <div  style="height:100%;width:100%"
                            v-if="currentView == '数据简报'">
                            <table class="selfTable">
                                <tbody>
                                    <tr class="header">
                                        <th>序号</th>
                                        <th>运营数据</th>
                                        <th>线路</th>
                                        <th>数量</th>
                                    </tr>
                                    <tr>
                                        <th rowspan="2">1</th>
                                        <th rowspan="2">加开列车数（车次）</th>
                                        <th>7号线</th>
                                        <th>3</th>
                                    </tr>
                                    <tr>
                                        <th>八通线</th>
                                        <th>2</th>
                                    </tr>

                                    <tr>
                                        <th rowspan="2">2</th>
                                        <th rowspan="2">延长时间段</th>
                                        <th>7号线</th>
                                        <th>35min</th>
                                    </tr>
                                    <tr>
                                        <th>八通线</th>
                                        <th>30min</th>
                                    </tr>

                                    <tr>
                                        <th rowspan="2">3</th>
                                        <th rowspan="2">延长时间间隔（min）</th>
                                        <th>7号线</th>
                                        <th>--</th>
                                    </tr>
                                    <tr>
                                        <th>八通线</th>
                                        <th>--</th>
                                    </tr>

                                    <tr>
                                        <th rowspan="2">4</th>
                                        <th rowspan="2">运送乘客数（人）</th>
                                        <th>7号线</th>
                                        <th>35071</th>
                                    </tr>
                                    <tr>
                                        <th>八通线</th>
                                        <th>21024</th>
                                    </tr>

                                    <tr>
                                        <th rowspan="2">5</th>
                                        <th rowspan="2">影响车站数（个）</th>
                                        <th>7号线</th>
                                        <th>30</th>
                                    </tr>
                                    <tr>
                                        <th>八通线</th>
                                        <th>35</th>
                                    </tr>

                                    <tr>
                                        <th rowspan="2">6</th>
                                        <th rowspan="2">参与人员数（个）</th>
                                        <th>7号线</th>
                                        <th>28</th>
                                    </tr>
                                    <tr>
                                        <th>八通线</th>
                                        <th>15</th>
                                    </tr>

                                    <tr>
                                        <th rowspan="2">7</th>
                                        <th rowspan="2">异常事件数（个）</th>
                                        <th>7号线</th>
                                        <th>0</th>
                                    </tr>
                                    <tr>
                                        <th>八通线</th>
                                        <th>0</th>
                                    </tr>

                                </tbody>
                            </table>
                            <p>
                                2022年12月24日保障环球影城夜场活动，7号线加开3列临客，八通线加开2列临客，涉及65个车站，处置时长2小时25分03秒，共服务旅客<span>56095</span>人，无人员伤亡，无设备损失。
                            </p>
                        </div>
                        <div  style="height:100%;width:100%"
                            v-if="currentView == '外部URL'">
                            <iframe ref="outframe" style="height:100%;width:100%"
                                frameborder="0"></iframe>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col class="flex-col"
                :span="5">
                <message-panel title="消息列表"
                    :messagelist="messagelist" />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import MessagePanel from "./components/MessagePanel";

import FlowDiagram from "./components/FlowDiagram";
import Comprehensive from "../line/comprehensive";
import { getFlowData } from "./flowdata";
import { mockMessage } from "./mockdata";

export default {
    components: {
        MessagePanel,
        FlowDiagram,
        Comprehensive,
    },
    created() {
        this.emergencyName = this.$route.meta.title;
        window.addEventListener("beforeunload", () => {
            sessionStorage.setItem(
                this.emergencyName,
                JSON.stringify(this.flowdata)
            );
            sessionStorage.setItem(
                `${this.emergencyName}-time`,
                JSON.stringify(this.messagelist)
            );
        });
    },
    mounted() {
        this.flowdata = sessionStorage.getItem(this.emergencyName);
        if (this.flowdata) {
            try {
                this.flowdata = JSON.parse(this.flowdata);
            } catch (e) {
                this.flowdata = getFlowData("inmajor");
            }
        } else {
            this.flowdata = getFlowData("inmajor");
        }
        this.$refs.flowdiagram.initFlow(this.flowdata);

        let msgList = sessionStorage.getItem(`${this.emergencyName}-time`);
        if (msgList) {
            try {
                this.messagelist = JSON.parse(msgList);
            } catch (e) {}
        }

        if (this.messagelist.length == 0) {
            this._mockMsg();
        }
    },
    data() {
        return {
            emergencyName: "",
            flowdata: [],
            messagelist: [],
            currentMainBtn: "",
            currentSubBtn: "",
            currentView: "2D线网图",
        };
    },
    methods: {
        topClick(key) {
            this.$message({
                type: "success",
                message: `${key}消息已发送`,
            });
        },
        _mockMsg(key) {
            let list = mockMessage[key];
            if (list && list.length > 0) {
                list.forEach((item) => {
                    item.time = this.$getCurrentDate2();
                    this.messagelist.push(item);
                });
            }
        },
        changeWorkArea(scene) {
            let outaddress = "http://frp.funenc.xyz:7245/";

            if (scene == "客流-网") {
                this.currentView = "外部URL";
                this.$refs.outframe.src = `http://frp.funenc.xyz:7245/link/iFDeE8us`;
            } else if (scene === "客流-线") {
                this.currentView = "外部URL";
                this.$refs.outframe.src = `http://frp.funenc.xyz:7245/link/kdHtibMs`;
            } else if (scene === "客流-站") {
                this.currentView = "外部URL";
                this.$refs.outframe.src = `http://frp.funenc.xyz:7245/link/DqAzVYn3`;
            } else if (scene === "客流-车") {
                this.currentView = "外部URL";
                this.$refs.outframe.src = `http://frp.funenc.xyz:7245/link/V0sEA5CS`;
            } else if (scene === "行车-运行图") {
                this.currentView = "外部URL";
                this.$refs.outframe.src = `http://172.51.216.72:41003/#/common?rowHeight=120&viewTime=25200`;
            } else if (scene === "行车-正线") {
                this.currentView = "外部URL";
                this.$refs.outframe.src = `http://172.51.216.72:41005/sample`;
            } else if (scene === "行车-段场") {
                this.currentView = "外部URL";
                this.$refs.outframe.src = `http://172.51.216.64/sdss/tc.html?name=平面图-场.png`;
            } else if (scene === "其他-车站平面图") {
                this.currentView = "外部URL";
                this.$refs.outframe.src = `http://172.51.216.64/sdss/tc.html?name=平面图-站.png`;
            } else if (scene === "其他-视频画面") {
                this.currentView = "外部URL";
                this.$refs.outframe.src = `http://172.51.216.64/sdss/tc.html?name=视频画面.png`;
            } else if (scene === "周边-天气" || scene === "周边-路况"){
                this.currentView = "外部URL";
                this.$refs.outframe.src = `http://172.51.216.64/sdss/tc.html?name=${scene}.png`;
            }
        },
        flowNext(model, cellview) {
            this.currentMainBtn = model.evt;
            if (this.currentMainBtn == "开始") {
                this.currentView = "2D线网图";
            } else if (this.currentMainBtn == "客流监视及\n滚动预测") {
                this.currentView = "客流监视及滚动预测";
            } else if (this.currentMainBtn == "客流波动及\n处置措施") {
                this.currentView = "客流波动及处置措施";
            } else if (this.currentMainBtn == "运行图调整") {
                this.currentView = "运行图调整";
            } else if (this.currentMainBtn == "保障方案实施") {
                this.currentView = "客流监视及滚动预测";
            } else if (this.currentMainBtn == "方案结束判断") {
                // this.currentView='客流波动及处置措施';
                this.currentView = "外部URL";
                this.$refs.outframe.src = `http://frp.funenc.xyz:7245/link/2EUrUWHw`;
            } else if (this.currentMainBtn == "统计数据\n撰写简报") {
                this.currentView = "数据简报";
            } else if (this.currentMainBtn == "结束") {
                this.currentView = "2D线网图";
                sessionStorage.removeItem(this.emergencyName);
                sessionStorage.removeItem(`${this.emergencyName}-time`);
            }

            // TODO
            // this._mockMsg();
        },
    },
};
</script>


<style scoped>
.page {
    height: calc(100vh - 60px);
}

.row-padding {
    height: 100%;
    padding: 5px;
}

.flex-col {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.flex-col-middle {
    padding: 0 5px;
}

.flex-col > .innerpanel {
    flex: 1;
    overflow: hidden;
}

.innertitle {
    text-align: left;
    margin-left: 5px;
    line-height: 40px;
    color: #fff;
}
.maintitle {
    text-align: left;
    margin-left: 10px;
    line-height: 40px;
    color: #6eb5ff;
    font-size: 1.2rem;
}
.innerpanel {
    background: #1d1e39;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
.divline {
    height: 3px;
    background: #6eb5ff;
    margin-bottom: 5px;
}
.middle-panel {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.middle-panel > .workarea {
    flex: 1;
}


.mainmenu {
    text-align: left;
    line-height: 40px;
}

.selfTable .header th {
    background: #2281da;
    color: #fff;
    height: 30px;
    line-height: 30px;
    font-weight: bold;
    font-size: 16px;
}

.btn-panel {
    border: solid #666 1px;
    padding: 10px;
    background: #1d1e39;
    font-size: 1.1rem;
    cursor: default;
}
.btn-panel .title {
    font-size: 1.2rem;
}

.btn-panel .btn {
    display: inline-block;
    padding: 2px 15px;
    margin: 10px 2px;
    text-align: center;
    min-width: 60px;
    background: #5470c6;
    cursor: pointer;
}
.btn-panel .btn:hover {
    background: orange;
}
</style>