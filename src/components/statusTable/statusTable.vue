<template>
	<div>
					<div class="tableDIV">
						<table class="table">
						  <thead>
						    <tr>
						    	<th class="text-center">序号</th>
						      <th>业务类型</th>
						      <th>提交时间</th>
						      <th>审核状态</th>						      
						      <th class="text-center">查看详单</th>
						      <th class="text-center">审核日志</th>
						      <th class="text-center">操作</th>
						    </tr>
						  </thead>
						  <tbody>
						    <tr>
						    	<td class="text-center">1</td>
						      <td>非交易过户</td>
						      <td>2016/6/1 12:23:56</td>
						      <td>未审核</td>						      
						      <td class="text-center"><a><button class="btn-sm2" @click="search">查看</button></a></td>
						      <td class="text-center"><a><button class="btn-sm2">查看</button></a></td>
						      <td class="text-center"><button class="btn-sm2 recall">撤回</button></td>
						    </tr>
						    <tr>
						    	<td class="text-center">2</td>
						      <td>非交易过户</td>
						      <td>2016/6/1 12:23:56</td>
						      <td>未审核</td>						      
						      <td class="text-center"><a href="ht_10.html"><button class="btn-sm2">查看</button></a></td>
						      <td class="text-center"><a href="ht_3.html"><button class="btn-sm2">查看</button></a></td>
						      <td class="text-center"><button class="btn-sm2 recall">撤回</button></td>
						    </tr>
						    <tr>
						    	<td class="text-center">3</td>
						      <td>非交易过户</td>
						      <td>2016/6/1 12:23:56</td>
						      <td>未审核</td>						      
						      <td class="text-center"><a href="ht_10.html"><button class="btn-sm2">查看</button></a></td>
						      <td class="text-center"><a href="ht_3.html"><button class="btn-sm2">查看</button></a></td>
						      <td class="text-center"><button class="btn-sm2 recall">撤回</button></td>
						    </tr>
						  </tbody>
						</table>
					</div>	
	</div>
</template>

<script>
	import $ from 'jquery'

	
  export default {
    name: 'product-table',
    data() {
      return {

      }
    },
    props:{
		
    },
    methods: {
		search(){
			this.$router.push('/registryForm')
		}
    },
    created(){
		
    },

  }

	    
</script>

<style   rel="stylesheet/scss" lang="scss" scoped>

</style>
