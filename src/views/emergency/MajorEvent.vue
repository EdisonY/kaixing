<template>
    <div class="page">
        <el-row class="row-padding">
            <el-col class="flex-col"
                :span="6">
                <p class="maintitle">{{emergencyName}}</p>
                <div class="innerpanel">
                    <p class="innertitle">应急流程</p>
                    <div class="divline"></div>
                    <flow-diagram ref="flowdiagram"
                        @next="flowNext" />
                </div>
            </el-col>
            <el-col class="flex-col flex-col-middle"
                :span="13">
                <div class="mainmenu">
                    <el-button type="primary"
                        size="mini"
                        class="menubtn"
                        @click="topClick('应急会商')"
                        round>应急会商</el-button>
                    <el-button type="primary"
                        size="mini"
                        class="menubtn"
                        @click="topClick('信息监视')"
                        round>信息监视</el-button>
                </div>
                <div class="innerpanel">
                    <p class="innertitle">应急预案</p>
                    <div class="divline"></div>
                    <div class="middle-panel">
                        <div class="tools">
                            <p class="title">客流</p>
                            <p class="btn segline"
                                @click="changeWorkArea('客流-网')">网</p>
                            <p class="btn segline"
                                @click="changeWorkArea('客流-线')">线</p>
                            <p class="btn segline"
                                @click="changeWorkArea('客流-站')">站</p>
                            <p class="btn"
                                @click="changeWorkArea('客流-车')">车</p>

                            <p class="title segment">平面图</p>
                            <p class="btn segline"
                                @click="changeWorkArea('平面图-网')">网</p>
                            <p class="btn segline"
                                @click="changeWorkArea('平面图-ATS')">ATS</p>
                            <p class="btn segline"
                                @click="changeWorkArea('平面图-站')">站</p>
                            <p class="btn"
                                @click="changeWorkArea('平面图-场')">场</p>

                            <p class="btn segment"
                                @click="changeWorkArea('运行图')">运行图</p>

                            <p class="btn segment"
                                @click="changeWorkArea('视频画面')">视频画面</p>

                            <p class="title segment">周边</p>
                            <p class="btn segline"
                                @click="changeWorkArea('周边-天气')">天气</p>
                            <p class="btn"
                                @click="changeWorkArea('周边-路况')">路况</p>

                        </div>
                        <div class="workarea">
                            <div class="newAddTable"
                                v-if="newAddTable">
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
                            <div v-if="specialMode"
                                style="height:100%;display: flex;flex-direction:column;">
                                <iframe style="flex:1"
                                    src="http://172.51.216.72:41005/sample"
                                    frameborder="0"></iframe>
                                <iframe style="flex:1"
                                    src="http://172.51.216.72:41003/#/common?rowHeight=120&viewTime=25200&linename=计划运行图"
                                    frameborder="0"></iframe>
                                <iframe style="flex:1;width: 100%;"
                                    src="http://172.51.216.72:41003/#/common?rowHeight=120&viewTime=25200&linename=调整后运行图"
                                    frameborder="0"></iframe>
                            </div>
                            <iframe v-if="!(specialMode || newAddTable)"
                                style="width:100%;height: 100%;"
                                :src="workurl"
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
import { getFlowData } from "./flowdata";
import { mockMessage } from "./mockdata";

