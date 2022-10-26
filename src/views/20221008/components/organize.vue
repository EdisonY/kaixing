<template>
    <div class="component-page">
        
        <el-row class="row hotarea">
            <img src="@/assets/basie/hotarea.png" usemap="#planetmap"/>
            <map name="planetmap" id="planetmap">
                <area shape="rect" href="javascript:void(0)" coords="740,180,827,220" @click="show(1)"/>
                <area shape="rect" href="javascript:void(0)" coords="548,180,636,220" @click="show(2)"/>
                <area shape="rect" href="javascript:void(0)" coords="493,50,578,90" @click="show(3)"/>
                <area shape="rect" href="javascript:void(0)" coords="373,183,458,220" @click="show(4)"/>
                <area shape="rect" href="javascript:void(0)" coords="285,183,370,220" @click="show(5)"/>
                <area shape="rect" href="javascript:void(0)" coords="50,183,180,220" @click="show(6)"/>
                <area shape="rect" href="javascript:void(0)" coords="25,311,203,351" @click="show(7)"/>
                <area shape="rect" href="javascript:void(0)" coords="50,440,180,480" @click="show(8)"/>
                <area shape="rect" href="javascript:void(0)" coords="438,445,570,484" @click="show(9)"/>
            </map>
        </el-row>

        <el-row class="row steps steps1">
            <el-col :span="24">
                <span class="inner-title">{{title}}</span>
            </el-col>
        </el-row>
        <el-row style="padding:20px 0 0 0">
            <el-radio-group v-model="selectedLine" @change="handleChnageLine">
                <el-radio-button :key="index" v-for="(item,index) in lineList" :label="item.label"></el-radio-button>
            </el-radio-group>
            <div class="bg organizeMain" v-if="selectedLine == '风险现象'">
                根据综合决策系统预测告警，环球度假区车站集中进站乘客较多，将超出车站的承受极限，仍有许多乘客在不断进入车站，站外排队人数较多。
            </div>
            <div class="bg organizeMain" v-if="selectedLine == '指标监控'">
                <ul>
                    <li>1）根据预测性告警类型，提前调用专题视频监控方案，共享客流预测数据，提示站内重点监视站厅层、进站口及站外等重点区域的客流情况，同时根据需要进行广播宣传，有序组织乘客进站；</li>
                    <li>2）利用客流感知技术，实时关注进站口的乘客数量；</li>
                    <li>3）通过互联网接口，获取园区、出租车停车区、公交停车区、自驾车停车场的人员数据，及时掌握未来30-60分钟可能的进站量；</li>
                    <li>4）与园区保持联系，获取当日售票、进园、出园的累计数量。</li>
                </ul>
            </div>
            <div class="bg organizeMain" v-if="selectedLine == '视频监控'">
                <el-row class="row">
                    <el-col :span="11" style="min-width:720px">
                        <el-col :span="24">
                            <el-col :span="12">
                                <el-select 
                                    v-model="sl1"
                                    class="inputS big"
                                    placeholder="请选择">
                                    <el-option v-for="item in camlist"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="12">
                                <el-col :span="12">
                                    <el-select 
                                    v-model="sl2"
                                    class="inputS"
                                    placeholder="请选择">
                                    <el-option v-for="item in camlist"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                                </el-col>
                                <el-col :span="12">
                                    <el-select 
                                    v-model="sl3"
                                    class="inputS"
                                    placeholder="请选择">
                                    <el-option v-for="item in camlist"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                                </el-col>
                                <el-col :span="12">
                                    <el-select 
                                    v-model="sl4"
                                    class="inputS"
                                    placeholder="请选择">
                                    <el-option v-for="item in camlist"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                                </el-col>
                                <el-col :span="12">
                                    <el-select 
                                    v-model="sl5"
                                    class="inputS"
                                    placeholder="请选择">
                                    <el-option v-for="item in camlist"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                                </el-col>
                            </el-col>
                        </el-col>
                        <el-col :span="24">
                            <el-col :span="6">
                                <el-select 
                                    v-model="sl6"
                                    class="inputS"
                                    placeholder="请选择">
                                    <el-option v-for="item in camlist"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6">
                                <el-select 
                                    v-model="sl7"
                                    class="inputS"
                                    placeholder="请选择">
                                    <el-option v-for="item in camlist"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6">
                                <el-select 
                                    v-model="sl8"
                                    class="inputS"
                                    placeholder="请选择">
                                    <el-option v-for="item in camlist"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6">
                                <el-select 
                                    v-model="sl9"
                                    class="inputS"
                                    placeholder="请选择">
                                    <el-option v-for="item in camlist"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-col>
                        <el-col :span="24">
                            <el-col :span="6">
                                <el-select 
                                    v-model="sl10"
                                    class="inputS"
                                    placeholder="请选择">
                                    <el-option v-for="item in camlist"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6">
                                <el-select 
                                    v-model="sl11"
                                    class="inputS"
                                    placeholder="请选择">
                                    <el-option v-for="item in camlist"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6">
                                <el-select 
                                    v-model="sl12"
                                    class="inputS"
                                    placeholder="请选择">
                                    <el-option v-for="item in camlist"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6">
                                <el-select 
                                    v-model="sl13"
                                    class="inputS"
                                    placeholder="请选择">
                                    <el-option v-for="item in camlist"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-col>
                    </el-col>
                    <el-col :span="11" style="min-width:720px" class="preview">
                        <el-col :span="24">
                            <el-col :span="12">
                                <div id="xg0"></div>
                            </el-col>
                            <el-col :span="12">
                                <el-col :span="12">
                                    <div id="xg1"></div>
                                </el-col>
                                <el-col :span="12">
                                    <div id="xg2"></div>
                                </el-col>
                                <el-col :span="12">
                                    <div id="xg3"></div>
                                </el-col>
                                <el-col :span="12">
                                    <div id="xg4"></div>
                                </el-col>
                            </el-col>
                        </el-col>
                        <el-col :span="24">
                            <el-col :span="6">
                                <div id="xg5"></div>
                            </el-col>
                            <el-col :span="6">
                                <div id="xg6"></div>
                            </el-col>
                            <el-col :span="6">
                                <div id="xg7"></div>
                            </el-col>
                            <el-col :span="6">
                                <div id="xg8"></div>
                            </el-col>
                        </el-col>
                        <el-col :span="24">
                            <el-col :span="6">
                                <div id="xg9"></div>
                            </el-col>
                            <el-col :span="6">
                                <div id="xg10"></div>
                            </el-col>
                            <el-col :span="6">
                                <div id="xg11"></div>
                            </el-col>
                            <el-col :span="6">
                                <div id="xg12"></div>
                            </el-col>
                        </el-col>
                    </el-col>
                </el-row>
            </div>
            <div class="bg organizeMain" v-if="selectedLine == '措施'">
                <ul>
                    <li>1）车站采取限流措施，在站外安放铁马等设施；</li>
                    <li>2）在进站口及通道处安排站务人员，有序组织乘客进站及安检，并安抚乘客情绪，确保乘客的安全；</li>
                    <li>3）通知公安人员协助维持现场秩序。</li>
                </ul>
            </div>
        </el-row>
        
            
    </div>
