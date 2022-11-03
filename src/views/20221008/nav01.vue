<template>
    <div>
        <el-row>
            <el-col :span="3"
                class="leftside">
                <el-menu default-active="1"
                    @open="handleOpen"
                    @close="handleClose"
                    @select="handleSelect"
                    background-color="#1d1e39"
                    text-color="#fff"
                    active-text-color="#6eb5ff">
                    <el-menu-item index="1">
                        <span slot="title">常态历史客流查询</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <span slot="title">活动增量客流分析</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <span slot="title">开行方案设计与验证</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <span slot="title">客运组织方案的设计与验证</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="21">
                <div class="rightside">
                    <History v-if="active=='1'" :key="active" />
                    <Analysis v-if="active=='2'" :key="active"  />
                    <Verify v-if="active=='3'" :key="active"  />
                    <Organize v-if="active=='4'" :key="active"  />
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import History from "./components/history.vue";
import Analysis from "./components/analysis.vue";
import Verify from "./components/verify.vue";
import Organize from "./components/organizeNew.vue";

export default {
    components: { History, Analysis ,Verify,Organize },
    name: "nav01",
    data() {
        return {
            active: "2",
            options: [
                {
                    label: "线路",
                    options: [],
                },
                {
                    label: "车站",
                    options: [],
                },
            ],
        };
    },
    created() {},
    computed: {},
    mounted() {},
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleSelect(key, keyPath) {
            this.active = key;
            this.$forceUpdate();
        },

        getSearch() {
            var type = this.value.substring(0, 1);
            for (let index = 0; index < LINETRAIN.length; index++) {
                if (type == "L") {
                    if (this.value == LINETRAIN[index].LineID) {
                        var data = {
                            value: LINETRAIN[index].LineID,
                            label: LINETRAIN[index].LineName,
                        };
                        this.choseLine(data);
                    }
                } else if (type == "S") {
                    if (this.value == LINETRAIN[index].StationID) {
                        var data = {
                            value: LINETRAIN[index].LineID,
                            label: LINETRAIN[index].LineName,
                        };
                        this.choseLine(data);

                        var data1 = {
                            value: LINETRAIN[index].StationID,
                            label: LINETRAIN[index].StationName,
                        };
                        this.choseStation(data1);
                    }
                }
            }
        },
        choseLine(item) {
            this.choseBtn0 = item.label;
            this.choseBtn1 = "";
            this.activeName = "2";
            this.stationList = [];
            for (let index = 0; index < LINETRAIN.length; index++) {
                if (LINETRAIN[index].LineID == item.value) {
                    this.stationList.push({
                        value: LINETRAIN[index].StationID,
                        label: LINETRAIN[index].StationName,
                        chose: false,
                    });
                }
            }

            for (
                let index = 0;
                index < this.options[0].options.length;
                index++
            ) {
                if (this.choseBtn0 == this.options[0].options[index].label) {
                    this.options[0].options[index].chose = true;
                } else {
                    this.options[0].options[index].chose = false;
                }
            }

            this.showButton("line");
        },
        choseStation(item) {
            this.choseBtn1 = item.label;
            this.activeName = "";

            for (let index = 0; index < this.stationList.length; index++) {
                if (this.choseBtn1 == this.stationList[index].label) {
                    this.stationList[index].chose = true;
                } else {
                    this.stationList[index].chose = false;
                }
            }

            this.showButton("station");
        },
        showButton(type) {
            if (type == "line") {
                this.jumpButton[0].show = true;
                this.jumpButton[1].show = true;
                this.jumpButton[2].show = false;
                this.jumpButton[3].show = false;
                this.choseFinal(0);
            } else if (type == "station") {
                this.jumpButton[2].show = true;
                this.jumpButton[3].show = true;
                this.choseFinal(2);
            }
        },
        choseFinal(index) {
            if ($("#add").length > 0) {
                $("#add").remove();
            }

            var iframe = document.createElement("iframe");
            iframe.src = this.jumpButton[index].url;
            iframe.id = "add";
            iframe.frameBorder = "0";
            iframe.width = "100%";
            iframe.height = "100%";
            document.getElementById("rightside").appendChild(iframe);

            for (let index = 0; index < this.jumpButton.length; index++) {
                this.jumpButton[index].active = false;
            }
            this.jumpButton[index].active = true;
        },
    },
};
</script>

<style scoped>
.el-submenu >>> .el-submenu__title {
    background: transparent !important;
}

.rightside {padding: 20px 30px 0 30px;}
.leftside {padding: 20px 0 0 0;position: relative;}
.leftside::after{content: '';display: block;position: fixed;left: 0;bottom: 0px;width: 12.5%;height: calc(100vh - 80px);background: #1d1e39;}
.leftside .el-menu{border:none;height: calc(100vh - 80px) !important;z-index: 2;}
.leftside .el-menu .el-menu-item{font-size: 16px;}
</style>
