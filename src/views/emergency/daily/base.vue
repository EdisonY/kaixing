<template>
    <div class="base">
        <div class="subwayLine">
            <img src="@/assets/line.png" />
        </div>
        <div style="flex:1;padding: 0 10px;overflow-y: auto;">
            <el-table height="100%"
                :data="testData1">
                <el-table-column property="date"
                    label="日期"
                    align="center">
                </el-table-column>
                <el-table-column property="day"
                    label="典型日"
                    align="center">
                </el-table-column>
                <el-table-column property="ps"
                    align="center"
                    label="备注">
                </el-table-column>
            </el-table>
        </div>
        <iframe frameborder="0"
            style="flex:1; padding: 10px;"
            src="http://172.51.216.61:8011/seabed/preview/f89a88e9711445feb279e0a58cc481a3"></iframe>
        <div style="flex:1;display: flex;flex-direction: column;">
            <h3>TOP信息</h3>
            <div style="flex:1;display: flex;flex-direction: row;">
                <iframe frameborder="0"
                    style="flex:1; padding: 10px;"
                    src="http://172.51.216.61:8011/seabed/preview/8831f9d1e7da43ca84d8223a6530085f"></iframe>
                <iframe frameborder="0"
                    style="flex:1; padding: 10px;"
                    src="http://172.51.216.61:8011/seabed/preview/ae38325cfc2f42cda33c95f454eec0c0"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "index",
    components: {},
    data() {
        return {
            testData1: [
                {
                    date: "3月1日",
                    day: "工作日",
                    ps: "历史使用者：张XX",
                },
                {
                    date: "3月3日",
                    day: "工作日",
                    ps: "",
                },
                {
                    date: "3月12日",
                    day: "双休日",
                    ps: "历史使用者：科布林",
                },
                {
                    date: "4月5日",
                    day: "双休日、节假日",
                    ps: "",
                },
                {
                    date: "4月5日",
                    day: "双休日、节假日",
                    ps: "",
                },
                {
                    date: "4月5日",
                    day: "双休日、节假日",
                    ps: "",
                },
                {
                    date: "4月5日",
                    day: "双休日、节假日",
                    ps: "",
                },
                {
                    date: "4月5日",
                    day: "双休日、节假日",
                    ps: "",
                },
                {
                    date: "......",
                    day: "......",
                    ps: "......",
                },
            ],
        };
    },
    created() {},
    computed: {},
    mounted() {},
    methods: {},
    destroyed() {},
};
</script>

<style>
.subwayLine img {
    width: 100%;
}
.base {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
.base h3 {
    padding: 10px 0 0 10px;
    color: #fff;
    font-weight: bold;
}

.test {
    transform: scale(1.4);
    transform-origin: 0 0;
}
</style>