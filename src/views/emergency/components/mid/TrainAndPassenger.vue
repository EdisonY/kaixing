<template>
    <div class="train-passenger-panel">
        <div class="div-row">
            <el-table :data="passengerData"
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
        </div>
        <div class="div-row">
            <!-- <iframe src="https://cn.bing.com"
                frameborder="0"></iframe> -->
            <img :src="img">
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            timerCounter: 0,
            timer: null,
            img: require("../../../../assets/tmp/0.jpg"),
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
            self.img = require(`../../../../assets/tmp/${
                self.timerCounter++ % 5
            }.jpg`);
        }, 5000);
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

iframe {
    width: 100%;
    height: 100%;
}
</style>