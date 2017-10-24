<template>
	<div>
		<div class="searchDIV mui-insetfocus">
			<div>
				<p>
					<input placeholder="请输入产品简称" v-model="fundName" maxlength="20"/>
					<input placeholder="请输入产品代码" v-model="fundCode" maxlength="20"/>
					<label class="myRequestSearch">
									<span class='selectlabel' style="margin-left: 30px;">业务类型</span><el-select  v-model="processDefinitionKey" placeholder="" size="small">
										  <el-option value="1" label="全部"></el-option>
										  <el-option value="2" label="权益性质变更"></el-option>
										  <el-option value="3" label="冻结"></el-option>
										  <el-option value="4" label="信息变更"></el-option>
										  <el-option value="5" label="非交易过户"></el-option>
										  <el-option value="6" label="解冻"></el-option>
										  <el-option value="7" label="股权登记"></el-option>
										  <el-option value="8" label="质押冻结"></el-option>
										  <el-option value="9" label="质押解冻"></el-option>
									</el-select>	

								</label>
				</p>
				<p>
					<span>提交时间</span>
					<span class="time-group">
									<input id="start_time"/>
	                				<i><img :src="datejpg" /> </i>
								</span>
					<span class="time-group">
									<input id="end_time"/>
	                				<i><img :src="datejpg" /></i>
							</span>
					<button style="margin-left: 35px;" @click="search()">查询</button>
				</p>
			</div>
		</div>

		<div class="tableDIV">
			<table class="table">
				<thead>
					<tr>
						<th class="text-center" style="width: 75px;">序号</th>
						<th>业务单号</th>
						<th>业务类型</th>
						<th>申请账户</th>
						<th>提交时间</th>
						<th>审核状态</th>
						<th>流程状态</th>
						<th class="text-center">查看日志</th>
						<th class="text-center">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in list">
						<td class="text-center">{{index+1}}</td>
						<td><span :title="item.businessKey">{{item.businessKey}}</span></td>
						<td>{{item.processName}}</td>
						<td>{{item.creator}}</td>
						<td>{{item.applyTime | timeformat}}</td>
						<td>{{item.status | todoStatus}}</td>
						<td><span :title="item.taskStatus | processStatus">{{item.taskStatus | processStatus}}</span></td>
						<td class="text-center">
							<a><button class="btn-sm2" @click="look(item.businessKey)">查看</button></a>
						</td>
						<td class="text-center">
							<a><button class="btn-sm2 recall" @click="audit(index)">{{item.taskStatus | taskStatusButton}}</button></a>
							<!--<a v-if="item.taskStatus==2"><button class="btn-sm2 recall" @click="audit(index,item.businessKey,item.taskStatus)">受理</button></a>
							<a v-else-if="item.taskStatus==5"><button class="btn-sm2 recall" @click="audit(index,1,item.processName)">初审</button></a>
							<a v-else-if="item.taskStatus==8"><button class="btn-sm2 recall" @click="audit(index,2,item.processName)">终审</button></a>
							<a v-else><button class="btn-sm2 recall" @click="audit(index,3,item.processName)">查看</button></a>-->
						</td>
					</tr>

				</tbody>
			</table>
			<!--<div class="pagination">
				<ul>
					<li class="pagebutton" @click="previousAllPage">←</li>
					<li class="pagebutton" @click="previousPage">←</li>
					<li>{{currectpage}} of {{totalpage}}</li>
					<li class="pagebutton" @click="nextPage">→</li>
					<li class="pagebutton" @click="nextAllPage">→</li>
				</ul>
			</div>-->
			<div class="pagination">
				<div class="paginationcontent">
					<div class="previousAllPage" @click="previousAllPage"></div>
					<div class="previousPage" @click="previousPage"></div>
					<span style="font-size:12px;vertical-align: super;">{{currectpage}} of {{totalpage}}</span>
					<div class="nextPage" @click="nextPage"></div>
					<div class="nextAllPage" @click="nextAllPage"></div>
				</div>
			</div>
		</div>
		
		<!-- 弹框 （Modal） -->
		<div class="popModal modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" id="modal-1">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">提示</h4>
					</div>
					<div class="modal-body one-row">
						{{promptInfo}}
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save" data-dismiss="modal">确定</button>
						<button type="button" class="btn-close" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>

		
	</div>
</template>

