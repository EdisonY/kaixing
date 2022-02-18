<template>
  <div id="app">
    <router-view />
    
  </div>
</template>

<script>


export default {
    name: 'App',
    components: { },
    data(){
        return{
        }
    },
    async created() {
        
    },
    methods: {
        
    }
}
</script>
<style>
html body{font-family:'Microsoft YaHei' !important;}
body,html{height:100%;}
.clearfix:after{content:" ";display:block;clear:both;height:0}
.fl{float:left}
.fr{float:right}
*{margin:0;padding:0}
fieldset,img,input{border:0;background:none}
address,caption,cite,code,dfn,em,i,optgroup,strong,th,var{font-style:normal;font-weight:400}
h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:400}
button,input,optgroup,option,select,textarea{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;*font-size:100%}
body{line-height:1.5;}
li,ol,ul{list-style:none}
a{text-decoration:none}
a:focus,input:focus,button:focus{outline:none}

</style>