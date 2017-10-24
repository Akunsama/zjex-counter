<template>
	<div class="">
		<div class="searchDIV mui-insetfocus">
			<div>
				<p>
					<input placeholder="请输入企业名称" v-model="productmane1" />
					<input placeholder="请输入产品代码" v-model="productdai1" />
				</p>
				<p>
					<span class='selectlabel'>企业类型</span>
					<el-select v-model="opinion" placeholder="">
						<el-option v-for="item in opinions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<span style="width: 0px;"></span>
					<button @click="productCha">查询</button>
				</p>
			</div>
		</div>

		<div class="tableDIV">
			<table class="table">
				<thead>
					<tr>
						<th class="text-center">序号</th>
						<th>企业名称</th>
						<th>企业代码</th>
						<th>产品类型</th>
						<th>登记状态</th>
						<th>登记日期</th>
						<th>是否登记企业</th>
						<th class="text-center">备注</th>
						<th class="text-center">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in list">
						<td class="text-center">{{index+1}}</td>
						<td>{{item.fundName}}</td>
						<td>{{item.fundCode}}</td>
						<td>{{item.fundType=="06"?"股份有限公司":""}}</td>
						<td>{{item.fundStatus=="0"?"正常":""}}</td>
						<td>{{item.registerDate}}</td>
						<td>{{item.isOriginal=="0"?"是":"否"}}</td>
						
						<td class="text-center">
							<button class="btn-sm2" @click="look(index)">查看</button>
						</td>
						<td class="operationTD">
							<div class="operation">
								<font>操作</font>
								<ul class="pwd_update">
									<li v-for="(item2,indexs) in handlelist" @click="handleType(indexs,index)">{{item2.name}}</li>
								</ul>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="pagination" v-show="pageShow">
				<div class="pagetotal" v-show="false">显示：共
					<span style="font-size:16px;">0</span>个任务</div>
				<div class="paginationcontent">
					<div class="previousAllPage" @click="previousAllPage"></div>
					<div class="previousPage" @click="previousPage"></div>
					<span style="font-size:12px;vertical-align: top;">{{currectpage}} of {{totalpage}}</span>
					<div class="nextPage" @click="nextPage"></div>
					<div class="nextAllPage" @click="nextAllPage"></div>
				</div>
			</div>
		</div>

		<!-- 弹框 （Modal） -->
		<div class="popModal modal fade logModal bigModal" id="gqfjyghModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">流水备注</h4>
					</div>
					<div class="modal-body" v-if="ishandle">
						<div class="tableDIV">
							<p>查看详情</p>
							<table class="table">
								<tbody v-if="list.length>0">
									<tr>
										<td>总份额</td>
										<td>{{list[index].totalShares}}</td>
									</tr>
									<!-- <tr>
										<td>登记份额</td>
										<td>{{list[index].registerShares}}</td>
									</tr>
									<tr>
										<td>流通份额</td>
										<td>{{list[index].floatShares}}</td>
									</tr> -->
									<tr>
										<td>登记企业</td>
										<td>{{list[index].isOriginal}}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="modal-body" v-else>
						<div class="tableDIV">
							<p>查看详情</p>
							<table class="table">
								<tbody>
									<tr>
										<td>证件类型</td>
										<td>类型</td>
									</tr>
									<tr>
										<td>证件号码</td>
										<td>645161611686189625</td>
									</tr>
									<tr>
										<td>股权名称</td>
										<td>名称</td>
									</tr>
									<tr>
										<td>股权性质</td>
										<td>性质</td>
									</tr>
									<tr>
										<td>股权数量（股）</td>
										<td>200</td>
									</tr>
									<tr>
										<td>冻结数量（股）</td>
										<td>100</td>
									</tr>
									<tr>
										<td>电话</td>
										<td>12222222222</td>
									</tr>
									<tr>
										<td>手机</td>
										<td>12222222222</td>
									</tr>
									<tr>
										<td>联系地址</td>
										<td>上海市</td>
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
</template>

<script>
import ApiService from '@/services/API-servies'

