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
                <el-select v-model="value" placeholder="请选择" class="inputS">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
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
                @selection-change="handleSelectionChange"
                style="width: 100%">
                    <el-table-column
                    type="selection"
                    width="55">
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
                    <!-- <el-table-column
                        fixed="right"
                        label="操作"
                        align="center"
                        width="200">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini">方案选择</el-button>
                        </template>
                    </el-table-column> -->
                </el-table>
            </el-col>
            <el-col :span="24">&nbsp;</el-col>
            <el-col :span="24">
                <el-button size="mini" type="primary" class="rightConfig" @click="kxfa = true" style="float:right;" v-if="multipleSelection.length > 0">生成开行方案</el-button>
            </el-col>
            <div v-if="kxfa">
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
                    </br>
                    <el-button size="mini" type="primary" class="rightConfig" >保存</el-button>
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
                    </el-table-column>
                    <el-table-column
                        prop="xinxi"
                        align="center"
                        label="是否调整">
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24">&nbsp;</el-col>
            <el-button size="mini" type="primary" style="float:right;" class="rightConfig" @click="centerDialogVisible1 = true">启动全网验证</el-button>
            
        </el-row>

        <el-row class="row steps final">
            <el-col :span="24">
                <el-button type="primary" class="rightConfig" @click="stepNext(0)" v-if="step > 1">上一步</el-button>
                <el-button type="primary" class="rightConfig" @click="stepNext(1)" v-if="step > 0 && step < 4">下一步</el-button>
                <el-button type="primary" v-if="step == 4" @click="download()">导出全部线路</el-button>
                <el-button type="primary" v-if="step == 4" @click="download()">导出调整线路</el-button>
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

    </div>
</template>

<script>
import echarts from "echarts";

const option1 = {
    grid: {
        left: 30,
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
            name: "bar",
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
            stations: [],
            lineList: [],
            query: {
                stationid: "",
                ptype: "",
                prange: "7号线",
                prange_date: "",
            },
            selectedLine: "",
            options: [{
                value: '选项1',
                label: '常规预测'
            },{
                value: '选项2',
                label: '备用预测1'
            },{
                value: '选项3',
                label: '备用预测2'
            },{
                value: '选项4',
                label: '备用预测3'
            }],
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
            value: '选项1',
            step:1,
            tableData: [{
                id: '05:00:00 - 07:00:00',
                name: '环球度假区-北京西站 跳停车站：无 编组信息：8B 交路比例：无',
            }, {
                id: '07:00:00 - 09:00:00',
                name: '交路1：环球度假区-北京西站 跳停车站：无 编组信息：8B',
                name1:'交路2：焦化厂-北京西站 跳停车站：无 编组信息：8B 交路比例：1：1'
            }, {
                id: '09:00:00 - 11:00:00',
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
                address: '7号线PR 2201',
                xinxi:'是',
            },{
                date: '八通线',
                name: '直接相关线路',
                address: '八通线线PR 2201',
                xinxi:'是/否',
            },{
                date: '10号线',
                name: '一次换乘',
                address: '10号线PR 2201',
                xinxi:'否',
            },{
                date: '房山线',
                name: '多次换乘',
                address: '房山线PR 2201',
                xinxi:'否',
            }],
            multipleSelection:[]
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
                tmpEchartOption3.title.text = "7号线 - 分时最大断面客流";
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
                tmpEchartOption2.title.text = res.data.station_name + " - OD Top5";
                tmpEchartOption2.xAxis.data = res.data.x_station_name_list.slice(0,5);
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
                tmpEchartOption4.title.text = "7号线 - 各个断面最大 Top5 客流量";
                tmpEchartOption4.xAxis.data = res.data.x_section_name_list.slice(0,5);
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
        async getData() {
            let data = await this.mockData();
            this.stations = data.stations;
            this.lineList = data.lineList;
        },
        stepNext(value){
            if(value){
                this.step++
            }else{
                this.step--
            }
        },
        mockData(chartnum, exdata) {
            return new Promise((resolve, reject) => {
                if (chartnum === 1 || chartnum === 3) {
                    let x = [];
                    let y = [];
                    for (let i = 5; i < 23; i++) {
                        x.push(`${i}:00`);
                        x.push(`${i}:15`);
                        x.push(`${i}:30`);
                        x.push(`${i}:45`);
                        y.push(parseInt(Math.random() * 3000));
                        y.push(parseInt(Math.random() * 3000));
                        y.push(parseInt(Math.random() * 3000));
                        y.push(parseInt(Math.random() * 3000));
                    }
                    resolve({ x, y });
                } else if (chartnum === 2) {
                    let x = [];
                    let y = [];
                    for (let i = 1; i < 23; i++) {
                        x.push(`随机${i}车站`);
                        y.push(parseInt(Math.random() * 800));
                    }
                    resolve({ x, y });
                } else if (chartnum === 4) {
                    let x = [];
                    let y = [];
                    for (let i = 5; i < 23; i++) {
                        x.push(`${i}:00`);
                        x.push(`${i}:15`);
                        x.push(`${i}:30`);
                        x.push(`${i}:45`);
                        y.push(parseInt(Math.random() * 1600));
                        y.push(parseInt(Math.random() * 1600));
                        y.push(parseInt(Math.random() * 1600));
                        y.push(parseInt(Math.random() * 1600));
                    }
                    resolve({ x, y });
                } else {
                    resolve({
                        stations: [
                            {
                                stationid: "花乡东桥",
                                stationname: "花乡东桥",
                            },
                            {
                                stationid: "北京西",
                                stationname: "北京西",
                            },
                            {
                                stationid: "西直门",
                                stationname: "西直门",
                            },
                            {
                                stationid: "国贸",
                                stationname: "国贸",
                            },
                            {
                                stationid: "六里桥",
                                stationname: "六里桥",
                            },
                        ],
                        lineList: [
                            "1号线",
                            "2号线",
                            "4号线",
                            "9号线",
                            "10号线",
                            "13号线",
                        ],
                    });
                }
            });
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
.final{text-align: center;}

.subwayLine{width: 100%;overflow: auto;}
.subwayLine img{height: 300px;}

.steps1{overflow-y:auto;height: calc(100vh - 260px);margin-bottom: 10px;scrollbar-width: none; /* firefox */   -ms-overflow-style: none; }
.steps1::-webkit-scrollbar {display: none; /* Chrome Safari */}
.steps1 ul{padding: 20px 0;text-align: center;}
.steps1 ul li{border-bottom: 1px solid #131d29;height: 40px;line-height: 40px;position: relative;}
.steps1 ul li span{color: #f9ce4c;}
.steps1 ul li button{position: absolute;right:10px;top:5px}

.steps1 .yl{background: transparent;}
.chart {height: 400px;padding: 5px;width:100%}
</style>
