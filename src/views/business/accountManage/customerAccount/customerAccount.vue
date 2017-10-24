<template>
    <div>
        <div id="player" class='cpdf' v-show='playervar'></div>
        <div class="col-md-10 col-xs-10 col-lg-10 contentDIV">
            <div class="dataRecordDIV">
                <ul>
                    <li class="active">
                        <i></i>
                        <p>选择开户类型</p>
                    </li>
                    <li>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <i></i>
                        <p>填写开户信息</p>
                    </li>
                    <li>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <i></i>
                        <p>资料上传</p>
                    </li>
                    <li>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <i></i>
                        <p>查看结果</p>
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
                <div class="dataRecord-info">
                    <table class="table dataRecord-table">
                        <thead>
                            <tr>
                                <th class="text-center">序号</th>
                                <th>业务类型</th>
                                <th>编辑账户</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center">1</td>
                                <td>个人投资者联合开户</td>
                                <td>
                                    <button @click="firstBtn('personal')">开户</button>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-center">2</td>
                                <td>机构投资者联合开户</td>
                                <td>
                                    <button @click="firstBtn('mechanism')">开户</button>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-center">3</td>
                                <td>机构投资者注册</td>
                                <td>
                                    <button @click="firstBtn('register')">注册</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="dataRecord-step1" v-bind:class='{"is-none":isNone1}'>
                    <table class="table dataRecord-step1-update">
                        <thead>
                            <tr>
                                <th colspan="4">填写基本信息
                                    <!-- <button id="enterprise" class="btn-sm1 mui-right" @click="enterprise">{{statusval}}</button> -->
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="4">
                                    <div class="pull-right">*&nbsp;以下信息需填写完整，方可进行下一步操作</div>
                                </td>
                            </tr>
                            <tr>
                                <td>客户名称</td>
                                <td>
                                    <span v-if="statusval=='保存'">{{fetchData.name}}</span>
                                    <input v-model="fetchData.name" v-else maxlength="20">
                                </td>
                                <td>证件类型</td>
                                <td class='mui-insetfocus'>
                                     <span v-if="statusval=='保存'">{{fetchData.certType | certTypeFilter }}</span>
                                     <el-select v-else v-model="fetchData.certType" clearable placeholder="" >
                                       <el-option
                                         v-for="item in certTypeall"
                                         :key="item.value"
                                         :label="item.label"
                                         :value="item.value">
                                       </el-option>
                                     </el-select>
                                 </td>
                            </tr>
                            <tr>
                                <td>证件号码</td>
                                <td>
                                    <span v-if="statusval=='保存'">{{fetchData.certNo}}</span>
                                    <input   v-model="fetchData.certNo" v-else  id='certNo'  onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"   maxlength="20">                              
                                </td>
                                <td>确认证件号码</td>
                                <td>
                                    <span v-if="statusval=='保存'">{{certNo}}</span>
                                    <input v-model="certNo" v-else maxlength="20"  onkeyup="value=value.replace(/[^\w\.\/]/ig,'')" >
                                </td>
                            </tr>
                            <tr>
                                <td>资金密码</td>
                                <td>
                                    <span v-if="statusval=='保存'">{{fetchData.transPwd}}</span>
                                    <input v-model.number="fetchData.transPwd" type='password' maxlength="6" onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');"   v-else>                              
                                </td>
                                <td>确认资金密码</td>
                                <td>
                                    <span v-if="statusval=='保存'">{{transPwd}}</span>
                                    <input v-model.number="transPwd"  type='password' onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');"  maxlength="6" v-else>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="btn-next">
                        <button  @click='returnstep0'>返回</button>
                        <button id="step1" @click="step1">下一步</button>
                    </p>
                </div>
    			<div class="dataRecord-step2" v-bind:class='{"is-none":isNone2}'>
    			    <table class="table dataRecord-step1-update">
    			        <thead>
    			            <tr>
    			                <th colspan="4">填写扩展信息
    			                    <!-- <button  class="btn-sm1 mui-right" @click="enterprise">{{statusvaltwo}}</button> -->
    			                </th>
    			            </tr>
    			        </thead>
    			        <tbody>
    			            <tr>
    			                <td colspan="4">
    			                    <div class="pull-right">*&nbsp;以下信息为扩展信息，可选填</div>
    			                </td>
    			            </tr>
    			            <tr>
    			                <td>联系电话</td>
    			                <td>
    			                    <span v-if="statusvaltwo=='保存'">{{corporationTel}}</span>
    			                    <input v-model="corporationTel" type='text' maxlength="20" onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');"  v-else>
    			                </td>
                                <td>联系地址</td>
                                <td>
                                     <span v-if="statusvaltwo=='保存'">{{corporationAddress}}</span>
                                    <input v-model="corporationAddress"  maxlength="100"  v-else>                                  
                                </td>
    			            </tr>
                            <!-- <tr>
                                <td v-if='fetchData.type=="2"'>联系手机</td>
                                <td v-if='fetchData.type=="2"'>
                                     <span v-if="statusvaltwo=='编辑'">{{fetchData.mobile}}</span>
                                    <input v-model='fetchData.mobile' v-else>                                  
                                </td>
                                <td></td>
                                <td>
                                </td>
                            </tr> -->
    			        </tbody>
    			    </table>
    			    <p class="btn-next ">
    			    	<button  @click='returnstep1'>返回</button>
    			        <button id="step1" @click="step2">下一步</button>
    			    </p>
    			</div>

                <!--机构开户  显示  经办人 -->
                <div class="dataRecord-step3 transactor"  v-bind:class='{"is-none":isNone3}' v-if='mechanism'>
                    <table class="table dataRecord-step1-update">
                        <thead>
                            <tr>
                                <th colspan="4">填写经办人信息
                                    <button id="enterprise" class="btn-sm1 mui-right" >保存</button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="4">
                                    <div class="pull-right">*&nbsp;以下信息需填写完整，方可进行下一步操作</div>
                                </td>
                            </tr>
                            <tr>
                                <td>客户名称</td>
                                <td>
                                    <input v-model='fetchData.transactorName' maxlength="20" >
                                </td>
                                <td>证件类型</td>
                                <td class='mui-insetfocus'>
                                     <el-select v-model="fetchData.transactorCertType" clearable placeholder="" >
                                       <el-option
                                         v-for="item in certTypeall"
                                         :key="item.value"
                                         :label="item.label"
                                         :value="item.value">
                                       </el-option>
                                     </el-select>
                                 </td>
                            </tr>
                            <tr>
                                <td>证件号码</td>
                                <td>
                                    <input v-model="fetchData.transactorCertNo" maxlength="20"  onkeyup="value=value.replace(/[^\w\.\/]/ig,'')" >
                                </td>
                                <td>确认证件号码</td>
                                <td>
                                    <input v-model="transactorCertNo" maxlength="20"  onkeyup="value=value.replace(/[^\w\.\/]/ig,'')" >
                                </td>
                            </tr>
                            <tr>
                                <td>联系手机</td>
                                <td>
                                    <input v-model="fetchData.transactorMobile"  onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');" maxlength="20">                                  
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="btn-next">
                        <button @click='returnstep2'>返回</button>
                        <button  @click="step3">下一步</button>
                    </p>
                </div>
                <!--机构开户  显示  开户信息 -->
                <div class="dataRecord-step3 "  v-bind:class='{"is-none":isNone4}' v-if='mechanism'>
                    <table class="table dataRecord-step1-update">
                        <thead>
                            <tr>
                                <th colspan="4">填写其他信息
                                    <button id="enterprise" class="btn-sm1 mui-right" >保存</button>
                                </th>
                            </tr>
                        </thead>
                        <!-- 其他信息组件 -->
                        <elseInfo ref='extendInfo'></elseInfo>    
                    </table>
                    <p class="btn-next">
                        <button @click='returnstep3'>返回</button>
                        <button  @click="step4">下一步</button>
                    </p>
                </div>
                <div class="dataRecord-step4 mui-noborder" v-bind:class='{"is-none":isNone5}'>
                    <table class="table data-table-no-border mui-padding-table">
                        <thead>
                            <tr>
                                <th>影印件上传</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                             <!-- 机构开户显示 -->
                            <tr v-if='mechanism'>
                                <td>机构营业执照或统一社会信用代码证件(必传)</td>
                                <td  align='right'>
                                        <span class='mui-operationTips' ><em>
                                        <i>{{businessLicense.beginName}}</i>
                                        <div class="tipsPop" v-if='businessLicense'>
                                           {{businessLicense.uploadName}}
                                        </div>
                                        <i>{{businessLicense.endName}}</i></em></span>
                                        <button class="btn-sm2 upload-pop" @click="upload('businessLicense')">上传</button>
                                </td>
                            </tr>
                            <tr>
                                <td>{{isregister}}身份证正面(必传)</td>
                                <td  align='right'>
                                        <span class='mui-operationTips' ><em>
                                        <i>{{idCard1.beginName}}</i>
                                        <div class="tipsPop" v-if='idCard1'>
                                           {{idCard1.uploadName}}
                                        </div>
                                        <i>{{idCard1.endName}}</i></em></span>
                                        <button class="btn-sm2 upload-pop" @click="upload('idCard1')">上传</button>
                                </td>
                            </tr>
                            <tr>
                                <td>{{isregister}}身份证反面(必传)</td>
                                <td  align='right'>
                                        <span class='mui-operationTips' ><em>
                                        <i>{{idCard2.beginName}}</i>
                                        <div class="tipsPop" v-if='idCard2'>
                                           {{idCard2.uploadName}}
                                        </div>
                                        <i>{{idCard2.endName}}</i></em></span>
                                        <button class="btn-sm2 upload-pop" @click="upload('idCard2')">上传</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="btn-next">
                        <button  @click='returnstep4'>返回</button>
                        <button  @click="step5">下一步</button>
                    </p>
                </div>
    			
                <div class="dataRecord-step5" v-bind:class='{"is-none":isNone6}'>
                   <table class="table mui-padding-table">
                                         <thead>
                                           <tr>
                                             <th >查看结果</th>
                                              <th ></th>
                                           </tr>
                                         </thead>
                                         <tbody >
                                           <tr>
                                             <td>客户代码</td>
                                             <td><span>{{res.custNo}}</span></td>
                                           </tr>
                                           <tr>
                                             <td>客户姓名</td>
                                             <td><span>{{fetchData.name}}</span></td>
                                           </tr>
                                           <tr>
                                             <td>证件类型</td>
                                             <td><span>{{fetchData.certType | certTypeFilter}}</span></td>
                                           </tr>
                                           <tr>
                                             <td>证件号码</td>
                                             <td><span>{{fetchData.certNo}}</span></td>
                                           </tr>
                                           <tr>
                                             <td>客户类型</td>
                                             <td><span>{{res.custType | custTypeFilter}}</span></td>
                                           </tr>
                                           <tr>
                                             <td>申请状态</td>
                                             <td class='iconcustom'>
                                                <span>
                                                    <icon-svg icon-class="duihao"  v-if='istrue'></icon-svg>
                                                    <icon-svg icon-class="cuohao"  v-else></icon-svg>
                                                </span>
                                                <span>{{requestStatus}}</span>
                                             </td>
                                           </tr>
                                         </tbody>
                                       </table>
                    <p class="btn-next mui-noborder">
                        <button v-if='istrue' @click='saveRecord'>保存凭证</button>
                        <button v-else  @click='reAccount'>重新开户</button>
                    </p>
                </div>
            </div>
        </div>
        <div class="popModal modal fade smallModal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content" >
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">温馨提示</h4>
                    </div>
                    <div class="modal-body one-row">
                        该用户已开户
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-save btn-review"  data-dismiss="modal">确认</button>
                        <button type="button" class="btn-close" data-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 弹框 （Modal） -->
        <div  class="popModal modal fade"  id="uploadModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                       <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">选择要上传的文件</h4>
                    </div>
                    <div class="modal-body">
                     <ul>
                         <li>
                             <span>模版下载</span>
                             <button class="grey"><i class="fa fa-fw fa-download"></i></button>
                         </li>
                         <li class='mui-loadBox'>
                             <span>文件上传</span>
                             <button @click="triggerFile()"><i class="fa fa-fw fa-upload"></i></button>
                             <form enctype='multipart/form-data'>
                                 <input name="file" class="mui-uploadInput" type="file" @change='uploadFileFun($event)'>
                             </form>
                         </li>
                     </ul>
                     <div class="prompt">
                       <!--  <p class='tips'>
                            提示：文件类型为jpg类型
                        </p> -->
                     </div>
                     <p>状态：{{uploadStatus}}<font>{{uploadName}}</font></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-save" data-dismiss="modal">确认</button>
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

