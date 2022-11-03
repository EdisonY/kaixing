<template>
    <div class="component-page">
        <el-row class="row">
            <el-col :span="24">
                <div class="step">
                    <span :class="{'active':step >= 1}">
                        <i>1</i>
                        线路与客流选择
                    </span>
                    <span :class="{'active':step >= 2}">
                        <i>2</i>
                        开行方案设计
                    </span>
                    <span :class="{'active':step >= 3}">
                        <i>3</i>
                        本线验证结果
                    </span>
                    <span :class="{'active':step >= 4}">
                        <i>4</i>
                        全网验证
                    </span>
                </div>
            </el-col>
        </el-row>
        <el-row class="row steps steps1" v-show="step == 1">
            <el-col :span="24">
                <el-radio-group v-model="query.prange" class="inputS">
                    <el-radio label="7号线">7号线</el-radio>
                    <el-radio label="八通线">八通线</el-radio>
                    <el-radio label="其他线路">其他线路</el-radio>
                    <el-select 
                        :disabled="query.prange!='其他线路'"
                        v-model="query.stationid"
                        class="inputS"
                        placeholder="请选择">
                        <el-option v-for="(item,index) in optionsLine[0].options"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-radio-group>
            </el-col>
            <el-col :span="24">&nbsp;</el-col>
            <el-col :span="24">
                <span class="inner-title">客流预测方案</span>
                <el-select v-model="value" placeholder="请选择" class="inputS inputS_B">
                    <el-option
                    v-for="item in options"
                    :key="item.plan_id"
                    :label="item.plan_name"
                    :value="item.plan_name">
                    </el-option>
                </el-select>
                <el-button class="yushu" @click="xlysMain()">线路约束</el-button>
            </el-col>
            <el-col :span="24">&nbsp;</el-col>
            <el-col :span="24">
                <span class="inner-title">7号线缩略图</span>
            </el-col>
            <el-col :span="24">&nbsp;</el-col>
            <el-col :span="24">
                <div class="subwayLine">
                    <img src="@/assets/basie/line7.png" />
                </div>
            </el-col>
            <el-col :span="24">&nbsp;</el-col>
            <el-col :span="24">
                <div class="yl">
                    <!-- <iframe frameborder="0" width="100%" height="700" src="http://frp.funenc.xyz:7245/link/oTcnnEFV"></iframe> -->
                    <div class="chart" ref="echart"></div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="yl">
                    <div class="chart" ref="echart1"></div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="yl">
                    <div class="chart" ref="echart2"></div>
                </div>
            </el-col>
        </el-row>
        <el-row class="row steps steps1" v-show="step == 2">
            <el-col :span="24">
                <span class="inner-title">交路方案选择</span>
            </el-col>
            <el-col :span="24">&nbsp;</el-col>
            <el-col :span="24">
                <el-table
                ref="multipleTable"
                :data="tableData"
                class="componentTable"
                style="width: 100%">
                    
                    <el-table-column
                        label="起止时间"
                        header-align="left">
                        <template slot-scope="scope">
                            <el-time-select
                                class="inputS" 
                                placeholder="起始时间"
                                v-model="scope.row.startTime"
                                @change="scope.row.endTime = ''"
                                :picker-options="{
                                    start: '05:00',
                                    step: '00:15',
                                    end: '18:30'
                                }">
                            </el-time-select>
                            <el-time-select
                                class="inputS" 
                                placeholder="结束时间"
                                v-model="scope.row.endTime"
                                :picker-options="{
                                    start: '05:00',
                                    step: '00:15',
                                    end: '18:30',
                                    minTime: scope.row.startTime
                                }">
                            </el-time-select>

                        </template>
                    </el-table-column>
                    <el-table-column
                        label="交路方案"
                        header-align="left"
                        prop="name">
                        <template slot-scope="scope">
                            <p>{{scope.row.name}}</p>
                            <p>{{scope.row.name1}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        align="center"
                        width="200">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="dialogVisible1 = true">方案选择</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24">&nbsp;</el-col>
            <el-col :span="24">
                <el-button size="mini" type="primary" class="rightConfig" @click="suiji()" style="float:right;">生成开行方案</el-button>
            </el-col>
            <div>
                <el-col :span="24">&nbsp;</el-col>
                <el-col :span="24">
                    <span class="inner-title">开行方案 7号线2022年12月24日重大活动保障开行方案01</span>
                </el-col>
                <el-col :span="24">&nbsp;</el-col>
                <el-col :span="24">
                    <el-table
                    :data="tableData1"
                    class="componentTable"
                    style="width: 100%">
                        <el-table-column
                            label="起止时间"
                            align="left"
                            width="240"
                            prop="id">
                        </el-table-column>
                        <el-table-column
                            label="交路方案"
                            align="center">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.jiaolu" class="inputS inputS_B" placeholder="请选择" style="width:200px">
                                    <el-option v-for="item in options1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="跳停车站"
                            align="center">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.tiaoting" class="inputS" placeholder="请选择" style="text-align: center;">
                                    <el-option v-for="item in options2"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="编组信息"
                            align="center"
                            prop="bianzu">
                        </el-table-column>
                        <el-table-column
                            label="需求列数"
                            align="center"
                            prop="xuqiu">
                        </el-table-column>
                        <el-table-column
                            label="开行列数"
                            align="center"
                            prop="kaixing">
                            <template slot-scope="scope">
                                <el-input class="inputS" v-model="scope.row.kaixing"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-col :span="24">&nbsp;</el-col>
                    <el-col :span="24" style="text-align:right;">
                        <el-button size="mini" type="success" class="rightConfig" @click="save()" >保存</el-button>
                    </el-col>
                </el-col>
            </div>

        </el-row>
        <el-row class="row steps steps1" v-show="step == 3">
            <el-col :span="24">
                <span class="inner-title">本线验证结果</span>
            </el-col>
            <el-col :span="24">&nbsp;</el-col>
            <el-col :span="24">
                <el-table
                    :data="tableData2"
                    class="componentTable"
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="对比指标"
                        align="center"
                        width="180">
                    </el-table-column>
                    <!-- <el-table-column
                        prop="name"
                        label="告警数量"
                        align="center"
                        width="180">
                    </el-table-column> -->
                    <el-table-column
                        prop="address"
                        align="center"
                        label="告警持续时长">
                        <template slot-scope="scope">
                            {{scope.row.address}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="xinxi"
                        align="center"
                        label="告警位置">
                    </el-table-column>
                    <!-- <el-table-column
                        prop="duishu"
                        align="center"
                        label="告警持续时间">
                    </el-table-column> -->
                </el-table>
            </el-col>
        </el-row>
        <el-row class="row steps steps1" v-show="step == 4">
            
            <!-- <el-col :span="11">
                <span class="inner-title">客流预测方案</span>
                <el-select v-model="query.stationid" class="inputS" placeholder="请选择" style="margin-right:50px">
                    <el-option v-for="item in stations"
                        :key="item.stationid"
                        :label="item.stationname"
                        :value="item.stationid">
                    </el-option>
                </el-select>
                <ul>
                    <li>
                        <span>1-八通线客流信息-常规预测</span>
                    </li>
                    <li>2号线客流信息</li>
                    <li>3号线客流信息</li>
                    <li>4号线客流信息</li>
                    <li>5号线客流信息</li>
                    <li>6号线客流信息</li>
                    <li>
                        <span>7号线客流信息-常规预测</span>
                    </li>
                    <li>9号线客流信息</li>
                    <li>10号线客流信息</li>
                    <li>11号线客流信息</li>
                    <li>13号线客流信息</li>
                </ul>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
                <span class="inner-title">客流预测方案</span>

                <el-select v-model="query.stationid" class="inputS"
                    placeholder="请选择">
                    <el-option v-for="item in stations"
                        :key="item.stationid"
                        :label="item.stationname"
                        :value="item.stationid">
                    </el-option>
                </el-select>
                <ul>
                    <li>
                        <span>1-八通线开行方案-常规预测</span>
                        <el-button size="mini" type="warning" style="float:right;">方案下发</el-button>
                    </li>
                    <li>2号线工作日运行图</li>
                    <li>3号线工作日运行图</li>
                    <li>4号线工作日运行图</li>
                    <li>5号线工作日运行图</li>
                    <li>6号线工作日运行图</li>
                    <li>
                        <span>7号线开行方案-常规预测</span>
                        <el-button size="mini" type="warning" style="float:right;">方案下发</el-button>
                    </li>
                    <li>8号线工作日运行图</li>
                    <li>9号线工作日运行图</li>
                    <li>10号线工作日运行图</li>
                    <li>11号线工作日运行图</li>
                </ul>
            </el-col> -->
            <el-col :span="24">
                <el-table
                    :data="tableData3"
                    class="componentTable"
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="线路名称"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="线路关系"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        align="center"
                        label="运行图名称">
                        <template slot-scope="scope">

                            <el-select v-model="scope.row.address" class="inputS inputS_B" placeholder="请选择" style="width:200px">
                                <el-option v-for="item in scope.row.option"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>

                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="xinxi"
                        align="center"
                        label="是否调整">
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24">&nbsp;</el-col>
            <el-col :span="24" style="text-align:right;">
                <el-button type="primary" v-if="step == 4" @click="download()">导出全部线路</el-button>
                <el-button type="primary" v-if="step == 4" @click="download()">导出调整线路</el-button>
                <el-button size="mini" type="success" class="rightConfig" @click="centerDialogVisible1 = true">启动全网验证</el-button>
            </el-col>
            
        </el-row>

        <el-row class="row steps final">
            <el-col :span="24">
                <el-button type="primary" class="rightConfig" @click="stepNext(0)" v-if="step > 1">上一步</el-button>
                <el-button type="primary" class="rightConfig" @click="stepNext(1)" v-if="step > 0 && step < 4">下一步</el-button>
                <!-- <el-button type="primary" class="rightConfig" v-if="step == 4">客运组织方案设计</el-button> -->
            </el-col>
        </el-row>
        <el-dialog
            title="线路约束"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <ul>
                <li>
                    <span>系统设计最小运营间隔(s)</span>{{xlys.minSpanDesign}}
                </li>
                <li>
                    <span>实际最小运营间隔(s)</span>{{xlys.minSpanActual}}
                </li>
                <li>
                    <span>编组</span>{{xlys.groupType}}
                </li>
                <li>
                    <span>全周转时长</span>{{xlys.cycleTime}}
                </li>
                <li>
                    <span>备车数量(列)</span>{{xlys.trainNum}}
                </li>
            </ul>
        </el-dialog>
        <el-dialog
            title="全网验证"
            :visible.sync="centerDialogVisible1"
            width="50%"
            center>
            <el-row>
                <el-col :span="24">
                    <el-table
                        :data="tableData2"
                        class="componentTable"
                        style="width: 100%">
                        <el-table-column
                            prop="date"
                            label="对比指标"
                            align="center"
                            width="180">
                            <template slot-scope="scope">
                                <!-- <el-link v-if="scope.row.date == '站台滞留人数告警'" type="danger" @click="showAlert(scope.row)">{{ scope.row.date }}</el-link> -->
                                <span>{{ scope.row.date }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="告警数量"
                            align="center"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            align="center"
                            label="告警持续时长">
                        </el-table-column>
                        <el-table-column
                            prop="xinxi"
                            align="center"
                            label="告警位置">
                        </el-table-column>
                        <el-table-column
                            prop="duishu"
                            align="center"
                            label="告警持续时间">
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-dialog>

        <el-dialog
        title="选择交路方案详情"
        :visible.sync="dialogVisible1"
        width="60%"
        class="detailDia"
        center
        :before-close="handleClose">
            <div class="imitate">
                <h2>
                    <strong>方案单选</strong>
                    <strong>序号</strong>
                    <strong style="width:28%">交路选择</strong>
                    <strong>跳停车站</strong>
                    <strong>编组信息</strong>
                    <strong>交路比例</strong>
                </h2>

                <p v-for="item in detailsData" :key="item.data">
                    <strong v-if="item.name">
                        <el-radio v-model="radio" :label="item.date"></el-radio>
                        <!-- {{item.date}} -->
                    </strong>
                    <strong v-if="item.name">{{item.name}}</strong>
                    <strong v-if="item.name">{{item.address}}</strong>
                    <strong v-if="item.name">{{item.station}}</strong>
                    <strong v-if="item.name">{{item.message}}</strong>
                    <strong v-if="item.name" style="width:28%">
                        <el-input class="inputS inputS_B" v-model="item.bili"></el-input>
                    </strong>

                    <strong v-if="item.children">
                        <el-radio v-model="radio" :label="item.date"></el-radio>
                        <!-- {{item.date}} -->
                    </strong>
                    <strong v-if="item.children">
                        <b v-for="items in item.children" :key="items">{{items.name}}</b>
                    </strong>
                    <strong v-if="item.children">
                        <b v-for="items in item.children" :key="items">{{items.address}}</b>
                    </strong>
                    <strong v-if="item.children">
                        <b v-for="items in item.children" :key="items">{{items.station}}</b>
                    </strong>
                    <strong v-if="item.children">
                        <b v-for="items in item.children" :key="items">{{items.message}}</b>
                    </strong>
                    <strong v-if="item.children" style="width:28%">
                        <el-input class="inputS inputS_B" v-model="item.bili"></el-input>
                    </strong>
                </p>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
const option1 = {
    grid: {
        left: 40,
        top: 50,
        right: 0,
        bottom: 70,
    },
    title: {
        text: "",
        textStyle: {
            color: "#fff",
        },
        left: -5,
    },
    backgroundColor: "",
    tooltip: {},
    xAxis: {
        axisLabel: {
            show: true,
            textStyle: {
                color: "#fff",
            },
            rotate: 45,
        },
        data: [],
        axisLine: { onZero: true },
        splitLine: { show: false },
        splitArea: { show: false },
    },
    yAxis: {
        axisLabel: {
            show: true,
            textStyle: {
                color: "#fff",
            },
        },
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: {show: false},
        splitArea: {show: false}
    },
    series: [
        {
            type: "bar",
            barWidth:'50%',
            data: [],
            itemStyle: {
                color: "#5470c6",
                barBorderRadius: [6, 6, 0, 0],
            },
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(48, 56, 69, 0.4)',
                barBorderRadius: [6, 6, 0, 0],
            },
        },
    ],
};
export default {
    name: "nav01",
    data() {
        return {
            xlys:{
                minSpanDesign:'',
                minSpanActual:'',
                groupType:'',
                cycleTime:'',
                trainNum:''
            },
            optionsLine: [{
                label: '线路',
                options: []
                }, {
                label: '车站',
                options: []}
            ],
            qwyz:false,
            kxfa:false,
            centerDialogVisible:false,
            centerDialogVisible1:false,
            dialogVisible1:false,
            stations: [],
            lineList: [],
            query: {
                stationid: "",
                ptype: "",
                prange: "7号线",
                prange_date: "",
            },
            selectedLine: "",
            options: [],
            options1:[{
                label:'环球度假区-北京西站',
                value:0
            },{
                label:'焦化厂-北京西站',
                value:1
            },{
                label:'高楼金-北京西站',
                value:2
            },{
                label:'焦化厂-环球度假区',
                value:3
            },{
                label:'北京西站-焦化厂',
                value:4
            }],
            options2:[{
                label:'北京西站',
                value:0
            },{
                label:'湾子站',
                value:1
            },{
                label:'达官营站',
                value:2
            },{
                label:'广安门内站',
                value:3
            },{
                label:'菜市口站',
                value:4
            },{
                label:'虎坊桥站',
                value:5
            },{
                label:'珠市口站',
                value:6
            },{
                label:'桥湾站',
                value:7
            },{
                label:'磁器口站',
                value:8
            },{
                label:'广渠门内站',
                value:9
            },{
                label:'广渠门外站',
                value:10
            }],
            value: '',
            step:1,
            tableData: [{
                startTime:'05:00',
                endTime:'07:00',
                name: '环球度假区-北京西站 跳停车站：无 编组信息：8B 交路比例：无',
            }, {
                startTime:'05:00',
                endTime:'07:00',
                name: '交路1：环球度假区-北京西站 跳停车站：无 编组信息：8B',
                name1:'交路2：焦化厂-北京西站 跳停车站：无 编组信息：8B 交路比例：1：1'
            }, {
                startTime:'05:00',
                endTime:'07:00',
                name: '交路1：环球度假区-北京西站 跳停车站：无 编组信息：8B',
                name1:'交路2：高楼金-北京西站 跳停车站：无 编组信息：8B 交路比例：2：1'
            }],
            tableData1:[{
                id: '05:00:00 - 07:00:00',
                bianzu:'8B',
                kaixing:'20',
                xuqiu:20,
                jiaolu:0,
                tiaoting:0
            },{
                id: '07:00:00 - 09:00:00',
                bianzu:'8B',
                kaixing:'20',
                xuqiu:20,
                jiaolu:0,
                tiaoting:0
            },{
                id: '09:00:00 - 11:00:00',
                bianzu:'8B',
                kaixing:'20',
                xuqiu:20,
                jiaolu:0,
                tiaoting:0
            },{
                id: '11:00:00 - 13:00:00',
                bianzu:'8B',
                kaixing:'20',
                xuqiu:20,
                jiaolu:0,
                tiaoting:0
            },{
                id: '13:00:00 - 15:00:00',
                bianzu:'8B',
                kaixing:'20',
                xuqiu:20,
                jiaolu:0,
                tiaoting:0
            },{
                id: '15:00:00 - 17:00:00',
                bianzu:'8B',
                kaixing:'20',
                xuqiu:20,
                jiaolu:0,
                tiaoting:0
            },{
                id: '17:00:00 - 19:00:00',
                bianzu:'8B',
                kaixing:'20',
                xuqiu:20,
                jiaolu:0,
                tiaoting:0
            },{
                id: '19:00:00 - 21:00:00',
                bianzu:'8B',
                kaixing:'20',
                xuqiu:20,
                jiaolu:0,
                tiaoting:0
            }],
            tableData2: [{
                date: '进站量告警',
                name: '1',
                address: '5min (22:53-22:58)',
                xinxi:'环球度假区站',
                duishu:'22:53-22:58'
            },{
                date: '进站量告警',
                name: '1',
                address: '5min (22:53-22:58)',
                xinxi:'环球度假区站',
                duishu:'22:53-22:58'
            },{
                date: '站台滞留人数告警',
                name: '2',
                address: '9min (22:56-22:05)',
                xinxi:'环球度假区站',
                duishu:'22:56-22:05'
            },{
                date: '站台滞留人数告警',
                name: '2',
                address: '9min (22:56-22:05)',
                xinxi:'环球度假区站',
                duishu:'22:56-22:05'
            },{
                date: '站台滞留超过一次告警',
                name: '17',
                address: '5min (22:53-22:58)',
                xinxi:'环球度假区站',
                duishu:'22:53-22:58'
            },{
                date: '分方向换成预测预警',
                name: '1',
                address: '3min (22:53-22:56)',
                xinxi:'环球度假区站',
                duishu:'22:53-22:56'
            },{
                date: '进站量告警',
                name: '1',
                address: '5min (22:53-22:58)',
                xinxi:'环球度假区站',
                duishu:'22:53-22:58'
            },{
                date: '分方向换成预测预警',
                name: '1',
                address: '3min (22:53-22:56)',
                xinxi:'环球度假区站',
                duishu:'22:53-22:56'
            },{
                date: '分方向换成预测预警',
                name: '1',
                address: '3min (22:53-22:56)',
                xinxi:'环球度假区站',
                duishu:'22:53-22:56'
            },{
                date: '区间满载率',
                name: '1',
                address: '5min (22:53-22:58)',
                xinxi:'环球度假区站',
                duishu:'22:53-22:58'
            },{
                date: '列车满载率',
                name: '1',
                address: '5min (22:53-22:58)',
                xinxi:'环球度假区站',
                duishu:'22:53-22:58'
            },{
                date: '进站量告警',
                name: '1',
                address: '5min (22:53-22:58)',
                xinxi:'环球度假区站',
                duishu:'22:53-22:58'
            }],
            tableData3: [{
                date: '7号线',
                name: '直接相关线路',
                address: '7号线PR2201',
                xinxi:'是',
                option:[{
                    label:'7号线PR2201',
                    value:'7号线PR2201'
                },{
                    label:'7号线PR2202',
                    value:'7号线PR2202'
                }]
            },{
                date: '1-八通线',
                name: '直接相关线路',
                address: '1-八通线PR2201',
                xinxi:'否',
                option:[{
                    label:'1-八通线PR2201',
                    value:'1-八通线PR2201'
                },{
                    label:'1-八通线PR2202',
                    value:'1-八通线PR2202'
                }]
            },{
                date: '2号线',
                name: '一次换乘',
                address: '2号线PR2201',
                xinxi:'否',
                option:[{
                    label:'2号线PR2201',
                    value:'2号线PR2201'
                },{
                    label:'2号线PR2202',
                    value:'2号线PR2202'
                }]
            },{
                date: '4号线-大兴线',
                name: '一次换乘',
                address: '4号线-大兴线PR2201',
                xinxi:'否',
                option:[{
                    label:'4号线-大兴线PR2201',
                    value:'4号线-大兴线PR2201'
                },{
                    label:'4号线-大兴线PR2202',
                    value:'4号线-大兴线PR2202'
                }]
            },{
                date: '5号线',
                name: '一次换乘',
                address: '5号线PR2201',
                xinxi:'否',
                option:[{
                    label:'5号线PR2201',
                    value:'5号线PR2201'
                },{
                    label:'5号线PR2202',
                    value:'5号线PR2202'
                }]
            },{
                date: '6号线',
                name: '一次换乘',
                address: '6号线PR2201',
                xinxi:'否',
                option:[{
                    label:'6号线PR2201',
                    value:'6号线PR2201'
                },{
                    label:'6号线PR2202',
                    value:'6号线PR2202'
                }]
            },{
                date: '8号线',
                name: '一次换乘',
                address: '8号线PR2201',
                xinxi:'否',
                option:[{
                    label:'8号线PR2201',
                    value:'8号线PR2201'
                },{
                    label:'8号线PR2202',
                    value:'8号线PR2202'
                }]
            },{
                date: '9号线',
                name: '一次换乘',
                address: '9号线PR2201',
                xinxi:'否',
                option:[{
                    label:'9号线PR2201',
                    value:'9号线PR2201'
                },{
                    label:'9号线PR2202',
                    value:'9号线PR2202'
                }]
            },{
                date: '10号线',
                name: '一次换乘',
                address: '10号线PR2201',
                xinxi:'否',
                option:[{
                    label:'10号线PR2201',
                    value:'10号线PR2201'
                },{
                    label:'10号线PR2202',
                    value:'10号线PR2202'
                }]
            },{
                date: '14号线',
                name: '一次换乘',
                address: '14号线PR2201',
                xinxi:'否',
                option:[{
                    label:'14号线PR2201',
                    value:'14号线PR2201'
                },{
                    label:'14号线PR2202',
                    value:'14号线PR2202'
                }]
            },{
                date: 'S1线',
                name: '一次换乘',
                address: 'S1线PR2201',
                xinxi:'否',
                option:[{
                    label:'S1线PR2201',
                    value:'S1线PR2201'
                },{
                    label:'S1线PR2202',
                    value:'S1线PR2202'
                }]
            },{
                date: '11号线',
                name: '多次换乘',
                address: '11号线PR2201',
                xinxi:'否',
                option:[{
                    label:'11号线PR2201',
                    value:'11号线PR2201'
                },{
                    label:'11号线PR2202',
                    value:'11号线PR2202'
                }]
            },{
                date: '13号线',
                name: '多次换乘',
                address: '13号线PR2201',
                xinxi:'否',
                option:[{
                    label:'13号线PR2201',
                    value:'13号线PR2201'
                },{
                    label:'13号线PR2202',
                    value:'13号线PR2202'
                }]
            },{
                date: '15号线',
                name: '多次换乘',
                address: '15号线PR2201',
                xinxi:'否',
                option:[{
                    label:'15号线PR2201',
                    value:'15号线PR2201'
                },{
                    label:'15号线PR2202',
                    value:'15号线PR2202'
                }]
            },{
                date: '16号线',
                name: '多次换乘',
                address: '16号线PR2201',
                xinxi:'否',
                option:[{
                    label:'16号线PR2201',
                    value:'16号线PR2201'
                },{
                    label:'16号线PR2202',
                    value:'16号线PR2202'
                }]
            },{
                date: '17号线',
                name: '多次换乘',
                address: '17号线PR2201',
                xinxi:'否',
                option:[{
                    label:'17号线PR2201',
                    value:'17号线PR2201'
                },{
                    label:'17号线PR2202',
                    value:'17号线PR2202'
                }]
            },{
                date: '19号线',
                name: '多次换乘',
                address: '19号线PR2201',
                xinxi:'否',
                option:[{
                    label:'19号线PR2201',
                    value:'19号线PR2201'
                },{
                    label:'19号线PR2202',
                    value:'19号线PR2202'
                }]
            },{
                date: '房山线',
                name: '多次换乘',
                address: '房山线PR2201',
                xinxi:'否',
                option:[{
                    label:'房山线PR2201',
                    value:'房山线PR2201'
                },{
                    label:'房山线PR2202',
                    value:'房山线PR2202'
                }]
            },{
                date: '昌平线',
                name: '多次换乘',
                address: '昌平线PR2201',
                xinxi:'否',
                option:[{
                    label:'昌平线PR2201',
                    value:'昌平线PR2201'
                },{
                    label:'昌平线PR2202',
                    value:'昌平线PR2202'
                }]
            },{
                date: '亦庄线',
                name: '多次换乘',
                address: '亦庄线PR2201',
                xinxi:'否',
                option:[{
                    label:'亦庄线PR2201',
                    value:'亦庄线PR2201'
                },{
                    label:'亦庄线PR2202',
                    value:'亦庄线PR2202'
                }]
            },{
                date: '燕房线',
                name: '多次换乘',
                address: '燕房线PR2201',
                xinxi:'否',
                option:[{
                    label:'燕房线PR2201',
                    value:'燕房线PR2201'
                },{
                    label:'燕房线PR2202',
                    value:'燕房线PR2202'
                }]
            },{
                date: '首都机场线',
                name: '多次换乘',
                address: '首都机场线PR2201',
                xinxi:'否',
                option:[{
                    label:'首都机场线PR2201',
                    value:'首都机场线PR2201'
                },{
                    label:'首都机场线PR2202',
                    value:'首都机场线PR2202'
                }]
            },{
                date: '西郊线',
                name: '多次换乘',
                address: '西郊线PR2201',
                xinxi:'否',
                option:[{
                    label:'西郊线PR2201',
                    value:'西郊线PR2201'
                },{
                    label:'西郊线PR2202',
                    value:'西郊线PR2202'
                }]
            },{
                date: '大兴机场线',
                name: '多次换乘',
                address: '大兴机场线PR2201',
                xinxi:'否',
                option:[{
                    label:'大兴机场线PR2201',
                    value:'大兴机场线PR2201'
                },{
                    label:'大兴机场线PR2202',
                    value:'大兴机场线PR2202'
                }]
            },{
                date: '亦庄T1线',
                name: '多次换乘',
                address: '亦庄T1线PR2201',
                xinxi:'否',
                option:[{
                    label:'亦庄T1线PR2201',
                    value:'亦庄T1线PR2201'
                },{
                    label:'亦庄T1线PR2202',
                    value:'亦庄T1线PR2202'
                }]
            }],
            multipleSelection:[],
            startTime: '',
            endTime: '',
            detailsData:[{
                date:'方案一',
                name:'1',
                address:'3号航站楼-东直门',
                station:'无',
                message:'4L',
                bili:'无'
            },{
                date:'方案二',
                children:[{
                    name:'1',
                    address:'3号航站楼-东直门',
                    station:'三元桥',
                    message:'4L'
                },{
                    name:'2',
                    address:'2号航站楼-东直门',
                    station:'无',
                    message:'4L',
                    
                }],
                bili:'交路1：交路2 3:1',
            },{
                date:'方案三',
                children:[{
                    name:'1',
                    address:'3号航站楼-东直门',
                    station:'三元桥',
                    message:'4L'
                },{
                    name:'2',
                    address:'2号航站楼-东直门',
                    station:'无',
                    message:'4L',
                    
                }],
                bili:'交路1：交路2 3:1',
            }],
            radio:'',
        };
    },
    created() {
        var self = this
        for (let index = 0; index < LINETRAIN.length; index++) {
            if(this.optionsLine[0].options.length == 0 || this.optionsLine[0].options[this.optionsLine[0].options.length - 1].value != LINETRAIN[index].LineID){
                this.optionsLine[0].options.push({
                    value:LINETRAIN[index].LineID,
                    label:LINETRAIN[index].LineName,
                    chose:false
                })
            }
        }

        this.$api.get('/zbAPI/traffic_plan/').then(res => {            
            self.options = res.data.plan_data
            self.value = res.data.plan_data[0].plan_name
        })

    },
    computed: {},
    mounted() {
        window.addEventListener("resize", this.resizefunc);
        this.$nextTick(() => {
            // this.getData();
        });

        var tmp = {
            station_name:'环球度假区',
            passenger_type:'workday',
            passenger_filter:'max_value'
        }

        let charts1 = this.$echarts.init(this.$refs.echart, "dark");
        charts1.showLoading({ text: '正在加载数据' });
        charts1.setOption(option1, true);
        this.$api.get('/zbAPI/cross_section_passenger_flow/',{line_id:'L070'}).then(res => {
            if(res.data.code == 200){
                const tmpEchartOption3 = JSON.parse(JSON.stringify(option1))
                tmpEchartOption3.title.text = "7号线 - 分时最大断面客流（人次）";
                tmpEchartOption3.xAxis.data = res.data.time_x_list;
                tmpEchartOption3.series[0].data = res.data.count_y_list;
                charts1.hideLoading()
                charts1.setOption(tmpEchartOption3, true);
            }
        })
        

        let charts2 = this.$echarts.init(this.$refs.echart1, "dark");
        charts2.showLoading({ text: '正在加载数据' });
        this.$api.post2('/zbAPI/get_od_data/',tmp).then(res => {
            if(res.data.code == 200){
                const tmpEchartOption2 = JSON.parse(JSON.stringify(option1))
                tmpEchartOption2.title.text = res.data.station_name + " - OD Top10（人次）";
                tmpEchartOption2.xAxis.data = res.data.x_station_name_list.slice(0,10);
                tmpEchartOption2.series[0].data = res.data.y_d_value_list;
                charts2.hideLoading()
                charts2.setOption(tmpEchartOption2, true);
            }
        })

        let charts3 = this.$echarts.init(this.$refs.echart2, "dark");
        charts3.showLoading({ text: '正在加载数据' });
        this.$api.get('/zbAPI/get_line_section_data/',{line_id:'L070'}).then(res => {
            if(res.data.code == 200){
                const tmpEchartOption4 = JSON.parse(JSON.stringify(option1))
                tmpEchartOption4.title.text = "7号线 - 各个断面最大 Top10 客流量（人次）";
                tmpEchartOption4.xAxis.data = res.data.x_section_name_list.slice(0,10);
                tmpEchartOption4.series[0].data = res.data.y_count_list;
                charts3.hideLoading()
                charts3.setOption(tmpEchartOption4, true);
            }
        })
    },
    //移除事件监听
    beforeDestroy() {
        window.removeEventListener("resize", this.resizefunc);
        this.resizefunc = null;
    },
    methods: {
        stepNext(value){
            if(value){
                this.step++
            }else{
                this.step--
            }
        },
        xlysMain(){
            this.centerDialogVisible = true 
            var self = this
            this.$api.get('/verAPI/op/constraint?lineId=70').then(res => {             
                self.xlys = res.data.data
            })
            console.log(this.xlys);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        download(){
            const link = document.createElement('a');
            // 这里是将链接地址url转成blob地址，
            fetch('http://172.51.216.72:41004/车次时刻表.csv').then(res => res.blob()).then(blob => { 
                link.href = URL.createObjectURL(blob)
                // 下载文件的名称及文件类型后缀
                link.download = "车次时刻表.csv"; 
                document.body.appendChild(link)
                link.click()
                //在资源下载完成后 清除 占用的缓存资源
                window.URL.revokeObjectURL(link.href);
                document.body.removeChild(link);
            });
        },
        save(){
            this.$message({
                message: '保存成功！',
                type: 'success'
            });
        },
        suiji(){
            this.$message({
                message: '生成成功！',
                type: 'success'
            });
            for (let index = 0; index < this.tableData1.length; index++) {
                this.tableData1[index].bianzu = '8A'
                this.tableData1[index].xuqiu = Math.floor(Math.random()*30) + 1; 
                this.tableData1[index].kaixing = Math.floor(Math.random()*30) + 1; 
                
            }
        }
    },
};
</script>

<style scoped>

.step{position: relative;width: 80%;margin: 0 auto;display: flex;justify-content: space-between;font-size: 16px;padding: 40px 0;}
.step::before{width: 100%;height: 1px;content: '';display: block;position: absolute;left: 0;top: 50%;background: #161e2e;}
.step span{position: relative;z-index: 2;background: #000;}
.step span i{width: 40px;height: 40px;display: inline-block;border-radius: 30px;vertical-align: middle;background: #000;border:2px solid #a1a2a3;text-align: center;line-height: 36px;font-weight: bold;margin-right: 6px;}
.step span.active{font-weight: bold;color: #fff;}
.step span.active i{border-color: #f9ce4c;background: #f9ce4c;color: #000;}

.steps{width: 90%;margin: 0 auto;}
.final{text-align: right;}

.subwayLine{width: 100%;overflow-y: auto;}
.subwayLine::-webkit-scrollbar {width: 10px;height: 10px;}
.subwayLine::-webkit-scrollbar-thumb { -webkit-box-shadow: inset 0 0 5px rgba(9, 74, 238, 0.7);background: rgba(32, 50, 96, .7);}
.subwayLine::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 5px rgba(9, 74, 238, 0.7);background: rgba(0, 0, 0, 0.1);}
.subwayLine img{height: 300px;}

.steps1{overflow-y:auto;height: calc(100vh - 260px);margin-bottom: 10px;scrollbar-width: none; /* firefox */   -ms-overflow-style: none; }
.steps1::-webkit-scrollbar {display: none; /* Chrome Safari */}
.steps1 ul{padding: 20px 0;text-align: center;}
.steps1 ul li{border-bottom: 1px solid #131d29;height: 40px;line-height: 40px;position: relative;}
.steps1 ul li span{color: #f9ce4c;}
.steps1 ul li button{position: absolute;right:10px;top:5px}

.steps1 .yl{background: transparent;}
.chart {height: 400px;padding: 5px;width:100%}

.imitate{border-top: 1px solid #4c506c;text-align: center;color: #a8a8a8;}
.imitate h2{background: #363851;font-weight: bold;}
.imitate p,.imitate h2{width: 100%;min-height: 81px;display: block;}
.imitate p{cursor: pointer;}
.imitate p:hover{background-color: #363851;}
.imitate strong{display: inline-block;border-bottom: 1px solid #4c506c;width: 14.4%;line-height: 80px;float: left;}
.imitate strong b{height: 40px;line-height: 40px;width: 100%;display: block;border-bottom: 1px solid #4c506c;font-weight: normal;}
.imitate strong b:last-child{border:none}
.imitate h2,.imitate h2 strong{height: 50px;line-height: 50px;min-height: 50px;}
</style>
