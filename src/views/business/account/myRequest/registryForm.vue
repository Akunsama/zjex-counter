<template>
	<div class="">
		<div class="col-md-12 col-xs-12 col-lg-12 contentDIV">
					<div class="gqfjyghDIV detailDIV">
						<p>股权登记</p>
					</div>
					
					<div class="tableDIV detailDIV">
						<div class="detail-step1" v-if="step===1">
							<table class="table detail-step1-table">
							  <thead>
								    <tr>
								      <th colspan="4">企业基本情况登记表</th>
								    </tr>
								  </thead>
								  <tbody>
								    <tr>
								      <td>企业全称</td>
								      <td>123</td>
								      <td>企业简称</td>
								      <td>123</td>
								    </tr>
								    <tr>
								      <td>法定代表人</td>
								      <td>12</td>
								      <td>联系电话</td>
								      <td>14134234234</td>
								    </tr>
								    <tr>
								      <td>企业电子邮箱</td>
								      <td>234234234</td>
								      <td>企业网址</td>
								      <td>234234234</td>
								    </tr>
								    <tr>								      
								      <td>营业执照号码</td>
								      <td>234234234</td>
								      <td>注册时间</td>
								      <td>234234234</td>
								    </tr>
								    <tr>								      
								      <td>企业住址</td>
								      <td colspan="3">234234</td>
								    </tr>
								    <tr>								      
								      <td>工商注册地</td>
								      <td>234234</td>
								      <td>注册资本</td>
								      <td>234234</td>
								    </tr>
								  </tbody>
							</table>
							
						</div>
						<div class="detail-step2" v-if="step===2">
							<table class="table">
							  <thead>
							    <tr>
							    	<th>序号</th>
							      <th>结果</th>
							      <th>客户名称</th>
							      <th>客户简称</th>
							      <th>份额性质</th>
							      <th>产品数量</th>
							      <th class="text-right">详情</th>
							    </tr>
							  </thead>
							  <tbody>
							    <tr>
							    	<td>1</td>
							      <td>成功</td>
							      <td>aelio</td>
							      <td>aelio</td>
							      <td>股权</td>
							      <td>10000</td>
							      <td class="text-center"><button class="btn-sm2">查看</button></td>
							    </tr>
							    <tr>
							    	<td>1</td>
							      <td>成功</td>
							      <td>aelio</td>
							      <td>aelio</td>
							      <td>股权</td>
							      <td>10000</td>
							      <td class="text-center"><button class="btn-sm2">查看</button></td>
							    </tr>
							    <tr>
							    	<td>1</td>
							      <td>成功</td>
							      <td>aelio</td>
							      <td>aelio</td>
							      <td>股权</td>
							      <td>10000</td>
							      <td class="text-center"><button class="btn-sm2">查看</button></td>
							    </tr>
							  </tbody>
							</table>
						</div>
						<div class="detail-step3" v-if="step===3">
							<table class="table data-table-no-border">
								  <thead>
								    <tr>
								      <th>影印件</th>
								      <th></th>
								    </tr>
								  </thead>
								  <tbody>
								    <tr>
								      <td>企业基本情况登记表 （加盖企业公章）</td>
								      <td><button class="btn-sm2">下载</button></td>
								    </tr>
								    <tr>
								      <td>股东基本情况表（加盖企业公章）</td>
								      <td><button class="btn-sm2">下载</button></td>
								    </tr>
								    <tr>
								      <td>自然人股东股权登记名册（加盖企业公章）</td>
								      <td><button class="btn-sm2">下载</button></td>
								    </tr>
								    <tr>
								      <td>法人股东股权登记名册（加盖企业公章）</td>
								      <td><button class="btn-sm2">下载</button></td>
								    </tr>
								    <tr>
								      <td>股权登记法人授权委托书（加盖企业公章）</td>
								      <td><button class="btn-sm2">下载</button></td>
								    </tr>
								    <tr>
								      <td>股权登记承诺书（加盖企业公章）</td>
								      <td><button class="btn-sm2">下载</button></td>
								    </tr>
								    <tr>
								      <td>股权登记托管协议书（加盖企业公章）</td>
								      <td><button class="btn-sm2">下载</button></td>
								    </tr>
								    <tr>
								      <td>授权人及受托人身份证正反面复印件（加盖企业公章）</td>
								      <td><button class="btn-sm2">下载</button></td>
								    </tr>
								    <tr>
								      <td>企业章程（市场监督管理局（工商部门）盖章）</td>
								      <td><button class="btn-sm2">下载</button></td>
								    </tr>
								    <tr>
								      <td>工商部门出具的基本信息查询单（含股东及高管信息）</td>
								      <td><button class="btn-sm2">下载</button></td>
								    </tr>
								  </tbody>
							</table>
						</div>
						<p class="btn-next">
								<button @click="back">返回</button><button class="step-next" @click="next">{{nextText}}</button>
						</p>
					</div>	

        </div>
	</div>
