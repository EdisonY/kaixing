<template>
    <div ref="flow"
        class="flow-page">
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
    <!-- <div class="flow-page">
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
    </div> -->
</template>

<script>
// 线的配置
const lineOptions = {
    path: "grid",
    startSocket: "bottom",
    endSocket: "top",
    startSocketGravity: 0,
    endSocketGravity: 10,
    color: "#666",
    size: 4,
};
export default {
    data() {
        return {
            allLine: [],
        };
    },
    mounted() {
        this._createLine("d1", "d2", lineOptions);
        this._createLine("d2", "d3", lineOptions);
        this._createLine("d2", "d4", lineOptions);
        this._createLine("d3", "d5", lineOptions);
        this._createLine("d4", "d5", lineOptions);

        this._createLine("a1", "d6", { ...lineOptions, startSocket: "left" });
        this._createLine("d5", "d7", lineOptions);
        this._createLine("d7", "d8", lineOptions);
        this._createLine("d8", "d9", { ...lineOptions, startSocket: "right" });
        this._createLine("d9", "d10", { ...lineOptions, startSocket: "left" });
        this._createLine("d10", "d9", {
            ...lineOptions,
            startSocket: "right",
            endSocket: "bottom",
        });

        this._createLine("d10", "d11", lineOptions);
        this._createLine("a2", "d12", { ...lineOptions, startSocket: "left" });
        this._createLine("d11", "d13", lineOptions);
        this._createLine("d13", "d14", lineOptions);
        this._createLine("d13", "a0", {
            ...lineOptions,
            startSocket: "left",
            endSocket: "left",
            startSocketGravity: 0,
            endSocketGravity: 250,
        });
        this._createLine("d14", "d15", lineOptions);
        this._createLine("d15", "d16", lineOptions);

        // 获取指定元素
        const scrollview = this.$refs["flow"];
        // 添加滚动监听，该滚动监听了拖拽滚动条
        // 尾部的 true 最好加上，我这边测试没加 true ，拖拽滚动条无法监听到滚动，加上则可以监听到拖拽滚动条滚动回调
        scrollview.addEventListener("scroll", this._scrollChange, true);
    },
    beforeDestroy() {
        this.allLine.forEach((line) => {
            line.remove();
        });
        // 获取指定元素
        const scrollview = this.$refs["flow"];
        // 移除监听
        scrollview.removeEventListener("scroll", this._scrollChange, true);
    },
    methods: {
        _createLine(id1, id2, option) {
            this.allLine.push(
                new LeaderLine(
                    document.getElementById(id1),
                    document.getElementById(id2),
                    option
                )
            );
        },
        _scrollChange() {
            this.allLine.forEach((line) => {
                line.position();
            });
        },
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
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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