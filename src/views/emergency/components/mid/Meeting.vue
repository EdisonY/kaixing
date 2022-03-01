<template>
    <div class="train-passenger-panel">
        <el-radio-group v-model="curPage" style="margin:10px;">
            <el-radio-button label="线网图"></el-radio-button>
            <el-radio-button label="场段图"></el-radio-button>
            <el-radio-button label="运行图"></el-radio-button>
            <el-radio-button label="客流监视"></el-radio-button>
            <el-radio-button label="单兵" disabled></el-radio-button>
            <el-radio-button label="聊天记录" disabled></el-radio-button>
        </el-radio-group>
        <div class="div-row"  style="margin:10px 0;">
            <el-table v-if="false"
                :data="passengerData"
                border
                height="100%"
                style="width: 100%;">
                <el-table-column type="index"
                    width="50"> </el-table-column>
                <el-table-column prop="info"
                    label="信息">
                </el-table-column>
                <el-table-column prop="position"
                    label="地点"
                    width="180">
                </el-table-column>
                <el-table-column prop="time"
                    width="180"
                    label="时间">
                </el-table-column>
            </el-table>
            <img v-show="curPage == '线网图'"
                :src="require('@/assets/tmp/net.png')">
            <img v-show="curPage == '场段图'"
                :src="img">
            <img v-show="curPage == '运行图'"
                :src="require('@/assets/tmp/加车后.png')">
            <img v-show="curPage == '客流监视'"
                :src="imgMeeting">
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            curPage: "线网图",
            timerCounter: 0,
            timer: null,
            img: require("@/assets/tmp/0.jpg"),
            imgMeeting: require("@/assets/tmp/meeting.png"),
            passengerData: [],
        };
    },
    mounted() {
        let self = this;
        this.$nextTick(() => {
            this.passengerData = [
                {
                    info: "东航大型客机航班C2203，预计23点34分到达首都机场，客流预计300人，航班上有位年迈的乘客。",
                    position: "机场",
                    time: "2022-03-05 22:30:34",
                },
                {
                    info: "东航大型客机航班C2203，预计23点34分到达首都机场，客流预计300人，航班上有位年迈的乘客。",
                    position: "机场",
                    time: "2022-03-05 22:30:34",
                },
                {
                    info: "东航大型客机航班C2203，预计23点34分到达首都机场，客流预计300人，航班上有位年迈的乘客。",
                    position: "机场",
                    time: "2022-03-05 22:30:34",
                },
                {
                    info: "东航大型客机航班C2203，预计23点34分到达首都机场，客流预计300人，航班上有位年迈的乘客。",
                    position: "机场",
                    time: "2022-03-05 22:30:34",
                },
                {
                    info: "东航大型客机航班C2203，预计23点34分到达首都机场，客流预计300人，航班上有位年迈的乘客。",
                    position: "机场",
                    time: "2022-03-05 22:30:34",
                },
                {
                    info: "东航大型客机航班C2203，预计23点34分到达首都机场，客流预计300人，航班上有位年迈的乘客。",
                    position: "机场",
                    time: "2022-03-05 22:30:34",
                },
                {
                    info: "东航大型客机航班C2203，预计23点34分到达首都机场，客流预计300人，航班上有位年迈的乘客。",
                    position: "机场",
                    time: "2022-03-05 22:30:34",
                },
                {
                    info: "东航大型客机航班C2203，预计23点34分到达首都机场，客流预计300人，航班上有位年迈的乘客。",
                    position: "机场",
                    time: "2022-03-05 22:30:34",
                },
                {
                    info: "东航大型客机航班C2203，预计23点34分到达首都机场，客流预计300人，航班上有位年迈的乘客。",
                    position: "机场",
                    time: "2022-03-05 22:30:34",
                },
                {
                    info: "东航大型客机航班C2203，预计23点34分到达首都机场，客流预计300人，航班上有位年迈的乘客。",
                    position: "机场",
                    time: "2022-03-05 22:30:34",
                },
                {
                    info: "东航大型客机航班C2203，预计23点34分到达首都机场，客流预计300人，航班上有位年迈的乘客。",
                    position: "机场",
                    time: "2022-03-05 22:30:34",
                },
                {
                    info: "东航大型客机航班C2203，预计23点34分到达首都机场，客流预计300人，航班上有位年迈的乘客。",
                    position: "机场",
                    time: "2022-03-05 22:30:34",
                },
                {
                    info: "东航大型客机航班C2203，预计23点34分到达首都机场，客流预计300人，航班上有位年迈的乘客。",
                    position: "机场",
                    time: "2022-03-05 22:30:34",
                },
                {
                    info: "东航大型客机航班C2203，预计23点34分到达首都机场，客流预计300人，航班上有位年迈的乘客。",
                    position: "机场",
                    time: "2022-03-05 22:30:34",
                },
            ];
        });
        this.timer = setInterval(() => {
            self.img = require(`@/assets/tmp/${self.timerCounter++ % 5}.jpg`);
        }, 3000);
    },
    methods: {},
    beforeDestroy() {
        clearInterval(this.timer);
        this.timer = null;
    },
};
</script>


<style scoped>
.train-passenger-panel {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
}

.div-row {
    flex: 1;
    height: 0;
    padding: 3px;
}
.div-row img {
    width: 100%;
    height: 100%;
    object-fit: fill;
}

.meeting {
    flex: 1;
    height: 0;
}
.meeting-test-img {
    width: 100%;
    height: 100%;
    object-fit: fill;
}

iframe {
    width: 100%;
    height: 100%;
}
</style>