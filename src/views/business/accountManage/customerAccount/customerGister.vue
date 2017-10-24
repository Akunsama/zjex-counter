<template>
    <div>
        <div class="col-md-10 col-xs-10 col-lg-10 contentDIV">
            <div class="dataRecordDIV">
                <ul>
                    <li class="active">
                        <i></i>
                        <p>选择开户类型</p>
                    </li>
                    <li  class="active">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <i></i>
                        <p>填写注册信息</p>
                    </li>
                    <li>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <i></i>
                        <p>完成</p>
                    </li>
                </ul>
            </div>
    
            <div class="tableDIV dataRecordTable">
                <div class="dataRecord-step1" >
                    <table class="table dataRecord-step1-update ">
                        <thead>
                            <tr>
                                <th colspan="4">填写注册信息</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr >
                               <td></td>
                               <td>
                                   
                               </td>
                               <td></td>
                               <td>
                                   
                               </td>
                            </tr>
                            <tr >
                               <td>用户名</td>
                               <td>
                                   <input  v-model='loginName' type="text" class='loginName'  onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"   maxlength="20" >
                               </td>
                               <td>手机号码</td>
                               <td>
                                   <input   onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');"  v-model='mobile' class='mobile' type='text' maxlength="20">
                               </td>
                            </tr>
                            <tr>
                                <td>u盾密码</td>
                                <td>
                                    <input v-model='password' type='password' class='password' maxlength="6" onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');">
                                </td>
                                <td>确认u盾密码</td>
                                <td>
                                    <input v-model='usePassword' type='password' class='usePassword' maxlength="6" onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');">
                                </td>
                            </tr>
                             <tr>
                                <td>手机验证码</td>
                                <td class='phoneCode clearfix'>
                                    <input v-model='verifyCode'  id='code' onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');"  class='verifyCode' type='text' maxlength="6">
                                    <button @click='queryCodeFun'>获取验证码</button>
                                </td>
                                
                                <td></td>
                                <td>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class='useready'>
                        <li class='active'  @click='labelradio()'><input type="radio"> <label for="type2"> 我已阅读并同意<i>《用户协议》</i></label><span></span></li>
                    </div>
                    <p class="btn-next mui-top-padding">
                        <button  @click='returnstep0' >返回</button>
                        <button  @click="stockpro">下一步</button>
                    </p>
                </div>
            </div>
        </div>
        <!-- 弹框 （Modal） -->
        <div  class="popModal modal fade"  id="stockpro" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                       <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">U盾生成</h4>
                    </div>
                    <div class="modal-body">
                        <div class='mui-modal'>
                            <span>您注册已成功</span>
                             <p>U盾已生成，请保管好密码</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-save" data-dismiss="modal" @click='herfFun'>确认</button>
                        <button type="button" class="btn-close" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="popModal modal fade smallModal" id="myModalCode" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content" >
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">温馨提示</h4>
                    </div>
                    <div class="modal-body one-row">
                        {{codeView}}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-save btn-review"  data-dismiss="modal">确认</button>
                        <button type="button" class="btn-close" data-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import { verifyMsg } from 'api/AccountManagement/customerAccount';
// import { sendSMS} from 'api/AccountManagement/visitorQuery';

import ApiService from '@/services/API-servies'

