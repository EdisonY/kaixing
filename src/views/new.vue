<template>
    <div class="comprehensive newtab">
        <el-row>
            <el-col :span="3" class="leftside">
                
                <el-select 
                    v-model="value" 
                    filterable 
                    @change="getSearch()"
                    placeholder="输入关键字搜索">
                    <el-option-group
                    v-for="group in options"
                    :key="group.label"
                    :label="group.label">
                    <el-option
                        v-for="item in group.options"
                        :key="item.value"
                        @click="ccc(item)"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                    </el-option-group>
                </el-select>

                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item name="1">
                        <template slot="title">
                            线路
                            <strong class="choseBtn">{{choseBtn0}}</strong>
                        </template>
                        <div class="leftsidemain">
                            <ul>
                                <li v-for="(item,index) in options[0].options" :class="{'active': item.chose}" :key = index >
                                    <el-button @click="choseLine(item)">{{item.label}}</el-button>
                                </li>
                            </ul>
                        </div>
                        
                        
                    </el-collapse-item>
                    <el-collapse-item name="2">
                        <template slot="title">
                            车站
                            <strong class="choseBtn">{{choseBtn1}}</strong>
                        </template>
                        
                        <div class="leftsidemain">
                            <ul>
                                <li v-for="(item,index) in stationList"  :class="{'active': item.chose}" :key ="index">
                                    <el-button @click="choseStation(item)">{{item.label}}</el-button>
                                </li>
                            </ul>
                        </div>
                    </el-collapse-item>
                </el-collapse>

                <div class="leftsidebottom">
                    <el-button type="primary" plain v-for="(item,index) in jumpButton" :key="index" v-if="item.show" :class="{'active':item.active}" @click="choseFinal(index)">
                        {{item.name}}
                    </el-button>
                </div>
            </el-col>
            <el-col :span="21">
                <div class="grid-content rightside" id="rightside"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

import base from '@/utils/base64'

export default {
    name: "new",
    data(){
        return{
            options: [{
                label: '线路',
                options: []
                }, {
                label: '车站',
                options: []}
            ],
            value: '',
            activeName: '1',
            choseBtn0:'',
            choseBtn1:'',
            stationList:[],
            jumpButton:[
                {
                    name:'线路客流',
                    active:false,
                    show:false,
                    type:0,
                    url:'http://frp.funenc.xyz:7245/link/qaAitH3r'
                },{
                    name:'线路运力',
                    active:false,
                    show:false,
                    type:1,
                    url:'http://frp.funenc.xyz:7245/link/XN5OcWPk'
                },{
                    name:'进出站情况',
                    active:false,
                    show:false,
                    type:2,
                    url:'http://frp.funenc.xyz:7245/link/DqAzVYn3'
                },{
                    name:'候车情况',
                    active:false,
                    show:false,
                    type:3,
                    url:'http://frp.funenc.xyz:7245/link/13z2mWyR'
                },
            ]
        }
    },
    created(){
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
        console.log(this.options);
    },
    computed: {

    },
    mounted(){
        
    },
    methods:{
        getSearch(){
            var type = this.value.substring(0,1)
            for (let index = 0; index < LINETRAIN.length; index++) {
                if(type == 'L'){
                    if(this.value == LINETRAIN[index].LineID){
                        var data = {
                            value:LINETRAIN[index].LineID,
                            label:LINETRAIN[index].LineName
                        }
                        this.choseLine(data)
                    }
                }else if(type == 'S'){
                    if(this.value == LINETRAIN[index].StationID){
                        var data = {
                            value:LINETRAIN[index].LineID,
                            label:LINETRAIN[index].LineName
                        }
                        this.choseLine(data)

                        var data1 = {
                            value:LINETRAIN[index].StationID,
                            label:LINETRAIN[index].StationName
                        }
                        this.choseStation(data1)
                    }
                }
            }


        },
        choseLine(item){
            this.choseBtn0 = item.label
            this.choseBtn1 = ''
            this.activeName = '2'
            this.stationList = []
            for (let index = 0; index < LINETRAIN.length; index++) {
                if(LINETRAIN[index].LineID == item.value){
                    this.stationList.push({
                        value:LINETRAIN[index].StationID,
                        label:LINETRAIN[index].StationName,
                        chose:false
                    })
                }
            }

            for (let index = 0; index < this.options[0].options.length; index++) {
                if(this.choseBtn0 == this.options[0].options[index].label){
                    this.options[0].options[index].chose = true
                }else{
                    this.options[0].options[index].chose = false
                }
            }

            this.showButton('line')

        },
        choseStation(item){
            this.choseBtn1 = item.label
            this.activeName = ''

            for (let index = 0; index < this.stationList.length; index++) {
                if(this.choseBtn1 == this.stationList[index].label){
                    this.stationList[index].chose = true
                }else{
                    this.stationList[index].chose = false
                }
            }

            this.showButton('station')
        },
        showButton(type){
            if(type == 'line'){
                this.jumpButton[0].show = true
                this.jumpButton[1].show = true
                this.jumpButton[2].show = false
                this.jumpButton[3].show = false
                this.choseFinal(0)
            }else if(type == 'station'){
                this.jumpButton[2].show = true
                this.jumpButton[3].show = true
                this.choseFinal(2)
            }
        },
        choseFinal(index){

            if($('#add').length > 0 ){
                $('#add').remove()
            }

            var base64 = new base();
            if(this.choseBtn1){
                var str = '{' + '"line_name":"' + this.choseBtn0 + '","station_name":"' + this.choseBtn1 + '"}';
            }else{
                var str = '{' + '"line_name":"' + this.choseBtn0 + '"}';
            }
            console.log(base64.encode(str),base64.encode(str).replace("+","%2B"));

            var iframe = document.createElement('iframe'); 
            iframe.src = this.jumpButton[index].url + '?attachParams=' + base64.encode(str).replace("+","%2B");
            iframe.id = 'add'
            iframe.frameBorder = '0';
            iframe.width = '100%';  
            iframe.height = '100%';  
            document.getElementById('rightside').appendChild(iframe);
            

            for (let index = 0; index < this.jumpButton.length; index++) {
                this.jumpButton[index].active = false
            }
            this.jumpButton[index].active = true
                        
        }
    }
};
</script>

<style scoped>

.newtab{padding: 10px;}
.leftside .el-select{width: 100%;margin-bottom: 10px;}
.leftside .el-collapse-item{position: relative;}
.leftside .choseBtn{position: absolute;top: 4px;right: 10px;background: #fff;display: block;z-index: 2;height: 38px;line-height: 38px;color: #3bafdf;font-weight: bold;}
.leftside .leftsidemain{padding: 10px;max-height: calc((100vh - 300px) / 2);overflow-y: auto;}
.leftside .leftsidemain li{height: 39px;line-height: 39px;font-size: 16px;cursor: pointer;text-align: center;}
.leftside .leftsidemain li.active button{color: #409EFF;border-color: #c6e2ff;background-color: #ecf5ff;}
.leftside .leftsidemain li .el-button,.leftside .leftsidebottom .el-button{width: 100%;}
.leftside .leftsidebottom{margin-top: 10px;}
.leftside .leftsidebottom .el-button{margin:0 0 10px 0;}
/* .leftside .leftsidebottom .el-button+.el-button{margin: 0;} */
.rightside{padding: 0 10px;height: calc(100vh - 80px);}

.leftsidebottom .active{background: #3a8ee6;border-color: #3a8ee6;color: #FFF;outline: 0;}

</style>
