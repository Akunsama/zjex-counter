<template>
	<div class="">
		<div class="col-md-12 col-xs-12 col-lg-12 contentDIV">

					<div class="searchDIV mui-insetfocus">
						<div>
							<p>
									
								<label class="myRequestSearch">
									<span class='selectlabel'>业务类型</span>
									<el-select  v-model="myRequestSearch" placeholder="">
									  <el-option
									    v-for="item in options"
									    :key="item.value"
									    :label="item.label"
									    :value="item.value">
									  </el-option>
									</el-select>
								</label>	
								<span style="margin-left: 50px;">提交时间</span>
								<span class="time-group">
									<input id="start_time"/>
	                				<i><img :src="datejpg" /> </i>
								</span>    
								<span class="time-group">
									<input id="end_time"/>
	                				<i><img :src="datejpg" /></i>
								</span>	
							</p>
							<p>
								<input placeholder="请输入产品名称"/>
								<input placeholder="请输入产品代码"/>	
								<button>查询</button>
							</p>
						</div>
					</div>



			<div class="tableDIV">
				<table class="table">
					<thead>
						<tr>
							<th class="text-center">序号</th>
							<th>业务类型</th>
							<th>提交时间</th>
							<th>产品名称</th>
							<th>产品代码</th>
							<th class="text-center">备注</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in list">
							<td class="text-center">{{index+1}}</td>
							<td>{{item.type}}</td>
							<td>{{item.time}}</td>
							<td>{{item.productName}}</td>
							<td>{{item.productCode}}</td>
							<td class="text-center"><button class="btn-sm2 recall" data-toggle="modal" data-target="#gqfjyghModal">查看</button></td>
						</tr>
					</tbody>
				</table>
			</div>
			
			<!-- 弹框 （Modal） -->
			<div class="popModal modal fade logModal bigModal" id="gqfjyghModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title" id="myModalLabel">流水备注</h4>
						</div>
						<div class="modal-body">
							<div class="tableDIV">
								<p>查看详情</p>
								<table class="table">
									<tbody>
										<tr>
											<td>过出方</td>
											<td>leilani</td>
										</tr>
										<tr>
											<td>过出方证件</td>
											<td>331009099898987867</td>
										</tr>
										<tr>
											<td>过出性质</td>
											<td>高管股</td>
										</tr>
										<tr>
											<td>过入方</td>
											<td>Eileen</td>
										</tr>
										<tr>
											<td>过入方证件</td>
											<td>331009099898987867</td>
										</tr>
										<tr>
											<td>过入性质</td>
											<td>流通股</td>
										</tr>
										<tr>
											<td>交易形式</td>
											<td>协议转让过户</td>
										</tr>
										<tr>
											<td>数额</td>
											<td>1233453453</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn-save" id="ca-complete" data-dismiss="modal" @click="confirm">确认</button>
							<button type="button" class="btn-close" data-dismiss="modal">取消</button>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import datejpg from '@/assets/images/date.jpg'

	export default {
		//组件名
		name: 'my-journal',
		//实例的数据对象
		data() {
			return {
				datejpg:datejpg,
				myRequestSearch:'',
				examineoptions: [
					{value: '所有'}, 
					{value: '待定'},
					{value: '完成'},
					{value: '审核中'},
					],
				examine:'',
				options: [
					{value: '非交易过户'}, 
					{value: '权益性质变更'},
					{value: '股权冻结'},
					{value: '股权解冻'},
					{value: '全部'},
					],
				shareholderShow: false,
				statusShow: false,
				list: [{
					type: '非交易过户',
					time: '2016/6/1',
					productName: '呵呵',
					productCode: '123',
				}, {
					type: '非交易过户',
					time: '2016/6/1',
					productName: '呵呵',
					productCode: '123',
				}, {
					type: '非交易过户',
					time: '2016/6/1',
					productName: '呵呵',
					productCode: '123',
				}, {
					type: '非交易过户',
					time: '2016/6/1',
					productName: '呵呵',
					productCode: '123',
				}, ]
			}
		},
		//数组或对象，用于接收来自父组件的数据
		props: {

		},
		//方法
		methods: {
			search() {

			},
			confirm(){
				this.$router.push('/journalProcess')
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
	.contentDIV {
		padding: 0px !important;
	}
	.modal-dialog .modal-content .modal-body {
	    height: 505px;
	}
	.mui-insetfocus .el-select {
	    width: 115px;
	}

</style>