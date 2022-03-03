<template>
    <div class="app-wrapper">
        <el-row :span="24">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" class="left">
                <!-- <h2>开行方案编制</h2> -->
                <sidebar class="sidebar-container" />
            </el-col>
            <el-col :xs="16" :sm="18" :md="20" :lg="21" :xl="23" class="main-container">
                <router-view />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'


export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar
    }),
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
@include clearfix;
position: relative;
height: 100%;
width: 100%;
&.mobile.openSidebar{
    position: fixed;
    top: 0;
}
}
.drawer-bg {
background: #000;
opacity: 0.3;
width: 100%;
top: 0;
height: 100%;
position: absolute;
z-index: 999;
}

.fixed-header {
position: fixed;
top: 0;
right: 0;
z-index: 9;
// width: calc(100% - #{$sideBarWidth});
width: calc(100% - 208px);
transition: width 0.28s;
}

.hideSidebar .fixed-header {
width: calc(100% - 208px)
}

.mobile .fixed-header {
width: 100%;
}
.copyright{position: fixed;right: 20px;bottom:5px;z-index: 999999999;}
#app .main-container{margin-left: 0;width: calc(100% - 208px);background: #000;}
.rightMain{padding:20px;background-color: #F4F7FC;}
.left{height: calc(100vh - 60px);width: 208px;color: #fff;text-align: center;padding: 15px 0;}
.left h2{font-size: 20px;padding-bottom: 15px;}
</style>
