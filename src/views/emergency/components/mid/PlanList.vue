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
        <el-dialog title="北京市首都机场夜间大客流应急预案"
            :visible.sync="pdfDialogVisible"
            width="50%">
            <pdf v-for="i in numPages"
                :key="i"
                :src="url"
                :page="i"></pdf>

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
            url: "",
            numPages: 1,
            data: [
                {
                    name: "北京市首都机场夜间大客流应急预案",
                    version: "2021版",
                    condition:
                        "恶劣天气可能带来能见度低、温差过大、水位超高、设施设备损坏",
                },
            ],
        };
    },
    methods: {
        showPdf() {
            this.getNumPages(
                "http://172.51.216.72:41004/北京市首都机场夜间大客流应急预案.pdf"
            );
            this.pdfDialogVisible = true;
        },
        getNumPages(url) {
            let loadingTask = pdf.createLoadingTask(url);
            this.url = loadingTask;
            this.url.promise.then((pdf) => {
                this.numPages = pdf.numPages;
            });
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
.el-dialog__body {
    overflow-y: auto;
}
</style>