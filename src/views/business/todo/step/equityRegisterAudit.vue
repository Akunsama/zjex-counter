<template>
	<div>

		<div class="gqfjyghDIV registrationDIV">
			<p>股权初始登记</p>
			<img :src="gqfjygh" class="gqfjyghImg" />
		</div>

		<div class="tableDIV gqfjygh-table-div registration-table" v-show="!nextpage">
			<div class="crf-info">
				<div class="title">
					股权初始登记
				</div>
				<div class="tb-table">
					<div class="tb tb1">
						<header class="tb-title">
							<p><img :src="blueIcon" />企业基本信息登记表 </p>
						</header>
						<table class="todotable odd nopadding">
							<tbody>
								<tr>
									<th>序号</th>
									<th>审核项目</th>
									<th>资料属性</th>
									<th class="text-center">操作</th>
									<th :class="{'text-center':status==1}">审核结果</th>
									<th style="width: 90px;" class="text-center">备注</th>
								</tr>
								<tr>
									<td>1</td>
									<td>企业基本信息登记表</td>
									<td>必传</td>
									<td class="text-center"><button class="btn-sm2" data-toggle="modal" data-target="#gqfjyghModal">查看</button></td>
									<td class="text-center" v-if="status==1">
										<ul class="choice-radio">
											<li :class="{active:basicInfoAudit==1}" @click="basicInfoAudit=1">
												<input type="radio" value="1" v-model="basicInfoAudit">
												<label for="type1">通过</label>
												<span></span>
											</li>
											<li :class="{active:basicInfoAudit==2}" @click="basicInfoAudit=2">
												<input type="radio" value="2" v-model="basicInfoAudit">
												<label for="type2">不通过</label>
												<span></span>
											</li>
										</ul>
									</td>
									<td v-else>{{basicInfoAudit==1?'通过':'不通过'}}</td>
									<td class="operationTD">
										<div class="operation">
											<font>查看</font>
											<div class="result">
												{{basicInfoOption}}
											</div>
										</div>
									</td>
									<!--<td>{{item.num}}</td>-->
								</tr>
								<tr class="btndiv" v-show="status==2 && created==false">
									<td colspan="6"><button @click="create">创建产品</button></td>
								</tr>
							</tbody>

						</table>
					</div>

					<div class="tb tb1">
						<header class="tb-title">
							<p><img :src="blueIcon" />股东名册 </p>
						</header>
						<table class="todotable odd nopadding">
							<tbody>
								<tr>
									<th>序号</th>
									<th>审核项目</th>
									<th>资料属性</th>
									<th>文档</th>
									<th class="text-center">操作</th>
									<th :class="{'text-center':status==1}">审核结果</th>
									<th style="width: 115px;" class="text-center">单向意见</th>
								</tr>
								<tr>
									<td>1</td>
									<td>股东证明材料</td>
									<td>必传</td>
									<td>123.zip</td>
									<td v-if="status!=1" class="text-center"><button class="btn-sm2">下载</button></td>
									<td class="operationTD" v-else>
										<div class="operation">
											<font>操作</font>
											<ul>
												<li>下载</li>
												<li>上传</li>
											</ul>
										</div>
									</td>
									<!--<td class="text-center"><button class="btn-sm2">下载</button></td>-->
									<td class="text-center" v-if="status==1">
										<ul class="choice-radio">
											<li :class="{active:naturalRegistryAudit==1}" @click="naturalRegistryAudit=1">
												<input type="radio" value="1" v-model="naturalRegistryAudit">
												<label for="type1">通过</label>
												<span></span>
											</li>
											<li :class="{active:naturalRegistryAudit==2}" @click="naturalRegistryAudit=2">
												<input type="radio" value="2" v-model="naturalRegistryAudit">
												<label for="type2">不通过</label>
												<span></span>
											</li>
										</ul>
									</td>
									<td v-else>{{naturalRegistryAudit==1?'通过':'不通过'}}</td>
									<td class="operationTD">
										<div class="operation">
											<font data-toggle="modal" data-target="#opinionModal">查看</font>
										</div>
									</td>
								</tr>
								<tr class="btndiv" v-show="status==2">
									<td colspan="7"><button @click="openAccount">股东开户</button></td>
								</tr>
							</tbody>
						</table>
					</div>

					
					<div class="tb tb2">
						<header class="tb-title">
							<p><img :src="blueIcon">审核资料 </p>
						</header>
						<table class="todotable odd nopadding">
							<tbody>
								<tr>
									<th style="width: 90px;">序号</th>
									<th style="width: 160px;">审核项目</th>
									<th style="width: 90px;">资料属性</th>
									<th>文档</th>
									<th style="width: 90px;" class="text-center">操作</th>
									<th style="width: 210px;" class="text-center" v-show="status==1">审核结果</th>
									<th style="width: 150px;" v-show="status!=1">审核结果</th>
									<th style="width: 115px;" class="text-center">单向意见</th>
								</tr>
							</tbody>
						</table>
						<div class="mCustomScrollbar max-4" id='mytable'>
							<table class="todotable odd nopadding">
								<tbody>
									<tr v-for="(item,index) in fileslist">
										<td style="width: 90px;">{{index+1}}</td>
										<td style="width: 160px;" :title="item.project"><em><i>{{item.project}}</i></em></td>
										<td style="width: 90px;">{{item.ifmust}}</td>
										<td :title="item.filename"><em><i>{{item.filename}}</i></em></td>
										<td style="width: 90px;" class="text-center"><button class="btn-sm2">下载</button></td>
										<td style="width: 210px;" v-if="status==1" class="text-center">
											<ul class="choice-radio">
												<li :class="{active:item.result==1}" @click="item.result=1">
													<input type="radio" value="1" v-model="item.result">
													<label for="type1">通过</label>
													<span></span>
												</li>
												<li :class="{active:item.result==0}" @click="item.result=0">
													<input type="radio" value="2" v-model="item.result">
													<label for="type2">不通过</label>
													<span></span>
												</li>
											</ul>
										</td>
										<td style="width: 150px;" v-else>{{item.result==1?'通过':'不通过'}}</td>
										<td style="width: 115px;" class="operationTD">
											<div class="operation">
												<font data-toggle="modal" data-target="#opinionModal">查看</font>
												<!--<div class="result">
													审核驳回：股权证明不对，没有盖章审核驳回：股权证明不对，没有盖章
												</div>-->
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					
					
					<div class="tb tb1">
						<header class="tb-title">
							<p><img :src="blueIcon" />上传材料 </p>
						</header>
						<table class="todotable odd nopadding">
							<tbody>
								<tr>
									<th>序号</th>
									<th>内容</th>
									<th>资料属性</th>
									<th>文档</th>
									<th class="text-center" style="width: 95px;">操作</th>
								</tr>
								<tr>
									<td>1</td>
									<td>相关资料</td>
									<td>非必传</td>
									<td>相关资料.zip</td>
									<td class="operationTD">
										<div class="operation mui-loadBox">
												<font @click="triggerFile()">上传</font>
												<form enctype='multipart/form-data'>
				                                	<input name="file" class="mui-uploadInput" type="file" @change='uploadFileFun($event)'>
				                            	</form>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="tb tb2">
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
			<div class="srf-info" v-show="status==1 ||status==2">
				<div class="title">
					审核意见
				</div>
				<ul class="choice-radio review">
					<li :class="{active:picked==1}">
						<input type="radio" id="typea" value="1" v-model="picked" data-toggle="modal" data-target="#myModal" @click="auditStatus(1)">
						<label for="typea">审核关闭</label>
						<span></span>
					</li>
					<li :class="{active:picked==2}" v-show="status==1">
						<input type="radio" id="typeb" value="2" v-model="picked" data-toggle="modal" data-target="#myModal" @click="auditStatus(2)">
						<label for="typeb">初审通过</label>
						<span></span>
					</li>
					<li :class="{active:picked==3}" v-show="status==1">
						<input type="radio" id="typec" value="3" v-model="picked" data-toggle="modal" data-target="#myModal" @click="auditStatus(3)">
						<label for="typec">审核驳回</label>
						<span></span>
					</li>
					<li :class="{active:picked==4}" v-show="status==2">
						<input type="radio" id="typec" value="3" v-model="picked" data-toggle="modal" data-target="#myModal" @click="auditStatus(4)">
						<label for="typec">终审通过</label>
						<span></span>
					</li>
				</ul>

			</div>
			<div class="tb-next">
				<button  @click="back">返回</button>
			</div>
		</div>

		<div class="tableDIV gqfjygh-table-div registration-table" v-show="nextpage">
			<div class="crf-info">
				<div class="title">
					股权初始登记
				</div>
				<div class="tb-table" style="padding-top: 0;">
					<div class="entTypeDIV">
						<ul>
							<li @click="datavalidate">数据验证
							</li>
							<li @click="accountOpen">股东开户
							</li>
							<li @click="datadownload">下载
								<img :src="upload" />
							</li>
							<li @click="dataupload">上传
								<img :src="download" />
							</li>
						</ul>
					</div>
					<div class="tb tb1">
						<header class="tb-title">
							<p><img :src="blueIcon" />审核资料 </p>
						</header>
						<table class="todotable odd nopadding">
							<tbody>
								<tr>
									<th>序号</th>
									<th>结果</th>
									<th>详细提示</th>
									<th>客户姓名</th>
									<th>客户简称</th>
									<th>客户性质</th>
									<th>机构标志</th>
									<th style="width: 90px;" class="text-center">备注</th>
								</tr>
								<tr>
									<td>1</td>
									<td>12321</td>
									<td>12321</td>
									<td>12321</td>
									<td>12321</td>
									<td>12321</td>
									<td>12321</td>
									<td class="operationTD">
										<div class="operation">
											<font @click="look" data-toggle="modal" data-target="#gqfjyghModal">查看</font>
										</div>
									</td>
								</tr>
							</tbody>

						</table>
					</div>
				</div>
			</div>
			<div class="tb-next">
				<button @click="$router.push('/todo/todoIndex')">返回</button>
			</div>
		</div>

		<!-- 弹框 （Modal） -->
		<div class="popModal modal fade smallModal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content" v-show="showStatus==1">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">审核意见确认</h4>
					</div>
					<div class="modal-body one-row">
						是否确定该操作
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save btn-review" @click="confirm" data-dismiss="modal">确认</button>
						<button type="button" class="btn-close" data-dismiss="modal">取消</button>
					</div>
				</div>
				<div class="modal-content" v-show="showStatus==2">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">创建产品</h4>
					</div>
					<div class="modal-body two-row">
						<p>托管企业产品<span>创建成功</span>,</p>
						<p>下一步将导入股东名册</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save btn-review" @click="confirm" data-dismiss="modal">确认</button>
						<button type="button" class="btn-close" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
		<div class="popModal modal fade smallModal" id="opinionModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">单向意见</h4>
					</div>
					<!--<div class="modal-body one-row">
		            	是否确定该操作
		            </div>-->
					<div class="modal-body">
						<p class="remark">意见</p>
						<div class="textareacenter">
							<textarea :readonly="status==3 || status==4"></textarea>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save btn-review" data-dismiss="modal">确认</button>
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
						<h4 class="modal-title" id="myModalLabel">产品信息详情</h4>
					</div>
					<div class="modal-body" style="padding-top: 0px;">
						<div class="tableDIV">
							<p>查看详情</p>
							<table class="table">
								<tbody>
									<tr>
										<td>产品名称</td>
										<td>{{data.fundName}}</td>
									</tr>
									<tr>
										<td>产品简称</td>
										<td>{{data.fundAbbr}}</td>
									</tr>
									<tr>
										<td>交易品种类型</td>
										<td>{{data.fundType}}</td>
									</tr>
									<tr>
										<td>所属板块</td>
										<td>{{data.fundClass}}</td>
									</tr>
									<tr>
										<td>总份额</td>
										<td>{{data.totalShares}}</td>
									</tr>
									<tr>
										<td>登记份额</td>
										<td>{{data.registerShares}}</td>
									</tr>
									<tr>
										<td>持有人户数</td>
										<td>{{data.holders}}</td>
									</tr>
									<tr>
										<td>流通份额</td>
										<td>{{data.floatShares}}</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="modalbutton" v-show="!nextpage"><button>下载</button></div>
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
	import upload from '@/assets/images/上传.png'
	import download from '@/assets/images/下载.png'
	import ApiService from '@/services/API-servies'
	import APIConfig from '@/config/API-config'
	import $ from 'jquery'
	import '@/../static/jquery.mCustomScrollbar.concat.min.js'

	export default {
		//组件名
		name: 'equity-register',
		//实例的数据对象
		data() {
			return {
				status: 1,
				upload: upload,
				download: download,
				blueIcon: blueIcon,
				gqfjygh: gqfjygh,
				picked: '',
				path: '/todo/todoIndex',
				addshow: true,
				addText: true,
				isActive: false,
				auditOpinion: null,
				nextpage: false,
				created: false,
				showStatus: 1,
				//附件信息
				
				data: {
					source: 'PCI',
					flag: '1',
					fundName: '产品名称',
					fundAbbr: '产品简称',
					fundType: '产品类型',
					fundClass: '所属板块',
					totalShares: '400',
					registerShares: '300',
					holders: '200',
					floatShares: '100',
					auditContent: [],
					fileIds: [{
							businessLicense: '001'
						}, {
							enRegisterForm: '002'
						}, {
							stockholderForm: '003'
						}, {
							naturalRegistry: '004'
						}, {
							corporationRegistry: '005'
						}, {
							attorney: '006'
						},
						{
							enRegisterForm: '007'
						}, {
							custodyAgreement: '008'
						}, {
							idCard: '009'
						}, {
							bylaw: '010'
						}, {
							infoQuerySheet: '011'
						},
					],
					filePaths: [{
							businessLicense: '001'
						}, {
							enRegisterForm: '002'
						}, {
							stockholderForm: '003'
						}, {
							naturalRegistry: '004'
						}, {
							corporationRegistry: '005'
						}, {
							attorney: '006'
						},
						{
							enRegisterForm: '007'
						}, {
							custodyAgreement: '008'
						}, {
							idCard: '009'
						}, {
							bylaw: '010'
						}, {
							infoQuerySheet: '011'
						},
					],
				},
				//企业基本信息审核
				basicInfoAudit: '',
				basicInfoOption: '',
				//股东名册审核
				naturalRegistryAudit: '',
				naturalRegistryOption: '',
				//上传材料
				counterProve: '',

				fileslist:[{
					project: '营业执照复印件、组织机构代码证、税务登记证',
					type: 'businessLicense',
					ifmust: '二选一',
					result: 2,
					opinion: '11111',
					filename:'资料资料资料.zip',
					filepath:''
				}, {
					project: '营业执照、机构代码证、税务登记证三证合一证件',
					type: 'businessLicense',
					ifmust: '二选一',
					result: 2,
					opinion: '11111',
					filename:'资资料资料资料料.zip',
					filepath:''
				}, {
					project: '企业基本情况登记表',
					type: 'enRegisterForm',
					ifmust: '必填',
					result: 2,
					opinion: '11111',
					filename:'资料资料资料.zip',
					filepath:''
				}, {
					project: '股东基本情况表',
					type: 'naturalRegistry',
					ifmust: '必填',
					result: 2,
					opinion: '11111',
					filename:'资料资料资料.zip',
					filepath:''
				}, {
					project: '股权登记法人授权委托书',
					type: 'attorney',
					ifmust: '必填',
					result: 2,
					opinion: '11111',
					filename:'资料资料资料.zip',
					filepath:''
				},  {
					project: '股权登记承诺书',
					type: 'undertaking',
					ifmust: '必填',
					result: 2,
					opinion: '11111',
					filename:'资料资料资料.zip',
					filepath:''
				},  {
					project: '股权登记托管协议书',
					type: 'custodyAgreement',
					ifmust: '必填',
					result: 2,
					opinion: '11111',
					filename:'资料资料资料.zip',
					filepath:''
				},  {
					project: '授权人及受托人身份证正反面复印件',
					type: 'idCard',
					ifmust: '必填',
					result: 2,
					opinion: '11111',
					filename:'资料资料资料.zip',
					filepath:''
				}, {
					project: '工商部门出具的企业章程',
					type: 'bylaw',
					ifmust: '必填',
					result: 2,
					opinion: '11111',
					filename:'资料资料资料.zip',
					filepath:''
				}, {
					project: '工商部门出具的基本信息查询单',
					type: 'infoQuerySheet',
					ifmust: '必填',
					result: 2,
					opinion: '11111',
					filename:'资料资料资料.zip',
					filepath:''
				}, ],
			}
		},
		//数组或对象，用于接收来自父组件的数据
		props: {

		},
		//方法
		methods: {
			back(){
				document.body.scrollTop = document.documentElement.scrollTop = 0;
				this.$router.push('/todo/todoIndex')
			},
			add() {
				this.addshow = false;
				this.addText = false;
				this.isActive = true
			},
			auditStatus(index) {
				this.showStatus = 1;
				this.auditOpinion = index;
			},
			//审核提交
			confirm() {
				//判断
				if(this.picked == 2 || this.picked == 4){
					for (let i=0;i<this.fileslist.length;i++) {
						if(this.fileslist[i].result==0){
							return
						}
					}
				}
				
				if(this.showStatus == 1) {
					let auditContent = [];
					this.fileslist.forEach((value, index, array) => {
						let obj = {};
						if(value.opinion) {
							obj[value.type] = value.result + '|' + value.opinion;
						} else {
							obj[value.type] = String(value.result);
						}
						auditContent.push(obj)
					});
					auditContent.push({
						counterProve: ''
					})
					
					ApiService.todo.complete({
						userId: '1',
						businessKey: this.$route.query.businessKey,
						comment: this.comment,
						checkFlag: this.picked,
						status: this.status,
						taskStatus: this.$route.query.taskStatus,
						auditContent: auditContent,
					}).then(res => {
						let {
							ret,
							message,
							data
						} = res;
						if(ret == 0) {
							this.$router.push('/todo/todoIndex')
						}else{
							alert(message)
						}
					})
				}
			},
			//创建产品
			create() {
				this.created = true;
				this.showStatus = 2;
				$("#myModal").modal("show");
				ApiService.Registrationmanagement.registerFund({
					businessKey: this.$route.query.businessKey,
					flag: 1,
					account: this.data.account,
					fundCode: this.data.fundCode,
					fundName: this.data.fundName,
					fundAbbr: this.data.fundAbbr,
					fundType: this.data.fundType,
					isOriginal: this.data.isOriginal,
					totalShares:this.data.totalShares,
					registerShares:this.data.registerShares,
					faceValue:this.data.faceValue,
					fileIds:{},
					filePaths:{},
					operId:this.data.operId,
				}).then(res => {
					let {
						ret,
						data,
						message
					} = res;
					if(ret == 0) {
						//成功
					}
				})
				
			},
			//开户按钮
			openAccount() {
				if(this.created == true) {
					document.body.scrollTop = document.documentElement.scrollTop = 0;
					this.nextpage = true;
				}
			},
			look() {

			},
			//验证
			datavalidate() {
				ApiService.Registrationmanagement.inStockholders({
					filepath: '',
					fundcode: '',
					branchcode: '',
					operid: '',
				}).then(res => {
					let {
						ret,
						data,
						message
					} = res;
					if(ret == 0) {
						//成功

						ApiService.Registrationmanagement.queryInStockholders({
							batchno: '',
							isbefore: '',
							pageSize: '',
							pageNo: '',
						}).then(res => {
							let {
								ret,
								data,
								message
							} = res;
							if(ret == 0) {
								//成功
							}
						})

					}
				})
			},
			//开户
			accountOpen() {
				ApiService.Registrationmanagement.processStockholders({
					batchno: '',
					branchcode: '',
					fundcode: '',
					operid: '',
				}).then(res => {
					let {
						ret,
						message,
						data
					} = res;
					if(ret == 0) {
						//成功
						this.data = data;
						ApiService.Registrationmanagement.queryInStockholders({
							batchno: '',
							isbefore: '',
							pageSize: '',
							pageNo: '',
						}).then(res => {
							let {
								ret,
								data,
								message
							} = res;
							if(ret == 0) {
								this.showStatus = 1;
								$("#myModal").modal("show")
								//成功
							}
						})

					}
				})
			},
			//下载文件
			datadownload() {

			},
			dataupload() {
				ApiService.files.uploadFile({
					batchno: '',
					isbefore: '',
					pageSize: '',
					pageNo: '',
				}).then(res => {
					if(res.ret == 0) {
						//成功
						res.data.items
					}
				})
			},
			//上传文件
			triggerFile() {
	            $(".mui-uploadInput").trigger('click');
	        },
			uploadFileFun(e){
	            const fileName = this.fileName;
	            const file =  e.target.files[0];
	             ApiService.files.uploadFile(file,'postfile').then(response => {
	                let {
	                     data,
	                     message,
	                     ret
	                 } = response;
	                if (ret==0) {
	                	//上传成功 赋值参数
						this.counterProve = data.fileId;
	                };
	                 e.target.parentNode.reset()
	             })
			}
		},
		created() {
			ApiService.todo.queryCSDetail({
				processDefinitionKey: this.$route.query.processDefinitionKey,
				businessKey: this.$route.query.businessKey,
			}).then(res => {
				let {
					ret,
					message,
					data
				} = res;
				if(ret == 0) {
					//成功
					
					console.log("返回的整体信息",JSON.parse(data) )
					this.data = JSON.parse(data);
					
//					//查询文件信息
//					this.fileslist.forEach((value1, index1, array1) => {
//						data.items[0].auditContent.forEach((value2, index2, array2) => {
//							if(value1.type==value2.类型){
//								value1.option = value2.option;
//								value1.result = value2.result;
//							}
//						});
//						res.data.filePaths.forEach((value2, index2, array2) => {
//							if(value1.type==value2.类型){
//								value1.filepath = value2.filepath;
//							}
//						});
//					});
					//企业基本信息
					if(JSON.stringify(this.data.auditContent).enRegisterForm){
						let arr = JSON.stringify(this.data.auditContent).enRegisterForm.split('|');
						this.basicInfoAudit = arr[0];
						this.basicInfoOption = arr[1];
					}
					//股东名册信息信息
					if(JSON.stringify(this.data.auditContent).naturalRegistry){
						let arr = JSON.stringify(this.data.auditContent).naturalRegistry.split('|');
						this.naturalRegistryAudit = arr[0];
						this.naturalRegistryOption = arr[1];
					}
					
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
			$("#mytable").mCustomScrollbar();
		},
		watch: {

		},
		//组件
		components: {

		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
	.gqfjygh-table-div .nopadding > tbody > tr > td em{
	    font-style: normal;
	    display: inline-block;
	}
	.gqfjygh-table-div .nopadding > tbody > tr > td i{
		font-family: "microsoft yahei";
		font-style: normal;
	    max-width: 115px;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    display: inline-block;
	    overflow: hidden;
	    vertical-align: middle;
	}
	.btndiv {
		width: 100%;
		height: 120px;
		text-align: center;
		border-top: 1px solid #EBEBEB;
		border-left: 1px solid #EBEBEB;
		border-right: 1px solid #EBEBEB;
		background-color: #fff!important;
	}
	
	.btndiv button {
		width: 115px;
		height: 35px;
		text-align: center;
		vertical-align: middle;
		border: 1px solid #2EBAB4;
		background: #FFFFFF;
		color: #2EBAB4;
	}
	
	.btndiv button:hover {
		background: #2EBAB4;
		color: #FFFFFF;
	}
	
	.modalbutton {
		width: 100%;
		height: 120px;
		text-align: center;
		padding-top: 40px;
	}
	
	.modalbutton button {
		width: 115px;
		height: 35px;
		text-align: center;
		vertical-align: middle;
		border: 1px solid #2EBAB4;
		background: #FFFFFF;
		color: #2EBAB4;
	}
	
	.modalbutton button:hover {
		background: #2EBAB4;
		color: #FFFFFF;
	}
	
	.entTypeDIV ul li {
		width: 115px;
		padding: 0 15px;
		font-size: 16px;
	}
	
	.entTypeDIV ul li img {
		position: absolute;
		top: 8px;
		right: 15px;
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
		left: 435px !important;
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
		right: 435px !important;
	}
	
	.gqfjygh-table-div {
		/*border-left: 1px solid #EBEBEB;*/
		margin-bottom: 0px;
	}
	
	.gqfjygh-table-div .title {
		text-align: left !important;
		padding: 0px 0px 0px 30px;
		height: 55px;
		line-height: 55px;
		background: #f8fbfb;
		font-size: 16px;
		color: #666666;
	}
	
	.gqfjygh-table-div .tb-search {
		text-align: center;
		padding: 30px 0px 38px 0px;
	}
	
	.gqfjygh-table-div .tb-search input {
		vertical-align: middle;
		width: 190px;
		height: 35px;
		padding: 15px;
		border: 1px solid #EBEBEB;
		font-size: 14px;
		color: #909090;
		margin: 0px 10px;
	}
	
	.gqfjygh-table-div .tb-search button {
		vertical-align: middle;
		margin-left: 25px;
		width: 115px;
		height: 35px;
		text-align: center;
		font-size: 16px;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		border-radius: 5px;
	}
	
	.gqfjygh-table-div .tb-table .tb {
		padding: 10px 50px 55px 50px;
	}
	
	.gqfjygh-table-div .tb-table .tb .tb-title {
		height: 45px;
		border-top: 1px solid #EBEBEB;
		border-left: 1px solid #EBEBEB;
		border-right: 1px solid #EBEBEB;
		position: relative;
	}
	
	.gqfjygh-table-div .tb-table .tb .tb-title p {
		background: #FFFFFF;
		position: absolute;
		top: -20px;
		left: -11px;
		margin: 0;
		padding: 10px 15px 10px 0px;
		color: #2EBAB4;
	}
	
	.gqfjygh-table-div .tb-table .tb .tb-title p img {
		vertical-align: middle;
		margin-right: 10px;
	}
	
	.gqfjygh-table-div .table>tbody>tr>th {
		border-bottom: 0px !important;
		background: #f8fbfb;
		font-size: 16px;
		color: #666666;
		padding: 16px 0px 16px 35px;
		font-weight: inherit;
	}
	
	.gqfjygh-table-div .table>tbody>tr>th:first-child {
		border-left: 1px solid #EBEBEB;
	}
	
	.gqfjygh-table-div .table>tbody>tr>th:last-child {
		width: 260px;
		padding-left: 90px;
		border-right: 1px solid #EBEBEB;
	}
	
	.gqfjygh-table-div .table>tbody>tr>td {
		padding-left: 40px;
	}
	
	.gqfjygh-table-div .table>tbody>tr>td:first-child {
		border-left: 1px solid #EBEBEB;
	}
	
	.gqfjygh-table-div .table>tbody>tr>td:last-child {
		border-right: 1px solid #EBEBEB;
		width: 220px;
	}
	
	.gqfjygh-table-div .table.odd>tbody>tr:nth-of-type(even) {
		background: #FFFFFF !important;
	}
	
	.gqfjygh-table-div .table.odd>tbody>tr:nth-of-type(odd) {
		background: #fcfcfc !important;
	}
	
	.gqfjygh-table-div .tb2 .table.odd {
		margin-bottom: 0px !important;
	}
	
	.gqfjygh-table-div .tb2 .table.odd>tbody>tr:last-child>td {
		border-bottom: none;
		width: 150px;
	}
	
	.gqfjygh-table-div .tb2 .table.odd>tbody>tr:last-child>td:first-child {
		width: 100px;
	}
	
	.gqfjygh-table-div .tb2 .table.odd>tbody>tr:last-child>td:last-child {
		width: 130px;
		text-align: center;
	}
	
	.gqfjygh-table-div .tb2 .table.odd>tbody>tr:last-child>td.time {
		width: 200px;
	}
	
	.gqfjygh-table-div .tb-next {
		text-align: center;
		padding: 45px 0px 37.5px 0px;
		border-top: 1px solid #EBEBEB;
	}
	
	.gqfjygh-table-div .tb-next button {
		width: 105px;
		height: 35px;
		line-height: 30px;
		border: 1px solid #EBEBEB;
		color: #909090;
		background: #FFFFFF;
		margin: 0px 15px;
		font-size: 16px;
	}
	
	.gqfjygh-table-div .tb-next button:hover {
		border: 1px solid #488FFE;
		background: #488FFE;
		color: #FFFFFF;
	}
	
	#gqfjyghModal .modal-body .tableDIV {
		width: 370px;
		margin: auto;
		margin-top: 18px;
	}
	
	#gqfjyghModal .modal-body .tableDIV p {
		height: 35px;
		color: #FFFFFF;
		background: #2EBAB4;
		line-height: 35px;
		margin: 0px;
		font-size: 16px;
	}
	
	#gqfjyghModal .modal-body .tableDIV .table>tbody>tr>td:first-child {
		height: 43px;
		padding: 0px 0px 0px 25px;
		border-right: 1px solid #EBEBEB;
		border-left: 1px solid #EBEBEB;
		text-align: left;
		width: 150px;
	}
	
	#gqfjyghModal .modal-body .tableDIV .table>tbody>tr>td:last-child {
		height: 43px;
		padding: 0px 0px 0px 25px;
		border-right: 1px solid #EBEBEB;
		text-align: left;
	}
	
	.modal-body .if-do {
		padding: 5px 0px 10px 0px;
		color: #909090;
	}
	
	.modal-body .if-do span {
		display: inline-block;
		width: 15px;
		height: 15px;
		border: 1px solid #7A7A7A;
		border-radius: 50%;
		cursor: pointer;
		position: relative;
		vertical-align: sub;
		margin: 0px 15px;
	}
	
	.modal-body .if-do span.checked {
		border: 1px solid #2EBAB4;
	}
	
	.modal-body .if-do span.checked:before {
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
	
	#gqfjyghModal .modal-dialog {
		height: 665px;
	}
	
	.gqfjygh-table-div .table label {
		font-weight: inherit;
		display: inline-block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		width: 180px;
		margin: 0px;
		padding: 2px 0px 0px;
	}
	
	.gqfjygh-table-div .tb2 .table label {
		width: 150px !important;
	}
	
	.gqfjygh-table-div .srf-info .tb-table .tb {
		padding-bottom: 35px !important;
	}
	
	.registration-table .tb-table {
		padding-top: 65px;
	}
	
	.choice-radio {
		margin: 5px auto 0;
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
	
	.gqfjygh-table-div[data-v-6773d214] {
		border-left: none;
	}
	
	.gqfjygh-table-div .table>tbody>tr>td {
		padding-left: 35px;
	}
	
	.gqfjygh-table-div .audittable>tbody>tr>th:last-child {
		width: 100px;
		padding-left: 115px;
	}
	
	.registration-table .crf-info .tb-table .audittable>tbody>tr>td:last-child {
		padding-left: 115px;
	}
	
	#opinionModal .modal-dialog .modal-content .modal-body {
		height: 185px;
		padding-left: 40px;
		font-size: 16px;
		color: #7A7A7A;
	}
	
	#opinionModal .modal-dialog .modal-content .modal-body p {
		text-align: left;
	}
	
	#opinionModal .modal-dialog .modal-content .modal-body .textareacenter textarea {
		width: 315px;
		height: 100px;
		border: 1px solid #EBEBEB;
		font-size: 14px;
		color: #909090;
		padding: 15px;
	}
	.modal-dialog .modal-content .modal-body.two-row{
		height: 185px;
	}
	.modal-dialog .modal-content .modal-body.two-row p{
		margin-top: 30px;
	}
	.modal-dialog .modal-content .modal-body.two-row span{
		color: #2EBAB4;
	}
	.mui-loadBox{
        position: relative;
        form{
            position: absolute;
            right: 0px;
            top: 0px;
            width:50px;
            height:25px;
            overflow:hidden;
            z-index:-1;
        }
        .mui-uploadInput{
             font-family: Arial;
             font-size: 118px;
             margin: 0px;
             padding: 0px;
             cursor: pointer;
             visibility: hidden;
             height: 100%;
             filter:alpha(opacity=0);
            -moz-opacity:0;
            outline:none;
         }
    }
</style>