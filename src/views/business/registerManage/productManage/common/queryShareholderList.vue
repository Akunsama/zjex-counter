<template>
	<div class="">
		<div class="searchDIV mui-insetfocus">
			<div>
				<p>

					<input placeholder="请输入企业名称" v-model="listone[index1].fundName" value="" readonly/>

					<input placeholder="请输入产品代码" v-model="listone[index1].fundCode" value="" readonly/>
					<span class='selectlabel'>企业类型</span>
					<el-select v-model="opinion" placeholder="请输入企业类型">
						<el-option v-for="item in opinions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<span class='selectlabel'>日期</span>
					<span class="time-group">
						<input id="start_time" />
						<i>
							<img :src="datejpg" /> </i>
					</span>
				</p>
				<p>
					<button @click="qingQuery">查询</button>
					<span style="width:50px;"></span>
					<button id="a1" data-filename="a.zip" class="exportButton" @click="qingExport">股东清册导出 <img src="../../../../../assets/images/right.png" /></button>
				</p>
			</div>
		</div>

		<div class="tableDIV">
			<table class="table">
				<thead>
					<tr>
						<th class="text-center">序号</th>
						<th>股东类型</th>
						<th>股东账户</th>
						<th>股东简称</th>
						<th>股东全称</th>
						<th>股东性质</th>
						<th class="text-center">备注</th>
						<th class="text-center">流水</th>
						<th class="text-center">业务</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in list">
						<td class="text-center">{{item.rownum}}</td>
						<td>{{item.stockholdersType}}</td>
						<td>
							<font style="color:red" @click="dongCha(item,index)">{{item.stockholdersAccount}}</font>
						</td>
						<td>{{item.stockholdersAbbr}}</td>
						<td>{{item.stockholdersName}}</td>
						<td>{{item.stockNature}}</td>
						<td class="text-center">
							<button class="btn-sm2" @click="remark(index)">查看</button>
						</td>
						<td class="text-center">
							<button class="btn-sm2">查看</button>
						</td>
						<td class="operationTD">
							<div class="operation">
								<font>办理</font>
								<ul class="pwd_update">
									<li v-for="(item2,indexs) in handlelist" @click="handleType(indexs,index)">{{item2.name}}</li>
								</ul>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="btn-next">
				<button @click="inpotBack">
					返回
				</button>

			</div>
			<div class="pagination" v-show="pageShow">
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
								<tbody v-if="list.length>0">
									<tr>
										<td>证件类型</td>
										<td>{{list[index].certType}}</td>
									</tr>
									<tr>
										<td>证件号码</td>
										<td>{{list[index].certNo}}</td>
									</tr>
									<tr>
										<td>股权名称</td>
										<td>{{list[index].fundName}}</td>
									</tr>
									<tr>
										<td>股权性质</td>
										<td>{{list[index].stockNature}}</td>
									</tr>
									<tr>
										<td>股权数量（股）</td>
										<td>{{list[index].stockNum}}</td>
									</tr>
									<tr>
										<td>冻结数量（股）</td>
										<td>{{list[index].frozenNum}}</td>
									</tr>
									<tr>
										<td>电话</td>
										<td>{{list[index].hometelno}}</td>
									</tr>
									<tr>
										<td>手机</td>
										<td>{{list[index].tel}}</td>
									</tr>
									<tr>
										<td>联系地址</td>
										<td>{{list[index].address}}</td>
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

<script scoped>
import ApiService from '@/services/API-servies'
import datejpg from '@/assets/images/date.jpg'
import { formatTime } from '@/utils/validate';
import _ from 'lodash'

