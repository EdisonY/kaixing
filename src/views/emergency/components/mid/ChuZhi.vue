<template>
    <div class="train-passenger-panel">
        <div class="div-row">
            <iframe v-show="cur=='线网监控重点线路'" src="http://172.51.216.61:1662/thing/dtwin/index.html?name=北京城区"
                frameborder="0"></iframe>
            <img v-show="cur=='单线ATS站场图'" style="margin:80px 0"  :src="require('@/assets/tmp/ats.gif')">
            <img v-show="cur=='站外视频'"  :src="require('@/assets/tmp/jichang.png')">
            <img v-show="cur=='站内客流监控'"  :src="require('@/assets/tmp/zhannei.png')">
        </div>
    </div>
</template>

<script>
export default {
    props:["cur"],
    components: {},
    data() {
        return {
        };
    },
    mounted() {},
    methods: {},
    beforeDestroy() {},
};
</script>


<style scoped>
.train-passenger-panel {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
}

.div-row {
    flex: 1;
    height: 0;
    padding: 3px;
}

.div-row img {
    width: 100%;
    object-fit: fill;
}

iframe {
    width: 100%;
    height: 100%;
}
</style>