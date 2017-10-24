<template>
	<div class="">

		<div class="tableDIV gqfjygh-table-div mui-insetfocus mui-wrap">
			<div class="crf-info">
				<div class="title">
					注册账户信息
				</div>
				<div class="tb-table mui-circletop">
					<div class="tb tb3">
						<header class="tb-title">
							<p><img :src="blueicon" />注册账户信息 </p>
						</header>
						<table class="table odd  mui-tb-table">
							<tbody>
								<tr>
									<th>账户</th>
									<th>手机号</th>
									<th>注册时间</th>
								</tr>
								<tr>
									<td>{{loginName}}</td>     
									<td>{{moblie}}</td>
									<td>{{registerDate}} {{registerTime}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="srf-info">
				<div class="title mui-top-border">
					实名账户信息
				</div>
				<div class="tb-search">
					<input placeholder="请输入客户代码" v-model='custno' maxlength="20"/>
					<div class='mui-state'>
						<span class='selectlabel'>证件类型</span>
						<el-select  v-model="certType" placeholder="" size="small" clearable>
						  <el-option
						    v-for="item in options"
						    :key="item.value"
						    :label="item.label"
						    :value="item.value">
						  </el-option>
						</el-select>	
					</div>
					<input placeholder="请输入证件号码" v-model='certNo' maxlength="20"/>
					<button class="btn-sm1" @click='consultUser'>查询</button>
				</div>
				<div class="tb-table">
					<div class="tb tb1">
						<header class="tb-title">
							<p><img :src="blueicon" />实名账户信息 </p>
						</header>
						<table class="table odd  mui-tb-table">
							<tbody>
								<tr>
									<th>客户代码</th>
									<th>客户姓名</th>
									<th>证件类型</th>
									<th>证件号码</th>
									<th>客户类型</th>
									<!-- <th>开通银行存管</th> -->
								</tr>
							    <tr>
							      <td>{{list.custno}}</td>
							      <td>{{list.name}}</td>
  							    <!--   <td>
  							       <div class='mui-operationTips'>
  							       	<font>{{list.name}}</font>
                                          <div class="tipsPop">
                                            {{list.name}}
                                          </div>
                                      </div>
  							      </td> -->
							      <td>{{list.certTypeName}}</td>	
							      <td>{{list.certNo}}</td>	
							      <td>{{list.custTypeName}}</td>
							      <!-- <td>开通银行存管</td>						       -->
							    </tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="tb-next">
				<button @click='userbind'>绑定</button>
			</div>
		</div>

		 <!-- 交易密码输入 -->
		 <div class="popModal modal fade in" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none; padding-right: 17px;">
			 <div class="modal-dialog" id="modal-1" >
			     <div class="modal-content">
			         <div class="modal-header">
			             <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			             <h4 class="modal-title" id="myModalLabel">交易密码输入</h4>
			         </div>
			         <div class="modal-body">
			         	<div>
			         		<input placeholder="请输入交易密码"  type='password' id='transPwd' v-model='transPwd' maxlength="6"    onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');"   @change='transWat'>
			         		<div class="el-form-item__error"></div>
			         	</div>
			         </div>
			         <div class="modal-footer">
			             <button type="button" class="btn-save" data-dismiss="modal" @click='transBind'>确认</button>
			             <button type="button" class="btn-close" data-dismiss="modal">取消</button>
			         </div>
			     </div>       
			 </div>
		</div>
		
		 <!-- 弹窗 -->
       <div class="popModal modal fade smallModal" id="visitPop" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <tips :codeview='codeview'></tips>
        </div>
		<div class="popModal modal fade smallModal" id="stockpro" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content" >
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		                <h4 class="modal-title" id="myModalLabel">温馨提示</h4>
		            </div>
		            <div class="modal-body one-row">
		                绑定成功
		            </div>
		            <div class="modal-footer">
		                <button type="button" class="btn-save btn-review"  data-dismiss="modal">确认</button>
		                <button type="button" class="btn-close" data-dismiss="modal">取消</button>
		            </div>
		        </div>
		    </div>
		</div>
	</div>
</template>

<script>
	import blueicon from '@/assets/images/blue-icon.png'
	import ApiService from '@/services/API-servies'
	import Cookies from 'js-cookie';
	import tips from '@/components/tips/tips.vue'
	
	export default {
		//组件名
		name: 'binduser',
		//实例的数据对象
		data() {
			return {
				blueicon:blueicon,
				certType:1,
				custno:'',
				certNo:'',
				custId:'',
				custmerno:"",
				list:{
					custno:'-',
					name:'-',
					certTypeName:'-',
					certNo:'-',
					custTypeName:'-'
				},
				codeview:'',
				options: [
					{
                     value: 1,
                     label: '身份证'
                   }, 
                   {
                     value: 2,
                     label: '营业执照'
                   },
                   {
                     value: 3,
                     label: '统一信用代码'
                   }],
			}
		},
		computed: {
		  // ...mapGetters([
		  //   'loginName',
		  //   'moblie',
		  //   'registerTime'
		  // ])
		},
		props: {

		},
		methods: {
			selected(index){
				this.checkindex = index
			},
			lenFun(val){
				if (val.length>5) {
					return  val;
				}

			},
			bindAccountFun(){
				const data = {};
				data.custId = this.$route.query.custId;//从查询页面带过来
				data.custmerno = this.custmerno;
				ApiService.business.bindAccount(data).then(response => {
				   let {
				        data,
				        message,
				        ret
				    } = response;
				    if (ret==0) {
				    	this.$notify({
				    	          title: '提示',
				    	          message: '绑定成功',
				    	        });
				    }else{
				    	this.$message.error(message);
				    };
				 })
			},
			transWat(){
				let data = {};
				data.custMerno = this.custmerno;
				data.transPwd = $.des.getDes(String(this.transPwd),'','');
				ApiService.business.validTranPwd(data).then(response => {
					let {data,message,ret} = response;
					if (ret==0) {
						$('#transPwd').siblings('.el-form-item__error').html('')
					}else{
						$('#transPwd').siblings('.el-form-item__error').html('交易密码错误，请重新输入')
					};
				})
			},
			transBind(){
				//验证交易密码是否正确
				let data = {};
				data.custMerno = this.custmerno;
				data.transPwd = $.des.getDes(String(this.transPwd),'','');
				ApiService.business.validTranPwd(data).then(response => {
					let {data,message,ret} = response;
					if (ret==0) {
						this.bindAccountFun()
					}else{
						this.$notify({
						          title: '提示',
						          message: message,
						        });
					};
					
				})
			
			},
			userbind(){
				if (!this.custmerno) {
					 $('#visitPop').modal('show')
					this.codeview = '无绑定实名账户信息，请查询';
				}else{
					$('#myModal').modal('show');
				};
			},
			consultUser(){
				const data  = {};
				// data.account = '';//非必传 不传
				data.custno = this.custno;
				data.certNo = this.certNo;
				data.certType = this.certType;

				ApiService.business.queryCustAccount(data).then(response => {
				   let {
				        data,
				        message,
				        ret
				    } = response;
				    if (ret==0) {
				    		 this.list = data;
				    		 this.custmerno = data.custmerno;//文档
				    }else{
				    	// 账户不存在
				    	 $('#visitPop').modal('show')
				    	this.codeview = '未找到该账户，请重新输入';
				    };
				 })
			}
		},
		filters:{
		
		},
		created() {
			// this.moblie = this.$store.getters.moblie;

			//跳转回显信息
			this.loginName = Cookies.get('loginName');
			this.moblie = Cookies.get('moblie');
			this.registerTime = Cookies.get('registerTime');
			this.registerDate = Cookies.get('registerDate');

		},
		mounted() {

		},
		watch: {
			custno:function(val,oldVal){
				if (val.length>20) {
					this.custno = oldVal;
				}
			}
		},
		//组件
		components: {
			tips
		}
	}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
	
	.modal-body{
		&>div{
			position:relative;
		}
		.el-form-item__error{
			    top: 40px;
    			left: 140px;
		}
	}
	.mui-circletop{
		padding: 30px 0px 0px 0px;
	}

	.mui-top-border{
		border-top: 1px solid #EBEBEB
	}

	.mui-state{
		display: inline-block;
		font-weight: inherit;
		// margin-right: 20px;
		margin-left:15px;
	}
	.gqfjygh-table-div .tb-table .tb {
		padding: 10px 50px 35px 50px;
	}
	
	// table  th字体样式
	.mui-tb-table{
		tbody{
			th:first-child{
				border-left: 1px solid #EBEBEB;
			}
			th:last-child{
				border-right: 1px solid #EBEBEB;
			}
			th{
				padding: 0px 0px 0px 35px;
				padding-left: 40px;
				font-size: 16px;
				color: #666666;
				font-weight:400;
				height: 55px;
				vertical-align: middle;
				border-bottom: 1px solid #EBEBEB;
			}
		}
	}

	// 修改tab1样式
	.tb3 .mui-tb-table{
		td:first-child{
			padding-left: 138px;
		}
		td:last-child{
			padding-left: 15px;
		}
		th:first-child{
			padding-left: 138px;
		}
		th:last-child{
			padding-left: 15px;
		}
	}


	.gqfjyghDIV {
		height: 105px;
		line-height: 105px;
		/*background: url(../images/gqfjygh.png) no-repeat center;*/
		background-size: 100%, 100%;
		position: relative;
		z-index: -2;
	}
	
	.gqfjyghDIV:before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		background: rgba(61, 62, 63, .85);
		z-index: -1;
	}
	
	.gqfjyghDIV p {
		font-size: 16px;
		text-align: center;
		z-index: 0;
		color: #FFFFFF;
		margin: 0px;
		position: relative;
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
	
	.gqfjygh-table-div {
		border-left: 1px solid #EBEBEB;
		border:none;
		margin-bottom: 75px;
	}
	
	.gqfjygh-table-div .title {
		text-align: left !important;
		padding: 0px 0px 0px 30px;
		height: 55px;
		line-height: 55px;
		background: #f8fbfb;
		font-size: 16px;
		color: #666666;
		border:none
	}
	
	.gqfjygh-table-div .tb-search {
		text-align: center;
		padding: 30px 0px 38px 0px;
	}
	
	.gqfjygh-table-div .tb-search  {
		input{
		vertical-align: middle;
		width: 155px;
		height: 35px;
		padding: 15px;
		border: 1px solid #EBEBEB;
		font-size: 14px;
		color: #909090;
		margin: 0px 10px;
		}

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
	
	.gqfjygh-table-div .tb2 .max-4 .table>tbody>tr>td {
		width: 150px;
	}
	
	.gqfjygh-table-div .tb2 .max-4 .table>tbody>tr>td:first-child {
		width: 100px;
	}
	
	.gqfjygh-table-div .tb2 .max-4 .table>tbody>tr>td:last-child {
		width: 130px;
		text-align: center;
	}
	
	.gqfjygh-table-div .tb2 .max-4 .table>tbody>tr>td.time {
		width: 200px;
	}
	
	.gqfjygh-table-div .tb2 .max-4 .table>tbody>tr>td span {
		display: block;
		width: 15px;
		height: 15px;
		border: 1px solid #7A7A7A;
		border-radius: 50%;
		cursor: pointer;
		position: relative;
	}
	
	.gqfjygh-table-div .tb2 .max-4 .table>tbody>tr.checked>td span {
		border: 1px solid #2EBAB4;
	}
	
	.gqfjygh-table-div .tb2 .max-4 .table>tbody>tr.checked>td span:before {
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
	
	.gqfjygh-table-div .tb2 .max-4 .table {
		margin-bottom: 0px;
	}
	
	.max-4 {
		height: 225px;
		overflow: auto;
	}
	
	.gqfjygh-table-div .tb-next {
		text-align: center;
		padding: 37.5px 0px 37.5px 0px;
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
	
	.registration-table .crf-info .tb-table .table>tbody>tr>td:last-child {
		padding-left: 70px;
	}
	
	.registration-table .crf-info .tb-table .table>tbody>tr:first-child>td:last-child {
		padding-left: 90px !important;
		width: 250px !important;
	}




</style>