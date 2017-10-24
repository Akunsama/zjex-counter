<template>
	<div>
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
												<font @click="showoption(index)">查看</font>
												<!--<div class="result">
													审核驳回：股权证明不对，没有盖章审核驳回：股权证明不对，没有盖章
												</div>-->
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
		
		
		
		
		
		
		
		
		
		
		
		<!--<table class="todotable nopadding">
			<tbody>
				<tr>
					<th class="text-center" style="width: 85px">序号</th>
					<th>审核项目</th>
					<th>资料属性</th>
					<th>文档</th>
					<th class="text-center">操作</th>
					<th class="text-center" :class="{'alignleft':status!=1}">审核结果</th>
					<th class="text-center" style="width: 115px;">单向意见</th>
				</tr>
				<tr v-for="(item,index) in fileslist">
					<td class="text-center">{{index+1}}</td>
					<td :title="item.project"><em><i>{{item.project}}</i></em></td>
					<td>{{item.ifmust}}</td>
					<td :title="item.filename"><em><i>{{item.filename}}</i></em></td>
					<td class="text-center"><button class="btn-sm2">下载</button></td>
					<td v-if="status==1" class="text-center">
						<ul class="choice-radio cr">
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
					<td v-else>{{item.result==1?'通过':'不通过'}}</td>
					<td class="operationTD">
						<div class="operation" @click="showoption(index)">
							<font >操作</font>

						</div>
					</td>
				</tr>
			</tbody>
		</table>-->
		
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
		            <div class="modal-body" >
		            	<!--<p class="remark">意见</p>-->
		            	<span>意见</span>
						<div class="textareacenter">
							<textarea :readonly="status==3 || status==4"  v-model="filerow.opinion"></textarea>
						</div>
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
	export default {
		name: 'file-table',
		data() {
			return {
				filerow:{}
			}
		},
		props: {
			status: {
				type: Number,
				default() {
					return 1
				}

			},
			fileslist: {
				type: Array,
				default() {
					return [{
						project: '-',
						type: '-',
						ifmust: '-',
						result: '-',
						opinion: '-',
						filename:'-',
						filepath:'-'
					}]
				}

			},
		},
		methods: {
			showoption(index){
				$("#opinionModal").modal("show")
				this.filerow = this.fileslist[index]
			}
		},
		created() {

		},
		mounted() {
			$("#mytable").mCustomScrollbar();
		},

	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
	.alignleft {
		text-align: left;
	}
	
	.choice-radio {
		margin: 0px auto;
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
	#opinionModal .modal-dialog .modal-content .modal-body {
	    height: 185px;
	    padding: 20px 50px;
	    font-size: 16px;
    	color: #7A7A7A;
    	text-align: right;
    	position: relative;
	}	
	#opinionModal .modal-dialog .modal-content .modal-body span{
	    position: absolute;
	    left: 50px;
	    top: 38px;
	}	
	#opinionModal .modal-dialog .modal-content .modal-body .textareacenter textarea{
		margin-top: 20px;
	    width: 315px;
	    height: 100px;
	    border: 1px solid #EBEBEB;
	    font-size: 14px;
	    color: #909090;
	    padding: 15px;
	}
</style>