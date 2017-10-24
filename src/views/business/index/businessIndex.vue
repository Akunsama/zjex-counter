<template>
	<div class="main-container">
		<!--用户信息-->
		<div class="accountCenter">
				<div class="userDIV">
					<div class="userinfo">
						<p>账户中心</p>
						<p class="user-info"><span>{{custType | custTypeFilter}}</span><img :src="headlogo"></p>
					</div>
				</div>
		</div>
		
			
	
		<div class="infoDIV">
			<div class="container">
				<div class="row">
					<div class="col-md-2 col-xs-2 col-lg-2 menuDIV">
						<com-menu></com-menu>
					</div>
					<div class="col-md-10 col-xs-10 col-lg-10 contentDIV">
						<router-view></router-view>
					</div>
				</div>
			</div>
		</div>


		
	</div>
</template>

<script>
	import comMenu from '@/components/Menu/menu.vue'
	import headlogo from '@/assets/images/head_logo.png'
	import Cookies from 'js-cookie';

    export default {
        //组件名
        name: 'business-index',
        //实例的数据对象
        data() {
            return {
            	headlogo:headlogo,
            	custType:Number(Cookies.get('custType'))
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
 			comMenu
        }
    }
</script>

<!--
	作者：liangyanxiangde@163.com
	时间：2017-03-27
	描述：统一使用less,局部样式
-->
<style scoped>
.contentDIV{
	padding-left: 0;
	border-left: 1px solid #EBEBEB;
	min-height: 800px;
	margin-bottom: 100px;
}
.main-container{
	width: 100%;
	min-width: 1200px;
	font-family: "Hiragino Sans GB", "微软雅黑", sans-serif;
	position: relative;
}
/*用户信息*/
.userDIV{
	width: 1200px;
	margin: auto;
}
.userinfo{
	height: 70px;
	border-bottom: 1px solid #EBEBEB;
}
.userinfo p{
	float: left;
	height: 100%;
	margin: 0px 0px 0px 20px;
	line-height: 70px;
	font-size: 16px;
	color: #666666;
}
.userinfo p.user-info{
	float: right;
	text-align: right;
	color: #7A7A7A;
	font-size: 14px;
}
.userinfo p.user-info span{
	margin-right: 20px;
	color: #488ffe;
	font-weight: bold;
}
.userinfo p.user-info img{
	width: 45px;
	height: 45px;
	-webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin: 0px 20px;
}




.infoDIV .container{
	width: 1200px !important;
}
.infoDIV .menuDIV{
	padding: 0px !important;
	/*border-right: 1px solid #EBEBEB;*/
	margin-bottom: 75px;
}
.infoDIV .menu{
	height: 780px;
	overflow: auto;
	margin: 55px 0px 20px 0px;
}
.infoDIV .mCSB_container>ul{
	margin: 0px;
	padding: 0px;
	width: 100%;
}
.infoDIV .mCSB_container>ul>li{
	font-size: 16px !important;
	color: #7A7A7A;
	padding: 25px 0px;
	margin: 0px 30px 0px 20px;
	list-style: none;
	border-bottom: 1px solid #EBEBEB;
}
.infoDIV .mCSB_container>ul>li:last-child{
	border-bottom: none !important;
}
.infoDIV .mCSB_container ul li.active{
	position: relative;
	color: #488ffe;
}
.infoDIV .mCSB_container>ul>li.active:before{
	content: "";
	width: 5px;
	height: 35px;
	background: #488ffe;
	position: absolute;
	left: -20px;
	top:20px
}
.infoDIV .mCSB_container>ul>li img{
	width: 20px;
	height: 20px;
	margin: 0px 15px 0px 0px;
	vertical-align: sub;
}
.infoDIV .mCSB_container>ul>li>span{
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
.infoDIV .mCSB_container>ul>li>ul{
	margin:10px 0px 0px 40px;
	padding: 0px;
}
.infoDIV .mCSB_container>ul>li>ul>li{
	list-style: none;
	padding-top: 20px;
	font-size: 14px;
	color: #7A7A7A;
}
.infoDIV .mCSB_container>ul>li>ul>li:hover{
	color: #488FFE;
}
.mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar{
	background-color: rgba(160,161,161,0.75);
	width: 5px !important;
	margin-right: 3px;
}
.mCSB_scrollTools .mCSB_dragger:active .mCSB_dragger_bar,.mCSB_scrollTools .mCSB_dragger:hover .mCSB_dragger_bar,.mCSB_scrollTools .mCSB_dragger.mCSB_dragger_onDrag .mCSB_dragger_bar{
	background-color: rgba(160,161,161,0.75);
}
.mCSB_scrollTools a + .mCSB_draggerContainer{
	margin: 0px !important;
}
.menu .mCSB_scrollTools .mCSB_draggerRail{
	width: 5px!important;
	background-color: rgba(0,0,0,0) !important;
}


</style>