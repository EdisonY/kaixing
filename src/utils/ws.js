import Vue from 'vue'
import stroe from '../store/index'
import { Notification } from 'element-ui'
import {wsapi} from '../../constant/rootapi.js'

var websock = null;
var global_callback = null;
var serverPort = '9000';  //webSocket连接端口
var temporary = null
var lock = 0
var time = 0
var text = ''




let loading;

function initWebSocket(){ //初始化weosocket
    //ws地址
    // var wsuri = 'ws://172.18.39.166:30260/ws;' + JSON.parse(localStorage.getItem('userInfo')).stationId + ';172.18.32.154';
    // var wsuri = 'ws://172.18.39.149:30260/ws;' + JSON.parse(localStorage.getItem('userInfo')).stationId;
    var wsuri = wsapi + JSON.parse(localStorage.getItem('userInfo')).stationId;//使用位于constant里的rootapi里的wsapi
    websock = new WebSocket(wsuri);
    websock.onmessage = function(e){  
        getSock(e);
    };
    websock.onclose = function(e){
        websocketclose(e);
    };
    websock.onopen = function () {
        websocketOpen();
    };
    //连接发生错误的回调方法
    websock.onerror = function () {
        console.log("WebSocket连接发生错误");
    }
}

function close(){
    if(websock){
        websock.onclose()
    }
}


// 实际调用的方法
function sendSock(agentData,callback){      
    global_callback = callback;
    if (websock.readyState === websock.OPEN) {
        //若是ws开启状态
        websocketsend(agentData)
    }else if (websock.readyState === websock.CONNECTING) {
        // 若是 正在开启状态，则等待1s后重新调用
        setTimeout(function () {
          sendSock(agentData,callback);
        }, 1000);
    }else {    
        // 若未开启 ，则等待1s后重新调用
        setTimeout(function () {
            sendSock(agentData,callback);
        }, 1000);
    }
}
//心跳间隔
var heart 
function heartTime() {
    heart = setTimeout(() => {
        Notification.error({
            title: '警告',
            message: '服务器连接超时！尝试重新连接...'
        })
        websock.close()
    }, 5000); 
}
// heartTime()


