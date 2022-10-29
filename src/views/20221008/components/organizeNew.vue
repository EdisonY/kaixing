<template>
    <div class="component-page">
        
        <el-row>
            <el-radio-group v-model="selectedLine" @change="handleChnageLine">
                <el-radio-button :key="index" v-for="(item,index) in lineList" :label="item.label"></el-radio-button>
            </el-radio-group>
        </el-row>
        <div class="bg" v-if="selectedLine == '环球度假区'">
            <el-row class="row">
                <el-col :span="12">
                    <div class="chart" ref="echart1"></div>
                </el-col>
                <el-col :span="12">
                    <div class="chart" ref="echart2"></div>
                </el-col>
                <el-col :span="24">&nbsp;</el-col>
                <el-col :span="24">
                    <el-table
                        :data="tableData2"
                        class="componentTable"
                        style="width: 100%">
                        <el-table-column
                            prop="cz"
                            label="车站"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="sj"
                            label="时间"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="wz"
                            align="center"
                            label="位置">
                        </el-table-column>
                        <el-table-column
                            prop="fx"
                            align="center"
                            label="风险现象">
                        </el-table-column>
                        <el-table-column
                            prop="jy"
                            align="center"
                            label="建议措施">
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
        <div class="bg" v-if="selectedLine == '双井'">
            <el-row class="row">
                <el-col :span="12">
                    <div class="chart" ref="echart2"></div>
                </el-col>
                <el-col :span="12">
                    <div class="chart" ref="echart3"></div>
                </el-col>
                <el-col :span="24">&nbsp;</el-col>
                <el-col :span="24">
                    <el-table
                        :data="tableData3"
                        class="componentTable"
                        style="width: 100%">
                        <el-table-column
                            prop="cz"
                            label="车站"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="sj"
                            label="时间"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="wz"
                            align="center"
                            label="位置">
                        </el-table-column>
                        <el-table-column
                            prop="fx"
                            align="center"
                            label="风险现象">
                        </el-table-column>
                        <el-table-column
                            prop="jy"
                            align="center"
                            label="建议措施">
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
        <div class="bg" v-if="selectedLine == '国贸'">
            <el-row class="row">
                <el-col :span="12">
                    <div class="chart" ref="echart2"></div>
                </el-col>
                <el-col :span="12">
                    <div class="chart" ref="echart3"></div>
                </el-col>
                <el-col :span="24">&nbsp;</el-col>
                <el-col :span="24">
                    <el-table
                        :data="tableData4"
                        class="componentTable"
                        style="width: 100%">
                        <el-table-column
                            prop="cz"
                            label="车站"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="sj"
                            label="时间"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="wz"
                            align="center"
                            label="位置">
                        </el-table-column>
                        <el-table-column
                            prop="fx"
                            align="center"
                            label="风险现象">
                        </el-table-column>
                        <el-table-column
                            prop="jy"
                            align="center"
                            label="建议措施">
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
        <div class="bg" v-if="selectedLine == '磁器口'">
            <el-row class="row">
                <el-col :span="12">
                    <div class="chart" ref="echart2"></div>
                </el-col>
                <el-col :span="12">
                    <div class="chart" ref="echart3"></div>
                </el-col>
                <el-col :span="24">&nbsp;</el-col>
                <el-col :span="24">
                    <el-table
                        :data="tableData5"
                        class="componentTable"
                        style="width: 100%">
                        <el-table-column
                            prop="cz"
                            label="车站"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="sj"
                            label="时间"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="wz"
                            align="center"
                            label="位置">
                        </el-table-column>
                        <el-table-column
                            prop="fx"
                            align="center"
                            label="风险现象">
                        </el-table-column>
                        <el-table-column
                            prop="jy"
                            align="center"
                            label="建议措施">
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
const option = {
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
            selectedLine: "环球度假区",
            lineList: [{
                value:'0',
                label:'环球度假区'
            },{
                value:'1',
                label:'双井'
            },{
                value:'2',
                label:'国贸'
            },{
                value:'3',
                label:'磁器口'
            }],
            tableData2: [{
                cz:'环球度假区',
                sj:'17:00',
                wz:'进站口',
                fx:'陆续散场游客增多',
                jy:'提前摆放铁马'
            },{
                cz:'环球度假区',
                sj:'17:00',
                wz:'进站口',
                fx:'外阜游客未关联健康宝',
                jy:'组织志愿者为游客提供帮助'
            },{
                cz:'环球度假区',
                sj:'17:00',
                wz:'进站口',
                fx:'外阜游客未关联健康宝',
                jy:'提前准备易拉宝提示关联流程'
            },{
                cz:'环球度假区',
                sj:'19:00',
                wz:'站厅',
                fx:'外阜游客在扶梯前聚集',
                jy:'组织志愿者引导7号线/八通线分流'
            },{
                cz:'环球度假区',
                sj:'19:00',
                wz:'扶梯',
                fx:'站厅-站台进占人数持续减少，出站客流增多',
                jy:'自动扶梯上行下行比例调整为1:3'
            },{
                cz:'环球度假区',
                sj:'19:00',
                wz:'售票',
                fx:'外阜游客不熟悉自动售票机，造成聚集',
                jy:'安排志愿者在TVM前协助乘客购票办理购票业务'
            },{
                cz:'环球度假区',
                sj:'20:00',
                wz:'售票',
                fx:'外阜游客不熟悉自动售票机，造成聚集',
                jy:'开启BOM人工售票'
            },{
                cz:'环球度假区',
                sj:'20:00',
                wz:'',
                fx:'外阜游客不熟悉自动售票机，造成聚集',
                jy:'启用移动售票机'
            },{
                cz:'环球度假区',
                sj:'20:00',
                wz:'',
                fx:'一票通缺卡',
                jy:'准备适量预销售常用票价的单程票，分别放置在分类票价盒内；'
            },{
                cz:'环球度假区',
                sj:'20:00',
                wz:'站台',
                fx:'集中散场客流站台聚集',
                jy:'根据预测性告警类型，提前调用专题视频监控方案，重点监视站台的客流情况，同时根据需要进行广播宣传，引导乘客乘降'
            },{
                cz:'环球度假区',
                sj:'20:00',
                wz:'站台',
                fx:'集中散场客流站台聚集',
                jy:'引导乘客分散候车，防止乘客聚集在某几个车门处'
            },{
                cz:'环球度假区',
                sj:'20:00',
                wz:'',
                fx:'集中散场客流站台聚集',
                jy:'提醒乘客远离屏蔽门，不要手扶或倚靠，以免夹伤，确保列车的正点运行和乘客的乘车安全'
            }],
            tableData3:[{
                cz:'双井',
                sj:'21:00',
                wz:'换乘通道',
                fx:'7号线换乘10号线乘客增多',
                jy:'提前安放铁马，延长换乘走行距离'
            },{
                cz:'双井',
                sj:'21:00',
                wz:'站台',
                fx:'10号线站台聚集',
                jy:'引导乘客分散候车，防止乘客聚集在某几个车门处'
            },{
                cz:'双井',
                sj:'21:00',
                wz:'站台',
                fx:'10号线站台聚集',
                jy:'提醒乘客远离屏蔽门，不要手扶或倚靠，以免夹伤，确保列车的正点运行和乘客的乘车安全'
            }],
            tableData4:[{
                cz:'国贸',
                sj:'21:00',
                wz:'换乘通道',
                fx:'1-八通线号线换乘10号线乘客增多',
                jy:'提前安放铁马，延长换乘走行距离'
            },{
                cz:'国贸',
                sj:'21:00',
                wz:'站台',
                fx:'10号线站台聚集',
                jy:'引导乘客分散候车，防止乘客聚集在某几个车门处'
            },{
                cz:'国贸',
                sj:'21:00',
                wz:'站台',
                fx:'10号线站台聚集',
                jy:'提醒乘客远离屏蔽门，不要手扶或倚靠，以免夹伤，确保列车的正点运行和乘客的乘车安全'
            }],
            tableData5:[{
                cz:'磁器口',
                sj:'21:00',
                wz:'换乘通道',
                fx:'7号线换乘5号线乘客增多',
                jy:'提前安放铁马，延长换乘走行距离'
            },{
                cz:'磁器口',
                sj:'21:00',
                wz:'站台',
                fx:'5号线站台聚集',
                jy:'引导乘客分散候车，防止乘客聚集在某几个车门处'
            },{
                cz:'磁器口',
                sj:'21:00',
                wz:'站台',
                fx:'5号线站台聚集',
                jy:'提醒乘客远离屏蔽门，不要手扶或倚靠，以免夹伤，确保列车的正点运行和乘客的乘车安全'
            }],
        };
    },
    created() {},
    computed: {},
    mounted() {
        this.handleChnageLine('环球度假区')

    },
    //移除事件监听
    beforeDestroy() {
        window.removeEventListener("resize", this.resizefunc);
        this.resizefunc = null;
    },
    methods: {
        handleChnageLine(value) {
            var self = this
            this.selectedLine = value;
            var tmp = {
                station_name:value,
                passenger_type:'workday',
                passenger_filter:'max_value'
            }

            console.log(this.$refs.echart1);

            if(this.$refs.echart1){
                const charts1 = this.$echarts.init(this.$refs.echart1);
                charts1.showLoading({ text: '正在加载数据' });
                this.$api.post2('/zbAPI/get_passenger_data/',tmp).then(res => {
                    if(res.data.code == 200){
                        const tmpEchartOption1 = JSON.parse(JSON.stringify(option))
                        tmpEchartOption1.title.text = res.data.station_name + " - 分时进站量";
                        tmpEchartOption1.xAxis.data = res.data.time_x_list;
                        tmpEchartOption1.series[0].data = res.data.count_y_list;
                        charts1.hideLoading()
                        charts1.setOption(tmpEchartOption1, true);
                    }
                })
            }
            const charts2 = self.$echarts.init(self.$refs.echart2);
            charts2.showLoading({ text: '正在加载数据' });
            if(this.$refs.echart3){
                const charts3 = self.$echarts.init(self.$refs.echart3);
                charts3.showLoading({ text: '正在加载数据' });
                this.$api.post2('/zbAPI/get_passenger_data/',tmp).then(res => {
                    if(res.data.code == 200){
                        const tmpEchartOption3 = JSON.parse(JSON.stringify(option))
                        tmpEchartOption3.title.text = res.data.station_name + " - 站台候车人数";
                        tmpEchartOption3.xAxis.data = res.data.time_x_list;
                        tmpEchartOption3.series[0].data = res.data.count_y_list;
                        charts3.hideLoading()
                        charts3.setOption(tmpEchartOption3, true);
                    }
                })
            }

            this.$api.post2('/zbAPI/get_passenger_data/',tmp).then(res => {
                if(res.data.code == 200){
                    const tmpEchartOption2 = JSON.parse(JSON.stringify(option))
                    tmpEchartOption2.title.text = res.data.station_name + " - 分方向换乘人数";
                    tmpEchartOption2.xAxis.data = res.data.time_x_list;
                    tmpEchartOption2.series[0].data = res.data.count_y_list;
                    charts2.hideLoading()
                    charts2.setOption(tmpEchartOption2, true);
                }
            })

            

        },
        async handleClick() {
            console.log(this.query);
            let data = await this.mockData(1);
            let opt1 = this.getOptions(1, data);
            let charts1 = this.$echarts.init(this.$refs.echart1, "dark");
            charts1.setOption(opt1, true);

            let data2 = await this.mockData(2);
            let opt2 = this.getOptions(2, data);
            let charts2 = this.$echarts.init(this.$refs.echart2, "dark");
            charts2.setOption(opt2, true);
        },
        async getData() {
            let data = await this.mockData();
            this.stations = data.stations;
            // this.lineList = data.lineList;
        },
        getOptions(chartnum, data) {
            if (chartnum == 1) {
                option.xAxis.axisLabel.rotate = 90;
                option.title.text = "分时进站量";
            } else if (chartnum == 2) {
                option.xAxis.axisLabel.rotate = 45;
                option.title.text = "OD量";
            } else if (chartnum == 3) {
                option.xAxis.axisLabel.rotate = 90;
                option.title.text = "分时最大断面客流";
            } else if (chartnum == 4) {
                option.xAxis.axisLabel.rotate = 45;
                option.title.text = "各个断面最大客流量";
            }
            option.xAxis.data = data.x;
            option.series[0].data = data.y;
            option.series[1].data = data.y;
            return option;
        },
        resizefunc() {
            this.$echarts.init(this.$refs.echart1).resize(); //多个echarts则在此处添加
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
                    });
                }
            });
        },
    },
};
</script>

<style scoped>
.chart {height: 300px;padding: 5px;width: 100%;}
</style>