</template>

<script>
	import statusSearch from '@/components/statusSearch/statusSearch'
	import statusTable from '@/components/statusTable/statusTable'

    export default {
        //组件名
        name: 'registry-form',
        //实例的数据对象
        data() {
            return {
				step:1,
//				nextText:'下一步',
            }
        },
        //数组或对象，用于接收来自父组件的数据
        props: {

        },
        //方法
        methods: {
			next(){
				if(this.step<3){
					this.step++
				}
				
			},
			back(){
				if(this.step>1){
					this.step--
				}
			}
        },
        created() {


        },
        mounted() {
  

        },
        computed:{
        	nextText(){
				if(this.step==3){
					return '完成'
				}else{
					return '下一步'
				}
			}
        },
        watch: {
			
        },
        //组件
        components: {
 			statusSearch,
 			statusTable,
        }
    }
</script>

<style scoped>
.contentDIV{
	padding: 0px !important;
}



.gqfjyghDIV{
	height: 105px;
	line-height: 105px;	
	/*background: url(../images/gqfjygh.png) no-repeat center;*/
	background-size: 100%,100%;
	position: relative;
	z-index: -2;
}
.gqfjyghDIV:before{
	content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background: rgba(61,62,63,.85);
    z-index: -1;
}
.gqfjyghDIV p{
	font-size: 16px;
	text-align: center;
	z-index: 0;
	color: #FFFFFF;
	margin: 0px;
	position: relative;
}   
.gqfjyghDIV p:before{
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
.detailDIV p:before{
	left: 455px !important;
}
.registrationDIV p:before{
	left: 445px !important;
}
.gqfjyghDIV p:after{
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
.detailDIV p:after{
	right: 455px !important;
}
.registrationDIV p:after{
	right: 445px !important;
}
.gqfjygh-table-div{
	border-left: 1px solid #EBEBEB;
	margin-bottom: 75px;
}	
.gqfjygh-table-div .title{
	text-align: left !important;
	padding: 0px 0px 0px 30px;
	height: 55px;
	line-height: 55px;
	background: #f8fbfb;
	font-size: 16px;
    color: #666666;
}
.gqfjygh-table-div .tb-search{
	text-align: center;
	padding: 30px 0px 38px 0px;
}
.gqfjygh-table-div .tb-search input{
	vertical-align: middle;
	width: 190px;
    height: 35px;
    padding: 15px;
    border: 1px solid #EBEBEB;
    font-size: 14px;
    color: #909090;
    margin: 0px 10px;
}
.gqfjygh-table-div .tb-search button{
	vertical-align: middle;
	margin-left: 25px;
	width: 115px;
    height: 35px;
    text-align: center;
    font-size: 16px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}
.gqfjygh-table-div .tb-table .tb{
	padding: 10px 50px 55px 50px;
}
.gqfjygh-table-div .tb-table .tb .tb-title{
	height: 45px;
	border-top: 1px solid #EBEBEB;
	border-left: 1px solid #EBEBEB;
	border-right: 1px solid #EBEBEB;
	position: relative;
}
.gqfjygh-table-div .tb-table .tb .tb-title p{
	background: #FFFFFF;
	position: absolute;
	top: -20px;
	left: -11px;
	margin: 0;
	padding: 10px 15px 10px 0px;
	color: #2EBAB4;
}
.gqfjygh-table-div .tb-table .tb .tb-title p img{
	vertical-align: middle;
	margin-right: 10px;
}
.gqfjygh-table-div .table>tbody>tr>td{
	padding-left: 40px;
}
.gqfjygh-table-div .table>tbody>tr>td:first-child{
	border-left: 1px solid #EBEBEB;
}
.gqfjygh-table-div .table>tbody>tr>td:last-child{
	border-right: 1px solid #EBEBEB;
	width: 220px;
}
.gqfjygh-table-div .table.odd>tbody>tr:nth-of-type(even){
	background: #FFFFFF !important;
}
.gqfjygh-table-div .table.odd>tbody>tr:nth-of-type(odd){
	background: #fcfcfc !important;
}
.gqfjygh-table-div .tb2 .table.odd{
	margin-bottom: 0px !important;
}
.gqfjygh-table-div .tb2 .table.odd>tbody>tr:last-child>td{
	border-bottom: none;
	width: 150px;
}
.gqfjygh-table-div .tb2 .table.odd>tbody>tr:last-child>td:first-child{
	width: 100px;
}
.gqfjygh-table-div .tb2 .table.odd>tbody>tr:last-child>td:last-child{
	width: 130px;
	text-align: center;
}
.gqfjygh-table-div .tb2 .table.odd>tbody>tr:last-child>td.time{
	width: 200px;
}
.gqfjygh-table-div .tb2 .max-4 .table>tbody>tr>td{
	width: 150px;
}
.gqfjygh-table-div .tb2 .max-4 .table>tbody>tr>td:first-child{
	width: 100px;
}
.gqfjygh-table-div .tb2 .max-4 .table>tbody>tr>td:last-child{
	width: 130px;
	text-align: center;
}
.gqfjygh-table-div .tb2 .max-4 .table>tbody>tr>td.time{
	width: 200px;
}
.gqfjygh-table-div .tb2 .max-4 .table>tbody>tr>td span{
	display: block;
    width: 15px;
    height: 15px;
    border: 1px solid #7A7A7A;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
}
.gqfjygh-table-div .tb2 .max-4 .table>tbody>tr.checked>td span{
	border: 1px solid #2EBAB4;
}
.gqfjygh-table-div .tb2 .max-4 .table>tbody>tr.checked>td span:before{
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
.gqfjygh-table-div .tb2 .max-4 .table{
	margin-bottom: 0px;
}
.max-4{
	height: 225px;
	overflow: auto;
}
.gqfjygh-table-div .tb-next{
	text-align: center;
	padding: 37.5px 0px 37.5px 0px;
	border-top: 1px solid #EBEBEB;
}
.gqfjygh-table-div .tb-next button{
	width: 105px;
    height: 35px;
    line-height: 30px;
    border: 1px solid #EBEBEB;
    color: #909090;
    background: #FFFFFF;
    margin: 0px 15px;
    font-size: 16px;
}
.gqfjygh-table-div .tb-next button:hover{
	border: 1px solid #488FFE;
	background: #488FFE;
	color: #FFFFFF;
}
#gqfjyghModal .modal-body .tableDIV{
	width: 370px;
	margin: auto;
	margin-top: 18px;
}
#gqfjyghModal .modal-body .tableDIV p{
	height: 35px;
	color: #FFFFFF;
	background: #2EBAB4;
	line-height: 35px;
	margin: 0px;
	font-size: 16px;
}
#gqfjyghModal .modal-body .tableDIV .table>tbody>tr>td:first-child{
	height: 43px;
	padding: 0px 0px 0px 25px;
	border-right: 1px solid #EBEBEB;
	border-left: 1px solid #EBEBEB;
	text-align: left;
	width: 150px;
}
#gqfjyghModal .modal-body .tableDIV .table>tbody>tr>td:last-child{
	height: 43px;
	padding: 0px 0px 0px 25px;
	border-right: 1px solid #EBEBEB;
	text-align: left;
}
.modal-body .if-do{
	padding: 5px 0px 10px 0px;
	color: #909090;
}
.modal-body .if-do span{
	display: inline-block;
    width: 15px;
    height: 15px;
    border: 1px solid #7A7A7A;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    vertical-align: sub;
    margin: 0px 15px;
}
.modal-body .if-do span.checked{
	border: 1px solid #2EBAB4;
}
.modal-body .if-do span.checked:before{
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
#gqfjyghModal .modal-dialog{
	height: 665px;
}
.gqfjygh-table-div .table label{
	font-weight: inherit;
	display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 180px;
    margin: 0px;
    padding: 2px 0px 0px;
}
.gqfjygh-table-div .tb2 .table label{	
	width: 150px !important;
	
}
.srf-info{
	border-top: 1px solid #EBEBEB;
}
.gqfjygh-table-div .srf-info .tb-table .tb{
	padding-bottom: 35px !important;
}


