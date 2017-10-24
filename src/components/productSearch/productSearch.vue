<template>
	<div>
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
	</div>
</template>

<script>
	import $ from 'jquery'

	export default {
		name: 'product-search',
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
		props: {

		},
		methods: {

		},
		created() {

		},

	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.mui-insetfocus .el-select {
		margin-right: 15px;
	}
	.mui-insetfocus .el-select {
	    width: 115px;
	}
	.searchDIV div p > span {
	    margin-left: -25px;
	}
</style>