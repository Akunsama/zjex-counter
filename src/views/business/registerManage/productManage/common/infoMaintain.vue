<template>
	<div>

		<div class="dataRecordDIV">
			<ul>
				<li :class="{active:showpage>=1}">
					<i></i>
					<p>持股信息</p>
				</li>
				<li :class="{active:showpage>=2}">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<i></i>
					<p>资料打印上传</p>
				</li>
				<li :class="{active:showpage>=3}">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<i></i>
					<p>完成</p>
				</li>
			</ul>
		</div>

		<div class="tableDIV gqfjygh-table-div" v-show="showpage==1">
			<shareholder-register :tbtitle='tbtitle' v-bind:funCode='funCode' v-on:batchno="getbatchno" v-on:paper="getpaper" v-on:importChu="importChu1" v-on:paper1="getpaper1"></shareholder-register>

			<p class="btn-next no-bottom-border">
				<button @click="returnpage">返回</button>
				<button @click="confirm">下一步</button>
			</p>
		</div>
		<div class="dataRecord-step3 tableDIV" v-show="showpage==2">

			<table class="table data-table-no-border mui-padding-table">
				<thead>
					<tr>
						<th>影印件上传</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>企业基本情况登记表 （加盖企业公章）</td>
						<td>
							<button class="btn-sm2">下载</button>
						</td>
					</tr>

					<tr>
						<td>股东股权登记名册（加盖企业公章）</td>
						<td>
							<button class="btn-sm2">下载</button>
						</td>
					</tr>

					<tr>
						<td>股权登记法人授权委托书（加盖企业公章）</td>
						<td>
							<span>查看文件：
								<em>
									<i>材料</i>.doc</em>
							</span>
							<button class="btn-sm2 upload-pop" @click="upload(index=1)">上传</button>
						</td>
					</tr>
					<tr>
						<td>股权登记承诺书（加盖企业公章）</td>
						<td>
							<span>查看文件：
								<em>
									<i>材料</i>.doc</em>
							</span>
							<button class="btn-sm2 upload-pop" @click="upload(index=2)">上传</button>
						</td>
					</tr>
					<tr>
						<td>股权登记托管协议书（加盖企业公章）</td>
						<td>
							<span>查看文件：
								<em>
									<i>材料</i>.doc</em>
							</span>
							<button class="btn-sm2 upload-pop" @click="upload(index=3)">上传</button>
						</td>
					</tr>
					<tr>
						<td>授权人及受托人身份证正反面复印件（加盖企业公章）</td>
						<td>
							<span>查看文件：
								<em>
									<i>材料</i>.doc</em>
							</span>
							<button class="btn-sm2 upload-pop" @click="upload(index=4)">上传</button>
						</td>
					</tr>
					<tr>
						<td>企业章程（市场监督管理局（工商部门）盖章）</td>
						<td>
							<span>查看文件：
								<em>
									<i>材料</i>.doc</em>
							</span>
							<button class="btn-sm2 upload-pop" @click="upload(index=5)">上传</button>
						</td>
					</tr>
					<tr>
						<td>工商部门出具的基本信息查询单（含股东及高管信息）</td>
						<td>
							<span>查看文件：
								<em>
									<i>材料</i>.doc</em>
							</span>
							<button class="btn-sm2 upload-pop" @click="upload(index=6)">上传</button>
						</td>
					</tr>
				</tbody>
			</table>
			<p class="btn-next">
				<button @click='back'>返回</button>
				<button @click="cabtn" id="ca-btn">提交</button>
			</p>
		</div>
		<!-- 弹框 （Modal） -->
		<div class="popModal modal fade bigModal" id="gqfjyghModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">流水备注</h4>
					</div>
					<div class="modal-body">
						<div class="tableDIV">
							<p>查看详情</p>
							<table class="table">
								<tbody>
									<tr>
										<td>证件类型</td>
										<td>类型</td>
									</tr>
									<tr>
										<td>证件号码</td>
										<td>651646161648154</td>
									</tr>
									<tr>
										<td>份额性质</td>
										<td>性质</td>
									</tr>
									<tr>
										<td>产品数量</td>
										<td>330</td>
									</tr>
									<tr>
										<td>电话</td>
										<td>16849188168</td>
									</tr>
									<tr>
										<td>手机</td>
										<td>185616611686</td>
									</tr>
									<tr>
										<td>联系地址</td>
										<td>上海市</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save" data-dismiss="modal">确认</button>
						<button type="button" class="btn-close" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
		<div class="popModal modal fade smallModal" id="uploadModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
								<button class="stencil">
									<i class="fa fa-fw fa-download"></i>
								</button>
							</li>
							<li>
								<span>文件上传</span>
								<button class="btn-sm1 upload fa fa-fw fa-upload">
									<el-upload class="change" action="http://192.168.20.31:8081/business/uploadFile" name="file" :on-success="seccessRes">
										<el-button class="change" size="small" type="primary"></el-button>
										<!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
									</el-upload>
								</button>
							</li>
						</ul>
						<div class="prompt">
							<p style="display:none">提示：股东身份材料为股东身份证正反面复印件，以（身份证号.jpg)命名单个文件。上传格式为PDF或zip、rar，以企业全称命名(如：浙江股权交易中心有限司.zip)。</p>
						</div>
						<p>状态：已上传
							<font>文件名.zip</font>
						</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save" data-dismiss="modal">确认</button>
						<button type="button" class="btn-close" data-dismiss="modal">关闭</button>
					</div>
				</div>
			</div>
		</div>
		<!-- 企业登记成功失败等系列弹窗 -->
		<div class="popModal modal fade smallModal" id="myself-pop6" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<!-- 企业登记失败 -->
				<div class="modal-content" id="caed">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">企业登记</h4>
					</div>
					<div type="height:185px!important,line-height:150px!important" class="modal-myself" v-if="!popResult1">
						<p>依次点击【处理导入数据】=>>【查询处理导入数据】后方可进行下一步</p>
					</div>
					<div type="height:185px!important,line-height:150px!important" class="modal-myself" v-else>
						<p>{{popResult1}}</p>

					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save" id="ca-finished" data-dismiss="modal">确认</button>
					</div>
				</div>
			</div>
		</div>

		<!-- 企业登记没有上传，或者失败弹窗 -->
		<div class="popModal modal fade smallModal" id="myself-pop7" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<!-- 企业登记失败 -->
				<div class="modal-content" id="caed">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">企业登记</h4>
					</div>
					<div type="height:185px!important,line-height:150px!important" class="modal-myself">
						<p>文件上传失败</p>

					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save" id="ca-finished" data-dismiss="modal">确认</button>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
