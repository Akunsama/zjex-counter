<template>
	<div>

		<div class="gqfjyghDIV registrationDIV">
			<p>基本信息变更</p>
			<img :src="gqfjygh" class="gqfjyghImg" />
		</div>

		<div class="tableDIV gqfjygh-table-div registration-table">
			<div class="crf-info">
				<div class="title">
					基本信息变更
				</div>
				<div class="tb-table" style="margin-top: 55px;">

					<div class="tb tb1">
						<header class="tb-title">
							<p><img :src="blueIcon" />基本信息 </p>
						</header>
						<table class="todotable odd nopadding">
							<tbody>
								<tr>
									<th>登录账户</th>
									<th>账户类别</th>
									<th>资金账号</th>
									<th>登记账号</th>
									<th class="text-center" style="width: 95px;">操作</th>
								</tr>
								<tr>
									<td>{{account}}</td>
									<td>{{type}}</td>
									<td>{{capitalAccount}}</td>
									<td>{{registeraccount}}</td>
									<td class="operationTD">
										<div class="operation"  data-target="#gqfjyghModal" data-toggle="modal">
											<font>查看</font>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="tb tb1">
						<header class="tb-title">
							<p><img :src="blueIcon" />上传材料 </p>
						</header>
						<file-table :status="status" :fileslist="fileslist"></file-table>
					</div>

					<div class="tb tb2" v-show="status!=4">
						<header class="tb-title" v-bind:class="{'tb-title-focus':isActive}">
							<p><img :src="blueIcon" />审核备注</p>
						</header>
						<div class="tb-remark" v-bind:class="{ 'tb-remark-focus': isActive }">
							<textarea :readonly="addText"></textarea>
							<transition name="fade">
								<button @click="add" v-show="addshow">+ 添加</button>
							</transition>
						</div>
					</div>
				</div>
			</div>
			<div class="srf-info" v-show="status==1 || status==2">
				<div class="title">
					审核意见
				</div>
				<ul class="choice-radio review">
					<li :class="{active:picked==1}">
						<input type="radio" id="typea" value="1" v-model="picked" data-toggle="modal" data-target="#myModal2">
						<label for="typea">审核关闭</label>
						<span></span>
					</li>
					<li :class="{active:picked==2}" v-show="status==1">
						<input type="radio" id="typeb" value="2" v-model="picked" data-toggle="modal" data-target="#myModal2">
						<label for="typeb">初审通过</label>
						<span></span>
					</li>
					<li :class="{active:picked==3}" v-show="status==1">
						<input type="radio" id="typec" value="3" v-model="picked" data-toggle="modal" data-target="#myModal2">
						<label for="typec">申请驳回</label>
						<span></span>
					</li>
					<li :class="{active:picked==4}" v-show="status==2">
						<input type="radio" id="typed" value="4" v-model="picked" @click="auditStatus(4)" data-toggle="modal" data-target="#myModal2">
						<label for="typec">终审通过</label>
						<span></span>
					</li>
				</ul>

			</div>
			<div class="tb-next">
				<button @click="returnstep">返回</button>
			</div>
		</div>

		<!-- 弹框 （Modal） -->
		<div class="popModal modal fade smallModal" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">审核意见确认</h4>
					</div>
					<div class="modal-body one-row" style="padding-top: 80px;">
						是否确定该操作
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save btn-review" @click="confirm" data-dismiss="modal">确认</button>
						<button type="button" class="btn-close" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
		
		<div class="popModal modal fade logModal bigModal" id="gqfjyghModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">基本信息详情</h4>
					</div>
					<div class="modal-body">
						<div class="tableDIV">
							<p>查看详情</p>
							<table class="table">
								<tbody>
									<tr>
										<td>客户名称</td>
										<td>{{name}}</td>
									</tr>
									<tr>
										<td>证件类型</td>
										<td>{{certType}}</td>
									</tr>
									<tr>
										<td>证件号码</td>
										<td>{{certNo}}</td>
									</tr>
									<tr>
										<td>注册手机</td>
										<td>{{mobile}}</td>
									</tr>

								</tbody>
							</table>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save" id="ca-complete" data-dismiss="modal">确认</button>
						<button type="button" class="btn-close" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import blueIcon from '@/assets/images/blue-icon.png'
	import gqfjygh from '@/assets/images/gqfjygh.png'
	import clientTable from '@/components/clientTable/clientTable.vue'
	import operationTable from '@/components/operationTable/operationTable.vue'
	import fileTable from '@/components/fileTable/fileTable.vue'
	import ApiService from '@/services/API-servies'

	export default {
		//组件名
		name: 'todo',
		//实例的数据对象
		data() {
			return {
				opinions: [{
					label: '股权',
					value: 1
				}, {
					label: '股权2',
					value: 2
				}, ],
				status: 1,
				blueIcon: blueIcon,
				gqfjygh: gqfjygh,
				picked: '',
				addshow: true,
				addText: true,
				isActive: false,

				account: '登录账户', //登录账户
				type: '账户类别', //账户类别
				capitalAccount: '资金账户', //资金账户
				name: '客户姓名', //客户姓名
				certType: '证件类型', //证件类型
				certNo: '证件号码', //证件号码
				mobile: '注册手机', //注册手机
				registeraccount: '登记账号', //登记账号

				fileslist: [{
					project: '监督部门变更函（工商出具）',
					type: 'changeLetter',
					ifmust: '必填',
					result: '',
					opinion: '11111',
					filename: '资料资料资料.zip',
					filepath: ''
				}, {
					project: '新营业执照正本复印件',
					type: 'businessLicense1',
					ifmust: '必填',
					result: '',
					opinion: '11111',
					filename: '资料资料资料.zip',
					filepath: ''
				}, {
					project: '新营业执照副本复印件',
					type: 'businessLicens2',
					ifmust: '必填',
					result: '',
					opinion: '11111',
					filename: '资料资料资料.zip',
					filepath: ''
				}, ],

			}
		},
		//数组或对象，用于接收来自父组件的数据
		props: {

		},
		//方法
		methods: {
			add() {
				this.addshow = false;
				this.addText = false;
				this.isActive = true
			},
			returnstep() {
				this.$router.push('/todo/todoIndex')
			},
			submit() {
				this.status = 4;
			},
			confirm() {
				this.$router.push('/todo/todoIndex')
				ApiService.todo.complete({
					userId: '',
					businessKey: '',
					comment: '',
					checkFlag: this.picked,
					status: this.status,
					taskStatus: '',
					auditContent: {},
				}).then(res => {
					if(res.ret == 0) {
						this.list = res.data

					}
				})

			},
		},
		created() {
			ApiService.todo.queryCSDetail({
				processDefinitionKey: this.$route.query.processDefinitionKey,
				businessKey: this.$route.query.businessKey,
			}).then(res => {
				if(res.ret == 0) {
					//成功
					this.data = res.data
					//查询客户信息

				}
			});
			//查询个人信息
			ApiService.todo.queryCustInfo().then(res => {
				if(res.ret == 0) {
					//成功
					this.account = res.data.account;
					this.type = res.data.type;
					this.capitalAccount = res.data.capitalAccount;
					this.name = res.data.name;
					this.certType = res.data.certType;
					this.certNo = res.data.certNo;
					this.mobile = res.data.mobile;
					ApiService.business.queryCustAccount({
						account: res.data.account,
					}).then(res => {
						if(res.ret == 0) {
							this.registeraccount = res.data.account
						}
					})
				}
			})

			switch(this.$route.query.status) {
				case 1:
					break;
				case 2:
					this.status = 2
					break;
				case 3:
					this.status = 3;
					this.addshow = false;
					this.addText = true;
					this.isActive = true;
					break;
				case 4:
					this.status = 4
					break;
				default:
					break;
			}
		},
		mounted() {

		},
		watch: {

		},
		//组件
		components: {
			clientTable,
			operationTable,
			fileTable
		}
	}
