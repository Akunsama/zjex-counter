<template>
	<div>
		<footer class="foot">
			<div class="container">
				<div class="row">
					<div class="col-md-4 col-xs-4 col-lg-4 foot-item1">
						<dl>
							<dt>友情链接</dt>
							<dd>浙江股权交易中心 </dd>
							<dd>股交中心综合服务平台</dd>
						</dl>
					</div>
					<div class="col-md-4 col-xs-4 col-lg-4 foot-item2">
						<dl>
							<dt>业务帮助</dt>
							<dd>操作手册</dd>
							<dd>登记规范 </dd>
							<dd>常见问题 </dd>
						</dl>
					</div>
					<div class="col-md-4 col-xs-4 col-lg-4 foot-item3">
						<dl>
							<dt>联系我们</dt>
							<dd><p><i class="fa fa-fw fa-phone"></i></p></dd>
							<dd><p><i class="fa fa-fw fa-envelope"></i></p></dd>
							<dd><p><i class="fa fa-fw fa-map-marker"></i></p></dd>
						</dl>
					</div>
				</div>
				<p class="foot-bottom">
					©2016浙江股权交易中心版权所有浙ICP备12040508号
				</p>
			</div>
		</footer>
	</div>
</template>

<script>
    export default {
        name: 'com-footer',
        data() {
            return {

            }
        },
        methods: {

        },
        mounted() {

        }
    }
</script>

<style   rel="stylesheet/scss" lang="scss" scoped>
	
.foot{
	background-color: #2c3237;
	color: #6b6e81;
	height: 210px;
}
.foot .row{
	width: 1140px !important;
	margin: auto;
	border-bottom: 1px solid #6b6e81;
	height: 150px;
}
.foot .row .foot-item1,.foot .row .foot-item2,.foot .row .foot-item3{
	padding: 25px 0px 0px 0px;
}
.foot .row .foot-item1 dl,.foot .row .foot-item2 dl{
	margin: auto;
	width: 40%;
}
.foot .row .foot-item1 dl dt{
	font-size: 14px;
	font-weight: bold;
	margin-bottom: 25px;
}
.foot .row .foot-item1 dl dd{
	font-size: 14px;
	margin-bottom: 10px;
}


.foot .row .foot-item2 dl dt{
	font-size: 14px;
	font-weight: bold;
	margin-bottom: 20px;
}
.foot .row .foot-item2 dl dd{
	font-size: 14px;
	margin-bottom: 5px;
}

.foot .row .foot-item3 dl{
	margin: auto;
	width: 60%;
}
.foot .row .foot-item3 dl dt{
	font-size: 14px;
	font-weight: bold;
	margin-bottom: 25px;
}
.foot .row .foot-item3 dl dd{
	font-size: 12px;
	margin-bottom: 10px;
	display: inline-block;
	margin-right: 20px;
}
.foot .row .foot-item3 dl dd p{
	font-size: 12px;
	margin-bottom: 10px;
	display: inline-block;
	width: 50px;
	height: 50px;
	line-height: 63px;
	text-align: center;
	background-color: #333940;
	-webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
}
.foot .row .foot-item3 dl dd p i{
	font-size: 30px;
}
.foot .foot-bottom{
	text-align: center;
	margin-top: 20px;
	font-size: 12px;
}


</style>
