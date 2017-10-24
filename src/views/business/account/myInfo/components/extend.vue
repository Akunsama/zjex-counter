<template>
  <div id="extend"  >
          <table class="table userinfo-table input-none insetfocus ">
              <thead>
                <tr>
                  <th>扩展信息</th>
                  <th><span class="changebase" @click='changebase'  >{{statusval}}</span></th>
                </tr>
              </thead>
              <tbody v-bind:class="{ 'class-edit': isA }" >
                <tr>
                  <td>联系地址</td>
                  <!-- <td><input value="杭州西湖区文三路伟星大厦2201" readonly=""></td> -->
                  <td>
                   <span v-if="statusval=='修改'">{{address}}</span>
                   <input v-model="address" v-else>
                   </td>
                </tr>
                <tr>
                  <td>联系电话</td>
                  <td>
                      <span v-if="statusval=='修改'">{{tel}}</span>
                      <input v-model="tel" v-else>
                  </td>
                  <!-- <td><input value="0571-88065288" readonly=""></td> -->
                </tr>
                <tr>
                  <td>联系手机</td>
                  <td>
                      <span v-if="statusval=='修改'">{{phone}}</span>
                      <input v-model="phone" v-else>
                  </td>
                  <!-- <td><input value="18958148296" readonly=""></td> -->
                </tr>
              </tbody>
            </table>
        </div>
</template>

<script>
  
  export default {
   data() {
       return {
        statusval:'修改',
         isA:false,
         address:'杭州西湖区文三路伟星大厦2201',
         tel:'0571-88065288',
         phone:'18958148296'
       }
   },
   methods:{
    changebase:function(){//点击变更
    	if(this.isA==false){
    		this.statusval = '完成';
        // tbody颜色边框没有了
        this.isA = true
        // 客户名称/证件类型/证件号码 变为输入框
        // 下一步展示
    	}else{
    		this.statusval = '修改';
    		this.isA = false
    	}

    },
   }
  };
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>

.userinfoDIV{
  height: 105px;
    padding: 35px 0px 0px;
    text-align:center
}
.userinfoDIV ul li{
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
.userinfoDIV ul li:hover,.userinfoDIV ul li.active{
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
.userinfo-table>thead>tr>th:last-child span,.business-table>thead>tr>th:last-child span{
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
}
.userinfo-table>thead>tr>th:last-child span:hover,.business-table>thead>tr>th:last-child span:hover{
    border: 1px solid #4c7cff;
    background: #4c7cff;
}
.step-one .userinfo-table>tbody>tr>td span,#extend .userinfo-table>tbody>tr>td span{
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
    /*border: 1px solid #FFFFFF !important;*/
    background: transparent;
    width: 100% !important;
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
#base .input-none div.cs-skin-underline .cs-options{
    display: none;
}
#base .input-none .cs-skin-underline > span::after{
    display: none;
}

#extend .userinfo-change>tbody>tr:last-child>td,#pwd .userinfo-change>tbody>tr:last-child>td,#pay .userinfo-change>tbody>tr:last-child>td{
    border-bottom: 1px solid #EBEBEB !important;
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
.table>thead>tr>th, .table>tbody>tr>th, .table>tfoot>tr>th, .table>thead>tr>td, .table>tbody>tr>td, .table>tfoot>tr>td{
    border-top: 1px solid #EBEBEB
}
.table>tbody>tr:last-child>td{
    border-bottom: 1px solid #EBEBEB;
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
       /*&:last-child input{
               border: 1px solid #EBEBEB!important;
        }*/
        
    }
    tr:last-child{
    	border-bottom: 1px solid #EBEBEB!important;
    }
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

</style>