import { isPhone ,isLoginName ,isPassword} from '@/utils/validate';
export default {
    name: "",
    data() {
        return {
            mobile:'',
            loginName:'',
            verifyCode:'',
            password:'',
            usePassword:'',
            codeView:''
        }
    },
    methods: {
        returnstep0(){
            this.$router.push('/customerAccount')
        },
        stockpro(){
            // $('#stockpro').modal('show');//测试 yao删除
            // 验证格式
            if (!this.loginName) {
                $('#myModalCode').modal('show');
                this.codeView = '用户名不能为空，请重新输入'
            }else if(!isPhone(this.mobile)) {
                $('#myModalCode').modal('show');
                this.codeView = '手机号码格式不正确，请重新输入'
            }else if(!isPassword(this.password)){
                $('#myModalCode').modal('show');
                this.codeView = 'U盾密码不正确，请重新输入'
            }else if(this.password!==this.usePassword){
                $('#myModalCode').modal('show');
                this.codeView = 'U盾密码不一致，请重新输入'
            }else{
                this.verifyMsg()
            };
          
        },
        labelradio(){
            $('.useready li').toggleClass('active')
        },
        herfFun(){
            // 跳转开户
            this.$router.push({ path: '/customerAccount', query: { is: 'mechanism', } });
        },
        queryCodeFun(){
            const data = {};
            data.mobile = this.mobile;
            data.type = 1;
            ApiService.common.sendSMS(data).then(response => {
            // sendSMS(data).then(response => {
               let {
                    data,
                    message,
                    ret
                } = response;
                if (ret==0) {
                     // 验证码发送成功
                     console.log('验证码发送成功')
                };
             })
        },
        registerFun(){
            const data = {};
            data.custType = '1';
            //测试
            data.userAddr = '0x'+String(Math.floor(Math.random()*1000000000000000));
            data.mobile = this.mobile;
            data.loginName = this.loginName;
            data.password = $.des.getDes(String(this.password),'','');
            ApiService.common.register (data).then(response => {
               let {
                    data,
                    message,
                    ret
                } = response;
                if (ret==0) {
                     console.log('注册成功');
                     $('#stockpro').modal('show');//跳开户页面
                }
                else {
                        this.$message.error(message);
                    }
             })
        },
        verifyMsg(){
            const data = {};
            data.mobile = this.mobile;
            data.loginName = this.loginName;
            data.type = 1;
            data.verifyCode = this.verifyCode;
            ApiService.business.verifyMsg(data).then(response => {
            // verifyMsg(data).then(response => {
               let {
                    data,
                    message,
                    ret
                } = response;
                if (ret==0) {
                     console.log('参数校验成功');
                     if (true) {};
                     //必选选中同意
                     
                     if ($('.useready li').attr('class')) {
                        this.registerFun()
                    }else{
                        $('#myModalCode').modal('show');
                        this.codeView = '请阅读用户协议'
                    };
                     
                }
                else {
                        if (ret==1) {
                            $('#myModalCode').modal('show');
                            this.codeView = message;
                        }else{
                            $('#myModalCode').modal('show');
                            this.codeView = '验证码有误，请重新输入'
                        };
                    }
             })
        },
    },
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>

.mui-modal{
    span{
        color:#2EBAB4
    }
    padding:35px 0 50px;
    p{
        line-height:40px;
    }
}
.tableDIV .dataRecord-step1-update > tbody > tr > td input{
    width:273px
}
.phoneCode{
    #code{
         width:148px;
         float:left;
    }
   button{
    width:93px;
    color:#488FFE;
    border:1px solid #488FFE;
    height:35px;
    line-height:35px;
    background:#fff;
    float:right;

    // hover变色
    &:hover{
        background:#488FFE;
        color:#fff
    }
   }
}
.mui-top-padding{
    padding-top:40px
}
.mui-top-margin{
    margin-top:60px;
}

.useready{
    color:#909090;
    text-align:center;
    i{
        color:#2EBAB4;
        font-style:normal
    }
    li{
        text-align: center;
        display: inline-block;
        vertical-align: middle;
        margin: 0px 25px;
        position: relative;
        cursor: pointer;
        input{
            width: 30px;
            height: 30px;
            display: inline-block;
            opacity: 0;
            position: absolute;
            top: 4px;
            left: -20px;
            margin: auto;
        }
        label{
            display: inline-block;
                font-size: 14px;
                color: #7A7A7A;
                font-weight: inherit;
        }
        span{
            position: absolute;
            top: 2px;
            left: -20px;
            margin: auto;
            display: block;
            width: 15px;
            height: 15px;
            border: 1px solid #7A7A7A;
            border-radius: 50%;
            cursor: pointer;
        }
    }
}
.useready .active span{
    border: 1px solid #2EBAB4;
    &:before{
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
}




.dataRecordDIV {
    height: 230px;
    background: url(images/request_bg.png) no-repeat;
    background-size: 100%, 100%;
    position: relative;
    padding-top: 105px;
    z-index: -2;
}

.dataRecordDIV:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    background: rgba(61, 62, 63, .85);
    z-index: -1;
}

