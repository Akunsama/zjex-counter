<template>
	<div>

		<div class="tableDIV gqfjygh-table-div" style="margin-bottom: 0;" v-show="showpage==1">
			<crf-info title="非交易过户"  ref='carinfoData'></crf-info>
			<div class="srf-info">
				<div class="title">
					受让方信息
					<!-- 测试选中数据{{transferData}} -->
				</div>
				<div class="tb-search">
					<input placeholder="请输入受让方登记账户" v-model='account' maxlength="20"/>
					<input placeholder="请输入受让方证件号" v-model='certNo' maxlength="20"/>
					<button class="btn-sm1" @click='fetchConsult'>查询</button>
				</div>
				<div class="tb-table">
					<div class="tb tb1">
						<header class="tb-title">
							<p><img :src="blueicon" />受让方基本信息 </p>
						</header>
						<table class="table odd">
							<tbody>
								<tr>
									<th>受让方名称</th>
									<th>受让方类型</th>
									<th>受让方状态</th>
									<th>证件类型</th>
									<th>证件号码</th>
								</tr>
								<tr class='mui-wrap'>
									<td><label>{{baseInfo.name}}</label></td>
									<td>{{baseInfo.custTypeName}}</td>
									<td>{{baseInfo.custStatus | custStatus}}</td>
									<td>{{baseInfo.certTypeName}}</td>
									<td>{{baseInfo.certNo}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="tb-next">
				<button @click="routeHerf">返回</button>
				<button @click="step(2)">下一步</button>
			</div>
		</div>

		<div class="tableDIV dataRecordTable infotable" v-show="showpage==2">
			<div class="dataRecord-step3">
				<table class="table dataRecord-step1-update mui-insetfocus"  >
                        <thead>
                            <tr>
                                <th colspan="4">过户信息
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
							<br />
                            <tr class="firsttr">
                                <td>过户份额</td>
                                <td class='mui-avolik' >
                                    <input  v-model.number="outNum" type='text' @change='commitVal(outNum)' maxlength="13"/>
                                </td>
                                <td class='mui-avolik'  style='padding-left: 15px;' >
                                	<input  readonly v-model='viewFronstNUm'/>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>过户后份额性质</td>
                                <td>
                                    <el-select  v-model="stockType" placeholder="">
									  <el-option
									    v-for="item in stockTypeData"
									    :key="item.subType"
									    :label="item.subTypeName"
									    :value="item.subType">
									  </el-option>
									</el-select>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>过户类型</td>
                                <td>
                                    <el-select  v-model="transferType" placeholder=""  >
									  <el-option
									    v-for="item in transferTypeData"
									    :key="item.subType"
									    :label="item.subTypeName"
									    :value="item.subType">
									  </el-option>
									</el-select>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>备注</td>
                                <td rowspan="2">
                                    <textarea v-model='remark' maxlength="50"></textarea>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
        		</table>
        		 <p class="btn-next">
                        <button @click="step(1)">返回</button>
                        <button id="ca-btn" @click="jumpFile">下一步</button>
                    </p>
			</div>
		</div>
		<div class="popModal modal fade smallModal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <tips :codeview='codeview'></tips>
		</div>
	</div>
</template>

<script>
	import blueicon from '@/assets/images/blue-icon.png'
	import gqfjygh from '@/assets/images/gqfjygh.png'

	import uploadlist from '@/components/dealtStep/uploadList.vue'
	import crfInfo from '@/components/dealtStep/crfInfo.vue'
	import ApiService from '@/services/API-servies'
	// import { queryCustAccount } from 'api/businessDealt/businessDealt';

	import { toDecimal2 , convertCurrency } from '@/utils/validate';
	import tips from '@/components/tips/tips.vue'

	export default {
		name: 'transfer',
		data() {
			return {
				//表单数据
				remark:'',
				outNum:'0.00',
				transferType:'',
				stockType:'',

				changeType:'',
				viewFronstNUm:'零',

				gqfjygh:gqfjygh,
				baseInfo:{},
				blueicon:blueicon,
				index:0,
				account:'',
				certNo:'',
				ifdo:false,
				showpage:1,
				granter:{
					account:'',
					certNo:'',
				},
				custmerno:{
					granter:'',
					Transferee:''
				},
				initList:{
					name:'-',
					custTypeName:'-',
					custStatus:'-',
					certTypeName:"-",
					custStatus:'-',
					certTypeName:'-'
				},
				list:[],
				grantIndex:null,
				stockTypeData:[
				  // {value:'0',label:'流通股'},
				  // {value:'32',label:'特别股'},
				  // {value:'2',label:'资格股'},
				  // {value:'11',label:'公众已托股'},
				  // {value:'12',label:'发起人股'},
				  // {value:'13',label:'限售股'},
				  // {value:'31',label:'定向股'},
				  // {value:'36',label:'其他'},
				  // {value:'41',label:'内部职工股'},
				  // {value:'33',label:'高管股'},
				  // {value:'43',label:'公众为托股'},
				  // {value:'44',label:'托管法人股'},
				  // {value:'45',label:'法人股'},
				  // {value:'46',label:'自然人股'}
				],
				transferTypeData:[
					// {value:'01',label:'协议转让过户'},
					// {value:'02',label:'财产继承过户'},
					// {value:'03',label:'司法裁决过户'},
					// {value:'04',label:'赠予过户'},
					// // {value:'05',label:'划拨过户'},
					// // {value:'06',label:'确权过户'},
					// // {value:'07',label:'股权收购过户'},
					// {value:'08',label:'离婚财产协议分割'},
					// // {value:'09',label:'其他过户'}
				],
				tipshow:false,
				codeview:''
				// btnType:'granter'//用于计算表格选中的类型
			}
		},
		props: {

		},
		computed: {
		
		},
		methods: {
			commitVal:function(value){
	          this.outNum  = toDecimal2(value)
	          this.viewFronstNUm = convertCurrency(toDecimal2(value))
	      	},
	      	queryEnumFun(msg,el){
	      		ApiService.common.queryEnum(msg).then(response => {
	      			this[el] = response.data.items;
	      			//el 删除后四位 
	      			const sel = el.substring(0,el.length-4);
	      			this[sel] = response.data.items[0].subType;
	      		})
	      	},
	      	transferTypeFun(){//非交易过户类型
	      		const data = {};
	      		data.source = 'PCC';
	      		data.type = '060008';
	      		const el = 'transferTypeData';
	      		this.queryEnumFun(data,el)
	      		// this.transferType = this.transferTypeData[0].subType;
	      	},
	      	stockTypeFun(){//股权类型
	      		const data = {};
	      		data.source = 'PCC';
	      		data.type = '060038';
	      		const el = 'stockTypeData';
	      		this.queryEnumFun(data,el)
	      		// this.stockType = this.stockTypeData[0].subType;
	      	},
			fetchBase(data){
				ApiService.BusinessDealt.queryCustAccount(data).then(response => {
				// queryCustAccount(data).then(response => {
				   let {
				        data,
				        message,
				        ret
				    } = response;
				   if (ret==0) {
				   	if (!data.account) {
				   		// 账户不存在
				   		 $('#myModal').modal('show')
				   		this.codeview = '未找到该账户，请重新输入';
				   	}else{
				   		this.baseInfo = data;
				   	};
				   };
				})
			},
			fetchConsult(){
				this.fetchBase({account:this.account,certNo:this.certNo});//基本信息获取
			},
			jumpFile(){
				const data = [];
				data.carinfo = {};
				data.carinfo.fundCode = this.$refs.carinfoData.carinfoData.fundCode;//产品代码
				data.carinfo.fundName = this.$refs.carinfoData.carinfoData.fundName;//产品名称 
				data.carinfo.fundType = this.$refs.carinfoData.carinfoData.fundType;//产品类型
				data.carinfo.operId = this.$store.getters.operId;//操作员id  未传 从登陆人过来

				data.varyinfo = {};
				data.varyinfo.remark = this.remark;//备注
				data.varyinfo.transferType=this.transferType;//过户类型
				data.varyinfo.stockNatureBefore=this.$refs.carinfoData.carinfoData.stockNature;
				data.varyinfo.outAccount=this.$refs.carinfoData.carinfoData.account;//过出登记账户
				data.varyinfo.outNum=this.outNum;;//过户数量
				data.varyinfo.inAccount=this.baseInfo.account;//过入登记账户
				data.varyinfo.stockNatureAfter=this.stockType;//过入份额性质  

				this.transferTypeData.forEach((item) => {
				  if (item.subType == this.transferType) {
				  	 data.varyinfo.fileType = item.subTypeName;//增加字段用于文件类型展示  
				  };
				})
				//打印补充字段
				data.varyinfo.inAccountName=this.baseInfo.name;//过入账户名
				data.varyinfo.inCertType=this.baseInfo.certNo;//过入证件号
				data.varyinfo.inStockNatureName=this.fileType;//过入份额性质
				data.varyinfo.outAccountName=this.$refs.carinfoData.baseInfo.name;//过出账户名
				data.varyinfo.outCertNo=this.$refs.carinfoData.baseInfo.certNo;//过出证件号
				data.varyinfo.outStockNatureName=this.$refs.carinfoData.carinfoData.stockNatureName;//过出份额性 

				data.varyinfo.valMinNum  = this.outNum;//增加字段用于做验证
				data.carinfo.valMaxNum  = this.$refs.carinfoData.carinfoData.availStock;//增加字段用于做验证
				data.varyinfo.str  = '过户份额大于可用份额，请重新输入';//增加字段用于做验证
				// data.varyinfo.changeType = this.changeType;
				// data.carinfo.account='';//后面会删除 下一步处理数据防止报错
				this.$emit('jumpFile',data)
			},
			step(index){
				if (index==2) {
					if(!this.$refs.carinfoData.baseInfo.account){
						 $('#myModal').modal('show')
						this.codeview = '请输入出让方登记账号'
					}else if(!this.baseInfo.account){
						 $('#myModal').modal('show')
						this.codeview = '请查询受让方登记信息'
					}else if(!this.$refs.carinfoData.selectpro){
						$('#myModal').modal('show')
						this.codeview = '请选择需要过户的产品'
					}else{
						this.showpage = index;
					};
				}else{
					this.showpage = index;
					document.body.scrollTop = 0;
				};
			},
			routeHerf(){
				this.$router.push({ path: '/businessDealt', query: { businessType: '非交易过户' } });
			}
		},
		created() {
			this.baseInfo = this.initList;
			this.transferTypeFun()
			this.stockTypeFun()
		},
		computed: {
			granterData: function() {
				let granterData = this.list[this.grantIndex]
				return granterData;
			},
			// transferData: function() {
			// 	let transferData = this.transTable[this.transIndex]
			// 	return transferData;
			// },
		},
		mounted() {
			// $('.max-4').mCustomScrollbar()
		},
		watch: {

		},
		filters: {  
		   typeFilterFun: function (value) { 
		     return value  
		   }  
		},
		components: {
			uploadlist,
			crfInfo,
			tips
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

		#gqfjyghModal .modal-body .tableDIV {
		    margin-top: 0px;
		}
		.bigModal .modal-dialog .modal-content .modal-body table{
			margin-bottom: 25px;
		}
		.tableDIV .table > thead > tr > th:last-child {
		    text-align: left;
		    padding-left: 30px;
		}
		.infotable .table > tbody > tr > td {
		    width: 25%;
		    padding: 0px 20px 0px 0px;
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
		.tableDIV .dataRecord-step1-update > tbody > tr.firsttr td input{
			text-align: right;
		}
		.mui-insetfocus .el-select {
		    width: 100%;
		}
		.data-table-no-border > thead > tr > th:first-child{
			padding-left: 50px;
		}
		.data-table-no-border > tbody > tr > td:first-child{
			padding-left: 50px;
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