<template>
    <div class="page">
        <div class="page pageleft">
            <p class="maintitle">应急处置 > 暴雨大客流应急预案</p>
            <div class="innerpanel">
                <p class="innertitle">应急流程</p>
                <div class="divline"></div>
                <flow-chart class="flow"
                    v-on:click="flowClick"
                    v-on:otherClick="otherClick" />
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
                <plan-list class="mid-content"
                    v-if="currentKey == '启动预案' || currentKey == '开始'" />
                <train-and-passenger class="mid-content"
                    v-if="currentKey == '客流监视' || currentKey == '列车资源'" />
                <notify class="mid-content"
                    v-if="currentKey == '应急通知'" />
                <meeting class="mid-content"
                    v-if="currentKey == '应急会商'" />
                <adjust-plan class="mid-content"
                    v-if="currentKey == '确认初步方案' || currentKey == '调整运行图' || currentKey == '评价运行图'" />
                <chu-zhi class="mid-content"
                    v-show="currentKey == '应急处置'"
                    :cur="czPage" />
                <stop class="mid-content"
                    v-if="currentKey == '方案终止判断'" />

                <img class="img-test"
                    v-if="currentKey == '恢复正常运营' || currentKey == '统计数据撰写简报'"
                    src="../../assets/tmp/report.png">
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
import PlanList from "./components/mid/PlanList.vue";
import TrainAndPassenger from "./components/mid/TrainAndPassenger.vue";
import Notify from "./components/mid/Notify.vue";
import Meeting from "./components/mid/Meeting.vue";
import AdjustPlan from "./components/mid/AdjustPlan.vue";
import ChuZhi from "./components/mid/ChuZhi.vue";
import Stop from "./components/mid/Stop.vue";

export default {
    components: {
        FlowChart,
        MessagePanel,
        PlanList,
        TrainAndPassenger,
        Notify,
        Meeting,
        AdjustPlan,
        ChuZhi,
        Stop,
    },
    data() {
        return {
            keyList: [],
            currentKey: "",
            messagelist: [],
            czPage: "线网监控重点线路",
        };
    },
    methods: {
        flowClick(key, flag) {
            if (this.keyList.indexOf(key) == -1) {
                this.keyList.push(key);
                if (key == "列车资源") {
                    this.flowClick("客流监视", 1);
                } else if (key == "客流监视") {
                    this.flowClick("列车资源", 1);
                }
            }
            if (!flag) {
                this._mockMsg(key);
            }

            if (key == "上报交委状态") {
                this.$message({
                    message: "上报交委状态成功",
                    type: "success",
                });
            } else if (key == "上报交委运行方案") {
                this.$message({
                    message: "上报交委运行方案成功",
                    type: "success",
                });
            } else if (key == "结束") {
                this.$message({
                    message: "暴雨应急已结束",
                    type: "success",
                });
            } else {
                this.currentKey = key;
            }
        },
        otherClick(key) {
            this.czPage = key;
        },
        _mockMsg(key) {
            if (key == "开始") {
                this.messagelist = [];
                this.messagelist.push({
                    name: "交委",
                    content: "航班大面积延误，首都机场地铁配合延长运营时间",
                    time: this.$getCurrentDate2(),
                    right: false,
                });
            } else if (key == "启动预案") {
                this.messagelist.push({
                    name: "总调",
                    content: "通知各岗位，准备延长运营",
                    time: this.$getCurrentDate2(),
                    right: true,
                });
            } else if (key == "客流监视") {
                this.messagelist.push({
                    name: "机场",
                    content: "降落航班C2009次，到港旅客600人",
                    time: this.$getCurrentDate2(),
                    right: false,
                });
            } else if (key == "列车资源") {
                this.messagelist.push({
                    name: "行调",
                    content:
                        "首都机场线可使用列车数为8，10号线可使用列车数为16",
                    time: this.$getCurrentDate2(),
                    right: false,
                });
            } else if (key == "应急通知") {
                this.messagelist.push({
                    name: "总调 -> 交委",
                    content: "现有可调配列车车辆",
                    time: this.$getCurrentDate2(),
                    right: true,
                });
            } else if (key == "确认初步方案") {
                this.messagelist.push({
                    name: "总调 -> 行调",
                    content: "延长运营时间 23:00-24:00",
                    time: this.$getCurrentDate2(),
                    right: true,
                });
            } else if (key == "调整运行图") {
                this.messagelist.push({
                    name: "行调",
                    content: "调整运行图为......",
                    time: this.$getCurrentDate2(),
                    right: false,
                });
            } else if (key == "评价运行图") {
                this.messagelist.push({
                    name: "总调 -> 行调",
                    content: "调整运行图为......",
                    time: this.$getCurrentDate2(),
                    right: true,
                });
            } else if (key == "应急处置") {
                this.messagelist.push({
                    name: "总调 -> 交委/各岗位",
                    content: "延长运营方案为......",
                    time: this.$getCurrentDate2(),
                    right: true,
                });
                this.messagelist.push({
                    name: "总调 -> 行调",
                    content: "调图满足可运需求，执行延长运营",
                    time: this.$getCurrentDate2(),
                    right: true,
                });
                this.messagelist.push({
                    name: "总调 -> 客流调",
                    content: "配合延长运营，执行延长运营",
                    time: this.$getCurrentDate2(),
                    right: true,
                });
                this.messagelist.push({
                    name: "总调 -> 设备调",
                    content: "取消施工计划，监控设备状态",
                    time: this.$getCurrentDate2(),
                    right: true,
                });
                this.messagelist.push({
                    name: "总调 -> 维护调",
                    content: "取消施工计划",
                    time: this.$getCurrentDate2(),
                    right: true,
                });
            } else if (key == "方案终止判断") {
                this.messagelist.push({
                    name: "总调 -> 交委/各岗位",
                    content: "恢复正常运营......",
                    time: this.$getCurrentDate2(),
                    right: true,
                });
            } else if (key == "统计数据撰写简报") {
                this.messagelist.push({
                    name: "总调 -> 各岗位",
                    content: "统计数据，撰写运营简报......",
                    time: this.$getCurrentDate2(),
                    right: true,
                });
            }
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
.mid-content {
    height: 100%;
    overflow: hidden;
}
.img-test {
    height: 100%;
    width: 100%;
    object-fit: fill;
    overflow: hidden;
}
</style>