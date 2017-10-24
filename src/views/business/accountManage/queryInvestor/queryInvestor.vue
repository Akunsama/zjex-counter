<template>
	<div class="">
		<div class="searchDIV mui-insetfocus">
			<div>
				<p>
					<span>开户日期</span>
					<span class="time-group">
						<input id="start_time" />
						<i><img :src="datejpg" /> </i>
					</span>
					<span class="time-group">
						<input id="end_time" />
						<i><img :src="datejpg" /></i>
					</span>

					<label class="myRequestSearch">
						<span class='selectlabel' style="margin-left: 25px;">客户类型</span>
						<el-select v-model="accountType" placeholder="" size="small">
							<el-option label="个人" value="0"></el-option>
							<el-option label="机构" value="1"></el-option>
						<!-- 	<el-option label="股权冻结" value="3"></el-option>
							<el-option label="股权解冻" value="4"></el-option>
							<el-option label="全部" value="4"></el-option> -->
						</el-select>
					</label>
				</p>
				<p>
					<span class='selectlabel'>状态</span>
					<el-select v-model="status" placeholder="" size="small">
						<el-option label="正常" value="0"></el-option>
						<el-option label="冻结" value="1"></el-option>
						<!-- <el-option label="锁定" value="3"></el-option> -->
						<el-option label="注销" value="*"></el-option>
					</el-select>
					<input placeholder="请输入用户名或手机号" v-model="accountName" maxlength="20"/>
					<input placeholder="请输入证件号码" v-model="certNos" maxlength="20"/>
					<button @click="search()" style="margin-left: 35px;">查询</button>
				</p>
			</div>
		</div>
		<!--<status-search></status-search>-->
		<div class="tableDIV">
			<table class="table">
				<thead>
					<tr>
						<th class="text-center">序号</th>
						<th>客户代码</th>
						<th class="text-center">账户名</th>
						<th>证件号码</th>
						<th>客户类型</th>
						<th>账户状态</th>
						<th>开户日期</th>
						<th class="text-center">备注</th>
						<th class="text-center">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in list">
						<td class="text-center">{{item.rownum}}</td>
						<td>{{item.custNo}}</td>
						<td>
							<div class="operation">
								<font :title="item.name" @click="singleCustomer(index)">{{item.name | threeWords}}</font>
							</div>
						</td>
						<td>
							<span :title="item.certNo">{{item.certNo}}</span>
						</td>
						<td>{{item.custTypeName}}</td>
						<td>{{item.custStatus | custStatus}}</td>
						<td>{{item.openDate}}</td>
						<td>
							<div class="operation">
								<font @click="showinfo(index)">查看</font>
							</div>
						</td>
						<td class="operationTD">
							<div class="operation">
								<font>操作</font>
								<ul class="pwd_update">
									<li v-for="(item2,index) in handlelist" @click="handleType(index,item)">{{item2.name}}</li>
								</ul>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="pagination">
				<!--                <div class="pagetotal" v-show="false">显示：共<span style="font-size:16px;">0</span>个任务</div>-->
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
			<div class="modal-dialog" id="modal-1" v-show="handletype==999">
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

			<div class="modal-dialog" id="modal-1" v-show="handletype==000">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">登录密码修改</h4>
					</div>
					<div class="modal-body">
						<button @click="authcode">点击发送登录密码</button>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save" data-dismiss="modal">完成重置</button>
						<button type="button" class="btn-close" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>

			<div class="modal-dialog" id="modal-2" v-show="handletype==0">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">交易密码修改</h4>
					</div>
					<div class="modal-body">
						<input placeholder="请输入密码" maxlength="6" v-model="firstpassword" @focus="fillpwds" type="password" onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');"/>
						<input placeholder="再次确认密码"  maxlength="6" v-model="secondpassword" @focus="fillpwds" type="password" onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');"/>
						<span :class="{'red':fillpwd==true,'hidden':fillpwd!=true}">{{passwordtext}}</span>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save" @click="tranpasswordChange">完成重置</button>
						<button type="button" class="btn-close" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>

			<div class="modal-dialog" id="modal-3" v-show="handletype==111">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">账户状态修改</h4>
					</div>
					<div class="modal-body">
						<ul>
							<li :class="{active:selectaccount==1}" @click="selectAccount(1)">
								<input type="radio" id="type1">
								<label for="type1">正常</label>
								<span></span>
							</li>
							<li :class="{active:selectaccount==2}" @click="selectAccount(2)">
								<input type="radio" id="type2">
								<label for="type2">冻结</label>
								<span></span>
							</li>
							<li :class="{active:selectaccount==3}" @click="selectAccount(3)">
								<input type="radio" id="type3">
								<label for="type3">注销</label>
								<span></span>
							</li>
						</ul>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save" data-dismiss="modal" @click="accountStatusChange">完成重置</button>
						<button type="button" class="btn-close" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>

			<div class="modal-dialog" id="modal-4" v-show="handletype==100">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">登录密码修改</h4>
					</div>
					<div class="modal-body">
						<input placeholder="请输入密码" maxlength="6"/>
						<input placeholder="再次确认密码" maxlength="6"/>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save" data-dismiss="modal">完成重置</button>
						<button type="button" class="btn-close" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>

			<div class="modal-dialog" id="modal-5" v-show="handletype==1">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">登记企业标识</h4>
					</div>
					<div class="modal-body">
						<ul>
							<li :class="{active:selectregister==1}" @click="selectRegister(1)">
								<input type="radio" id="type1">
								<label for="type1">是登记企业</label>
								<span></span>
							</li>
							<li :class="{active:selectregister==0}" @click="selectRegister(0)">
								<input type="radio" id="type2">
								<label for="type2">非登记企业</label>
								<span></span>
							</li>
						</ul>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save" data-dismiss="modal" @click="corporateLogo">完成重置</button>
						<button type="button" class="btn-close" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>

			<div class="modal-dialog" id="modal-6" v-show="handletype==2">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">基本信息修改</h4>
					</div>
					<div class="modal-body">
						<p>基本信息</p>
						<div>
							<span>登录账户：</span>
							<label>{{handlerow.name}} </label>
						</div>
						<div>
							<span>资金账号：</span>
							<label>{{capitalAccount}} </label>
						</div>
						<div>
							<span>登记账号：</span>
							<label>{{registeraccount}} </label>
						</div>
						<div>
							<span>客户名称：</span><input v-model="name" maxlength="20"/>
						</div>
						<div>
							<span>证件类型：</span>
							<el-select v-model="certType" placeholder="" class='modalselect'>
								<el-option label="身份证" value="1"></el-option>
								<el-option label="营业执照" value="2"></el-option>
								<el-option label="统一社会应用代码" value="3"></el-option>
							</el-select>
							<!--<input v-model="certType"/>-->
						</div>
						<div>
							<span>证件号码：</span><input v-model="certNo" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')" maxlength="20"/>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save" @click="baseinfoChange">完成重置</button>
						<button type="button" class="btn-close" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
			
			<div class="modal-dialog" id="modal-6" v-show="handletype==3">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">其他信息修改</h4>
					</div>
					<div class="modal-body">
						<div>
							<span>法定姓名：</span><input v-model="corporation" />
						</div>
						<div>
							<span>法人电话：</span><input v-model="corporationTel"/>
						</div>
						<div>
							<span>法人邮箱：</span><input v-model="corporationEmiall" />
						</div>
						<div>
							<span>企业地址：</span><input />
						</div>
						<div>
							<span>公司网址：</span><input v-model="webSite" />
						</div>
						<div>
							<span>注册日期：</span><input v-model="registerDate" />
						</div>
						<div>
							<span>注册地址：</span>
							<el-select v-model="provinceId" clearable placeholder="请选择省份" @change='queryCitiesFun(provinceId)'>
	                            <el-option
	                            	v-for="item in provinceIdAll"
	                            	:key="item.provinceId"
	                            	:label="item.provinceName"
	                            	:value="item.provinceId">
	                            </el-option>
	                       </el-select>
						</div>
						<div>
							<span> </span>
							<el-select v-model="cityId" clearable placeholder="请选择城市" >
	                            <el-option
	                            	v-for="item in cityIdAll"
	                            	:key="item.cityId"
	                            	:label="item.cityName"
	                            	:value="item.cityId">
	                            </el-option>
	                       </el-select>
						</div>
						<div>
							<span> </span>
							<input placeholder="请输入详细地址"/>
						</div>
						<div>
							<span>注册资金：</span><input v-model="registerCapital"/>
						</div>
						<div>
							<span>经营范围：</span><input v-model="scopeOfBusiness"/>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save" @click="otherinfoChange">完成重置</button>
						<button type="button" class="btn-close" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>

			<div class="modal-dialog" id="modal-7" v-show="handletype==200">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">扩展信息修改</h4>
					</div>
					<div class="modal-body">
						<p>扩展信息</p>
						<div>
							<span>联系地址：</span><input />
						</div>
						<div>
							<span>联系电话：</span><input />
						</div>
						<p class="remark">备注</p>
						<div>
							<textarea></textarea>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save" data-dismiss="modal">完成重置</button>
						<button type="button" class="btn-close" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>

			<div class="modal-dialog" id="modal-8" v-show="handletype==555">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">注册手机修改</h4>
					</div>
					<div class="modal-body">
						<p>注册手机</p>
						<div>
							<span>原手机：</span><input />
						</div>
						<div>
							<span>新手机：</span><input />
						</div>
						<div class="code">
							<span>验证码：</span><input style="width: 120px;" />
							<button @click="authcode">获取验证码</button>
						</div>
						<p class="remark">备注</p>
						<div class="textareacenter">
							<textarea></textarea>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save" data-dismiss="modal" @click="phoneChange">保存</button>
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
						<h4 class="modal-title" id="myModalLabel">客户信息详情</h4>
					</div>
					<div class="modal-body">
						<div class="tableDIV">
							<p>查看详情</p>
							<table class="table">
								<tbody>
									<tr>
										<td>证件类型</td>
										<td>{{handlerow.certType==1?'身份证':'其他'}}</td>
									</tr>
									<tr>
										<td>手机号码</td>
										<td>{{handlerow.contactMoblie}}</td>
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
import datejpg from '@/assets/images/date.jpg'
import ApiService from '@/services/API-servies'
import { isTypeID } from '@/utils/validate';
//	import 'static/des.js'


