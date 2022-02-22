<template>
    <div class="choseLine">
        <h2>线路选择</h2>
        <div class="radioMain">
            <el-radio v-model="radio1" label="1" border disabled>1号线</el-radio>
            <el-radio v-model="radio1" label="2" border disabled>2号线</el-radio>
            <el-radio v-model="radio1" label="3" border disabled>4号线</el-radio>
            <el-radio v-model="radio1" label="4" border disabled>5号线</el-radio>
            <el-radio v-model="radio1" label="5" border disabled>6号线</el-radio>
            <el-radio v-model="radio1" label="6" border disabled>7号线</el-radio>
            <el-radio v-model="radio1" label="7" border disabled>8号线</el-radio>
            <el-radio v-model="radio1" label="8" border disabled>9号线</el-radio>
            <el-radio v-model="radio1" label="9" border disabled>10号线</el-radio>
            <el-radio v-model="radio1" label="10" border disabled>11号线</el-radio>
            <el-radio v-model="radio1" label="11" border disabled>13号线</el-radio>
            <el-radio v-model="radio1" label="12" border disabled>14号线</el-radio>
            <el-radio v-model="radio1" label="13" border disabled>15号线</el-radio>
            <el-radio v-model="radio1" label="14" border disabled>16号线</el-radio>
            <el-radio v-model="radio1" label="15" border disabled>17号线</el-radio>
            <el-radio v-model="radio1" label="16" border disabled>19号线</el-radio>
            <el-radio v-model="radio1" label="17" border disabled>八通线</el-radio>
            <el-radio v-model="radio1" label="18" border disabled>昌平线</el-radio>
            <el-radio v-model="radio1" label="19" border disabled>大兴线</el-radio>
            <el-radio v-model="radio1" label="20" border disabled>房山线</el-radio>
            <el-radio v-model="radio1" label="21" border disabled>亦庄线</el-radio>
            <el-radio v-model="radio1" label="22" border disabled>燕房线</el-radio>
            <el-radio v-model="radio1" label="23" border disabled>S1号线</el-radio>
            <el-radio v-model="radio1" label="24" border>首都机场线</el-radio>
            <el-radio v-model="radio1" label="25" border disabled>大兴机场线</el-radio>
            <el-radio v-model="radio1" label="26" border disabled>西郊线</el-radio>
            <el-radio v-model="radio1" label="27" border disabled>亦庄T1线</el-radio>
        </div>
        <el-button type="primary" @click="jump()">确定</el-button>
    </div>
</template>

<script>


export default {
    name: 'index',
    components:{
    },
    data () {
        return {
            radio1:'24',
        }
    },
    created () {
        
    },
    computed: {
        
    },
    mounted(){
        
    },
    methods:{
        jump(){
            this.$router.push({ path: '/programme/base' })
        }
    },
    destroyed() {
    }
}
</script>

<style>
.choseLine{margin: 40px;}
.choseLine h2{font-size: 20px;font-weight: bold;padding-bottom: 20px;}
.choseLine .radioMain{padding: 10px 0 20px 0;}
.choseLine .radioMain label{margin: 0 10px 10px 10px;background: #fff;}
</style>