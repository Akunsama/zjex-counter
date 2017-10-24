<template>
	<div>
		<table class="todotable odd nopadding">
			<tbody>
				<tr>
					<th>业务角色</th>
					<th>客户名称</th>
					<th>客户代码</th>
					<th>客户类型</th>
					<th>证件类型</th>
					<th style="width: 210px;">证件号码</th>
				</tr>
				<tr v-for="(item,index) in personlist">
					<td>{{item.role}}</td>
					<td>{{item.name}}</td>
					<td>{{item.custno}}</td>
					<td>{{item.custType}}</td>
					<td>{{item.certType}}</td>
					<td>{{item.certNo}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default {
		name: 'client-table',
		data() {
			return {

			}
		},
		props: {
			personlist: {
				type: Array,
				default() {
					return [{
						role:'-',
						name:'-',
						custno:'-',
						custType:'-',
						certType:'-',
						certNo:'-'	
					}]
				}

			},
		},
		methods: {

		},
		created() {

		},

	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.gqfjygh-table-div .todotable > tbody > tr > th{
		background-color: #fcfcfc;
	}
</style>