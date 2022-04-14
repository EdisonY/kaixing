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
                <div class="container splitMain">
                    <div id="xg"></div>
                    <h2><span>摄像头1</span></h2>
                </div>
                <div class="container" :class="{'now' : item.show}" v-for="(item,index) in split" :key="index" @click="splitthis(index)" >
                    <div :id="'xg' + index"></div>
                    <h2>{{item.name}}</h2>
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
                url:'',
                name:'摄像头1',
                show:false
            },{
                url:'',
                name:'摄像头1',
                show:true
            },{
                url:'',
                name:'摄像头1',
                show:false
            },{
                url:'',
                name:'摄像头1',
                show:false
            },{
                url:'',
                name:'摄像头1',
                show:false
            },{
                url:'',
                name:'摄像头1',
                show:false
            },{
                url:'',
                name:'摄像头1',
                show:false
            }],
            
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
            for (let index = 0; index < this.split.length; index++) {
                this.split[index].show = false
                if(spot == index){
                    this.split[index].show = true
                }
            }
        },
        getVideo(){
			this.videoPlayer = new FlvJsPlayer({
                "id": "xg",
                "url": "https://172.51.215.158:30082/live/34020000001320000085@34020000001320000001.flv",
                "volume": 0.7,
                "autoplay": true,
                "videoInit": true,
                "ignores": ['progress'],
                "fitVideoSize":'auto',
		    });
            this.videoPlayer.play()
		}
    },
    destroyed() {
    }
}
</script>

<style>
.cctv{height:calc(100vh - 60px);padding: 20px;}
.cctv .previewMain{height: 100%;}
.split {padding: 20px 0;width:820px;margin: 0 auto;min-height: 712px;}
.split .container{float: left;width:190px;height: 156.7px;background: #ccc;margin: 0 15px 15px 0;cursor: pointer;position: relative;border:4px solid #000;overflow: hidden;}
.split .splitMain{width: 600px;height: 500px;border-color: red;}
.split .container h2{position: absolute;width: 100%;height: 40px;line-height:40px; display: block;left: 0;bottom: 0;padding: 0 0 0 20px;}
.split .container h2::after{content: '';width: 100%;height: 40px;background-color: #000;display: block;position: absolute;left:0;bottom: 0;opacity: 0.3;}
.split .container h2 span{position: relative;z-index: 2;}
.split .splitMain h2,.split .splitMain h2::after{top: 0;color: #fff;font-weight: bold;}
.split .container.now{border-color: red;}
</style>