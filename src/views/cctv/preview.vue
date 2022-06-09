<template>
    <div class="cctv preview">
        <el-card class="previewMain">
            <el-select v-model="value" placeholder="编组">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" size="small">应用</el-button>
            <div class="split">
                <div class="splitMain">
                    <div id="xg"></div>
                    <h2><span>摄像头1</span></h2>
                </div>
                <div class="videoRight">
                    <div class="container" :class="{'now' : item.show}" v-for="(item,index) in split" :key="index" @click="splitthis(index)" >
                        <div :id="'xg' + index"></div>
                        <h2>{{item.name}}</h2>
                        <div class="mask"></div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import 'xgplayer';
import FlvJsPlayer from 'xgplayer-flv.js';
export default {
    name: 'index',
    components: {
        
	},
    data () {
        return {
            value:'',
            options:[],
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
            }],
            defult:''
        }
    },
    created () {
    },
    computed: {
        
    },
    mounted(){
        this.getVideo()
    },
    methods:{
        splitthis(spot){
            var self = this
            for (let index = 0; index < this.split.length; index++) {
                this.split[index].show = false
                if(spot == index){
                    self.split[index].show = true
                    self.defult.src = self.split[index].url
                    self.defult.reload()
                }
            }

            
        },
        getVideo(){
            this.defult = new FlvJsPlayer({
                "id": "xg",
                "url": this.split[0].url,
                "autoplay": true,
                "videoInit": true,
                "volume": 0,
                "ignores": ['progress'],
                "width": '100%',
                "height": '100%'
            });
            this.defult.play()
            for (let index = 0; index < this.split.length; index++) {
                this.split[index].videoPlayer = new FlvJsPlayer({
                    "id": "xg" + index,
                    "url": this.split[index].url,
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
    destroyed() {
        for (let index = 0; index < this.split.length; index++) {
            this.split[index].videoPlayer.destroy(true)
        }
        this.defult.destroy(true)
    }
}
</script>

<style>
.cctv{height:calc(100vh - 60px);padding: 20px;}
.cctv .previewMain{height: 100%;}
.previewMain .split {padding: 20px 0;width: 100%;height: calc(100vh - 194px);box-sizing: content-box;overflow: hidden;position: relative;}
.previewMain .split .container{background: #ccc;margin: 0 0 20px 0;cursor: pointer;position: relative;border:4px solid #000;overflow: hidden;height: calc((100vh - 194px) / 4 - 23px);border-radius: 4px;}
.previewMain .split .splitMain{border-color: red;box-sizing:border-box;float: left;width:calc(100% - 320px);height: calc(100vh - 194px);background: #ccc;border-radius: 4px;}
.previewMain .split .container h2{position: absolute;width: 100%;height: 40px;line-height:40px; display: block;left: 0;bottom: 0;padding: 0 0 0 20px;color: #fff;}
.previewMain .split .container h2::after{content: '';width: 100%;height: 40px;background-color: #000;display: block;position: absolute;left:0;bottom: 0;opacity: 0.3;}
.previewMain .split .container h2 span{position: relative;z-index: 2;}
.previewMain .split .splitMain h2,.split .splitMain h2::after{top: 0;color: #fff;font-weight: bold;}
.previewMain .split .container.now{border-color: red;}
.previewMain .split .container .mask{position: absolute;width: 100%;height: 100%;left: 0;top: 0;z-index: 2;}
.previewMain .videoRight{float: right;width: 300px;}
</style>