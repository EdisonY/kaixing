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
                        <iframe class="workarea"
                            :src="workurl"
                            frameborder="0"
                            v-if="intergrate==='iframe'"></iframe>
                        <template v-else-if="intergrate==='选择线路'">
                            <chose-line @choseline="intergrate='导入客流信息'" />
                        </template>
                        <template v-else-if="intergrate==='导入客流信息'">
                            <base-control />
                        </template>
                        <template v-else-if="intergrate==='选择交路方案'">
                            <route-scheme />
                        </template>
                        <template v-else-if="intergrate==='设计开行方案'">
                            <draw-running />
                        </template>
                        <template v-else-if="intergrate==='运行图校验'">
                            <ve-running @msg="_mockMsg" />
                        </template>
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

import ChoseLine from "./daily/choseLine";
import BaseControl from "./daily/base";
import RouteScheme from "./daily/routescheme";
import DrawRunning from "./daily/drawrunning";
import VeRunning from "./daily/verunning";

import { getFlowData } from "./flowdata";
// import { mockMessage } from "./mockdata";

export default {
    components: {
        MessagePanel,
        FlowDiagram,
        ChoseLine,
        BaseControl,
        RouteScheme,
        DrawRunning,
        VeRunning,
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
                this.flowdata = getFlowData("daily");
            }
        } else {
            this.flowdata = getFlowData("daily");
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
        }
    },
    data() {
        return {
            emergencyName: "",
            workurl: "http://172.51.216.62:41005/#/subway",
            flowdata: [],
            curflow: "",
            messagelist: [],
            intergrate: "iframe",
        };
    },
    methods: {
        topClick(key) {
            this.curflow = key;
        },
        _mockMsg(msg) {
            this.messagelist.push({
                name: "总调",
                content: msg,
                time: this.$getCurrentDate2(),
                right: true,
            });
        },
        changeWorkArea(scene) {
            this.intergrate = "iframe";
            if (scene === "客流-站") {
                this.workurl = `http://bi.funenc.com/bi/?proc=1&action=viewer&hback=true&db=!5317!!4eac!!8f68!!9053!!4ea4!!901a!!5927!!8bfe!!9898!!2f!!65e5!!5e38!!6a21!!5f0f!-!5ba2!!6d41!!7ef4!!5ea6!-!5e38!!89c4!!7269!!7406!!8f66!!7ad9!.db&platform=PC&browserType=chrome&au_act=login&adminv=aoms&passv=g5`;
            } else if (scene === "平面图-网") {
                this.workurl = `http://172.51.216.62:41005/#/subway`;
            } else {
                this.workurl = `http://172.51.216.64/sdss/tc.html?name=${scene}.png`;
            }
        },
        flowNext(model, cellview) {
            this.curflow = model.evt;
            //  let key = `${this.emergencyName}-${this.curflow}`;
            // this.workurl = `http://172.51.216.64/sdss/tc.html?name=${key}.png`;
            if (this.curflow === "选择线路") {
                this.intergrate = "选择线路";
            } else if (this.curflow === "日常监控") {
                this.intergrate = "日常监控";
                this.intergrate = "iframe";
                this.workurl =
                    "http://172.51.216.62:41005/#/subway";
            } else if (this.curflow === "导入客流信息") {
                this.intergrate = "导入客流信息";
            } else if (this.curflow === "选择交路方案") {
                this.intergrate = "选择交路方案";
            } else if (this.curflow === "设计开行方案") {
                this.intergrate = "设计开行方案";
            }
            // else if (this.curflow === "铺画运行图") {
            //     this.intergrate = "铺画运行图";
            // }
            else if (this.curflow === "运行图校验") {
                this.intergrate = "运行图校验";
            } else if (this.curflow === "结束") {
                sessionStorage.removeItem(this.emergencyName);
                sessionStorage.removeItem(`${this.emergencyName}-time`);
            }
        },
        testFunc() {
            // 调用优锘的切换接口
            //  $.ajax({
            //         contentType: "application/json",
            //         type: "POST",
            //         url: "http://172.51.216.61:1995/customer/terminal/chart",
            //         data: JSON.stringify({
            //             module: "CHART",
            //             key: "TRIGGER_1",
            //             keyStatus: this.yn[this.ynIndex % 2],
            //         }),
            //         dataType: "json",
            //     });
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

.mainmenu {
    text-align: left;
    line-height: 40px;
}
</style>