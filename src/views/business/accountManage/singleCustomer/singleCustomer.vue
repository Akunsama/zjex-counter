<template>
    <div>
        <div class="searchDIV mui-insetfocus">
            <div class="searchDIV-self">
                <p>
                    <label>
                        <span style="width:100px" class='selectlabel'>客户代码：</span>
                        <input placeholder="" v-model="keCode" onkeyup="this.value=this.value.replace(/[^\d\.]+/g,'')" onblur="this.value=this.value.replace(/(\.\d{2})\d*$/,'\$1')" maxlength=20/>
                    </label>
                </p>
                <p>
                    <label>
                        <span style="width:100px" class='selectlabel'>证件号：</span>
                        <input id="onlyInput" placeholder="身份证或企业组织机构代码" v-model="keNo" maxlength=20/>
                    </label>
                    <button class='singlecha' @click="singlecha()">查询</button>
                </p>
            </div>
        </div>
        <div class="tableDIV single-content-title">
            <span v-if="singchange==1">单客户查询详情</span>
            <span v-else>查询详情</span>
        </div>
        <div style="height:auto" class='tabbase-container'>
            <el-tabs v-model="activeName" class='userinfoDIV ' type="card">
                <el-tab-pane label="基本信息" name="base">
                    <basicInformation v-bind:listone="listone"></basicInformation>
                </el-tab-pane>
                <el-tab-pane label="账户信息" name="extend">
                    <accountInformation v-bind:listone="listone"></accountInformation>
                </el-tab-pane>
                <el-tab-pane label="资产信息" name="account">
                    <assetInformation v-bind:listone="listone" v-bind:listThere="listThere"></assetInformation>
                </el-tab-pane>
                <el-tab-pane label="客户流水" name="ke">
                    <CustomerFlow  v-bind:account="account"></CustomerFlow>
                </el-tab-pane>
                <el-tab-pane label="其他信息" name="qita">
                    <Other v-bind:listone="listone"></Other>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!-- 企业登记成功失败等系列弹窗 -->
        <div class="popModal modal fade smallModal" id="myself-pop4" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <!-- 填入所有的空格 -->
                <div class="modal-content" id="caed">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">查询失败</h4>
                    </div>
                    <div class="modal-myself">
                        未找到该账户，请重新输入
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-save" id="ca-finished" data-dismiss="modal">确认</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="popModal modal fade smallModal" id="myself-pop5" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <!-- 填入所有的空格 -->
                <div class="modal-content" id="caed">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">查询失败</h4>
                    </div>
                    <div class="modal-myself">
                        请输入所有必选项
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-save" id="ca-finished" data-dismiss="modal">确认</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="popModal modal fade smallModal" id="myself-pop3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                       
                                        <div class="modal-content" id="caed">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                                <h4 class="modal-title" id="myModalLabel">企业登记成功</h4>
                                            </div>
                                            <div type="height:185px!important,line-height:150px!important" class="modal-myself">
                                                {{popResult}}
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn-save" id="ca-finished" @click="btnfinished" data-dismiss="modal">确认</button>
                                            </div>
                                        </div>
                                    </div>
                                </div> -->
    </div>
</template>

<script>
import blueicon from '@/assets/images/blue-icon.png'
import basicInformation from "./common/basicInformation.vue"
import accountInformation from "./common/accountInformation.vue"
import assetInformation from "./common/assetInformation.vue"
import CustomerFlow from "./common/CustomerFlow.vue"
import Other from "./common/other.vue"

import ApiService from '@/services/API-servies'





