<template>
	<div>
		<div class="col-md-12 col-xs-12 col-lg-12 contentDIV mui-wrap">
			<div class="searchDIV mui-insetfocus">
				<div>
					   <p>
					   	<label class="mui-state">
							<input placeholder="请输入用户名或手机号" v-model='queryData.user' maxlength="20"/>
						</label>
                        <span>注册时间</span>
                        <span class="time-group">
                            <input id="start_time" class='form-control'/>
                            <i><img :src="datejpg" /> </i>
                        </span>
                        <span class="time-group">
                            <input id="end_time" class='form-control'/>
                            <i><img :src="datejpg" /></i>
                        </span>
                    </p>
					<p>
						<span class='selectlabel'>状态</span>
						<el-select  v-model="queryData.status" placeholder="" size="small" clearable>
						  <el-option
						    v-for="item in querystatus"
						    :key="item.value"
						    :label="item.label"
						    :value="item.value">
						  </el-option>
						</el-select>	
						<button @click='consultEnd'>查询</button>
					</p>
				</div>
			</div>
			<div class="tableDIV">
				<table class="table">
				  <thead>
				    <tr>
				      <th>序号</th>
				      <th>账户名</th>
				      <th>手机号</th>
				      <th>账户状态</th>						      
				      <th>注册时间</th>
				      <!-- <th>最后登录时间</th> -->
				      <th>操作</th>
				    </tr>
				  </thead>
				  <tbody>
				    <tr v-for="(item,index) in list" v-if='list[0]'>
				      <!-- <td align='center'>{{index+1}}</td> -->
				      <td align='center'>{{item.rownum}}</td>
				      <td>{{item.loginName}}</td>
				      <td>{{item.moblie}}</td>
				      <td>{{item.status | statusFilter}}</td>	
				      <td>{{item.registerDate}} {{item.registerTime}}</td>	
				      <!-- <td>{{item.registerTime}}</td>						       -->
				     <td class="operationTD">
						<div class="operation">
							<font>操作</font>
							<ul v-if='total>0'>
								<li @click='modallogin(0,item)'>登录密码修改</li>
								<li @click='modallogin(1,item,index)'>账户状态修改</li>
								<li @click='binduser(item.loginName,item.moblie,item.registerTime,item.custId,item.registerDate)'>实名账户绑定</li>
								<li @click='modallogin(2,item)'>注册手机修改</li>
							</ul>
						</div>
					</td>
				    </tr>
				  </tbody>
				</table>
				<div class="pagination">
	                <div class="pagetotal" v-show="false">显示：共<span style="font-size:16px;">0</span>个任务</div>
	                <div class="paginationcontent">
							<div class="previousAllPage" @click="previousAllPage"></div>
						<div class="previousPage" @click="previousPage"></div>
	                    <span style="font-size:12px;vertical-align: top;">{{currentPage}} of {{total}}</span>
						<div class="nextPage" @click="nextPage"></div>
						<div class="nextAllPage" @click="nextAllPage"></div>
					</div>
	            </div>
			</div>	
		<!-- 	<div class="block  clearfix">
			  <el-pagination
			    @size-change="handleSizeChange"
			    @current-change="handleCurrentChange"
			    :current-page.sync="currentPage"
			    :page-sizes="[15,100, 200, 300, 400]"
			    :page-size="15"
			    layout="total, sizes, prev, pager, next"
			    :total='total'>
			  </el-pagination>
			</div> -->
        </div>

        <div class="popModal modal fade in" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none; padding-right: 17px;"   >
               <!-- 登录密码修改 -->
                <div class="modal-dialog" id="modal-1" style="display: none;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 class="modal-title" id="myModalLabel">登录密码重置</h4>
                        </div>
                        <div class="modal-body">
                        	<button @click='sendPassFun'>点击发送登录密码</button>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-save" data-dismiss="modal" @click='overReset'>完成重置</button>
                            <button type="button" class="btn-close" data-dismiss="modal">取消</button>
                        </div>
                    </div>       
                </div>
                <!-- 账户状态修改-->
                <div class="modal-dialog" id="modal-3" style="display: none;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 class="modal-title" id="myModalLabel">账户状态修改</h4>
                        </div>
                        <div class="modal-body">
                        	<ul>
                        		<li class="active" @click='labelradio(0,1)'>
                        			<input type="radio"   >
                        			<label for="type1">解锁</label>
                        			<span></span>
                        		</li>
                        		<li  @click='labelradio(1,2)'>
                        			<input type="radio" >
                        			<label for="type2">锁定</label>  
                        			<span></span>
                        		</li>
                        		<li @click='labelradio(2,3)'>
                        			<input type="radio"  >
                        			<label for="type3">注销</label> 
                        			<span></span>
                        		</li>
                        	</ul>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-save" data-dismiss="modal"  @click='updateStatusFun'>完成重置</button>
                            <button type="button" class="btn-close" data-dismiss="modal">取消</button>
                        </div>
                    </div>       
                </div>
                <!-- 注册手机修改 -->
                <div class="modal-dialog" id="modal-8" style="display: none;">
                	<div class="modal-content">
                		<div class="modal-header">
                			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                			<h4 class="modal-title" id="myModalLabel">注册手机修改</h4>
                		</div>
                		<div class="modal-body">
                			<p>注册手机</p>
                			<div >
                				<span>原手机：</span><input v-model='mobilepop' readonly/>
                			</div>
                			<div>
                				<span>新手机：</span><input v-model='newMoblie' type='text' id='popnewMobile' @change='newMobileFun' onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');"  maxlength="20"/>
                				<div class="el-form-item__error"></div>
                			</div>
                			<div class="code">
                				<span>验证码：</span><input style="width: 120px;" id='codeSend' onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');" type='text' maxlength="10" v-model='verifyCode' @change='codeFun'/><button @click="sendCodeFun" id='getCodeBtn'>获取验证码</button>
                				<div class="el-form-item__error"></div>
                			</div>
                			<!-- <p class="remark">备注</p>
                			<div class="textareacenter">
                				<textarea>无字段</textarea>
                			</div> -->
                		</div>
                		<div class="modal-footer">
                			<button type="button" class="btn-save"  @click="registerEdit">保存</button>
                			<button type="button" class="btn-close" data-dismiss="modal">取消</button>
                		</div>
                	</div>
                </div>
        </div>
			<!-- 弹窗 -->
		   <div class="popModal modal fade smallModal" id="visitorQueryPop" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			    <tips :codeview='codeview'></tips>
			</div>
    </div>
