<template>
 <div id="base">
   <div class="step-one">
     <table class="table userinfo-table input-none">
       <thead>
         <tr>
           <th >基本信息</th>
            <th><span class="changebase" @click='changebase'  v-bind:class='{"is-disabled":isA}'>{{statusval}}</span></th>
            <!-- <el-button class='changebase'  v-on:click='changebase' type="primary" size="small" :disabled="statusval=='完成'">{{statusval}}</el-button> -->
         </tr>
       </thead>
       <tbody v-if='baseone'  v-bind:class="{ 'class-edit': isA }" class="basebody">
         <tr>
           <td>登录账户</td>
           <td><span>Leilani</span></td>
         </tr>
         <tr>
           <td>账户类别</td>
           <td><span>托管机构</span></td>
         </tr>
         <tr>
           <td>资金帐号</td>
           <td><span>23424242342</span></td>
         </tr>
         <tr>
           <td>登记账号</td>
           <td><span>234729874923874</span></td>
         </tr>
         <tr>
           <td>客户名称</td>
           <td>
            <span v-if="statusval=='变更'">杭州市沁科技有限公司</span>
            <input value="杭州市沁科技有限公司" v-else>
            </td>
         </tr>
         <tr>
           <td>证件类型</td>
           <td class='mui-insetfocus'>
                <span v-if="statusval=='变更'">{{idtype}}</span>
                <el-select v-else v-model="idtype" clearable placeholder="" >
                  <el-option
                    v-for="item in options"
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
            <span v-if="statusval=='变更'">456456456456</span>
            <input  value="456456456456" v-else>
           </td>
         </tr>
         <tr>
           <td>注册手机</td>
           <td><span>18956452541</span></td>
         </tr>
       </tbody>
       <tbody v-else class='class-edit steptwo'>
         <tr>
           <td >身份证正反面</td>
           <td><p>查看文件：  身份证.jpg</p><button class='btn-sm2' @click='fileinset'>上传</button></td>
         </tr>
         <tr>
            <td >工商部门出具的变更证明材料</td>
            <td><p>查看文件：  身份证.jpg</p><button class='btn-sm2' @click='fileinset'>上传</button></td>
         </tr>
       </tbody>
     </table>
     <div class='nextstep' v-if="statusval=='完成'">
       <button  v-if="!baseone"  @click='returnstep'>返回</button><button id="ca-btn" @click='oncestep' >下一步</button>
     </div>
   </div>

   <!-- 弹窗 -->
   <!-- 弹框 （Modal） -->
   <div class="popModal modal fade smallModal" id="caModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
       <div class="modal-dialog">
           <div class="modal-content" id="caing" v-if='caingshow'>
               <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                   <h4 class="modal-title" id="myModalLabel">CA验证</h4>
               </div>
               <div class="modal-body">
                <div>
                    <p>您的CA意见插入并匹配成功</p>
                    <p>账户名称为：XXXXX企业</p>
                </div>
                <div>
                    <p>请点击CA的<font>"OK"</font>按钮，完成CA认证步骤</p>
                    <p>CA还未确认，还剩<font>98</font>秒</p>
                </div>
               </div>
               <div class="modal-footer">
                   <button type="button" class="btn-save" id="ca-complete"  @click='cacomplete'>完成</button>
               </div>
           </div>
           <div class="modal-content" id="caed" v-else>
               <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                   <h4 class="modal-title" id="myModalLabel">初始登记提交成功</h4>
               </div>
               <div class="modal-body">
                将进行审核，请到<font>我的账户 - 我的请求</font>查看审核进度
               </div>
               <div class="modal-footer">
                   <button type="button" class="btn-save" id="ca-finished" @click='cafinished'>确认</button>
               </div>
           </div>
       </div>
   </div>
  
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
                    <li>
                        <span>文件上传</span>
                        <button><i class="fa fa-fw fa-upload"></i></button>
                    </li>
                </ul>
                <div class="prompt">
                </div>
                <p>状态：已上传<font>文件名.zip</font></p>
               </div>
               <div class="modal-footer">
                   <button type="button" class="btn-save" data-dismiss="modal">确认</button>
                   <button type="button" class="btn-close" data-dismiss="modal">关闭</button>
               </div>
           </div>
       </div>
   </div>
 </div>
