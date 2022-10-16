<template>
    <div class="plane submainnew">
        <div class="grid-content">
            <div class="choseLine">
                <el-select v-model="value" placeholder="选择线路" @change="getSearch()">
                    <el-option
                        v-for="item in options[0].options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                </el-select>

                <el-select v-model="value1" placeholder="选择车站">
                    <el-option
                        v-for="item in options[1].options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                </el-select>
            </div>
            <img src="../../assets/new/img3.png" />

        </div>

        

    </div>
</template>

<script>

export default {
    name: "plane",
    data(){
        return{
            options: [{
                label: '线路',
                options: []
                }, {
                label: '车站',
                options: []}
            ],
            value:'',
            value1:''
        }
    },
    created(){
        for (let index = 0; index < LINETRAIN.length; index++) {
            if(this.options[0].options.length == 0 || this.options[0].options[this.options[0].options.length - 1].value != LINETRAIN[index].LineID){
                this.options[0].options.push({
                    value:LINETRAIN[index].LineID,
                    label:LINETRAIN[index].LineName,
                    chose:false
                })
            }
            this.options[1].options.push({
                value:LINETRAIN[index].StationID,
                label:LINETRAIN[index].LineName + ' - ' + LINETRAIN[index].StationName,
                chose:false
            })
        }
        console.log(this.options);
    },
    computed: {

    },
    mounted(){
        charts = this.$echarts.init(this.$refs.echart,'dark');
        charts.setOption(option, true);
    },
    methods:{
        getSearch(){
            console.log(this.value);
            this.options[1].options = []
            var type = this.value.substring(0,1)
            for (let index = 0; index < LINETRAIN.length; index++) {
                if(this.value == LINETRAIN[index].LineID){
                    this.options[1].options.push({
                        value:LINETRAIN[index].StationID,
                        label:LINETRAIN[index].LineName + ' - ' + LINETRAIN[index].StationName,
                        chose:false
                    })
                }
            }


        },
    }
};
</script>

<style scoped>
.passengerflow .el-card{height:calc((100vh - 110px) / 3)}
.choseLine{position: absolute;right: 20px;top: 20px;}
.grid-content{position: relative;}
</style>
