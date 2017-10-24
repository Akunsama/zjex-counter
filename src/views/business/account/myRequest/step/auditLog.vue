<template>
	<div class="">
		<div class="col-md-12 col-xs-12 col-lg-12 contentDIV">
								
					
					<div class="myRequestDIV">
						<ul>
							<li class="active">
								<div>
									<div class="circleText">提</div>
									<p class="circle"></p>
									<p class="circle2"></p>
									<p>提交</p>
								</div>
								<p><span></span><span></span><span></span><span></span><span></span><span></span></p>
							</li>
							<li>
								<div>
									<div class="circleText">审</div>
									<p class="circle"></p>
									<p class="circle2"></p>
									<p>企业审核</p>
								</div>
								<p><span></span><span></span><span></span><span></span><span></span><span></span></p>
							</li>
							<li>
								<div>
									<div class="circleText">核</div>
									<p class="circle"></p>
									<p class="circle2"></p>
									<p>中心审核</p>
								</div>
								<p><span></span><span></span><span></span><span></span><span></span><span></span></p>
							</li>
							<li>
								<div>
									<div class="circleText"><img :src="completePng"/></div>
									<p class="circle"></p>
									<p class="circle2"></p>
									<p>已完成</p>
								</div>
							</li>
						</ul>
						<img :src="requestbg" class="requestImg" />
					</div>
					
					<div class="tableDIV">
						<table class="table request-table">
						  <thead>
						    <tr>
						      <th>进程</th>
						      <th>提交时间</th>
						      <th>审核人</th>
						      <th>备注</th>
						    </tr>
						  </thead>
						  <tbody>
						    <tr>
						      <td>非交易业务单提交</td>
						      <td>2016/3/2 21:06:57</td>
						      <td>李政</td>
						      <td class="operationTD">
						      	<div class="operation">
						      		<font>查看</font>
						      		<div class="result">
						      			审核驳回：股权证明不对，没有盖章审核驳回：股权证明不对，没有盖章
						      		</div>
						      	</div>
						      </td>
						    </tr>
						    <tr>
						      <td>非交易业务单再次提交</td>
						      <td>2016/3/2 21:06:57</td>
						      <td>李政</td>
						      <td class="operationTD">
						      	<div class="operation">
						      		<font>查看</font>
						      		<div class="result">
						      			审核驳回：股权证明不对，没有盖章审核驳回：股权证明不对，没有盖章
						      		</div>
						      	</div>
						      </td>
						    </tr>
						    <tr>
						      <td>非交易业务审核</td>
						      <td>2016/3/2 21:06:57</td>
						      <td>李政</td>
						      <td class="operationTD">
						      	<div class="operation">
						      		<font>查看</font>
						      		<div class="result">
						      			审核驳回：股权证明不对，没有盖章审核驳回：股权证明不对，没有盖章
						      		</div>
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
	import requestbg from '@/assets/images/request_bg.png'
	import completePng from '@/assets/images/complete.png'

	export default {
		//组件名
		name: 'audit-log',
		//实例的数据对象
		data() {
			return {
				requestbg:requestbg,
				completePng:completePng
			}
		},
		//数组或对象，用于接收来自父组件的数据
		props: {

		},
		//方法
		methods: {
			search() {

			}
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
	.requestImg{
		position: absolute;
		top: 0;
		opacity: 1;
		z-index: -10;
		width: 100%;
	}
	.contentDIV {
		padding: 0px !important;
	}
	.myRequestDIV{
	height: 230px;
	/*background: url(../images/request_bg.png) no-repeat;*/
	background-size: 100%,100%;
	position: relative;
	padding-top: 71px;
	z-index: -2;
}
.myRequestDIV:before{
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0px;
	background: rgba(61,62,63,.85);
	z-index: -1;
}
.myRequestDIV ul{
	padding: 0px;
	margin: 0px;
	z-index: 0;
	text-align: center;
}
.myRequestDIV ul li{
	display: inline-block;
	vertical-align: super;
	position: relative;
	width: 178px;
	text-align: left;
}
.myRequestDIV ul li:last-child{
	width: inherit;
}
.myRequestDIV ul>li>div{
	display: inline-block;
}
.myRequestDIV ul>li>div:first-child{
	width: 64px;
}
.myRequestDIV ul>li>div>p{
	color: #488FFE;
	margin: 0px auto 26px;
	color: #818181;
	text-align: center;
	font-size: 16px;
}.myRequestDIV ul>li>div img{
	position: absolute;
    top: -10px;
    left: -15px;
}
.myRequestDIV ul>li>div>p.circle{
  	width: 39px;
  	height: 39px;
  	text-align: center;
  	line-height: 50px;
  	font-size: 20px;
  	color: #CBCBCC;
  	border-radius: 19px;
    opacity: 0.3;
    background-color: black;	
}
.myRequestDIV ul>li>div>p.circle2{
	position: absolute;
	top: -5px;
	left: 7px;
  	width: 50px;
  	height: 50px;
  	text-align: center;
  	line-height: 50px;
  	font-size: 20px;
  	color: #CBCBCC;
  	border-radius: 25px;
    opacity: 0.3;
    background-color: #cbcbcc;	
}
.myRequestDIV ul>li.active>div>p.circle{
  	width: 38px;
  	height: 38px;
  	text-align: center;
  	line-height: 50px;
  	font-size: 20px;
  	color: #CBCBCC;
  	border-radius: 19px;
    opacity: 1;
    background-color: #111;	
    border: 1px solid black;
}
.myRequestDIV ul>li.active>div>p{

  	color: #488FFE;
}
.myRequestDIV ul>li.active>div>p.circle2{
	position: absolute;
	top: -6px;
	left: 7px;
  	width: 50px;
  	height: 50px;
  	text-align: center;
  	line-height: 50px;
  	font-size: 20px;
  	color: #CBCBCC;
  	border-radius: 25px;
    opacity: 0.7;
    background-color: #488FFE;	
}
.myRequestDIV ul>li>div>div.circleText{
	position: absolute;
    left: 22px;
    top: 6px;
    font-size: 20px;
    color: #cbcbcc;
    z-index: 1;
}
.myRequestDIV ul>li>p{
	position: absolute;
	right: 4px;
    top: 10px;
}
.myRequestDIV ul>li>p span{
	background: #747272;
	width: 8px;
	height: 8px;
	display: inline-block;
	vertical-align: middle;
	margin: 0px 5px;
	-webkit-border-radius: 100%;
  	-moz-border-radius: 100%;
  	border-radius: 100%;
  	
}
.myRequestDIV ul>li.active>p span{
	background-color: #488FFE;	
	opacity: 0.3;
}

.tableDIV .table>tbody>tr>td.operationTD:hover ul{
	display: block;
}
.tableDIV .table>tbody>tr>td.operationTD:hover .result{
	display: block;
}
.tableDIV .table>tbody>tr>td div.operation{
	border: 1px solid #EBEBEB;
	-webkit-border-radius: 10px;
  	-moz-border-radius: 10px;
  	border-radius: 10px;
  	line-height: 25px;
  	cursor: pointer;
  	position: relative;
  	text-align: center;
  	width: 55px;
    height: 25px;
    margin: auto;
}
.tableDIV .table>tbody>tr>td div.operation:hover{
	border: 1px solid #488FFE;
}
.tableDIV .table>tbody>tr>td div.operation:hover font{
	color: #488FFE;
}
.tableDIV .table>tbody>tr>td.operationTD:hover ul{
	display: block;
}
.tableDIV .table>tbody>tr>td div.operation ul{
	position: absolute;
	margin: 0px;
	padding: 10px;
	width: 180px;
	background: #FFFFFF;
	z-index: 1;
	-webkit-transition: all 0.3s ease-in-out;
  	-moz-transition: all 0.3s ease-in-out;
  	-ms-transition: all 0.3s ease-in-out;
  	-o-transition: all 0.3s ease-in-out;
  	transition: all 0.3s ease-in-out;
  	-webkit-animation: 0.3s animationSubMenu;
  	-o-animation: 0.3s animationSubMenu;
  	animation: 0.3s animationSubMenu;
  	border: 1px solid #EBEBEB;
  	top: 30px;
    left: -130px;
    -webkit-box-shadow:0 0 5px 4px rgba(140,140,141,.15);  
    -moz-box-shadow:0 0 5px 4px rgba(140,140,141,.15);  
    box-shadow:0 0 5px 4px rgba(140,140,141,.15);  
    display: none;
}
.tableDIV .table>tbody>tr>td div.operation ul li{
	list-style: none;
	padding: 10px 20px;
	position: relative;
	text-align: left;
}
.tableDIV .table>tbody>tr>td div.operation ul li:before{
	content: ">";
    position: absolute;
    font-size: 13px;
    right: 15px;
    top: 15px;
    width: 15px;
    height: 15px;
    background: #d9d9d9;
    text-align: center;
    line-height: 14px;
    color: #FFFFFF;
    -webkit-border-radius: 100%;
  	-moz-border-radius: 100%;
  	border-radius: 100%;
}
.tableDIV .table>tbody>tr>td div.operation ul li:hover{
	color: #488ffe;
}
.tableDIV .table>tbody>tr>td div.operation ul li:hover:before{
	background: #488ffe;
}
.request-table>tbody>tr>td div.operation{
	width: 60px;
    margin: auto;
}
.request-table>tbody>tr>td div.operation .result{
	position: absolute;
	margin: 0px;
	background: #FFFFFF;
	z-index: 1;
	-webkit-transition: all 0.3s ease-in-out;
  	-moz-transition: all 0.3s ease-in-out;
  	-ms-transition: all 0.3s ease-in-out;
  	-o-transition: all 0.3s ease-in-out;
  	transition: all 0.3s ease-in-out;
  	-webkit-animation: 0.3s animationSubMenu;
  	-o-animation: 0.3s animationSubMenu;
  	animation: 0.3s animationSubMenu;
  	border: 1px solid #EBEBEB;
  	top: 30px;
    -webkit-box-shadow:0 0 5px 4px rgba(140,140,141,.15);  
    -moz-box-shadow:0 0 5px 4px rgba(140,140,141,.15);  
    box-shadow:0 0 5px 4px rgba(140,140,141,.15);  
    display: none;
    width: 350px;
    right: -40px;
    padding: 30px 25px;
    text-align: left;
}
</style>