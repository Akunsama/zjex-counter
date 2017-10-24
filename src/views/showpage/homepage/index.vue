<template>
   <!-- /Header -->
   <main >
    <div class="header-content">
        <div class="header-banner">
          <div class="item">
            <div class="item-intro">
              <div class="item-logo"><i class="fa fa-fw fa-database"></i></div>
              <p class="big">连接区块链技术与股权登记的桥梁</p>
              <p class="small">全国首家全自助的区块链股权登记平台，为您省心托管股权和资产</p>
              <button>联系我们</button>
            </div>
          </div>
        </div>
        <div class="flyCont" style="height: 380px;">
          <span class="fly" style="top: 82px; left: 1299px; width: 5px; height: 5px;"></span>
          <span class="fly" style="top: 166px; left: 196px; width: 2px; height: 2px;"></span>
          <span class="fly" style="top: 195px; left: 122px; width: 7px; height: 7px;"></span>
          <span class="fly" style="top: 33px; left: 996px; width: 4px; height: 4px;"></span>
          <span class="fly" style="top: 114px; left: 519px; width: 3px; height: 3px;"></span>
        </div>
        <canvas id="canvas" width="2400" height="380" style="left: 0px;"></canvas>
        <canvas id="canvas1" width="2400" height="380" style="bottom: -50px; right: 400px;"></canvas>
        <div class="wv"><img :src="wv1"></div>
      </div>
   <!-- 区块链优势 -->
    <section class="section section-good">
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-md-offset-4 col-xs-4 col-xs-offset-4 col-lg-4 col-lg-offset-4">
            <header class="text-title">
              <p>区块链优势</p>
            </header>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-12 col-xs-12 col-lg-12 goodlist">
            <ul>
              <li class="border-b border-r">
                <i class="fa fa-fw fa-desktop"></i>
                <p>安全信任</p>
                <span>去中心化的数据留存</span>
                <span>给予用户充分的安全信任风险</span>
              </li>
              <li class="border-b border-r">
                <i class="fa fa-fw fa-pencil"></i>
                <p>安全信任</p>
                <span>去中心化的数据留存</span>
                <span>给予用户充分的安全信任风险</span>
              </li>
              <li class="border-b">
                <i class="fa fa-fw fa-mobile-phone"></i>
                <p>安全信任</p>
                <span>去中心化的数据留存</span>
                <span>给予用户充分的安全信任风险</span>
              </li>
              <li class="border-r">
                <i class="fa fa-fw fa-search"></i>
                <p>安全信任</p>
                <span>去中心化的数据留存</span>
                <span>给予用户充分的安全信任风险</span>
              </li>
              <li class="border-r">
                <i class="fa fa-fw fa-building-o"></i>
                <p>安全信任</p>
                <span>去中心化的数据留存</span>
                <span>给予用户充分的安全信任风险</span>
              </li>
              <li >
                <i class="fa fa-fw fa-heart-o"></i>
                <p>安全信任</p>
                <span>去中心化的数据留存</span>
                <span>给予用户充分的安全信任风险</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
   <!-- /区块链优势 -->
   <!-- 区块链服务 -->
    <section class="section-service">
      <div class="container">
        <div class="row service-header">
            <header>
              <p class="change">拥抱变化&nbsp;&nbsp;&nbsp;高效服务</p>
            </header>
        </div>
        <div class="row">
          <div class="col-md-12 col-xs-12 col-lg-12">
            <div class="service-content">
              <div class="circle">
                  <div class="dot"><img :src="box" /> </div>
                  <div class="pulse"></div>
                  <div class="pulse1"></div>
                  <div class="pulse2"></div>
                  <div class="pulse3"></div>
                  <ul class="dot-list">
                    <li class="blue-dot dot1 bounceIn wow" data-wow-delay="0s" data-wow-duration="2s" ><span></span></li>
                    <li class="green-dot dot2 bounceIn wow" data-wow-delay="0.2s" data-wow-duration="2s"><span></span></li>
                    <li class="blue-dot dot3 bounceIn wow" data-wow-delay="0.4s" data-wow-duration="2s"><span></span></li>
                    <li class="green-dot dot4 bounceIn wow" data-wow-delay="0.6s" data-wow-duration="2s"><span></span></li>
                    <li class="blue-dot dot5 bounceIn wow" data-wow-delay="0.8s" data-wow-duration="2s"><span></span></li>
                  </ul>
              </div>
              
              <ul class="box-list">
                <li class="box-li1 fadeIn wow" data-wow-delay="1.2s" data-wow-duration="2s" data-wow-offset="300" >
                  <div class="box-item">
                    <div>
                      <p>企业、股东可以进行</p>
                      <p>各种股权非交易业务的办理</p>
                    </div>
                    <span>股权性质变更</span>
                  </div>
                </li>
                <li class="box-li2 fadeIn wow" data-wow-delay="1.3s" data-wow-duration="2s">
                  <div class="box-item">
                    <div>
                      <p>企业、股东可以进行</p>
                      <p>各种股权非交易业务的办理</p>
                    </div>
                    <span>股权非交易办理</span>
                  </div>
                </li>
                <li class="box-li3 fadeIn wow" data-wow-delay="1.4s" data-wow-duration="2s" >
                  <div class="box-item">
                    <div>
                      <p>企业、股东可以进行</p>
                      <p>各种股权非交易业务的办理</p>
                    </div>
                    <span>股权自助托管</span>
                  </div>
                </li>
                <li class="box-li4 fadeIn wow" data-wow-delay="1.6s" data-wow-duration="2s" data-wow-offset="180" >
                  <div class="box-item">
                    <div>
                      <p>企业、股东可以进行</p>
                      <p>各种股权非交易业务的办理</p>
                    </div>
                    <span>股权自助托管</span>
                  </div>
                </li>
                <li class="box-li5 fadeIn wow" data-wow-delay="1.8s" data-wow-duration="2s" data-wow-offset="300" >
                  <div class="box-item">
                    <div>
                      <p>企业、股东可以进行</p>
                      <p>各种股权非交易业务的办理</p>
                      <p>各种股权非交易业务的办理</p>
                    </div>
                    <span>股权自助托管</span>
                  </div>
                </li>
              </ul>
              
            </div>
          </div>
        </div>
      </div>
    </section>
   <!-- /区块链服务 -->
   </main>
