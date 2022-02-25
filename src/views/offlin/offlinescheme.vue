<template>
    <div class="offline">
        <el-button type="primary" icon="el-icon-refresh">方案加载</el-button>
        <div class="programme">
            <el-row>
                <el-col :span="2">
                    <div class="titleButton">方案一</div>
                </el-col>
                <el-col :span="22">
                    <el-table
                        :data="tableData"
                        border
                        :span-method="objectSpanMethod"
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
                </el-col>
            </el-row>
            <div class="yl">运行图预留</div>
        </div>
        <div class="programme">
            <el-row>
                <el-col :span="2">
                    <div class="titleButton">方案一</div>
                </el-col>
                <el-col :span="22">
                    <el-table
                        :data="tableData"
                        border
                        :span-method="objectSpanMethod"
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
                </el-col>
            </el-row>
            <div class="yl">运行图预留</div>
        </div>
        <el-button type="success" icon="el-icon-view" class="db">
            <router-link to="/offlineresult">方案对比</router-link>
        </el-button>
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
.programme .yl{margin-top: 5px;}
.titleButton{color: #fff;background: #409eff;display: flex;width: 90%;margin: 0 auto;border-radius: 4px;min-height: 146px;align-items: center;justify-content: center;flex-direction: column;text-align: center;}
.db{position: fixed;right: 20px;bottom: 20px;}
</style>
