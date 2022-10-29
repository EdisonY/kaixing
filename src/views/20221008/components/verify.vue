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
        <el-row class="row steps steps1" v-if="step == 1">
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
                        <el-option v-for="item in stations"
                            :key="item.stationid"
                            :label="item.stationname"
                            :value="item.stationid">
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
                <el-button class="yushu" @click="xlys()">线路约束</el-button>
            </el-col>
            <el-col :span="24">&nbsp;</el-col>
            <el-col :span="24">
                <span class="inner-title">7号线缩略图</span>
            </el-col>
            <el-col :span="24">
                <div class="subwayLine">
                    <img src="@/assets/line.png" />
                </div>
            </el-col>
            <el-col :span="24">
                <div class="yl">
                    <!-- <iframe frameborder="0" width="100%" height="700" src="http://frp.funenc.xyz:7245/link/oTcnnEFV"></iframe> -->
                    <div class="chart" ref="echart"></div>
                </div>
            </el-col>
        </el-row>
        <el-row class="row steps steps1" v-if="step == 2">
            <el-col :span="24">
                <span class="inner-title">交路方案选择</span>
            </el-col>
            <el-col :span="24">&nbsp;</el-col>
            <el-col :span="24">
                <el-table
                :data="tableData"
                class="componentTable"
                style="width: 100%">
                    <!-- <el-table-column
                        label="起止时间"
                        align="left"
                        width="240"
                        prop="id">
                    </el-table-column> -->
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
                            <el-button type="primary" size="mini">方案选择</el-button>
                            <!-- <el-button type="danger" size="mini">删除</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24">&nbsp;</el-col>
            <el-col :span="24">
                <el-button size="mini" type="primary" class="rightConfig" @click="kxfa = true" style="float:right;">生成开行方案</el-button>
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
        <el-row class="row steps steps1" v-if="step == 3">
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
                        <template slot-scope="scope">
                            {{scope.row.address}}
                        </template>
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
        <el-row class="row steps steps1" v-if="step == 4">
            
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
            <el-col :span="24">&nbsp;</el-col>
            <el-col :span="24">
                <el-table
                    :data="tableData2"
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
            <el-button size="mini" type="primary" style="float:right;" class="rightConfig" @click="qwyz = true">启动全网验证</el-button>
            <el-col :span="24">&nbsp;</el-col>
            <el-col :span="24" v-if="qwyz">
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
                
                <el-col :span="24" style="text-align:right;padding: 20px 0;">
                    
                </el-col>
                
            </el-col>

            

        </el-row>

        <el-row class="row steps final">
            <el-col :span="24">
                <el-button type="primary" class="rightConfig" @click="stepNext(0)" v-if="step > 1">上一步</el-button>
                <el-button type="primary" class="rightConfig" @click="stepNext(1)" v-if="step > 0 && step < 4">下一步</el-button>
                <el-button size="mini" type="primary" v-if="step == 4">导出全部线路</el-button>
                <el-button size="mini" type="primary" v-if="step == 4">导出调整线路</el-button>
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

    </div>
</template>

<script>
import echarts from "echarts";

const option = { grid: {
        left: 30,
        top: 50,
        right: 0,
        bottom: 40,
    },
    title: {
        text: "环球度假区-分时进站量",
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
            rotate: 90,
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
        name: 'Step End',
        type: 'line',
        step: 'end',
        data: [450, 432, 401, 454, 590, 530, 510]
        }
    ]
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
            qwyz:false,
            kxfa:false,
            centerDialogVisible:false,
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
                address: '5min',
                xinxi:'环球度假区站',
                duishu:'22:53-22:58'
            },{
                date: '站台滞留人数告警',
                name: '2',
                address: '9min',
                xinxi:'环球度假区站',
                duishu:'22:56-22:05'
            },{
                date: '站台滞留超过一次告警',
                name: '17',
                address: '5min',
                xinxi:'环球度假区站',
                duishu:'22:53-22:58'
            },{
                date: '分方向换成预测预警',
                name: '1',
                address: '3min',
                xinxi:'环球度假区站',
                duishu:'22:53-22:56'
            },{
                date: '区间满载率',
                name: '1',
                address: '5min',
                xinxi:'环球度假区站',
                duishu:'22:53-22:58'
            },{
                date: '列车满载率',
                name: '1',
                address: '5min',
                xinxi:'环球度假区站',
                duishu:'22:53-22:58'
            }],
        };
    },
    created() {
        
    },
    computed: {},
    mounted() {
        window.addEventListener("resize", this.resizefunc);
        this.$nextTick(() => {
            this.getData();
        });
        let charts1 = this.$echarts.init(this.$refs.echart, "dark");
        charts1.setOption(option, true);
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
            this.tableData2 = [{
                date: '进站量告警',
                name: '1',
                address: '5min',
                xinxi:'环球度假区站',
                duishu:'22:53-22:58'
            },{
                date: '站台滞留人数告警',
                name: '2',
                address: '9min',
                xinxi:'环球度假区站',
                duishu:'22:56-22:05'
            },{
                date: '站台滞留超过一次告警',
                name: '17',
                address: '5min',
                xinxi:'环球度假区站',
                duishu:'22:53-22:58'
            },{
                date: '分方向换成预测预警',
                name: '1',
                address: '3min',
                xinxi:'环球度假区站',
                duishu:'22:53-22:56'
            },{
                date: '区间满载率',
                name: '1',
                address: '5min',
                xinxi:'环球度假区站',
                duishu:'22:53-22:58'
            },{
                date: '列车满载率',
                name: '1',
                address: '5min',
                xinxi:'环球度假区站',
                duishu:'22:53-22:58'
            }]
            this.$forceUpdate();
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
        xlys(){
            this.centerDialogVisible = true 
            var self = this
            this.$api.get('/verAPI/op/constraint?lineId=70').then(res => {             
                self.xlys = res.data
            })
            console.log(this.xlys);
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

.subwayLine img{width: 100%;}

.steps1{overflow-y:auto;height: calc(100vh - 260px);margin-bottom: 10px;scrollbar-width: none; /* firefox */   -ms-overflow-style: none; }
.steps1::-webkit-scrollbar {display: none; /* Chrome Safari */}
.steps1 ul{padding: 20px 0;text-align: center;}
.steps1 ul li{border-bottom: 1px solid #131d29;height: 40px;line-height: 40px;position: relative;}
.steps1 ul li span{color: #f9ce4c;}
.steps1 ul li button{position: absolute;right:10px;top:5px}

.steps1 .yl{background: transparent;}
.chart {height: 400px;padding: 5px;width:400px}
</style>
