<template>
	<div class="">
		<div class="gqfjyghDIV registrationDIV">
			<p>消息中心</p>
			<img :src="gqfjygh" class="gqfjyghImg" />
		</div>

		<div class="gqfjygh-table-div">
			<div class="crf-info">
				<div class="title">
					消息中心
				</div>
				<table class="newstable">
					<tr v-for="item in list">
						<td><i><img src="./images/消息.png"/></i></td>
						<td><span>[{{item.tip}}]</span>{{item.content}}</td>
						<td>{{item.time}}</td>
					</tr>
				</table>
				

			</div>

		</div>
	

   </div>
</template>

<script>
	import gqfjygh from '@/assets/images/gqfjygh.png'

	export default {
		//组件名
		name: 'my-news',
		//实例的数据对象
		data() {
			return {
				gqfjygh:gqfjygh,
				list:[{
					tip:'提示',
					content:'这是一条消息',
					time:'2017/08/07'
				},{
					tip:'提示',
					content:'这是一条消息',
					time:'2017/08/07'
				},{
					tip:'业务撤回',
					content:'这是一条消息',
					time:'2017/08/07'
				},{
					tip:'登录密码修改',
					content:'这是一条消息',
					time:'2017/08/07'
				},]

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
	.gqfjyghDIV p:before {
	    left: 450px;
	}
	.gqfjyghDIV p:after {
	    left: 530px;
	}
	.newstable{
		width: 100%;
		border-top: 1px solid #EBEBEB;
	}
	 .newstable>tr:nth-of-type(even){
	    background-color: #fcfcfc;
	 }
	 .newstable>tr{
    	 border-bottom: 1px solid #EBEBEB;
 	}
	.newstable>tr>td{
	     padding: 0px 10px 0px 0px;
	     font-size: 14px;
	     color: #909090;
	     height: 55px;
	     vertical-align: middle;
	}	
	.newstable>tr>td>span{
	    color: #488ffe;
	    margin-right: 25px;
	}
	.newstable>tr>td:first-child{
	    padding-left: 35px;
	    width: 60px;
	}
	.newstable>tr>td:last-child{
		width: 180px;
	    padding-right: 35px;
	    text-align: right;
	    font-size: 14px;
	}
</style>