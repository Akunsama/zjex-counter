<template>
	<div >
			<div class="header">
				<div class="header-top navbar header_bg2">
					<div class="header-top-nav">
						<div class="header-top-logo">
							<img  :src="zjexlogo" />
						</div>
						<div class="header-top-navbar">
							<ul>
								<li class='active'><router-link to="/">首页</router-link></li>
								<li><router-link to="/equity-register">股权登记</router-link></li>
								<li><router-link to="/about-us">关于我们</router-link></li>
							</ul>
							<p> 
                <span v-if='!operIdFun'>
                  <!-- <a>注册</a>| -->
                  <a @click='loginShow' class='mui-cursor'>登录</a>
                </span>
                <span v-else>
                  <a   @click='uiBar'><router-link to="/todo/todoIndex">{{operName}}</router-link></a ><a class='mui-cursor' @click='loginOut'>退出</a>
                </span>
              </p>
						</div>
					</div>
				</div>
			</div>
 			<div class="popModal modal fade middleModal" id="myModalHead" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content" >
                  <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                      <h4 class="modal-title" id="myModalLabel">账号登录</h4>
                  </div>
                 <div class="modal-body">
              			<div>
              				<span><icon-svg icon-class="yonghuming" ></icon-svg></span><input id='user' v-model='user' placeholder='用户名' @change='userWat' maxlength="20"/>
                      <div class="el-form-item__error"></div>
              			</div>
              			<div>
              				<span><icon-svg icon-class="mima" ></icon-svg></span><input id='password' v-model='password' type='password' placeholder='密码只包含数字/字母' @change='passwordWat' maxlength="20"/>
                      <div class="el-form-item__error"></div>
              			</div>
              			<div class="phoneCode clearfix">
              				<div class='verifyCodeAll'>
              					<input class='verifyCode' id='code'  placeholder='验证码' v-model='verifyCode' @change='codeWat'>
              					<span><icon-svg icon-class="yanzheng"  ></icon-svg></span>
              				</div>
                              <button class="code" id="checkCode" @click="createCode" >{{code}}</button>
              				<!-- <button  @click='queryCodeFun'>获取验证码</button> -->
              				<font>
              					<icon-svg icon-class="cuohao" v-if='codeVali' ></icon-svg>
              					<icon-svg icon-class="duihao"   v-if='!codeVali'></icon-svg>
              				</font>
              			</div>
              			<div class='loginui'>
              				<button @click='login'>登录</button>
              			</div>
              	</div>
              <!-- 	<div class='dataDismiss'>
              		<a>立即注册</a>
              		<a>忘记密码</a>
              	</div> -->
              </div>
          </div>
      </div>
	</div>
</template>

<script>
  import zjexlogo from '@/assets/images/区块链-logo.png'
  import ApiService from '@/services/API-servies'
  import { isPhone , isLoginName , TwentyFun} from '@/utils/validate';
  import Cookies from 'js-cookie';
	
  export default {
    name: 'com-header',
    data() {
      return {
      		zjexlogo:zjexlogo,
      		codeVali:true,
      		verifyCode:'',
      		user:'',
      		password:'',
          code:'',
          operIdFun:false,
          operName: Cookies.get('operName'),
      }
    },
    props:{
      title:{
      	type:String,
        default:""
      }
    },
    methods: {
      userWat:function(){
        if (!isLoginName(this.user)) {
          $('#user').siblings('.el-form-item__error').html('仅限输入数字和英文字母')
          return false;
        }else if(!TwentyFun(this.user)){
          $('#user').siblings('.el-form-item__error').html('长度限制20个字符')
          return false;
        }else{
          $('#user').siblings('.el-form-item__error').html('')
          return true;
        }

      },
       passwordWat:function(){
        if (!isLoginName(this.password)) {
           $('#password').siblings('.el-form-item__error').html('仅限输入数字和英文字母')
            return false;
         }else if(!TwentyFun(this.password)){
           $('#password').siblings('.el-form-item__error').html('长度限制20个字符')
            return false;
         }else{
           $('#password').siblings('.el-form-item__error').html('')
            return true;
         }
      },
      codeWat:function(){
        if (this.verifyCode==this.code) {
          this.codeVali = false;
        }else{
          this.codeVali = true;
        }
      },
      uiBar:function(){
       $('ul li').siblings().removeClass('active')
      },
      barActive:function(){
        $('ul li').click(function(){
          $(this).addClass('active').siblings().removeClass('active')
        })
      },
      loginOut:function(){
        this.$store.dispatch('LogOut').then(() => {
           this.$router.push('/')
           this.operIdFun = false;

         }).catch(() => {

         });
      },
      createCode:function(){
             this.code =   Math.random().toString(36).substring(3,7)
             //验证码每30分钟自动改变一次
              setTimeout(() => {
                 this.createCode()
              }, 1800000)
      },
    	login:function(){
        if (!this.userWat()) {
          $('#user').focus()
        }else if(!this.passwordWat()){
          $('#password').focus()
        }else if(this.codeVali){
          $('#code').focus()
        }else{
          this.loginUserFun()
        };;
    	},
    	loginShow:function(){
    			$('#myModalHead').modal('show');
    	},
    	loginUserFun:function(){
      		const data = {};
    			data.password = $.des.getDes(this.password,this.user,'zjexZJEX');
    			if (!isPhone(this.user)) {
    				data.loginName = this.user;
    			}else{
    				data.mobile = this.user;
    			};
    			data.type ='1';

         this.$store.dispatch('LoginByCen', data).then((response) => {
          if (response.ret==0) {
            this.$router.push('/todo/todoIndex')
            $('#myModalHead').modal('hide');
            this.uiBar()
            this.operIdFun = true;
          };
            this.$notify({
                      title: '提示',
                      message: response.message,
                    });
          }).catch((error) => {
           console.log(error)
          });
      	},
    },
    mounted(){
    	this.barActive()
    },
    computed: {
   
    },
    watch:{
      
    },
    created() {
        this.createCode()
        if (Cookies.get('operId')) {
            this.operIdFun = true;
         }
       
    }
  }