export default {
    //组件名
    name: 'single-customer',
    //实例的数据对象
    data() {
        return {
            keCode: '',
            keNo: '',
            message: '',
            account: '',
            singchange: 1,
            showlist: 1,
            listone: {},
            listThere: [],
            listFour: [],
            listFour1: 0,
            activeName: 'base',
            types: [{
                label: '待定',
                value: '1'
            }, {
                label: '完成',
                value: '2'
            }, {
                label: '审核中',
                value: '3'
            },],
            type: '1'
        }
    },
    //数组或对象，用于接收来自父组件的数据
    props: {

    },
    //方法
    methods: {
        singlecha() {
            if (this.keCode == '' && this.keNo == '') {
                $('#myself-pop4').modal('show');
                return
            }

            ApiService.business.queryCustAccount({
                seq: 'Math.random()*100000000000000000000',
                account: '',
                certType: 1,
                certNo: this.keNo,
                custno: this.keCode,
                timestamp: 0
            }).then((res) => {
                this.message = res.message
                if (this.message == '没有多余信息' && this.message == '该账户不存在，请从新输入！') {
                    $('#myself-pop4').modal('show');
                    return
                }
                this.listone = res.data
                console.log(this.message, 'plpl')
                this.account = res.data.account
            }).then((res) => {
                ApiService.business.queryCustStock({
                    seq: 'Math.random()*100000000000000000000',
                    userId: '',//榕说这里不用传userId
                    account: this.account,
                    fundName: '',
                    fundCode: '',
                    stockNature: '',
                    pageSize: 10,
                    pageNumber: 1,
                    timestamp: 0,
                }).then((res) => {
                    this.listThere = res.data.items
                })
            })
        }
    },
    created() {
        if (this.$route.query.list) {
            var listtow = this.$route.query.list
            var index2 = this.$route.query.index
            var keCode = '00' + listtow.stockholdersAccount;
            if (keCode != "00undefined") {
                this.keCode = '00' + listtow.stockholdersAccount;
            }

        }
        if (this.$route.query.certNo) {
            this.keCode = this.$route.query.custNo;
            this.keNo = this.$route.query.certNo;
            this.singlecha()
        }
    },
    mounted() {

    },
    watch: {

    },
    //组件
    components: {
        basicInformation,
        accountInformation,
        assetInformation,
        CustomerFlow,
        Other,
    }
}
</script>

<style scroped rel="stylesheet/scss" lang="scss" >
.modal-myself {
    height: 185px;
    line-height: 155px;
    text-align: center;
}

#onlyInput {
    font-weight: 200;
}

.gqfjygh-table-div {
    border-left: 0px!important;
}

// 表格修改样式
.class-edit {
    &>tr:nth-of-type(even) {
        background-color: #fff!important;
    }
    .cs-select {
        border: 1px solid #EBEBEB!important;
    }
    tr>td {
        border: none!important;
        &:last-child input {
            border: 1px solid #EBEBEB!important;
        }
    }
}

// 选择框重写
.el-input__inner {
    color: #909090;
    border: 1px solid #EBEBEB!important;
}

.tabbase-container .el-tab-pane {
    margin-top: 21px;
}


.tabbase-container .el-tabs__nav .el-tabs__item {
    list-style: none;
    display: inline-block;
    margin: 0px 12px;
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





.tabbase-container .el-tabs__nav .userinfoDIV ul li:hover,
.userinfoDIV .el-tabs__nav ul li.active {
    color: #488FFE;
    border: 1px solid #488FFE;
}

.tabbase-container .userinfoDIV {
    // height: 105px;
    padding: 35px 0px 0px;
    text-align: center
}

.tabbase-container .userinfoDIV .el-tabs__nav ul li {
    list-style: none;
    display: inline-block;
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

.tabbase-container .userinfoDIV .el-tabs__nav ul li:hover,
.userinfoDIV .el-tabs__nav ul li.active {
    color: #488FFE;
    border: 1px solid #488FFE;
}

.tabbase-container .userinfo-table>thead>tr>th:first-child,
.userinfo-table>tbody>tr>td:first-child {
    padding-left: 75px;
    text-align: left;
}

.tabbase-container .userinfo-table>thead>tr>th:last-child,
.business-table>thead>tr>th:last-child {
    text-align: right;
    padding: 16px 30px 16px 0px;
}


.tabbase-container .step-one .userinfo-table>tbody>tr>td span,
#extend .userinfo-table>tbody>tr>td span {
    display: block;
    padding-left: 15px;
}

.tabbase-container .userinfo-table>tbody>tr>td:last-child {
    padding: 0px 0px 0px 21px;
    text-align: left;
    input {
        padding-left: 15px;
    }
}

.tabbase-container .userinfo-table>tbody>tr>td:last-child input {
    /* padding-left: 15px; */
}

.tabbase-container .input-none input:focus {
    // border: 1px solid #FFFFFF !important;
    // box-shadow:none;
}

.tabbase-container .finishing {
    background: #b5b6b6 !important;
    border: 1px solid #b5b6b6 !important;
}

.tabbase-container .userinfo-change>tbody>tr>td,
.data-table-no-border>tbody>tr>td {
    border-top: 1px solid #FFFFFF !important;
}

.tabbase-container .userinfo-change>tbody>tr:last-child>td,
.data-table-no-border>tbody>tr:last-child>td {
    border-bottom: 1px solid #FFFFFF !important;
}

.tabbase-container .userinfo-change>tbody>tr:nth-of-type(even),
.data-table-no-border>tbody>tr:nth-of-type(even) {
    background: #FFFFFF !important;
}

.tabbase-container .userinfo-change>tbody>tr>td input {
    width: 255px;
    height: 35px;
    vertical-align: middle;
    font-size: 14px;
    color: #909090;
    border: 1px solid #EBEBEB;
}

// .tabbase-container  .input-none>tbody>tr>td input{
//     border: 1px solid #FFFFFF !important;
//     background: transparent;
//     width: 100% !important;
// }
.tabbase-container .btn-next {
    padding: 45px 0px 20px 0px;
    text-align: center;
    border-bottom: 1px solid #EBEBEB;
}

.tabbase-container #base .btn-next {
    display: none;
}

