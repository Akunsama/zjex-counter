<template>
	<div class="menu">
		<ul>
			<li>
				<img :src="dj" /><b>登记管理</b>
				<ul>
					<li>
						<router-link to="/companyMaintain" @click.native="flushCom($event)">企业类型维护</router-link>
					</li>
					<li>
						<router-link to="/equityRegister" @click.native="flushCom($event)">股权登记</router-link>
					</li>
					<li>
						<router-link to="/productManage/productManageIndex" @click.native="flushCom($event)">产品管理</router-link>
					</li>
					<li>
						<router-link to="/queryShareholder" @click.native="flushCom($event)">股东流水查询</router-link>
					</li>
				</ul>
			</li>
			<li><img :src="yw" />
				<router-link to="/businessDealt" @click.native="flushCom($event)">业务办理</router-link>
			</li>
			<li>
				<img :src="zh" /><b>账户管理</b>
				<ul>
					<li>
						<router-link to="/customerAccount" @click.native="flushCom($event)">客户开户</router-link>
					</li>
					<li>
						<router-link to="/singleCustomer" @click.native="flushCom($event)">单客户查询</router-link>
					</li>
					<li>
						<router-link to="/queryInvestor" @click.native="flushCom($event)">投资者查询</router-link>
					</li>
					<li>
						<router-link to="/visitorQuery" @click.native="flushCom($event)">游客查询</router-link>
					</li>
					<li>U-key管理</li>
				</ul>
			</li>
			<li><img :src="db" />
				<router-link to="/todo/todoIndex" @click.native="flushCom($event)">待办任务</router-link>
			</li>
		</ul>

	</div>
</template>

<script>
	import $ from 'jquery'
	import dj from '@/assets/images/dj.jpg'
	import yw from '@/assets/images/yw.jpg'
	import db from '@/assets/images/db.jpg'
	import zh from '@/assets/images/zh.jpg'
	import qx from '@/assets/images/qx.jpg'
	import sj from '@/assets/images/sj.jpg'
	import '@/../static/jquery.mCustomScrollbar.concat.min.js'

	export default {
		name: 'menu',
		data() {
			return {
				dj: dj,
				yw: yw,
				db: db,
				zh: zh,
				qx: qx,
				sj: sj,
				oncemenu: false,
			}
		},
		props: {

		},
		methods: {
			flushCom:function(e){
				if($(e.target.parentNode).hasClass("active")){
					this.$router.go(0);  
				}
				
			}
		},
		created() {
			//	    if(localStorage.oncemenu){
			//  		localStorage.oncemenu = '';
			//  		location.reload() 
			//  	}else{
			//  		localStorage.oncemenu = true
			//  	}
		},
		mounted() {
			$(".menu ul>li a").click(function() {
				$(this).parents('li').addClass("active").siblings().removeClass("active")
			});

			$(".menu").mCustomScrollbar();

		},
		beforeDestroy() {
			//  	$(".menu").unbind()

		}

	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.infoDIV .mCSB_container>ul>li a.router-link-active {
		color: #488ffe;
	}
	
	.infoDIV .mCSB_container>ul>li.active:before {
		content: "";
		width: 5px;
		height: 35px;
		background: #488ffe;
		position: absolute;
		left: -20px;
		top: 20px
	}
	
	.userinfo {
		height: 70px;
		border-bottom: 1px solid #EBEBEB;
	}
	
	.userinfo p {
		float: left;
		height: 100%;
		margin: 0px 0px 0px 20px;
		line-height: 70px;
		font-size: 16px;
		color: #666666;
	}
	
	.userinfo p.user-info {
		float: right;
		text-align: right;
		color: #7A7A7A;
		font-size: 14px;
	}
	
	.userinfo p.user-info span {
		margin-right: 20px;
		color: #488ffe;
		font-weight: bold;
	}
	
	.userinfo p.user-info img {
		width: 45px;
		height: 45px;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		border-radius: 50%;
		margin: 0px 20px;
	}
	
	.infoDIV .container {
		width: 1200px !important;
	}
	
	.infoDIV .menuDIV {
		padding: 0px !important;
		/*border-right: 1px solid #EBEBEB;*/
		border-right: none;
		margin-bottom: 75px;
	}
	
	.infoDIV .menu {
		height: 780px;
		overflow: auto;
		margin: 55px 0px 20px 0px;
	}
	
	.infoDIV .mCSB_container>ul {
		margin: 0px;
		padding: 0px;
		width: 100%;
	}
	
	.infoDIV .mCSB_container>ul>li {
		a {
			color: #7A7A7A;
			text-decoration: none
		}
		b {
			color: #7A7A7A;
			font-weight: normal;
		}
		font-size: 16px !important;
		padding: 25px 0px;
		margin: 0px 30px 0px 20px;
		list-style: none;
		border-bottom: 1px solid #EBEBEB;
		cursor: pointer;
	}
	
	.infoDIV .mCSB_container>ul>li>a:hover {
		color: #488ffe;
	}
	
	.infoDIV .mCSB_container>ul>li:last-child {
		border-bottom: none !important;
	}
	
	.infoDIV .mCSB_container ul li.active {
		position: relative;
		color: #488ffe;
	}
	
	.infoDIV .mCSB_container>ul>li.active>a {
		color: #488ffe;
	}
	
	.infoDIV .mCSB_container>ul>li.active>b {
		color: #488ffe;
	}
	
	.infoDIV .mCSB_container>ul>li img {
		width: 20px;
		height: 20px;
		margin: 0px 15px 0px 0px;
		vertical-align: sub;
	}
	
	.infoDIV .mCSB_container>ul>li>span {
		width: 20px;
		height: 20px;
		margin: 0px 15px 0px 0px;
		vertical-align: middle;
		border: 1px solid #488ffe;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		border-radius: 50%;
		display: inline-block;
	}
	
	.infoDIV .mCSB_container>ul>li>ul {
		margin: 10px 0px 0px 40px;
		padding: 0px;
	}
	
	.infoDIV .mCSB_container>ul>li>ul>li {
		list-style: none;
		padding-top: 20px;
		font-size: 14px;
		color: #7A7A7A;
		position: relative;
	}
	
	.infoDIV .mCSB_container>ul>li>ul>li>a:hover {
		color: #488FFE;
	}
	
	// .mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar{
	//  background-color: rgba(160,161,161,0.75);
	//  width: 5px !important;
	//  margin-right: 3px;
	// }
	// .mCSB_scrollTools .mCSB_dragger:active .mCSB_dragger_bar,.mCSB_scrollTools .mCSB_dragger:hover .mCSB_dragger_bar,.mCSB_scrollTools .mCSB_dragger.mCSB_dragger_onDrag .mCSB_dragger_bar{
	//  background-color: rgba(160,161,161,0.75);
	// }
	.mCSB_scrollTools a+.mCSB_draggerContainer {
		margin: 0px !important;
	}
	
	.mCSB_scrollTools .mCSB_draggerRail {
		background-color: rgba(0, 0, 0, 0) !important;
	}
</style>