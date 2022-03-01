<template>
    <div class="train-passenger-panel">
        <div class="div-row">
            <iframe class="mid-content"
                src="http://172.51.216.61:8100/seabed/preview/a665e5ceac0c400fbfd33a38c56a8369" />
        </div>
        <div class="div-row">
            <img :src="require('@/assets/tmp/video.png')"
                alt="">
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
        };
    },
    mounted() {
    },
    methods: {},
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