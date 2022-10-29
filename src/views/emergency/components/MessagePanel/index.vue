<template>
    <div class="message-page">
        <p class="message-title">{{title}}</p>
        <div class="message-list">
            <div v-for="(item,index) in messagelist"
                :key="index"
                :class="{'message-list-item-panel':true,'message-left':!item.right,'message-right':item.right}">
                <p class="message-list-item">
                    <span class="name">{{item.name}}: </span>{{item.content}} <span class="time">{{item.time}}</span>
                </p>
            </div>

        </div>
        <div class="send-panel">
            <el-input v-model="inputdata"
                type="textarea"
                style="margin-bottom:15px"
                :rows="4"
                resize="none"></el-input>
            <el-button style="float:right"
                size="mini"
                type="primary"
                @click="send">发送</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props: ["title", "messagelist"],
    data() {
        return {
            inputdata: "",
        };
    },
    methods: {
        send() {
            this.$emit('add',this.inputdata);
            this.inputdata = "";
        },
    },
};
</script>

<style scoped>
.message-page {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
.message-title {
    text-align: left;
    margin-left: 5px;
    line-height: 40px;
    color: #6db9f7;
    font-size: 1.2rem;
}
.message-list {
    flex: 1;
    overflow: auto;
    height: 100%;
    width: 100%;
    background: #1d1e39;
}
.message-list-item-panel {
    width: 100%;
    display: flex;
    flex-direction: row;
}
.message-left {
    justify-content: flex-start;
}
.message-right {
    justify-content: flex-end;
}
.message-right p {
    background: #fff2;
}
.message-list-item {
    width: 70%;
    margin: 5px;
    padding: 3px;
    color: #cecece;
    font-size: 1rem;
    text-align: left;
    border: solid 1px #666;
    border-radius: 5px;
}
.message-list-item > .name {
    font-size: 1.1rem;
    color: #d44848;
    font-weight: bold;
}
.message-list-item > .time {
    color: #6db9f7;
    text-decoration: underline;
}

.send-panel {
    border: solid #666 1px;
    padding: 10px;
    background: #1d1e39;
    font-size: 1.1rem;
    cursor: default;
}
</style>