</template>
<script>
	import datejpg from '@/assets/images/date.jpg';
	// import { queryTourist , sendSMS , updateStatus} from 'api/AccountManagement/visitorQuery';
	import ApiService from '@/services/API-servies'
	import { isPhone } from '@/utils/validate';
	import tips from '@/components/tips/tips.vue'

    export default {
        //组件名
        name: 'my-position',
        //实例的数据对象
        data() {
            return {
            	datejpg:datejpg,
            	myRequestSearch:'',
            	verifyCode:'',
            	shareholderShow:true,
            	statusShow:true,
            	examineoptions: [
            		{value: '所有'}, 
            		{value: '待定'},
            		{value: '完成'},
            		{value: '审核中'},
            		],
            	examine:'',
            	newMoblie:'',
            	queryData:{
            		user:'',//登录名 手机号   loginName  mobile  验证手机号 
            		status:'',
            		beginDate:'',
            		endDate:'',
            		pageSize:15,
            		pageNumber:1,
            		mobile:'',
            		loginName:''
            	},
            	querystatus: [
                  {
                     value: 1,
                     label: '正常'
                   }, 
                   {
                     value: 2,
                     label: '冻结'
                   },
                   {
                     value: 3,
                     label: '锁定'
                   },
                   {
                     value: 4,
                     label: '注销'
                   }],
                mobilepop:'',
                loginNamepop:'',
                initList:[
	                {
	                	loginName:'-',
	                	moblie:'-',
	                	status:99999,
	                	registerDate:'-',
	                	registerTime:'-',
	                	rownum:'-'
	                }
                ],
                list:[],
                userStatus:null,
                total:0,
                currentPage:1,
                codeview:'',
                codeSend:false,
            }
        },
        props: {

        },
        methods: {
        	previousPage() {
        		if(this.currentPage > 1) {
        			this.currentPage -= 1;
        			this.handleCurrentChange(this.currentPage)
        		} else {
        			return
        		}
        	},
        	previousAllPage() {
        		if(this.currentPage > 1) {
        			this.currentPage = 1;
        			this.handleCurrentChange(this.currentPage)
        		} else {
        			return
        		}
        	},
        	nextPage() {
        		if(this.currentPage < this.total) {
        			this.currentPage += 1;
        			this.handleCurrentChange(this.currentPage)
        		} else {
        			return
        		}
        	},
        	nextAllPage() {
        		if(this.currentPage != this.total) {
        			this.currentPage = this.total;
        			this.handleCurrentChange(this.currentPage)
        		} else {
        			return
        		}
        	},
        	handleSizeChange(val) {
    	        this.queryData.pageSize = val;
    	        this.consultEnd()
    	     },
    	     handleCurrentChange(val) {
    	     	console.log(val)
    	       this.queryData.pageNumber = val;
    	       this.consultEnd()
    	     },
			modallogin(index,items,dataIndex){
				$('#myModal').modal('show');
		   		$("#myModal").children().eq(index).show().siblings().hide();
		   		this.mobilepop = items.moblie;
		   		this.loginNamepop = items.loginName;
		   		if (index==1) {
		   			this.custId = this.list[dataIndex].custId;
		   		}
			},
			binduser(loginName,moblie,registerTime,custId,registerDate){
				this.$router.push({ path: '/visitorQuery/visitorBind', query: { custId: custId } });

				// 获取当前所在行的值
				this.$store.commit('SET_LOGINNAME', loginName);
				this.$store.commit('SET_MOBILE', moblie);
				this.$store.commit('SET_REGISTERTIME', registerTime);
				this.$store.commit('SET_REGISTERDATE', registerDate);


			},
			labelradio(index,val){
				$('#modal-3 li').eq(index).addClass('active').siblings().removeClass('active')
				this.userStatus = val;
			},
			newMobileFun(){
				  if (!isPhone(this.newMoblie)) {
				    $('#popnewMobile').siblings('.el-form-item__error').html('手机号有误，请重新输入!')
				    return false;
				  }else{
				    $('#popnewMobile').siblings('.el-form-item__error').html('')
				    return true;
				  }
			},
			consultEnd(){
				// handle  data
					// 验证user字段
					if (isPhone(this.queryData.user)) {
						this.queryData.mobile = this.queryData.user;
					}else{
						this.queryData.loginName = this.queryData.user;
					};
					if ($('#start_time').val()) {
						this.queryData.beginDate = $('#start_time').val().replace(/[^0-9]/ig,"");
					}
					 if($('#end_time').val()){
					this.queryData.endDate = $('#end_time').val().replace(/[^0-9]/ig,"");
					};
					
					//删除多余字段
					delete this.queryData.user
				//  请求数据
				ApiService.business.queryTourist(this.queryData).then(response => {
				// queryTourist(this.queryData).then(response => {
				   let {
				        data,
				        message,
				        ret
				    } = response;
				    if (ret==0) {
				        // this.total = data.total;
				         this.total = Math.ceil(data.total/ 15);//总条数
				        if (data.total==0) {
							this.list = this.initList;
				        }else{
				        	this.list = data.items;
				        };
				    };
				 })
			},
			overReset(){//完成重置

			},
			registerEdit(){//注册手机修改 确认
				//验证手机号  验证码
				if (!isPhone(this.newMoblie)) {
					$('#newMoblie').focus()
				}else if(!this.codeSend){
					$('#codeSend').focus()
				}else{
					const data = {};
					data.loginName = this.loginNamepop;
					data.oriMobile = this.mobilepop;
					data.newMoblie = this.newMoblie;
					ApiService.common.updateMobile(data).then(res => {
						if(res.ret == 0) {
							console.log(res.message)
							// 更新数据
							this.$notify({
					          title: '提示',
					          message: res.message,
					        });
							this.consultEnd()
							//pop   off
							$('#myModal').modal('hide');
						}
					})
				}
			},
			verifySMS(){
			    const data = {};
			    data.mobile = this.newMoblie;
			    // data.loginName = this.loginNamepop;
			    data.type = 1;
			    data.verifyCode = this.verifyCode;
			    ApiService.common.verifySMS(data).then(response => {
			    // verifySMS(data).then(response => {
			       let {
			            data,
			            message,
			            ret
			        } = response;
			        if (ret==0) {
			             $('#codeSend').siblings('.el-form-item__error').html('')
			             this.codeSend = true
			        }else{
			        	$('#codeSend').siblings('.el-form-item__error').html(message)
			        	this.codeSend = false;
			        }
			     })
			},
			codeFun:function(){
				this.verifySMS()
			},
			sendCodeFun(){
				if (!this.newMoblie) {
					$('#popnewMobile').focus()
				}else{
					    this.newMoblie = $.trim(this.newMoblie);  
					if (!isPhone(this.newMoblie)) return false;  
					$('#getCodeBtn').attr("disabled", true).text("正在发送");  
					var _no = 60;  
					var time = setInterval(function () {  
					    _no--;  
					    $('#getCodeBtn').text(_no + "秒后重发");  
					    if (_no == 0) {  
					        //$('#getCodeBtn').attr("disabled", false).text("获取验证码");  
					        $('#getCodeBtn').removeAttr('disabled').text("获取验证码");  
					        _no = 60;  
					        clearInterval(time);  
					    }  
					}, 100);  
					this.sendSMSFun(this.newMoblie)
				};
			},
			sendPassFun(){
				this.sendSMSFun(this.mobilepop)
			},
			sendSMSFun(mobile){
				const data  = {};
				data.mobile = mobile;
				data.type = 3;
				ApiService.common.sendSMS(data).then(response => {
				// sendSMS(data).then(response => {
				   let {
				        data,
				        message,
				        ret
				    } = response;
				    if (ret==0) {
				       console.log(response.message)
				    };
				 })
			},
			updateStatusFun(){
				const data = {};
				data.status = this.userStatus;
				data.custId = this.custId;
				ApiService.common.updateStatus(data).then(response => {
				// updateStatus(data).then(response => {
				   let {
				        data,
				        message,
				        ret
				    } = response;
				    if (ret==0) {
				       console.log('账户修改成功')
				       // 更新数据
				       this.consultEnd()
				    };
				 })	
			}
        },
        created() {
        	this.consultEnd();
        },
        mounted() {
  			$('#start_time,#end_time').datetimepicker({
  			  language: 'zh-CN',//显示中文
  			  format: 'yyyy/mm/dd',//显示格式
  			  minView: "month",//设置只显示到月份
  			  initialDate: new Date(),//初始化当前日期
  			  autoclose: true,//选中自动关闭
  			  todayBtn: true//显示今日按钮
  			});
        },
        watch: {

        },
        components: {
        	tips
 			        }
    }
