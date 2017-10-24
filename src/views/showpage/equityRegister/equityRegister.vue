<template>
   <!-- /Header -->
  <main >
    <div class="header-title">
      <div>
        <p>股权登记</p>
        <small>可自助完成企业信息录入、股权登记托管</small>
      </div>
      <img :src="bolang3" />
    </div>
    <div class="options">
      <ul>
        <li  @click='registshow'  v-bind:class="{ 'active': isA }">具备申请资格的企业</li>
        <li @click='registshow' v-bind:class="{ 'active': !isA }">登记材料清单</li>
      </ul>
    </div>
    <div class='main-container'>
      <div class="option-content" v-if='isA==true'>
        <div class="item-list">
          <ul>
            <li><font></font>合法设立并有效存续的企业 </li>
            <li><font></font>所属行业符合国家和省产业政策</li>
            <li><font></font>股权权属清晰，或投资人投资份额及权属清晰 </li>
            <li><font></font>有固定的办公经营场所，生产经营正常，主营业务基本明确、独立</li>
            <li><font></font>不存在重大违法违规行为</li>
            <li><font></font>本中心要求的其他条件</li>
          </ul>
          <p>我要登记</p>
        </div>
        <div class="item-procedure">
          <p>登记流程</p>
          <div>
            信息录入  ·····  信息审核  ·····  登记成功
          </div>
        </div>
      </div>
      
      <div class="option-content" v-else>
        <div class="item-three container">
          <div class="row">
            <div class="col-md-4 col-xs-4 col-lg-4 data-item data-item1">
              <ul class="item-1">
                <li><font></font>企业营业执照、组织机构代码证、税务登记证或三证合一营业执照</li>
                <li><font></font>授权人及委托人身份证正反面复印件</li>
                <li><font></font>企业挂牌授权委托书</li>
                <li><font></font>企业挂牌承诺书</li>
                <li><font></font>企业挂牌协议</li>
                <li><font></font>企业基本情况登记表</li>
                <li><font></font>自然人股东股权登记名册</li>
                <li><font></font>法人股东股权登记名册</li>
                <li><font></font>股权登记法人授权委托书</li>
                <li><font></font>股权登记承诺书</li>
                <li><font></font>股权登记托管协议书</li>
                <li><font></font>股东基本情况表</li>
              </ul>
              <button class="item-btn btn-green">加盖企业公章的材料</button>
            </div>
            <div class="col-md-4 col-xs-4 col-lg-4 data-item data-item2">
              <ul class="item-2">
                <li><font>1</font>企业章程<p>需市场监督管理局（工商部门）盖章</p></li>
                <li><font>2</font>工商部门出具的基本信息查询单<p>含股东及高管信息</p></li>
              </ul>
              <button class="item-btn btn-blue">其他材料</button>
            </div>
            <div class="col-md-4 col-xs-4 col-lg-4 data-item data-item3">
              <ul class="item-3">
                <li>
                  <font>1</font>发起人股东情况表
                  <p class="p-1">含：控股股东及实际控制人情况表</p>
                  <p>股东出资未到位情况表</p>
                  <p>股东股权质押及司法冻结情况表</p>
                  <p>企业董事、监事及高级人员信息表</p>
                </li>
                <li><font>2</font>近期一年公司年报或审计报告</li>
              </ul>
              <button class="item-btn btn-green">若有需加盖公章的材料</button>
            </div>
          </div>
        </div>
        <div class="item-procedure">
          <p>材料寄送地址</p>
          <div>
            浙江省杭州市江干区富春路290号钱江国际时代广场3幢0406<span>登记小组收</span>
            <p>0571-89702992</p>
          </div>
        </div>
      </div>
    </div>
 
  </main>
</template>

