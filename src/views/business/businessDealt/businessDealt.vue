<template>
	<div class="">
		<div class="businessDIV">
			<ul>
				<li :class="{active:businessindex==index}" 
					v-for="(item,index) in businessList"
					@click="selectBusiness(index)">{{item}}</li>
			</ul>
		</div>

		<div class="tableDIV">
			<div>
				<table class="table business-table">
					<thead>
						<tr>
							<th>{{businessList[businessindex]}}</th>
							<th>
								<a @click="handle"><span class="handle">办理</span></a>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td colspan="2" id="fjygh">
								<div class=" scrollserver" v-if="businessindex==0">
											<p class="part">指非交易过户则一般是因为继承、赠与和法院判决等原因而需要在投资者之间办理过户，这种情况的过户工作一般由中央登记结算公司或委托当地证券登记机构办理。非交易过户办理步骤如下：</p>
											<p>一、要求办理非交易过户(未上市证券待上市后才能过户)的双方应先去公证处办理公证。</p>
											<p>· 属继承过户的，应由公证机关出具遗产处理证明书。证明书需注明继承人和被继承人的姓名、住址、身份证号码、证券账户、继承证券名称及数量以及二者之间的社会关系。</p>
											<p>· 属赠与过户的，则需赠送人与受赠人先办理《赠与公证书》，《赠与公证书》内容包括：赠与方姓名、住址、身份证号码、证券账户及赠与说明。</p>
											<p class="part">· 属司法判决执行的过户，则需要国家司法机关出具判决协助执行书。该书须说明被剥夺证券所有权人的姓名、住址、身份证号码、证券账户。如接收方是法人则必须有法人代表证明书、法人代表有效身份证件、接受方证券账户卡。</p>
											<p>不同过户类别需要上传影像材料分类：</p>
											<p>一、财产继承</p>
											<p>· 经公证的遗产继承协议或人民法院、人民调解委员会、仲裁委员会出具的相关判决书、调解书</p>
											<p>· 受让方身份资料（若继承人为未成年人，可有法定监护人代办。过户完成后，冻结股份）</p>
											<p class="part">· 受让方费用（若继承人为未成年人，可由监护人代付）</p>
											<p>二、司法裁决</p>
											<p>· 人民法院、人民调解委员会、仲裁委员会出具的相关判决书、调解书</p>
											<p>· 协助执行通知书</p>
											<p>· 受让方身份资料</p>
											<p class="part">· 受让方费用</p>
											<p>三、赠予</p>
											<p>· 双方身份资料</p>
											<p>· 其他相关的证明或协议上传（暂时没有模板，因为是非标的）</p>
											<p class="part">·受让方费用</p>
											<p>四、协议转让</p>
											<p>· 其他相关的证明或协议上传（暂时没有模板，因为是非标的）</p>
											<p class="part">· 双方身份资料</p>
											<p>五、离婚财产协议</p>
											<p>· 离婚证书 (如需）</p>
											<p class="part">· 财产分割协议（受让方如单方提出变更申请，应提供相关公证书或人民法院、人民调解委员会、仲裁委员会出具的相关判决书或调解书）</p>
								</div>
								<div class=" scrollserver" v-if="businessindex==1">
									<p>一、要求办理非交易过户(未上市证券待上市后才能过户)的双方应先去公证处办理公证。</p>
									<p>· 属继承过户的，应由公证机关出具遗产处理证明书。证明书需注明继承人和被继承人的姓名、住址、身份证号码、证券账户、继承证券名称及数量以及二者之间的社会关系。</p>
									<p>· 属赠与过户的，则需赠送人与受赠人先办理《赠与公证书》，《赠与公证书》内容包括：赠与方姓名、住址、身份证号码、证券账户及赠与说明。</p>
									<p class="part">· 属司法判决执行的过户，则需要国家司法机关出具判决协助执行书。该书须说明被剥夺证券所有权人的姓名、住址、身份证号码、证券账户。如接收方是法人则必须有法人代表证明书、法人代表有效身份证件、接受方证券账户卡。</p>
									<p>不同过户类别需要上传影像材料分类：</p>
									<p>一、财产继承</p>
									<p>· 经公证的遗产继承协议或人民法院、人民调解委员会、仲裁委员会出具的相关判决书、调解书</p>
									<p>· 受让方身份资料（若继承人为未成年人，可有法定监护人代办。过户完成后，冻结股份）</p>
									<p class="part">· 受让方费用（若继承人为未成年人，可由监护人代付）</p>
									<p>二、司法裁决</p>
									<p>· 人民法院、人民调解委员会、仲裁委员会出具的相关判决书、调解书</p>
									<p>· 协助执行通知书</p>
									<p>· 受让方身份资料</p>
									<p class="part">· 受让方费用</p>
									<p>三、赠予</p>
									<p>· 双方身份资料</p>
									<p>· 其他相关的证明或协议上传（暂时没有模板，因为是非标的）</p>
									<p class="part">·受让方费用</p>
									<p>四、协议转让</p>
									<p>· 其他相关的证明或协议上传（暂时没有模板，因为是非标的）</p>
									<p class="part">· 双方身份资料</p>
									<p>五、离婚财产协议</p>
									<p>· 离婚证书 (如需）</p>
									<p class="part">· 财产分割协议（受让方如单方提出变更申请，应提供相关公证书或人民法院、人民调解委员会、仲裁委员会出具的相关判决书或调解书）</p>
								</div>
								<div class=" scrollserver" v-if="businessindex==2">
									<p>份额冻结</p>
									<p>一、要求办理非交易过户(未上市证券待上市后才能过户)的双方应先去公证处办理公证。</p>
									<p>· 属继承过户的，应由公证机关出具遗产处理证明书。证明书需注明继承人和被继承人的姓名、住址、身份证号码、证券账户、继承证券名称及数量以及二者之间的社会关系。</p>
									<p>· 属赠与过户的，则需赠送人与受赠人先办理《赠与公证书》，《赠与公证书》内容包括：赠与方姓名、住址、身份证号码、证券账户及赠与说明。</p>
									<p class="part">· 属司法判决执行的过户，则需要国家司法机关出具判决协助执行书。该书须说明被剥夺证券所有权人的姓名、住址、身份证号码、证券账户。如接收方是法人则必须有法人代表证明书、法人代表有效身份证件、接受方证券账户卡。</p>
									<p>不同过户类别需要上传影像材料分类：</p>
									<p>一、财产继承</p>
									<p>· 经公证的遗产继承协议或人民法院、人民调解委员会、仲裁委员会出具的相关判决书、调解书</p>
									<p>· 受让方身份资料（若继承人为未成年人，可有法定监护人代办。过户完成后，冻结股份）</p>
									<p class="part">· 受让方费用（若继承人为未成年人，可由监护人代付）</p>
									<p>二、司法裁决</p>
									<p>· 人民法院、人民调解委员会、仲裁委员会出具的相关判决书、调解书</p>
									<p>· 协助执行通知书</p>
									<p>· 受让方身份资料</p>
									<p class="part">· 受让方费用</p>
									<p>三、赠予</p>
									<p>· 双方身份资料</p>
									<p>· 其他相关的证明或协议上传（暂时没有模板，因为是非标的）</p>
									<p class="part">·受让方费用</p>
									<p>四、协议转让</p>
									<p>· 其他相关的证明或协议上传（暂时没有模板，因为是非标的）</p>
									<p class="part">· 双方身份资料</p>
									<p>五、离婚财产协议</p>
									<p>· 离婚证书 (如需）</p>
									<p class="part">· 财产分割协议（受让方如单方提出变更申请，应提供相关公证书或人民法院、人民调解委员会、仲裁委员会出具的相关判决书或调解书）</p>
								</div>
								<div class=" scrollserver" v-if="businessindex==3">
									<p>份额解冻</p>
									<p>一、要求办理非交易过户(未上市证券待上市后才能过户)的双方应先去公证处办理公证。</p>
									<p>· 属继承过户的，应由公证机关出具遗产处理证明书。证明书需注明继承人和被继承人的姓名、住址、身份证号码、证券账户、继承证券名称及数量以及二者之间的社会关系。</p>
									<p>· 属赠与过户的，则需赠送人与受赠人先办理《赠与公证书》，《赠与公证书》内容包括：赠与方姓名、住址、身份证号码、证券账户及赠与说明。</p>
									<p class="part">· 属司法判决执行的过户，则需要国家司法机关出具判决协助执行书。该书须说明被剥夺证券所有权人的姓名、住址、身份证号码、证券账户。如接收方是法人则必须有法人代表证明书、法人代表有效身份证件、接受方证券账户卡。</p>
									<p>不同过户类别需要上传影像材料分类：</p>
									<p>一、财产继承</p>
									<p>· 经公证的遗产继承协议或人民法院、人民调解委员会、仲裁委员会出具的相关判决书、调解书</p>
									<p>· 受让方身份资料（若继承人为未成年人，可有法定监护人代办。过户完成后，冻结股份）</p>
									<p class="part">· 受让方费用（若继承人为未成年人，可由监护人代付）</p>
									<p>二、司法裁决</p>
									<p>· 人民法院、人民调解委员会、仲裁委员会出具的相关判决书、调解书</p>
									<p>· 协助执行通知书</p>
									<p>· 受让方身份资料</p>
									<p class="part">· 受让方费用</p>
									<p>三、赠予</p>
									<p>· 双方身份资料</p>
									<p>· 其他相关的证明或协议上传（暂时没有模板，因为是非标的）</p>
									<p class="part">·受让方费用</p>
									<p>四、协议转让</p>
									<p>· 其他相关的证明或协议上传（暂时没有模板，因为是非标的）</p>
									<p class="part">· 双方身份资料</p>
									<p>五、离婚财产协议</p>
									<p>· 离婚证书 (如需）</p>
									<p class="part">· 财产分割协议（受让方如单方提出变更申请，应提供相关公证书或人民法院、人民调解委员会、仲裁委员会出具的相关判决书或调解书）</p>
								</div>
								<div class=" scrollserver" v-if="businessindex==4">
									<p>份额质押</p>
									<p>一、要求办理非交易过户(未上市证券待上市后才能过户)的双方应先去公证处办理公证。</p>
									<p>· 属继承过户的，应由公证机关出具遗产处理证明书。证明书需注明继承人和被继承人的姓名、住址、身份证号码、证券账户、继承证券名称及数量以及二者之间的社会关系。</p>
									<p>· 属赠与过户的，则需赠送人与受赠人先办理《赠与公证书》，《赠与公证书》内容包括：赠与方姓名、住址、身份证号码、证券账户及赠与说明。</p>
									<p class="part">· 属司法判决执行的过户，则需要国家司法机关出具判决协助执行书。该书须说明被剥夺证券所有权人的姓名、住址、身份证号码、证券账户。如接收方是法人则必须有法人代表证明书、法人代表有效身份证件、接受方证券账户卡。</p>
									<p>不同过户类别需要上传影像材料分类：</p>
									<p>一、财产继承</p>
									<p>· 经公证的遗产继承协议或人民法院、人民调解委员会、仲裁委员会出具的相关判决书、调解书</p>
									<p>· 受让方身份资料（若继承人为未成年人，可有法定监护人代办。过户完成后，冻结股份）</p>
									<p class="part">· 受让方费用（若继承人为未成年人，可由监护人代付）</p>
									<p>二、司法裁决</p>
									<p>· 人民法院、人民调解委员会、仲裁委员会出具的相关判决书、调解书</p>
									<p>· 协助执行通知书</p>
									<p>· 受让方身份资料</p>
									<p class="part">· 受让方费用</p>
									<p>三、赠予</p>
									<p>· 双方身份资料</p>
									<p>· 其他相关的证明或协议上传（暂时没有模板，因为是非标的）</p>
									<p class="part">·受让方费用</p>
									<p>四、协议转让</p>
									<p>· 其他相关的证明或协议上传（暂时没有模板，因为是非标的）</p>
									<p class="part">· 双方身份资料</p>
									<p>五、离婚财产协议</p>
									<p>· 离婚证书 (如需）</p>
									<p class="part">· 财产分割协议（受让方如单方提出变更申请，应提供相关公证书或人民法院、人民调解委员会、仲裁委员会出具的相关判决书或调解书）</p>
								</div>
								<div class=" scrollserver" v-if="businessindex==5">
									<p>份额解押</p>
									<p>一、要求办理非交易过户(未上市证券待上市后才能过户)的双方应先去公证处办理公证。</p>
									<p>· 属继承过户的，应由公证机关出具遗产处理证明书。证明书需注明继承人和被继承人的姓名、住址、身份证号码、证券账户、继承证券名称及数量以及二者之间的社会关系。</p>
									<p>· 属赠与过户的，则需赠送人与受赠人先办理《赠与公证书》，《赠与公证书》内容包括：赠与方姓名、住址、身份证号码、证券账户及赠与说明。</p>
									<p class="part">· 属司法判决执行的过户，则需要国家司法机关出具判决协助执行书。该书须说明被剥夺证券所有权人的姓名、住址、身份证号码、证券账户。如接收方是法人则必须有法人代表证明书、法人代表有效身份证件、接受方证券账户卡。</p>
									<p>不同过户类别需要上传影像材料分类：</p>
									<p>一、财产继承</p>
									<p>· 经公证的遗产继承协议或人民法院、人民调解委员会、仲裁委员会出具的相关判决书、调解书</p>
									<p>· 受让方身份资料（若继承人为未成年人，可有法定监护人代办。过户完成后，冻结股份）</p>
									<p class="part">· 受让方费用（若继承人为未成年人，可由监护人代付）</p>
									<p>二、司法裁决</p>
									<p>· 人民法院、人民调解委员会、仲裁委员会出具的相关判决书、调解书</p>
									<p>· 协助执行通知书</p>
									<p>· 受让方身份资料</p>
									<p class="part">· 受让方费用</p>
									<p>三、赠予</p>
									<p>· 双方身份资料</p>
									<p>· 其他相关的证明或协议上传（暂时没有模板，因为是非标的）</p>
									<p class="part">·受让方费用</p>
									<p>四、协议转让</p>
									<p>· 其他相关的证明或协议上传（暂时没有模板，因为是非标的）</p>
									<p class="part">· 双方身份资料</p>
									<p>五、离婚财产协议</p>
									<p>· 离婚证书 (如需）</p>
									<p class="part">· 财产分割协议（受让方如单方提出变更申请，应提供相关公证书或人民法院、人民调解委员会、仲裁委员会出具的相关判决书或调解书）</p>
								</div>
								<div class=" scrollserver" v-if="businessindex==6">
									<p>份额调整</p>
									<p>一、要求办理非交易过户(未上市证券待上市后才能过户)的双方应先去公证处办理公证。</p>
									<p>· 属继承过户的，应由公证机关出具遗产处理证明书。证明书需注明继承人和被继承人的姓名、住址、身份证号码、证券账户、继承证券名称及数量以及二者之间的社会关系。</p>
									<p>· 属赠与过户的，则需赠送人与受赠人先办理《赠与公证书》，《赠与公证书》内容包括：赠与方姓名、住址、身份证号码、证券账户及赠与说明。</p>
									<p class="part">· 属司法判决执行的过户，则需要国家司法机关出具判决协助执行书。该书须说明被剥夺证券所有权人的姓名、住址、身份证号码、证券账户。如接收方是法人则必须有法人代表证明书、法人代表有效身份证件、接受方证券账户卡。</p>
									<p>不同过户类别需要上传影像材料分类：</p>
									<p>一、财产继承</p>
									<p>· 经公证的遗产继承协议或人民法院、人民调解委员会、仲裁委员会出具的相关判决书、调解书</p>
									<p>· 受让方身份资料（若继承人为未成年人，可有法定监护人代办。过户完成后，冻结股份）</p>
									<p class="part">· 受让方费用（若继承人为未成年人，可由监护人代付）</p>
									<p>二、司法裁决</p>
									<p>· 人民法院、人民调解委员会、仲裁委员会出具的相关判决书、调解书</p>
									<p>· 协助执行通知书</p>
									<p>· 受让方身份资料</p>
									<p class="part">· 受让方费用</p>
									<p>三、赠予</p>
									<p>· 双方身份资料</p>
									<p>· 其他相关的证明或协议上传（暂时没有模板，因为是非标的）</p>
									<p class="part">·受让方费用</p>
									<p>四、协议转让</p>
									<p>· 其他相关的证明或协议上传（暂时没有模板，因为是非标的）</p>
									<p class="part">· 双方身份资料</p>
									<p>五、离婚财产协议</p>
									<p>· 离婚证书 (如需）</p>
									<p class="part">· 财产分割协议（受让方如单方提出变更申请，应提供相关公证书或人民法院、人民调解委员会、仲裁委员会出具的相关判决书或调解书）</p>
								</div>
								<div class=" scrollserver" v-if="businessindex==7">
									<p>份额调整</p>
									<p>一、要求办理非交易过户(未上市证券待上市后才能过户)的双方应先去公证处办理公证。</p>
									<p>· 属继承过户的，应由公证机关出具遗产处理证明书。证明书需注明继承人和被继承人的姓名、住址、身份证号码、证券账户、继承证券名称及数量以及二者之间的社会关系。</p>
									<p>· 属赠与过户的，则需赠送人与受赠人先办理《赠与公证书》，《赠与公证书》内容包括：赠与方姓名、住址、身份证号码、证券账户及赠与说明。</p>
									<p class="part">· 属司法判决执行的过户，则需要国家司法机关出具判决协助执行书。该书须说明被剥夺证券所有权人的姓名、住址、身份证号码、证券账户。如接收方是法人则必须有法人代表证明书、法人代表有效身份证件、接受方证券账户卡。</p>
									<p>不同过户类别需要上传影像材料分类：</p>
									<p>一、财产继承</p>
									<p>· 经公证的遗产继承协议或人民法院、人民调解委员会、仲裁委员会出具的相关判决书、调解书</p>
									<p>· 受让方身份资料（若继承人为未成年人，可有法定监护人代办。过户完成后，冻结股份）</p>
									<p class="part">· 受让方费用（若继承人为未成年人，可由监护人代付）</p>
									<p>二、司法裁决</p>
									<p>· 人民法院、人民调解委员会、仲裁委员会出具的相关判决书、调解书</p>
									<p>· 协助执行通知书</p>
									<p>· 受让方身份资料</p>
									<p class="part">· 受让方费用</p>
									<p>三、赠予</p>
									<p>· 双方身份资料</p>
									<p>· 其他相关的证明或协议上传（暂时没有模板，因为是非标的）</p>
									<p class="part">·受让方费用</p>
									<p>四、协议转让</p>
									<p>· 其他相关的证明或协议上传（暂时没有模板，因为是非标的）</p>
									<p class="part">· 双方身份资料</p>
									<p>五、离婚财产协议</p>
									<p>· 离婚证书 (如需）</p>
									<p class="part">· 财产分割协议（受让方如单方提出变更申请，应提供相关公证书或人民法院、人民调解委员会、仲裁委员会出具的相关判决书或调解书）</p>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

		</div>

	</div>
</template>

<script>
		
	export default {
		name: 'business-dealt-index',
		data() {
			return {
				businessList:['非交易过户','份额性质变更','份额冻结','份额解冻','份额质押','份额解押','份额调整','增资扩股'],
				businessindex:0,
			}
		},
		props: {

		},
		methods: {
			selectBusiness(index){
				this.businessindex=index;
			},
			handle() {
				// this.$router.push(this.routerList[this.businessindex])
				this.$store.commit('SET_BUSINESSTYPE', this.businessList[this.businessindex]);
				
				if (this.businessList[this.businessindex]=='增资扩股') {
					this.$router.push('/businessDealt/increaseShare')
				}else{
					this.$router.push('/businessDealt/handlePage')
				};
				
			}
		},
		created() {
			this.businessList.forEach((item,index) => {
				if (item==this.$route.query.businessType) {
					 this.selectBusiness(index)
				};
			})

		},
		mounted() {
			$('.scrollserver').mCustomScrollbar()
		},
		watch: {

		},
		components: {

		}
	}
</script>

<style scoped>
	.businessDIV {
		height: 105px;
		padding: 35px 0px 0px;
	}
	
	.businessDIV ul {
		margin: 0px auto 0px;
		padding: 0px;
		text-align: center;
	}
	
	.businessDIV ul li {
		list-style: none;
		display: inline-block;
		margin: 0px 10px;
		padding: 7px 10px;
		border: 1px solid #EBEBEB;
		-webkit-border-radius: 15px;
		-moz-border-radius: 15px;
		border-radius: 15px;
		text-align: center;
		-webkit-transition: all 0.2s ease-in-out;
		-moz-transition: all 0.2s ease-in-out;
		-ms-transition: all 0.2s ease-in-out;
		-o-transition: all 0.2s ease-in-out;
		transition: all 0.2s ease-in-out;
		cursor: pointer;
		color: #909090;
	}
	
	.businessDIV ul li:hover,
	.businessDIV ul li.active {
		color: #488FFE;
		border: 1px solid #488FFE;
	}
	
	.business-table>thead>tr>th {
		padding: 16px 0px 16px 75px !important;
	}
	
	.business-table>thead>tr>th:last-child {
		text-align: right !important;
		padding: 16px 30px 16px 0px !important;
	}
	
	.business-table>tbody>tr>td#fjygh {
		padding: 0;
		border-top: none !important;
	}
	
	.business-table>tbody>tr>td>div {
		height: 440px;
		overflow: auto;
		padding: 30px 0px 30px 70px;
	}
	
	.business-table>tbody>tr>td>div p {
		width: 855px;
		margin: 0 0 5px;
	}
	
	.business-table>tbody>tr>td>div p.part {
		padding-bottom: 20px;
	}
	
	.userinfo-table>thead>tr>th:last-child span,
	.business-table>thead>tr>th:last-child span {
		-webkit-border-radius: 10px;
		-moz-border-radius: 10px;
		border-radius: 10px;
		-webkit-transition: all 0.2s ease-in-out;
		-moz-transition: all 0.2s ease-in-out;
		-ms-transition: all 0.2s ease-in-out;
		-o-transition: all 0.2s ease-in-out;
		transition: all 0.2s ease-in-out;
		cursor: pointer;
		border: 1px solid #488FFE;
		background: #488FFE;
		color: #FFFFFF;
		font-size: 14px;
		width: 55px;
		height: 25px;
		display: block;
		float: right;
		text-align: center;
		line-height: 25px;
		margin-top: -2px;
	}	
	.business-table>thead>tr>th:last-child span:hover {
		background-color: #4c7cff;
	}
	/*滚动条*/
	/*	#scrollbar {
		width: 1000px;
		height: 440px;
		display: inline-block;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}*/
	/*凹槽宽度*/
	/*#scrollbar::-webkit-scrollbar {
		width: 5px;
		height: 8px;
	}*/
	/*拖动条*/
	/*	#scrollbar::-webkit-scrollbar-thumb {
		background-color: #ccc;
		border-radius: 6px;
	}*/
	/*背景槽*/
	/*#scrollbar::-webkit-scrollbar-track {
		background-color: #fff;
		border-radius: 6px;
	}*/
</style>