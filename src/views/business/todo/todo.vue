<template>
	<div class="">
		<router-view></router-view>
		<!--<status-search></status-search>-->

		<!--<div class="tableDIV">
			<table class="table">
				<thead>
					<tr>
						<th class="text-center">序号</th>
						<th>申请类型</th>
						<th>申请账户</th>
						<th>产品名称</th>
						<th>提交时间</th>
						<th>审核状态</th>
						<th class="text-center">查看流水</th>
						<th class="text-center">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in list">
						<td class="text-center">{{index+1}}</td>
						<td>{{item.type}}</td>
						<td>{{item.account}}</td>
						<td>{{item.name}}</td>
						<td>{{item.time}}</td>
						<td>{{item.status}}</td>
						<td class="text-center">
							<a><button class="btn-sm2" @click="look">查看</button></a>
						</td>
						<td class="text-center">
							<a><button class="btn-sm2 recall" @click="audit">审核</button></a>
						</td>
					</tr>

				</tbody>
			</table>
		</div>-->

	</div>
</template>

<script>

	export default {
		//组件名
		name: 'todo',
		//实例的数据对象
		data() {
			return {
				list: [{
						index: 1,
						type: "股权初始登记",
						account: 'AAA',
						name: '股权产品创立',
						time: '2016/6/1 12:23:56',
						status: '未审核',
					},
					{
						index: 2,
						type: "股权初始登记",
						account: 'AAA',
						name: '股权产品创立',
						time: '2016/6/1 12:23:56',
						status: '未审核',
					},
					{
						index: 3,
						type: "股权初始登记",
						account: 'AAA',
						name: '股权产品创立',
						time: '2016/6/1 12:23:56',
						status: '未审核',
					},
				]
			}
		},
		//数组或对象，用于接收来自父组件的数据
		props: {

		},
		//方法
		methods: {
			audit() {
				this.$router.push('/audit')
			},
			look() {
				console.log('look')
			}
		},
		created() {

		},
		mounted() {

		},
		watch: {

		},
		//组件
		components: {

		}
	}
	

</script>

<style scoped>

</style>