<template>
    <div class="train-passenger-panel">
        <div class="div-row">
            <el-table :data="passengerData"
                :header-cell-style="{'text-align':'center','font-weight':'bold','font-size':'1.2rem'}"
                :cell-style="{'text-align':'center'}"
                border
                height="100%"
                style="width: 100%;">
                <el-table-column type="index"
                    width="50"> </el-table-column>
                <el-table-column prop="info"
                    label="调度方案">
                </el-table-column>
                <el-table-column prop="stateinfo"
                    width="180"
                    label="执行状态">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.state === 1 ? 'success' : 'warning'"
                            disable-transitions>{{scope.row.stateinfo}}</el-tag>
                    </template>

                </el-table-column>
            </el-table>
        </div>
        <div class="div-row">
            <img :src="img">
        </div>
        <div class="meeting">
            <!-- <img class="meeting-test-img"
                :src="imgMeeting"> -->
            <iframe src="http://172.51.216.61:8011/seabed/preview/293175fd5c594ba792f797b3b30bb908"
                frameborder="0"></iframe>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            img: require("@/assets/tmp/加车后3.png"),
            imgMeeting: require("@/assets/tmp/plan.png"),
            passengerData: [],
        };
    },
    mounted() {
        let self = this;
        this.$nextTick(() => {
            this.passengerData = [
                {
                    info: "首都机场线加派两辆列车",
                    state: 0,
                    stateinfo: "未执行",
                },
                {
                    info: "首都机场线型房车间隔调整为12分钟",
                    state: 1,
                    stateinfo: "已执行",
                },
                {
                    info: "首都机场线型房车间隔调整为11分钟",
                    state: 0,
                    stateinfo: "未执行",
                },
            ];
        });
    },
    methods: {},
    beforeDestroy() {},
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
    flex: 2;
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