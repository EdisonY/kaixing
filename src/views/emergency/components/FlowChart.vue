<template>
    <div class="flow-page">
        <el-button class="btn"
            size="mini"
            type="primary"
            @click="click('开始')">开始</el-button>
        <el-button class="btn"
            size="mini"
            type="primary"
            @click="click('启动预案')">启动预案</el-button>
        <el-button class="btn"
            size="mini"
            type="primary"
            @click="click('客流监视')">客流监视</el-button>
        <el-button class="btn"
            size="mini"
            type="primary"
            @click="click('列车资源')">列车资源</el-button>
        <el-button class="btn"
            size="mini"
            type="primary"
            @click="click('应急通知')">应急通知</el-button>
        <el-button class="btn"
            size="mini"
            type="primary"
            @click="click('上报交委现状')">上报交委现状</el-button>
        <el-button class="btn"
            size="mini"
            type="primary"
            @click="click('应急通知')">应急通知</el-button>
        <el-button class="btn"
            size="mini"
            type="primary"
            @click="click('应急会商')">应急会商</el-button>
        <el-button class="btn"
            size="mini"
            type="primary"
            @click="click('确认初步方案')">确认初步方案</el-button>
        <el-button class="btn"
            size="mini"
            type="primary"
            @click="click('调整运行图')">调整运行图</el-button>
        <el-button class="btn"
            size="mini"
            type="primary"
            @click="click('评价运行图是否满足需求')">评价运行图是否满足需求</el-button>
        <el-button class="btn"
            size="mini"
            type="primary"
            @click="click('应急处置')">应急处置</el-button>
        <el-button class="btn"
            size="mini"
            type="primary"
            @click="click('上报交委运行方案')">上报交委运行方案</el-button>
        <el-button class="btn"
            size="mini"
            type="primary"
            @click="click('方案终止判断')">方案终止判断</el-button>
        <el-button class="btn"
            size="mini"
            type="primary"
            @click="click('恢复正常运营')">恢复正常运营</el-button>
        <el-button class="btn"
            size="mini"
            type="primary"
            @click="click('统计数据撰写简报')">统计数据撰写简报</el-button>
        <el-button class="btn"
            size="mini"
            type="primary"
            @click="click('结束')">结束</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        click(key) {
            console.log(key);
            this.$emit("click", key);
        },
    },
};
</script>

<style scoped>
.flow-page {
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
.btn {
    margin: 3px;
}
</style>