export default {
	//组件名
	name: 'product-manage-index',
	//实例的数据对象
	data() {
		return {
			currectpage: 1,
			totalpage: 0,
			pageShow:false,
			productmane1: '',
			productdai1: '',
			ishandle: true,
			fundCode: '',
			opinion: '',
			index: 0,
			opinions: [{
				label: '股份有限公司',
				value: '06'
			}],
			list: [],
			handlelist: [{
				name: '股东清册查询',
			}, {
				name: '股权登记修改',
			}, {
				name: '股东信息维护',
			},],
		}
	},
	//数组或对象，用于接收来自父组件的数据
	props: {

	},
	//方法
	methods: {
		previousPage() {
			if (this.currectpage > 1) {
				this.currectpage -= 1;
				this.search(this.currectpage);
			} else {
				return
			}
		},
		previousAllPage() {
			if (this.currectpage > 1) {
				this.currectpage = 1;
				this.search(this.currectpage);
			} else {
				return
			}
		},
		nextPage() {
			if (this.currectpage < this.totalpage) {
				this.currectpage += 1;
				this.search(this.currectpage);
			} else {
				return
			}
		},
		nextAllPage() {
			if (this.currectpage != this.totalpage) {
				this.currectpage = this.totalpage;
				this.search(this.currectpage);
			} else {
				return
			}
		},
		search(currectpage) {
			if (!currectpage) {
				this.currectpage = 1;
			}
			ApiService.Registrationmanagement.queryProductInfo({
				seq: 'Math.random()*100000000000000000000',
				fundCode: this.productdai1,
				fundName: this.productmane1,
				fundType: '06',
				account: this.account,
				pageSize: 15,
				pageNumber: this.currectpage,
				timestamp: 0
			}).then(res => {
				let {
						data,
					message,
					ret
					} = res
				console.log(res)
				if (ret == 0) {
					this.totalpage = Math.ceil(data.total / 15)
					//成功
					this.list = data.items
				} else {
					console.log(message)
				}
			})
		},
		productCha() {
			this.pageShow=true
			ApiService.Registrationmanagement.queryProductInfo({
				seq: 'Math.random()*100000000000000000000',
				fundCode: this.productdai1,
				fundName: this.productmane1,
				fundType: '06',
				account: this.account,
				pageSize: 15,
				pageNumber: 1,
				timestamp: 0
			}).then((res) => {
				this.list = res.data.items
				let {
						data,
					message,
					ret
					} = res
				if (ret == 0) {
					this.totalpage = Math.ceil(data.total / 15)
					console.log(data.total)
					//成功
					this.list = data.items
				}

			})
		},
		look(index) {
			$("#gqfjyghModal").modal("show")
			this.index = index

			console.log(this.list[index].totalShares)
		},
		handleType(index1, index) {
			console.log(index1 + '....' + index)
			if (index1 == 0) {
				this.$router.push({ path: '/productManage/queryShareholderList', query: { index: index, list: this.list } })
				//$("#gqfjyghModal").modal("show")
			} else if (index1 == 1) {
				this.$router.push({ path: '/productManage/equityRegister', query: { id: 1, index: index, list: this.list } });
			} else if (index1 == 2) {
				console.log(index, '565656')

				this.$router.push({ path: '/productManage/infoMaintain', query: { index: index, list: this.list } });
			}
			//				this.handletype = index
		},
		confirm() {
			if (this.ishandle == false) {
				this.$router.push('/productManage/queryShareholderList')
			}
		},
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
.tableDIV .table>tbody>tr>td:last-child {
	width: 80px;
	padding: 0px 40px 0px 35px;
}

#gqfjyghModal .modal-body .tableDIV .table>tbody>tr>td:last-child {
	width: 195px;
}

.pagination {
	width: 100%;
}

.pagination .pagetotal {
	font-weight: bold;
	height: 35px;
	line-height: 35px;
	width: 226px;
	float: left;
}

.pagination .paginationcontent {
	height: 35px;
	line-height: 35px;
	float: left;
}

.pagination .paginationcontent div {
	cursor: pointer;
	display: inline-block;
	width: 24px;
	height: 24px;
}

.pagination .paginationcontent span {
	font-size: 12px;
	vertical-align: super;
	display: inline-block;
	height: 24px;
}

.previousAllPage {
	background: url(images/fenye1.png) no-repeat;
}

.previousAllPage:hover {
	background: url(images/fenye-on1.png) no-repeat;
}

.previousPage {
	background: url(images/fenye2.png) no-repeat;
}

.previousPage:hover {
	background: url(images/fenye-on2.png) no-repeat;
}

.nextPage {
	background: url(images/fenye3.png) no-repeat;
}

.nextPage:hover {
	background: url(images/fenye-on3.png) no-repeat;
}

.nextAllPage {
	background: url(images/fenye4.png) no-repeat;
}

.nextAllPage:hover {
	background: url(images/fenye-on4.png) no-repeat;
}
</style>