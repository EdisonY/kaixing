<template>
    <div ref="outer"
        class="flow-page">
        <div ref="inner"
            class="inner-flow-page">
            <img :src="bg">
            <div class="diy done"
                id="d1">
                开始
            </div>
            <div class="diy done"
                id="d2">
                启动预案
            </div>
            <div class="diy done"
                id="d3">
                客流监视
            </div>
            <div class="diy done"
                id="d4">
                列车资源
            </div>
            <div class="diy"
                id="d5">
                应急通知
            </div>
            <div class="diy"
                id="d6">
                上报交委状态
            </div>
            <div class="diy"
                id="d7">
                应急会商
            </div>
            <div class="diy"
                id="d8">
                确认初步方案
            </div>
            <div class="diy"
                id="d9">
                调整运行图
            </div>

            <div id="d10"
                class="diy2">
                <div class="lingxing"></div>
                <div class="lingxing-text">
                    <p>评价运行图</p>
                    <p>是否满足</p>
                    <p>客运需求</p>
                </div>
            </div>
            <div class="diy"
                id="d11">
                应急处置
            </div>
            <div class="diy"
                id="d12">
                上报交委运行方案
            </div>

            <div id="d13"
                class="diy2">
                <div class="lingxing"></div>
                <div class="lingxing-text">
                    <p>方案终止判断</p>
                </div>
            </div>
            <div class="diy"
                id="d14">
                恢复正常运营
            </div>
            <div class="diy"
                id="d15">
                统计数据撰写简报
            </div>
            <div class="diy"
                id="d16">
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
            bg: require("../../../assets/tmp/t1.png"),
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
            console.log(key);
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