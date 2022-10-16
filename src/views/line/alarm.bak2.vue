<template>
    <div class="alarm-panel">
        <div v-if="!viewhistory"
            style="height:100%">
            <el-row style="height:100%">
                <el-col :span="15"
                    style="height:100%">
                    <div class="history">
                        <div class="tools">
                            <p>实时报警</p>
                            <div class="query">
                                <el-input style="margin:0 10px"
                                    placeholder="关键字"
                                    v-model="realquery"></el-input>
                                <el-button type="primary"
                                    size="mini"
                                    @click="queryReal">查询</el-button>
                                <el-button type="primary"
                                    size="mini"
                                    @click="reset">重置</el-button>
                            </div>
                        </div>
                        <div class="data"
                            style="flex:5;overflow: auto;">
                            <el-table class="table"
                                border
                                :data="realdata"
                                height="100%">
                                <el-table-column prop="id"
                                    label="编号"
                                    align="center"
                                    width="80">
                                </el-table-column>
                                <el-table-column prop="name"
                                    label="类型"
                                    sortable
                                    align="center">
                                </el-table-column>
                                <el-table-column prop="level"
                                    label="级别"
                                    sortable
                                    align="center">
                                </el-table-column>
                                <el-table-column prop="line"
                                    label="线路"
                                    sortable
                                    align="center">
                                </el-table-column>
                                <el-table-column prop="station"
                                    label="车站"
                                    sortable
                                    align="center">
                                </el-table-column>
                                <el-table-column prop="position"
                                    label="具体位置"
                                    sortable
                                    align="center">
                                </el-table-column>
                                <el-table-column prop="time"
                                    label="时间"
                                    sortable
                                    align="center">
                                </el-table-column>
                                <el-table-column prop="description"
                                    label="详情"
                                    align="center">
                                </el-table-column>
                                <el-table-column prop="eventProgress"
                                    label="备注"
                                    align="center">
                                </el-table-column>
                                <el-table-column prop="d11"
                                    label="操作"
                                    align="center">
                                    <template slot-scope="scope">
                                        <el-button v-if="scope.row.type == 0"
                                            type="primary"
                                            size="mini"
                                            style="margin:5px;width:80px"
                                            @click="ackMsg(scope.row)">确认</el-button>
                                        <el-button v-if="scope.row.type == 0"
                                            type="primary"
                                            size="mini"
                                            style="margin:5px;width:80px"
                                            @click="alarmMsg(scope.row)">接警事件</el-button>
                                        <el-button v-if="scope.row.type == 1"
                                            type="primary"
                                            size="mini"
                                            style="margin:5px;width:80px;height:60px"
                                            @click="viewPlan(scope.row)">查看预案</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div style="text-align:right;padding:20px">
                            <el-button type="primary"
                                @click="showMsg('报警事件已保存')">保 存</el-button>
                            <el-button type="primary"
                                @click="showMsg('填报成功')">填 报</el-button>
                            <el-button type="primary"
                                @click="viewhistory=true;reset()">历史查询</el-button>
                        </div>
                        <div class="tools">
                            <p>进行中的事件</p>
                        </div>
                        <div class="data">
                            <el-table class="table"
                                border
                                :data="doingdata"
                                height="100%">
                                <el-table-column prop="id"
                                    label="序号"
                                    align="center"
                                    width="80">
                                </el-table-column>
                                <el-table-column prop="description"
                                    label="描述"
                                    sortable
                                    align="center">
                                </el-table-column>
                                <el-table-column prop="line"
                                    label="线路"
                                    sortable
                                    align="center">
                                </el-table-column>
                                <el-table-column prop="time"
                                    label="时间"
                                    sortable
                                    align="center">
                                </el-table-column>
                                <el-table-column prop="eventProgress"
                                    label="当前状态"
                                    align="center">
                                </el-table-column>
                                <el-table-column prop="eventProgress"
                                    label="操作"
                                    align="center">
                                    <template slot-scope="scope">
                                        <el-button type="primary"
                                            size="mini"
                                            style="margin:5px;width:80px">进度跟踪</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-col>
                <el-col :span="9"
                    class="tab">
                    <el-tabs v-model="activeName"
                        @tab-click="handleClick">
                        <el-tab-pane label="相关预案"
                            name="tab1">
                            <img src="../../assets/tmp/alarm1.png"
                                style="width:100%;height:100%">
                        </el-tab-pane>
                        <el-tab-pane label="事件详情"
                            name="tab2">
                            <img src="../../assets/tmp/alarm2.png"
                                style="width:100%;height:100%">
                        </el-tab-pane>

                    </el-tabs>
                </el-col>
            </el-row>
        </div>
        <div v-else
            class="history">
            <div class="tools">
                <p>历史记录</p>
                <div class="query">
                    <el-input style="margin:0 10px"
                        placeholder="关键字"
                        v-model="historyquery"></el-input>
                    <el-button type="primary"
                        size="mini"
                        @click="queryHistory">查询</el-button>
                    <el-button type="primary"
                        size="mini"
                        @click="reset">重置</el-button>
                </div>
            </div>
            <div class="data">
                <el-table class="table"
                    border
                    :data="historydata"
                    height="100%">
                    <el-table-column prop="id"
                        label="编号"
                        align="center"
                        width="80">
                    </el-table-column>
                    <el-table-column prop="name"
                        label="类型"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="level"
                        label="级别"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="line"
                        label="线路"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="station"
                        label="车站"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="position"
                        label="具体位置"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="time"
                        label="时间"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="description"
                        label="详情"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="eventProgress"
                        label="备注"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="eventProgress"
                        label="操作者"
                        align="center">
                    </el-table-column>
                </el-table>
            </div>
            <div style="text-align:center;padding:20px">
                <el-button type="primary"
                    @click="viewhistory=false;reset()">返 回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mockHistory, mockDoing } from "./alarmData";