import blueicon from '@/assets/images/blue-icon.png'
import leftpng from '@/assets/images/left.png'
import uploadpng from '@/assets/images/upload.png'
import ApiService from '@/services/API-servies'
import _ from 'lodash'
import shareholderRegister from '@/components/ShareholderRegister/ShareholderRegister.vue'

export default {
	name: "info-maintain",
	data() {
		return {
			import1one: {},
			batchno: '',
			funCode: '',
			blueicon: blueicon,
			leftpng: leftpng,
			uploadpng: uploadpng,
			state: '',
			prom: 0,
			showpage: 1,
			listone: [],
			index1: '',
			list: [{
				result: '成功',
				tips: '123'
			}, {
				result: '成功',
				tips: '123'
			}, {
				result: '成功',
				tips: '123'
			},],
			tbtitle: '数据详情',


			attorney: '',
			undertaking: '',
			custodyAgreement: '',
			idCard: '',
			bylaw: '',
			infoQuerySheet: '',

			paperone: {},
			papertow: '',
			batchno: '',
			popResult1: ''

		}
	},
	methods: {
		importChu1(importChu) {
			this.import1one = importChu
			console.log(this.import1one, '我爱你1111')
		},
		getbatchno(batchnone) {
			this.batchno = batchnone
			console.log(this.batchno, '我爱你')
		},

		getpaper(paper) {
			this.paperone = paper
			console.log(this.paperone, '我爱你')
		},
		getpaper1(paper1) {
			this.papertow = paper1
			console.log(this.papertow, '我爱你')
		},

		handle() {
			//      	this.showpage=2
		},
		returnpage() {
			this.$router.go(-1)
		},
		seccessRes(response, file) {
			var localFilePath1 = JSON.stringify(JSON.parse(response.msg).data)
			this.filePath = JSON.parse(localFilePath1.replace(new RegExp("\\\\", "gm"), "\\\\")).filePath
			if (this.index == 1) {
				this.attorney = this.filePath
				console.log(this.attorney, '09091')
			} else if (this.index == 2) {
				this.undertaking = this.filePath
				console.log(this.undertaking, '09092')
			} else if (this.index == 3) {
				this.custodyAgreement = this.filePath
				console.log(this.custodyAgreement, '09093')
			} else if (this.index == 4) {
				this.idCard = this.filePath
				console.log(this.idCard, '09094')
			} else if (this.index == 5) {
				this.bylaw = this.filePath
				console.log(this.bylaw, '09095')
			} else if (this.index == 6) {
				this.infoQuerySheet = this.filePath
				console.log(this.infoQuerySheet, '09096')
			}

		},
		upload() {
			$('#uploadModal').modal('show');
			$('#uploadModal .prompt p').hide();
			$('.stencil').removeClass("grey");

		},
		upload1() {
			$('#uploadModal').modal('show');
			$('#uploadModal .prompt p').show();
			$('.stencil').addClass("grey");
		},
		cabtn() {
			$('#caModal').modal('show');

			this.attachment = '{"attorney":' + this.attorney + ',"undertaking":' + this.undertaking + ',"custodyAgreement":' + this.custodyAgreement + ',"idCard":' + this.idCard + ',"bylaw":' + this.bylaw + ',"infoQuerySheet":' + this.infoQuerySheet + '}'
			console.log(typeof (this.attachment), 'ooooooo')
			ApiService.Registrationmanagement.saveRiskFile({
				seq: "Math.random()*100000000000000000000",
				businessKey: '',
				orderId: this.funCode + this.batchno,
				businessName: '企业信息修改',
				attachment: this.attachment,
				timestamp: 0,
			}).then((res) => {

			})
		},
		confirm() {
			console.log(this.paperone.ret, '00000000')
			if (this.papertow == '') {
				$('#myself-pop7').modal('show');
				this.showpage == 1
				return
			}

			if (this.import1one.ret == 0 || this.paperone.ret == 0) {
				this.showpage = 2
			}
			else {
				if (this.import1one.ret !== 0) {
					$('#myself-pop6').modal('show');
					this.popResult1 = this.import1one.message
					this.showpage == 1

				} else if (this.paperone.ret !== 0) {
					$('#myself-pop6').modal('show');
					this.popResult1 = this.paperone.message
					this.showpage == 1
					return
				}

			}
		},
		back() {
			this.showpage = 1
		},
		upload() {
			$("#uploadModal").modal("show")
		}

	},
	created() {
		this.listone = this.$route.query.list
		this.index1 = this.$route.query.index
		this.funCode = this.listone[this.index1].fundCode

	},
	components: {
		shareholderRegister
	}
}
</script>
<style scoped>
.modal-myself {
	height: 185px;
	line-height: 155px;
	text-align: center;
}