</template>

<script>
  
  export default {
   data() {
       return {
        statusval:'变更',
        isA:false,
        idtype:'营业执照',
        baseone:true,
        index:null,
        options: [{
                 // label: '营业执照',
                 value: '营业执照'
               }, {
                 // label: '社会统一信用代码',
                 value: '社会统一信用代码'
               }],
        filepop:false,
        caingshow:true
       }
   },
   methods:{
    changebase:function(){//点击变更
        this.statusval = '完成';
        // tbody颜色边框没有了
        this.isA = true
        // 客户名称/证件类型/证件号码 变为输入框
        // 下一步展示
    },
    oncestep:function(){
        // 再第二个页面点击下一步弹窗出现
        if (this.index!==null) {
            $('#caModal').modal('show');
        }else{
            // 点击下一步页面改变状态
            this.baseone = false;
            this.index = 0
        };
        // $('#caModal').modal('show');

        // 函数
    },
    returnstep:function(){
        this.baseone = true
        this.index = null
    },
    fileinset:function(){
        // 点击上传
        this.filepop = true;
        $('#uploadModal').modal('show');
    },
    cacomplete:function(){ 
        this.caingshow = false
    },
    cafinished:function(){
         this.statusval = '变更';
         this.isA = false;
         this.baseone = true;
         this.index = null;
         $('#caModal').modal('hide');
         this.caingshow = true
    }
   }
  };
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>

.basebody tr td:first{
	width: 214px!important;
}

.changebase{
   -webkit-border-radius: 10px;
   -moz-border-radius: 10px;
   border-radius: 10px;
   -webkit-transition: all 0.2s ease-in-out;
   -moz-transition: all 0.2s ease-in-out;
   -ms-transition: all 0.2s ease-in-out;
   -o-transition: all 0.2s ease-in-out;
   transition: all 0.2s ease-in-out;
   cursor: pointer;
   border: 1px solid #488FFE;
   background: #488FFE;
   color: #FFFFFF;
   font-size: 14px;
   width: 55px;
   height: 25px;
   display: block;
   float: right;
   text-align: center;
   line-height: 25px;
   margin-top: -2px;
   line-height:1.7;
    &:hover{
        border: 1px solid #4c7cff;
        background: #4c7cff;
    };
       &.is-disabled{
           background: #b5b6b6 !important;
           border: 1px solid #b5b6b6 !important;
       }
}