export default {
	//组件名
	name: 'query-shareholder-list',
	//实例的数据对象
	data() {
		return {
			index: 0,
			currectpage: 1,
			totalpage: 0,
			pageShow:false,
			tondaytime: "",
			batchno: "",
			starDay: '',
			datejpg: datejpg,
			list: [],
			listone: [],
			index: 0,
			index1: 0,
			// enterpriseName: ,
			// ProductCode: '',
			opinion: '',
			opinions: [{
				label: '股份有限公司',
				value: '06'
			}],

			handlelist: [{
				name: '非交易过户',
			}, {
				name: '份额性质变更',
			}, {
				name: '份额冻结',
			}, {
				name: '份额解冻',
			}, {
				name: '份额质押',
			}, {
				name: '份额解押',
			}, {
				name: '份额调整',
			}, {
				name: '增资扩股',
			},],
			fundName: '',
		}
	},
	//数组或对象，用于接收来自父组件的数据
	props: {

	},
	//方法
	methods: {
		inpotBack() {
			this.$router.push({ path: '/productManage/productManageIndex' })
		},
		
		dongCha(item, index) {
			this.$router.push({ path: '/singleCustomer', query: { index: index, list: item } })
		},
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
			ApiService.Registrationmanagement.queryStockholders({
				seq: 'Math.random()*100000000000000000000',
				fundCode: this.listone[this.index1].fundCode,
				fundName: this.listone[this.index1].fundName,
				queryDate: this.starDay,
				operId: this.$store.getters.operId,
				queryType: 1,
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
		qingQuery() {
			if ($('#start_time').val()) {
				this.starDay = $('#start_time').val().replace(/[^0-9]/ig, "")//v-model在引入日期插件时候，会失效，这样会获取input的value的值
			}
			ApiService.Registrationmanagement.queryStockholders({
				seq: 'Math.random()*100000000000000000000',
				fundCode: this.listone[this.index1].fundCode,
				fundName: this.listone[this.index1].fundName,
				queryDate: this.starDay,
				operId: this.$store.getters.operId,
				queryType: 1,
				pageSize: 15,
				pageNumber: 1,
				timestamp: 0
			}).then((res) => {
				this.list = res.data.items
				if (this.list == '') {
					return
				} else {

					console.log(this.list)
					this.batchno = _.last(this.list).batchNo
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
						this.pageShow=true
					}
				}
			})
			
			
		},
		qingExport() {
			// import {exportLoad} from 'utils/validate'; 组件内引入
			// 操作元素 

			// 参数配置
			const msg = {};
			msg.fundcode = this.listone[this.index1].fundCode;
			msg.querydate = this.starDay;
			msg.batchno = this.batchno;
			ApiService.Registrationmanagement.outStockholders(msg).then((res) => {
				var link = document.createElement('a');
				link.href = window.URL.createObjectURL(res);
				link.download = 'shareholders.csv';
				link.click();
			})
			// 调用请求函数 
			// window.open(APIconfig.FILE.download + `?seq=${fileName}&uploadId=${fileId}`, '_parent');
			// window.open(`http://192.168.10.72:8081/business/outStockholders?seq='1000000000000000000000'&fundcode='1'&querydate=20170902&batchno=0&timestamp=0`, '_parent');

			// var $eleForm = $("<form method='get'><input type='hidden' name='seq' value=" + Math.random()*100000000000000000000+ "/><input type='hidden' name='fundcode' value=" + this.listone[this.index1].fundCode + "/><input type='hidden' name='querydate' value=" + this.starDay + "/><input type='hidden' name='batchno' value="+ this.batchno + "/><input type='hidden' name='timestamp' value=" + 0 + "/></form>");

			// $eleForm.attr("action", "http://192.168.20.31:8081/business/outStockholders");

			// $(document.body).append($eleForm);

			// // 提交表单，实现下载
			// $eleForm.submit();



		},
		handleType(index1, index) {
			this.$store.commit('SET_BUSINESSTYPE',this.handlelist[index1].name);
			
			if (index1 == 7) {
				this.$router.push({ path: '/businessDealt/increaseShare', query: { list:this.list[index] }});
			}else{
				this.$router.push({ path: '/businessDealt/handlePage', query: { list:this.list[index] }});
			};
		},
		remark(index) {
			$("#gqfjyghModal").modal("show")
			this.index = index
			console.log(index)
		},
		confirm() {

		}
	},
	created() {
		this.listone = this.$route.query.list
		this.index1 = this.$route.query.index

		console.log(this.index1)
		this.tondaytime = formatTime()
	},
	mounted() {
		$('#start_time,#end_time').datetimepicker({
			bootcssVer:3,
			language: 'zh-CN',//显示中文
			format: 'yyyy/mm/dd',//显示格式
			minView: "month",//设置只显示到月份
			initialDate: new Date(),//初始化当前日期

			autoclose: true,//选中自动关闭
			todayBtn: true,//显示今日按钮

		});

	},
	watch: {

	},
	//组件
	components: {

	}
}
</script>

<style scoped>
.btn-next {
	display: inline-block;
	border-bottom: none;
	float: right;
}

.btn-next button {
	width: 105px;
	height: 35px;
	line-height: 30px;
	border: 1px solid #EBEBEB;
	color: #909090;
	background: #FFFFFF;
	margin: 0px 15px;
	font-size: 16px;
}

.btn-next button:hover {
	border: 1px solid #488FFE;
	background: #488FFE;
	color: #FFFFFF;
}

.searchDIV>div {
	width: 930px!important;
}

.searchDIV div p span.time-group {
	width: inherit !important;
	position: relative;
	margin-right: 0px;
}

.searchDIV div p span.time-group input {
	letter-spacing: 2px;
}

.searchDIV div p span.time-group i {
	position: absolute;
	font-size: 15px;
	right: 30px;
	top: 0px;
}

.exportButton {
	width: 160px;
}

.exportButton img {
	margin-top: -3px;
}


.pagination {
	width: 100%;
	display: inline;
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