</template>

<script>

import 'xgplayer';
import FlvJsPlayer from 'xgplayer-flv.js';

export default {
    name: "nav01",
    data() {
        return {
            lineList: [{
                value:'0',
                label:'风险现象'
            },{
                value:'1',
                label:'指标监控'
            },{
                value:'2',
                label:'视频监控'
            },{
                value:'3',
                label:'措施'
            }],
            selectedLine:'风险现象',
            sl1:1,
            sl2:2,
            sl3:3,
            sl4:4,
            sl5:5,
            sl6:6,
            sl7:7,
            sl8:8,
            sl9:9,
            sl10:10,
            sl11:11,
            sl12:12,
            sl13:13,
            camlist:[{
                id:1,
                name:'A口闸机左侧'
            },{
                id:2,
                name:'A口闸机右侧'
            },{
                id:3,
                name:'C口闸机左侧'
            },{
                id:4,
                name:'C口闸机右侧'
            },{
                id:5,
                name:'E口闸机左侧'
            },{
                id:6,
                name:'E口闸机右侧'
            },{
                id:7,
                name:'安检口1'
            },{
                id:8,
                name:'安检口2'
            },{
                id:9,
                name:'安检口3'
            },{
                id:10,
                name:'售票机1'
            },{
                id:11,
                name:'售票机2'
            },{
                id:12,
                name:'售票机3'
            },{
                id:12,
                name:'售票机4'
            }],
            split:[{
                url:'https://172.51.215.158:30082/live/34020000001320000030@34020000001320000001.flv',
                name:'摄像头1',
                show:true
            },{
                url:'https://172.51.215.158:30082/live/34020000001320000026@34020000001320000001.flv',
                name:'摄像头1',
                show:false
            },{
                url:'https://172.51.215.158:30082/live/34020000001320000027@34020000001320000001.flv',
                name:'摄像头1',
                show:false
            },{
                url:'https://172.51.215.158:30082/live/34020000001320000081@34020000001320000001.flv',
                name:'摄像头1',
                show:false
            },{
                url:'https://172.51.215.158:30082/live/34020000001320000081@34020000001320000001.flv',
                name:'摄像头1',
                show:false
            },{
                url:'https://172.51.215.158:30082/live/34020000001320000081@34020000001320000001.flv',
                name:'摄像头1',
                show:false
            },{
                url:'https://172.51.215.158:30082/live/34020000001320000081@34020000001320000001.flv',
                name:'摄像头1',
                show:false
            },{
                url:'https://172.51.215.158:30082/live/34020000001320000081@34020000001320000001.flv',
                name:'摄像头1',
                show:false
            },{
                url:'https://172.51.215.158:30082/live/34020000001320000081@34020000001320000001.flv',
                name:'摄像头1',
                show:false
            },{
                url:'https://172.51.215.158:30082/live/34020000001320000081@34020000001320000001.flv',
                name:'摄像头1',
                show:false
            },{
                url:'https://172.51.215.158:30082/live/34020000001320000081@34020000001320000001.flv',
                name:'摄像头1',
                show:false
            },{
                url:'https://172.51.215.158:30082/live/34020000001320000081@34020000001320000001.flv',
                name:'摄像头1',
                show:false
            }],
            title:'进站口',
            titleAll:['进站口','安检口','售票机','闸机','核酸检测','站厅分流区域','楼梯/电扶梯/直梯','站台','屏蔽门/车门'],
            defult:''
        };
    },
    created() {},
    computed: {},
    mounted() {
        window.addEventListener("resize", this.resizefunc);
        this.$nextTick(() => {
            // this.getData();
        });
        

        for (let index = 0; index < 14; index++) {
            this.split[index].videoPlayer = new FlvJsPlayer({
                "id": "xg" + index,
                "url": this.split[1].url,
                "autoplay": true,
                "videoInit": true,
                "volume": 0,
                "ignores": ['progress'],
                "width": '100%',
                "height": '100%'
            });
            this.split[index].videoPlayer.play()
        }
        this.defult.play()
        
    },
    //移除事件监听
    beforeDestroy() {
        window.removeEventListener("resize", this.resizefunc);
        this.resizefunc = null;
        for (let index = 0; index < this.split.length; index++) {
            this.split[index].videoPlayer.destroy(true)
        }
        this.defult.destroy(true)
    },
    methods: {
        show(index){
            this.title = this.titleAll[index - 1]
        },
        async handleChnageLine(value) {
            this.selectedLine = value;
            if(value == '视频监控'){
                for (let index = 0; index < 14; index++) {
                    this.split[index].videoPlayer = new FlvJsPlayer({
                        "id": "xg" + index,
                        "url": this.split[1].url,
                        "autoplay": true,
                        "videoInit": true,
                        "volume": 0,
                        "ignores": ['progress'],
                        "width": '100%',
                        "height": '100%'
                    });
                    this.split[index].videoPlayer.play()
                }
                this.defult.play()
            }
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
.hotarea{text-align: center;position: relative;}
.organizeMain{min-height: calc(100vh - 685px);}
.preview{float: right;}
</style>
