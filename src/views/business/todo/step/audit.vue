<template>
	<div>

		<div class="gqfjyghDIV registrationDIV">
			<p>{{titleText}}</p>
			<img :src="gqfjygh" class="gqfjyghImg" />
		</div>

		<div class="tableDIV gqfjygh-table-div registration-table">
			<div class="crf-info">
				<div class="title">
					{{titleText}}
				</div>
				<div class="tb-table">
					<!--客户信息-->
					<div class="tb tb1" v-show="titleText!='股权初始登记' && titleText!='基本信息变更' ">
						<header class="tb-title">
							<p><img :src="blueIcon" />客户信息 </p>
						</header>
						<table class="todotable odd nopadding">
							<tbody>
								<tr>
									<th>业务角色</th>
									<th>客户名称</th>
									<th>客户代码</th>
									<th>客户类型</th>
									<th>证件类型</th>
									<th style="width: 210px;">证件号码</th>
								</tr>
								<tr v-for="(item,index) in personlist">
									<td>{{item.role}}</td>
									<td>{{item.name}}</td>
									<td>{{item.custno}}</td>
									<td>{{item.custTypeName}}</td>
									<td>{{item.certTypeName}}</td>
									<td>{{item.certNo}}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<!--业务信息-->
					<div class="tb tb1" v-show="titleText!='股权初始登记'  && titleText!='基本信息变更' && titleText!='股东信息变更' ">
						<header class="tb-title">
							<p><img :src="blueIcon" />业务信息 </p>
						</header>
						<table class="todotable nopadding " :class="{'businesstable':titleText=='股权非交易过户'}">
							<tbody>
								<tr>
									<th v-show="titleText=='企业信息变更'">交易品种</th>
									<th v-show="titleText=='企业信息变更'">所属板块</th>
									<th v-show="titleText=='企业信息变更'">产品名称</th>
									<th v-show="titleText!='企业信息变更'">产品代码</th>
									<th>产品简称</th>
									<th v-show="titleText=='企业信息变更'">总份额</th>
									<th v-show="titleText=='企业信息变更'">持有人户数</th>
									<th v-show="titleText=='企业信息变更'">是否初始登记标识</th>
									<th v-show="titleText=='股权非交易过户'">过户份额<span>&nbsp;&nbsp;&nbsp;（股）</span></th>
									<th v-show="titleText=='股权非交易过户'">份额性质<span>（过户前）</span></th>
									<th v-show="titleText=='股权非交易过户'">份额性质<span>（过户后）</span></th>
									<th v-show="titleText=='股权非交易过户'">过户类型</th>
									<th v-show="titleText=='股权份额性质变更'">变更份额<span>&nbsp;&nbsp;&nbsp;（股）</span></th>
									<th v-show="titleText=='股权份额性质变更'">份额性质<span>（变更前）</span></th>
									<th v-show="titleText=='股权份额性质变更'">份额性质<span>（变更后）</span></th>
									<th v-show="titleText=='股权份额质押' || titleText=='股权份额冻结'">产品类型</th>
									<th v-show="titleText=='股权份额质押' || titleText=='股权份额冻结'">产品份额可用数</th>
									<th v-show="titleText=='股权份额质押' || titleText=='股权份额冻结'">已冻结份额数</th>
									<th v-show="titleText=='股权份额质押' || titleText=='股权份额冻结'">质押份额</th>
									<th v-show="titleText=='股权份额解押' || titleText=='股权份额解冻'">股份性质</th>
									<th v-show="titleText=='股权份额解押' || titleText=='股权份额解冻'">解押类别</th>
									<th v-show="titleText=='股权份额解押' || titleText=='股权份额解冻'">解押日期</th>
									<th v-show="titleText=='股权份额解押' || titleText=='股权份额解冻'">解押份额</th>
									<th v-show="titleText=='股权份额调整'">产品类型</th>
									<th v-show="titleText=='股权份额调整'">产品份额可用数</th>
									<th v-show="titleText=='股权份额调整'">调整前份额性质</th>
									<th v-show="titleText=='股权份额调整'">调整类型</th>
									<th v-show="titleText=='股权份额调整'">调整数量</th>
									<th v-show="titleText=='股权增资扩股'">产品类型</th>
									<th v-show="titleText=='股权增资扩股'">所属板块</th>
									<th v-show="titleText=='股权增资扩股'">原股本<span>（股）</span></th>
									<th v-show="titleText=='股权增资扩股'">现股本<span>（股）</span></th>
									<th v-show="titleText!='企业信息变更'" class="text-center">备注</th>
									<th v-show="titleText!='企业信息变更'" style="width: 105px;" class="text-center">操作</th>
								</tr>								
								<tr v-for="(item,index) in businesslist">
									<td  v-show="titleText=='企业信息变更'">{{item.fundTypeName}}</td>
									<td  v-show="titleText=='企业信息变更'">{{item.fundClassName}}</td>
									<td  v-show="titleText=='企业信息变更'">{{item.fundAbbr}}</td>
									<td  v-show="titleText!='企业信息变更'">{{item.fundCode}}</td>
									<td>{{item.fundName}}</td>
									<td v-show="titleText=='企业信息变更'">{{item.totalShares}}</td>
									<td v-show="titleText=='企业信息变更'">{{item.holders}}</td>
									<td v-show="titleText=='企业信息变更'">{{item.isOriginal == 1?'是':'否'}}</td>
									<td v-show="titleText=='股权非交易过户'">{{item.outNum}}<br>{{item.outNum | convertCurrency}}</td>
									<td v-show="titleText=='股权非交易过户'">{{item.stockNatureBeforeName}}</td>
									<td v-show="titleText=='股权非交易过户'">{{item.stockNatureAfterName}}</td>
									<td v-show="titleText=='股权非交易过户'">{{item.transferTypeName}}</td>
									<td v-show="titleText=='股权份额性质变更'">{{item.frostNum}}<br>{{item.frostNum | convertCurrency}}</td>
									<td v-show="titleText=='股权份额性质变更'">{{item.stockNatureBeforeName}}</td>
									<td v-show="titleText=='股权份额性质变更'">{{item.stockNatureAfterName}}</td>
									<td v-show="titleText=='股权份额质押' || titleText=='股权份额冻结'">{{item.fundType}}</td>
									<td v-show="titleText=='股权份额质押' || titleText=='股权份额冻结'">{{item.availStock}}</td>
									<td v-show="titleText=='股权份额质押' || titleText=='股权份额冻结'">{{item.frozenStock}}</td>
									<td v-show="titleText=='股权份额质押' || titleText=='股权份额冻结'">{{item.pledgeStock}}<br>{{item.pledgeStock | convertCurrency}}</td>
									<td v-show="titleText=='股权份额解押' || titleText=='股权份额解冻'">{{item.stockNatureName}}</td>
									<td v-show="titleText=='股权份额解押' || titleText=='股权份额解冻'">{{item.fozenTypeName}}</td>
									<td v-show="titleText=='股权份额解押' || titleText=='股权份额解冻'">{{item.forzenDate}}</td>
									<td v-show="titleText=='股权份额解押' || titleText=='股权份额解冻'">{{item.frozenNum}}<br>{{item.frozenNum | convertCurrency}}</td>
									<td v-show="titleText=='股权份额调整'">{{item.fundTypeName}}</td>
									<td v-show="titleText=='股权份额调整'">{{item.availStock}}</td>
									<td v-show="titleText=='股权份额调整'">{{item.stockNatureName}}</td>
									<td v-show="titleText=='股权份额调整'">{{item.adjustType==1?'调减':'调增'}}</td>
									<td v-show="titleText=='股权份额调整'">{{item.adjustNum}}<br>{{item.adjustNum | convertCurrency}}</td>
									<td v-show="titleText=='股权增资扩股'">{{item.fundTypeName}}</td>
									<td v-show="titleText=='股权增资扩股'">{{item.fundClassName}}</td>
									<td v-show="titleText=='股权增资扩股'">{{item.firstShares}}</td>
									<td v-show="titleText=='股权增资扩股'">{{item.totalShares}}</td>

									<td v-show="titleText!='企业信息变更'" class="operationTD">
										<div class="operation">
											<font>查看</font>
											<div class="result">
												{{item.option}}
											</div>
										</div>
									</td>
									<td v-show="titleText!='企业信息变更'"><button class="btn-sm2" @click="edit(index)" v-show="status==1">编辑</button></td>
								</tr>
							</tbody>
						</table>
					</div>
					<!--企业基本信息-->
					<div class="tb tb1" v-show="titleText=='股权初始登记'">
						<header class="tb-title">
							<p><img :src="blueIcon" />企业基本信息登记表 </p>
						</header>
						<table class="todotable odd nopadding">
							<tbody>
								<tr>
									<th>序号</th>
									<th>审核项目</th>
									<th>资料属性</th>
									<th class="text-center">操作</th>
									<th :class="{'text-center':status==1}">审核结果</th>
									<th style="width: 90px;" class="text-center">备注</th>
								</tr>
								<tr>
									<td>1</td>
									<td>企业基本信息登记表</td>
									<td>必传</td>
									<td class="text-center"><button class="btn-sm2" @click="enterpriseInfo">查看</button></td>
									<td class="text-center" v-if="status==1">
										<ul class="choice-radio">
											<li :class="{active:basicInfoAudit==1}" @click="basicInfoAudit=1">
												<input type="radio" value="1" v-model="basicInfoAudit">
												<label for="type1">通过</label>
												<span></span>
											</li>
											<li :class="{active:basicInfoAudit==0}" @click="basicInfoAudit=0">
												<input type="radio" value="0" v-model="basicInfoAudit">
												<label for="type2">不通过</label>
												<span></span>
											</li>
										</ul>
									</td>
									<td v-else>{{basicInfoAudit==1?'通过':'不通过'}}</td>
									<td class="operationTD">
										<div class="operation">
											<font>查看</font>
											<div class="result">
												{{basicInfoOption}}
											</div>
										</div>
									</td>
									<!--<td>{{item.num}}</td>-->
								</tr>
								<tr class="btndiv" v-show="status==2 && created==false">
									<td colspan="6"><button @click="createproduct">创建产品</button></td>
								</tr>
							</tbody>
						</table>
					</div>
					<!--股东名册-->
					<div class="tb tb1" v-show="titleText=='股权初始登记' || titleText=='股东信息变更' ">
						<header class="tb-title">
							<p><img :src="blueIcon" />股东名册 </p>
						</header>
						<table class="todotable odd nopadding">
							<tbody>
								<tr>
									<th>序号</th>
									<th>审核项目</th>
									<th>资料属性</th>
									<th>文档</th>
									<th class="text-center">操作</th>
									<th :class="{'text-center':status==1}">审核结果</th>
									<th style="width: 115px;" class="text-center">单项意见</th>
								</tr>
								<tr>
									<td>1</td>
									<td>股东证明材料</td>
									<td>必传</td>
									<td :title="shareholderFileName"><em><i>{{shareholderFileName}}</i></em></td>
									<td v-if="status!=1" class="text-center"><button class="btn-sm2">下载</button></td>
									<td class="operationTD" v-else>
										<div class="operation">
											<font>操作</font>
											<ul class="mui-loadBox">
												<li>下载</li>
												<li @click="triggerFile2()">上传</li>
												<form enctype='multipart/form-data'>
				                                	<input name="file" id="shareholderfile" class="mui-uploadInput" type="file" @change='uploadFileFun2($event)'>
				                            	</form>
											</ul>
										</div>
									</td>
									<!--<td class="text-center"><button class="btn-sm2">下载</button></td>-->
									<td class="text-center" v-if="status==1">
										<ul class="choice-radio">
											<li :class="{active:naturalRegistryAudit==1}" @click="naturalRegistryAudit=1">
												<input type="radio" value="1" v-model="naturalRegistryAudit">
												<label for="type1">通过</label>
												<span></span>
											</li>
											<li :class="{active:naturalRegistryAudit==0}" @click="naturalRegistryAudit=0">
												<input type="radio" value="0" v-model="naturalRegistryAudit">
												<label for="type2">不通过</label>
												<span></span>
											</li>
										</ul>
									</td>
									<td v-else>{{naturalRegistryAudit==1?'通过':'不通过'}}</td>
									<td class="operationTD">
										<div class="operation">
											<font @click="showshareholder">{{status==1?'编辑':'查看'}}</font>
										</div>
									</td>
								</tr>
								<tr class="btndiv" v-show="status==2">
									<td colspan="7"><button @click="openAccount">股东开户</button></td>
								</tr>
							</tbody>
						</table>
					</div>
					
					<!--基本信息变更-->	
					<div class="tb tb1" v-show="titleText=='基本信息变更'">
						<header class="tb-title">
							<p><img :src="blueIcon" />基本信息 </p>
						</header>
						<table class="todotable odd nopadding">
							<tbody>
								<tr>
									<th>登录账户</th>
									<th>账户类别</th>
									<th>资金账号</th>
									<th>登记账号</th>
									<th class="text-center" style="width: 95px;">操作</th>
								</tr>
								<tr>
									<td>{{data.name}}</td>
									<td>{{data.custTypeName}}</td>
									<td>{{data.capitalAccount}}</td>
									<td>{{data.account}}</td>
									<td class="operationTD">
										<div class="operation" @click="baseinfo">
											<font>查看</font>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>	
						
					<!--审核材料-->
					<div class="tb tb1">
						<header class="tb-title">
							<p><img :src="blueIcon" />审核材料 </p>
						</header>
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
									<th style="width: 115px;" class="text-center">单项意见</th>
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
										<td :title="item.filename"><em><i style="max-width: 95px;">{{item.filename}}</i></em>{{item.suffix}}</td>
										<td style="width: 90px;" class="text-center"><button class="btn-sm2 filedownload" :data-filename="item.filename" @click="download(index)">下载</button></td>
										<td style="width: 210px;" v-if="status==1" class="text-center">
											<ul class="choice-radio">
												<li :class="{active:item.result==1}" @click="item.result=1">
													<input type="radio" value="1" v-model="item.result">
													<label for="type1">通过</label>
													<span></span>
												</li>
												<li :class="{active:item.result==0}" @click="item.result=0">
													<input type="radio" value="0" v-model="item.result">
													<label for="type2">不通过</label>
													<span></span>
												</li>
											</ul>
										</td>
										<td style="width: 150px;" v-else>{{item.result==1?'通过':'不通过'}}</td>
										<td style="width: 115px;" class="operationTD">
											<div class="operation">
												<font @click="showoption(index)">{{status==1?'编辑':'查看'}}</font>
												<!--<div class="result">
													审核驳回：股权证明不对，没有盖章审核驳回：股权证明不对，没有盖章
												</div>-->
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<!--上传材料-->
					<div class="tb tb1">
						<header class="tb-title">
							<p><img :src="blueIcon" />上传材料 </p>
						</header>
						<table class="todotable odd nopadding">
							<tbody>
								<tr>
									<th>序号</th>
									<th>内容</th>
									<th>资料属性</th>
									<th>文档</th>
									<th class="text-center" style="width: 95px;">操作</th>
								</tr>
								<tr>
									<td>1</td>
									<td>相关资料</td>
									<td>非必传</td>
									<td :title="counterProvefileName"><em><i style="max-width: 200px;">{{counterProvefileName}}</i></em></td>
									<td class="operationTD">
										<div class="operation mui-loadBox">
												<font @click="triggerFile()" v-if="status==1">上传</font>
												<font @click="downloadFile()" v-else>下载</font>
												<form enctype='multipart/form-data'>
				                                	<input name="file" id="otherfile" class="mui-uploadInput" type="file" @change='uploadFileFun($event)'>
				                            	</form>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<!--审核备注-->
					<div class="tb tb2" v-show="status!=3">
						<header class="tb-title" v-bind:class="{'tb-title-focus':isActive}">
							<p><img :src="blueIcon" />审核意见</p>
						</header>
						<div class="tb-remark" v-bind:class="{ 'tb-remark-focus': isActive }">
							<textarea :readonly="addText" v-model="comment"></textarea>
							<transition name="fade">
								<button @click="add" v-show="addshow">+ 添加</button>
							</transition>
						</div>
					</div>
				</div>
			</div>
			<!----------------------->
			<div class="srf-info" v-show="status==1 || status==2">
				<div class="title">
					审核意见
				</div>
				<ul class="choice-radio review">
					<li :class="{active:picked==-1}" @click="auditmodal">
						<input type="radio" id="typea" value="-1" v-model="picked">
						<label for="typea">审核关闭</label>
						<span></span>
					</li>
					<li :class="{active:picked==1}" v-show="status==1" @click="auditmodal">
						<input type="radio" id="typeb" value="1" v-model="picked">
						<label for="typeb">初审通过</label>
						<span></span>
					</li>
					<li :class="{active:picked==2}" v-show="status==1" @click="auditmodal">
						<input type="radio" id="typec" value="2" v-model="picked">
						<label for="typec">申请驳回</label>
						<span></span>
					</li>
					<li :class="{active:picked==4}" v-show="status==2" @click="auditmodal">
						<input type="radio" id="typed" value="4" v-model="picked">
						<label for="typed">终审通过</label>
						<span></span>
					</li>
				</ul>
			</div>
			<!----------------------->
			<div class="tb-next">
				<button @click="returnstep">返回</button>
			</div>
		</div>

		<!-- 弹框 （Modal） -->
		<div class="popModal modal fade smallModal" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content" v-show="showStatus==1">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">审核意见确认</h4>
					</div>
					<div class="modal-body one-row" style="padding-top: 80px;">
						是否确定该操作
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save btn-review" @click="confirm">确认</button>
						<button type="button" class="btn-close" data-dismiss="modal">取消</button>
					</div>
				</div>
				<div class="modal-content" v-show="showStatus==2">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">创建产品</h4>
					</div>
					<div class="modal-body two-row">
						<p>托管企业产品<span>创建成功</span>,</p>
						<p>下一步将导入股东名册</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save btn-review" data-dismiss="modal">确认</button>
						<button type="button" class="btn-close" data-dismiss="modal">取消</button>
					</div>
				</div>
				<div class="modal-content" v-show="showStatus==3">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">业务信息修改</h4>
					</div>
					<!--<div class="modal-body one-row">
		            	是否确定该操作
		            </div>-->
					<div class="modal-body modalselect">
						<div>
							<span>{{texts}}份额：</span><label v-if="texts=='过户'">{{handlerow.outNum | twoDecimalPlaces}}股  {{handlerow.outNum | convertCurrency}}股</label><label v-else>{{handlerow.frostNum | twoDecimalPlaces}}股  {{handlerow.frostNum | convertCurrency}}股</label>
						</div>
						<div>
							<span>{{texts}}后份额性质：</span>
							<!--<input />-->
							<el-select v-model="opinion" placeholder="">
								<el-option label="流通股" value="0,流通股"></el-option>
								<el-option label="特别股" value="32,特别股"></el-option>
								<el-option label="资格股" value="2,资格股"></el-option>
								<el-option label="公众已托股" value="11,公众已托股"></el-option>
								<el-option label="发起人股" value="12,发起人股"></el-option>
								<el-option label="限售股" value="13,限售股"></el-option>
								<el-option label="定向股" value="31,定向股"></el-option>
								<el-option label="其他" value="36,其他"></el-option>
								<el-option label="内部职工股" value="41,内部职工股"></el-option>
								<el-option label="高管股" value="33,高管股"></el-option>
								<el-option label="公众委托股" value="43,公众委托股"></el-option>
								<el-option label="托管法人股" value="44,托管法人股"></el-option>
								<el-option label="法人股" value="45,法人股"></el-option>
								<el-option label="自然人股" value="46,自然人股"></el-option>
							</el-select>
						</div>
						<div v-show="texts=='过户'">
							<span>{{texts}}类型：</span><label>{{handlerow.transferType}}-{{handlerow.transferTypeName}}</label>
						</div>
						<div>
							<span style="float: left;margin-left: 45px;">备注：</span><div style="width: 225px;height: 20px;float: left;">{{handlerow.option}}</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save btn-review" data-dismiss="modal" @click="transfer">确认</button>
						<button type="button" class="btn-close" data-dismiss="modal">取消</button>
					</div>
				</div>
				<div class="modal-content " v-show="showStatus==4">
		            <div class="modal-header">
		            	  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		                <h4 class="modal-title" id="myModalLabel">单项意见</h4>
		            </div>
		            <div class="modal-body optionmodal" >
		            	<span>意见</span>
						<div class="textareacenter">
							<textarea :readonly="status!=1"  v-model="handlerow.opinion" v-if="titleText!='股权初始登记'"></textarea>
							<textarea :readonly="status!=1"  v-model="naturalRegistryOption" v-else></textarea>
						</div>
		            </div>
		            <div class="modal-footer">
		                <button type="button" class="btn-save btn-review" data-dismiss="modal">确认</button>
		                <button type="button" class="btn-close" data-dismiss="modal">取消</button>
		            </div>
		        </div>
		        <div class="modal-content" v-show="showStatus==5">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">提示</h4>
					</div>
					<div class="modal-body one-row" style="padding-top: 80px;">
						审核成功
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save btn-review" data-dismiss="modal"  @click="returnstep">确认</button>
						<button type="button" class="btn-close" data-dismiss="modal" @click="returnstep">取消</button>
					</div>
				</div>
				<div class="modal-content" v-show="showStatus==6">
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
		
		<div class="popModal modal fade logModal bigModal" id="gqfjyghModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content" v-show="showStatus == 10">
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
										<td>产品名称</td>
										<td>{{data.fundName}}</td>
									</tr>
									<tr>
										<td>产品简称</td>
										<td>{{data.fundAbbr}}</td>
									</tr>
									<tr>
										<td>交易品种类型</td>
										<td>{{data.fundType}}</td>
									</tr>
									<tr>
										<td>所属板块</td>
										<td>{{data.fundClass}}</td>
									</tr>
									<tr>
										<td>总份额</td>
										<td>{{data.totalShares}}</td>
									</tr>
									<tr>
										<td>登记份额</td>
										<td>{{data.registerShares}}</td>
									</tr>
									<tr>
										<td>持有人户数</td>
										<td>{{data.holders}}</td>
									</tr>
									<tr>
										<td>流通份额</td>
										<td>{{data.floatShares}}</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="modalbutton" @click="enterprisedownload"><button>下载</button></div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-save" id="ca-complete" data-dismiss="modal">确认</button>
						<button type="button" class="btn-close" data-dismiss="modal">取消</button>
					</div>
				</div>
				
				<div class="modal-content" v-show="showStatus == 11">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">基本信息详情</h4>
					</div>
					<div class="modal-body">
						<div class="tableDIV">
							<p>查看详情</p>
							<table class="table">
								<tbody>
									<tr>
										<td>客户名称</td>
										<td>{{data.name}}</td>
									</tr>
									<tr>
										<td>证件类型</td>
										<td>{{data.certTypeName}}</td>
									</tr>
									<tr>
										<td>证件号码</td>
										<td>{{data.certNo}}</td>
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
	import blueIcon from '@/assets/images/blue-icon.png'
	import gqfjygh from '@/assets/images/gqfjygh.png'
	import operationTable from '@/components/operationTable/operationTable.vue'
	import fileTable from '@/components/fileTable/fileTable.vue'
	import ApiService from '@/services/API-servies'
	import {exportLoad} from '@/utils/validate'
	
	export default {
		//组件名
		name: 'audit',
		//实例的数据对象
		data() {
			return {
				blueIcon: blueIcon,
				gqfjygh: gqfjygh,
				addshow: true,
				addText: true,
				isActive: false,
				showStatus:1,//弹框切换
				tiptext:'审核成功',
				titleText: '股权非交易过户',//标题
				status: 1,//页面状态1初审2终审3查看
				picked: '',//审核结果
				comment:'',//审核备注
				//------------------
				//企业基本信息审核
				created: false,//是否创建产品
				basicInfoAudit: '2',
				basicInfoOption: '',
				//股东名册审核
				shareholderFileName:'',
				shareholderFilePath:'',
				naturalRegistryAudit: '2',
				naturalRegistryOption: '',
				//------------------
				
				texts:'过户',
				opinion: '',
				handleindex:'',//编辑行
				handlerow:{},//编辑行
				
				//客户信息
				personlist: [{
					role: '持有方',
					name: '客户名称',
					custno: '客户代码',
					custType: '客户类型',
					certType: '证件类型',
					certNo: '证件号码'
				}],
				//业务信息
				businesslist: [{
					fundCode: '-',
					fundName: '-',
					outNum: '-',
					stockNatureBefore: '-',
					stockNatureAfter: '-',
					stockNatureBeforeName: '-',
					stockNatureAfterName: '-',
					transferType: '-',
					transferTypeName: '-',
					option: '-'
				}],
				//材料信息
				fileslist: [{
					project: '-',
					type: '-',
					ifmust: '-',
					result: '-',
					opinion: '-',
					filename: '-',
					filepath: '-'
				}, ],
				//上传材料
				counterProve: '',
				counterProvefileId:'',
				counterProvefilePath:'',
				counterProvefileName:'',
				//获得的data
				data: {
					source: 'PCI',
					flag: '1',
					fundCode: '产品代码',
					fundName: '产品名称',
					fundType: '产品类型',
					outNum: '100',
					stockNatureBefore: '过出份额性质',
					stockNatureAfter: '过出份额性质',
					transferType: '过户类型',

					totalShares: '400',
					registerShares: '300',
					holders: '200',
					floatShares: '100',
					auditContent: [],
					fileIds: [],
					filePaths: [],
				},
				//提交的data
				postdata:{},
				//审核提交的数据
				parameter:{},
			}
		},
		//数组或对象，用于接收来自父组件的数据
		props: {

		},
		//方法
		methods: {	
			//编辑业务信息
			edit(index){
				if(this.status==1){
					this.handlerow = this.businesslist[index];
					this.showStatus=3;
					this.handleindex = index;
					$("#myModal2").modal("show")
				}
			},
			//审核材料单项意见
			showoption(index){
				this.showStatus=4;
				$("#myModal2").modal("show")
				this.handlerow = this.fileslist[index]
			},
			showshareholder(){
				this.showStatus=4;
				$("#myModal2").modal("show")
			},
			//过户和变更
			transfer(){
				let arr = this.opinion.split(",")
				this.data.stockNatureAfter = arr[0];
				this.data.stockNatureAfterName = arr[1];
				this.businesslist[this.handleindex].stockNatureAfter = arr[0];
				this.businesslist[this.handleindex].stockNatureAfterName = arr[1];
			},
			//点击审核备注样式切换
			add() {
				this.addshow = false;
				this.addText = false;
				this.isActive = true
			},
			//查看企业信息
			enterpriseInfo(){
				$("#gqfjyghModal").modal("show")
				this.showStatus = 10;
			},
			//查看基本信息
			baseinfo(){
				$("#gqfjyghModal").modal("show")
				this.showStatus = 11;
			},
			//返回
			returnstep() {
				this.$router.push('/todo/todoIndex')
			},
			//审核
			auditmodal(){
				$("#myModal2").modal("show")
				this.showStatus = 1;
			},
			confirm() {
				//判断
				if(this.picked == 1){
					for (let i=0;i<this.fileslist.length;i++) {
						if(this.fileslist[i].result!=1){
							return
						}
					}
				}
				//审核意见
				let obj = {};
				this.fileslist.forEach((value, index, array) => {
					if(value.opinion) {
						obj[value.type] = value.result + '|' + value.opinion;
					} else {
						obj[value.type] = String(value.result)  + '| ';
					}
				});
				if(this.titleText=='股权初始登记'){
					obj.stockholderForm = this.naturalRegistryAudit + '|' + this.naturalRegistryOption;
					obj.enRegisterForm = this.basicInfoAudit + '|';
				}
				if(this.titleText=='股东信息变更'){
					obj.stockholderForm = this.naturalRegistryAudit + '|' + this.naturalRegistryOption;
				}
				this.postdata.auditContent = JSON.stringify(obj)
				//文件
				this.postdata.fileIds = this.data.fileIds;
				this.postdata.filePaths = this.data.filePaths;
				this.postdata.fileIds.counterProve = this.counterProvefileId;
				this.postdata.filePaths.counterProve = this.counterProvefilePath;

				this.postdata.fileIds = JSON.stringify(this.postdata.fileIds)
				this.postdata.filePaths = JSON.stringify(this.postdata.filePaths)
				//审核状态
				let status ='',taskStatus='',checkFlag='',comment="";
				switch (this.picked){
					case '1':
						status = 2;
						taskStatus = 6;
						checkFlag = 1;
						comment = '1|'+this.comment;
						break;
					case '2':
						if(this.titleText == '基本信息变更' || this.titleText == '股东信息变更' || this.titleText == '企业信息变更'){
							status = 4;
						}else{
							status = 2;
						}
						taskStatus = 7;
						checkFlag = 2;
						comment = '2|'+this.comment;
						break;
					case '-1':
						status = 3;
						if(this.status == '1'){
							taskStatus = 10;
						}else{
							taskStatus = 11;
						}
						checkFlag = -1;
						comment = '-1|'+this.comment;
						break;
					case '4':
						status = 3;
						taskStatus = 9;
						checkFlag = 1;
						comment = '1|'+this.comment;
						break;
					default:
						break;
				}
				//要提交的数据
				let auditContent = JSON.stringify(this.postdata)
				this.parameter = {
					assignee:this.$store.getters.operId,
					businessKey:this.$route.query.businessKey,
					comment:comment,
					checkFlag:checkFlag,
					status:status,
					taskStatus:taskStatus,
					auditContent:auditContent,
				}
				//提交
				if(this.status=="2" && this.picked == "4"){
					switch(this.$route.query.type) {
						case 'equityRegister': //股权初始登记
								this.finalAudit();
							break;
						case 'transfer': //非交易过户
								ApiService.BusinessDealt.transferStock({
									businessKey:this.$route.query.businessKey,
									fundCode:this.data.fundCode,
									fundName:this.data.fundName,
									fundType:this.data.fundType,
									outAccount:this.data.outAccount,
									transferType:'04',
									stockNatureBefore:this.data.stockNatureBefore,
									outNum:this.data.outNum,
									inAccount:this.data.inAccount,
									stockNatureAfter:this.data.stockNatureAfter,
									fileIds:this.data.fileIds,
									filePaths:this.data.filePaths,
									remark:this.data.remark,
									operId:this.$store.getters.operId
								}).then(res => {
									let {
										ret,
										message
									} = res;
									if(ret == 0) {
										this.finalAudit();
									}else{
										this.tiptext = message
										this.showStatus=6;
										$("#myModal2").modal("show")
									}
								})
							break;
						case 'shareChange': //份额性质变更
								ApiService.BusinessDealt.transferNature({
									businessKey:this.$route.query.businessKey,
									fundCode:this.data.fundCode,
									fundName:this.data.fundName,
									fundType:this.data.fundType,
									account:this.data.account,
									stockNatureBefore:this.data.stockNatureBefore,
									frostNum:this.data.frostNum,
									stockNatureAfter:this.data.stockNatureAfter,
									fileIds:this.data.fileIds,
									filePaths:this.data.filePaths,
									remark:this.data.remark,
									operId:this.$store.getters.operId
								}).then(res => {
									let {
										ret,
										message
									} = res;
									if(ret == 0) {
										this.finalAudit();
									}else{
										this.tiptext = message
										this.showStatus=6;
										$("#myModal2").modal("show")
									}
								})
							break;
						case 'sharePledge': //份额质押
								ApiService.BusinessDealt.frostStock({
									businessKey:this.$route.query.businessKey,
									fundCode:this.data.fundCode,
									fundName:this.data.fundName,
									fundType:this.data.fundType,
									account:this.data.account,
									frostType:this.data.frostType,
									stockNature:this.data.stockNature,
									frostNum:this.data.frostNum,
									fileIds:this.data.fileIds,
									filePaths:this.data.filePaths,
									remark:this.data.remark,
									operId:this.$store.getters.operId
								}).then(res => {
									let {
										ret,
										message
									} = res;
									if(ret == 0) {
										this.finalAudit();
									}else{
										this.tiptext = message
										this.showStatus=6;
										$("#myModal2").modal("show")
									}
								})
							break;
						case 'shareUnPledge': //份额解押
								ApiService.BusinessDealt.unfreezeStock({
									businessKey:this.$route.query.businessKey,
									appsheetserialno:this.data.appsheetserialno,
									fundCode:this.data.fundCode,
									fundName:this.data.fundName,
									fundType:this.data.fundType,
									account:this.data.account,
									frostType:this.data.frostType,
									stockNature:this.data.stockNature,
									frostNum:this.businesslist[0].frozenNum,
									fileIds:this.data.fileIds,
									filePaths:this.data.filePaths,
									remark:this.data.remark,
									operId:this.$store.getters.operId
								}).then(res => {
									let {
										ret,
										message
									} = res;
									if(ret == 0) {
										this.finalAudit();
									}else{
										this.tiptext = message
										this.showStatus=6;
										$("#myModal2").modal("show")
									}
								})
							break;
						case 'shareFreeze': //份额冻结
								ApiService.BusinessDealt.frostStock({
									businessKey:this.$route.query.businessKey,
									fundCode:this.data.fundCode,
									fundName:this.data.fundName,
									fundType:this.data.fundType,
									account:this.data.account,
									frostType:this.data.frostType,
									stockNature:this.data.stockNature,
									frostNum:this.data.frostNum,
									fileIds:this.data.fileIds,
									filePaths:this.data.filePaths,
									remark:this.data.remark,
									operId:this.$store.getters.operId
								}).then(res => {
									let {
										ret,
										message
									} = res;
									if(ret == 0) {
										this.finalAudit();
									}else{
										this.tiptext = message
										this.showStatus=6;
										$("#myModal2").modal("show")
									}
								})
							break;
						case 'shareUnFreeze': //份额解冻
								ApiService.BusinessDealt.unfreezeStock({
									businessKey:this.$route.query.businessKey,
									appsheetserialno:this.data.appsheetserialno,
									fundCode:this.data.fundCode,
									fundName:this.data.fundName,
									fundType:this.data.fundType,
									account:this.data.account,
									frostType:this.data.frostType,
									stockNature:this.data.stockNature,
									frostNum:this.data.frostNum,
									fileIds:this.data.fileIds,
									filePaths:this.data.filePaths,
									remark:this.data.remark,
									operId:this.$store.getters.operId
								}).then(res => {
									let {
										ret,
										message
									} = res;
									if(ret == 0) {
										this.finalAudit();
									}else{
										this.tiptext = message
										this.showStatus=6;
										$("#myModal2").modal("show")
									}
								})
							break;
						case 'shareIncrease': //增资扩股
								ApiService.BusinessDealt.registerFund({
									businessKey:this.$route.query.businessKey,
									flag:'1',
									fundCode:this.data.fundCode,
									fundName:this.data.fundName,
									fundAbbr:this.data.fundAbbr,
									fundType:this.data.fundType,
									fundClass:this.data.fundClass,
									account:this.data.account,
									isOriginal:this.businesslist[0].isOriginal,
									totalShares:this.businesslist[0].totalShares,
									registerShares:this.businesslist[0].registerShares,
									faceValue:'1',
									fileIds:this.data.fileIds,
									filePaths:this.data.filePaths,
//									remark:this.data.remark,
									operId:this.$store.getters.operId
								}).then(res => {
									let {
										ret,
										message
									} = res;
									if(ret == 0) {
										this.finalAudit();
									}else{
										this.tiptext = message
										this.showStatus=6;
										$("#myModal2").modal("show")
									}
								})
							break;
						case 'shareAdjust': //份额调整
								ApiService.BusinessDealt.adjustStock({
									businessKey:this.$route.query.businessKey,
									fundCode:this.data.fundCode,
									fundName:this.data.fundName,
									fundType:this.data.fundType,
									account:this.data.account,
									adjustType:this.businesslist[0].adjustType,
									stockNature:this.data.stockNature,
									adjustNum:this.data.adjustNum,
									fileIds:this.data.fileIds,
									filePaths:this.data.filePaths,
									remark:this.data.remark,
									operId:this.$store.getters.operId
								}).then(res => {
									let {
										ret,
										message
									} = res;
									if(ret == 0) {
										this.finalAudit();
									}else{
										this.tiptext = message
										this.showStatus=6;
										$("#myModal2").modal("show")
									}
								})
							break;
						case 'baseinfoChange': //基本信息变更
								ApiService.common.modifyCustMajor({
									businessKey:this.$route.query.businessKey,
									custType:this.data.custType,
									custmerno:this.data.custmerno,
									custno:this.data.custno,
									name:this.data.name,
									certType:this.data.certType,
									certNo:this.data.certNo,
									operId:this.data.operId,
									fileIds:this.data.fileIds,
									filePaths:this.data.filePaths,
									remark:this.data.remark,
									operId:this.$store.getters.operId
								}).then(res => {
									let {
										ret,
										message
									} = res;
									if(ret == 0) {
										this.finalAudit();
									}else{
										this.tiptext = message
										this.showStatus=6;
										$("#myModal2").modal("show")
									}
								})
							break;
						case 'shareholderinfoChange': //股东信息变更
								ApiService.Registrationmanagement.saveRiskFile({
									businessKey:this.$route.query.businessKey,
									orderId:this.data.operId,
									businessName:'股东清册管理',
									attachment:this.filePaths
								}).then(res => {
									let {
										ret,
										message
									} = res;
									if(ret == 0) {
										this.finalAudit();
									}else{
										this.tiptext = message
										this.showStatus=6;
										$("#myModal2").modal("show")
									}
								})
							
							break;
						case 'companyinfoChange': //企业信息变更
								ApiService.BusinessDealt.registerFund({
									businessKey:this.$route.query.businessKey,
									flag:'2',
									fundCode:this.data.fundCode,
									fundName:this.data.fundName,
									fundAbbr:this.data.fundAbbr,
									fundType:this.data.fundType,
									fundClass:this.data.fundClass,
									account:this.data.account,
									isOriginal:this.businesslist[0].isOriginal,
									totalShares:this.businesslist[0].totalShares,
									registerShares:this.businesslist[0].registerShares,
									faceValue:'1',
									fileIds:this.data.fileIds,
									filePaths:this.data.filePaths,
//									remark:this.data.remark,
									operId:this.$store.getters.operId
								}).then(res => {
									let {
										ret,
										message
									} = res;
									if(ret == 0) {
										this.finalAudit();
									}else{
										this.tiptext = message
										this.showStatus=6;
										$("#myModal2").modal("show")
									}
								})
							break;
						default:
							break;
					}
				}else{
					this.finalAudit();
				}
			},
			finalAudit(){
				console.log("传入的参数",this.parameter)
				ApiService.todo.complete(this.parameter).then(res => {
					let {
						ret,
						message
					} = res;
					if(ret == 0) {
						this.tiptext = '审核成功'
						this.showStatus=5;
						$("#myModal2").modal("show")
					}else{
						this.tiptext = message
						this.showStatus=6;
						$("#myModal2").modal("show")
					}
				})
			},
			//上传文件
			triggerFile() {
				$("#otherfile").trigger('click');
	        },
			uploadFileFun(e){
	            const fileName = this.fileName;
	            const file =  e.target.files[0];
	             ApiService.files.uploadFile(file,'postfile').then(response => {
	                let {
	                     data,
	                     message,
	                     ret
	                 } = response;
	                if (ret==0) {
	                	//上传成功 赋值参数
						this.counterProvefileId = data.fileId;
						this.counterProvefilePath = data.filePath;
						this.counterProvefileName = file.name;
	                };
	                 e.target.parentNode.reset()
	             })
			},
			//下载文件
			downloadFile(){
				if(this.counterProvefilePath){
					ApiService.common.downloadFile({
						fileName:this.counterProvefileName,
						filePath:this.counterProvefilePath
					}).then(response => {})
				}

			},
			//股东文件上传
			triggerFile2() {
	            $("#shareholderfile").trigger('click');
	       },
			uploadFileFun2(e){
	            const fileName = this.fileName;
	            const file =  e.target.files[0];
	             ApiService.files.uploadFile(file,'postfile').then(response => {
	                let {
	                     data,
	                     message,
	                     ret
	                 } = response;
	                if (ret==0) {
	                	//上传成功 赋值参数
						this.counterProvefileId = data.fileId;
						this.counterProvefilePath = data.filePath;
						this.counterProvefileName = file.name;
	                };
	                 e.target.parentNode.reset()
	             })
				
//				ApiService.common.downloadFile({
//					fileName:this.shareholderFileName,
//					filePath:this.shareholderFilePath
//				}).then(response => {})
				
			},
			//审核文件下载
			download(index){
				ApiService.common.downloadFile({
					fileName:this.fileslist[index].filename,
					filePath:this.fileslist[index].filepath
				}).then(response => {})
			},
			enterprisedownload(){
				ApiService.common.Company({
					account:this.data.account,
					fundCode:this.data.fundCode,
					fundName:this.data.fundName,
					fundAbbr:this.data.fundAbbr,
					fundType:this.data.fundType,
					isOriginal:this.data.isOriginal,
					totalShares:this.data.totalShares,
					registerShares:'',
					faceValue:'1',
				}).then(res => {
				})	
			},
			//创建产品
			createproduct() {
				ApiService.Registrationmanagement.registerFund({
					businessKey: this.$route.query.businessKey,
					flag: 1,
					account: this.data.account,
					fundCode: this.data.fundCode,
					fundName: this.data.fundName,
					fundAbbr: this.data.fundAbbr,
					fundType: this.data.fundType,
					fundClass: this.data.fundClass,
					isOriginal: this.data.isOriginal,
					totalShares:this.data.totalShares,
					registerShares:'',
					faceValue:'1',
					fileIds:'1',
					filePaths:'1',
					operId:this.$store.getters.operId,
				}).then(res => {
					let {
						ret,
						data,
						message
					} = res;
					if(ret == 0) {
						//成功
						this.fundCode = data.fundCode;
						this.created = true;
						$("#myModal2").modal("show");
						this.showStatus = 2;
					}else{
						this.tiptext = message
						this.showStatus=6;
						$("#myModal2").modal("show")
					}
				})
			},
			//开户按钮
			openAccount() {
				if(this.created == true) {
					this.$router.push({
						path: '/todo/openAccount',
						query: {'filepath': this.shareholderFilePath,
							'localFilePath': this.data.localFilePath,
							'fundCode':this.fundCode,
							'branchcode':this.data.branCode,
							'type':this.$route.query.type
						}
					});
				}
			},
			
		},
		created() {
			localStorage.processDefinitionKey = this.$route.query.processDefinitionKey;
			localStorage.businessKey = this.$route.query.businessKey;
			ApiService.todo.queryCSDetail({
				processDefinitionKey: this.$route.query.processDefinitionKey,
				businessKey: this.$route.query.businessKey,
			}).then(res => {
				let {
					ret,
					message,
					data
				} = res;
				if(ret == 0) {
					//成功
					this.data = this.postdata = data;
					if(data.filePaths){
						this.data.filePaths = JSON.parse(data.filePaths);
						this.data.fileIds = JSON.parse(data.fileIds);
					}else{
						this.data.filePaths = JSON.parse(data.filePath);
						this.data.fileIds = JSON.parse(data.fileId);
					}
					console.log("详情数据",data)
					
					//查询业务信息
					switch(this.$route.query.type) {
						case 'equityRegister': //股权初始登记
							this.titleText = '股权初始登记';			
							break;
						case 'transfer': //非交易过户
							this.titleText = '股权非交易过户';
							this.businesslist=[{
								fundCode: this.data.fundCode,
								fundName: this.data.fundName,
								outNum: this.data.outNum,
								stockNatureBefore: this.data.stockNatureBefore,
								stockNatureAfter: this.data.stockNatureAfter,
								stockNatureBeforeName: this.data.stockNatureBeforeName,
								stockNatureAfterName: this.data.stockNatureAfterName,
								transferType: this.data.transferType,
								transferTypeName:this.data.transferTypeName,
								option: this.data.remark
							}];
							break;
						case 'shareChange': //份额性质变更
							this.titleText = '股权份额性质变更';
							this.texts = '变更';
							this.businesslist=[{
								fundCode: this.data.fundCode,
								fundName: this.data.fundName,
								frostNum: this.data.frostNum,
								stockNatureBefore: this.data.stockNatureBefore,
								stockNatureAfter: this.data.stockNatureAfter,
								stockNatureBeforeName: this.data.stockNatureBeforeName,
								stockNatureAfterName: this.data.stockNatureAfterName,
								transferType: this.data.transferType,
								transferTypeName:this.data.transferTypeName,
								option: this.data.remark
							}];	
							break;
						case 'sharePledge': //份额质押
							this.titleText = '股权份额质押';
							ApiService.business.queryCustStock({
								account:this.data.account,
								pageSize:10,
								pageNumber:1
							}).then(res => {
								let {ret,message,data} = res;
								if(ret == 0) {
									//成功
									this.businesslist=[{
										fundCode: this.data.fundCode,
										fundName: this.data.fundName,
										fundType: data.items[0].fundType,
										availStock: data.items[0].availStock,
										frozenStock: data.items[0].frozenStock,
										pledgeStock: this.data.frostNum,
										option: this.data.remark
									}];
								}
							})
							break;
						case 'shareUnPledge': //份额解押
							this.titleText = '股权份额解押';
							ApiService.BusinessDealt.queryForstStream({
								account:this.data.account,
								pageSize:1,
								pageNumber:1
							}).then(res => {
								let {ret,message,data} = res;
								if(ret == 0) {
									//成功
									this.businesslist=[{
										fundCode: this.data.fundCode,
										fundName: this.data.fundName,
										stockNature: data.items[0].stockNature,
										stockNatureName: data.items[0].stockNatureName,
										fozenType: data.items[0].fozenType,
										fozenTypeName: data.items[0].fozenTypeName,
										forzenDate: data.items[0].forzenDate,
										frozenNum: data.items[0].frozenNum,
										option: this.data.remark
									}];
								}
							})
							break;
						case 'shareFreeze': //份额冻结
							this.titleText = '股权份额冻结';
							ApiService.business.queryCustStock({
								account:this.data.account,
								pageSize:10,
								pageNumber:1
							}).then(res => {
								let {ret,message,data} = res;
								if(ret == 0) {
									//成功
									this.businesslist=[{
										fundCode: this.data.fundCode,
										fundName: this.data.fundName,
										fundType: data.items[0].fundType,
										availStock: data.items[0].availStock,
										frozenStock: data.items[0].frozenStock,
										pledgeStock: this.data.frostNum,
										option: this.data.remark
									}];
								}
							})
							break;
						case 'shareUnFreeze': //份额解冻
							this.titleText = '股权份额解冻';
							ApiService.BusinessDealt.queryForstStream({
								account:this.data.account,
								pageSize:1,
								pageNumber:1
							}).then(res => {
								let {ret,message,data} = res;
								if(ret == 0) {
									//成功
									this.businesslist=[{
										fundCode: this.data.fundCode,
										fundName: this.data.fundName,
										stockNature: data.items[0].stockNature,
										stockNatureName: data.items[0].stockNatureName,
										fozenType: data.items[0].fozenType,
										fozenTypeName: data.items[0].fozenTypeName,
										forzenDate: data.items[0].forzenDate,
										frozenNum: data.items[0].frozenNum,
										option: this.data.remark
									}];
								}
							})
							break;
						case 'shareIncrease': //增资扩股
							this.titleText = '股权增资扩股';
								this.businesslist=[{
									fundCode: this.data.fundCode,
									fundName: this.data.fundName,
									fundType:this.data.fundType,
									fundTypeName:this.data.fundTypeName,
									fundClass:this.data.fundClass,
									fundClassName:this.data.fundClassName,
									firstShares:this.data.firstShares,
									totalShares:this.data.totalShares,
									option: this.data.remark
								}];							
							break;
						case 'shareAdjust': //份额调整
							this.titleText = '股权份额调整';
							ApiService.business.queryCustStock({
								account:this.data.account,
								pageSize:10,
								pageNumber:1
							}).then(res => {
								let {ret,message,data} = res;
								if(ret == 0) {
									//成功
									this.businesslist=[{
										fundCode: this.data.fundCode,
										fundName: this.data.fundName,
										fundTypeName: this.data.fundTypeName,
										stockNatureName: this.data.stockNatureName,
										adjustType: this.data.adjustType,
										adjustNum: this.data.adjustNum,
										availStock: data.items[0].availStock,
										option: this.data.remark
									}];	
								}
							})

							break;
						case 'baseinfoChange': //基本信息变更
							this.titleText = '基本信息变更';
							break;
						case 'shareholderinfoChange': //股东信息变更
							this.titleText = '股东信息变更';
							this.created = true;
							this.fundCode = this.data.fundCode;
							break;
						case 'companyinfoChange': //企业信息变更
							this.titleText = '企业信息变更';
							this.businesslist=[{
								fundAbbr: this.data.fundAbbr,
								fundName: this.data.fundName,
								fundClass: this.data.fundClass,
								fundTypeName: this.data.fundTypeName,
								fundClassName: this.data.fundClassName,
								totalShares: this.data.totalShares,
								holders: this.data.holders,
								isOriginal: this.data.isOriginal,
							}];
							break;
						default:
							break;
					}

					//文件信息
					let fileIds = this.data.fileIds,filePaths = this.data.filePaths
					this.fileslist = [];
					for (let k in fileIds){
						let arr = filePaths[k].split('/'),suffix = filePaths[k].split('.')[1];
						let project='',ifmust='',filename = arr[arr.length-1];
						switch (k){
							case 'prove':
								project='相关证明或协议';
								ifmust='必填';
								break;
							case 'verdict':
								project='判决书';
								ifmust='选填';
								break;
							case 'mediation':
								project='调解书';
								ifmust='必填';
								break;
							case 'divorceCert':
								project='离婚证书';
								ifmust='选填';
								break;
							case 'marriageSettle':
								project='财产分割协议';
								ifmust='必填';
								break;
								
							case 'businessLicense':
								project='营业执照复印件或三证合一';
								ifmust='二选一';
								break;
							case 'enRegisterForm':
								project='企业基本情况登记表';
								ifmust='必填';
								break;
							case 'stockholderForm':
								project='股东基本情况表';
								ifmust='必填';
								this.shareholderFileName = filename;
								this.shareholderFilePath = filePaths[k];
								break;
							case 'naturalRegistry':
								project='股东股权登记名册';
								ifmust='必填';
								break;
							case 'attorney':
								project='股权登记法人授权委托书';
								ifmust='必填';
								break;
							case 'undertaking':
								project='股权登记承诺书';
								ifmust='必填';
								break;
							case 'custodyAgreement':
								project='股权登记托管协议书';
								ifmust='必填';
								break;
							case 'idCard':
								project='授权人及受托人身份证正反面复印件';
								ifmust='必填';
								break;
							case 'bylaw':
								project='工商部门出具的企业章程';
								ifmust='必填';
								break;
							case 'infoQuerySheet':
								project='工商部门出具的基本信息查询单';
								ifmust='必填';
								break;
								
							case 'pledgeContract':
								project='质押、借款合同';
								ifmust='必填';
								break;
							case 'registerNotice':
								project='工商部门出具的《股权出质设立登记通知书》';
								ifmust='必填';
								break;
							case 'freezeSignle':
								project='股交中心出具的《股权质押冻结单》';
								ifmust='选填';
								break;
								
							case 'changeLetter':
								project='变更函';
								ifmust='必填';
								break;
							case 'releaseLetter':
								project='解禁函';
								ifmust='必填';
								break;
								
							case 'register':
								project='定向增资登记申请书';
								ifmust='必填';
								break;
							case 'decision':
								project='股东会决议';
								ifmust='必填';
								break;
							case 'appraisalReport':
								project='评估报告';
								ifmust='选填';
								break;
							case 'underAgree':
								project='认购协议';
								ifmust='选填';
								break;
							case 'busRegisterForm':
								project='工商登记表';
								ifmust='必填';
								break;
							case 'revise':
								project='企业章程修订案';
								ifmust='必填';
								break;
							case 'shareholder':
								project='股东身份证明';
								ifmust='必填';
								break;
							case 'permissionStock':
								project='股权限售情况说明';
								ifmust='必填';
								break;
								
							case 'businessLicense1':
								project='新营业执照正本复印件';
								ifmust='必填';
								break;	
							case 'businessLicense2':
								project='新营业执照副本复印件';
								ifmust='必填';
								break;
							case 'idCard1':
								project='新身份证件正面复印件';
								ifmust='必填';
								break;
							case 'idCard2':
								project='新身份证件背面复印件';
								ifmust='必填';
								break;
						}
						//单项意见
						let result = null, opinion = '';
						if(data.auditContent){
							let auditContent = JSON.parse(data.auditContent);
							for(let m in auditContent){
								if(m == k){
									if(auditContent[m].split("|")[1]){
										if(this.status!=1){
											result = auditContent[m].split("|")[0]
										}
										opinion = auditContent[m].split("|")[1]
									}
									if(k == 'stockholderForm'){
										if(this.status!=1){
											this.naturalRegistryAudit = auditContent[m].split("|")[0]
										}
										this.naturalRegistryOption = auditContent[m].split("|")[1]
									}
								}
								if(m == 'enRegisterForm'){
									if(this.status!=1){
										this.basicInfoAudit = auditContent[m].split("|")[0]
									}
									this.basicInfoOption = auditContent[m].split("|")[1]
								}
							}
						}
						if(k != 'counterProve' && k != 'stockholderForm'){
							this.fileslist.push({
								project: project,
								type: k,
								ifmust: ifmust,
								result: result,
								opinion: opinion,
								filename: filename,
								filepath: filePaths[k],
								suffix:suffix,
							})
						}

					}
					//上传文件信息
					if(this.data.fileIds.counterProve){
						this.counterProvefileId = this.data.fileIds.counterProve;
						this.counterProvefilePath =  this.data.filePaths.counterProve;
						let arr = this.counterProvefilePath.split("/")
						this.counterProvefileName = arr[arr.length-1]
					}
						//数据速度跟不上渲染
						setTimeout(function(){
							$("#mytable").mCustomScrollbar();
						},100)
					//查询客户信息
					if(this.data.outAccount){
						this.personlist=[];
						ApiService.business.queryCustAccount({
							account: this.data.outAccount
						}).then(res => {
							let {
								ret,
								message,
								data
							} = res;
							if(ret == 0) {
								console.log("-------------出让方信息----------",data)
								//成功
								this.personlist.push({
									role: '出让方',
									name: data.name,
									custno: data.custno,
									custTypeName: data.custTypeName,
									certTypeName: data.certTypeName,
									certNo: data.certNo,
								});
							}
						})
						ApiService.business.queryCustAccount({
							account: this.data.inAccount
						}).then(res => {
							let {
								ret,
								message,
								data
							} = res;
							if(ret == 0) {
								console.log("-------------受让方信息----------",data)
								//成功
								this.personlist.push({
									role: '受让方',
									name: data.name,
									custno: data.custno,
									custTypeName: data.custTypeName,
									certTypeName: data.certTypeName,
									certNo: data.certNo,
								})
							}
						})
					}else{
						ApiService.business.queryCustAccount({
							account: this.data.account?this.data.account:'',
							certType:this.data.certType?this.data.certType:'',
							certNo:this.data.certNo?this.data.certNo:'',
							custno:this.data.custno?this.data.custno:'',
						}).then(res => {
							let {
								ret,
								message,
								data
							} = res;
							if(ret == 0) {
								console.log("-------------基本信息----------",data)
								//成功
								if(data){
									this.personlist=[{
										role: '持有方',
										name: data.name,
										custno: data.custno,
										custTypeName: data.custTypeName,
										certTypeName: data.certTypeName,
										certType: data.certType,
										certNo: data.certNo,
									}];
									for (let k in data) {
										this.data[k] = data[k];
									}
								}
							}
						})
					}
				}
			})
			//状态
			this.status = Number(this.$route.query.status);
			if(this.$route.query.status == 3){
				this.addshow = false;
				this.addText = true;
				this.isActive = true;
			}
		},
		mounted() {
//			$("#mytable").mCustomScrollbar();
		},
		watch: {

		},
		//组件
		components: {
			operationTable,
			fileTable
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
		left: 427px !important;
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
	.detailDIV p:after {
		right: 455px !important;
	}
	
	.registrationDIV p:after {
		right: 430px !important;
	}
	
	.gqfjygh-table-div {
		padding-bottom: 0px;
	}
	
	.gqfjygh-table-div .srf-info .tb-table .tb {
		padding-bottom: 35px !important;
	}
	
	.registration-table .tb-table {
		padding-top: 30px;
	}
	
	.choice-radio {
		margin: 5px auto 0px;
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
	
	.gqfjygh-table-div .tb-next {
		padding-top: 45px;
	}
	
	.gqfjygh-table-div .table>tbody>tr>td:last-child {
		border-right: 1px solid #EBEBEB;
		padding-right: 40px !important;
		width: 100px;
	}
	
	.gqfjygh-table-div .table>tbody>tr>td:first-child {
		padding-left: 40px;
	}
	
	.gqfjygh-table-div .table>tbody>tr>td {
		padding-left: 40px;
	}
	
	.registration-table .tb-table {
		padding-top: 65px;
	}
	
	.registration-table .crf-info .tb-table .table>tbody>tr>td:last-child {
		padding-left: 30px;
	}
	
	.alignleft {
		text-align: left;
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

	.modal-dialog .modal-content .modal-body.two-row{
		height: 185px;
	}
	.modal-dialog .modal-content .modal-body.two-row p{
		margin-top: 30px;
	}
	.modal-dialog .modal-content .modal-body.two-row span{
		color: #2EBAB4;
	}
	.gqfjygh-table-div .businesstable > tbody > tr > th{
	    padding-top: 6px;
	    padding-bottom: 6px;
	}
	.gqfjygh-table-div .nopadding>tbody>tr>th>span {
		display: block;
		font-size: 14px;
	}
	.modal-dialog .modal-content .modal-body.modalselect{
		height: 185px;
	}
	.modal-dialog .modal-content .modal-body.modalselect span {
		display: inline-block;
		width: 125px;
		text-align: left;
	}
	
	.modal-dialog .modal-content .modal-body.modalselect input {
		display: inline-block;
	}
	
	.modal-dialog .modal-content .modal-body.modalselect label {
		display: inline-block;
		width: 225px;
		height: 35px;
		margin-bottom: 10px;
		text-align: left;
		padding-left: 15px;
		font-weight: normal;
	}
	.modal-dialog .modal-content .optionmodal {
	    height: 185px;
	    padding: 20px 50px;
	    font-size: 16px;
    	color: #7A7A7A;
    	text-align: right;
    	position: relative;
	}	
	.modal-dialog .modal-content .optionmodal span{
	    position: absolute;
	    left: 50px;
	    top: 38px;
	}	
	.modal-dialog .modal-content .optionmodal .textareacenter textarea{
		margin-top: 20px;
	    width: 315px;
	    height: 100px;
	    border: 1px solid #EBEBEB;
	    font-size: 14px;
	    color: #909090;
	    padding: 15px;
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