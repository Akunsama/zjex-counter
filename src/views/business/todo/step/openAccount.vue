<template>
	<div>
		<div class="gqfjyghDIV registrationDIV">
			<p>股权初始登记</p>
			<img :src="gqfjygh" class="gqfjyghImg" />
		</div>

		<div class="tableDIV gqfjygh-table-div registration-table">
			<div class="crf-info">
				<div class="title">
					股权初始登记  
				</div>
				<div class="tb-table" style="padding-top: 0;">
					<div class="entTypeDIV">
						<ul class="mui-loadBox">
							<li @click="datavalidate()">数据验证
							</li>
							<li @click="accountOpen">股东开户
							</li>
							<li @click="resultSearch">结果查询
							</li>
							<li @click="datadownload">下载
								<img :src="download" />
							</li>
							<li @click="triggerFile()">上传
								<img :src="upload" />
							</li>
							<form enctype='multipart/form-data'>
				                <input name="file" id="otherfile" class="mui-uploadInput" type="file" @change='uploadFileFun($event)'>
				            </form>
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
								<tr v-for="(item,index) in list">
									<td>{{index}}</td>
									<td>{{item.returnCode}}</td>
									<td>{{item.errorDetail}}</td>
									<td>{{item.name}}</td>
									<td>{{item.abbr}}</td>
									<td>{{item.natureoFinvestor}}</td>
									<td>{{item.individualOrInstitution}}</td>
									<td class="operationTD">
										<div class="operation">
											<font @click="look(index)">查看</font>
										</div>
									</td>
								</tr>
							</tbody>

						</table>
						<div class="pagination">
							<div class="paginationcontent">
								<div class="previousAllPage" @click="previousAllPage"></div>
								<div class="previousPage" @click="previousPage"></div>
								<span style="font-size:12px;vertical-align: top;">{{currectpage}} of {{totalpage}}</span>
								<div class="nextPage" @click="nextPage"></div>
								<div class="nextAllPage" @click="nextAllPage"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="tb-next">
				<button @click="back">返回</button>
			</div>
		</div>

		<!-- 弹框 （Modal） -->
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
										<td>证件类型</td>
										<td>{{handlerow.certType}}</td>
									</tr>
									<tr>
										<td>证件号码</td>
										<td>{{handlerow.certNo}}</td>
									</tr>
									<tr>
										<td>份额性质</td>
										<td>{{handlerow.stockNature}}</td>
									</tr>
									<tr>
										<td>产品数量</td>
										<td>{{handlerow.num}}</td>
									</tr>
									<tr>
										<td>电话</td>
										<td>{{handlerow.tel}}</td>
									</tr>
									<tr>
										<td>手机</td>
										<td>{{handlerow.mobile}}</td>
									</tr>
									<tr>
										<td>联系地址</td>
										<td>{{handlerow.contactAddress}}</td>
									</tr>
								</tbody>
							</table>
						</div>
						<!--<div class="modalbutton" v-show="!nextpage"><button>下载</button></div>-->
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save" id="ca-complete" data-dismiss="modal">确认</button>
						<button type="button" class="btn-close" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>

		<div class="popModal modal fade smallModal" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">提示</h4>
					</div>
					<div class="modal-body one-row" style="padding-top: 80px;">
						{{tiptext}}
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save btn-review" data-dismiss="modal">确认</button>
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

	export default {
		//组件名
		name: 'open-account',
		//实例的数据对象
		data() {
			return {
				paths:'',
				status: 1,
				upload: upload,
				download: download,
				blueIcon: blueIcon,
				gqfjygh: gqfjygh,
				currectpage: 0,
				totalpage: 0,
				handlerow:{},//处理行
				filepath:'',
				localFilePath:'',
				batchno:'',//批次号
				fundCode:'',//产品代码
				branchcode:'',//网点代码
				querydate:'',
				tiptext:'',
				//附件信息
				list:[{
					returnCode:'',//0000成功其他失败
					errorDetail:'',
					name:'',
					abbr:'',
					individualOrInstitution:'',
					natureoFinvestor:'',
					certType:'',
					certNo:'',
					stockNature:'',
					num:'',
					mobile:'',
					tel:'',
					contactAddress:'',
				}],
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
				},

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
			look(index){
				$("#gqfjyghModal").modal("show")
				this.handlerow = this.list[index]
			},
			back() {
				let querys = {
					'type': this.$route.query.type,
					'status': 2,
					'taskStatus': 8,
					'processDefinitionKey': localStorage.processDefinitionKey,
					'businessKey': localStorage.businessKey
				}
				this.$router.push({
					path: '/todo/audit',
					query: querys
				});
			},
			search(currectpage) {
				if(!currectpage){
					this.currectpage = 1;
				}
				ApiService.Registrationmanagement.queryInStockholders({
					batchno: this.batchno,//批次号
					isbefore: 0,//0导入后查询1处理后查询
					pageSize: 15,
					pageNo: this.currectpage,
				}).then(res => {
					let {
						ret,
						data,
						message
					} = res;
					if(ret == 0) {
						//成功
						this.totalpage = Math.ceil(data.total / 15)
						this.list=data.items;
					}
				})
			},
			//验证
			datavalidate() {
				ApiService.Registrationmanagement.inStockholders({
					filepath: this.localFilePath,//文件路径
					fundcode: this.fundCode,//产品代码
//					branchcode: this.branchcode,//网点代码
					branchcode: 1110,//网点代码
					operid: this.$store.getters.operId,//操作员内码
				}).then(res => {
					let {
						ret,
						data,
						message
					} = res;
					if(ret == 0) {
						//成功
						this.batchno = data.batchno;
						this.search()
					}
				})
			},
			//开户
			accountOpen() {
				ApiService.Registrationmanagement.processStockholders({
					batchno: this.batchno,//批次号
					branchcode: this.branchcode,//网点代码
					fundcode: this.fundCode,//产品代码
					operid: this.$store.getters.operId,//操作员代码
				}).then(res => {
					let {
						ret,
						message,
						data
					} = res;
					if(ret == 0) {
						//成功
						this.data = data;
						
					}
				})
			},
			resultSearch(){
				ApiService.Registrationmanagement.queryInStockholders({
					batchno: this.batchno,//批次号
					isbefore: 1,//0导入后查询1处理后查询
					pageSize: 15,
					pageNo: 1,
				}).then(res => {
					let {
						ret,
						data,
						message
					} = res;
					if(ret == 0) {
						//成功
						$("#myModal2").modal("show");
						this.tiptext = '查询成功';
						this.totalpage = Math.ceil(data.total / 15)
						this.list=data.items;
						this.currectpage = 1;
					}else{
						$("#myModal2").modal("show");
						this.tiptext = message;
					}
				})
			},
			//下载文件
			datadownload() {
				ApiService.common.downloadFile({
					fileName:'股东清册.csv',
					filePath:this.filepath
				}).then(response => {})
				
//				ApiService.Registrationmanagement.outStockholders({
//					fundcode: this.fundCode,
//					querydate: '',
//					batchno: this.batchno,
//				}).then(res => {
//					if(res.ret == 0) {
//						//成功
//					}
//				})
		},
			//上传文件
			triggerFile() {
	            $("#otherfile").trigger('click');
	        },
			uploadFileFun(e){
				const fileName = '股东清册';
	            const file =  e.target.files[0];
	            ApiService.files.uploadFile(file,'postfile').then(response => {
	                let {
	                     data,
	                     message,
	                     ret
	                 } = response;
	                if (ret==0) {
	                	//上传成功 赋值参数
						var localFilePath1 = JSON.stringify(data);
						this.localFilePath = JSON.parse(localFilePath1.replace(new RegExp("\\\\", "gm"), "\\\\")).localFilePath;   	
						this.filepath = data.filepath;
						$("#myModal2").modal("show");
						this.tiptext = "文件上传成功";
	                };
	                e.target.parentNode.reset()
	            })
			},
		},
		created() {
			this.filepath = this.$route.query.filepath;
			this.localFilePath = this.$route.query.localFilePath;
			this.fundCode = this.$route.query.fundCode;
			this.branchcode = this.$route.query.branchcode;
			this.datavalidate()
		},
		mounted() {},
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
	
	.gqfjygh-table-div .nopadding>tbody>tr>td em {
		font-style: normal;
		display: inline-block;
	}
	
	.gqfjygh-table-div .nopadding>tbody>tr>td i {
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
	
	.modal-dialog .modal-content .modal-body.two-row {
		height: 185px;
	}
	
	.modal-dialog .modal-content .modal-body.two-row p {
		margin-top: 30px;
	}
	
	.modal-dialog .modal-content .modal-body.two-row span {
		color: #2EBAB4;
	}
	
	.mui-loadBox {
		position: relative;
		form {
			position: absolute;
			right: 0px;
			top: 0px;
			width: 50px;
			height: 25px;
			overflow: hidden;
			z-index: -1;
		}
		.mui-uploadInput {
			font-family: Arial;
			font-size: 118px;
			margin: 0px;
			padding: 0px;
			cursor: pointer;
			visibility: hidden;
			height: 100%;
			filter: alpha(opacity=0);
			-moz-opacity: 0;
			outline: none;
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