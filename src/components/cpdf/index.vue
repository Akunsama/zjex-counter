<template>
      <div  class='cpdf' >
      	<embed  width="100%" height="100%" name="plugin" v-bind:src="fileres" type="application/pdf" internalinstanceid="154">
      </div>
</template>

<script>
	  export default {
	    name: 'c-pdf',
     	props:{
	        fileres:{
	        	type:String,
            default:''
	        }
    	},
	     data() {
	        return {
	       		a:1
	        }
	     },
	     methods: {
	     
	     },
	     computed: {
	       
	     },
	     mounted() {
	      
	     }
	  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cpdf {
           position: fixed;
           top: 0;
           left: 0;
           background-color: rgba(0, 0, 0, .5);
           width: 100%;
           height: 100%;
           z-index: 99999;
           display: flex;
           justify-content: center;
           align-items: center;
           .center {
                 text-align: center;
                 height: 100%;
                 overflow: auto;
                 padding-top: 20px;
                 .contor {
                       margin-bottom: 10px;
                 }
           }
     }
</style>