export default {
	//组件名
	name: 'query-investor',
	//实例的数据对象
	data() {
		return {
			datejpg: datejpg,
			promptInfo: '重置成功',
			currectpage: 0,
			totalpage: 0,
			accountName: '', //客户名
			accountType: '', //客户类型
			status: '', //状态
			certNos:'',
			passwordtext:'',
			list: [{ //列表
				certType: '-',
				certNo: '-',
				custType: '-',
				custTypeName: '-',
				customerno: '-',
				custNo: '-',
				account: '-',
				capitalAccount: '-',
				openDate: '-',
				custStatus: '-',
				contactMoblie: '-',
				contactAddress: '-',
				email: '-'
			},],
			handlelist: [ //操作列表
				//					{ 
				//	name: '登录密码重置',
				//					}, 
				{
					name: '交易密码修改',
				},
				//					{
				//	name: '账户状态修改',
				//					},
				//{name:'账户角色',},
				{
					name: '登记企业标识',
				}, 
				{
					name: '基本信息修改',
				},
				{
					name: '其他信息修改',
				},
				//{name:'扩展信息修改',},
				//					{
				//	name: '注册手机更改',
				//					},
			],
			handlerow: {}, //操作指定行
			handletype: null,
			//交易密码修改
			fillpwd: false,
			firstpassword: '',
			secondpassword: '',
			//账户状态修改
			selectaccount: null,
			//企业登记标识
			selectregister: null,
			//基本信息修改
			name: '',
			certType: '',
			certNo: '',
			capitalAccount:'',
			registeraccount:'',
            //其他信息修改
            provinceId:'',
            cityId:'',
			provinceIdAll: [],
            cityIdAll: [],
            corporation:'',//法人
            corporationTel:'',//法人电话
            corporationEmiall:'',//法人邮箱
            webSite:'',//公司网址
            registerDate:'',//注册日期
            registerAddress:'',//注册地址
            registerCapital:'',//注册资金
            scopeOfBusiness:'',//经营范围
            

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
		handleType(index, item) {
			this.handletype = index
			$("#myModal").modal("show")
			this.handlerow = item
			console.log(item)

			//9-29 查询企业标识 add
			if (index==1) {
				let data = {};
				data.custMerno = item.custmerno;
				//查询是否是标识企业
				ApiService.business.queryCompanyFlag(data).then(res => {
					this.selectregister = res.data.isCompany
				})
			}else if(index==2){
				ApiService.business.queryCustAccount({
					account: item.account
				}).then(res => {
					let {ret,message,data} = res;
					if(ret == 0) {
						//成功
						this.capitalAccount = data.capitalAccount;
						this.registeraccount = data.account;
					}
				})
			}
			
		},
		selectAccount(index) {
			this.selectaccount = index
		},
		selectRegister(index) {
			this.selectregister = index
		},
		search(currectpage) {
			if (!currectpage) {
				this.currectpage = 1;
			}
			ApiService.business.queryInvestor({
				accountType: this.accountType,
				accountName: this.accountName,
				status: this.status,
				beginDate: this.handleTime($('#start_time').val()),
				endDate: this.handleTime($('#end_time').val()),
				pageSize: 15,
				pageNumber: this.currectpage,
				certNo: this.certNos,//补参 
			}).then(res => {
				let {
						ret,
					data,
					message
					} = res;
				console.log(res)
				if (ret == 0) {
					this.list = data.items;
					this.totalpage = Math.ceil(data.total / 15)
				}
			})
		},
		singleCustomer(index) {
			
			alert("11")
			return
			this.$router.push({
				path: '/singleCustomer',
				query: {
					'certNo': this.list[index].certNo,
					'custNo': this.list[index].custNo,
				}
			});
		},
		showinfo(index) {
			this.handlerow = this.list[index];
			$('#gqfjyghModal').modal('show')
		},
		//登录密码修改
		authcode() {
			ApiService.common.sendSMS({
				mobile: this.handlerow.contactMoblie,
				type: 3,
			}).then(res => {
				if (res.ret == 0) {
					//成功
				}
			})
		},
		fillpwds() {
			this.fillpwd = false;
		},
		//交易密码修改
		tranpasswordChange() {
			if(this.firstpassword.length<6 || this.secondpassword.length<6){
				this.passwordtext = '密码不足6位';
				this.fillpwd = true;
				return
			}
			if (this.firstpassword != this.secondpassword) {
				this.passwordtext = '两次输入的密码不一致';
				this.fillpwd = true;
				return
			}
			ApiService.common.resetTransPwd({
				custmerno: this.handlerow.custmerno,
				newPwd: $.des.getDes(this.secondpassword, '', ''),
			}).then(res => {
				if (res.ret == 0) {
					//成功
					this.handletype = 999;
					this.promptInfo = '重置成功'
					this.firstpassword = "";
					this.secondpassword = "";
				} else {
					this.handletype = 999;
					this.promptInfo = res.message;
				}
			})
		},
		//账户状态修改
		accountStatusChange() {
			ApiService.common.updateStatus({
				custId: "",
				status: this.selectaccount,
			}).then(res => {
				if (res.ret == 0) {
					//成功
				}

			})

				ApiService.business.queryInvestor({
					accountType: this.accountType,
					accountName: this.accountName,
					status: this.status,
					beginDate: $("#start_time").val(),
					endDate: $("#end_time").val(),
					pageSize: 15,
					pageNumber: this.currectpage,
				}).then(res => {
					let {
						ret,
						data,
						message
					} = res;
					console.log(res)
					if(ret == 0) {
						this.list = data.items;
						this.totalpage = Math.ceil(data.total / 15)
					}
				})
			},
			singleCustomer(index) {
				this.$router.push({
					path: '/singleCustomer',
					query: {
						'certNo': this.list[index].certNo,
						'custno': this.list[index].certNo,
					}
				});
			},
			showinfo(index) {
				this.handlerow = this.list[index];
				$('#gqfjyghModal').modal('show')
			},
			//登录密码修改
			authcode() {
				ApiService.common.sendSMS({
					mobile: this.handlerow.contactMoblie,
					type: 3,
				}).then(res => {
					if(res.ret == 0) {
						//成功
					}
				})
			},
			fillpwds(){
				this.fillpwd = false;
			},
			//账户状态修改
			accountStatusChange() {
				ApiService.common.updateStatus({
					custId: "",
					status: this.selectaccount,
				}).then(res => {
					if(res.ret == 0) {
						//成功
					}
				})
			},
			//企业登记标识
			corporateLogo() {
				let data = {};
				data.custMerno = this.handlerow.custmerno;
				data.isCompany = this.selectregister;
				ApiService.business.modifyCompanyFlag(data).then(res => {
					//重置成功重新拉列表
					console.log(res)
					this.search();
				})
			},
			//基本信息修改
			baseinfoChange() {
				if(!isTypeID(this.certNo,Number(this.certType)) ){
					return
				}
				ApiService.common.modifyCustMajor({
					businessKey: '',
					custType: this.handlerow.custType,
					custmerno: this.handlerow.custmerno,
					custno: this.handlerow.custNo,
					name: this.name,
					certType: this.certType,
					certNo: this.certNo,
					fileIds: "",
					filePaths: "",
				}).then(res => {
					console.log(res)
					if(res.ret == 0) {
						//成功
						this.handletype = 999;
						this.promptInfo = '修改成功';
					}else{
						this.handletype = 999;
						this.promptInfo = '修改失败'
					}
				})
			},
			//其他信息修改
			otherinfoChange(){
				ApiService.business.extendInfo({
					businessKey: '',
					custmerno: this.handlerow.custmerno,
					registerDate: this.registerDate,
					nationality: 'CHN',
					provinceId: this.provinceId,
					cityId: this.cityId,
					registerAddress: this.registerAddress,
					registerCapital: this.registerCapital,
					netAssets: "",
					webSite: this.webSite,
					scopeOfBusiness: this.scopeOfBusiness,
					corporation: this.corporation,
					corporationEmiall: this.corporationEmiall,
					corporationMobile: this.handlerow.corporationMobile,
					corporationTel: this.corporationTel,
					corporationAddress: this.handlerow.corporationAddress,
					operId:this.$store.getters.operId,
				}).then(res => {
					console.log(res)
					if(res.ret == 0) {
						//成功
						this.handletype = 999;
						this.promptInfo = '修改成功';
					}else{
						this.handletype = 999;
						this.promptInfo = '修改失败'
					}
				})
			},
			//注册手机修改
			phoneChange() {
				ApiService.common.updateMobile({
					loginName: "",
					oriMobile: '',
					newMoblie: '',
				}).then(res => {
					if(res.ret == 0) {
						//成功
					}
				})
			},
            queryCitiesFun(val){
                const data = {};
                data.provinceId = val;
                ApiService.business.queryCities(data).then(response => {
                    let {
                         data,
                         message,
                         ret
                     } = response;
                     if (ret==0) {
                        this.cityIdAll = data.items;
                     };
                })
            },
		//基本信息修改
		baseinfoChange() {
			if (!isTypeID(this.certNo, Number(this.certType))) {
				return
			}
			ApiService.common.modifyCustMajor({
				businessKey: '',
				custType: this.handlerow.custType,
				custmerno: this.handlerow.custmerno,
				custno: this.handlerow.custNo,
				name: this.name,
				certType: this.certType,
				certNo: this.certNo,
				fileIds: "",
				filePaths: "",
			}).then(res => {
				console.log(res)
				if (res.ret == 0) {
					//成功
					this.handletype = 999;
					this.promptInfo = '修改成功';
				} else {
					this.handletype = 999;
					this.promptInfo = '修改失败'
				}
			})
		},
		//注册手机修改
		phoneChange() {
			ApiService.common.updateMobile({
				loginName: "",
				oriMobile: '',
				newMoblie: '',
			}).then(res => {
				if (res.ret == 0) {
					//成功
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
        ApiService.business.queryProvince({}).then(response => {
            let {
                 data,
                 message,
                 ret
             } = response;
             if (ret==0) {
                this.provinceIdAll = data.items;
             };
        })
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
	components: {}
}
</script>

<style scoped>
.tableDIV .table>tbody>tr>td>span {
	display: inline-block;
	width: 100px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	font-family: "microsoft yahei";
}


.mui-insetfocus .el-select {
	margin-right: 15px;
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
	background: url(./image/fenye1.png) no-repeat;
}

.previousPage {
	background: url(./image/fenye2.png) no-repeat;
}

.nextPage {
	background: url(./image/fenye3.png) no-repeat;
}

.nextAllPage {
	background: url(./image/fenye4.png) no-repeat;
}

.previousAllPage:hover {
	background: url(./image/fenye-on1.png) no-repeat;
}

.previousPage:hover {
	background: url(./image/fenye-on2.png) no-repeat;
}

.nextPage:hover {
	background: url(./image/fenye-on3.png) no-repeat;
}

.nextAllPage:hover {
	background: url(./image/fenye-on4.png) no-repeat;
}

#modal-3 ul,
#modal-5 ul {
	margin: 0px;
	padding: 0px;
}

#modal-3 ul li {
	text-align: center;
	display: inline-block;
	vertical-align: middle;
	margin: 0px 25px;
	position: relative;
	cursor: pointer;
}

#modal-5 ul li {
	text-align: center;
	display: inline-block;
	vertical-align: middle;
	margin: 0px 50px 0px 45px;
	position: relative;
	cursor: pointer;
}

#modal-3 ul li label,
#modal-5 ul li label {
	display: inline-block;
	font-size: 14px;
	color: #7A7A7A;
	font-weight: inherit;
}

#modal-3 ul li input,
#modal-5 ul li input {
	width: 30px;
	height: 30px;
	display: inline-block;
	opacity: 0;
	position: absolute;
	top: 4px;
	left: -20px;
	margin: auto;
}

#modal-3 ul li span,
#modal-5 ul li span {
	position: absolute;
	top: 2px;
	left: -20px;
	margin: auto;
	display: block;
	width: 15px;
	height: 15px;
	border: 1px solid #7A7A7A;
	border-radius: 50%;
	cursor: pointer;
}

#modal-3 ul li.active span,
#modal-5 ul li.active span {
	border: 1px solid #2EBAB4;
}

#modal-3 ul li.active span:before,
#modal-5 ul li.active span:before {
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

#modal-8 .modal-content .modal-body div {
	text-align: left;
}

#modal-8 .modal-content .modal-body div span {
	margin-left: 30px;
}

#modal-8 .modal-content .modal-body div input {
	height: 30px;
}

#modal-8 .modal-content .modal-body div button {
	width: 90px;
	margin-left: 15px;
	color: #2EBAB4;
	border: 1px solid #2EBAB4;
	height: 32px;
	line-height: 30px;
	background: #fff;
}

#modal-8 .modal-content .modal-body div button:hover {
	color: #fff;
	background: #2EBAB4;
}

#modal-8 .modal-content .modal-body div.textareacenter {
	text-align: center;
}

#modal-8 .modal-content .modal-body p.remark {
	padding-top: 30px;
}

.el-select.modalselect {
	margin-bottom: 20px;
}
</style>