// import { openAccount,queryAccount} from 'api/AccountManagement/customerAccount';
// import { uploadFile } from 'api/common';

import ApiService from '@/services/API-servies'

import { isPhone ,isTypeID ,isPassword, isLoginName} from '@/utils/validate';

import elseInfo from '@/components/customerAccount/elseInfo.vue'

export default {
    name: "",
    data() {
        return {
            state: '',
            uploadStatus:'未上传',
            uploadName:'',
            idCard2:'',
            idCard1:'',
            businessLicense:'',
            codeView:'',
            isNone1:true,
            isNone2:true,
            isNone3:true,
            isNone4:true,
            isNone5:true,
            isNone6:true,
            res:{
                userId:'',
                custType:null,
                status:null
            },
            item:[
                

            ],
            certNo:'',//确认证件号码
            transPwd:'',//确认交易密码
            transactorCertNo:'',//确认经办人证件号码
            statusval:'编辑',
            statusvaltwo:'编辑',
            istrue:true,
            requestStatus:'',
            isregister:'经办人',
            mechanism:false,
            personal:false,
            fileName:'',//上传名称
            fetchData:{
                userId:'',//传空
                branchCode:1110,
                branchCodeFlag:2,
                currencyCode:0,
                name:'',
                certType:1,
                certNo:'',
                type:null,
                transPwd:'',
                fileIds:{idCard1:'',idCard2:'',businessLicense:''},
                filePaths:{idCard1:'',idCard2:'',businessLicense:''},

                mobile:'',

                transactorName:'',//经办人名称
                transactorCertType:1,//经办人证件类型
                transactorCertNo:'',//经办人证件号
                transactorMobile:'',//经办人手机号
            },
            custmerno:'',
            corporationAddress:"",
            corporationTel:"",
            playervar:false,
            certTypeall: [
                  {
                     value: 1,
                     label: '身份证'
                   }, 
                   {
                     value: 2,
                     label: '营业执照'
                   },
                   {
                     value: 3,
                     label: '统一信用代码'
                   }],
        }
    },
    created() {
        
    },
    mounted(){
        this.firstBtn(this.$route.query.is)
    },
    methods: {
        saveRecord:function(){
            //开户打印
            if (this.custmerno) {
                const msg = {};
                msg.custMerno = this.custmerno;
                msg.operName = this.$store.getters.operName;
                ApiService.common.openAccount(msg).then(response => {
                     this.playervar = true;
                     $('#player').append('<embed width="100%" height="100%" name="plugin" id="plugin" src="' + window.URL.createObjectURL(response) + '" type="application/pdf" internalinstanceid="154">')
                })
            };
        },
        certNoWat:function(){
          if (!isLoginName(this.fetchData.certNo)) {
            $('#certNo').siblings('.el-form-item__error').html('仅限输入数字和英文字母')
            return false;
          }else{
            $('#certNo').siblings('.el-form-item__error').html('')
            return true;
          }

        },
       openAccountFun(){
        // 加密交易密码
        this.fetchData.transPwd = $.des.getDes(String(this.fetchData.transPwd),'','');
        console.log(this.fetchData)
        ApiService.business.openAccount(this.fetchData).then(response => {
        // openAccount(this.fetchData).then(response => {
           let {
                data,
                message,
                ret
            } = response;
            if (ret==0) {
                 this.res = data;
                // 开户成功
                this.istrue = true;
                this.requestStatus = '开户成功'

                this.custmerno = data.custMerno;
                if (this.custmerno) {
                    // 提交其他信息
                     this.extendInfoFun()   //开户成功  提交其他信息
                };
                
            }else{
                // 开户失败
                this.istrue = false;
                this.requestStatus = '开户失败'
                this.$notify({
                  title: '提示',
                  message: message,
                });
            };
         })
        },
        triggerFile() {
            $(".mui-uploadInput").trigger('click');
        },
        uploadFileFun(e){
            this.uploadStatus = '上传中';
            const fileName = this.fileName;
            const file =  e.target.files[0];
             ApiService.files.uploadFile(file,'postfile').then(response => {
                // uploadFile(data).then(response => {
                let {
                     data,
                     message,
                     ret
                 } = response;
                if (ret==0) {
                   //上传成功 赋值参数
                   this.fetchData.fileIds[fileName] = data.fileId;
                   this.fetchData.filePaths[fileName] = data.filePath; 

                   // 显示文件上传状态  上传名字  处理item数据 
                   this.uploadStatus = '已上传';//上传状态uploadStatus
                   this.uploadName = file.name;//上传文件名uploadName

                   const str = this.uploadName;
                   const beginName = str.substr(0,str.indexOf('.'));
                   const endName = str.substr(str.indexOf('.'),str.length);
                   
                    if (this.fileName=='idCard1') {
                        const cardAll1 = {};
                        cardAll1.beginName = beginName;
                        cardAll1.endName = endName;
                        cardAll1.uploadStatus = this.uploadStatus;
                        cardAll1.uploadName = str;
                        cardAll1.fileName = 'idCard1';
                        this.idCard1 = cardAll1;
                    }else if(this.fileName=='idCard2'){
                        const cardAll2 = {};
                        cardAll2.beginName = beginName;
                        cardAll2.endName = endName;
                        cardAll2.uploadStatus = this.uploadStatus;
                        cardAll2.uploadName = str;
                        cardAll2.fileName = 'idCard2';
                        this.idCard2 = cardAll2;
                    }else if(this.fileName=='businessLicense'){
                        const cardAll3 = {};
                        cardAll3.beginName = beginName;
                        cardAll3.endName = endName;
                        cardAll3.uploadStatus = this.uploadStatus;
                        cardAll3.uploadName = str;
                        cardAll3.fileName = 'businessLicense';
                        this.businessLicense = cardAll3;
                    };
                }
             })
        },
        reAccount(){
            this.firstBtn("personal")
            //标题状态
            //当前隐藏
            $(".dataRecordDIV ul li").eq(1).addClass("active").siblings().removeClass("active");
            $(".dataRecordDIV ul li").eq(0).addClass("active")
             this.isNone6 = true;
        },
        firstBtn(is) {
            if (is=='register') {
                this.$router.push('/customerAccount/customerGister')
                this.fetchData.type= 3
            }else{
                // 初始 数据清空
                // this.fetchData={};
                //重新开户
               
                $(".dataRecord-info").hide();
                this.isNone1 = false;
                $(".dataRecordDIV ul li").eq(1).addClass("active");

                if (is=='mechanism') {
                    this.mechanism = true
                    this.fetchData.type = 2 //客户类型
                }else if(is=='personal'){
                    this.personal = true
                    this.fetchData.type = 1 //客户类型
                }else if(!is){
                    this.returnstep0()
                }
            };
        },
        enterprise() {
            // if (this.statusval == "保存") {
            //      this.statusval ='编辑'
            //     $(".dataRecord-step1 table").removeClass("dataRecord-step1-update").addClass("dataRecord-step1-query");
            // } else {
            //     this.statusval ='保存'
            //     $(".dataRecord-step1 table").addClass("dataRecord-step1-update").removeClass("dataRecord-step1-query");
            // }
        },
        returnstep0(){
           this.isNone1 = true;
           $(".dataRecord-info").show();
           $(".dataRecordDIV ul li").eq(1).removeClass("active");
        },
        returnstep1(){
            this.isNone1 = false;
            this.isNone2 = true;
            $(".dataRecordDIV ul li").eq(1).addClass("active");
        },
        returnstep2(){
            this.isNone3 = true;
            this.isNone2 = false;
            this.isNone4 = true;

        },
        returnstep3(){
            this.isNone4 = true;
            $(".dataRecordDIV ul li").eq(2).removeClass("active");
            if (this.mechanism) {
                this.isNone3 = false;

            }else{
                 this.isNone2 = false;
            };
        },
        returnstep4(){
            this.isNone5 = true;
            $(".dataRecordDIV ul li").eq(2).removeClass("active");
            if (this.mechanism) {
                this.isNone4 = false;
            }else{
                 this.isNone2 = false;
            };
        },
        step1() {
            //测试
                // this.isNone1 = true;
                // this.isNone2 = false;
            // 测试 end

             // 验证字段
             if (!this.fetchData.certType) {
                $('#myModalCode').modal('show');
                this.codeView = '请选择证件类型'
             }else  if (!isTypeID(this.fetchData.certNo,this.fetchData.certType)) {
                console.log(isTypeID(this.fetchData.certNo,1))
                $('#myModalCode').modal('show');
                this.codeView = '证件号有误，请重新输入'
             }else{
                // 验证是否开户
                this.isAccountFun()
             }
        },
        isAccountFun(){
            const data = {};
            data.certType = Number(this.fetchData.certType);
            data.certNo = this.fetchData.certNo;
            console.log(data)
            ApiService.business.queryAccount(data).then(response => {
            // queryAccount(data).then(response => {
               let {
                    data,
                    message,
                    ret
                } = response;
                if (ret==0) {
                    if (data.isAccount==1) {
                        // 弹窗提示
                         $('#myModal').modal('show');
                    }else if(data.isAccount==2){
            
                        // 未开户继续验证
                        if (!this.fetchData.name) {//客户名称必填
                            $('#myModalCode').modal('show');
                            this.codeView = '请填写客户名称'
                        }else if(this.certNo!==this.fetchData.certNo){
                            $('#myModalCode').modal('show');
                            this.codeView = '证件号码不一致'
                        }else if(!isPassword(this.fetchData.transPwd)){
                            $('#myModalCode').modal('show');
                            this.codeView = '资金密码为6位数字，请重新输入'
                        }else if(this.transPwd!==this.fetchData.transPwd){
                            $('#myModalCode').modal('show');
                            this.codeView = '资金密码不一致'
                        }else{
                            this.isNone1 = true;
                            this.isNone2 = false;
                        };
                    }
                     // address钱包文件   custType游客类型    status状态
                };
             })
        },
        step2() {
             this.isNone2 = true;
            if ($(".transactor").length>0) {
                this.isNone3 = false;
            }else{
                 this.isNone5 = false;
                 this.isregister = '个人'
                 $(".dataRecordDIV ul li").eq(2).addClass("active");
            };

            // 扩展信息未验证 非必填
        },
        step3() {
            // 测试
                // this.isNone3 = true;
                // this.isNone4 = false;
            // 测试 end
           
             // 验证经办人信息
             if (!this.fetchData.transactorName) {//客户名称必填
                 $('#myModalCode').modal('show');
                 this.codeView = '请填写客户名称'
             }else if (!this.fetchData.transactorCertType) {
                $('#myModalCode').modal('show');
                this.codeView = '请选择证件类型'
             }else  if (!isTypeID(this.fetchData.transactorCertNo,this.fetchData.transactorCertType)) {
                $('#myModalCode').modal('show');
                this.codeView = '证件号有误，请重新输入'
             }else if(this.transactorCertNo!==this.fetchData.transactorCertNo){
                $('#myModalCode').modal('show');
                this.codeView = '证件号码不一致'
             }else if(!isPhone(this.fetchData.transactorMobile)){
                $('#myModalCode').modal('show');
                this.codeView = '联系手机有误，请重新输入'
             }else{
                this.isNone3 = true;
                this.isNone4 = false;
             }
        },
        // queryCust(){
        //     const data = {};
        //     data.userId = this.$store.getters.userId;
        //     ApiService.common.queryCust(data).then(response => {
        //         let {
        //              data,
        //              message,
        //              ret
        //          } = response;
        //          if (ret==0) {
        //             return data;
        //          };
        //     })
        // },
        extendInfoFun(){
            // 提交其他信息 数据
            const data = {};
            data.corporationTel = this.corporationTel;
            data.corporationAddress = this.corporationAddress;
            data.operId = this.$store.getters.operId;
            data.custmerno = this.custmerno;//客户内码
            if (!this.personal) {
                const elseData = this.$refs.extendInfo.elseData;
                elseData.registerDate = $('#start_time').val();
            };
            console.log(data)
            ApiService.business.extendInfo(data).then(response => {
                let {
                     data,
                     message,
                     ret
                 } = response;
                 if (ret==0) {
                    // 提交成功
                 };
            })
        },
        step4() {
            this.isNone4 = true;
            this.isNone5 = false;
             $(".dataRecordDIV ul li").eq(2).addClass("active");
             
        },
        step5() {
            if (!this.mechanism) {
                    // 验证  文件必传
                    if (this.idCard1.uploadName&&this.idCard2.uploadName) {
                        this.isNone5 = true;
                        this.isNone6 = false;
                        $(".dataRecordDIV ul li").eq(3).addClass("active");

                        // 调用开户
                        if (this.fetchData.type==1) {

                            // 清除经办人 
                            delete this.fetchData.transactorName
                            delete this.fetchData.transactorCertType
                            delete this.fetchData.transactorCertNo
                            delete this.fetchData.transactorMobile

                            // 清除机构上传信息businessLicense
                            delete this.fetchData.fileIds.businessLicense
                            delete this.fetchData.filePaths.businessLicense

                        };
                        this.openAccountFun()
                    }else{
                        $('#myModalCode').modal('show');
                        this.codeView = '请上传必传文件'
                    };
            }else{
                // 验证  文件必传
                if (this.idCard1.uploadName&&this.idCard2.uploadName&&this.businessLicense.uploadName) {
                    this.isNone5 = true;
                    this.isNone6 = false;
                    $(".dataRecordDIV ul li").eq(3).addClass("active");
                    this.openAccountFun()
                }else{
                    $('#myModalCode').modal('show');
                    this.codeView = '请上传必传文件'
                };
            };
            
        },
        upload(fileName) {
            $('#uploadModal').modal('show');
            $('#uploadModal .prompt .tips').hide();
            // $('.stencil').removeClass("grey");
            this.fileName = fileName;
            this.uploadName ="";
            this.uploadStatus='未上传'
        },
    },
    components: {
            elseInfo,
        }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>

// .tableDIV .table>tbody>tr>td span{
//     width:220px;
//     i{
//         font-style:normal;
//         max-width:125px;
//         padding-left:15px;
//         text-overflow: ellipsis;
//         white-space: nowrap;
//         display:inline-block;
//         overflow: hidden;
//         vertical-align: middle;
//     }
// }
// 去掉线条  删除table scss里面的inportant权重
.mui-noborder{
    tr,td{
        border-top:none;
        background:#fff
    }
    .table > tbody > tr:last-child > td{
        border-bottom:0
    }
}
.prompt{
        height: 85px;
    }
.is-none{
    display:none;
}

// 选择框宽度
    .el-select{
        width:225px;
        margin-right:0
    }
  
// icon字体style
    .iconcustom{
        .svg-icon{
            color:#2EBAB4;
            font-size:22px;
        }
        span{
            color:#2EBAB4;
        }
        span:first-child{
            width:30px
        }
    }

    #uploadModal{
        font{
            float:right
          }
    }