let localWSurl = "ws://172.51.216.75:8090/ntms/warning_manage/socket";
let alarmAck = "http://172.51.216.75:8090/ntms/warning_manage/u/check/"; //{id}
let alarmLeveUp = "http://172.51.216.75:8090/ntms/warning_manage/u/toEvent/"; //{id}
let alarmNew = "http://172.51.216.75:8090/ntms/warning_manage/a/Common";
let alarmPlanList = `http://172.51.216.75:8090/ntms/warning_manage/plans/`; //{line}/{station}/{position}/{eventName}
export default {
    name: "comprehensive",
    data() {
        return {
            viewhistory: false,
            realquery: "",
            historyquery: "",
            activeName: "tab1",
            ws: null,
            origin_realdata: [],
            realdata: [],
            origin_historydata: [],
            historydata: [],
            origin_doingdata: [],
            doingdata: [],
        };
    },
    created() {
        this.ws = new WebSocket(localWSurl);
        this.ws.onmessage = this.wsMessage;
        this.ws.onclose = this.wsClose;
        this.ws.onopen = this.wsConnect;
        this.ws.onerror = this.wsError;
    },
    computed: {},
    mounted() {},
    beforeDestroy() {
        if (this.ws) {
            this.ws.close();
        }
    },
    methods: {
        queryReal() {
            this.realdata = this.origin_realdata.filter((i) => {
                return (
                    (i.name.indexOf(this.realquery) > -1 ||
                        i.line.indexOf(this.realquery) > -1 ||
                        i.level == this.realquery ||
                        i.station.indexOf(this.realquery) > -1 ||
                        i.position.indexOf(this.realquery) > -1 ||
                        i.description.indexOf(this.realquery) > -1) &&
                    !i.eventProgress
                );
            });
        },
        queryHistory() {
            this.historydata = this.origin_historydata.filter((i) => {
                return (
                    i.name.indexOf(this.historyquery) > -1 ||
                    i.line.indexOf(this.historyquery) > -1 ||
                    i.level == this.historyquery ||
                    i.station.indexOf(this.historyquery) > -1 ||
                    i.position.indexOf(this.historyquery) > -1 ||
                    i.description.indexOf(this.historyquery) > -1 ||
                    (i.eventProgress &&
                        i.eventProgress.indexOf(this.historyquery) > -1)
                );
            });
        },
        reset() {
            this.realquery = "";
            this.historyquery = "";
        },
        ackMsg(row) {
            this.$api.get(`${alarmAck}${row.id}`, {}).then((res) => {
                this.showMsg("确认成功" + res);
            });
        },
        alarmMsg(row) {
            this.$api.get(`${alarmLeveUp}${row.id}`, {}).then((res) => {
                console.log(res);
                this.showMsg("接警成功" + res);
            });
        },
        viewPlan(row) {
            this.$api
                .get(
                    `${alarmPlanList}${row.line}/${row.station}/${row.position}/${row.name}`,
                    {}
                )
                .then((res) => {
                    console.log(res);
                });
        },
        showMsg(msg) {
            this.$message({
                type: "success",
                message: msg,
            });
        },
        handleClick() {},
        wsConnect() {
            console.log(`报警 ${localWSurl} 已连接`);
        },
        wsError(e) {
            console.log(`报警 ${localWSurl} 连接错误`);
            console.error(e);
        },
        wsClose() {
            console.log(`报警 ${localWSurl} 连接已断开`);
        },
        wsMessage(res) {
            if (res && res.data) {
                if (res.data === "连接成功") {
                    return;
                }
                try {
                    let data = JSON.parse(res.data);
                    if (data && data.listWarningData) {
                        this.origin_realdata = data.listWarningData;
                        this.queryReal();
                        this.origin_historydata = this.origin_realdata;
                        this.queryHistory();
                        this.doingdata = this.origin_realdata.filter((item) => {
                            return item.eventProgress;
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        },
    },
};
</script>

<style scoped>
.alarm-panel {
    height: 100%;
}

.history {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
.history > .tools {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
}
.history > .tools > .query {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
.history > .tools > p {
    color: #2281da;
    font-size: 1.3rem;
    font-weight: bold;
}
.history > .data {
    flex: 1;
    padding: 5px;
}
.data > .table {
    background: transparent;
    color: aliceblue;
}

.tab /deep/ .el-tabs__item {
    font-size: 1.3rem;
    color: white;
}

.tab /deep/ .is-active {
    color: #2281da !important;
}

.data /deep/ .el-table,
.el-table__expanded-cell {
    background-color: transparent;
}

.data /deep/ .el-table tr {
    background-color: transparent !important;
}
.data /deep/ .el-table tr:hover {
    color: #999;
}
.data /deep/ .el-table--enable-row-transition .el-table__body td,
.el-table .cell {
    background-color: transparent;
}
</style>
