<template>
    <div ref="outer"
        class="flow-page">
        <div ref="inner"
            class="inner-flow-page">
            <img :src="bg">
            <div class="diy"
                id="d1"
                @click="click('开始')">
                开始
            </div>
            <div class="diy"
                id="d2"
                @click="click('启动预案')">
                启动预案
            </div>
            <div class="diy"
                id="d3"
                @click="click('客流监视')">
                客流监视
            </div>
            <div class="diy"
                id="d4"
                @click="click('列车资源')">
                列车资源
            </div>
            <div class="diy"
                id="d5"
                @click="click('应急通知')">
                应急通知
            </div>
            <div class="diy"
                id="d6"
                @click="click('上报交委状态')">
                上报交委状态
            </div>
            <div class="diy"
                id="d7"
                @click="click('应急会商')">
                应急会商
            </div>
            <div class="diy"
                id="d8"
                @click="click('确认初步方案')">
                确认初步方案
            </div>
            <div class="diy"
                id="d9"
                @click="click('调整运行图')">
                调整运行图
            </div>

            <div id="d10"
                class="diy2"
                @click="click('评价运行图')">
                <div id="d10-inner"
                    class="lingxing"></div>
                <div class="lingxing-text">
                    <p>评价运行图</p>
                    <p>是否满足</p>
                    <p>客运需求</p>
                </div>
            </div>
            <div class="diy"
                id="d11"
                @click="click('应急处置')">
                应急处置
            </div>
            <div class="d11-line">
            </div>
            <div class="d11-panel">
                <div>总调</div>
                <div class="btnMsg"
                    @click="click('线网监控重点线路')">
                    线网监控重点线路
                </div>
                <div class="btnMsg"
                    @click="click('单线ATS站场图')">
                    单线ATS站场图
                </div>
                <div class="btnMsg"
                    @click="click('站内客流监控')">
                    站内客流监控
                </div>
                <div class="btnMsg"
                    @click="click('站外视频')">
                    站外视频
                </div>
                <div>行调</div>
                <div class="btnMsg"
                    @click="click('执行延长运营')">
                    执行延长运营
                </div>
                <div>客流调</div>
                <div class="btnMsg"
                    @click="click('客流监控')">
                    客流监控
                </div>
                <div>客服调</div>
                <div class="btnMsg"
                    @click="click('乘客信息发布')">
                    乘客信息发布
                </div>
                <div class="btnMsg"
                    @click="click('舆情监控')">
                    舆情监控
                </div>
                <div>设备调</div>
                <div class="btnMsg"
                    @click="click('设备状态监控')">
                    设备状态监控
                </div>
                <div>维护调</div>
                <div class="btnMsg"
                    @click="click('取消施工计划')">
                    取消施工计划
                </div>
            </div>
            <div class="diy"
                id="d12"
                @click="click('上报交委运行方案')">
                上报交委运行方案
            </div>

            <div id="d13"
                class="diy2"
                @click="click('方案终止判断')">
                <div id="d13-inner"
                    class="lingxing done"></div>
                <div class="lingxing-text">
                    <p>方案终止判断</p>
                </div>
            </div>
            <div class="diy"
                id="d14"
                @click="click('恢复正常运营')">
                恢复正常运营
            </div>
            <div class="diy"
                id="d15"
                @click="click('统计数据撰写简报')">
                统计数据撰写简报
            </div>
            <div class="diy"
                id="d16"
                @click="click('结束')">
                结束
            </div>

            <!-- 辅助点 -->
            <div id="a0"></div>
            <div id="a1"></div>
            <div id="a2"></div>

            <!-- 文字 -->
            <p style="position:absolute;color:white;left:290px;top:525px">是</p>
            <p style="position:absolute;color:white;left:290px;top:710px">是</p>
            <p style="position:absolute;color:white;left:380px;top:480px">否</p>
            <p style="position:absolute;color:white;left:150px;top:670px">否</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bg: require("@/assets/tmp/t1.png"),
            allLine: [],
        };
    },
    mounted() {
        let self = this;
        window.onresize = function () {
            if (!self.$refs.outer) {
                return;
            }
            // 定义窗口大小变更通知事件
            // TODO 计算缩放比例
            let outwidth = self.$refs.outer.clientWidth;
            let outheight = self.$refs.outer.clientHeight;

            let rateW = outwidth / 760;
            let rateH = outheight / 1182;
            console.log(outwidth, outheight, rateW, rateH);

            self.$refs.inner.style.transform = `scale(${rateW},${rateH})`;
        };
    },
    beforeDestroy() {
        this.allLine.forEach((line) => {
            line.remove();
        });
    },
    methods: {
        click(key) {
            if (key == "开始") {
                $(function () {
                    $("#d1").addClass("done");
                });
            } else if (key == "启动预案") {
                $(function () {
                    $("#d2").addClass("done");
                });
            } else if (key == "客流监视") {
                $(function () {
                    $("#d3").addClass("done");
                });
            } else if (key == "列车资源") {
                $(function () {
                    $("#d4").addClass("done");
                });
            } else if (key == "应急通知") {
                $(function () {
                    $("#d5").addClass("done");
                });
            } else if (key == "上报交委状态") {
                $(function () {
                    $("#d6").addClass("done");
                });
            } else if (key == "应急会商") {
                $(function () {
                    $("#d7").addClass("done");
                });
            } else if (key == "确认初步方案") {
                $(function () {
                    $("#d8").addClass("done");
                });
            } else if (key == "调整运行图") {
                $(function () {
                    $("#d9").addClass("done");
                });
            } else if (key == "评价运行图") {
                $(function () {
                    $("#d10-inner").addClass("done");
                });
            } else if (key == "应急处置") {
                $(function () {
                    $("#d11").addClass("done");
                });
            } else if (key == "上报交委运行方案") {
                $(function () {
                    $("#d12").addClass("done");
                });
            } else if (key == "方案终止判断") {
                $(function () {
                    $("#d13-inner").addClass("done");
                });
            } else if (key == "恢复正常运营") {
                $(function () {
                    $("#d14").addClass("done");
                });
            } else if (key == "统计数据撰写简报") {
                $(function () {
                    $("#d15").addClass("done");
                });
            } else if (key == "结束") {
                $(function () {
                    $("#d16").addClass("done");
                });
            } else if (key == "---") {
            } else {
                this.$message({
                    message: `${key} 发送成功`,
                    type: "success",
                });
                return;
            }
            this.$emit("click", key);
        },
    },
};
</script>