.dataRecordDIV ul {
    padding: 0px;
    margin: 0px;
    z-index: 0;
    text-align: center;
}

.dataRecordDIV ul li {
    display: inline-block;
    position: relative;
}

.dataRecordDIV ul li i {
    background: url(images/dot_grey.png) no-repeat center;
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    margin: 0px 5px;
}

.dataRecordDIV ul li span {
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

.dataRecordDIV ul li p {
    position: absolute;
    color: #818181;
    margin: 0px;
    right: -60px;
    width: 150px;
    text-align: center;
    font-size: 14px;
}

.dataRecordDIV ul li:nth-of-type(odd) p {
    top: -45px;
}

.dataRecordDIV ul li:nth-of-type(even) p {
    top: 45px;
}

.dataRecordDIV ul li.active i {
    background: url(images/dot_blue.png) no-repeat center;
}

.dataRecordDIV ul li.active span {
    background: #4e6085;
}

.dataRecordDIV ul li.active p {
    color: #488FFE;
}

.dataRecord-table>thead>tr>th,
.dataRecord-table>tbody>tr>td {
    padding: 16px 0px 16px 120px !important;
}

.tableDIV .dataRecord-table>thead>tr>th:last-child,
.tableDIV .dataRecord-table>tbody>tr>td:last-child {
    padding: 16px 120px 16px 120px !important;
    text-align: center;
}

.tableDIV .dataRecord-table>tbody>tr>td:last-child button {
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

.tableDIV .dataRecord-table>tbody>tr>td:last-child button:hover,
.tableDIV .dataRecord-table>tbody>tr>td:last-child button:focus {
    border: 1px solid #488FFE;
    color: #488FFE;
}

.dataRecord-step1-update>tbody>tr>td {
    border-top: 1px solid #FFFFFF !important;
    border-bottom: 1px solid #FFFFFF !important;
    text-align: center;
}

.dataRecord-step1>table>tbody>tr>td:nth-of-type(even),
.detail-step1>table>tbody>tr>td:nth-of-type(even) {
    width: 315px;
    padding-left: 40px;
}

.dataRecord-step1>table>tbody>tr>td:nth-of-type(odd),
.detail-step1>table>tbody>tr>td:nth-of-type(odd) {
    width: 183px;
    text-align: center;
    padding-left: 0px;
}

.dataRecord-step1-update>tbody>tr>td input {
    height: 35px;
    width: 225px;
    border: 1px solid #EBEBEB;
    padding-left: 10px;
}

.dataRecord-step1-update>tbody>tr:nth-of-type(even) {
    background: #FFFFFF !important;
}

.dataRecord-step1 table div.pull-right {
    position: relative;
}



.dataRecord-step1-query>tbody>tr>td,
.detail-step1-table>tbody>tr>td {
    border-right: 1px solid #EBEBEB;
}

.dataRecord-step1-query>tbody>tr:first-child>td {
    border-top: none !important;
}

.dataRecord-step1-query>tbody>tr>td:last-child,
.detail-step1-table>tbody>tr>td:last-child {
    border-right: none;
}

.dataRecord-step1-query>tbody>tr>td input {
    width: 225px;
    height: 35px;
    border: 1px solid #FFFFFF;
    background: transparent;
}

.dataRecord-step1-query>tbody>tr>td input:focus {
    border: 1px solid #FFFFFF !important;
    box-shadow: none;
}

.dataRecord-step1 thead th button.btn-sm1 {
    position: absolute;
    right: 35px;
}
.dataRecord-step2 thead th button.btn-sm1 {
    position: absolute;
    right: 35px;
}


.dataRecord-step3 {
    margin-bottom: 150px;
}





.dataRecordTable p.btn-next {
    display: block;
}



.errorActive{
    border:1px solid #ff4949!important;
}



</style>

