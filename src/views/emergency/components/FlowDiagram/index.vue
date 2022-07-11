<template>
    <div id="flow-panel">
        <div id="storm-holder">

        </div>
    </div>
</template>

<script>
import { initPaper, resizePaper, drawNode, drawLink } from "./paperUtil";
let paper = null;
let FLOWDATA = null;
export default {
    data() {
        return {};
    },
    mounted() {
        this.initPaper();
    },
    methods: {
        initPaper() {
            // 获取父容器宽高
            const panel = document.getElementById("flow-panel");
            const h = panel.offsetHeight; //高度
            const w = panel.offsetWidth; //宽度

            paper = initPaper("storm-holder", w, h, this.paperEventCallback);
            window.onresize = this._panelSizeChange.bind(this);
        },
        _panelSizeChange() {
            paper.setDimensions(0, 0); // 修复从大到小缩放的时候容器高度计算错误的问题
            const panel = document.getElementById("flow-panel");
            const h = panel.offsetHeight; //高度
            const w = panel.offsetWidth; //宽度
            resizePaper(paper, w, h);
        },
        initFlow(flowdata) {
            FLOWDATA = flowdata;

            if (!paper) {
                this.$notify({
                    message: "画布没有初始化完",
                    type: "warning",
                    position: "bottom-left",
                });
                return;
            }

            if (!FLOWDATA && FLOWDATA.length == 0) {
                this.$notify({
                    message: "没有有效的流程图数据",
                    type: "warning",
                    position: "bottom-left",
                });
                return;
            }

            if (FLOWDATA.nodes && FLOWDATA.nodes.length > 0) {
                FLOWDATA.nodes.forEach((node) => {
                    node.model = drawNode(paper, node);
                });
            } else {
                this.$notify({
                    message: "没有有效的流程图节点",
                    type: "warning",
                    position: "bottom-left",
                });
                return;
            }

            if (FLOWDATA.links && FLOWDATA.links.length > 0) {
                FLOWDATA.links.forEach((lk) => {
                    let sourceData = FLOWDATA.nodes.find((item) => {
                        return item.id === lk.source;
                    });
                    let targetData = FLOWDATA.nodes.find((item) => {
                        return item.id === lk.target;
                    });
                    if (sourceData && targetData) {
                        lk.model = drawLink(
                            paper,
                            lk,
                            sourceData.model,
                            targetData.model
                        );
                    }
                });
            }

            paper.scaleContentToFit();
        },
        paperEventCallback(metadata, cellview) {
            this.$emit("next", metadata, cellview);
        },
    },
};
</script>


<style scoped>
#flow-panel {
    flex: 1;
    overflow-y: auto;
    margin: 5px;
}
</style>