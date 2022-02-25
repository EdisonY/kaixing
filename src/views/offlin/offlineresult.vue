<template>
    <div class="offline offlineresult">
        <el-divider content-position="left">比选结果</el-divider>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="date"
                align="center"
                label="起止时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="交路方式"
                align="center"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                align="center"
                label="跳停车站">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                    <p>姓名: {{ scope.row.name }}</p>
                    <p>住址: {{ scope.row.address }}</p>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.name }}</el-tag>
                    </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="xinxi"
                align="center"
                label="编组信息">
            </el-table-column>
            <el-table-column
                prop="duishu"
                align="center"
                label="开行对数">
            </el-table-column>
        </el-table>
        <el-divider content-position="left">方案详情</el-divider>
        <div class="programme">
            <el-row>
                <el-col :span="2">
                    <div class="titleButton"><span>方案一</span>7号线工作日<br>正常图</div>
                </el-col>
                <el-col :span="22">
                    <div class="yl">运行图预留</div>
                </el-col>
            </el-row>
            
        </div>
        <div class="programme">
            <el-row>
                <el-col :span="2">
                    <div class="titleButton titleButtonSec"><span>方案二</span>7号线工作日<br>双超图</div>
                </el-col>
                <el-col :span="22">
                    <div class="yl">运行图预留</div>
                </el-col>
            </el-row>
        </div>
        <el-button type="success" icon="el-icon-view" class="db">方案对比</el-button>
    </div>
</template>

<script>

export default {
    name: 'offline',
    data () {
        return {
            tableData: [{
                date: '05:00:00-07:00:00',
                name: '3号航站楼-东直门',
                address: '无',
                xinxi:'4L',
                duishu:'15对'
            },{
                date: '05:00:00-07:00:00',
                name: '3号航站楼-东直门',
                address: '无',
                xinxi:'4L',
                duishu:'15对'
            }], 
        }
    },
    methods: {
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
        }
    }
}
</script>

<style>
.offline{padding: 20px;}
.programme{padding: 10px 0;}
.offlineresult h2{font-size: 20px;font-weight: bold;color: #409eff;}
.offlineresult .programme .yl{margin-top: 0;height: 240px;}
.titleButton{color: #fff;background: #409eff;display: flex;width: 90%;margin: 0 auto;border-radius: 4px;min-height: 146px;align-items: center;justify-content: center;flex-direction: column;text-align: center;}
.titleButton span{display: block;font-size: 20px;font-weight: bold;}
.titleButtonSec{background: #ccc;}
.db{position: fixed;right: 20px;bottom: 20px;}
.offlineresult .el-divider__text{background: #000;color: #409eff;font-size: 20px;font-weight: bold;}
.offlineresult .el-divider{background-color: #409eff;}
</style>
