<template>
    <div class="component-page">
        <el-row class="row">
            <el-col :span="24">
                <span class="inner-title">目标线路</span>
                <el-select v-model="query.line_id" class="inputS"
                    placeholder="请选择">
                    <el-option
                        v-for="(item,index) in options[0].options"
                        :change="choseLine(item)"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span class="inner-title">目标车站</span>
                <el-select v-model="query.station_name" class="inputS"
                    placeholder="请选择">
                    <el-option v-for="item in stationList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row class="row">
            <el-col :span="24">
                <span class="inner-title">&nbsp;&nbsp;&nbsp;典型日</span>
                <el-radio-group v-model="query.passenger_type" class="inputS">
                    <el-radio label="workday">工作日</el-radio>
                    <el-radio label="day_off">休息日</el-radio>
                    <el-radio label="festival">节假日</el-radio>
                    <el-radio label="activity">活动日</el-radio>
                </el-radio-group>
            </el-col>
        </el-row>
        <el-row class="row">
            <el-col :span="22">
                <span class="inner-title">查看方式</span>
                <el-radio-group v-model="query.passenger_filter" class="inputS">
                    <el-radio label="max_value">最大值</el-radio>
                    <el-radio label="mean_value">平均值</el-radio>
                    <el-radio label="specific_day">特定日</el-radio>
                    <el-date-picker :disabled="query.passenger_filter!='specific_day'"
                        v-model="query.prange_date"
                        value-format="yyyy-MM-DD"
                        type="date"
                        class="inputS"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-radio-group>
            </el-col>
            <el-col :span="2">
                <el-button size="mini" type="primary" @click="search()" class="rightConfig">确认</el-button>
            </el-col>
        </el-row>
        <!-- echart -->

        <el-row class="flex6">
            <el-col class="chart" :span="12">
                <div class="chart" ref="echart1"></div>
            </el-col>
            <el-col class="chart" :span="12">
                <div class="chart" ref="echart2"></div>
            </el-col>
        </el-row>
        <!-- echart -->
        <el-row style="padding:10px 0 0 0">
            <el-radio-group v-model="selectedLine" @change="search(0)">
                <el-radio-button 
                    :key="index"
                    v-for="(item,index) in lineList"
                    :label="item">
                </el-radio-button>
            </el-radio-group>
        </el-row>
        <el-row class="flex7 linbottom">
            <el-col class="chart" :span="12">
                <div class="chart" ref="echart3"></div>
            </el-col>
            <el-col class="chart" :span="12">
                <div class="chart" ref="echart4"></div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