.dataRecordDIV{
	height: 230px;
	/*background: url(../images/request_bg.png) no-repeat;*/
	background-size: 100%,100%;
	position: relative;
	padding-top: 105px;
	z-index: -2;
}
.dataRecordDIV:before{
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0px;
	background: rgba(61,62,63,.85);
	z-index: -1;
}
.dataRecordDIV ul{
	padding: 0px;
	margin: 0px;
	z-index: 0;
	text-align: center;
}
.dataRecordDIV ul li{
	display: inline-block;
	position: relative;
}
.dataRecordDIV ul li i{
	/*background: url(../images/dot_grey.png) no-repeat center;*/
	width: 20px;
	height: 20px;
	display: inline-block;
	vertical-align: middle;
	margin: 0px 5px;
}
.dataRecordDIV ul li span{
	background: #747272;
	width: 10px;
	height: 10px;
	display: inline-block;
	vertical-align: middle;
	margin: 0px 5px;
	-webkit-border-radius: 100%;
  	-moz-border-radius: 100%;
  	border-radius: 100%;
  	vertical-align: middle;
}
.dataRecordDIV ul li p{
	position: absolute;    
    color: #818181;
    margin: 0px;
    right: -60px;
    width: 150px;
    text-align: center;	
    font-size: 14px;
}
.dataRecordDIV ul li:nth-of-type(odd) p{
	top: -45px;
}
.dataRecordDIV ul li:nth-of-type(even) p{
	top: 45px;
}
.dataRecordDIV ul li.active i{
	/*background: url(../images/dot_blue.png) no-repeat center;*/
}
.dataRecordDIV ul li.active span{
	background: #4e6085;
}
.dataRecordDIV ul li.active p{
	color: #488FFE;
}
.dataRecord-table>thead>tr>th,.dataRecord-table>tbody>tr>td{
	padding: 16px 0px 16px 120px !important;
}
.tableDIV .dataRecord-table>thead>tr>th:last-child,.tableDIV .dataRecord-table>tbody>tr>td:last-child{
	padding: 16px 120px 16px 120px !important;
	text-align: center;
}
.tableDIV .dataRecord-table>tbody>tr>td:last-child button{
	border: 1px solid #EBEBEB;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    width: 55px;
    height: 25px;
    line-height: 25px;
    cursor: pointer;
    position: relative;
    text-align: center;
    background: #FFFFFF;
    vertical-align: middle;
}
.tableDIV .dataRecord-table>tbody>tr>td:last-child button:hover,.tableDIV .dataRecord-table>tbody>tr>td:last-child button:focus{
	border: 1px solid #488FFE;
	color: #488FFE;
}
.dataRecord-step1-update>tbody>tr>td{
	border-top: 1px solid #FFFFFF !important;
	border-bottom: 1px solid #FFFFFF !important;
	text-align: center;
}
.dataRecord-step1>table>tbody>tr>td:nth-of-type(even),.detail-step1>table>tbody>tr>td:nth-of-type(even){
	width: 315px;
	padding-left: 40px;
}
.dataRecord-step1>table>tbody>tr>td:nth-of-type(odd),.detail-step1>table>tbody>tr>td:nth-of-type(odd){
	width: 183px;
	text-align: center;
    padding-left: 0px;
}
.dataRecord-step1-update>tbody>tr>td input{
	height: 35px;
	width: 225px;
	border: 1px solid #EBEBEB;
	padding-left: 10px;
}
.dataRecord-step1-update>tbody>tr:nth-of-type(even){
	background: #FFFFFF !important;
}
.dataRecord-step1 table div.pull-right{
	position: relative;
}
.dataRecord-step1 table div.pull-right:before{
	content: '';
    position: absolute;
    left: -10px;
    background: #909090;
    width: 4px;
    height: 4px;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    top: 5px;
}
.dataRecord-step1-query>tbody>tr>td,.detail-step1-table>tbody>tr>td{
	border-right: 1px solid #EBEBEB;	
}
.dataRecord-step1-query>tbody>tr:first-child>td{
	border-top: none !important;
}
.dataRecord-step1-query>tbody>tr>td:last-child,.detail-step1-table>tbody>tr>td:last-child{
	border-right: none;
}
.dataRecord-step1-query>tbody>tr>td input{
	width: 225px;
	height: 35px;
	border: 1px solid #FFFFFF;
	background: transparent;
}
.dataRecord-step1-query>tbody>tr>td input:focus{
	border: 1px solid #FFFFFF !important;
    box-shadow: none;
}
.dataRecord-step1 thead th button.btn-sm1{
	position: absolute;
    right: 35px;
}
.dataRecordTable p.btn-next{
	display: block;
}
.dataRecord-step3{
	margin-bottom: 150px;
}



.btn-next{
	padding: 45px 0px 20px 0px;
	text-align: center;
	border-bottom: 1px solid #EBEBEB;
}
#base .btn-next{
	display: none;
}
.btn-next button{
	width: 105px;
	height: 35px;
	line-height: 30px;
	border: 1px solid #EBEBEB;
	color: #909090;
	background: #FFFFFF;
	margin: 0px 15px;
	font-size: 16px;
}
.btn-next button:hover{
	border: 1px solid #488FFE;
	background: #488FFE;
	color: #FFFFFF;
}

</style>