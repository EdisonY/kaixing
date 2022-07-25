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
                                    v-model="historyquery"></el-input>
                                <el-button type="primary"
                                    size="mini"
                                    @click="query">查询</el-button>
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
                                <el-table-column prop="d1"
                                    label="编号"
                                    align="center"
                                    width="80">
                                </el-table-column>
                                <el-table-column prop="d2"
                                    label="类型"
                                    sortable
                                    align="center">
                                </el-table-column>
                                <el-table-column prop="d3"
                                    label="级别"
                                    sortable
                                    align="center">
                                </el-table-column>
                                <el-table-column prop="d4"
                                    label="线路"
                                    sortable
                                    align="center">
                                </el-table-column>
                                <el-table-column prop="d5"
                                    label="车站"
                                    sortable
                                    align="center">
                                </el-table-column>
                                <el-table-column prop="d6"
                                    label="具体位置"
                                    sortable
                                    align="center">
                                </el-table-column>
                                <el-table-column prop="d7"
                                    label="时间"
                                    sortable
                                    align="center">
                                </el-table-column>
                                <el-table-column prop="d8"
                                    label="详情"
                                    align="center">
                                </el-table-column>
                                <el-table-column prop="d9"
                                    label="备注"
                                    align="center">
                                </el-table-column>
                                <el-table-column prop="d11"
                                    label="操作"
                                    align="center">
                                    <template slot-scope="scope">
                                        <el-button v-if="scope.row.d11 == 1"
                                            type="primary"
                                            size="mini"
                                            style="margin:5px;width:80px">确认</el-button>
                                        <el-button v-if="scope.row.d11 == 1"
                                            type="primary"
                                            size="mini"
                                            style="margin:5px;width:80px">接警事件</el-button>
                                        <el-button v-if="scope.row.d11 == 2"
                                            type="primary"
                                            size="mini"
                                            style="margin:5px;width:80px;height:60px">查看预案</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div style="text-align:center;padding:20px">
                            <el-button type="primary"
                                @click="showMsg('报警事件已保存')">保 存</el-button>
                            <el-button type="primary"
                                @click="showMsg('填报成功')">填 报</el-button>
                            <el-button type="primary"
                                @click="viewhistory=true;reset()">历史查询</el-button>
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
                        @click="query">查询</el-button>
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
                    <el-table-column prop="d1"
                        label="编号"
                        align="center"
                        width="80">
                    </el-table-column>
                    <el-table-column prop="d2"
                        label="类型"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="d3"
                        label="级别"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="d4"
                        label="线路"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="d5"
                        label="车站"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="d6"
                        label="具体位置"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="d7"
                        label="时间"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="d8"
                        label="详情"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="d9"
                        label="备注"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="d10"
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
import { mockHistory } from "./alarmData";
export default {
    name: "comprehensive",
    data() {
        return {
            viewhistory: false,
            historyquery: "",
            historydata: mockHistory,
            activeName: "tab1",
        };
    },
    created() {},
    computed: {},
    mounted() {},
    methods: {
        query() {
            this.historydata = mockHistory.filter((i) => {
                return (
                    i.d2.indexOf(this.historyquery) > -1 ||
                    i.d3.indexOf(this.historyquery) > -1 ||
                    i.d4.indexOf(this.historyquery) > -1 ||
                    i.d5.indexOf(this.historyquery) > -1 ||
                    i.d6.indexOf(this.historyquery) > -1 ||
                    i.d8.indexOf(this.historyquery) > -1 ||
                    i.d10.indexOf(this.historyquery) > -1
                );
            });
        },
        reset() {
            this.historyquery = "";
            this.historydata = mockHistory;
        },
        showMsg(msg) {
            this.$message({
                type: "success",
                message: msg,
            });
        },
        handleClick() {},
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