</script>

<style   rel="stylesheet/scss" lang="scss" scoped>
.modal-body{
	&>div{
		position:relative;
	}
	.el-form-item__error{
		top:30px;
		left: 115px;
	}
}
	#modal-1 .modal-content .modal-body{
		padding: 70px 0px 0px;
		button{
			width:155px;
			height:35px;
			border-radius:5px;
			border:1px solid #2EBAB4;
			color:#2EBAB4;
			background:#fff
		}
		button:hover{
			color:#fff;
			background:#2EBAB4
		}
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
	
	.pagination .paginationcontent{
		height:35px;
		line-height:35px;
		float: left;
	}
	.pagination .paginationcontent div{
		cursor: pointer;
		display: inline-block;
	    width: 24px;
	    height: 24px;
	}
	.pagination .paginationcontent span{
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
	.mui-insetfocus .el-select{
		width: 155px;
	}

	   .el-select-dropdown{
        width:155px
    }


	.mui-state{
	        display: inline-block;
	        font-weight: inherit;
	        margin-right: 25;
	            padding-left: 30px;//首行偏左20 
	    }
	.searchDIV button{
		margin-left:80px;
	}
	// 表格样式
	.tableDIV .table > thead > tr > th:first-child{
		padding: 16px 0px 16px 40px;
	}
	.tableDIV .table > tbody > tr > td:last-child{
		width: 80px;
		padding: 0px 40px 0px 35px;
	}
	tbody tr td:first-child{
		padding-left: 8px;
	}


	.detailDIV p:before{
		left: 455px !important;
	}

	

	.srf-info{
		border-top: 1px solid #EBEBEB;
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
</style>