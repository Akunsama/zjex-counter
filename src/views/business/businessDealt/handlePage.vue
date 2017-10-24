<template>
	<div >
		<div class="gqfjyghDIV" >
			<p >股权{{businessTypeFun}}</p>
			<img :src="gqfjygh" class="gqfjyghImg"/>
		</div>
		<!-- 组件 -->
		<!-- <c-pdf   v-on:fileres='fileres' v-if='playervar'></c-pdf> -->
		<div id="player" class='cpdf' v-show='playervar'></div>
		<transfer v-if='businessTypeFun=="非交易过户"' v-on:jumpFile="showpageFun" v-show="showpage==1"  ></transfer>
		<div v-else class="tableDIV gqfjygh-table-div" style="margin-bottom: 0;" v-show="showpage==1">
			<crf-info :title="businessTypeFun"   ref='carinfoData'></crf-info>
            <div class="tableDIV dataRecordTable infotable" >
                <div class="dataRecord-step3">
                <!-- 传递数据 -->
             	<shareChange v-if='businessTypeFun=="份额性质变更"' ref='varyinfoData'></shareChange>
             	<shareFreeze v-if='businessTypeFun=="份额冻结"' ref='varyinfoData'></shareFreeze>
             	<shareUnfreeze v-if='businessTypeFun=="份额解冻"' ref='varyinfoData'></shareUnfreeze>
             	<sharePledge v-if='businessTypeFun=="份额质押"'  ref='varyinfoData'></sharePledge>
             	<shareUnpledge v-if='businessTypeFun=="份额解押"'  ref='varyinfoData'></shareUnpledge>
             	<shareAdjust v-if='businessTypeFun=="份额调整"' ref='varyinfoData'></shareAdjust>
             	<!-- <increaseShare v-if='businessTypeFun=="增资扩股"'></increaseShare> -->
                <div class="tb-next">
                	<button @click="routeHerf">返回</button>
                    <button @click="step(2)">下一步</button>
                </div>  
                </div>
            </div>
				
		</div>
		
		<div class="tableDIV dataRecordTable" v-show="showpage==2">
				<div class="dataRecord-step3" >
					<uploadlist :itemList="itemList"   v-on:upload="changeState"  :Type='fileType'></uploadlist>
                    <p class="btn-next">
                        <button @click="step(1)">返回</button>
                        <button id="ca-btn" @click='onsubmit' v-if='submitBol' >提交</button>
                    </p>
                </div>
		</div>   
		
		<!-- 弹窗 -->
	   <div class="popModal modal fade smallModal" id="indedxModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <tips :codeview='codeview'></tips>
		</div>
		
		<div class="popModal modal fade smallModal" id="submitPop" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content" >
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		                <h4 class="modal-title" id="myModalLabel">温馨提示</h4>
		            </div>
		            <div class="modal-body one-row">
		                提交成功
		            </div>
		            <div class="modal-footer">
		            		<button   @click='printRecord' type="button" class="btn-save btn-review">{{((businessTypeFun=="份额性质变更")||(businessTypeFun=="份额调整"))?'确认':"打印凭证"}}</button>
		                <button type="button" class="btn-close" data-dismiss="modal">取消</button>
		            </div>
		        </div>
		    </div>
		</div>
        <!-- 弹框 （Modal） -->
        <div  class="popModal modal fade"  id="uploadModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                       <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">选择要上传的文件</h4>
                    </div>
                    <div class="modal-body">
                     <ul>
                         <li>
                             <span>模版下载</span>
                             <div   @click='downLoadFun'><button class="grey"><i class="fa fa-fw fa-download"></i></button></div>
                         </li>
                         <li class='mui-loadBox'>
                             <span>文件上传</span>
                             <button @click="triggerFile()"><i class="fa fa-fw fa-upload"></i></button>
                             <form>
                                 <input name="file" class="mui-uploadInput" type="file" @change='uploadFileFun($event)'>
                             </form>
                         </li>
                     </ul>
                     <div class="prompt">
                        <p >
                            {{cueInfo}}
                        </p>
                     </div>
                     <p>状态：{{uploadStatus}}<font>{{uploadName}}</font></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-save" data-dismiss="modal" @click='uploadEnd'>确认</button>
                        <button type="button" class="btn-close" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
		<!-- <c-pdf @closepdf="closepdf" v-show="isshowpdf" :pdfurl="testpdfurl"></c-pdf> -->
	</div>
