<template>
	<div class="tableDIV gqfjygh-table-div">

		<div class="srf-info">
			<div class="title">
				股东名册登记
			</div>
			<div class="tb-search">
				<button class="btn-sm1 upload" @click="localImport">本地导入<img :src="leftpng" />
					<el-upload class="change" action="http://192.168.10.72:8081/business/uploadFile" name="file" :on-success="seccessRes">
						<el-button class="change" size="small" type="primary"></el-button>
						<!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
					</el-upload>
				</button>

				<button class="btn-sm1 btn-sm1-2" @click="dealImport">处理导入数据<img :src="uploadpng" /></button>
				<button class="btn-sm1 btn-sm1-2" @click="dealImport1">查询处理导入数据<img :src="uploadpng" /></button>
			</div>
			<div class="tb-table">
				<div class="tb tb2">
					<header class="tb-title">
						<p><img :src="blueicon" />{{tbtitle}} </p>
					</header>
					<table class="table odd">
						<tbody class="table-tbody-odd">
							<tr>
								<th class="text-center">序号</th>
								<th>结果</th>
								<th>详细提示</th>
								<th>客户姓名</th>
								<th>客户简称</th>
								<th>客户性质</th>
								<th>机构标志</th>
								<th class="text-center">备注</th>
							</tr>
							<tr v-for="(item,index) in list">
								<td class="text-center">{{index+1}}</td>
								<td>{{item.returnCode}}</td>
								<td>{{item.errorDetail==''? '-' :item.errorDetail}}</td>
								<td>{{item.name}}</td>
								<td>{{item.abbr}}</td>
								<td>{{item.natureoFinvestor}}</td>
								<td>{{item.individualOrInstitution}}</td>
								<td class="text-center">
									<button class="btn-sm2" @click="tanmodal(index)">查看</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<!--弹框-->
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
							<table class="table" v-if="this.list.length>0">
								<tbody>
									<tr>
										<td>证件类型</td>
										<td>{{this.list[this.index].certType}}</td>
									</tr>
									<tr>
										<td>证件号码</td>
										<td>{{this.list[this.index].certNo}}</td>
									</tr>
									<tr>
										<td>份额性质</td>
										<td>{{this.list[this.index].natureoFinvestor}}</td>
									</tr>
									<tr>
										<td>产品数量</td>
										<td>{{this.list[this.index].num}}</td>
									</tr>
									<tr>
										<td>电话</td>
										<td>{{this.list[this.index].mobile}}</td>
									</tr>
									<tr>
										<td>手机</td>
										<td>{{this.list[this.index].tel}}</td>
									</tr>
									<tr>
										<td>联系地址</td>
										<td>{{this.list[this.index].contactAddress}}</td>
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

	</div>
</template>

<script>
import ApiService from '@/services/API-servies'

import blueicon from '@/assets/images/blue-icon.png'
import leftpng from '@/assets/images/left.png'
import uploadpng from '@/assets/images/upload.png'
// import ApiService from '@/services/API-serviesi'
export default {
	name: 'shareholder-register',
	data() {
		return {
			paper1: '',
			paper: {},
			index: 0,
			total: '',
			blueicon: blueicon,
			filePath: '',
			batchnone: '',//批次号
			leftpng: leftpng,
			uploadpng: uploadpng,
			list: [],
			importChu:{}
		}
	},
	props: {
		tbtitle: {
			type: String,
			default() {
				return '受让方基本信息'
			}
		},
		funCode: {
			type: String,
			default() {
				return ''
			}
		}
	},
	methods: {
		seccessRes(response, file) {


			var localFilePath1 = JSON.stringify(JSON.parse(response.msg).data)
			var localFilePath2 = JSON.parse(localFilePath1.replace(new RegExp("\\\\", "gm"), "\\\\")).localFilePath

			this.paper1 = localFilePath2
			this.$emit('paper1', this.paper1);
			console.log(this.paper1, 'tuuuuuu')

			ApiService.Registrationmanagement.inStockholders({
				seq: 'Math.random()*100000000000000000000',
				filepath: localFilePath2,
				fundcode: this.funCode,
				branchcode: "0001",
				operid: this.$store.getters.operId,
				timestamp: 0
			}).then((res) => {
				this.batchnone = res.data.batchno
				console.log(this.batchnone, 'okjuoju')

			}).then((res) => {
				ApiService.Registrationmanagement.queryInStockholders({
					seq: 'Math.random()*100000000000000000000',
					batchno: this.batchnone,
					isbefore: '0',
					pageSize: 15,
					pageNo: 1,
					timestamp: 0
				}).then((res) => {
					this.list = res.data.items



					console.log(this.list, 'laiba ')
				})
			})


		},
		tanmodal(index) {
			$('#gqfjyghModal').modal('show')
			this.index = index
			console.log(index, '66666')

		},
		// 本地导入
		localImport() {





		},
		// 处理导入数据
		dealImport() {
			ApiService.Registrationmanagement.processStockholders({
				seq: 'Math.random()*100000000000000000000',
				batchno: this.batchnone,
				fundcode: this.funCode,
				branchcode: '1110',
				operid: this.$store.getters.operId,
				timestamp: 0
			}).then((res) => {
				this.importChu = res
				
				console.log(this.importChu, 'cncncn')
				this.$emit('importChu', this.importChu);
			})

		},
		dealImport1() {
			ApiService.Registrationmanagement.queryInStockholders({
				seq: 'Math.random()*100000000000000000000',
				batchno: this.batchnone,//由上面返回得到
				isbefore: '1',
				pageSize: 15,
				pageNo: 1,
				timestamp: 0
			}).then((res) => {
				this.list = res.data.items
				this.lsitone = res.data.items.errorDetail
				this.paper = res
				console.log(this.paper, 'cncncn')
				this.$emit('paper', this.paper);
			})
			this.$emit('batchno', this.batchnone);


		}
	},
	created() {
	},
	mounted() {


	}

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload {
	// padding: 4px 10px;
	// height: 35px;
	// line-height: 35px;
	position: relative; // border: 1px solid #999;
	// text-decoration: none;
	// color: #666;
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

.gqfjygh-table-div {
	margin-bottom: 0px;
}

.gqfjygh-table-div .tb-search .btn-sm1 {
	width: auto;
	padding: 0 22px;
}

.gqfjygh-table-div .tb-search .btn-sm1-2 {
	width: auto;
	padding: 0 21px;
}

.gqfjygh-table-div .tb-search .btn-sm1 img {
	margin-top: -2px;
	margin-left: 5px;
}

.gqfjygh-table-div .table>tbody>tr>th:last-child {
	padding-right: 6px!important;
}

.gqfjygh-table-div .table>tbody>tr>td:last-child {
	padding-right: 6px!important;
}

.gqfjygh-table-div .tb2 .table.odd>tbody>tr:last-child {
	border-bottom: 1px solid #EBEBEB;
}

.table-tbody-odd {
	padding-left: 40px;
}
</style>