</script>

<style   rel="stylesheet/scss" lang="scss" scoped>
//登陆弹窗
  .modal-dialog .modal-content{
  	width:640px;
  	height:470px;
    .modal-body{
      padding-top:70px;
        >div{
          position: relative;
          width: 250px;
          margin: 0 auto;
          span{
            position:absolute;
            width:35px;
            height:35px;
            left:0;

          }
          input{
            width:250px;
            text-indent:20px;
          }
        }
      .verifyCodeAll{
        position: relative;
      }
      //验证码
        .code {
            font-family: Arial;
            font-style: italic;
            color: #909090;
            border: 0;
            padding: 2px 3px;
            letter-spacing: 3px;
            font-weight: bolder;
            width:80px;
            height:35px;
        }
      //icon样式
        .svg-icon{
                color:#2EBAB4;
                font-size:17px;
                vertical-align: -webkit-baseline-middle;
                margin-top:1px;
            }
      //登陆条样式
        .loginui{
          button{
            border: 1px solid #2EBAB4;
            height: 35px;
            line-height: 35px;
            width:100%;
            background:#2EBAB4;
            color:#fff;
            border-radius:2px;
          }
        }
        .phoneCode{
            #code{
                 width:130px;
                 float:left;
            }
         
           button{
            width:85px;
            color:#2EBAB4;
            border:1px solid #2EBAB4;
            height:35px;
            line-height:35px;
            background:#fff;
            float:right;

            // hover变色
            &:hover{
                background:#2EBAB4;
                color:#fff
            }
           }
        }
    }
  }
.mui-cursor{
  cursor: pointer;
}

// header style
    .header-top-navbar a{
    	color:inherit;
    	text-decoration:none
    }

    .header{
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
    	transition: 1s ease background, 0.5s ease height;
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
    .header .header-top-nav .header-top-navbar ul li:after {
        content: '';
        position: absolute;
        left: 50%;
        width: 0%;
        height: 5px;
        background: #08c9f3;
        top: -5px;
        -webkit-transform: translateX(-50%);
            -ms-transform: translateX(-50%);
                transform: translateX(-50%);
        -webkit-transition: .15s;
                transition: .15s;
    }
    .header .header-top-nav .header-top-navbar ul li.active:after{
    	top: -4px !important;
    	height: 4px;
    } 
    .header .header-top-nav .header-top-navbar ul li:hover:after,
    .header .header-top-nav .header-top-navbar ul li:focus:after,
    .header .header-top-nav .header-top-navbar ul li:active:after {
        width: 100%;
    }
    .header .header-top-nav .header-top-navbar p{
    	position: absolute;
    	right: 20px;
    	top: 40px;
    	color: white;
    	margin-bottom: 0px;
    	
    }
    .header .header-top-nav .header-top-navbar p a:first-child{
    	margin-right: 10px;
    }
    .header .header-top-nav .header-top-navbar p a:last-child{
    	margin-left: 5px;
    }


 .header_bg{
 	background-color:  rgba(0,0,0,.65);
 }
 .header_bg2{
 	// background:#4790fe;
  //    background:-webkit-linear-gradient(left,#4790fe,#6478fe);
 	// background:-moz-linear-gradient(left,#4790fe,#6478fe);
 	// background:-o-linear-gradient(left,#4790fe,#6478fe);
 	// background:-ms-linear-gradient(left,#4790fe,#6478fe)
 	    background: -webkit-linear-gradient(left,#4790fe,#6478fe);
 }

// .dataDismiss{
//  width:140px;
//  margin:30px auto 0;
//  display:flex;
//  justify-content: space-between;
//  a{
//    cursor: pointer;
//    &:first-child{
//      color:#2EBAB4;
//    }
//  }
// }
</style>
