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
                <el-radio-group v-model="query.prange">
                    <el-radio label="7号线">7号线</el-radio>
                    <el-radio label="八通线">八通线</el-radio>
                    <el-radio label="其他线路">其他线路</el-radio>
                    <el-select 
                        :disabled="query.prange!='其他线路'"
                        v-model="query.stationid"
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
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-button class="yushu" @click="centerDialogVisible = true">线路约束</el-button>
            </el-col>
            <el-col :span="24">&nbsp;</el-col>
            <el-col :span="24">
                <span class="inner-title">7号线缩略图</span>
            </el-col>
        </el-row>
        <el-row class="row steps steps1" v-if="step == 2">
            <el-col :span="24">
                <span class="inner-title">交路方案选择</span>
            </el-col>
        </el-row>
        <el-row class="row steps steps1" v-if="step == 3">
            <el-col :span="24">
                <span class="inner-title">本线验证结果</span>
            </el-col>
        </el-row>
        <el-row class="row steps steps1" v-if="step == 4">
            <el-col :span="24">
                <span class="inner-title">客流预测方案</span>
            </el-col>
        </el-row>





        <el-row class="row steps final">
            <el-col :span="24">
                <el-button type="primary" class="rightConfig" @click="step++">下一步</el-button>
            </el-col>
        </el-row>
        <el-dialog
            title="线路约束"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <ul>
                <li>
                    <span>系统设计最小运营间隔(s)</span>90
                </li>
                <li>
                    <span>实际最小运营间隔(s)</span>120
                </li>
                <li>
                    <span>编组</span>8A
                </li>
                <li>
                    <span>全周转时长</span>1‘13’02
                </li>
                <li>
                    <span>备车数量(列)</span>4
                </li>
            </ul>
        </el-dialog>

    </div>
</template>

<script>

export default {
    name: "nav01",
    data() {
        return {
            centerDialogVisible:false,
            stations: [],
            lineList: [],
            query: {
                stationid: "",
                ptype: "",
                prange: "",
                prange_date: "",
            },
            selectedLine: "",
            options: [{
            value: '选项1',
            label: '黄金糕'
            }, {
            value: '选项2',
            label: '双皮奶'
            }, {
            value: '选项3',
            label: '蚵仔煎'
            }, {
            value: '选项4',
            label: '龙须面'
            }, {
            value: '选项5',
            label: '北京烤鸭'
            }],
            value: '',
            step:1
        };
    },
    created() {},
    computed: {},
    mounted() {
        window.addEventListener("resize", this.resizefunc);
        this.$nextTick(() => {
            this.getData();
        });
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
</style>