.tabbase-container .btn-next button {
    width: 105px;
    height: 35px;
    line-height: 30px;
    border: 1px solid #EBEBEB;
    color: #909090;
    background: #FFFFFF;
    margin: 0px 15px;
    font-size: 16px;
}

.tabbase-container .btn-next button:hover {
    border: 1px solid #488FFE;
    background: #488FFE;
    color: #FFFFFF;
}

.tabbase-container #base>.step-two>.userinfo-table>tbody>tr>td:first-child,
#base .step-two .userinfo-table>thead>tr>th:first-child,
.data-table-no-border>thead>tr>th:first-child,
.data-table-no-border>tbody>tr>td:first-child {
    padding-left: 75px;
    text-align: left;
}

.tabbase-container #base>.step-two>.userinfo-table>thead>tr>th:first-child,
#base>.step-two>.userinfo-table>tbody>tr>td:first-child {
    width: 300px;
}

.tabbase-container #base>.step-two>.userinfo-table>tbody>tr>td:last-child,
.data-table-no-border>tbody>tr>td:last-child {
    text-align: right;
}

#base>.step-two>.userinfo-table>tbody>tr>td:last-child span,
.data-table-no-border>tbody>tr>td:last-child span {
    text-align: left;
}

#base>.step-two>.userinfo-table>tbody>tr>td:last-child button {
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

#base>.step-two>.userinfo-table>tbody>tr>td:last-child button:hover {
    border: 1px solid #488FFE;
    color: #488FFE;
}

#caModal .modal-body {
    padding: 30px 0px 0px;
    color: #666666;
    font-size: 14px;
    height: 185px;
}

#caModal .modal-body>div {
    margin-bottom: 30px;
}

#caModal .modal-body>div:first-child {
    margin-bottom: 35px !important;
}

#caModal .modal-body>div>p {
    margin: 0 0 10px;
}

#caModal .modal-body font {
    color: #2EBAB4;
    font-size: 14px;
    margin: 0px 10px;
}

#caModal #caed .modal-body {
    padding-top: 80px;
}

.step-two {
    display: none;
}

#pwd .userinfo-table>tbody>tr>td:last-child,
#pay .userinfo-table>tbody>tr>td:last-child {
    text-align: right;
    padding-right: 30px !important;
}

#pay .userinfo-table>tbody>tr>td:last-child button {
    vertical-align: middle;
}

#pay .userinfo-table>tbody>tr>td:last-child span {
    margin-right: 20px;
    vertical-align: middle;
}

#userinfoUpdModal .modal-dialog .modal-content .modal-body {
    height: 185px;
    padding: 25px 0px;
}

#userinfoUpdModal .modal-dialog .modal-content .modal-body input {
    margin-bottom: 15px !important;
}

#userinfoUpdModal .modal-dialog .modal-content .modal-body input:last-child {
    margin-bottom: 0px !important;
}


#extend .userinfo-change>tbody>tr:last-child>td,
#pwd .userinfo-change>tbody>tr:last-child>td,
#pay .userinfo-change>tbody>tr:last-child>td {
    border-bottom: 1px solid #EBEBEB !important;
}

.searchDIV {
    padding: 35px 0px;
}

.searchDIV>div {
    width: 850px;
    height: 160px;
    margin: auto;
}

.searchDIV div p {
    // height: 80px;
    margin: 0px;
    text-align: center;
    padding-top: 20px;
}

