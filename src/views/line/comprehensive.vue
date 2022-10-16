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
    },
    methods:{

    }
};
</script>

<style scoped>

.comprehensive{padding: 10px;background: #000;}
#subway{width: 100%;height:calc(100vh - 76px);}
</style>