.upload {
	position: relative;
	/* padding: 4px 10px;
    height: 35px;
    line-height: 35px;
    
    border: 1px solid #999;
    text-decoration: none;
    color: #666; */
}

.change {
	position: absolute;
	overflow: hidden;
	width: 130px;
	height: 35px;
	right: 0;
	top: 0;
	opacity: 0;
}

.contentDIV {
	width: 1000px;
	padding: 0px !important;
}

.dataRecordDIV {
	height: 230px;
	background: url(images/request_bg.png) no-repeat;
	background-size: 100%, 100%;
	position: relative;
	padding-top: 105px;
	z-index: -2;
}

.dataRecordDIV:before {
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0px;
	background: rgba(61, 62, 63, .85);
	z-index: -1;
}

.dataRecordDIV ul {
	padding: 0px;
	margin: 0px;
	z-index: 0;
	text-align: center;
}

.dataRecordDIV ul li {
	display: inline-block;
	position: relative;
}

.tableDIV .table>tbody>tr>td span em {
	width: 60px!important;
}

.dataRecordDIV ul li i {
	background: url(images/dot_grey.png) no-repeat center;
	width: 20px;
	height: 20px;
	display: inline-block;
	vertical-align: middle;
	margin: 0px 5px;
}

.dataRecordDIV ul li span {
	background: #747272;
	width: 10px;
	height: 10px;
	display: inline-block;
	vertical-align: middle;
	margin: 0px 5px;
	-webkit-border-radius: 100%;
	-moz-border-radius: 100%;
	border-radius: 100%;
	vertical-align: middle;
}

.dataRecordDIV ul li p {
	position: absolute;
	color: #818181;
	margin: 0px;
	right: -60px;
	width: 150px;
	text-align: center;
	font-size: 14px;
}

.dataRecordDIV ul li:nth-of-type(odd) p {
	top: -45px;
}

.dataRecordDIV ul li:nth-of-type(even) p {
	top: 45px;
}

.dataRecordDIV ul li.active i {
	background: url(images/dot_blue.png) no-repeat center;
}

.dataRecordDIV ul li.active span {
	background: #4e6085;
}

.dataRecordDIV ul li.active p {
	color: #488FFE;
}

.gqfjygh-table-div .tb-search .btn-sm1 {
	width: auto;
	padding: 0 25px;
}

.gqfjygh-table-div .tb-search .btn-sm1 img {
	margin-top: -2px;
	margin-left: 5px;
}

.gqfjygh-table-div .tb-table .tb {
	border-bottom: 1px solid #EBEBEB;
}



















/*.gqfjygh-table-div .tb2 .table.odd>tbody>tr>th:last-child {
		width: 180px;
		padding-right: 0px;
		padding-left: 0px;
	}
	
	.gqfjygh-table-div .tb2 .table.odd>tbody>tr>td:last-child {
		width: 180px;
		padding-right: 0px;
		padding-left: 0px;
	}
	
	.gqfjygh-table-div .tb2 .table.odd>tbody>tr:last-child {
		border-bottom: 1px solid #EBEBEB;
	}*/

.gqfjygh-table-div .tb-search .btn-sm2 {
	color: #909090
}

.btn-next {
	width: 100%;
}

.no-bottom-border {
	border-bottom: none;
}

.gqfjygh-table-div .table>tbody>tr>td {
	padding-left: 35px;
}

.gqfjygh-table-div {
	border-left: none
}
</style>