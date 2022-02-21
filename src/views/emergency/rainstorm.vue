<template>
    <div class="page">
        <div class="page pageleft">
            <p class="maintitle">应急处置 > 暴雨大客流应急预案</p>
            <div class="innerpanel">
                <p class="innertitle">应急流程</p>
                <div class="divline"></div>
                <flow-chart class="flow"
                    v-on:click="flowClick" />
            </div>
        </div>
        <div class="page pagemiddle">
            <div class="mainmenu">
                <el-button type="primary"
                    size="mini"
                    class="menubtn"
                    round>应急通知</el-button>
                <el-button type="primary"
                    size="mini"
                    class="menubtn"
                    round>应急会商</el-button>
                <el-button type="primary"
                    size="mini"
                    class="menubtn"
                    round>机场客流监控</el-button>
            </div>

            <div class="innerpanel">
                <p class="innertitle">应急预案</p>
                <div class="divline"></div>
                <div class="planitem"
                    v-for="(item,index) in planlist"
                    :key="index">
                    <div class="planitem-btn"
                        style="text-align:left;">
                        <el-button style="background:#FFF3"
                            type="warning"
                            size="mini"
                            plain>启动预案</el-button>
                        <el-button style="float:right;"
                            type="primary"
                            size="mini"
                            round>确认</el-button>
                    </div>
                    <p class="plantext">预案名称: <span>{{item.name}}</span></p>
                    <p class="plantext">预案版本: <span>{{item.version}}</span></p>
                    <!-- <p class="plantext">启动条件:</p>
                    <p class="plantext condition">{{item.condition}}</p> -->
                    <p class="plantext">启动条件: <span>{{item.condition}}</span></p>
                </div>
            </div>
        </div>
        <div class="page pageright">
            <message-panel title="消息列表"
                :messagelist="messagelist" />
        </div>
    </div>
</template>

<script>
import FlowChart from "./components/FlowChart.vue";
import MessagePanel from "./components/MessagePanel.vue";

export default {
    components: {
        FlowChart,
        MessagePanel,
    },
    data() {
        return {
            planlist: [
                {
                    name: "xx市地铁大客流数字化应急预案2016",
                    version: "2016版",
                    condition:
                        "在满足xxxx的前提下,需要xxxx就绪,如果xxxx方可启动",
                },
                {
                    name: "xx市地铁大客流数字化应急预案2017",
                    version: "2017版",
                    condition:
                        "在满足xxxx的前提下,需要xxxx就绪,如果xxxx方可启动",
                },
                {
                    name: "xx市地铁大客流数字化应急预案2020",
                    version: "2020版",
                    condition:
                        "在满足xxxx的前提下,需要xxxx就绪,如果xxxx方可启动",
                },
            ],
            messagelist: [
                {
                    name: "交委",
                    content: "请简要汇报当前状况,并全员应急到岗",
                    time: "16:22",
                    right: false,
                },
                {
                    name: "总调",
                    content:
                        "当前暴雨已经持续15分钟,车站已经开始进水,现在已经紧急断电,并启用应急电源。各岗位人员加急到岗,目前到岗率98%",
                    time: "16:23",
                    right: true,
                },
                {
                    name: "交委",
                    content: "请发送应急通知,并迅速组织应急会商",
                    time: "16:22",
                    right: false,
                },
                {
                    name: "交委",
                    content: "请简要汇报当前状况,并全员应急到岗",
                    time: "16:22",
                    right: false,
                },
                {
                    name: "总调",
                    content:
                        "当前暴雨已经持续15分钟,车站已经开始进水,现在已经紧急断电,并启用应急电源。各岗位人员加急到岗,目前到岗率98%",
                    time: "16:23",
                    right: true,
                },
                {
                    name: "交委",
                    content: "请发送应急通知,并迅速组织应急会商",
                    time: "16:22",
                    right: false,
                },
                {
                    name: "交委",
                    content: "请简要汇报当前状况,并全员应急到岗",
                    time: "16:22",
                    right: false,
                },
                {
                    name: "总调",
                    content:
                        "当前暴雨已经持续15分钟,车站已经开始进水,现在已经紧急断电,并启用应急电源。各岗位人员加急到岗,目前到岗率98%",
                    time: "16:23",
                    right: true,
                },
                {
                    name: "交委",
                    content: "请发送应急通知,并迅速组织应急会商",
                    time: "16:22",
                    right: false,
                },
                {
                    name: "交委",
                    content: "请简要汇报当前状况,并全员应急到岗",
                    time: "16:22",
                    right: false,
                },
                {
                    name: "总调",
                    content:
                        "当前暴雨已经持续15分钟,车站已经开始进水,现在已经紧急断电,并启用应急电源。各岗位人员加急到岗,目前到岗率98%",
                    time: "16:23",
                    right: true,
                },
                {
                    name: "交委",
                    content: "请发送应急通知,并迅速组织应急会商",
                    time: "16:22",
                    right: false,
                },
            ],
        };
    },
    methods: {
        flowClick(key) {
            alert(key);
        },
    },
};
</script>


<style scoped>
.page {
    /* height: 100%; */
    height: calc(100vh - 65px);
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 3px;
}

.pageleft {
    display: block;
    width: 30%;
    padding: 3px;
}
.pagemiddle {
    display: block;
    width: 50%;
    padding: 3px;
}
.pageright {
    flex: 1;
    padding: 3px;
}
.maintitle {
    text-align: left;
    margin-left: 5px;
    line-height: 40px;
    color: #6db9f7;
    font-size: 1.2rem;
}
.innertitle {
    text-align: left;
    margin-left: 5px;
    line-height: 40px;
    color: #fff;
}
.innerpanel {
    height: calc(100% - 40px);
    width: 100%;
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
.flow {
    flex: 1;
    overflow: auto;
}

.mainmenu {
    text-align: left;
    line-height: 40px;
}

.planitem {
    margin: 5px 10px;
    padding: 15px;
    background: #0005;
}
.plantext {
    text-align: left;
    margin-top: 0.8rem;
    font-size: 1.1rem;
    color: #666;
}
.plantext > span {
    color: #fff;
}
.condition {
    font-size: 1rem;
    color: #cecece;
}
/* .layout-ud {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
.iframe {
    box-sizing: border-box;
    flex: 1;
    width: 100%;
    background: cadetblue;
}

iframe{
    height: 100%;
    width: 100%;
}

.menu-bar {
    box-sizing: border-box;
    padding: 10px;
}

.btn {
    margin: 5px;
} */
</style>