<style scoped>
.flow-page {
    position: relative;
    height: 100%;
}
.inner-flow-page {
    position: absolute;
    left: 0;
    top: 0;
    width: 760px;
    height: 1182px;
}
.inner-flow-page img {
    margin-top: -5px;
    width: 100%;
    height: 100%;
    object-fit: fill;
}
.btn {
    margin: 3px;
}

.diy {
    position: absolute;
    width: 90px;
    text-align: center;
    padding: 5px 0;
    background: #666666;
    cursor: pointer;
    caret-color: transparent;
}
.diy:hover {
    background: orange;
}
.btnMsg {
    width: 90px;
    text-align: center;
    padding: 5px 0;
    margin: 2px;
    background: #666666;
    display: inline-block;
    cursor: pointer;
    caret-color: transparent;
}
.btnMsg:hover {
    background: orange;
}
.d11-line {
    position: absolute;
    left: calc(30% + 90px);
    top: 575px;
    width: 70px;
    border: solid 2px #666666;
}
.d11-panel {
    position: absolute;
    left: calc(30% + 160px);
    top: 545px;
    width: 305px;
    padding: 5px;
    border: solid 2px #666666;
}
.done {
    background: #2281da;
}
.diy2 {
    width: 90px;
    height: 90px;
    position: absolute;
    padding: 5px;
    cursor: pointer;
    caret-color: transparent;
}
.lingxing {
    width: 100%;
    height: 100%;
    background: #666666;
    transform: rotateZ(45deg) skew(-10deg, -10deg);
    cursor: pointer;
    caret-color: transparent;
}
.diy2:hover .lingxing {
    background: orange;
}
.lingxing-text {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
}

/* 开始 */
#d1 {
    left: 30%;
    top: 0;
}
/* 启动预案 */
#d2 {
    left: 30%;
    top: 60px;
}
/* 客流监视 */
#d3 {
    left: 10%;
    top: 120px;
}
/* 列车资源 */
#d4 {
    left: 50%;
    top: 120px;
}
/* 辅助点 */
#a0 {
    position: absolute;
    width: 10px;
    height: 10px;
    left: calc(30% + 45px);
    top: 200px;
}
/* 辅助点 */
#a1 {
    position: absolute;
    width: 10px;
    height: 10px;
    left: calc(30% + 45px);
    top: 210px;
}
/* 应急通知 */
#d5 {
    left: 30%;
    top: 240px;
}
/* 上报交委现状 */
#d6 {
    left: 5%;
    top: 240px;
}
/* 应急会商 */
#d7 {
    left: 30%;
    top: 300px;
}
/* 确认初步方案 */
#d8 {
    left: 30%;
    top: 360px;
}
/* 调整运行图 */
#d9 {
    left: 72%;
    top: 400px;
}
/* 评价运行图是否满足客运需求 */
#d10 {
    left: 30%;
    top: 430px;
}
/* 辅助点 */
#a2 {
    position: absolute;
    width: 10px;
    height: 10px;
    left: calc(30% + 45px);
    top: 525px;
}
/* 应急处置 */
#d11 {
    left: 30%;
    top: 560px;
}
/* 上报交委运行方案 */
#d12 {
    left: 5%;
    top: 560px;
}
/* 方案终止判断 */
#d13 {
    left: 30%;
    top: 620px;
}
/* 恢复正常运营 */
#d14 {
    left: 30%;
    top: 740px;
}
/* 统计数据撰写简报 */
#d15 {
    left: 30%;
    top: 800px;
}
/* 结束 */
#d16 {
    left: 30%;
    top: 880px;
}
</style>