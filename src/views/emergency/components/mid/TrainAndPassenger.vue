<template>
    <div class="train-passenger-panel">
        <div style="padding:20px 0">
            <el-table :data="passengerData"
                border
                style="width: 100%;background">
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
        <div style="padding:20px 0">
            <el-table :data="configList"
                border
                height="100%"
                header-cell-style="text-align:center"
                cell-style="text-align:center"
                style="width: 100%;">
                <el-table-column prop="v1"
                    label="总车辆数">
                </el-table-column>
                <el-table-column prop="v2"
                    label="上线列车数">
                </el-table-column>
                <el-table-column prop="v3"
                    label="备用列车数">
                </el-table-column>
                <el-table-column prop="v4"
                    label="备用">
                </el-table-column>
            </el-table>
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
            img: require("@/assets/tmp/0.jpg"),
            passengerData: [],
            configList: [],
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
                }
            ];
            this.configList = [
                {
                    v1: 32,
                    v2: 18,
                    v3: 14,
                    v4: "",
                },
            ];
        });
        this.timer = setInterval(() => {
            self.img = require(`@/assets/tmp/${self.timerCounter++ % 5}.jpg`);
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