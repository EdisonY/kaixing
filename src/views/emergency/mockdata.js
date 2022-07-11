export const mockMessage = {
    "开始": [{
        name: "交委",
        content: "航班大面积延误，首都机场地铁配合延长运营时间",
        time: "",
        right: false,
    },
    {
        name: "总调",
        content: "通知各岗位，准备延长运营",
        time: "",
        right: true,
    }],
    "信息监视": [
        {
            name: "机场",
            content: "降落航班C2009次，到港旅客600人",
            time: "",
            right: false,
        },
        {
            name: "行调",
            content:
                "首都机场线可使用列车数为8，10号线可使用列车数为16",
            time: "",
            right: false,
        }
    ],
    "应急会商": [
        {
            name: "总调 -> 交委",
            content: "现有可调配列车车辆",
            time: "",
            right: true,
        }
    ],
    "方案确认": [
        {
            name: "总调 -> 行调",
            content: "延长运营时间 23:00-24:00",
            time: "",
            right: true,
        }
    ],
    "应急处置": [
        {
            name: "总调 -> 交委/各岗位",
            content: "延长运营方案为......",
            time: "",
            right: true,
        },
        {
            name: "总调 -> 行调",
            content: "调图满足可运需求，执行延长运营",
            time: "",
            right: true,
        },
        {
            name: "总调 -> 客流调",
            content: "配合延长运营，执行延长运营",
            time: "",
            right: true,
        },
        {
            name: "总调 -> 设备调",
            content: "取消施工计划，监控设备状态",
            time: "",
            right: true,
        },
        {
            name: "总调 -> 维护调",
            content: "取消施工计划",
            time: "",
            right: true,
        }
    ],
    "方案终止判断": [
        {
            name: "总调 -> 交委/各岗位",
            content: "恢复正常运营......",
            time: "",
            right: true,
        }
    ],
    "统计数据\n撰写简报": [
        {
            name: "总调 -> 各岗位",
            content: "统计数据，撰写运营简报......",
            time: "",
            right: true,
        }
    ],
    "结束": [
        {
            name: "总调",
            content: "暴雨场景大面积航班延误已结束",
            time: "",
            right: true,
        }
    ]

}