.steptwo{
    tr>td{
        p,button{display:inline-block};
        p{
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            width: 168px;
            text-align:left;
            vertical-align: middle;
            line-height:1.7
        }
        button{
                margin-right: 30px;
            };
        &:last-child{
            text-align:right!important;
        };
        &:first-child{
            text-align:left;
        }
    }
}
 .table>thead>tr>th{
     border-bottom: 0px !important;
     background: #f8fbfb;
     font-size: 16px;
     color: #666666;
     padding: 16px 0px 16px 35px;
     font-weight: inherit;
 }
 .table>thead>tr>th:last-child{
     text-align: center;
     padding: 16px 35px 16px 35px;
 }

 .table>tbody>tr>td{
     padding: 0px 0px 0px 35px;
     font-size: 14px;
     color: #909090;
     height: 55px;
     vertical-align: middle;
 }
 .table>tbody>tr>td:last-child{
     padding: 0px 35px 0px 35px;
 }
 .table>tbody>tr>td span{
     display: inline-block;
     text-overflow:ellipsis; 
     white-space:nowrap; 
     overflow:hidden; 
     width: 168px;
     vertical-align: middle;
 }
 .table>tbody>tr:nth-of-type(even){
     background-color: #fcfcfc;
 }
 .table>tbody>tr>td div.operation{
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
 .table>tbody>tr>td div.operation:hover{
     border: 1px solid #488FFE;
 }
 .table>tbody>tr>td div.operation:hover font{
     color: #488FFE;
 }
 .table>tbody>tr>td.operationTD:hover ul{
     display: block;
 }
 .table>tbody>tr>td div.operation ul{
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
 .table>tbody>tr>td div.operation ul li{
     list-style: none;
     padding: 10px 20px;
     position: relative;
     text-align: left;
 }
 .table>tbody>tr>td div.operation ul li:before{
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
 .table>tbody>tr>td div.operation ul li:hover{
     color: #488ffe;
 }
 .table>tbody>tr>td div.operation ul li:hover:before{
     background: #488ffe;
 }
.userinfoDIV{
  height: 105px;
    padding: 35px 0px 0px;
    text-align:center
}
   .userinfoDIV  .el-tabs__nav ul li{
    list-style: none;
    display:inline-block;
    margin: 0px 10px;
    width: 115px;
    height: 35px;
    border: 1px solid #EBEBEB;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    text-align: center;
    line-height: 35px;
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -ms-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    color: #909090;
}
.userinfoDIV  .el-tabs__nav ul li:hover,.userinfoDIV .el-tabs__nav ul li.active{
    color: #488FFE;
    border: 1px solid #488FFE;
}
.userinfo-table>thead>tr>th:first-child,.userinfo-table>tbody>tr>td:first-child{
    width: 214px;
    padding-left: 75px;
}
.userinfo-table>thead>tr>th:last-child,.business-table>thead>tr>th:last-child{
    text-align: right !important;
    padding: 16px 30px 16px 0px !important;
}

.step-one .userinfo-table>tbody>tr>td span,#extend .userinfo-table>tbody>tr>td button{
    display: block;
    padding-left: 15px;
}
.userinfo-table>tbody>tr>td:last-child{
    padding: 0px 0px 0px 21px !important;
}
.userinfo-table>tbody>tr>td:last-child input{
    /* padding-left: 15px; */
}
.input-none input:focus{
    border: 1px solid #FFFFFF !important;
    box-shadow:none;
}
.finishing{
    background: #b5b6b6 !important;
    border: 1px solid #b5b6b6 !important;
}
.userinfo-change>tbody>tr>td,.data-table-no-border>tbody>tr>td{
    border-top: 1px solid #FFFFFF !important;
}
.userinfo-change>tbody>tr:last-child>td,.data-table-no-border>tbody>tr:last-child>td{
    border-bottom: 1px solid #FFFFFF !important;
}
.userinfo-change>tbody>tr:nth-of-type(even),.data-table-no-border>tbody>tr:nth-of-type(even){
    background: #FFFFFF !important;
}
.userinfo-change>tbody>tr>td input{
    width: 255px;
    height: 35px;
    vertical-align: middle;
    font-size: 14px;
    color: #909090;
    border: 1px solid #EBEBEB;
}
.input-none>tbody>tr>td input{
    border: 1px solid #FFFFFF !important;
    background: transparent;
    width: 100% !important;
}

#base>.step-two>.userinfo-table>tbody>tr>td:first-child,#base .step-two .userinfo-table>thead>tr>th:first-child,.data-table-no-border>thead>tr>th:first-child,.data-table-no-border>tbody>tr>td:first-child{
    padding-left: 75px;
    text-align: left;
}
#base>.step-two>.userinfo-table>thead>tr>th:first-child, #base>.step-two>.userinfo-table>tbody>tr>td:first-child{
    width: 300px;
}
#base>.step-two>.userinfo-table>tbody>tr>td:last-child,.data-table-no-border>tbody>tr>td:last-child{
    text-align: right;
}
#base>.step-two>.userinfo-table>tbody>tr>td:last-child span,.data-table-no-border>tbody>tr>td:last-child span{
    text-align: left;
}
#base>.step-two>.userinfo-table>tbody>tr>td:last-child button{
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -ms-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    border: 1px solid #EBEBEB;
    font-size: 14px;
    width: 55px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    background: #FFFFFF;
    margin: 0px 30px 0px 15px;
    vertical-align: bottom;
}
#base>.step-two>.userinfo-table>tbody>tr>td:last-child button:hover{
    border: 1px solid #488FFE;
    color: #488FFE;
}
#caModal .modal-body{
    padding: 30px 0px 0px;
    color: #666666;
    font-size: 14px;
    height: 185px;
}
#caModal .modal-body>div{
    margin-bottom: 30px;
}
#caModal .modal-body>div:first-child{
    margin-bottom: 35px !important;
}
#caModal .modal-body>div>p{
    margin: 0 0 10px;
}
#caModal .modal-body font{
    color: #2EBAB4;
    font-size: 14px;
    margin: 0px 10px;
}
#caModal #caed .modal-body{
    padding-top: 80px;
}
.step-two{
    display: none;
}
#pwd .userinfo-table>tbody>tr>td:last-child,#pay .userinfo-table>tbody>tr>td:last-child{
    text-align: right;
    padding-right: 30px !important;
}
#pay .userinfo-table>tbody>tr>td:last-child button{
    vertical-align: middle;
}
#pay .userinfo-table>tbody>tr>td:last-child  span{
    margin-right: 20px;
    vertical-align: middle;
}
#userinfoUpdModal .modal-dialog .modal-content .modal-body{
    height: 185px;
    padding: 25px 0px;
}
#userinfoUpdModal .modal-dialog .modal-content .modal-body input{
    margin-bottom: 15px !important;
}
#userinfoUpdModal .modal-dialog .modal-content .modal-body input:last-child{
    margin-bottom: 0px !important;
}
#base div.cs-skin-underline{
    width: 168px !important;
}
#base .input-none div.cs-skin-underline > span{
    border: none;
    padding-left: 15px !important;
}
.contentDIV{
    padding: 0px !important;
}
.searchDIV{
    padding: 35px 0px;
}
.searchDIV>div{
    width: 850px;
    height: 160px;
    margin: auto;
}
.searchDIV div p{
    height: 80px;
    margin: 0px;
    text-align: center;
    padding-top: 20px;
}
.searchDIV div p:first-child{
    border-bottom: 1px solid #EBEBEB;
    padding-top: 25px;
}
.searchDIV div p>span{
    width: 63px;
    height: 35px;
    display: inline-block;
    vertical-align: middle;
    line-height: 35px;
    text-align: right;
    margin-right: 25px;
    font-size: 14px;
    color: #7A7A7A;
}
.searchDIV div p span.time-group{
    width: inherit !important;
    position: relative;
    margin-right: 0px;
}
.searchDIV div p span.time-group input{
    letter-spacing: 2px;
}
.searchDIV div p span.time-group i{
    position: absolute;
    font-size: 15px;
    right: 30px;
    top: 0px;
}
.searchDIV div p input{
    width: 155px;
    height: 35px;
    padding: 15px;
    vertical-align: middle;
    border: 1px solid #EBEBEB;
    margin-right: 20px;
    font-size: 14px;
    color: #909090;
}
.searchDIV div p input:before{
    content: "1";
}

