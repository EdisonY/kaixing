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
    </div>
</template>

<script>
export default {
    props: ["title", "messagelist"],
    data() {
        return {};
    },
    methods: {},
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
    background: #eee;
}
.message-list-item-panel{
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
    background: #4e9feb55;
}
.message-list-item {
    width: 70%;
    margin: 5px;
    padding: 3px;
    color: #222;
    font-size: 1rem;
    text-align: left;
    border:solid 1px #222;
    border-radius: 5px;
}
.message-list-item > .name {
    font-size: 1.1rem;
    color: #d44848;
    font-weight: bold;
}
.message-list-item > .time {
    color: #686868;
    text-decoration: underline;
}
</style>