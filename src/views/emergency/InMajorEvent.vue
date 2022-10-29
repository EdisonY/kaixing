<template>
    <div class="component-page page"
        style="color:#fff">
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
                        <Comprehensive style="height:calc(100vh - 160px);"
                            v-if="currentView == '2D线网图'" />
                        <div style="height:100%;width:100%"
                            v-if="currentView == '客流监视及滚动预测'">
                            <echarts1 ref="chart1"
                                style="height:50%" />
                            <echarts2 ref="chart2"
                                style="height:50%" />
                        </div>
                        <div style="height:100%;width:100%; padding: 5px;"
                            v-if="currentView == '客流波动及处置措施'">
                            <div v-if="currentFlowModule=='left'">
                                <p class="bluetitle"
                                    style="margin:10px 0">
                                    客流分析
                                </p>
                                <table class="flowanalisys-table">
                                    <tbody>
                                        <tr class="header">
                                            <th>实际进站量</th>
                                            <th>实际疏散时间</th>
                                            <th>所需列车数</th>
                                        </tr>
                                        <tr>
                                            <th>{{FlowAnalysis.actualNum}}人</th>
                                            <th>{{FlowAnalysis.actualTimeRange}}</th>
                                            <th>{{FlowAnalysis.trainNum}}</th>
                                        </tr>
                                    </tbody>
                                </table>
                                <p style="height:500px;text-align:center;padding: 10px;background: #2225;">
                                    <echarts2 ref="chart22"
                                        style="height:100%" />
                                </p>
                                <p style="margin:20px 0">
                                    <span class="bluetitle"
                                        style="padding-top: 2px;margin-right:30px">行车员执行级别</span>
                                    <el-radio-group v-model="oplevel"
                                        size="mini">
                                        <el-radio-button label="升级"></el-radio-button>
                                        <el-radio-button label="降级"></el-radio-button>
                                    </el-radio-group>
                                </p>
                                <p style="margin:20px 0">
                                    <span class="bluetitle"
                                        style="padding-top: 2px;margin-right:30px">建议处置措施</span>
                                    <el-radio-group v-model="adjuststep"
                                        size="mini">
                                        <el-radio-button label="行车"></el-radio-button>
                                        <el-radio-button label="车站"></el-radio-button>
                                    </el-radio-group>
                                </p>
                                <div v-if="adjuststep=='行车'">
                                    <table class="flowanalisys-table">
                                        <tbody>
                                            <tr class="header">
                                                <th :rowspan="Train.length+1">行车</th>
                                                <th>起止时间</th>
                                                <th>计划间隔(s)</th>
                                                <th>系统建议间隔(s)</th>
                                                <th>线路能力(s)</th>
                                                <th>调整时间(s)</th>
                                            </tr>
                                            <tr v-for="(item,index) in Train"
                                                :key="index">
                                                <th>{{item.timeRange}}</th>
                                                <th>{{item.planInterval}}</th>
                                                <th>{{item.suggestInterval}}</th>
                                                <th>{{item.lineAbility}}</th>
                                                <th><input type="text"
                                                        class="innerinput"
                                                        :value="item.adjustInterval"></th>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p style="margin:10px 0">
                                        <el-button type="primary"
                                            @click="currentFlowModule='right'">详细调整</el-button>
                                    </p>
                                </div>
                                <div v-if="adjuststep=='车站'">
                                    <table class="flowanalisys-table">
                                        <tbody>
                                            <tr class="header">
                                                <th>时间</th>
                                                <th>位置</th>
                                                <th>风险现象</th>
                                                <th>建议措施</th>
                                            </tr>
                                            <tr v-for="(item,index) in Risk"
                                                :key="index">
                                                <th>{{item.timeRange}}</th>
                                                <th>{{item.position}}</th>
                                                <th>{{item.risk}}</th>
                                                <th>{{item.measure}}</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <p style="margin:10px 0;float: right;">
                                    <el-button type="primary"
                                        @click="btnClick('已下发')">下发</el-button>
                                </p>
                            </div>
                            <div v-if="currentFlowModule=='right'">

                                <p>
                                    <el-button type="primary"
                                        size="mini"
                                        @click="currentFlowModule='left'">返回</el-button>
                                </p>
                                <el-row class="row steps steps1">
                                    <el-col :span="24">
                                        <span class="inner-title">交路方案选择</span>
                                    </el-col>
                                    <el-col :span="24">&nbsp;</el-col>
                                    <el-col :span="24">
                                        <el-table ref="multipleTable"
                                            :data="tableData"
                                            class="componentTable"
                                            @selection-change="handleSelectionChange"
                                            style="width: 100%">
                                            <el-table-column type="selection"
                                                width="55">
                                            </el-table-column>
                                            <el-table-column label="交路方案"
                                                header-align="left"
                                                prop="name">
                                                <template slot-scope="scope">
                                                    <p>{{scope.row.name}}</p>
                                                    <p>{{scope.row.name1}}</p>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </el-col>
                                    <el-col :span="24">&nbsp;</el-col>
                                    <el-col :span="24">
                                        <el-button size="mini"
                                            type="primary"
                                            class="rightConfig"
                                            @click="kxfa = true"
                                            style="float:right;"
                                            v-if="multipleSelection.length > 0">生成开行方案</el-button>
                                    </el-col>
                                    <div v-if="kxfa">
                                        <el-col :span="24">&nbsp;</el-col>
                                        <el-col :span="24">
                                            <span class="inner-title">开行方案 7号线2022年12月24日重大活动保障开行方案01</span>
                                        </el-col>
                                        <el-col :span="24">&nbsp;</el-col>
                                        <el-col :span="24">
                                            <el-table :data="tableData1"
                                                class="componentTable"
                                                style="width: 100%">
                                                <el-table-column label="起止时间"
                                                    align="left"
                                                    width="240"
                                                    prop="id">
                                                </el-table-column>
                                                <el-table-column label="交路方案"
                                                    align="center">
                                                    <template slot-scope="scope">
                                                        <el-select v-model="scope.row.jiaolu"
                                                            class="inputS inputS_B"
                                                            placeholder="请选择"
                                                            style="width:200px">
                                                            <el-option v-for="item in options1"
                                                                :key="item.value"
                                                                :label="item.label"
                                                                :value="item.value">
                                                            </el-option>
                                                        </el-select>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column label="跳停车站"
                                                    align="center">
                                                    <template slot-scope="scope">
                                                        <el-select v-model="scope.row.tiaoting"
                                                            class="inputS"
                                                            placeholder="请选择"
                                                            style="text-align: center;">
                                                            <el-option v-for="item in options2"
                                                                :key="item.value"
                                                                :label="item.label"
                                                                :value="item.value">
                                                            </el-option>
                                                        </el-select>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column label="编组信息"
                                                    align="center"
                                                    prop="bianzu">
                                                </el-table-column>
                                                <el-table-column label="需求列数"
                                                    align="center"
                                                    prop="xuqiu">
                                                </el-table-column>
                                                <el-table-column label="开行列数"
                                                    align="center"
                                                    prop="kaixing">
                                                    <template slot-scope="scope">
                                                        <el-input class="inputS"
                                                            v-model="scope.row.kaixing"></el-input>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                        </el-col>
                                    </div>

                                </el-row>
                            </div>
                        </div>
                        <div style="height:100%;width:100%"
                            v-if="currentView == '运行图调整'">
                            <iframe style="width: 100%;height: 33%;"
                                src="http://172.51.216.64/sdss/tc2.html?name=7号线缩略图.png"
                                frameborder="0"></iframe>


                            <rungraph style="width:100%;height:66%"/>

                            <!-- <iframe style="width: 100%;height: 33%;"
                                src="http://172.51.216.72:41003/#/common?rowHeight=120&viewTime=25200&linename=计划运行图"
                                frameborder="0"></iframe>
                            <iframe style="width: 100%;height: 33%;"
                                src="http://172.51.216.72:41003/#/common?rowHeight=120&viewTime=25200&linename=调整后运行图"
                                frameborder="0"></iframe> -->
                        </div>
                        <div style="height:100%;width:100%;padding:10px"
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
                            <p style="margin:10px 0;line-height:2rem;font-size:1.2rem">
                                2022年12月24日保障环球影城夜场活动，7号线加开3列临客，八通线加开2列临客，涉及65个车站，处置时长2小时25分03秒，共服务旅客<span style="color:red">56095</span>人，无人员伤亡，无设备损失。
                            </p>
                        </div>
                        <div style="height:100%;width:100%"
                            v-if="currentView == '外部URL'">
                            <iframe ref="outframe"
                                style="height:100%;width:100%"
                                frameborder="0"></iframe>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col class="flex-col"
                :span="5">
                <message-panel title="消息列表"
                    v-on:add="_addMsg"
                    :messagelist="messagelist" />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import MessagePanel from "./components/MessagePanel";

