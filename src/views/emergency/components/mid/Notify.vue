<template>
    <div class="notify-panel">
        <div class="notify-header">
            <p>联系人名单</p>
            <el-button @click="selectAll(true)"
                type="primary"
                size="mini">全部选择</el-button>
            <el-button @click="selectAll(false)"
                type="primary"
                size="mini">全部取消</el-button>
        </div>
        <div class="div-row">
            <div class="group"
                v-for="(item,index) in contactlist"
                :key="index">
                <p class="group-title">{{item.group}}</p>
                <div class="members">
                    <div v-for="(mitem,mindex) in item.members"
                        :key="mindex">
                        <el-checkbox-button class="contact-item"
                            v-model="mitem.check">
                            <div style="text-align:center;">
                                <img style="width:40px;height:40px"
                                    src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png">
                                <p>{{mitem.role}}</p>
                                <p>{{mitem.phone}}</p>
                            </div>
                        </el-checkbox-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="notify-bottom">
            <el-button @click="sendMsg"
                type="primary"
                style="height:50px">短信通知</el-button>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            contactlist: [],
        };
    },
    mounted() {
        this.$nextTick(() => [
            (this.contactlist = [
                {
                    group: "应急领导小组",
                    members: [
                        {
                            name: "",
                            check: true,
                            phone: "138****1888",
                            role: "总指挥",
                        },
                        {
                            name: "",
                            check: true,
                            phone: "138****1888",
                            role: "总指挥",
                        },
                        {
                            name: "",
                            check: true,
                            phone: "138****1888",
                            role: "总指挥",
                        },
                    ],
                },
                {
                    group: "应急领导成员",
                    members: [
                        {
                            name: "",
                            check: true,
                            phone: "138****1888",
                            role: "调度1",
                        },
                        {
                            name: "",
                            check: true,
                            phone: "138****1888",
                            role: "调度2",
                        },
                        {
                            name: "",
                            check: true,
                            phone: "138****1888",
                            role: "调度3",
                        },
                        {
                            name: "",
                            check: true,
                            phone: "138****1888",
                            role: "调度1",
                        },
                        {
                            name: "",
                            check: true,
                            phone: "138****1888",
                            role: "调度2",
                        },
                        {
                            name: "",
                            check: true,
                            phone: "138****1888",
                            role: "调度3",
                        },
                        {
                            name: "",
                            check: true,
                            phone: "138****1888",
                            role: "调度1",
                        },
                        {
                            name: "",
                            check: true,
                            phone: "138****1888",
                            role: "调度2",
                        },
                        {
                            name: "",
                            check: true,
                            phone: "138****1888",
                            role: "调度3",
                        },
                        {
                            name: "",
                            check: true,
                            phone: "138****1888",
                            role: "调度1",
                        },
                        {
                            name: "",
                            check: true,
                            phone: "138****1888",
                            role: "调度2",
                        },
                        {
                            name: "",
                            check: true,
                            phone: "138****1888",
                            role: "调度3",
                        },
                    ],
                },
            ]),
        ]);
    },
    methods: {
        selectAll(value) {
            if (this.contactlist && this.contactlist.length > 0) {
                this.contactlist.forEach((group) => {
                    group.members.forEach((m) => {
                        m.check = value;
                    });
                });
            }
        },
        async sendMsg() {
            let sendCount = 0;
            if (this.contactlist && this.contactlist.length > 0) {
                this.contactlist.forEach((group) => {
                    group.members.forEach((m) => {
                        if (m.check) {
                            sendCount++;
                        }
                    });
                });
            }
            if (sendCount > 0) {
                this.$message({
                    message: "发送成功",
                    type: "success",
                });
            } else {
                this.$message({
                    message: "请选择联系人",
                    type: "warning",
                });
            }
        },
    },
};
</script>


<style scoped>
.notify-panel {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
}

.notify-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;
}
.notify-header p {
    flex: 1;
    text-align: left;
    font-size: 1.2rem;
    color: #6db9f7;
    line-height: 50px;
}

.div-row {
    flex: 1;
    padding: 3px;
    overflow: auto;
}

.notify-bottom {
    padding: 20px;
    text-align: right;
}

.group {
    padding: 20px;
    margin: 10px;
    background: #0005;
}

.group-title {
    font-size: 1.1rem;
}

.members {
}
.members > div {
    display: inline-block;
    margin: 10px;
}
</style>