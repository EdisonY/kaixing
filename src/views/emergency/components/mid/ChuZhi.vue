<template>
    <div class="train-passenger-panel">
        <div class="div-row">
            <iframe src="http://172.51.216.61:1662/thing/dtwin/index.html?name=北京城区"
                frameborder="0"></iframe>
        </div>
        <div class="div-row">
            <img :src="img">
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            img: require("../../../../assets/tmp/chuzhi.png"),
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
    height: 100%;
    object-fit: fill;
}

iframe {
    width: 100%;
    height: 100%;
}
</style>