</script>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s ease
	}
	
	.fade-enter,
	.fade-leave-to
	/* .fade-leave-active in below version 2.1.8 */
	
	{
		opacity: 0
	}
	
	.gqfjyghDIV {
		height: 105px;
		line-height: 105px;
		/*background: url(../images/gqfjygh.png) no-repeat center;*/
		background-size: 100%, 100%;
		position: relative;
		z-index: -2;
	}
	
	.gqfjyghDIV .gqfjyghImg {
		position: absolute;
		top: 0;
		opacity: 0.1;
		width: 100%;
	}
	
	.gqfjyghDIV:before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		background: rgba(61, 62, 63, 1);
		z-index: -1;
	}
	
	.gqfjyghDIV p {
		font-size: 16px;
		text-align: center;
		z-index: 0;
		color: #FFFFFF;
		margin: 0px;
		position: relative;
		z-index: 1;
	}
	
	.gqfjyghDIV p:before {
		content: '';
		position: absolute;
		left: 432px;
		background: #FFFFFF;
		width: 3px;
		height: 3px;
		top: 0px;
		bottom: 0px;
		margin: auto;
		-webkit-border-radius: 100%;
		-moz-border-radius: 100%;
		border-radius: 100%;
	}
	
	.detailDIV p:before {
		left: 455px !important;
	}
	
	.registrationDIV p:before {
		left: 430px !important;
	}
	
	.gqfjyghDIV p:after {
		content: '';
		position: absolute;
		right: 436px;
		background: #FFFFFF;
		width: 3px;
		height: 3px;
		top: 0px;
		bottom: 0px;
		margin: auto;
		-webkit-border-radius: 100%;
		-moz-border-radius: 100%;
		border-radius: 100%;
	}
	
	.detailDIV p:after {
		right: 455px !important;
	}
	
	.registrationDIV p:after {
		right: 430px !important;
	}
	
	.gqfjygh-table-div {
		padding-bottom: 0px;
	}
	
	.gqfjygh-table-div .srf-info .tb-table .tb {
		padding-bottom: 35px !important;
	}
	
	.choice-radio {
		margin: 0px auto;
		padding-left: 0px;
	}
	
	.choice-radio li {
		text-align: center;
		display: inline-block;
		vertical-align: middle;
		position: relative;
		cursor: pointer;
	}
	
	.choice-radio li label {
		display: inline-block;
		font-size: 14px;
		color: #7A7A7A;
		font-weight: inherit;
		width: 70px !important;
		text-align: left;
		padding-left: 25px !important;
	}
	
	.choice-radio li input {
		width: 18px;
		height: 18px;
		display: inline-block;
		position: absolute;
		opacity: 0;
		top: 4px;
		left: -20px;
		margin: auto;
		z-index: 1;
	}
	
	.choice-radio li span {
		position: absolute;
		top: 3px;
		left: 0px;
		margin: auto;
		display: block;
		width: 15px !important;
		height: 15px !important;
		border: 1px solid #7A7A7A;
		border-radius: 50%;
		cursor: pointer;
	}
	
	.choice-radio li.active span {
		border: 1px solid #2EBAB4;
	}
	
	.choice-radio li.active span:before {
		content: '';
		position: absolute;
		top: 3px;
		left: 3px;
		margin: auto;
		display: block;
		width: 7px;
		height: 7px;
		background: #2EBAB4;
		border-radius: 50%;
		cursor: pointer;
	}
	
	.registration-table .crf-info .tb-table .table>tbody>tr>td:last-child {
		padding-left: 70px;
	}
	
	.registration-table .crf-info .tb-table .table>tbody>tr:first-child>td:last-child {
		padding-left: 90px !important;
		width: 250px !important;
	}
	
	.tb-remark {
		width: 100%;
		height: 110px;
		border-left: 1px solid #EBEBEB;
		border-right: 1px solid #EBEBEB;
		border-bottom: 1px solid #EBEBEB;
		position: relative;
	}
	
	.tb-remark-focus {
		border-left: 1px solid #2EBAB4 !important;
		border-right: 1px solid #2EBAB4 !important;
		border-bottom: 1px solid #2EBAB4 !important;
	}
	
	.tb-title-focus {
		border-left: 1px solid #2EBAB4 !important;
		border-right: 1px solid #2EBAB4 !important;
		border-top: 1px solid #2EBAB4 !important;
	}
	
	.tb-remark textarea {
		border: none;
		width: 100%;
		height: 100%;
		padding: 0px 45px;
		color: #909090;
	}
	
	.tb-remark button {
		position: absolute;
		top: 15px;
		right: 0px;
		left: 0px;
		margin: auto;
		width: 115px;
		height: 35px;
		text-align: center;
		vertical-align: middle;
		border: 1px solid #2EBAB4;
		background: #FFFFFF;
		color: #2EBAB4;
	}
	
	.review {
		text-align: center;
		padding: 55px 0px;
		padding-left: 120px;
	}
	
	.review li label {
		width: 180px !important;
		padding-left: 25px !important;
		padding-top: 1px;
	}
	
	.gqfjygh-table-div .table>tbody>tr>td:last-child {
		border-right: 1px solid #EBEBEB;
		padding-right: 40px !important;
		width: 100px;
	}
	
	.gqfjygh-table-div .table>tbody>tr>td:first-child {
		padding-left: 40px;
	}
	
	.gqfjygh-table-div .table>tbody>tr>td {
		padding-left: 40px;
	}
	
	.registration-table .crf-info .tb-table .table>tbody>tr>td:last-child {
		padding-left: 30px;
	}
	
	.alignleft {
		text-align: left;
	}
</style>