</template>

<script>
	import blueicon from '@/assets/images/blue-icon.png'
	import gqfjygh from '@/assets/images/gqfjygh.png'


	import crfInfo from '@/components/dealtStep/crfInfo.vue'
	import uploadlist from '@/components/dealtStep/uploadList.vue'
	import tips from '@/components/tips/tips.vue'

	import transfer from '@/components/dealtStep/transfer.vue'
	import shareChange from '@/components/dealtStep/shareChange.vue'
	import shareFreeze from '@/components/dealtStep/shareFreeze.vue'
	import shareUnfreeze from '@/components/dealtStep/shareUnfreeze.vue'
	import sharePledge from '@/components/dealtStep/sharePledge.vue'
	import shareUnpledge from '@/components/dealtStep/shareUnpledge.vue'
	import shareAdjust from '@/components/dealtStep/shareAdjust.vue'
	// import increaseShare from '@/components/dealtStep/increaseShare.vue'

	import ApiService from '@/services/API-servies'
	
	// import { adjustStock , transferNature , transferStock , frostStock , unfreezeStock } from 'api/businessDealt/businessDealt';
	// import { uploadFile } from 'api/common';

	import Cookies from 'js-cookie';
	import { switchType } from '@/utils/validate';

	export default {
		//组件名
		name: 'share-change',
		//实例的数据对象
		data() {
			return {
				playervar:false,
				stockholdersAccount:'',
				submitBol:true,
				gqfjygh:gqfjygh,
				blueicon:blueicon,		
				title:'非交易过户',
				codeview:'',
				cueInfo:'',
				showpage:1,
				fileName:'',
				uploadStatus:'未上传',
				uploadName:'',
				varuploadStatus:'',
				varuploadName:"",
				fileIds:{},
				filePaths:{},
				varyinfo:{},//提交通信
				carinfo:{},//提交通信
				fileType:'',//传递文件类型
				itemList:[],
				Verifica:null,
				submitFetch:true,
				printData:{},
				orderId:'',//流水号

				fileres:''
			}
		},
		props: {

		},
		methods: {
			closepdf:function(){
	                this.isshowpdf=false
	          },
			routeHerf:function(){
				this.$router.push({ path: '/businessDealt', query: { businessType: this.businessTypeFun } });
			},
			apply(val,valMaxNum,str,index){
				// console.log(val)
				console.log(this.fileType)
				console.log(valMaxNum)

				var tips = str.substr(0,4);
				if (valMaxNum<=0) {
					$('#indedxModal').modal('show')
					this.codeview ="该产品无可用"+tips+"，请重新选择";
					this.showpage = 1
				}else if (val<=0) {
					console.log(val)
					console.log(valMaxNum)
					 $('#indedxModal').modal('show')
					 this.codeview = tips+'必须大于0，请重新输入'
					 this.showpage = 1
				}else if (val>valMaxNum) {
					 $('#indedxModal').modal('show')
					 this.codeview = str
					 this.showpage = 1;
				}else{
					// 非交易过户 流程
					if (!index) {
						this.showpage = 2
					}else{
						this.showpage = index;
						// 返回顶部
						document.body.scrollTop = 0;
					};
				};
			},
			printRecord(){
				if ((this.businessTypeFun=="份额性质变更")||(this.businessTypeFun=="份额调整")) {
					console.log('无凭证')
					$('#submitPop').modal('hide')
				}else if(this.businessTypeFun=="非交易过户"){//非交易过户 
					let transferMsg = {};
					console.log(this.varyinfo)
					transferMsg.orderId = this.orderId;
					transferMsg.fundCode = this.printData.fundCode;
					transferMsg.fundName = this.printData.fundName;
					transferMsg.outNum = this.printData.outNum;
					transferMsg.inAccount = this.printData.inAccount;
					transferMsg.operName = this.$store.getters.operName;
					transferMsg.inStockNatureName = this.varyinfo.fileType;

					transferMsg.outAccount = this.varyinfo.outAccount;
					transferMsg.outAccountName = this.varyinfo.outAccountName;
					transferMsg.outCertNo = this.varyinfo.outCertNo;
					transferMsg.outStockNatureName = this.varyinfo.outStockNatureName;
					transferMsg.inAccountName = this.varyinfo.inAccountName;
					transferMsg.inCertType = this.varyinfo.inCertType;
					console.log(transferMsg)
					ApiService.common.transferStock(transferMsg).then(response => {
						   $('#submitPop').modal('hide')
						   this.playervar = true;
						   $('#player').append('<embed width="100%" height="100%" name="plugin" id="plugin" src="' + window.URL.createObjectURL(response) + '" type="application/pdf" internalinstanceid="154">')
					})
				}else{
					//份额冻结 打印
					let msg = {};
					msg.orderId = this.orderId;
					msg.fundCode = this.printData.fundCode;
					msg.fundName = this.printData.fundName;
					msg.account = this.printData.account;
					msg.stockNatureName = this.carinfo.stockNatureName;
					msg.frostTypeName = this.carinfo.fundTypeName;
					msg.operName = this.$store.getters.operName;
					let serviceBase =	this.requestBase().requestName;
					if (serviceBase=='frostStock') {
						msg.frostNum = this.printData.frostNum;
					}else{
						msg.unfreezeNum = this.printData.frostNum;
						msg.frostTypeName = this.carinfo.fozenTypeName;
					};
					ApiService.common[serviceBase](msg).then(response => {
							//测试
							   $('#submitPop').modal('hide')
							   this.playervar = true;
							   $('#player').append('<embed width="100%" height="100%" name="plugin" id="plugin" src="' + window.URL.createObjectURL(response) + '"  type="application/pdf" internalinstanceid="154">')
							   // this.fileres =window.URL.createObjectURL(response) //待修复组件

					})
				};
				
			},
			// downLoadFun(){
			// 	// import {exportLoad} from 'utils/validate'; 组件内引入
			// 	// 操作元素 
			// 	const el = $('#a1');
			// 	// 参数配置
			// 	const msg = {};
			// 	msg.fileName = "a.zip";
			// 	msg.filePath = "group1/M00/00/52/DAEBUFnDoE8EAAAAAAAAAAAAAAA229.zip";

			// 	// 调用请求函数 
			// 	exportLoad(msg,el)//调用引入的函数
			// },
			downLoadFun(){
				const msg = {};
				msg.fileName = "a.zip";
				msg.filePath = "group1/M00/00/52/DAEBUFnDoE8EAAAAAAAAAAAAAAA229.zip";
				ApiService.common.downloadFile(msg).then(response => {})
			},
			uploadEnd(){
				// 上传结束
				console.log(this.itemList)
			},
			step(index){
				this.showpage = index;

				
				if (index == 2) {
					// 选中列表数据
					this.carinfo = this.$refs.carinfoData.carinfoData;
					// 填写表单数据
					this.varyinfo = this.$refs.varyinfoData.varyinfoData;
					// const valMinNum  = this.$store.getters.valMinNum;
						console.log(this.$refs.carinfoData)
					// 验证表格账户不能为空 且必须选中单选框
					if(!this.$refs.carinfoData.baseInfo.account){
						 $('#indedxModal').modal('show')
						this.codeview = '请输入登记账号'
						 this.showpage = 1
						 // 返回顶部
						 document.body.scrollTop = 0;
					}else if(!this.$refs.carinfoData.selectpro){
						$('#indedxModal').modal('show')
						// 截取字符串后两位 
						const str = this.businessTypeFun;
						this.codeview = '请选择需要'+str.substr(str.length-2,2)+'的产品'
						 this.showpage = 1
					}else {
						// 取出数据
						if (this.businessTypeFun=='份额调整') {
							var valMinNum = Number(this.varyinfo.adjustNum);
						}else{
							var valMinNum = Number(this.varyinfo.frostNum);
						};

						//   valMaxNum  fileType
						if ((this.businessTypeFun=='份额解押')||(this.businessTypeFun=='份额解冻')) {
							var  valMaxNum  = Number(this.carinfo.frozenNum);
							this.fileType = this.carinfo.fozenTypeName;
						}else{
							var  valMaxNum  = Number(this.carinfo.availStock);
							this.fileType = this.varyinfo.fileType;
						}
						var  str  = this.varyinfo.str;
						// 验证填写数据
						this.apply(valMinNum,valMaxNum,str,index)
					}
				}
			},
			changeState(data) { 
				// 组件上传的时候 弹窗显示的文件名和提示   
				this.fileName = data.fileName;
				this.cueInfo = data.cueInfo;

				this.uploadStatus='未上传'
				this.uploadName='';
			},
			showpageFun(data){
				// console.log(data)

				this.varyinfo = data.varyinfo;
				this.carinfo = data.carinfo;
				this.fileType = data.varyinfo.fileType;
				
				// 根据验证结果反馈下一步
				this.apply(Number(data.varyinfo.valMinNum),data.carinfo.valMaxNum,data.varyinfo.str)
				// 验证 过户后份额性质  过户类型  填写
			},
			triggerFile() {
			    $(".mui-uploadInput").trigger('click');
			},
			uploadFileFun(e){
				this.uploadStatus = '上传中';
			    const fileName = this.fileName;
			    const file =  e.target.files[0];
			    console.log(file)
			    console.log(file.name)
			     ApiService.files.uploadFile(file,'postfile').then(response => {
			        // uploadFile(data).then(response => {
			        let {
			             data,
			             message,
			             ret
			         } = response;
			        if (ret==0) {
			           //上传成功 赋值参数
			           this.fileIds[fileName] = data.fileId;
			           this.filePaths[fileName] = data.filePath; 
			          
			           this.uploadStatus = '已上传';//上传状态uploadStatus
			           this.uploadName = file.name;//上传文件名uploadName

			           const str = this.uploadName;
			           const beginName = str.substr(0,str.indexOf('.'));
			           const endName = str.substr(str.indexOf('.'),str.length);

			           const uploadAll = {};

			           uploadAll.beginName = beginName;
			           uploadAll.endName = endName;
			           uploadAll.fileName = this.fileName;
			           uploadAll.uploadStatus = this.uploadStatus;
			           uploadAll.uploadName = str;

			           // 添加数据
			           const list = this.itemList;
			           list.forEach((item) => {
			           	if (item.fileName==this.fileName) {
			           		// item = Object.assign(uploadAll,item);//浅拷贝  不添加 不响应
			           		this.$set(item,'beginName',uploadAll.beginName)
			           		this.$set(item,'endName',uploadAll.endName)
			           		this.$set(item,'uploadStatus',uploadAll.uploadStatus)
			           		this.$set(item,'uploadName',uploadAll.uploadName)
			           		// this.$set(item,'mustFile',item.mustFile)
			           	};
			           })
			           this.itemList = list;
			        };
			     })
			},
			requestBase(){
			    switch(this.businessTypeFun) {
			         case "非交易过户":
			           return {requestName:'transferStock',data:
			           		{outAccount:this.varyinfo.outAccount,transferType:Number(this.varyinfo.transferType),stockNatureBefore:Number(this.varyinfo.stockNatureBefore),outNum:Number(this.varyinfo.outNum),inAccount:this.varyinfo.inAccount,stockNatureAfter:Number(this.varyinfo.stockNatureAfter)}
			       		};
			           break;
			         case "份额性质变更":
			           return {requestName:'transferNature',data:
			           		{stockNatureBefore:Number(this.carinfo.stockNature),stockNatureAfter:Number(this.varyinfo.stockNatureAfter),frostNum:Number(this.varyinfo.frostNum)}
			       		}; 
			           break;
			         case "份额调整":
			           return {requestName:'adjustStock',data:
			           		{adjustType:Number(this.varyinfo.adjustType),stockNature:Number(this.carinfo.stockNature),adjustNum:Number(this.varyinfo.adjustNum)}
			       		}; 
			           break;
			         case "份额冻结":
			           return {requestName:'frostStock',data:
			           		{businessKey:'',frostType:Number(this.varyinfo.frostType),stockNature:Number(this.carinfo.stockNature),frostNum:Number(this.varyinfo.frostNum)}
			       		};
			           break;
			         case "份额解冻":
			           return {requestName:'unfreezeStock',data:
			           		{frostType:Number(this.carinfo.fozenType),stockNature:Number(this.carinfo.stockNature),frostNum:Number(this.varyinfo.frostNum),appsheetserialno:this.carinfo.frozenId}
			       		};
			           break;
			         case "份额解押":
			           return {requestName:'unfreezeStock',data:
			           		{frostType:Number(this.varyinfo.frostType),stockNature:Number(this.carinfo.stockNature),frostNum:Number(this.varyinfo.frostNum),appsheetserialno:this.carinfo.frozenId}};
			           break;
			         case "份额质押":
			           return {requestName:'frostStock',data:
			           		{businessKey:'',frostType:Number(this.varyinfo.frostType),stockNature:Number(this.carinfo.stockNature),frostNum:Number(this.varyinfo.frostNum)}
			           	};
			           break;
			         case "增资扩股":
			           return {requestName:''}; 
			           break;
			        } 
			},
			frostTypeFun(){
				// 解押 质押  frostType 枚举查询
			},
			printCompanyFun(){//打印凭证
				// 参数配置
				const msg = {};
				msg.account = this.printData.account;
				msg.fundCode = this.printData.fundCode;
				msg.fundName = this.printData.fundName;
				msg.fundAbbr = this.printData.fundAbbr;
				msg.fundType = this.printData.fundType;
				msg.isOriginal = this.printData.isOriginal;
				msg.totalShares = this.printData.totalShares;
				msg.registerShares = this.printData.registerShares;
				msg.faceValue = this.printData.faceValue;
				ApiService.common.company(msg).then(response => {
					console.log(response)
					//打印之后 弹窗关掉
					$('#submitPop').modal('hide')
				})
			},
			preSubFun(){
				const useData = this.requestBase().data;

				// 存储组件数据并赋值  --公共参数赋值 requestBase函数字段赋值
				// carinfo  fileinfo varyinfo

				// 配置公共参数
				useData.fundCode = this.carinfo.fundCode;//产品代码 ok
				useData.fundName = this.carinfo.fundName;//产品名称  ok
				useData.fundType = this.carinfo.fundType;//产品类型  暂无字段
				//测试
					useData.fundType = '1';
				//测试end
				useData.account = this.carinfo.account;//登记账户    ok
				useData.operId = this.$store.getters.operId;//操作员id
				useData.remark = this.varyinfo.remark;//备注

				// 文件集合 提交时采集页面数据
				useData.fileIds = this.fileIds;
				useData.filePaths = this.filePaths;

				console.log(useData)

				// 选择请求地址
					// 非交易过户 删除account字段
					if (this.businessTypeFun=='非交易过户') {
						delete useData.account;
					}; 
					// delete this.varyinfo.fileType;  //删除添加的用于文件类型展示 文件数据展示的字段 不需要删除 参数赋值
					const serviceBase =	this.requestBase().requestName;
					this.printData = useData;
					ApiService.BusinessDealt[serviceBase](useData).then(response => {
					// transferNature(useData).then(response => {
					   let {
					        data,
					        message,
					        ret
					    } = response;
					   if (ret==0) {
					   	this.orderId = data.orderId;
					   	$('#submitPop').modal('show')
					   	//成功后 隐藏掉提交按钮
					   	this.submitBol = false;
					   }else {
							this.$message.error(message);
						};
					})
			},
			verifyFile(){
				// 验证文件提交   提示未上传 
				const list = this.itemList;
				const type = this.fileType;
				var   itemAll = [];
				list.forEach((item) => {
					if (item.type==type||!item.type) {
						if (item.mustFile) {
							if (!item.uploadName) {
								$('#indedxModal').modal('show')
								this.codeview = '请上传必传文件'
								this.submitFetch = false;
							}
						}else{
							if (item.type=='02'&&item.type) {
								itemAll.push(item)
							};
						}
					};
				})
				if (itemAll[0]) {
					if (!itemAll[0].uploadName&&!itemAll[1].uploadName&&!itemAll[2].uploadName) {
						$('#indedxModal').modal('show')
						this.codeview = '请上传必传文件'
						this.submitFetch = false;
					};
				};
			},
			onsubmit(){
				this.submitFetch = true;
				this.verifyFile();
				if (this.submitFetch) {this.preSubFun()};
			}
		},
		computed: {
			businessTypeFun: function() {
				// let businessType = this.$store.getters.businessType;  //vuex无法刷新
				 let businessType = Cookies.get('businessType');//防止刷新
				return businessType;
			},
		},
		created() {
			this.itemList =  switchType(this.businessTypeFun);
		},
		mounted() {
			$('#transfer').mCustomScrollbar()

		},
		watch: {
			fileType:function(val,oldVal){
				if (val!==oldVal) {
					// 发生改变 清空文件
					this.fileIds={};
					this.filePaths={};

					// 文件名字要从对象删除
					const list = this.itemList;
					list.forEach((item) => {
						this.$set(item,'beginName',"")
						this.$set(item,'endName','')
						this.$set(item,'uploadName','')
					})
					this.itemList = list;
				};
			}
		},
		//组件
		components: {
			crfInfo,
			uploadlist,
			transfer,
			shareChange,
			shareFreeze,
			shareUnfreeze,
			sharePledge,
			shareUnpledge,
			shareAdjust,
			tips
			// increaseShare
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.prompt{
	    height: 85px;
	}
	.mui-margin-top{
		margin-top:15px
	}

	#gqfjyghModal .modal-body .tableDIV {
	    height: 450px;


	}
	#uploadModal .modal-body ul>li>div {
	   display:inline-block;
	}
	#uploadModal{
		font{
		  	float:right
		  }
	}
	  
	#gqfjyghModal .modal-body .tableDIV {
	    margin-top: 0px;
	}
	.gqfjyghDIV p:before {
	    left: 420px;
	}
	.gqfjyghDIV p:after {
	    right: 423px;
	}
	.gqfjygh-table-div .tb-next {
	    margin-top: 55px;
	}
	.bigModal .modal-dialog .modal-content .modal-body table{
		margin-bottom: 25px;
	}
	.tableDIV .table > thead > tr > th:last-child {
	    text-align: left;
	    padding-left: 30px;
	}
	.infotable .table > tbody > tr > td {
		text-align: left;
	    width: 25%;
	    padding: 0px 20px 0px 0px;
	    border: none;
	}
	.infotable .table > tbody > tr > td:first-child {
	    text-align: left;
	    padding: 0px 0px 0px 35px;
	}
	.infotable .table > tbody > tr > td:last-child {
	    text-align: left;
	    padding-left: 0px;
	}
	.tableDIV .dataRecord-step1-update > tbody > tr td input{
		width: 100%;
	}
	.tableDIV .dataRecord-step1-update > tbody > tr td textarea {
	    width: 100%;
	    height: 90px;
	    border: 1px solid #EBEBEB;
	    font-size: 14px;
	    color: #909090;
	    padding: 15px;
	}
	.tableDIV .dataRecord-step1-update > tbody > tr.num td input{
		text-align: right;
	}
	.mui-insetfocus .el-select {
	    width: 100%;
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