<script>
  import bolang3 from '@/assets/images/bolang3.png'
  

  export default {
   data() {
       return {
        bolang3:bolang3,
        isA:true
       }
   },
   methods:{
    registshow:function(){
      this.isA = !this.isA
    }
   }
  };
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>

 /*
  * Header
  */
 /*.header{
     width: 100%;
     background:#4790fe;
     background:-webkit-linear-gradient(left,#4790fe,#6478fe);
  background:-moz-linear-gradient(left,#4790fe,#6478fe);
  background:-o-linear-gradient(left,#4790fe,#6478fe);
  background:-ms-linear-gradient(left,#4790fe,#6478fe)
 }
 .header .header-top{
  margin-bottom: 0px !important;
  height: 100px !important;
 }
 .header .header-top-nav{
  margin: auto;
  width: 1200px;
  overflow: auto;
  padding: 5px 0px 0px 0px;
  height: 100%;
 }
 .header .header-top-nav .header-top-logo{
  float: left;
  width: 50%;
  height: 100%;
 }
 .header .header-top-nav .header-top-logo img{
  margin-top: 23px;
 }
 .header .header-top-nav .header-top-navbar{
  float: right;
  width: 50%;
  position: relative;
  font-size: 16px;
  height: 100%;
 }
 .header .header-top-nav .header-top-navbar ul{
  margin-bottom: 0px;
  height: 100%;
  padding-left: 0px;
 }
 .header .header-top-nav .header-top-navbar ul li{
  display: inline-block;
  color: white;
  margin-right: 80px;
  cursor: pointer;
  position: relative;
  text-align: center;
  vertical-align: middle;
  height: 100%;
  width: 70px;
  padding-top: 35px;
  border-top: 5px solid transparent;
 }

 .header .header-top-nav .header-top-navbar ul li.active{
  border-top: 5px solid #08c9f3;
 }
 .header .header-top-nav .header-top-navbar ul li:hover{
  border-top: 5px solid #08c9f3;
 }
 .header .header-top-nav .header-top-navbar p{
  position: absolute;
  right: 30px;
  top: 35px;
  color: white;
  margin-bottom: 0px;
  
 }
 .header .header-top-nav .header-top-navbar p a:first-child{
  margin-right: 10px;
 }
 .header .header-top-nav .header-top-navbar p a:last-child{
  margin-left: 10px;
 }*/

 /*title*/
 .header-title{
  height: 225px;
  width: 100%;
     background:#4790fe;
     background:-webkit-linear-gradient(left,#4790fe,#6478fe);
  background:-moz-linear-gradient(left,#4790fe,#6478fe);
  background:-o-linear-gradient(left,#4790fe,#6478fe);
  background:-ms-linear-gradient(left,#4790fe,#6478fe);
  position: relative;
  text-align: center;
 }
 .header-title img{
  width: 100%;
  position: absolute;
  bottom: 0px;
  right: 0px;
 }
 .header-title div{
  position: absolute;
  top: 0px;
  width: 100%;
  z-index: 999;
 }
 .header-title p{
  font-size: 38px;
  color: #FFFFFF;
  padding-top: 85px;
  letter-spacing: 5px;
 }
 .header-title small{
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: 2px;
 }
 /*main-container*/
 .main-container>div{
  width: 1140px;
  margin: auto;
 }
 .options{
  padding: 85px 0px 60px 0px;
 }
 .options ul{
  margin: auto;
  padding: 0px;
  width: 616px;
  font-size: 0px;
  background:#05395a;
     background:-webkit-linear-gradient(left,#05395a,#105883,#05395a);
  background:-moz-linear-gradient(left,#05395a,#105883,#05395a);
  background:-o-linear-gradient(left,#05395a,#105883,#05395a);
  background:-ms-linear-gradient(left,#05395a,#105883,#05395a);
  -webkit-border-radius: 5px;
     -moz-border-radius: 5px;
     border-radius: 5px;
 }
 .options ul li{
  display: inline-block;
  width: 300px;
  font-size: 16px;
  text-align: center;
  height: 36px;
  line-height: 36px;
  -webkit-border-radius: 5px;
     -moz-border-radius: 5px;
     border-radius: 5px;
     margin: 4px;
     background: #f8fbfb;
     color: #0b3f5f;
     font-weight: bold;
     cursor: pointer;
 }
 .options ul li:nth-child(1){
  -webkit-border-radius: 5px 0px 0px 5px;
     -moz-border-radius: 5px 0px 0px 5px;
     border-radius: 5px 0px 0px 5px;
 }
 .options ul li:nth-child(2){
  -webkit-border-radius: 0px 5px 5px 0px;
     -moz-border-radius: 0px 5px 5px 0px;
     border-radius: 0px 5px 5px 0px;
 }
 .options ul li.active{
  background: transparent !important;
  color: #FFFFFF !important;
 }
 .option-content{
  height: 575px;
  background: url(../../../assets/images/gqdj_bg.png) no-repeat center;
  background-size: 100% 100%;
  margin-bottom: 124px !important;
  -webkit-border-radius: 10px;
     -moz-border-radius: 10px;
     border-radius: 10px;
     -webkit-box-shadow:0 0 10px rgba(167, 205, 238, .7);  
     -moz-box-shadow:0 0 10px rgba(167, 205, 238, .7);  
     box-shadow:0 0 15px rgba(167, 205, 238, .5);
 }
 .option-content .item-list{
  height: 445px;
  background: #FFFFFF;
  padding-top: 135px;
  -webkit-border-radius: 10px 10px 0px 0px;
     -moz-border-radius: 10px 10px 0px 0px;
     border-radius: 10px 10px 0px 0px;
 }
 .option-content .item-three{
  height: 445px;
  background: #FFFFFF;  
  -webkit-border-radius: 10px 10px 0px 0px;
     -moz-border-radius: 10px 10px 0px 0px;
     border-radius: 10px 10px 0px 0px;
 }
 .option-content .item-list ul{
  margin: auto;
  padding: 0px;
  font-size: 0px;
  width: 800px;
 }
 .option-content .item-list ul li{
  display: inline-block;
  font-size: 14px;
  width: 50%;
  position: relative;
  padding: 15px 0px 5px 0px;
  color: #7c7c7c;
 }

 .option-content .item-list ul li:nth-child(1):before{
  content: '1';
 }

 .option-content .item-list ul li:nth-child(2):before{
  content: '2';
 }

 .option-content .item-list ul li:nth-child(3):before{
  content: '3';
 }

 .option-content .item-list ul li:nth-child(4):before{
  content: '4';
 }

 .option-content .item-list ul li:nth-child(5):before{
  content: '5';
 }

 .option-content .item-list ul li:nth-child(6):before{
  content: '6';
 }
 .option-content .item-list ul li:before{
  position: absolute;
  left: 0px;
  width: 15px;
  height: 15px;
  -webkit-border-radius: 50%;
     -moz-border-radius: 50%;
     border-radius: 50%;
     background: #3b9aef;
     color: #FFFFFF;
     text-align: center;
     line-height: 15px;
     top: 18px;
     font-size: 12px;
 }
 .option-content .item-list ul li font{
  margin-right: 25px;
 }
 .option-content .item-list ul li:nth-of-type(even){
  width: 450px;
 }
 .option-content .item-list ul li:nth-of-type(odd){
  width: 350px;
 }
 .option-content .item-list p{
  margin: 35px auto 0px;
  width: 190px;
  height: 40px;
  text-align: center;
  line-height: 36px;
  border: 2px solid #DDDDDD;
  -webkit-border-radius: 5px;
     -moz-border-radius: 5px;
     border-radius: 5px;
     color: #3b9aef;
     font-weight: bold;
     cursor: pointer;
     -webkit-transition: all 0.3s ease-in-out;
     -moz-transition: all 0.3s ease-in-out;
     -ms-transition: all 0.3s ease-in-out;
     -o-transition: all 0.3s ease-in-out;
     transition: all 0.3s ease-in-out;
     font-size: 16px;
 }
 .option-content .item-list p:hover{
  border: 2px solid #3b9aef;
  background: #3b9aef;
  color: #FFFFFF;
 }
 .item-procedure>p{
  text-align: center;
  margin: 28px 0px 15px 0px;
  font-size: 16px;
  font-weight: bold;
  color: #0e3e5b;
 }
 .item-procedure div{
  color: #0e3e5b;
  font-size: 14px;
  text-align: center;
  line-height: 1.5;
 }
 .item-procedure div span{
  margin-left: 30px;
 }
 .item-procedure div p{
  margin-top: 5px;
 }
 .option-content .container{
  width: 1140px !important;
  padding: 0px !important;
 }
 .option-content .container .row{
  margin: 0px;
  height: 100%;
 }
 .option-content .container .row .data-item.data-item1{
  border-bottom: 1px solid #EBEBEB;
  -webkit-border-radius: 10px 0px 0px 0px;
     -moz-border-radius: 10px 0px 0px 0px;
     border-radius: 10px 0px 0px 0px;
 }
 .option-content .container .row .data-item.data-item2{
  border-left: 1px solid #EBEBEB;
  border-bottom: 1px solid #EBEBEB;
 }
 .option-content .container .row .data-item.data-item3{
  border-left: 1px solid #EBEBEB;
  border-bottom: 1px solid #EBEBEB;
  -webkit-border-radius: 0px 10px 0px 0px;
     -moz-border-radius: 0px 10px 0px 0px;
     border-radius: 0px 10px 0px 0px;
 }
 .option-content .container .row .data-item{
  height: 100%;
  cursor: pointer;
  background: #FFFFFF;
  padding: 0px 10px;
 }
 .option-content .container .row .data-item .item-1{
  font-size: 0px;
  margin: 0px 0px 5px 0px;
  padding: 50px 0px 0px 0px;
 }
 .option-content .container .row .data-item .item-2{
  font-size: 0px;
  margin: auto;
  padding: 50px 0px 0px 0px;
  width: 250px;
  height: 365px;
 }
 .option-content .container .row .data-item .item-3{
  font-size: 0px;
  margin: auto;
  padding: 50px 0px 0px 0px;
  width: 250px;
  height: 365px;
 }
 .option-content .container .row .data-item .item-1 li{
  font-size: 14px;
  display: inline-block;
  width: 50%;
  color: #7C7C7C;
  margin-bottom: 25px;
  vertical-align: text-top;
  position: relative;
  padding-left: 25px;
 }
 .option-content .container .row .data-item .item-1 li:nth-of-type(even){
  width: 48%;
 }
 .option-content .container .row .data-item .item-1 li:nth-of-type(odd){
  width: 52%;
 }
 .option-content .container .row .data-item .item-1 li font{
  float: left;
     display: block;
     margin-left: -12px;
     margin-top: 7px;
     width: 6px;
     height: 6px;
     -webkit-border-radius: 50%;
     -moz-border-radius: 50%;
     border-radius: 100%;
     background: #2fb9b5;
     text-align: center;
     color: #FFFFFF;
 }
 .option-content .container .row .data-item .item-2 li font,.option-content .container .row .data-item .item-3 li font{
  float: left;
  display: block;
  margin-left: -22px;
  margin-top: 3px;
  width: 15px;
  height: 15px;
  -webkit-border-radius: 50%;
     -moz-border-radius: 50%;
     border-radius: 50%;
     background: #2fb9b5;
     line-height: 17px;
     text-align: center;
     color: #FFFFFF;
     font-size: 10px;
 }
 .option-content .container .row .data-item .item-2 li font{
  background: #3B9AEF;
 }
 .option-content .container .row .data-item .item-2 li{
  font-size: 14px;
  list-style: none;
  margin-bottom: 40px;
  color: #7C7C7C;
 }
 .option-content .container .row .data-item .item-2 li p{
  padding: 10px 0px;
 }
 .option-content .container .row .data-item .item-3 li{
  font-size: 14px;
  list-style: none;
  margin-bottom: 40px;
  color: #7C7C7C;
 }
 .option-content .container .row .data-item .item-3 li p{
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 30px;
 }
 .option-content .container .row .data-item .item-3 li p.p-1{
  margin-left: 0px !important;
 }
 .option-content .container .row .data-item:hover{
  -webkit-box-shadow: 0 0 10px rgba(167, 205, 238, .7);
     -moz-box-shadow: 0 0 10px rgba(167, 205, 238, .7);
     box-shadow: 0 0 15px rgba(167, 205, 238, .7);
     -webkit-border-radius: 0px 0px 0px 0px;
     -moz-border-radius: 0px 0px 0px 0px;
     border-radius: 0px 0px 0px 0px;
     border: 0px solid #DDDDDD !important;
     z-index: 999999;
 }
 .option-content .container .row .data-item:hover +.data-item{
     border: none !important;
 }
 .item-btn{
  width: 190px;
  height: 40px;
  line-height: 36px;
  -webkit-border-radius: 5px;
     -moz-border-radius: 5px;
     border-radius: 5px;
     border: 2px solid #DDDDDD;
     font-size: 16px;
     font-weight: bold;
     margin: auto;
     display: block;
     background: #FFFFFF;
     -webkit-transition: all 0.3s ease-in-out;
     -moz-transition: all 0.3s ease-in-out;
     -ms-transition: all 0.3s ease-in-out;
     -o-transition: all 0.3s ease-in-out;
     transition: all 0.3s ease-in-out;
 }
 .btn-green{
  color: #2fb9b5;
 }
 .btn-green:hover{
  background: #2fb9b5;
  border: 2px solid #2fb9b5;
  color: #FFFFFF;
 }
 .btn-blue{
  color: #3B9AEF;
 }
 .btn-blue:hover{
  background: #3B9AEF;
  border: 2px solid #3B9AEF;
  color: #FFFFFF;
 }


</style>
