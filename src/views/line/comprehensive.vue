<template>
    <div style="height: calc(100vh - 60px);">
        <iframe src="http://172.16.1.110:41002" frameborder="0" style="width:100%;height:100%"></iframe>
    </div>
    <!-- <div class="comprehensive">
        <svg id="subway" xmlns="http://www.w3.org/2000/svg" version="1.1"></svg>
    </div> -->
</template>

<script>
var tctSubway = null

export default {
    name: "comprehensive",
    data(){
        return{

        }
    },
    created(){

    },
    computed: {

    },
    mounted(){
        return;
        // TODO 暂时换成iframe
        tctSubway = new tct_subway({
            tmpId: 'subway',
            fullload:true
        })
        tctSubway.listener('loaded', function() {
            // tctSubway.showLine(self.value);
            tctSubway.loadRateMultiply(tctSubway.getPosition('西直门'),tctSubway.getPosition('积水潭'),Number((Math.random(1)*100).toFixed(2)))
            // tctSubway.loadRateMultiply(tctSubway.getPosition('积水潭'),tctSubway.getPosition('鼓楼大街'),Number((Math.random(1)*100).toFixed(2)))
            // tctSubway.loadRateMultiply(tctSubway.getPosition('鼓楼大街'),tctSubway.getPosition('安定门'),Number((Math.random(1)*100).toFixed(2)))
            // tctSubway.loadRateMultiply(tctSubway.getPosition('安定门'),tctSubway.getPosition('雍和宫'),Number((Math.random(1)*100).toFixed(2)))
            // tctSubway.loadRateMultiply(tctSubway.getPosition('雍和宫'),tctSubway.getPosition('东直门'),Number((Math.random(1)*100).toFixed(2)))
            // tctSubway.loadRateMultiply(tctSubway.getPosition('东直门'),tctSubway.getPosition('东四十条'),Number((Math.random(1)*100).toFixed(2)))
            // tctSubway.loadRateMultiply(tctSubway.getPosition('东四十条'),tctSubway.getPosition('朝阳门'),Number((Math.random(1)*100).toFixed(2)))
            // tctSubway.loadRateMultiply(tctSubway.getPosition('朝阳门'),tctSubway.getPosition('建国门'),Number((Math.random(1)*100).toFixed(2)))
            // tctSubway.loadRateMultiply(tctSubway.getPosition('建国门'),tctSubway.getPosition('北京站'),Number((Math.random(1)*100).toFixed(2)))
            // tctSubway.loadRateMultiply(tctSubway.getPosition('北京站'),tctSubway.getPosition('崇文门'),Number((Math.random(1)*100).toFixed(2)))
        })
    },
    methods:{

    }
};
</script>

<style scoped>

.comprehensive{padding: 10px;background: #000;}
#subway{width: 100%;height:calc(100vh - 76px);}
</style>