<script scoped>
	import datejpg from '@/assets/images/date.jpg'
	import ApiService from '@/services/API-servies'

	export default {
		//组件名
		name: 'todo-index',
		//实例的数据对象
		data() {
			return {
				promptInfo:'',
				datejpg: datejpg,
				currectpage: 0,
				totalpage: 0,
				//查询信息
				fundCode: '',
				fundName: '',
				processDefinitionKey: '',

				list: [{
					businessKey: '-',
					applyTime: "-",
					processDefinitionKey: '-',
					processName: '-',
					status: '-',
					taskStatus: '-',
					name: '-',
				}, 
//				{
//					businessKey: '111',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '股权登记',
//					status: '1',
//					taskStatus: '2',
//					name: '国泰君安',
//				},{
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '股权登记',
//					status: '3',
//					taskStatus: '8',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '股权登记',
//					status: '4',
//					taskStatus: '0',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '非交易过户',
//					status: '1',
//					taskStatus: '2',
//					name: '国泰君安',
//				},{
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '非交易过户',
//					status: '3',
//					taskStatus: '8',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '非交易过户',
//					status: '4',
//					taskStatus: '0',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '份额性质变更',
//					status: '1',
//					taskStatus: '2',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '份额性质变更',
//					status: '3',
//					taskStatus: '8',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '份额性质变更',
//					status: '4',
//					taskStatus: '0',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '份额质押',
//					status: '1',
//					taskStatus: '2',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '份额质押',
//					status: '3',
//					taskStatus: '8',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '份额质押',
//					status: '4',
//					taskStatus: '0',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '份额解押',
//					status: '1',
//					taskStatus: '2',
//					name: '国泰君安',
//				},  {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '份额解押',
//					status: '3',
//					taskStatus: '8',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '份额解押',
//					status: '4',
//					taskStatus: '0',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '份额冻结',
//					status: '1',
//					taskStatus: '2',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '份额冻结',
//					status: '3',
//					taskStatus: '8',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '份额冻结',
//					status: '4',
//					taskStatus: '0',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '份额解冻',
//					status: '1',
//					taskStatus: '2',
//					name: '国泰君安',
//				},  {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '份额解冻',
//					status: '3',
//					taskStatus: '8',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '份额解冻',
//					status: '4',
//					taskStatus: '0',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '增资扩股',
//					status: '1',
//					taskStatus: '2',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '增资扩股',
//					status: '3',
//					taskStatus: '8',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '增资扩股',
//					status: '4',
//					taskStatus: '0',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '份额调整',
//					status: '1',
//					taskStatus: '2',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '份额调整',
//					status: '3',
//					taskStatus: '8',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '份额调整',
//					status: '4',
//					taskStatus: '0',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '基本信息变更',
//					status: '1',
//					taskStatus: '2',
//					name: '国泰君安',
//				},  {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '基本信息变更',
//					status: '3',
//					taskStatus: '8',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '基本信息变更',
//					status: '4',
//					taskStatus: '0',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '股东信息变更',
//					status: '1',
//					taskStatus: '2',
//					name: '国泰君安',
//				},  {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '股东信息变更',
//					status: '3',
//					taskStatus: '8',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '股东信息变更',
//					status: '4',
//					taskStatus: '0',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '企业信息变更',
//					status: '1',
//					taskStatus: '2',
//					name: '国泰君安',
//				},  {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '企业信息变更',
//					status: '3',
//					taskStatus: '8',
//					name: '国泰君安',
//				}, {
//					businessKey: '',
//					applyTime: "2017.10.10",
//					processDefinitionKey: 'AAA',
//					processName: '企业信息变更',
//					status: '4',
//					taskStatus: '0',
//					name: '国泰君安',
//				}
				]
			}
		},
		//数组或对象，用于接收来自父组件的数据
		props: {

		},
		//方法
		methods: {
			previousPage() {
				if(this.currectpage > 1) {
					this.currectpage -= 1;
					this.search(this.currectpage);
				} else {
					return
				}
			},
			previousAllPage() {
				if(this.currectpage > 1) {
					this.currectpage = 1;
					this.search(this.currectpage);
				} else {
					return
				}
			},
			nextPage() {
				if(this.currectpage < this.totalpage) {
					this.currectpage += 1;
					this.search(this.currectpage);
				} else {
					return
				}
			},
			nextAllPage() {
				if(this.currectpage != this.totalpage) {
					this.currectpage = this.totalpage;
					this.search(this.currectpage);
				} else {
					return
				}
			},
			audit(index) {
				if(this.list[index].taskStatus=='-'){
					return
				}
				
				let status;
				if(this.list[index].taskStatus == '5' ){
					status = 1
				}else if(this.list[index].taskStatus == '8') {
					status = 2
				}else{
					status = 3
				}
				let querys = {
					'status': status,
					'taskStatus': this.list[index].taskStatus,
					'processDefinitionKey': this.list[index].processDefinitionKey,
					'businessKey': this.list[index].businessKey
				}
				if(this.list[index].taskStatus != '3' && this.list[index].taskStatus != '6') {
						switch(this.list[index].processName) {
							case '股权登记':
								querys.type = 'equityRegister'
								break;
							case '非交易过户':
								querys.type = 'transfer'
								break;
							case '权益性质变更':
								querys.type = 'shareChange'
								break;
//							case '份额质押':
							case '质押冻结':
								querys.type = 'sharePledge'
								break;
//							case '份额解押':
							case '质押解冻':
								querys.type = 'shareUnPledge'
								break;
							case '份额冻结':
								querys.type = 'shareFreeze'
								break;
							case '份额解冻':
								querys.type = 'shareUnFreeze'
								break;
							case '增资扩股':
								querys.type = 'shareIncrease'
								break;
							case '股东份额调整':
								querys.type = 'shareAdjust'
								break;
							case '信息变更':
								querys.type = 'baseinfoChange'
								break;
							case '修改股东名册':
								querys.type = 'shareholderinfoChange'
								break;
							case '产品信息修改':
								querys.type = 'companyinfoChange'
								break;
							default:
								break;
						}
						this.$router.push({
							path: '/todo/audit',
							query: querys
						});
				} else {
					let accepttaskStatus
					if(this.list[index].taskStatus == '3'){
						accepttaskStatus = 5
					}else if(this.list[index].taskStatus == '6'){
						accepttaskStatus = 8
					}else{
						return
					}
					ApiService.todo.accept({
						assignee:this.$store.getters.operId,
						status:2,
						taskStatus:accepttaskStatus,
						businessKey: this.list[index].businessKey,
					}).then(res => {
						let {
							ret,
							data,
							message
						} = res;
						if(ret == 0) {
							//成功
							this.list[index].taskStatus = String(accepttaskStatus);
						}else{
							$("#myModal").modal("show");
							this.promptInfo = message;
						}
					})
				}

			},
			look(businessKey) {
				if(businessKey!='-'){
					this.$router.push({
						path: '/todo/auditLog',
						query: {
							'businessKey': businessKey
						}
					});
				}
			},
			search(currectpage) {
				if(!currectpage){
					this.currectpage = 1;
				}
				ApiService.todo.queryCS({
					fundCode: this.fundCode,
					fundName: this.fundName,
//					creator: '',//登录获得
					candidateGroups: 'CEN',
//					assignee: this.$store.getters.operId,//登录获得
					processDefinitionKey: this.processDefinitionKey,
//					status: '1,2,3,4',
					taskStatus: '',
					creDate: this.handleTime($('#start_time').val()),
					endDate: this.handleTime($('#end_time').val()),
					pageSize: 15,
					pageNumber: this.currectpage,
				}).then(res => {
					let {
						data,
						message,
						ret
					} = res
					console.log(res)
					if(ret == 0) {
						this.totalpage = Math.ceil(data.total / 15)
						//成功
						this.list = data.items
					} else {
						console.log(message)
					}
				})
			},
			handleTime(time){
				if(time){
					let arr = time.split("/")
					return  arr.join('')
				}
			}
		},
		created() {

		},
		mounted() {
			$('#start_time,#end_time').datetimepicker({
				language: 'zh-CN', //显示中文
				format: 'yyyy/mm/dd', //显示格式
				minView: "month", //设置只显示到月份
				initialDate: new Date(), //初始化当前日期
				autoclose: true, //选中自动关闭
				todayBtn: true, //显示今日按钮
				bootcssVer: 3,
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
	.tableDIV .table > thead > tr > th {
	    padding: 16px 0px 16px 10px;
	}
	.tableDIV .table > thead > tr > th:first-child {
	    padding: 16px 0px 16px 40px;
	}
	.tableDIV .table > thead > tr > th:last-child {
		width: 100px;
	    padding: 16px 40px 16px 0px;
	}
	
	.tableDIV .table > tbody > tr > td {
	    padding: 0px 0px 0px 10px;
	}
	.tableDIV .table > tbody > tr > td:first-child {
	    padding: 0px 0px 0px 40px;
	}
	.tableDIV .table > tbody > tr > td:last-child {
	    padding: 0px 40px 0px 0px;
	}
	.tableDIV .table > tbody > tr > td > span{
		display: inline-block;
		width: 100px;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    overflow: hidden;
	    font-family: "microsoft yahei";
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
		background: url(../image/fenye1.png) no-repeat;
	}
	
	.previousAllPage:hover {
		background: url(../image/fenye-on1.png) no-repeat;
	}
	
	.previousPage {
		background: url(../image/fenye2.png) no-repeat;
	}
	
	.previousPage:hover {
		background: url(../image/fenye-on2.png) no-repeat;
	}
	
	.nextPage {
		background: url(../image/fenye3.png) no-repeat;
	}
	
	.nextPage:hover {
		background: url(../image/fenye-on3.png) no-repeat;
	}
	
	.nextAllPage {
		background: url(../image/fenye4.png) no-repeat;
	}
	
	.nextAllPage:hover {
		background: url(../image/fenye-on4.png) no-repeat;
	}
</style>