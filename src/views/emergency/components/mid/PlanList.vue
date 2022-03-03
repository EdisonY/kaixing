<template>
    <div>
        <div class="planitem"
            v-for="(item,index) in data"
            :key="index">
            <div class="planitem-btn"
                style="text-align:left;">
                <el-button v-if="false"
                    style="background:#FFF3"
                    type="warning"
                    size="mini"
                    plain>启动预案</el-button>
                <el-button style="float:right;"
                    type="primary"
                    size="mini"
                    round
                    @click="showPdf">预案详情</el-button>
            </div>
            <p class="plantext">预案名称: <span>{{item.name}}</span></p>
            <div class="divline"></div>
            <p class="plantext">预案版本: <span>{{item.version}}</span></p>
            <div class="divline"></div>
            <p class="plantext">启动条件: <span>{{item.condition}}</span></p>
        </div>
        <el-dialog title="提示"
            :visible.sync="pdfDialogVisible"
            width="30%">
            <pdf ref="pdf"
                :src="url">
            </pdf>
            <span slot="footer"
                class="dialog-footer">
                <el-button @click="pdfDialogVisible = false">取 消</el-button>
                <el-button type="primary"
                    @click="pdfDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import pdf from "vue-pdf";

export default {
    components: { pdf },
    data() {
        return {
            pdfDialogVisible: false,
            url: "http://172.51.216.72:41004/北京市首都机场夜间大客流应急预案.pdf",
            data: [
                {
                    name: "xx市地铁大客流数字化应急预案2016",
                    version: "2016版",
                    condition:
                        "在满足xxxx的前提下,需要xxxx就绪,如果xxxx方可启动",
                },
            ],
        };
    },
    methods: {
        showPdf() {
            this.pdfDialogVisible = true;
        },
    },
};
</script>


<style scoped>
.planitem {
    margin: 5px 10px;
    padding: 50px;
    background: #0005;
}
.plantext {
    text-align: left;
    margin-top: 0.8rem;
    font-size: 1.3rem;
    color: #666;
}
.plantext > span {
    color: #fff;
}
.condition {
    font-size: 1rem;
    color: #cecece;
}
.divline {
    border: solid 1px #222;
    margin: 20px 0;
}
</style>