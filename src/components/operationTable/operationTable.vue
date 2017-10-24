<template>
	<div>
		<table class="todotable nopadding">
			<tbody>
				<tr>
					<th>产品代码</th>
					<th>产品简称</th>
					<th>过户份额<span>&nbsp;&nbsp;&nbsp;（股）</span></th>
					<th>份额性质<span>（过户前）</span></th>
					<th>份额性质<span>（过户后）</span></th>
					<th>过户类型</th>
					<th class="text-center">备注</th>
					<th style="width: 105px;" class="text-center">操作</th>
				</tr>
				<tr v-for="(item,index) in businesslist">
					<td>{{item.fundCode}}</td>
					<td>{{item.fundName}}</td>
					<td>{{item.outNum}}<br>{{item.outNum | convertCurrency}}</td>
					<td>{{item.stockNatureBefore}}</td>
					<td>{{item.stockNatureAfter}}</td>
					<td>{{item.transferType}}</td>
					<td class="operationTD">
						<div class="operation">
							<font>查看</font>
							<div class="result">
								{{item.option}}
							</div>
						</div>
					</td>
					<td><button class="btn-sm2" @click="edit(index)">编辑</button></td>
				</tr>
			</tbody>
		</table>
		<!--弹框-->
		<div class="popModal modal fade smallModal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">审核意见确认</h4>
					</div>
					<!--<div class="modal-body one-row">
		            	是否确定该操作
		            </div>-->
					<div class="modal-body">
						<div>
							<span>{{texts}}份额：</span><label>{{handlerow.outNum}}股  {{handlerow.outNum | convertCurrency}}股</label>
						</div>
						<div>
							<span>{{texts}}后份额性质：</span>
							<!--<input />-->
							<el-select v-model="opinion" placeholder="">
								<el-option label="流通股" value="0"></el-option>
								<el-option label="特别股" value="32"></el-option>
								<el-option label="资格股" value="2"></el-option>
								<el-option label="公众已托股" value="11"></el-option>
								<el-option label="发起人股" value="12"></el-option>
								<el-option label="限售股" value="13"></el-option>
								<el-option label="定向股" value="31"></el-option>
								<el-option label="其他" value="36"></el-option>
								<el-option label="内部职工股" value="41"></el-option>
								<el-option label="高管股" value="33"></el-option>
								<el-option label="公众委托股" value="43"></el-option>
								<el-option label="托管法人股" value="44"></el-option>
								<el-option label="法人股" value="45"></el-option>
								<el-option label="自然人股" value="46"></el-option>
							</el-select>
						</div>
						<div>
							<span>{{texts}}类型：</span><label>01-协议转让过户</label>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save btn-review" data-dismiss="modal">确认</button>
						<button type="button" class="btn-close" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'operation-table',
		data() {
			return {
				opinion: '',
				handlerow:{}
			}
		},
		props: {
			texts: {
				type: String,
				default() {
					return '过户'
				}
			},
			businesslist: {
				type: Array,
				default() {
					return [{
						fundCode: '-',
						fundName: '-',
						outNum: '-',
						stockNatureBefore: '-',
						stockNatureAfter: '-',
						transferType: '-',
						option: '-'
					}]
				}

			},
		},
		methods: {
			edit(index){
				this.handlerow = this.businesslist[index];
				$("#myModal").modal("show")
			}
		},
		created() {

		},

	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	table>tbody>tr>th>span {
		display: block;
		font-size: 14px;
	}
	
	.el-select-dropdown .selected {
		color: #2EBAB4;
	}
	
	.el-select-dropdown .el-select-dropdown__item:hover {
		color: #2EBAB4;
	}
	
	.modal-dialog .modal-content .modal-body span {
		display: inline-block;
		width: 125px;
		text-align: left;
	}
	
	.modal-dialog .modal-content .modal-body input {
		display: inline-block;
	}
	
	.modal-dialog .modal-content .modal-body label {
		display: inline-block;
		width: 225px;
		height: 35px;
		margin-bottom: 10px;
		text-align: left;
		padding-left: 15px;
		font-weight: normal;
	}
	
	.modal-dialog .modal-content .modal-body {
		text-align: center;
		padding-top: 35px;
		height: 185px;
	}
	.gqfjygh-table-div .nopadding > tbody > tr > th{
	    padding-top: 6px;
	    padding-bottom: 6px;
	}
</style>