// 弹框样式 
#uploadModal .modal-dialog .modal-content .modal-body ul{
	margin-bottom:25px;
}

#uploadModal .modal-dialog .modal-content .modal-body .prompt {
    overflow: hidden;
    padding: 0px 0px 0px 0px;
    color: #7a7a7a;
    font-size: 14px;
    text-align: left;
    height: 70px;
    line-height: 1.2;
}

// 列表查看页面样式
.mui-padding-table>thead>tr>th:first-child,.mui-padding-table>tbody>tr>td:first-child{
    padding-left: 75px;
    width:250px-35px;
}
.mui-padding-table{
    .btn-sm2{
        margin-left:15px;
    }
}
// 影印左边长度auto  三栏式
.data-table-no-border>thead>tr>th:first-child,.data-table-no-border>tbody>tr>td:first-child{
    width:auto
}
// 头部进程样式
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
// 进程end
// 选择开户类型
    // 表格样式
        .dataRecord-table>thead>tr>th,
        .dataRecord-table>tbody>tr>td {
            padding: 16px 0px 16px 120px
        }
        .tableDIV .dataRecord-table>thead>tr>th:last-child,
        .tableDIV .dataRecord-table>tbody>tr>td:last-child {
            padding: 16px 120px 16px 120px;
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
    // 表格样式end

// 填写开户信息
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

   

    // 保存 编辑按钮右移动
    .mui-right{
        position: absolute;
        right: 35px;
    }
    .dataRecordTable p.btn-next {
        display: block;
    }



    .mui-noborder{
        border-bottom:none
    }

    // 覆盖该伪类
    .dataRecord-step1 table div.pull-right:before{
        content:'';
        background:#fff
    }
    .mui-loadBox{
        position: relative;
        form{
            position: absolute;
            right: 0px;
            top: 0px;
            width:50px;
            height:25px;
            overflow:hidden;
            z-index:-1;
        }
        .mui-uploadInput{
             font-family: Arial;
             font-size: 118px;
             margin: 0px;
             padding: 0px;
             cursor: pointer;
             visibility: hidden;
             height: 100%;
             filter:alpha(opacity=0);
            -moz-opacity:0;
            outline:none;
         }
    }

</style>

