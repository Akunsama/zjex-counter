<template>
	<div class="">
		<div class="searchDIV mui-insetfocus">
				<div>
					<p>
						<input placeholder="请输入产品名称" />
						<input placeholder="请输入产品代码" />
					</p>
					<p>
						<span>产品类型</span>
						<el-select v-model="type" placeholder="" size="small">
							<el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>

						<button class="i-yang-cha">查询</button>
					</p>
				</div>
			</div>
		
		<div class="col-md-12 col-xs-12 col-lg-12 contentDIV">
			<product-search></product-search>
			<div class="tableDIV">
              <table class="table">
                <thead>
                  <tr>
                    <th>序号</th>
                    <th>产品名称</th>
                    <th>产品代码</th>
                    <th>产品类型</th>
                    <th>份额数</th>
                    <th>可用份额</th>
                    <th>冻结份额</th>
                    <th>份额性质</th>
                    <th>业务办理</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>杭州大疆股份</td>
                    <td>090912</td>
                    <td>股份</td>
                    <td>200</td>
                    <td></td>
                    <td></td>
                    <td>流通股</td>

                    <td class="operationTD">
                      <div class="operation">
                        <font>办理</font>
                        <ul class="pwd_update">
                          <li>非交易过户</li>
                          <li>冻结</li>
                          <li>解冻</li>
                          <li>股权性质变更</li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>杭州大疆股份</td>
                    <td>090912</td>
                    <td>股份</td>
                    <td>200</td>
                    <td></td>
                    <td></td>
                    <td>流通股</td>

                    <td class="operationTD">
                      <div class="operation">
                        <font>办理</font>
                        <ul class="pwd_update">
                          <li>非交易过户</li>
                          <li>冻结</li>
                          <li>解冻</li>
                          <li>股权性质变更</li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>杭州大疆股份</td>
                    <td>090912</td>
                    <td>股份</td>
                    <td>200</td>
                    <td></td>
                    <td></td>
                    <td>流通股</td>

                    <td class="operationTD">
                      <div class="operation">
                        <font>办理</font>
                        <ul class="pwd_update">
                          <li>非交易过户</li>
                          <li>冻结</li>
                          <li>解冻</li>
                          <li>股权性质变更</li>
                        </ul>
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
		//组件名
		name: 'my-position',
		//实例的数据对象
		data() {
			return {
				types: [{
					label: '待定',
					value: '1'
				}, {
					label: '完成',
					value: '2'
				}, {
					label: '审核中',
					value: '3'
				}, ],
				type: '1'
			}
		},
		//数组或对象，用于接收来自父组件的数据
		props: {

		},
		//方法
		methods: {

		},
		created() {

		},
		mounted() {

		},
		watch: {

		},
		//组件
		components: {
		}
	}
</script>

<style scoped>
	.contentDIV {
		padding: 0px !important;
	}
	
	.mui-insetfocus .el-select {
		margin-right: 20px;
	}
	.mui-insetfocus .el-select {
	    width: 115px;
	}
	.searchDIV div p > span {
	    margin-left: -25px;
	}
</style>