import echarts from "echarts";

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
            loading:false,
            stations: [],
            lineList: ["7号线"],
            query: {
                station_name: "S07030",
                passenger_type: "workday",
                passenger_filter: "max_value",
                line_id:'L070'
            },
            options: [{
                label: '线路',
                options: []
                }, {
                label: '车站',
                options: []}
            ],
            selectedLine: "7号线",
        };
    },
    created() {
        var self = this
        for (let index = 0; index < LINETRAIN.length; index++) {
            if(this.options[0].options.length == 0 || this.options[0].options[this.options[0].options.length - 1].value != LINETRAIN[index].LineID){
                this.options[0].options.push({
                    value:LINETRAIN[index].LineID,
                    label:LINETRAIN[index].LineName,
                    chose:false
                })
            }
            this.options[1].options.push({
                value:LINETRAIN[index].StationID,
                label:LINETRAIN[index].LineName + ' - ' + LINETRAIN[index].StationName,
                chose:false
            })
        }

    },
    computed: {},
    mounted() {
        window.addEventListener("resize", this.resizefunc);
        this.search()

    },
    //移除事件监听
    beforeDestroy() {
        window.removeEventListener("resize", this.resizefunc);
        this.resizefunc = null;
    },
    methods: {
        search(){
            const self = this
            const tmp = JSON.parse(JSON.stringify(this.query))
            for (let index = 0; index < LINETRAIN.length; index++) {
                if(LINETRAIN[index].StationID == tmp.station_name){
                    tmp.station_name = LINETRAIN[index].StationName
                }
            }
            for (let index = 0; index < LINETRAIN.length; index++) {
                if(LINETRAIN[index].LineID == tmp.line_id){
                    tmp.line_name = LINETRAIN[index].LineName
                    this.lineList[0] = LINETRAIN[index].LineName
                    this.selectedLine = LINETRAIN[index].LineName
                }
            }

            if(tmp.passenger_filter == 'specific_day' && tmp.prange_date != ''){
                tmp.passenger_filter = tmp.prange_date
            }
            
            const charts1 = self.$echarts.init(self.$refs.echart1);
            charts1.showLoading({ text: '正在加载数据' });
            const charts2 = self.$echarts.init(self.$refs.echart2);
            charts2.showLoading({ text: '正在加载数据' });
            const charts3 = self.$echarts.init(self.$refs.echart3);
            charts3.showLoading({ text: '正在加载数据' });
            const charts4 = self.$echarts.init(self.$refs.echart4);
            charts4.showLoading({ text: '正在加载数据' });

            // delete tmp.stationid;

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

            this.$api.post2('/zbAPI/get_od_data/',tmp).then(res => {
                if(res.data.code == 200){
                    const tmpEchartOption2 = JSON.parse(JSON.stringify(option))
                    tmpEchartOption2.title.text = res.data.station_name + " - OD量";
                    tmpEchartOption2.xAxis.data = res.data.x_station_name_list;
                    tmpEchartOption2.series[0].data = res.data.y_d_value_list;
                    charts2.hideLoading()
                    charts2.setOption(tmpEchartOption2, true);
                }
            })
            

            
            this.$api.get('/zbAPI/cross_section_passenger_flow/',{line_id:tmp.line_id}).then(res => {
                if(res.data.code == 200){
                    const tmpEchartOption3 = JSON.parse(JSON.stringify(option))
                    tmpEchartOption3.title.text = tmp.line_name + " - 分时最大断面客流";
                    tmpEchartOption3.xAxis.data = res.data.time_x_list;
                    tmpEchartOption3.series[0].data = res.data.count_y_list;
                    charts3.hideLoading()
                    charts3.setOption(tmpEchartOption3, true);
                }
            })

            this.$api.get('/zbAPI/get_line_section_data/',{line_id:tmp.line_id}).then(res => {
                if(res.data.code == 200){
                    const tmpEchartOption4 = JSON.parse(JSON.stringify(option))
                    tmpEchartOption4.title.text = tmp.line_name + " - 各个断面最大客流量";
                    tmpEchartOption4.xAxis.data = res.data.x_section_name_list;
                    tmpEchartOption4.series[0].data = res.data.y_count_list;
                    charts4.hideLoading()
                    charts4.setOption(tmpEchartOption4, true);
                }
            })
            

        },
        choseLine(){
            this.stationList = []
            for (let index = 0; index < LINETRAIN.length; index++) {
                if(LINETRAIN[index].LineID == this.query.line_id){
                    this.stationList.push({
                        value:LINETRAIN[index].StationID,
                        label:LINETRAIN[index].StationName,
                        chose:false
                    })
                }
            }
            if(this.query.line_id == 'L070'){
                this.query.station_name = '环球度假区'
            }else{
                this.query.station_name = this.stationList[0].label
            }
        },
    },
};
</script>

<style scoped>


.component-page .el-radio{color: #a1a2a3;}
.linbottom{background: #1d1e39;}
.rightConfig{padding-left:30px;padding-right:30px;}
.row {
    margin: 10px 0;
}
.flex6 {
    flex: 6;
}
.flex7 {
    flex: 7;
}
.chart {
    height: 100%;
    padding: 5px;
}
</style>