.searchDIV div p:first-child {
    border-bottom: 1px solid #EBEBEB;
    padding-top: 25px; // padding-bottom: 25px;
}

.searchDIV div p>span {
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

.searchDIV div p span.time-group {
    width: inherit !important;
    position: relative;
    margin-right: 0px;
    margin-left: 20px;
}

.searchDIV div p span.time-group input {
    letter-spacing: 2px;
}

.searchDIV div p span.time-group i {
    position: absolute;
    font-size: 15px;
    right: 30px;
    top: 0px;
}

.searchDIV div p input {
    width: 155px;
    height: 35px;
    padding: 15px;
    vertical-align: middle;
    border: 1px solid #EBEBEB;
    margin-right: 20px;
    font-size: 14px;
    color: #909090;
}

.searchDIV div p input:before {
    content: "1";
}

.searchDIV div p button {
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

.searchDIV div p button:hover,
.searchDIV div p button:focus {
    background: #4c7cff;
}

.searchDIV div p button i {
    width: 15px;
    height: 15px;
    margin-left: 5px;
}

.tableDIV .table>thead>tr>th {
    border-bottom: 0px !important;
    background: #f8fbfb;
    font-size: 16px;
    color: #666666;
    padding: 16px 0px 16px 35px;
    font-weight: inherit;
}

.tableDIV .table>thead>tr>th:last-child {
    text-align: center;
    padding: 16px 35px 16px 35px;
}

.table>thead>tr>th,
.table>tbody>tr>th,
.table>tfoot>tr>th,
.table>thead>tr>td,
.table>tbody>tr>td,
.table>tfoot>tr>td {
    /*border-top: 1px solid #EBEBEB !important;*/
}

.tableDIV .table>tbody>tr:last-child>td {
    border-bottom: 1px solid #EBEBEB;
}

.tableDIV .table>tbody>tr>td {
    padding: 0px 0px 0px 35px;
    font-size: 14px;
    color: #909090;
    height: 55px;
    vertical-align: middle;
}

.tableDIV .table>tbody>tr>td:last-child {
    padding: 0px 35px 0px 35px;
}

.tableDIV .table>tbody>tr>td span {
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden; // width: 168px;
    vertical-align: middle;
}

.tableDIV .table>tbody>tr:nth-of-type(even) {
    background-color: #fcfcfc;
}

.tableDIV .table>tbody>tr>td div.operation {
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

.tableDIV .table>tbody>tr>td div.operation:hover {
    border: 1px solid #488FFE;
}

.tableDIV .table>tbody>tr>td div.operation:hover font {
    color: #488FFE;
}

.tableDIV .table>tbody>tr>td.operationTD:hover ul {
    display: block;
}

.tableDIV .table>tbody>tr>td div.operation ul {
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
    -webkit-box-shadow: 0 0 5px 4px rgba(140, 140, 141, .15);
    -moz-box-shadow: 0 0 5px 4px rgba(140, 140, 141, .15);
    box-shadow: 0 0 5px 4px rgba(140, 140, 141, .15);
    display: none;
}

.tableDIV .table>tbody>tr>td div.operation ul li {
    list-style: none;
    padding: 10px 20px;
    position: relative;
    text-align: left;
}

.tableDIV .table>tbody>tr>td div.operation ul li:before {
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

.tableDIV .table>tbody>tr>td div.operation ul li:hover {
    color: #488ffe;
}

.tableDIV .table>tbody>tr>td div.operation ul li:hover:before {
    background: #488ffe;
}

.contentDIV {
    padding: 0px !important;
}

// tab样式重写
.tabbase-container .el-tabs__header {
    border: none;
    .el-tabs__nav {
        float: none;
        .el-tabs__item:hover {
            color: #488FFE;
            border: 1px solid #488FFE;
        }
        .is-active {
            color: #488FFE;
            border: 1px solid #488FFE!important;
            border-radius: 15px
        }
    }
}

.singlecha {
    margin-left: 60px;
}

.searchDIV-self {
    /*width: 700px!important;*/
}

.single-content {}

.userinfoDIV-myself {}

.single-content-title {
    width: 100%;
    height: 55px;
    background: #f7fbfc;
    border-top: 1px solid #EBEBEB;
    span {
        margin-left: 30px;
        line-height: 55px;
        font-size: 16px;
        color: #666666;
    }
}
</style>