//数据接收
var log = []
function getSock(e){
    if(e.data && JSON.parse(e.data).msgCode == 206002){
        console.log('206002，电子调度通知的数据',e.data);
        stroe.dispatch("springboard/getWebsocketData", JSON.parse(e.data));
    }else if(e.data && JSON.parse(e.data).msgCode == 206004){
        //executeStep == 1第一次。2第二次
        console.log('206004,上报辅助决策的数据',e.data);
        stroe.dispatch("springboard/getSchemeData", JSON.parse(e.data));
    }
    // else if(e.data && JSON.parse(e.data).msgCode == 206001){
    //     console.log('206001',e.data);
    //     stroe.dispatch("springboard/getCaseData", JSON.parse(e.data));
    // }
    else if(e.data && JSON.parse(e.data).msgCode == 206006){
        console.log('206006',e.data);
        stroe.dispatch("springboard/getLogData", JSON.parse(e.data));
    }
    else if(e.data && JSON.parse(e.data).msgCode == 208003 && JSON.parse(e.data).msg.noticeCode == 0){
        console.log('应急事件页面刷新',e.data);
        Vue.prototype.$EventBus.$emit('reload')
    }
    else if(e.data && JSON.parse(e.data).msgCode == 208003 && JSON.parse(e.data).msg.noticeCode == 100){
        console.log('应急事件通知',e.data);
        Vue.prototype.$EventBus.$emit('geteme','应急事件录入通知')
        stroe.dispatch("springboard/getEmeconfirmData", JSON.parse(e.data));
        Vue.prototype.$EventBus.$emit('reload')
    }
    else if(e.data && JSON.parse(e.data).msgCode == 208003 && JSON.parse(e.data).msg.noticeCode == 200){
        console.log('应急事件确认',e.data);
        Vue.prototype.$EventBus.$emit('geteme','应急事件录入确认')
        stroe.dispatch("springboard/getEmeconfirmData", JSON.parse(e.data));
        Vue.prototype.$EventBus.$emit('reload')
    }
    else if(e.data && JSON.parse(e.data).msgCode == 208003 && JSON.parse(e.data).msg.noticeCode == 300){
        console.log('ats相关',e.data);
        Notification.error({
            title: '错误',
            message: 'ATS应用服务器异常'
        })
    }
    else if(e.data && JSON.parse(e.data).msgCode == 208003 && JSON.parse(e.data).msg.noticeCode == 400){
        console.log('关闭运行图和预览界面',e.data);
        Vue.prototype.$EventBus.$emit('closePlan')
        Vue.prototype.$EventBus.$emit('closeRunGrap')
        Vue.prototype.$EventBus.$emit('reload')
    }
    else if(e.data && JSON.parse(e.data).msgCode == 208003 && JSON.parse(e.data).msg.noticeCode == 601){
        console.log('208003 and msg.noticeCode=601',e.data);
        stroe.dispatch("springboard/getwarnData", JSON.parse(e.data));
        Vue.prototype.$EventBus.$emit('reload')
    }else if(e.data && JSON.parse(e.data).msgCode == 209001){
        console.log('209001，提醒中心电子调度命令列表刷新',e.data);
        //刷新调度命令列表
        Vue.prototype.$EventBus.$emit('refreshList')
    }else if(e.data && JSON.parse(e.data).msgCode == 209003){
        console.log('209003，上报运行图调整方案接口',e.data);
        //推送方案选择code,4.3.2.13
        stroe.dispatch("springboard/getPlanData", JSON.parse(e.data));
        //确认方案选择 4.3.3.1.10
    }
    
    else if(e.msgType == 1){
        
    }else if(JSON.parse(e.data).msgType == 4){
        console.log('msgType为4，上报日志数据');
        log.push(JSON.parse(e.data))
        window.localStorage.setItem('log',JSON.stringify(log))
    }else if(JSON.parse(e.data).msgType == -1){
        clearTimeout(heart)
        heartTime()
    }
}



//数据发送
function websocketsend(agentData){
    temporary = agentData.modulecode    
    websock.send(JSON.stringify(agentData));
}

//关闭
function websocketclose(e){
    console.log('断开了',e);
    if(e){
        console.log("connection closed (" + e.code + ")");
        reconnect()
    }
    
}

function websocketOpen(e){
    if(loading != undefined){
        loading.close()
    }
    console.log("连接成功");
    Notification.success({
        title: '注意',
        message: '服务器连接成功！'
    })
}

function reconnect(){
    lock++
    time = navigator.onLine ? 3000 : 10000
    text = navigator.onLine ? '链接丢失等待第' + lock + '次重新链接！' : '您与互联网断开连接，等待重新连接互联网！'
    // loading = Loading.service({
    //     lock:true,
    //     fullscreen:true,
    //     text:text,
    //     background:'rgba(0, 0, 0, 0.8)',
    //     spinner:'el-icon-loading'
    // });
    if(lock < 2000){
        setTimeout(() => {
            initWebSocket();
            // Vue.prototype.$getWebsocketData(Vue.prototype.modulecode[router.history.current.name]);
        },time)
    }else{
        location.reload() 
    }
}

Vue.prototype.$getCurrentDate = function getCurrentDate(time) {
    let date = time ? new Date(time) : new Date();
    let Y = date.getFullYear() + "-";
    let M =
        (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    let D = ("0" + date.getDate()).slice(-2) + " ";
    let h = ("0" + date.getHours()).slice(-2) + ":";
    let m = ("0" + date.getMinutes()).slice(-2) + ":";
    let s = ("0" + date.getSeconds()).slice(-2);
    return Y + M + D + h + m + s;
};

export{ sendSock,initWebSocket,close,getSock }