import rungraph from "./components/rungraph/rungraph";
import FlowDiagram from "./components/FlowDiagram";
import Comprehensive from "../line/comprehensive";
import echarts1 from "../20221008/components/echarts1";
import echarts2 from "../20221008/components/echarts2";
import { getFlowData } from "./flowdata";
import { mockMessage } from "./mockdata";

export default {
    components: {
        MessagePanel,
        FlowDiagram,
        Comprehensive,
        echarts1,
        echarts2,
        rungraph,
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
            this._mockMsg("开始");
        }

        this.getRemoteData();
    },
    data() {
        return {
            emergencyName: "",
            flowdata: [],
            messagelist: [],
            currentMainBtn: "",
            currentSubBtn: "",
            currentView: "2D线网图",
            FlowAnalysis: {
                actualTimeRange: "22:00-23:00",
                actualNum: 25000,
                trainNum: 14,
            },
            Train: [
                {
                    id: 0,
                    timeRange: "string",
                    planInterval: 0,
                    suggestInterval: 0,
                    lineAbility: 0,
                    adjustInterval: 0,
                },
            ],
            Risk: [
                {
                    timeRange: "17:00",
                    position: "进站口",
                    risk: "陆续散场游客增多",
                    measure: "提前摆放铁马",
                },
                {
                    timeRange: "19:00",
                    position: "站厅",
                    risk: "外阜游客在扶梯前聚集",
                    measure: "组织志愿者引导7号线/八通线分流",
                },
            ],
            oplevel: "升级",
            adjuststep: "行车",
            currentFlowModule: "left",
            remoteTimer: null,
            kxfa: false,
            multipleSelection: [],
            tableData: [
                {
                    id: "05:00:00 - 07:00:00",
                    name: "环球度假区-北京西站 跳停车站：无 编组信息：8B 交路比例：无",
                },
                {
                    id: "07:00:00 - 09:00:00",
                    name: "交路1：环球度假区-北京西站 跳停车站：无 编组信息：8B",
                    name1: "交路2：焦化厂-北京西站 跳停车站：无 编组信息：8B 交路比例：1：1",
                },
                {
                    id: "09:00:00 - 11:00:00",
                    name: "交路1：环球度假区-北京西站 跳停车站：无 编组信息：8B",
                    name1: "交路2：高楼金-北京西站 跳停车站：无 编组信息：8B 交路比例：2：1",
                },
            ],
            tableData1: [
                {
                    id: "05:00:00 - 07:00:00",
                    bianzu: "8B",
                    kaixing: "20",
                    xuqiu: 20,
                    jiaolu: 0,
                    tiaoting: 0,
                },
                {
                    id: "07:00:00 - 09:00:00",
                    bianzu: "8B",
                    kaixing: "20",
                    xuqiu: 20,
                    jiaolu: 0,
                    tiaoting: 0,
                },
                {
                    id: "09:00:00 - 11:00:00",
                    bianzu: "8B",
                    kaixing: "20",
                    xuqiu: 20,
                    jiaolu: 0,
                    tiaoting: 0,
                },
                {
                    id: "11:00:00 - 13:00:00",
                    bianzu: "8B",
                    kaixing: "20",
                    xuqiu: 20,
                    jiaolu: 0,
                    tiaoting: 0,
                },
                {
                    id: "13:00:00 - 15:00:00",
                    bianzu: "8B",
                    kaixing: "20",
                    xuqiu: 20,
                    jiaolu: 0,
                    tiaoting: 0,
                },
                {
                    id: "15:00:00 - 17:00:00",
                    bianzu: "8B",
                    kaixing: "20",
                    xuqiu: 20,
                    jiaolu: 0,
                    tiaoting: 0,
                },
                {
                    id: "17:00:00 - 19:00:00",
                    bianzu: "8B",
                    kaixing: "20",
                    xuqiu: 20,
                    jiaolu: 0,
                    tiaoting: 0,
                },
                {
                    id: "19:00:00 - 21:00:00",
                    bianzu: "8B",
                    kaixing: "20",
                    xuqiu: 20,
                    jiaolu: 0,
                    tiaoting: 0,
                },
            ],
            options2: [
                {
                    label: "北京西站",
                    value: 0,
                },
                {
                    label: "湾子站",
                    value: 1,
                },
                {
                    label: "达官营站",
                    value: 2,
                },
                {
                    label: "广安门内站",
                    value: 3,
                },
                {
                    label: "菜市口站",
                    value: 4,
                },
                {
                    label: "虎坊桥站",
                    value: 5,
                },
                {
                    label: "珠市口站",
                    value: 6,
                },
                {
                    label: "桥湾站",
                    value: 7,
                },
                {
                    label: "磁器口站",
                    value: 8,
                },
                {
                    label: "广渠门内站",
                    value: 9,
                },
                {
                    label: "广渠门外站",
                    value: 10,
                },
            ],
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
        _addMsg(msg) {
            let data = {
                name: "总调",
                content: msg,
                time: this.$getCurrentDate2(),
                right: true,
            };
            this.messagelist.push(data);
        },
        changeWorkArea(scene) {
            // let outaddress = "http://frp.funenc.xyz:7245/";
            this.currentView = "外部URL";
            this.$nextTick(() => {
                if (scene == "客流-网") {
                    this.$refs.outframe.src = `http://frp.funenc.xyz:7245/link/iFDeE8us`;
                } else if (scene === "客流-线") {
                    this.$refs.outframe.src = `http://frp.funenc.xyz:7245/link/kdHtibMs`;
                } else if (scene === "客流-站") {
                    this.$refs.outframe.src = `http://frp.funenc.xyz:7245/link/DqAzVYn3`;
                } else if (scene === "客流-车") {
                    this.$refs.outframe.src = `http://frp.funenc.xyz:7245/link/V0sEA5CS`;
                } else if (scene === "行车-运行图") {
                    // this.$refs.outframe.src = `http://172.51.216.72:41003/#/common?rowHeight=120&viewTime=25200`;
                    this.$refs.outframe.src=`http://172.51.216.64/sdss/tc.html?name=2-平行推演.png`;
                } else if (scene === "行车-正线") {
                    // this.$refs.outframe.src = `http://172.51.216.72:41005/sample`;
                    this.$refs.outframe.src = `http://172.51.216.64/sdss/tc2.html?name=7号线缩略图.png`;
                } else if (scene === "行车-段场") {
                    this.$refs.outframe.src = `http://172.51.216.64/sdss/tc.html?name=平面图-场.png`;
                } else if (scene === "其他-车站平面图") {
                    this.$refs.outframe.src = `http://172.51.216.64/sdss/tc.html?name=平面图-站.png`;
                } else if (scene === "其他-视频画面") {
                    this.$refs.outframe.src = `http://172.51.216.64/sdss/tc.html?name=视频画面.png`;
                } else if (scene === "周边-天气" || scene === "周边-路况") {
                    this.$refs.outframe.src = `http://172.51.216.64/sdss/tc.html?name=${scene}.png`;
                }
            });
        },
        flowNext(model, cellview) {
            this.currentMainBtn = model.evt;
            if (this.currentMainBtn == "开始") {
                this.currentView = "2D线网图";
            } else if (this.currentMainBtn == "客流监视及\n滚动预测") {
                this.currentView = "客流监视及滚动预测";
                this.$nextTick(() => {
                    // 获取图表数据
                    this._getRemoteChart1Data();
                    this._getRemoteChart2Data();
                });
            } else if (this.currentMainBtn == "客流波动及\n处置措施") {
                this.currentView = "客流波动及处置措施";
                this.$nextTick(() => {
                    // 获取图表数据
                    this._getRemoteChart2Data();
                });
            } else if (this.currentMainBtn == "运行图调整") {
                this.currentView = "运行图调整";
            } else if (this.currentMainBtn == "保障方案实施") {
                this.currentView = "客流监视及滚动预测";
                this.$nextTick(() => {
                    // 获取图表数据
                    this._getRemoteChart1Data();
                    this._getRemoteChart2Data();
                });
            } else if (this.currentMainBtn == "方案结束判断") {
                // this.currentView='客流波动及处置措施';
                this.currentView = "外部URL";
                this.$nextTick(() => {
                    this.$refs.outframe.src = `http://frp.funenc.xyz:7245/link/2EUrUWHw`;
                });
            } else if (this.currentMainBtn == "统计数据\n撰写简报") {
                this.currentView = "数据简报";
            } else if (this.currentMainBtn == "结束") {
                this.currentView = "2D线网图";
                sessionStorage.removeItem(this.emergencyName);
                sessionStorage.removeItem(`${this.emergencyName}-time`);
            }

            this._mockMsg(this.currentView);
        },
        btnClick(msg) {
            this.$message({
                message: msg,
                type: "success",
            });
        },
        getRemoteData() {
            let self = this;
            // 行车数据
            this.$api.get("/Middle/Measure/Train").then((res) => {
                console.log("(*^_^*) train data");
                if (res.status == 200) {
                    self.Train = res.data;
                }
            });

            // 客流分析数据
            this.$api.get("/Middle/FlowAnalysis/1").then((res) => {
                console.log("(*^_^*) flowanalysis data");
                if (res.status == 200) {
                    self.FlowAnalysis = res.data;
                }
            });

            // 车站数据
            this.$api.get("/Middle/Measure/Station/环球度假区").then((res) => {
                console.log("(*^_^*) station data");
                if (res.status == 200) {
                    self.Risk = res.data;
                }
            });

            // 周期获取图表数据
            clearInterval(self.remoteTimer);
            self.remoteTimer = setInterval(() => {
                if (
                    self.currentView == "保障方案实施" ||
                    self.currentView == "客流波动及处置措施" ||
                    self.currentView == "客流监视及滚动预测"
                ) {
                    this._getRemoteChart1Data();
                    this._getRemoteChart2Data();
                }
            }, 5000);
        },
        _getRemoteChart1Data() {
            let self = this;
            this.$api.get("/Middle/FlowChart1/7号线").then((res) => {
                if (res.status == 200) {
                    if (res.data && res.data.length > 1) {
                        let x, linered, lineyellow, linegreen, stackgreen;
                        res.data.forEach((d) => {
                            if (d.flowName == "实际断面客流") {
                                stackgreen = d.flowDetails.map((m) => {
                                    return m.value;
                                });
                            } else if (d.flowName == "预测断面客流") {
                                linered = d.flowDetails.map((m) => {
                                    return m.value;
                                });
                            } else if (d.flowName == "计划运力") {
                                linegreen = d.flowDetails.map((m) => {
                                    return m.value;
                                });
                                x = d.flowDetails.map((m) => {
                                    return m.timeName;
                                });
                            } else if (d.flowName == "预测运力") {
                                lineyellow = d.flowDetails.map((m) => {
                                    return m.value;
                                });
                            }
                        });

                        if (self.$refs.chart1) {
                            self.$refs.chart1.setData({
                                x,
                                linered,
                                lineyellow,
                                linegreen,
                                stackgreen,
                            });
                        }
                    }
                }
            });
        },
        _getRemoteChart2Data() {
            let self = this;
            this.$api.get("/Middle/FlowChart2/环球度假区").then((res) => {
                if (res.status == 200) {
                    if (res.data && res.data.length > 1) {
                        let x, lineyellow, linered, bar, barblock;
                        res.data.forEach((d) => {
                            if (d.flowName == "已经发生的进站量") {
                                bar = d.flowDetails.map((m) => {
                                    return m.value;
                                });
                            } else if (d.flowName == "实际滚动预测进站量") {
                                barblock = d.flowDetails.map((m) => {
                                    return m.value;
                                });
                            } else if (d.flowName == "离线预测进站量") {
                                lineyellow = d.flowDetails.map((m) => {
                                    return m.value;
                                });
                            } else if (d.flowName == "历史峰值") {
                                linered = d.flowDetails.map((m) => {
                                    return m.value;
                                });
                                x = d.flowDetails.map((m) => {
                                    return m.timeName;
                                });
                            }
                        });

                        if (self.$refs.chart2) {
                            self.$refs.chart2.setData({
                                x,
                                lineyellow,
                                linered,
                                bar,
                                barblock,
                            });
                        }
                        if (self.$refs.chart22) {
                            self.$refs.chart22.setData({
                                x,
                                lineyellow,
                                linered,
                                bar,
                                barblock,
                            });
                        }
                    }
                }
            });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
    },
};
</script>


<style scoped>
.page {
    height: calc(100vh - 60px);
    box-sizing: border-box;
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
    height: 100%;
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
    color: #6eb5ff;
    font-size: 1.2rem;
}
.innerpanel {
    background: #1d1e39;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
}
.divline {
    height: 3px;
    background: #6eb5ff;
    margin-bottom: 5px;
}
.middle-panel {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    overflow: scroll;
}

.mainmenu {
    text-align: left;
    line-height: 40px;
}

.flowanalisys-table {
    width: 100%;
    border-left: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    border-spacing: 0;
}
.flowanalisys-table tr {
    line-height: 40px;
}
.flowanalisys-table tr:hover,
.flowanalisys-table .thead {
    background-color: #fff4;
}
.flowanalisys-table tr td,
.flowanalisys-table tr th {
    border-right: 1px solid #ebeef5;
    border-top: 1px solid #ebeef5;
    text-align: center;
    position: relative;
}
.flowanalisys-table tr td label,
.flowanalisys-table tr th label {
    position: absolute;
    left: 5px;
}
.flowanalisys-table .header th {
    color: #fff;
    height: 30px;
    line-height: 30px;
    font-weight: bold;
    font-size: 16px;
}

.selfTable .header th {
    background: #5470c6;
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

div::-webkit-scrollbar {
    width: 0 !important;
}

.innerinput {
    color: #fff;
    border: solid #333 1px;
    width: 60%;
    margin: 10px;
    line-height: 30px;
    background: #0008;
}

.bluetitle {
    color: #5470c6;
    font-size: 1.3rem;
    font-weight: bold;
}

.step {
    position: relative;
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    padding: 40px 0;
}
.step::before {
    width: 100%;
    height: 1px;
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    background: #161e2e;
}
.step span {
    position: relative;
    z-index: 2;
    background: #000;
}
.step span i {
    width: 40px;
    height: 40px;
    display: inline-block;
    border-radius: 30px;
    vertical-align: middle;
    background: #000;
    border: 2px solid #a1a2a3;
    text-align: center;
    line-height: 36px;
    font-weight: bold;
    margin-right: 6px;
}
.step span.active {
    font-weight: bold;
    color: #fff;
}
.step span.active i {
    border-color: #f9ce4c;
    background: #f9ce4c;
    color: #000;
}

.step {
    position: relative;
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    padding: 40px 0;
}
.step::before {
    width: 100%;
    height: 1px;
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    background: #161e2e;
}
.step span {
    position: relative;
    z-index: 2;
    background: #000;
}
.step span i {
    width: 40px;
    height: 40px;
    display: inline-block;
    border-radius: 30px;
    vertical-align: middle;
    background: #000;
    border: 2px solid #a1a2a3;
    text-align: center;
    line-height: 36px;
    font-weight: bold;
    margin-right: 6px;
}
.step span.active {
    font-weight: bold;
    color: #fff;
}
.step span.active i {
    border-color: #f9ce4c;
    background: #f9ce4c;
    color: #000;
}

.steps {
    width: 90%;
    margin: 0 auto;
}
.final {
    text-align: center;
}

.subwayLine {
    width: 100%;
    overflow: auto;
}
.subwayLine img {
    height: 300px;
}

.steps1 {
    overflow-y: auto;
    height: calc(100vh - 260px);
    margin-bottom: 10px;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none;
}
.steps1::-webkit-scrollbar {
    display: none; /* Chrome Safari */
}
.steps1 ul {
    padding: 20px 0;
    text-align: center;
}
.steps1 ul li {
    border-bottom: 1px solid #131d29;
    height: 40px;
    line-height: 40px;
    position: relative;
}
.steps1 ul li span {
    color: #f9ce4c;
}
.steps1 ul li button {
    position: absolute;
    right: 10px;
    top: 5px;
}

.steps1 .yl {
    background: transparent;
}
.chart {
    height: 400px;
    padding: 5px;
    width: 100%;
}
</style>