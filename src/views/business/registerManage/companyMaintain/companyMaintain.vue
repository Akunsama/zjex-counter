<template>
	<div class="">

		<div class="entTypeDIV">
			<ul>
				<!--<li @click="showmodal(1)">企业类型<span><img src="../../../../assets/images/plus_icon.png" /> </span></li>-->
				<li @click="showmodal">企业类型下级业务
					<i class="showimg">
						<img src="../../../../assets/images/plus_icon.png" />
					</i>

				</li>
			</ul>
		</div>

		<div class="tableDIV">
			<div class="dataRecord-info">
				<table class="table entType-table">
					<thead>
						<tr>
							<th>企业类型</th>
							<th>支持业务</th>
							<th>
								客服买入份额
								<p>(T+N日可用)</p>
							</th>
							<th>
								客服卖出资金
								<p>(T+N日可用)</p>
							</th>
							<th>
								客服卖出资金
								<p>(T+N日可取)</p>
							</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in list">
							<td>{{item.typename}}</td>
							<td>{{item.businessname}}</td>
							<td>{{item.fene}}</td>
							<td>{{item.money}}</td>
							<td>{{item.money}}</td>
							<td class="operationTD">
								<div class="operation">
									<font>操作</font>
									<ul>
										<!-- <li @click="showmodal1(item,index)">编辑</li> -->
										<li @click="showmodal2(item,index)">删除</li>
									</ul>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="pagination">
				<!-- <div class="pagetotal" v-show="false">显示：共
							<span style="font-size:16px;">0</span>个任务</div> -->
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
		<div class="popModal modal fade smallModal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" id="ent-modal-1" v-show="showNum==1">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">新增交易品种</h4>
					</div>
					<div class="modal-body" v-if="list.length>0">

						<p>
							<span>企业类型：</span>
							<label>{{list[0].fundtype}}</label>
						</p>
						<p>
							<span>企业类型名称：</span>
							<input class="changinput" type="text" value="" placeholder="请输入企业类型名称" v-model="changeTypename">
							<!-- <el-select v-model="examine" placeholder="">
													<el-option v-for="item in typeOpinions" :key="item.value" :label="item.label" :value="item.value">
													</el-option>
												</el-select> -->
						</p>
					</div>
					<div class="modal-footer">
						<button type="button" @click="showmodalBtn1" class="btn-save" data-dismiss="modal">确认</button>
						<button type="button" class="btn-close" data-dismiss="modal">关闭</button>
					</div>
				</div>
			</div>

			<div class="modal-dialog" id="ent-modal-1" v-show="showNum==4">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">新增交易品种</h4>
					</div>
					<div class="modal-body modalBody" v-if="list.length>0">

						<p>
							<span>企业类型：</span>
							<label>{{list[index].fundtype}}-{{list[index].typename}}</label>
						</p>
						<p>
							<span>业务类型：</span>
							<label>{{list[index].businessname}}</label>
						</p>
						<p>
							<span>业务类型名称：</span>
							<input class="changinput" type="text" value="" placeholder="请输入业务类型名称" v-model="changeBusinessname">
							<!-- <el-select v-model="examine" placeholder="">
													<el-option v-for="item in typeOpinions" :key="item.value" :label="item.label" :value="item.value">
													</el-option>
												</el-select> -->
						</p>
					</div>
					<div class="modal-footer">
						<button type="button" @click="showmodalBtn" class="btn-save" data-dismiss="modal">确认</button>
						<button type="button" class="btn-close" data-dismiss="modal">关闭</button>
					</div>
				</div>
			</div>

			<div class="modal-dialog smallModal" id="ent-modal-2" v-show="showNum==2">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">新增企业类型下级业务</h4>
					</div>
					<div class="modal-body">
						<div>
							<span>企业类型：</span>
							<label>06</label>
						</div>
						<div>
							<span>企业类型名称：</span>
							<label>股份制企业</label>
						</div>
						<div>
							<span>业务代码：</span>
							<ul class="mnumpick">
								<li :class="{active:picked==index}" v-for="(item,index) in mnumlist" @click="codeStatus(index,item)">
									<input type="radio" id="type1">
									<label for="type1">{{item.subType}}-{{item.subTypeName}}</label>
									<span></span>
								</li>
							</ul>
						</div>

					</div>
					<div class="modal-footer">
						<button type="button" @click="showmodalBtn" class="btn-save" data-dismiss="modal">确认</button>
						<button type="button" class="btn-close" data-dismiss="modal">关闭</button>
					</div>
				</div>
			</div>

			<div class="modal-dialog" v-show="showNum==3">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">删除企业类型</h4>
					</div>
					<div class="modal-body one-row">
						是否删除该企业类型
					</div>
					<div class="modal-footer">
						<button type="button" @click="showmodalBtn" class="btn-save btn-review" data-dismiss="modal">确认</button>
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
	name: 'company-maintain',
	//实例的数据对象
	data() {
		return {
			index: 0,
			currectpage: 1,
			changeTypename: '',
			changeBusinessname: '',
			totalpage: 0,
			showNum: null,
			picked: 0,
			subTypeName: '',
			subType: '',
			servicetype: '1',
			typeOpinions: [{
				value: 1,
				label: '待定'
			}, {
				value: 2,
				label: '完成'
			}, {
				value: 3,
				label: '审核中'
			}],
			examine: 1,
			mnumlist: [],
			list: [],
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
			if (this.currectpage != 1) {
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
			ApiService.Registrationmanagement.queryFundType({
				seq: 'Math.random()*100000000000000000000',
				fundtype: "06",
				businessCode: '',
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

					console.log(data.total)
					//成功
					this.list = data.items
				}
			})
		},
		showmodal() {
			$("#myModal").modal("show")
			this.showNum = 2
			this.servicetype = '1'
		},
		showmodalBtn() {
			ApiService.Registrationmanagement.defendBusiness({
				seq: 'Math.random()*100000000000000000000',
				servicetype: this.servicetype,
				businessCode: this.subType,
				fundtype: '06',
				operid: this.$store.getters.operId,
				timestamp: 0
			}).then((res) => {
				window.location.reload();
				console.log(res)


			})
		},
		showmodalBtn1() {
			ApiService.Registrationmanagement.defendProductType({
				seq: 'Math.random()*100000000000000000000',
				servicetype: this.servicetype,
				fundtype: '06',
				typename: this.changeTypename,
				operid: this.$store.getters.operId,
				timestamp: 0
			}).then((res) => {
				window.location.reload();
				console.log(res, '0909')
			})
		},
		showmodal1(item, index) {
			this.index = index;
			this.subType = item.businesscode
			this.servicetype = '2'
			if (index == 0) {
				$("#myModal").modal("show")
				this.showNum = 1
			} else {
				$("#myModal").modal("show")
				this.showNum = 4
			}
		},
		showmodal2(item, index) {
			console.log(item)
			this.subType = item.businesscode
			$("#myModal").modal("show")
			this.showNum = 3

			this.servicetype = '3'
		},
		codeStatus(index, item) {
			let vm = this
			this.picked = index
			this.subTypeName = item.subTypeName
			this.subType = item.subType
			console.log(this.subType)



		}
	},
	created() {

		ApiService.Registrationmanagement.queryFundType({
			seq: 'Math.random()*100000000000000000000',
			fundtype: "06",
			businessCode: '',
			pageSize: 15,
			pageNumber: this.currectpage,
			timestamp: 0
		}).then((response) => {
			this.list = response.data.items
			console.log(this.list, 'ererer')
			let {
						data,
				message,
				ret
					} = response

			if (ret == 0) {
				this.totalpage = Math.ceil(data.total / 15)
				console.log(data.total)
				//成功
				this.list = data.items
			}


		})

		ApiService.Registrationmanagement.queryEnum({
			seq: 'Math.random()*100000000000000000000',
			source: 'PCC',
			type: '060019',
			subType: '',
			timestamp: 0
		}).then((response) => {
			this.mnumlist = response.data.items

			// console.log(this.subType)

		})
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
/*.previousAllPage {
	background: url(image/fenye1.png) no-repeat;
}

.previousPage {
	background: url(image/fenye2.png) no-repeat;
}

.nextPage {
	background: url(image/fenye3.png) no-repeat;
}

.nextAllPage {
	background: url(image/fenye4.png) no-repeat;
}*/

.modalBody {
	padding: 20px 0 0 0!important;
}

.changinput {
	display: inline!important;
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
	background: url(image/fenye1.png) no-repeat;
}

.previousAllPage:hover {
	background: url(image/fenye-on1.png) no-repeat;
}

.previousPage {
	background: url(image/fenye2.png) no-repeat;
}

.previousPage:hover {
	background: url(image/fenye-on2.png) no-repeat;
}

.nextPage {
	background: url(image/fenye3.png) no-repeat;
}

.nextPage:hover {
	background: url(image/fenye-on3.png) no-repeat;
}

.nextAllPage {
	background: url(image/fenye4.png) no-repeat;
}

.nextAllPage:hover {
	background: url(image/fenye-on4.png) no-repeat;
}

.mnumpick {
	height: 70px;
	position: relative;
	overflow: scroll!important;
}

.showimg {
	margin-left: 10px;
	width: 16px!important;
	height: 16px!important;
	border: 1px solid white;
	border-radius: 50%;
	/* display: inline!important; */
}

.showimg img {
	margin-top: -1px;
}

.entTypeDIV ul li:first-child {
	width: 190px;
}
</style>