.searchDIV div p button{
    width: 115px;
    height: 35px;
    text-align: center;
    vertical-align: middle;
    border: 1px solid #488FFE;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    background: #488FFE;
    color: #FFFFFF;
    line-height: 25px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    font-size: 16px;
}
.searchDIV div p button:hover,.searchDIV div p button:focus{
    background: #4c7cff;
}
.searchDIV div p button i{
    width: 15px;
    height: 15px;
    margin-left: 5px;
}
.tableDIV .table>thead>tr>th{
    border-bottom: 0px !important;
    background: #f8fbfb;
    font-size: 16px;
    color: #666666;
    padding: 16px 0px 16px 35px;
    font-weight: inherit;
}
.tableDIV .table>thead>tr>th:last-child{
    text-align: center;
    padding: 16px 35px 16px 35px;
}
.table>thead>tr>th, .table>tbody>tr>th, .table>tfoot>tr>th, .table>thead>tr>td, .table>tbody>tr>td, .table>tfoot>tr>td{
    border-top: 1px solid #EBEBEB;
}
.tableDIV .table>tbody>tr:last-child>td{
    border-bottom: 1px solid #EBEBEB;
}
.tableDIV .table>tbody>tr>td{
    padding: 0px 0px 0px 35px;
    font-size: 14px;
    color: #909090;
    height: 55px;
    vertical-align: middle;
}
.tableDIV .table>tbody>tr>td:last-child{
    padding: 0px 35px 0px 35px;
}
.tableDIV .table>tbody>tr>td span{
    display: inline-block;
    text-overflow:ellipsis; 
    white-space:nowrap; 
    overflow:hidden; 
    width: 168px;
    vertical-align: middle;
}
.tableDIV .table>tbody>tr:nth-of-type(even){
    background-color: #fcfcfc;
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




// 表格修改样式
.class-edit{
   &>tr:nth-of-type(even){
        background-color:#fff!important;
    }
    .cs-select{
            border: 1px solid #EBEBEB!important;
         }
    tr>td{
        border:none!important;
       &:last-child input{
               border: 1px solid #EBEBEB!important;
        }
        
    }
}
 .table>thead>tr>th, .table>tbody>tr>th, .table>tfoot>tr>th, .table>thead>tr>td, .table>tbody>tr>td, .table>tfoot>tr>td{
     border-top: 1px solid #EBEBEB;
 }
 .table>tbody>tr:last-child>td{
     border-bottom: 1px solid #EBEBEB;
 }


 // 下一步样式
 .nextstep{
     padding: 45px 0px 20px 0px;
     text-align: center;
     border-bottom: 1px solid #EBEBEB;
 }

 .nextstep button{
     width: 105px;
     height: 35px;
     line-height: 30px;
     border: 1px solid #EBEBEB;
     color: #909090;
     background: #FFFFFF;
     margin: 0px 15px;
     font-size: 16px;
 }
 .nextstep button:hover{
     border: 1px solid #488FFE;
     background: #488FFE;
     color: #FFFFFF;
 }

 // input样式
 .userinfo-table>tbody>tr>td:last-child input {
     padding-left: 15px;
     width: 255px!important;
     height: 35px;
     vertical-align: middle;
     font-size: 14px;
     color: #909090;
     border: 1px solid #EBEBEB;
     &:focus{
        border: 1px solid #488FFE !important;
        -webkit-box-shadow:0 0 5px 2px #98c0fd;  
        -moz-box-shadow:0 0 5px 2px #98c0fd;  
        box-shadow:0 0 5px 2px #98c0fd;  
     }
 }
 .inputblock{

 }
 .userinfo-change>tbody>tr>td  input{
        width: 255px;
        height: 35px;
        vertical-align: middle;
        font-size: 14px;
        color: #909090;
        border: 1px solid #EBEBEB;
    
 }

 // select选框重写
 #base div.cs-skin-underline{
    width: 168px !important;
}
#base .input-none div.cs-skin-underline > span{
    // border: none;
    padding-left: 15px !important;
}
#base .input-none div.cs-skin-underline .cs-options{
    // display: none;
}
#base .input-none .cs-skin-underline > span::after{
    // display: none;
}

.el-select{
  width: 168px;
  // .el-input__inner{
  //   width: 168px;
  //   border-radius:0;
  //   color: #909090;
  //   border:1px solid #909090!important;
  // }
  // & .el-input__inner:hover{
  //     border-color:#909090!important
  // }
  // .el-input{
  //   .el-icon-caret-top:before{
  //             content:"\E603"
  //           }
  // }
      
}
  
//饿了吗 选择框重写

.el-select-dropdown{
    // .el-select-dropdown__item{
    //     width:inherit;
    //     background:#fff;
    //     color:#909090;
    //     &:hover{
    //         color:#488FFE;
    //     }
    // }
    // //  selected hover
    // .selected{
    //   width:inherit;
    //   background:#fff;
    //   color:#488FFE;
    // }
}

</style>
