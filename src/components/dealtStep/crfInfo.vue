<template>
	<div class="crf-info">
		<div class="title">
			{{title}}
		</div>
		<div class="tb-search" v-if='title=="非交易过户"'>
			<input placeholder="请输入出让方登记账号" v-model='account' maxlength="20"/>
			<button class="btn-sm1" @click='fetchList'>查询</button>
		</div>
		<div class="tb-search" v-else-if='title=="增资扩股"'>
			<input placeholder="请输入客户代码" v-model='custno' maxlength="20"/>
			<input placeholder="请输入证件号" v-model='certNo' maxlength="20"/>
			<button class="btn-sm1" @click='fetchcusList'>查询</button>
		</div>
		<div class="tb-search" v-else>
			<input placeholder="请输入持有方登记账号" v-model='account' maxlength="20"/>
			<input placeholder="请输入持有方证件号" v-model='certNo' maxlength="20"/>
			<button class="btn-sm1" @click='fetchList'>查询</button>
		</div>
		<div class="tb-table">
			<div class="tb tb1">
				<header class="tb-title">
					<p><img :src="blueicon" />{{title=='增资扩股'?"托管企业信息":'账户基本信息'}} </p>
				</header>
				<table class="table odd">
					<tbody>
						<tr>
							<th><label>{{(title=='非交易过户')?'出让方':(title=='增资扩股')?'客户':'持有方'}}名称</label></th>
							<th>{{(title=='非交易过户')?'出让方':(title=='增资扩股')?'客户':'持有方'}}类型</th>
							<th v-if='title=="非交易过户"'>出让方状态</th>
							<th>证件类型</th>
							<th>证件号码</th>
						</tr>
						<tr >
							<td><label>{{baseInfo.name}}</label></td>
							<td>{{baseInfo.custTypeName}}</td>
							<td v-if='title=="非交易过户"'>{{baseInfo.custStatus | custStatus}}</td>
							<td>{{baseInfo.certTypeName}}</td>
							<td>{{baseInfo.certNo}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="tb tb2">
				<header class="tb-title" >
					<p v-if="title=='份额解押'"><img :src="blueicon">已质押产品信息</p>
					<p v-else-if="title=='份额解冻'"><img :src="blueicon">已冻结产品信息</p>
					<p v-else-if="title=='增资扩股'"><img :src="blueicon">托管企业产品</p>
					<p v-else><img :src="blueicon">{{title=='非交易过户'?'出让方':'持有方'}}持仓 </p>
				</header>
				<table class="table odd">
					<tbody>
						<tr  v-if="title=='份额解押'">
							<th style="width: 75px">选择</th>
							<!-- <th style="width: 103px">序号</th> -->
							<th style='width: 235px;'>业务流水号</th>
							<!-- <th >产品简称</th> -->
							<th >质押类别</th>
							<th >质押份额</th>
							<th >质押日期</th>
							<th>股份性质</th>
							<th style="width: 140px;" class="text-center">详情</th>
						</tr>
						<tr  v-else-if="title=='份额解冻'">
							<th style="width: 75px">选择</th>
							<!-- <th style="width: 103px">序号</th> -->
							<th style='width: 235px;'>业务流水号</th>
							<!-- <th >产品简称</th> -->
							<th >冻结类别</th>
							<th >冻结份额</th>
							<th >冻结日期</th>
							<th>股份性质</th>
							<th style="width: 140px;" class="text-center">详情</th>
						</tr>
						<tr  v-else-if="title=='增资扩股'">
							<th style="width: 75px">选择</th>
							<th style="width: 103px">序号</th>
							<th >产品简称</th>
							<th >产品类型</th>
							<th >总股本</th>
							<th >所属板块</th>
							<th style="width: 140px;" class="text-center">详情</th>
						</tr>
						<tr v-else>
							<th style="width: 75px">选择</th>
							<th style="width: 103px">序号</th>
							<th style="width: 150px;">产品简称</th>
							<th style="width: 135px;">产品类型</th>
							<th style="width: 135px;" >份额数</th>
							<th >份额性质</th>
							<th style="width: 140px;" class="text-center">详情</th>
						</tr>
					</tbody>
				</table>
				<div class="max-4">
					<table class="table even">
						<tbody v-if="(title=='份额解押')||(title=='份额解冻')">
							<tr v-for="(item,index) in list" :class="{checked:index == checkindex}" v-if='list[0]'>
								<td style="width: 73px" class="text-center">
									<span @click="selected(index)"></span>
								</td>
								<!-- <td style="width: 100px" class='mui-zero'>{{index+1}}</td> -->
								<td >{{item.frozenId}}</td>
								<!-- <td >{{item.fundName}}</td> -->
								<td >{{item.fozenTypeName}}</td>
								<td >{{item.frozenNum}}</td>
								<td >{{item.forzenDate}}</td>
								<td>{{item.stockNatureName}}</td>
								<td style="width: 140px;"><button class="btn-sm2" data-toggle="modal"  @click='lookBtn(index)'>查看</button></td>
							</tr>
						</tbody>
						<tbody v-else-if="title=='增资扩股'">
							<tr v-for="(item,index) in list" :class="{checked:index == checkindex}" v-if='list[0]'>
								<td style="width: 73px" class="text-center">
									<span @click="selected(index)"></span>
								</td>
								<td style="width: 100px" class='mui-zero'>{{index+1}}</td>
								<td style="width: 145px;">{{item.fundName}}</td>
								<td style="width: 130px;">{{item.fundType}}</td>
								<td style="width: 130px;" >{{item.totalShares}}</td>
								<td >{{item.fundClass}}</td>
								<td style="width: 135px;"><button class="btn-sm2" data-toggle="modal"  @click='lookBtn(index)'>查看</button></td>
							</tr>
						</tbody>
						<tbody v-else>
							<tr v-for="(item,index) in list" :class="{checked:index == checkindex}" v-if='list[0]'>
								<td style="width: 73px" class="text-center">
									<span @click="selected(index)"></span>
								</td>
								<td style="width: 100px" class='mui-zero'>{{index+1}}</td>
								<td style="width: 145px;">{{item.fundName}}</td>
								<td style="width: 130px;">{{item.fundType}}</td>
								<td style="width: 130px;" >{{item.availStock}}</td>
								<td >{{item.stockNatureName}}</td>
								<td style="width: 135px;"><button class="btn-sm2" data-toggle="modal"  @click='lookBtn(index)'>查看</button></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		
		<!-- 弹框 （Modal） -->
		<div class="popModal modal fade bigModal" id="gqfjyghModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" v-if='list[0]'>
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">产品信息详情</h4>
					</div>
					<div class="modal-body">
						<div class="tableDIV">
							<p>产品代码：{{list[index].fundCode}}-{{list[index].fundName}}</p>
							<table class="table">
								<tbody v-if="title=='增资扩股'">
									<tr>
										<td>登记日期</td>
										<td>{{list[index].registerDate}} </td>
									</tr>
									<tr>
										<td>登记股本</td>
										<td>{{list[index].registerShares}} </td>
									</tr>
									<tr>
										<td>面值</td>
										<td>{{list[index].faceValue}} </td>
									</tr>
								</tbody>
								<tbody v-else-if="(title=='份额解押')||(title=='份额解冻')">
									<tr>
										<td >业务流水</td>
										<td>{{list[index].frozenId}}</td>
									</tr>
									<tr>
										<td>账户名称</td>
										<td>{{list[index].accountName}} </td>
									</tr>
									<tr>
										<td>登记账户</td>
										<td>{{list[index].account}} </td>
									</tr>
									<tr>
										<td>产品简称</td>
										<td>{{list[index].fundName}} </td>
									</tr>
								</tbody>
								<tbody v-else>
									<tr>
										<td>产品类型</td>
										<td>{{list[index].fundType}}</td>
									</tr>
									<tr>
										<td>余额总数</td>
										<td>{{list[index].stockBalance}}</td>
									</tr>
									<tr>
										<td>产品份额可用数</td>
										<td>{{list[index].availStock}}</td>
									</tr>
									<tr>
										<td>已冻结份额数</td>
										<td>{{Number(list[index].frozenStock)+Number(list[index].excFrozenStock)}}</td>
									</tr>
									<tr>
										<td>限售份额数</td>
										<td>{{list[index].limitStock}}</td>
									</tr>
									<tr>
										<td>份额质押数</td>
										<td>{{list[index].pledgeStock}}</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="if-do">
							<span @click='ifdoFun'  :class="{checked:ifdo}"></span>选择{{action}}该产品
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save" id="ca-complete" data-dismiss="modal">完成</button>
						<button type="button" class="btn-close" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
		 <div class="popModal modal fade smallModal" id="crfInfoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <tips :codeview='codeview'></tips>
		</div>
	</div>
</template>

<script>
	import blueicon from '@/assets/images/blue-icon.png'
	import gqfjygh from '@/assets/images/gqfjygh.png'
	import tips from '@/components/tips/tips.vue'

	import ApiService from '@/services/API-servies'
	// import { queryCustAccount ,  queryCustStock , queryForstStream , queryProductInfo} from 'api/businessDealt/businessDealt';
	
	export default {
		name: 'crf-info',
		data() {
			return {
				gqfjygh:gqfjygh,
				blueicon:blueicon,
				checkindex:null,
				index:0,
				account:'',
				// account:'0232926182',//测试
				certNo:'',
				ifdo:false,
				baseInfo:{},
				codeview:'',
				total:0,
				custno:"",
				// custno:'000232926182',//测试
				initList:[
				{
					frozenId:'-',
					fundName:'-',
					fundType:'-',
					availStock:'-',
					stockNatureName:'-',
					stockNature:'-',
					fundCode:'-',
					frozenStock:0,
					pledgeStock:0,
					excFrozenStock:0,
					fozenTypeName:'-',
					forzenDate:'-',
					frozenNum:'-',
					account:'-',
					certNo:'-',
					name:'-',
					certTypeName:'-',
					custTypeName:'-',
					initData:true
				}],
				list:[],
				selectpro:false,
				// custmerno:'000232924279',//测试
				custmerno:'',
				increaseAccount:'',
				stockholdersAccount:''
			}
		},
		props:{
			title: {
                type: String,
                default: '',
            },
    	},
		methods: {
			lookBtn(index){
				this.index = index;
				this.ifdo = false;
				if (this.total>0) {//如果有数据 可以查看
					$('#gqfjyghModal').modal('show')
				};
			},
			ifdoFun(){
				this.ifdo = !this.ifdo;
				this.checkindex = this.index
			},
			selected(index){
				console.log(this.list[index].initData)
				if (!this.list[index].initData) {
					this.selectpro = true;
					this.checkindex = index
				}
				
				// 传递 stockNatureName
				if (!this.list[index].totalShares) {
					var  stockNatureName = this.list[index].stockNatureName;
				}else{
					var  stockNatureName = this.list[index].totalShares;
				};
				this.$store.commit('SET_STOCKNATURENAME', stockNatureName);
			},
			fetchBase(){
				const data = {};
				if (this.title=='非交易过户') {
					data.account = this.account;
				}else if(this.title=='增资扩股'){
					data.custno = this.custno;
					data.certNo = this.certNo;
				}else{
					data.account = this.account;
					data.certNo = this.certNo;
				};
				console.log(data)
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
					   		 $('#crfInfoModal').modal('show')
					   		this.codeview = '未找到该账户，请重新输入';
					   	}else{
					   		this.baseInfo = data;
					   		this.increaseAccount = data.account ;
					   	};
				   }else{
				   	// 账户不存在
				   	 $('#crfInfoModal').modal('show')
				   	 this.codeview = '未找到该账户，请重新输入';
				   }
				})
			},
			fetchHave(){
					const listData = {};
					listData.userId = '';
					listData.account = this.account;
					listData.pageSize = 100;
					listData.pageNumber = 1;
					//解押 
					if (this.title=='份额解冻') {
						ApiService.BusinessDealt.queryForstStream(listData).then(response => {
						// queryForstStream(listData).then(response => {
						   let {
						        data,
						        message,
						        ret
						    } = response;
						    if (ret==0) {
						    	this.total = data.total;
						    	if (data.total==0) {
						    		this.list = this.initList;
						    	}else{
						    		this.list = data.items;
						    	};
						   }
						})
					}else if(this.title=='份额解押'){
						listData.frozenType ='4';
						ApiService.BusinessDealt.queryForstStream(listData).then(response => {
						// queryForstStream(listData).then(response => {
						   let {
						        data,
						        message,
						        ret
						    } = response;
						   if (ret==0) {
						    	this.total = data.total;
						    	if (data.total==0) {
						    		this.list = this.initList;
						    	}else{
						    		this.list = data.items;
						    	};
						   }
						})
					}else{
						ApiService.BusinessDealt.queryCustStock(listData).then(response => {
						// queryCustStock(listData).then(response => {
						   let {
						        data,
						        message,
						        ret
						    } = response;
						   if (ret==0) {
						    	this.total = data.total;
						    	if (data.total==0) {
						    		this.list = this.initList;
						    	}else{
						    		this.list = data.items;
						    	};
						   }
						})
					};
			},
			fetchList(){
				this.fetchBase();//基本信息
				this.fetchHave();//表格列表
			},
			fetchcusList(){
				//基本信息获取
				this.fetchBase();
				// 增资扩股查询 传参 
				const data = {};
				data.account = this.increaseAccount;
				data.pageSize = 100;
				data.pageNumber = 1;

				if (!this.increaseAccount) {
					ApiService.BusinessDealt.queryProductInfo(data).then(response => {
					// queryProductInfo({account:this.increaseAccount,pageSize:1,pageNumber:1}).then(response => {
					   let {
					        data,
					        message,
					        ret
					    } = response;
					   if (ret==0) {
					   	console.log(data.items)
					    	if (data.total>0) {
					    		this.list = data.items;
					    	}else{
					    		console.log('暂无数据')
					    		this.list = this.initList;
					    	};
					   }else{
					   	this.list = this.initList;
					   };
					})
				}
			}
		},
		created(){
			this.list = this.initList;
			this.baseInfo = this.initList[0];

			// 股权登记跳转过来
			if (this.$route.query.list) {
				this.account = this.$route.query.list.stockholdersAccount;
				this.certNo = this.$route.query.list.certNo;
				this.fetchList()
			};
		},
		computed: {
			carinfoData: function() {
				let carinfoData = this.list[this.checkindex]
					// carinfoData.account = this.account;
				return carinfoData;
			},
			action:function(){
				const str = this.title;
				var action = str.substr(str.length-2,2);
				return action;
			}
		},
		mounted() {
			$(".max-4").mCustomScrollbar({
				 advanced:{ 
				    updateOnContentResize:true,
				},
				set_height:'225px',
                scrollButtons:{
                    enable:false,
                    scrollType:"continuous",
                    scrollSpeed:800,
                    scrollAmount:40
                }
			});
		},
		components: {
			tips
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
		#gqfjyghModal .modal-body .tableDIV {
		    height: 450px;
		}
		.mui-zero{
			text-align:center;
			padding-left:0!important;
		}
</style>