</template>

<script>
  import wv1 from '@/assets/images/wv1.png'
  import box from '@/assets/images/box.png'

  

  export default {
   data() {
       return {
        wv1:wv1,
        box:box,
        maxWidth:1300,
        maxHeight:300,
       }
   },
   methods:{
    canvas:function(){
      //波浪
          wave(document.getElementById("canvas"),{
              height: 50,
              waveLength: 700,
              curveFactor: 1,
              speed: -3,//速度
              opacity:'rgba(90,180,240,0.99)'
          });
          wave(document.getElementById("canvas1"),{
              height: 40,
              waveLength: 700,
              curveFactor: 1,
              speed: -8,//速度
              opacity:'rgba(120,195,248,0.99)'
          });
    },
    firefly:function(){
            //数据点
            var fireFlys = [];
            let fireFlyCount = 5;
            var flyArr = [];
            for(let i=0;i<fireFlyCount;i++){
                flyArr.push(this.fetchFirefly());
                $(".flyCont").append('<span class="fly"></span>');
            }
            fireFlys = flyArr;
            flyArr.forEach(function (fly, index) {
                var directionx = Math.random() < 0.5 ? 1 : -1;
                var directiony = Math.random() < 0.5 ? 1 : -1;

                setInterval(function () {
                    fly.posLeft = parseInt(fly.posLeft) + directionx;
                    fly.posTop = parseInt(fly.posTop) + directiony;
                    if (parseInt(fly.posLeft) < 0 || parseInt(fly.posLeft) >1300) {
                        directionx = -1 * directionx;
                    }
                    if (parseInt(fly.posTop) < 0 || parseInt(fly.posTop) > 300) {
                        directiony = -1 * directiony;
                    }
                    fireFlys = flyArr;
                    $(".fly").eq(index).css("top",fly.posTop);
                    $(".fly").eq(index).css("left",fly.posLeft);
                    $(".fly").eq(index).css("width",fly.w);
                    $(".fly").eq(index).css("height",fly.w);
                },80);
            });
    },
    fetchFirefly:function(){
        var fly={};
        fly.posLeft = parseInt(Math.random()*this.maxWidth);
        fly.posTop = parseInt(Math.random()*this.maxHeight);
        fly.w = parseInt(Math.random()*6+2);
        return fly;
    }
   },
   mounted() {
    this.canvas();
   }
  };
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
 .header-content{
  position: relative;
  overflow: hidden;
  height: 880px;
  width: 100%;
 background: #4790fe;
 background: -webkit-linear-gradient(left, #4790fe, #6478fe);
 }
 .wv{
  position: absolute;
  bottom: -1px;
 }
 .header-content canvas {
     position: absolute;
     left: -300px;
     z-index: 0;
     pointer-events: none;
 }
 .flyCont{
     pointer-events: none;
     position: absolute;
     bottom: 100px;
     width: 100%;
     z-index: 9999;
 }
 .fly{
     position: absolute;
     border: 4px solid #4aceb7;
     border-radius: 50%;
     box-shadow: 0 0 2px 5px rgba(106,175,250,.8),0 0 3px 11px rgba(74,206,183,.2);
     background-color: rgba(74,206,183,0.8);
 }
 .header_bg{
  background-color:  rgba(0,0,0,.65);
 }
 .header_bg2{
  background:#4790fe;
  background:-webkit-linear-gradient(left,#4790fe,#6478fe);
  background:-moz-linear-gradient(left,#4790fe,#6478fe);
  background:-o-linear-gradient(left,#4790fe,#6478fe);
  background:-ms-linear-gradient(left,#4790fe,#6478fe)
 }

 .header-banner{
  width: 100%;
  min-width: 1200px;
  height: 350px !important;
  position: relative;
  margin-top: 160px;
 }
 .header-banner .item{
  height: 350px;
  width: 1200px;
  margin: auto;
 }
 .header-banner .item .item-intro{
  padding: 40px 30px;
  text-align: center;
 }
 .item-intro .item-logo{
  width: 120px;
     height: 120px;
     line-height: 115px;
  -webkit-border-radius: 50%;
     -moz-border-radius: 50%;
     border-radius: 50%;
     display: block;
     font-size: 70px;
     margin: 0 auto 10px;
     background-color: rgba(255,255,255,0.3);
 }
 .item-intro .item-logo i{
  color: white;
 }
 .item-intro p.big{
  font-size: 48px;
  color: white;
  position: relative;
  padding: 10px;
  letter-spacing: 5px;
 }
 .item-intro p.big:after{
  display: block;
  content: '';
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 5px;
  width: 40px;
  height: 1px;
  background-color: #00e0d0;
  margin: auto;
 }
 .item-intro p.small{
  color: white;
  font-size: 16px !important;
  letter-spacing: 2px;
 }
 .item-intro button{
  display: block;
  margin: 85px auto 0px;
  width: 150px;
  border: 3px solid #08c9f3;
  background-color: #08c9f3;
  color: white;
  -webkit-border-radius: 5px;
     -moz-border-radius: 5px;
     border-radius: 5px;
     padding: 8px;
     -webkit-transition: all 0.5s ease-in-out;
     -moz-transition: all 0.5s ease-in-out;
     -ms-transition: all 0.5s ease-in-out;
     -o-transition: all 0.5s ease-in-out;
     transition: all 0.5s ease-in-out;
 }
 .item-intro button:hover{
  background-color: rgba(8,201,243,0.5);
 }
 .section{
  width: 1200px;
  margin: auto;
 }
 .section-good{
  height: 700px;
 }
 .text-title p{
  text-align: center;
  font-size: 34px;
  color: #413d4b;
  margin-top: 50px;
  letter-spacing: 5px;
 }
 .text-title p:after{
  display: block;
  content: '';
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: -5px;
  width: 50px;
  height: 1px;
  background-color: #c6c4c9;
  margin: auto;
 }
 .goodlist ul{
  width: 960px;
  padding: 0px;
  margin: auto;
  font-size: 0px;
  margin-top: 50px;
 }
 .goodlist ul li{
  font-size: 14px;
  width: 320px;
  height: 255px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  padding: 40px;
  -webkit-transition: all 0.2s ease-in-out;
     -moz-transition: all 0.2s ease-in-out;
     -ms-transition: all 0.2s ease-in-out;
     -o-transition: all 0.2s ease-in-out;
     transition: all 0.2s ease-in-out;
     cursor: pointer;
 }
 .goodlist ul li:hover{
  -webkit-box-shadow:0 0 10px rgba(181, 236, 253, .7);  
     -moz-box-shadow:0 0 10px rgba(181, 236, 253, .7);  
     box-shadow:0 0 25px rgba(181, 236, 253, .7);  
 }
 .goodlist ul li i{
  display: inline-block;
  font-size: 48px;
     color: green;
     background-image: -webkit-gradient(linear,left 0,right 3, from(rgba(14, 226, 211, 1)), to(rgba(70, 166, 204, 1)));
     -webkit-background-clip: text;
     -webkit-text-fill-color: transparent;
 }
 .goodlist ul li p{
  padding: 35px 0px 10px;
  font-size: 18px;
  color: #413d4b;
  font-weight: bold;
 }
 .goodlist ul li span{
  display: block;
  font-size: 14px;
  padding: 2px;
  color: #333333;
 }
 .border-b{
  border-bottom: 1px solid #ebebeb;
 }
 .border-r{
  border-right: 1px solid #ebebeb; ;
 }

 .section-service{ 
  background: url(../../../assets/images/bg_lx.png) center top / cover no-repeat;
  background-size:100% 100%;
  height: 900px;
 }
 .service-header{
  margin-top: 170px;  
  color: #dae7fc;
  font-size: 34px;
  text-align: center;
  margin-bottom: 35px;
  width: 1200px;
  position: relative;
 }
 .service-header p:after{
  display: block;
  content: '';
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: -5px;
  width: 50px;
  height: 1px;
  background-color: #c6c4c9;
  margin: auto;
 }
 .service-content{
  width: 1200px;
     height: 540px;
     margin: auto;
     position: relative;
 }

 /**圆圈效果**/
 .circle {
     position: relative;
     width: 400px;
     height: 400px;
     margin: auto;
 }
 /* 保持大小不变的小圆圈  */
 .dot {
     position: absolute;
     width: 150px;
     height: 150px;
     left: 0px;
     right: 0px;
     margin: auto;
     top: 150px;
     -webkit-border-radius: 50%;
     -moz-border-radius: 50%;
     background-color: #3c3d43;
     border-radius: 50%;
     z-index: 2;
     text-align: center;
 }
 .dot img{
  margin-top: 18px;
 }
 /* 产生动画（向外扩散变大）的圆圈  */
 .pulse {
     position: absolute;
     width: 350px;
     height: 350px;
     left: 0px;
     right: 0px;
     margin: auto;
     top: 50px;
     background-color: rgba(60,61,61,0.8);
     -webkit-border-radius: 50%;
     -moz-border-radius: 50%;
     border-radius: 50%;
     z-index: 1;
     opacity: 0;
     -webkit-animation: warn 2s ease-out;
     -moz-animation: warn 2s ease-out;
     animation: warn 2s ease-out;
     -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
     animation-iteration-count: infinite;
     box-shadow: 1px 1px 30px rgba(60,61,61,0.8);;

 }
 .pulse1 {
     position: absolute;
     width: 350px;
     height: 350px;
     left: 0px;
     right: 0px;
     margin: auto;
     top: 50px;
     background-color: rgba(60,61,61,0.6);
     -webkit-border-radius: 50%;
     -moz-border-radius: 50%;
     border-radius: 50%;
     z-index: 1;
     opacity: 0;
     -webkit-animation: warn1 2s ease-out;
     -moz-animation: warn1 2s ease-out;
     animation: warn1 2s ease-out;
     -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
     animation-iteration-count: infinite;
     box-shadow: 1px 1px 30px rgba(60,61,61,0.6);;
 }
 .pulse2 {
     position: absolute;
     width: 350px;
     height: 350px;
     left: 0px;
     right: 0px;
     margin: auto;
     top: 50px;
     background-color: rgba(60,61,61,0.6);
     -webkit-border-radius: 50%;
     -moz-border-radius: 50%;
     border-radius: 50%;
     z-index: 1;
     opacity: 0;
     -webkit-animation: warn2 2s ease-out;
     -moz-animation: warn2 2s ease-out;
     animation: warn2 2s ease-out;
     -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
     animation-iteration-count: infinite;
     box-shadow: 1px 1px 30px rgba(60,61,61,0.6);;
 }
 .pulse3 {
     position: absolute;
     width: 350px;
     height: 350px;
     left: 0px;
     right: 0px;
     margin: auto;
     top: 50px;
     background-color: rgba(60,61,61,0.6);
     -webkit-border-radius: 50%;
     -moz-border-radius: 50%;
     border-radius: 50%;
     z-index: 1;
     opacity: 0;
     -webkit-animation: warn3 2s ease-out;
     -moz-animation: warn3 2s ease-out;
     animation: warn3 2s ease-out;
     -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
     animation-iteration-count: infinite;
     box-shadow: 1px 1px 30px rgba(60,61,61,0.6);
 }
 @keyframes warn {
     0% {
         transform: scale(0.5);
    -webkit-transform: scale(0.5);
         opacity: 0.0;
     }
     25% {
         transform: scale(0.65);
    -webkit-transform: scale(0.65);
         opacity: 0.8;
     }
     50% {
         transform: scale(0.75);
    -webkit-transform: scale(0.75);
         opacity: 0.6;
     }
     75% {
         transform: scale(0.9);
    -webkit-transform: scale(0.9);
         opacity: 0.4;
     }
     100% {
         transform: scale(1);
    -webkit-transform: scale(1);
         opacity: 0.2;
     }
 }
 @keyframes warn1 {
     0% {
         transform: scale(0.5);
    -webkit-transform: scale(0.5);
         opacity: 0.0;
     }
     25% {
         transform: scale(0.5);
    -webkit-transform: scale(0.5);
         opacity: 0.8;
     }
     50% {
         transform: scale(0.65);
    -webkit-transform: scale(0.65);
         opacity: 0.8;
     }
     75% {
         transform: scale(0.75);
    -webkit-transform: scale(0.75);
         opacity: 0.6;
     }
     100% {
         transform: scale(0.9);
    -webkit-transform: scale(0.9);
         opacity: 0.4;
     }
 }
 @keyframes warn2 {
     0% {
         transform: scale(0.5);
    -webkit-transform: scale(0.5);
         opacity: 0.0;
     }
     25% {
         transform: scale(0.5);
    -webkit-transform: scale(0.5);
         opacity: 0.8;
     }
     50% {
         transform: scale(0.5);
    -webkit-transform: scale(0.5);
         opacity: 0.8;
     }
     75% {
         transform: scale(0.65);
    -webkit-transform: scale(0.65);
         opacity: 0.8;
     }
     100% {
         transform: scale(0.75);
    -webkit-transform: scale(0.75);
         opacity: 0.6;
     }
 }
 @keyframes warn3 {
     0% {
         transform: scale(0.5);
    -webkit-transform: scale(0.5);
         opacity: 0.0;
     }
     25% {
         transform: scale(0.5);
    -webkit-transform: scale(0.5);
         opacity: 0.8;
     }
     50% {
         transform: scale(0.5);
    -webkit-transform: scale(0.5);
         opacity: 0.8;
     }
     75% {
         transform: scale(0.5);
    -webkit-transform: scale(0.5);
         opacity: 0.8;
     }
     100% {
         transform: scale(0.65);
    -webkit-transform: scale(0.65);
         opacity: 0.8;
     }
 }
 .dot-list li{
  display: inline-block;
  z-index: 1;
 }
 .dot-list li.green-dot{
  border: 4px solid #4aceb7;
     border-radius: 50%;
     box-shadow: 0 0 2px 5px rgba(106,175,250,.8),0 0 3px 11px rgba(74,206,183,.2);
     background-color: rgba(74,206,183,0.8);
     width: 1px;
     height: 1px;
 }
 .dot-list li.blue-dot{
  border: 9px solid #2ea9ff;
     border-radius: 50%;
     background-color: #2ea9ff;
     width: 2px;
     height: 2px;
 }
 .dot1{
  position: absolute;
  right: 150px;
     top: 75px;
 }
 .dot2{
  position: absolute;
     right: 60px;
     top: 220px;
 }
 .dot3{
  position: absolute;
     right: 65px;
     top: 325px;
 }
 .dot4{
  position: absolute;
     left: 90px;
     top: 325px;
 }
 .dot5{
  position: absolute;
     left: 40px;
     top: 235px;
 }
 .box-list li{
  display: inline-block;
  position: absolute;
  cursor: pointer;
 }
 .box-list li p{
  padding: 0 0 5px !important;
 }
 .box-list li.box-li1{
  position: absolute;
  right: 45px;
  top:65px
 }
 .box-list li.box-li1 .box-item{
  position: relative;
 }
 .box-list li.box-li1 .box-item div{
  border: 1px solid #2ea9ff;
  width: 280px;
  height: 186px;
  color: #ffffff;
  padding: 80px 30px 10px 40px;
  -webkit-transition: all 0.2s ease-in-out;
     -moz-transition: all 0.2s ease-in-out;
     -ms-transition: all 0.2s ease-in-out;
     -o-transition: all 0.2s ease-in-out;
     transition: all 0.2s ease-in-out;
 }
 .box-list li.box-li1 .box-item div:hover{
  background-color: #FFFFFF;
  color: #7a7a7a;
 }
 .box-list li.box-li1 .box-item div p{
  border-bottom: 1px solid #2ea9ff;
  padding: 5px;
 }
 .box-list li.box-li1 .box-item div p:first-child{
  width: 85%;
 }
 .box-list li.box-li1 .box-item span{
  width: 150px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: #ffffff;
  font-size: 18px;
  display: block;
  position: absolute;
  top: 15px;
  left: -70px;
  background-color: #2ea9ff;
  -webkit-border-radius: 30px;
     -moz-border-radius: 30px;
     border-radius: 30px;
 }
 .box-list li.box-li1 .box-item span:before{
  display: block;
  content: '';
  position: absolute;
  bottom: -7px;
  width: 16px;
  height: 13px;
  background: url(../../../assets/images/triangle1.png);
 }

 .box-list li.box-li2{
  position: absolute;
  right: 160px;
  top:370px
 }
 .box-list li.box-li2 .box-item{
  position: relative;
 }
 .box-list li.box-li2 .box-item div{
  border: 1px solid #1dc8cf;
  width: 440px;
  height: 170px;
  color: #ffffff;
  padding: 60px 30px 10px 40px;
  -webkit-transition: all 0.2s ease-in-out;
     -moz-transition: all 0.2s ease-in-out;
     -ms-transition: all 0.2s ease-in-out;
     -o-transition: all 0.2s ease-in-out;
     transition: all 0.2s ease-in-out;
 }
 .box-list li.box-li2 .box-item div:hover{
  background-color: #FFFFFF;
  color: #7a7a7a;
 }
 .box-list li.box-li2 .box-item div p{
  border-bottom: 1px solid #1dc8cf;
  padding: 5px;
 }
 .box-list li.box-li2 .box-item div p:first-child{
  width: 85%;
 }
 .box-list li.box-li2 .box-item span{
  width: 150px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: #ffffff;
  font-size: 18px;
  display: block;
  position: absolute;
  top: -22px;
  left: 150px;
  background-color: #1dc8cf;
  -webkit-border-radius: 30px;
     -moz-border-radius: 30px;
     border-radius: 30px;
 }
 .box-list li.box-li2 .box-item span:before{
  display: block;
  content: '';
  position: absolute;
  top: -6px;
  width: 16px;
  height: 13px;
     background: url(../../../assets/images/triangle2.png);
 }

 .box-list li.box-li3{
  position: absolute;
  left: 190px;
  bottom:30px
 }
 .box-list li.box-li3 .box-item{
  position: relative;
 }
 .box-list li.box-li3 .box-item div{
  border: 1px solid #2ea9ff;
  width: 325px;
  height: 85px;
  color: #ffffff;
  padding: 5px 60px 5px 30px;
  -webkit-transition: all 0.2s ease-in-out;
     -moz-transition: all 0.2s ease-in-out;
     -ms-transition: all 0.2s ease-in-out;
     -o-transition: all 0.2s ease-in-out;
     transition: all 0.2s ease-in-out;
 }
 .box-list li.box-li3 .box-item div:hover{
  background-color: #FFFFFF;
  color: #7a7a7a;
 }
 .box-list li.box-li3 .box-item div p{
  border-bottom: 1px solid #2ea9ff;
  padding: 5px;
 }
 .box-list li.box-li3 .box-item div p:first-child{
  width: 85%;
 }
 .box-list li.box-li3 .box-item span{
  width: 150px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: #ffffff;
  font-size: 18px;
  display: block;
  position: absolute;
  top: -22px;
  right: -40px;
  background-color: #2ea9ff;
  -webkit-border-radius: 30px;
     -moz-border-radius: 30px;
     border-radius: 30px;
 }
 .box-list li.box-li3 .box-item span:before{
  display: block;
  content: '';
  position: absolute;
  top: -6px;
  right: -1px;
  width: 16px;
  height: 13px;
  background: url(../../../assets/images/triangle3.png);
 }

 .box-list li.box-li4{
  position: absolute;
  left: 40px;
  bottom:135px
 }
 .box-list li.box-li4 .box-item{
  position: relative;
 }
 .box-list li.box-li4 .box-item div{
  border: 1px solid #1dc8cf;
  width: 295px;
  height: 150px;
  color: #ffffff;
  padding: 15px 30px 50px 30px;
  -webkit-transition: all 0.2s ease-in-out;
     -moz-transition: all 0.2s ease-in-out;
     -ms-transition: all 0.2s ease-in-out;
     -o-transition: all 0.2s ease-in-out;
     transition: all 0.2s ease-in-out;
 }
 .box-list li.box-li4 .box-item div:hover{
  background-color: #FFFFFF;
  color: #7a7a7a;
 }
 .box-list li.box-li4 .box-item div p{
  border-bottom: 1px solid #1dc8cf;
  padding: 5px;
 }
 .box-list li.box-li4 .box-item div p:first-child{
  width: 85%;
 }
 .box-list li.box-li4 .box-item span{
  width: 150px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: #ffffff;
  font-size: 18px;
  display: block;
  position: absolute;
  bottom: 15px;
  left: -20px;
  background-color: #1dc8cf;
  -webkit-border-radius: 30px;
     -moz-border-radius: 30px;
     border-radius: 30px;
 }
 .box-list li.box-li4 .box-item span:before{
  display: block;
  content: '';
  position: absolute;
  bottom: -6px;
  right: -1px;
  width: 16px;
  height: 13px;
     background: url(../../../assets/images/triangle4.png);
 }

 .box-list li.box-li5{
  position: absolute;
  left: 145px;
  top:15px
 }
 .box-list li.box-li5 .box-item{
  position: relative;
 }
 .box-list li.box-li5 .box-item div{
  border: 1px solid #2ea9ff;
  width: 315px;
  height: 175px;
  color: #ffffff;
  padding: 30px 80px 0px 50px;
  -webkit-transition: all 0.2s ease-in-out;
     -moz-transition: all 0.2s ease-in-out;
     -ms-transition: all 0.2s ease-in-out;
     -o-transition: all 0.2s ease-in-out;
     transition: all 0.2s ease-in-out;
 }
 .box-list li.box-li5 .box-item div:hover{
  background-color: #FFFFFF;
  color: #7a7a7a;
 }
 .box-list li.box-li5 .box-item div p{
  border-bottom: 1px solid #2ea9ff;
  padding: 5px;
 }
 .box-list li.box-li5 .box-item div p:first-child{
  width: 85%;
 }
 .box-list li.box-li5 .box-item span{
  width: 150px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: #ffffff;
  font-size: 18px;
  display: block;
  position: absolute;
  bottom: -22px;
  left: 145px;
  background-color: #2ea9ff;
  -webkit-border-radius: 30px;
     -moz-border-radius: 30px;
     border-radius: 30px;
 }
 .box-list li.box-li5 .box-item span:before{
  display: block;
  content: '';
  position: absolute;
  bottom: -6px;
  right: -1px;
  width: 16px;
  height: 13px;
     background: url(../../../assets/images/triangle5.png);
 }
 .change{
  letter-spacing: 5px;
 }
</style>