export default {
    components: {
        MessagePanel,
        FlowDiagram,
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
                this.flowdata = getFlowData("majorevent");
            }
        } else {
            this.flowdata = getFlowData("majorevent");
        }
        this.$refs.flowdiagram.initFlow(this.flowdata);

        let msgList = sessionStorage.getItem(`${this.emergencyName}-time`);
        if (msgList) {
            try {
                this.messagelist = JSON.parse(msgList);
            } catch (e) {}
        }

        if (this.curflow === "" && this.messagelist.length == 0) {
            this.curflow = "开始";
            this._mockMsg();
        }
    },
    data() {
        return {
            emergencyName: "",
            workurl: "http://172.51.216.62:41005/#/subway",
            flowdata: [],
            curflow: "",
            curscene: "",
            messagelist: [],
            specialMode: false,
            newAddTable: false,
        };
    },
    methods: {
        topClick(key) {
            this.curflow = key;
        },
        _mockMsg() {
            let list = mockMessage[this.curflow];
            if (list && list.length > 0) {
                list.forEach((item) => {
                    item.time = this.$getCurrentDate2();
                    this.messagelist.push(item);
                });
            }
        },
        changeWorkArea(scene) {
            this.curscene = scene;
            if (scene === "平面图-网") {
                this.workurl = `http://172.51.216.62:41005/#/subway`;
            }
            // TODO
            // else if (scene === "平面图-ATS") {
            //     this.workurl = `http://172.51.216.62:41005/#/subway`;
            // }
            else if (scene === "客流-网") {
                this.workurl = `http://172.16.1.111/link/iFDeE8us`;
            } else if (scene === "客流-线") {
                this.workurl = `http://172.16.1.111/link/kdHtibMs`;
            } else if (scene === "客流-站") {
                this.workurl = `http://172.16.1.111/link/DqAzVYn3`;
            } else if (scene === "客流-车") {
                this.workurl = `http://172.16.1.111/link/V0sEA5CS`;
            } else if (scene === "运行图") {
                this.workurl = `http://172.51.216.72:41003/#/common?rowHeight=120&viewTime=25200`;
            } else {
                this.workurl = `http://172.51.216.64/sdss/tc.html?name=${scene}.png`;
            }
        },
        flowNext(model, cellview) {
            this.specialMode = false;
            this.curflow = model.evt;
            this.newAddTable = false;
            //  let key = `${this.emergencyName}-${this.curflow}`;
            // this.workurl = `http://172.51.216.64/sdss/tc.html?name=${key}.png`;
            if (this.curflow === "客流监控") {
                this.workurl = `http://172.16.1.111/link/DqAzVYn3`;
            } else if (this.curflow === "影响评估") {
                this.workurl = `http://172.16.1.111/link/2EUrUWHw`;
            } else if (this.curflow === "方案确认") {
                this.workurl = `http://172.51.216.64/sdss/tc.html?name=方案确认3.png`;
            } else if (this.curflow === "保障方案实施") {
                this.specialMode = true;
            } else if (this.curflow === "方案结束判断") {
                this.workurl = `http://172.16.1.111/link/2EUrUWHw`;
            } else if (this.curflow === "统计数据\n撰写简报") {
                this.newAddTable = true;
            } else if (this.curflow === "结束") {
                sessionStorage.removeItem(this.emergencyName);
                sessionStorage.removeItem(`${this.emergencyName}-time`);
            }
            this._mockMsg();
        },
        testFunc() {},
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
    color: #6db9f7;
    font-size: 1.2rem;
}
.innerpanel {
    background: #172230;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
.divline {
    height: 3px;
    background: #6db9f7;
    margin-bottom: 5px;
}
.middle-panel {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.middle-panel > .tools {
    width: 35px;
}

.middle-panel > .tools p {
    text-align: center;
    cursor: pointer;
}
.middle-panel > .tools > .title {
    font-size: 1.2rem;
    line-height: 20px;
    border: solid 1px #2281da;
}
.middle-panel > .tools > .btn {
    font-size: 1.2rem;
    line-height: 30px;
    padding: 1px;
    background: #2281da;
}
.middle-panel > .tools > .btn:hover {
    background: #ffcc00;
}

.middle-panel > .tools > .segment {
    margin-top: 5px;
}

.middle-panel > .tools > .segline {
    border-bottom: solid 1px #222;
}

.middle-panel > .workarea {
    flex: 1;
}

.special {
    display: flex;
    flex-direction: column;
}

.mainmenu {
    text-align: left;
    line-height: 40px;
}
.newAddTable {
    width: 100%;
}
.newAddTable table {
    width: 100%;
}
.newAddTable table tr {
    line-height: 30px;
}
.newAddTable table td {
    height: 20px;
    line-height: 20px;
}
.selfTable .header th {
    background: #2281da;
    color: #fff;
    height: 30px;
    line-height: 30px;
    font-weight: bold;
    font-size: 16px;
}
.newAddTable p {
    line-height: 25px;
    border: 1px solid #ccc;
    padding: 6px;
    text-indent: 2em;
    margin: 10px 0 0 0;
}
.newAddTable p span {
    color: red;
    font-weight: bold;
    font-size: 16px;
}
</style>