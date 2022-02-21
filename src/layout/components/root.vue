<template>
    <div class="root">
        <div class="nav">
            <el-menu 
            :default-active="activeIndex" 
            class="el-menu-demo" 
            mode="horizontal" 
            @select="handleSelect"
            background-color="#000c17"
            text-color="#fff"
            active-text-color="#ffd04b">
                <el-submenu index="1">
                    <template slot="title">运输计划管理</template>
                    <el-menu-item index="1-1">
                        <router-link to="/programme/base">开行方案</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-2">离线方案对比</el-menu-item>
                </el-submenu>
                <el-menu-item index="2"><router-link to="/monitor">日常监控</router-link></el-menu-item>
                <el-submenu index="3">
                    <template slot="title">应急会商指挥</template>
                    <el-menu-item index="3-1">暴雨机场大面积航班延误</el-menu-item>
                </el-submenu>
                <el-menu-item index="4">历史数据分析</el-menu-item>
                <el-menu-item index="5">系统参数设置</el-menu-item>
            </el-menu>
        </div>
        <div class="subMain">
            <!-- <layout1 /> -->
            111
            <router-view />
        </div>
    </div>
</template>

<script>
import layout1 from '../index.vue'
export default {
  name: 'Root',
  data () {
      return {
          activeIndex: '1-1',
      }
  },
  components: { layout1 },
  computed: {
  },
  methods: {
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
.el-submenu__title{display: inline-block;}
</style>
