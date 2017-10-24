<template>
    <div>
        <div class="dataRecordDIV">
            <ul>
                <li :class="{active:showpage>=1}">
                    <i></i>
                    <p>选择企业类型</p>
                </li>
                <li :class="{active:showpage>=2}">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <i></i>
                    <p>申请表及股东状况</p>
                </li>
                <li :class="{active:showpage>=3}">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <i></i>
                    <p>持股信息</p>
                </li>
                <li :class="{active:showpage>=4}">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <i></i>
                    <p>资料打印上传</p>
                </li>
                <li :class="{active:showpage>=5}" v-show="isproduct">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <i></i>
                    <p>身份验证</p>
                </li>
                <li :class="{active:showpage>=6}" v-show="isproduct">
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
            <div class="dataRecord-info" v-show="showpage==1">
                <table class="table dataRecord-table">
                    <thead>
                        <tr>
                            <th class="text-center">序号</th>
                            <th>企业类型</th>
                            <th>企业类型名称</th>
                            <th>企业登记</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in list">
                            <td class="text-center">{{index+1}}</td>
                            <td>{{item.fundtype}}</td>
                            <td>{{item.typename}}</td>
                            <td>
                                <button @click="handle(index)">办理</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="dataRecord-step1" v-show="showpage==2">
                <div v-if="this.$route.query.id">
                    <table class="table" :class="{'dataRecord-step1-update':bordershow,'dataRecord-step1-query':!bordershow}">
                        <thead>
                            <tr>
                                <th colspan="4">企业基本信息登记表
                                    <button id="enterprise" class="btn-sm1" @click="enterprise">{{enterpriseText}}</button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="4">
                                    <div class="pull-right">以下信息需填写完整，方可进行下一步操作</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i style="color:red">*</i> 交易品种类型</td>
                                <td>
                                    <el-select v-model="mail" placeholder="请选择">
                                        <el-option v-for="item in mnumlist1" :key="item.value" :label="item.label" :value="item.value">
                                            <span style="float: left">{{ item.value }}</span>
                                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                                        </el-option>
                                    </el-select>
                                </td>

                                <td>
                                    <i style="color:red">*</i> 所属板块</td>
                                <td>
                                    <el-select v-model="value" placeholder="请选择">
                                        <el-option v-for="item in mnumlist" :key="item.subType" :label="item.subTypeName" :value="item.subType">
                                            <span style="float: left">{{ item.subType }}</span>
                                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.subTypeName }}</span>
                                        </el-option>
                                    </el-select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i style="color:red">*</i> 产品名称</td>
                                <td>
                                    <input value="" v-model="fundName=listone[index1].fundName" onkeyup="this.value=this.value.replace(/[^\A-\Z\u4E00-\u9FA5]/g,'')" onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\A-\Z\u4E00-\u9FA5]/g,''))" maxlength=100 />
                                </td>
                                <td>
                                    <i style="color:red">*</i> 产品简称</td>
                                <td>
                                    <input value="123" v-model="fundjian=listone[index1].fundAbbr" onkeyup="this.value=this.value.replace(/[^\A-\Z\u4E00-\u9FA5]/g,'')" onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\A-\Z\u4E00-\u9FA5]/g,''))" maxlength=100 />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i style="color:red">*</i> 总份额</td>
                                <td>
                                    <input value="123" v-model="totaler=listone[index1].totalShares" />
                                </td>
                                <td>
                                    <i style="color:red">*</i> 持有人户数</td>
                                <td>
                                    <input value="123" v-model="makepeple=listone[index1].holders" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i style="color:red">*</i> 是否初始登记标识</td>
                                <td>
                                    <el-select v-model="value1" placeholder="是">
                                        <el-option v-for="item in biaoshi" :key="item.value" :label="item.label" :value="item.value">
                                            <!-- <span style="float: left">{{ item.value }}</span> -->
                                            <span style="left: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                                        </el-option>
                                    </el-select>
                                </td>
                                <!-- <td colspan="3"></td> -->
                                <td>
                                    <i style="color:red">*</i> 登记账户</td>
                                <td><input value="123" v-model="registzhang=listone[index1].account" /></td>

                            </tr>
                        </tbody>
                    </table>
                    <p class="btn-next">
                        <button id="step1" @click="step(3)">下一步</button>
                    </p>
                </div>

                <div v-else>
                    <table class="table" :class="{'dataRecord-step1-update':bordershow,'dataRecord-step1-query':!bordershow}">
                        <thead>
                            <tr>
                                <th colspan="4">企业基本信息登记表
                                    <button id="enterprise" class="btn-sm1" @click="enterprise">{{enterpriseText}}</button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="4">
                                    <div class="pull-right">以下信息需填写完整，方可进行下一步操作</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i style="color:red">*</i> 交易品种类型</td>
                                <td>
                                    <el-select v-model="mail" placeholder="请选择">
                                        <el-option v-for="item in mnumlist1" :key="item.value" :label="item.label" :value="item.value">
                                            <span style="float: left">{{ item.value }}</span>
                                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                                        </el-option>
                                    </el-select>
                                </td>

                                <td>
                                    <i style="color:red">*</i> 所属板块</td>
                                <td>
                                    <el-select v-model="value" placeholder="请选择">
                                        <el-option v-for="item in mnumlist" :key="item.subType" :label="item.subTypeName" :value="item.subType">
                                            <span style="float: left">{{ item.subType }}</span>
                                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.subTypeName }}</span>
                                        </el-option>
                                    </el-select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i style="color:red">*</i> 产品名称</td>
                                <td>
                                    <input type='text' v-model="fundName" onkeyup="this.value=this.value.replace(/[^\A-\Z\u4E00-\u9FA5]/g,'')" onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\A-\Z\u4E00-\u9FA5]/g,''))" maxlength=100 />
                                </td>
                                <td>
                                    <i style="color:red">*</i> 产品简称</td>
                                <td>
                                    <input type='text' v-model="fundjian" onkeyup="this.value=this.value.replace(/[^\A-\Z\u4E00-\u9FA5]/g,'')" onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\A-\Z\u4E00-\u9FA5]/g,''))" maxlength=100 />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i style="color:red">*</i> 总份额</td>
                                <td>
                                    <input type='text' value="123" v-model="totaler" onkeyup="this.value=this.value.replace(/[^\d\.]+/g,'')" onblur="this.value=this.value.replace(/(\.\d{2})\d*$/,'\$1')" maxlength=20/>
                                </td>
                                <td>
                                    <i style="color:red">*</i> 持有人户数</td>
                                <td>
                                    <input type='text' value="123" v-model="makepeple" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" maxlength=20/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i style="color:red">*</i> 是否初始登记标识</td>
                                <td>
                                    <el-select v-model="value1" placeholder="是">
                                        <el-option v-for="item in biaoshi" :key="item.value" :label="item.label" :value="item.value">
                                            <!-- <span style="float: left">{{ item.value }}</span> -->
                                            <span style="float: left; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                                        </el-option>
                                    </el-select>

                                </td>
                                <!-- <td colspan="3"></td> -->
                                <td>
                                    <i style="color:red">*</i> 登记账户</td>
                                <td><input value="123" v-model="registzhang" /></td>

                            </tr>
                        </tbody>
                    </table>
                    <p class="btn-next">
                        <button id="step1" @click="step(3)">下一步</button>
                    </p>
                </div>

            </div>

            <div class="dataRecord-step2" v-show="showpage==3">
                <shareholder-register v-bind:funCode='funCode' v-on:batchno="getbatchno" v-on:paper="getpaper" v-on:importChu="importChu1" v-on:paper1="getpaper1"></shareholder-register>
                <p class="btn-next">
                    <!-- <button @click="step(2)" v-show="isproduct">返回</button> -->
                    <button id="step2" @click="step(4)">下一步</button>
                </p>
            </div>

            <div class="dataRecord-step3" v-show="showpage==4">
                <table class="table data-table-no-border">
                    <thead>
                        <tr>
                            <th>影印件上传</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>企业基本情况登记表 （加盖企业公章）</td>
                            <td>
                                <button class="btn-sm2">下载</button>
                            </td>
                        </tr>

                        <tr>
                            <td>股东股权登记名册（加盖企业公章）</td>
                            <td>
                                <button class="btn-sm2">下载</button>
                            </td>
                        </tr>

                        <tr>
                            <td>股权登记法人授权委托书（加盖企业公章）</td>
                            <td>
                                <span>查看文件：
                                    <em>
                                        <i>材料</i>.doc</em>
                                </span>
                                <button class="btn-sm2 upload-pop" @click="upload(index=1)">上传

                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>股权登记承诺书（加盖企业公章）</td>
                            <td>
                                <span>查看文件：
                                    <em>
                                        <i>材料</i>.doc</em>
                                </span>
                                <button class="btn-sm2 upload-pop" @click="upload(index=2)">上传</button>
                            </td>
                        </tr>
                        <tr>
                            <td>股权登记托管协议书（加盖企业公章）</td>
                            <td>
                                <span>查看文件：
                                    <em>
                                        <i>材料</i>.doc</em>
                                </span>
                                <button class="btn-sm2 upload-pop" @click="upload(index=3)">上传</button>
                            </td>
                        </tr>
                        <tr>
                            <td>授权人及受托人身份证正反面复印件（加盖企业公章）</td>
                            <td>
                                <span>查看文件：
                                    <em>
                                        <i>材料</i>.doc</em>
                                </span>
                                <button class="btn-sm2 upload-pop" @click="upload(index=4)">上传</button>
                            </td>
                        </tr>
                        <tr>
                            <td>企业章程（市场监督管理局（工商部门）盖章）</td>
                            <td>
                                <span>查看文件：
                                    <em>
                                        <i>材料</i>.doc</em>
                                </span>
                                <button class="btn-sm2 upload-pop" @click="upload(index=5)">上传</button>
                            </td>
                        </tr>
                        <tr>
                            <td>工商部门出具的基本信息查询单（含股东及高管信息）</td>
                            <td>
                                <span>查看文件：
                                    <em>
                                        <i>材料</i>.doc</em>
                                </span>
                                <button class="btn-sm2 upload-pop" @click="upload(index=6)">上传</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p class="btn-next">
                    <button @click="step(3)">上一步</button>
                    <button id="ca-btn" @click="cabtn">提交</button>
                </p>
            </div>
        </div>

        <!-- 弹框 （Modal） -->
        <div class="popModal modal fade smallModal" id="caModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content" id="caing" v-show="!validated">
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
                            <p>请点击CA的
                                <font>"OK"</font>按钮，完成CA认证步骤</p>
                            <p>CA还未确认，还剩
                                <font>98</font>秒</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-save" id="ca-complete" @click="btnsave">完成</button>
                    </div>
                </div>
                <div class="modal-content" id="caed" v-show="validated">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">初始登记提交成功</h4>
                    </div>
                    <div class="modal-body">
                        <!--将进行审核，请到
                                                                                                                                                                                                                                                                        <font>我的账户 - 我的请求</font>查看审核进度-->
                        提交成功，该笔业务的业务流水号为XXXXX;
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-save" id="ca-finished" @click="btnfinished" data-dismiss="modal">确认</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 企业登记成功失败等系列弹窗 -->
        <div class="popModal modal fade smallModal" id="myself-pop" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <!-- 填入所有的空格 -->
                <div class="modal-content" id="caed">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">企业登记失败</h4>
                    </div>
                    <div type="height:185px!important,line-height:150px!important" class="modal-myself" v-if="hanLength">
                        请输入所有必选项
                    </div>
                    <div type="height:185px!important,line-height:150px!important" class="modal-myself" v-else>
                        产品简称不超过三个汉字且不能为空!!!
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-save" id="ca-finished" @click="btnfinished" data-dismiss="modal">确认</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 企业登记成功失败等系列弹窗 -->
        <div class="popModal modal fade smallModal" id="myself-pop1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <!-- 企业登记失败 -->
                <div class="modal-content" id="caed">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">企业登记失败</h4>
                    </div>
                    <div type="height:185px!important,line-height:150px!important" class="modal-myself">
                        {{popResult}}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-save" id="ca-finished" @click="btnfinished" data-dismiss="modal">确认</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 企业登记成功失败等系列弹窗 -->
        <div class="popModal modal fade smallModal" id="myself-pop6" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <!-- 企业登记失败 -->
                <div class="modal-content" id="caed">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">企业登记</h4>
                    </div>
                    <div type="height:185px!important,line-height:150px!important" class="modal-myself" v-if="!popResult1">
                        <p>依次点击【处理导入数据】=>>【查询处理导入数据】后方可进行下一步</p>
                    </div>
                    <div type="height:185px!important,line-height:150px!important" class="modal-myself" v-else>
                        <p>{{popResult1}}</p>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-save" id="ca-finished" @click="btnfinished" data-dismiss="modal">确认</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 企业登记没有上传，或者失败弹窗 -->
        <div class="popModal modal fade smallModal" id="myself-pop7" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <!-- 企业登记失败 -->
                <div class="modal-content" id="caed">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">企业登记</h4>
                    </div>
                    <div type="height:185px!important,line-height:150px!important" class="modal-myself">
                        <p>文件上传失败</p>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-save" id="ca-finished" @click="btnfinished" data-dismiss="modal">确认</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 企业登记成功失败等系列弹窗 -->
        <div class="popModal modal fade smallModal" id="myself-pop2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <!-- 企业登记成功-->
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
        </div>

        <div class="popModal modal fade smallModal" id="uploadModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
                                <button class="stencil">
                                    <i class="fa fa-fw fa-download"></i>
                                </button>
                            </li>
                            <li>
                                <span>文件上传</span>
                                <button class="btn-sm1 upload fa fa-fw fa-upload">
                                    <el-upload class="change" action="http://192.168.10.72:8081/business/uploadFile" name="file" :on-success="seccessRes">
                                        <el-button class="change" size="small" type="primary"></el-button>
                                        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                                    </el-upload>
                                </button>
                            </li>
                        </ul>
                        <div class="prompt">
                            <p>提示：股东身份材料为股东身份证正反面复印件，以（身份证号.jpg)命名单个文件。上传格式为PDF或zip、rar，以企业全称命名(如：浙江股权交易中心有限司.zip)。</p>
                        </div>
                        <p v-if="!retResult">状态：未上传
                            <font>文件名.zip</font>
                        </p>
                        <p v-else>状态：{{retResult=='0'?"已上传":'上传中'}}
                            <font>文件名.zip</font>
                        </p>
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
import ApiService from '@/services/API-servies'
import _ from 'lodash'
import shareholderRegister from '@/components/ShareholderRegister/ShareholderRegister.vue'

export default {
    name: "",
    data() {
        return {
            retResult: '',
            hanLength: true,
            fundCode: '',
            flag: '1',
            listone: [],
            insex1: '',
            batchno: '',
            funCode: '',
            mnumlist: [],
            mnumlist1: [{
                value: '06',
                label: '股份有限公司'
            }],
            mail: '',
            fundName: '',
            fundjian: '',
            totaler: '',
            regist: '',
            makepeple: '',
            moveer: '',
            registzhang: '',

            biaoshi: [{
                value: '0',
                label: '是'
            }],
            value: '',
            value1: '',
            list: [],
            isproduct: true,
            state: '',
            prom: 0,
            showpage: 1,
            enterpriseText: '保存',
            bordershow: true,
            validated: false,
            validated1: false,
            filePathList: [],
            index: 0,
            filePath: '',

            attorney: '',
            undertaking: '',
            custodyAgreement: '',
            idCard: '',
            bylaw: '',
            infoQuerySheet: '',
            attachment: '',

            popResult: '',
            popResult1: '',
            paperone: {},
            import1one: {},
            papertow: '',
            retnull: true,
            resultFilePath: ''
        }
    },
    methods: {
        importChu1(importChu) {
            this.import1one = importChu
            console.log(this.import1one, '我爱你1111')
        },

        getpaper(paper) {
            this.paperone = paper
            console.log(this.paperone, '我爱你')
        },
        getpaper1(paper1) {
            this.papertow = paper1
            console.log(this.papertow, '我爱你')
        },
        getbatchno(batchnone) {
            this.batchno = batchnone
            console.log(this.batchno, '我爱你')
        },
        seccessRes(response, file) {
            this.retResult = JSON.stringify(JSON.parse(response.msg).ret)

            var localFilePath1 = JSON.stringify(JSON.parse(response.msg).data)
            this.filePath = JSON.parse(localFilePath1.replace(new RegExp("\\\\", "gm"), "\\\\")).filePath

            if (this.index == 1) {
                
                this.attorney = this.filePath
                this.resultFilePath = this.attorney.slice(-1, 9)

                console.log(this.resultFilePath)
                console.log(this.attorney, '09091')
            } else if (this.index == 2) {
                this.undertaking = this.filePath
                console.log(this.undertaking, '09092')
            } else if (this.index == 3) {
                this.custodyAgreement = this.filePath
                console.log(this.custodyAgreement, '09093')
            } else if (this.index == 4) {
                this.idCard = this.filePath
                console.log(this.idCard, '09094')
            } else if (this.index == 5) {
                this.bylaw = this.filePath
                console.log(this.bylaw, '09095')
            } else if (this.index == 6) {
                this.infoQuerySheet = this.filePath
                console.log(this.infoQuerySheet, '09096')
            }

        },
        handle() {
            this.showpage = 2
            ApiService.Registrationmanagement.getFund({
                creator: this.$store.getters.operId,
            }).then((res) => {
                this.fundName = res.data.fundName
                this.fundjian = res.data.fundAbbr
                this.totaler = res.data.totalShares
                this.regist = res.data.registerShares
                this.moveer = res.data.floatShares
                this.makepeple = res.data.holders
                this.registzhang = res.data.account

                this.value = res.data.fundClass

                this.biaoshi[0].value = res.data.isOriginal


            })
        },
        enterprise() {
            if (this.enterpriseText == "保存") {
                this.enterpriseText = "编辑"
                this.bordershow = false
                ApiService.Registrationmanagement.saveFund({
                    seq: 'Math.random()*100000000000000000000',
                    creator: this.$store.getters.operId,
                    account: this.registzhang,
                    fundName: this.fundName,
                    fundAbbr: this.fundjian,
                    fundType: this.mail,
                    fundClass: this.value,
                    isOriginal: this.value1,
                    publisherShares: '',
                    startDate: '',
                    endDate: '',
                    unitvol: '',
                    totalShares: this.totaler,
                    registerShares: this.regist,
                    floatShares: this.moveer,
                    unitvol: '',
                    faceValue: '100',
                    coupon: '',
                    repayment: 0,
                    intrestDate: '',
                    payDate: '',
                    deadLine: '',
                    dateType: '',
                    holders: this.makepeple,
                    timestamp: 0
                }).then((res) => {

                })
            } else {
                this.enterpriseText = "保存"
                this.bordershow = true
            }
        },
        step(index) {

            console.log(index)
            this.showpage = index
            if (this.mail == '' && this.value == '' && this.value1 == '' && this.fundjian == '' && this.totaler == '' && this.makepeple == '' && this.registzhang == '' && this.fundName == '') {
                $('#myself-pop').modal('show');
                this.showpage = 2
                return
            } else if (this.fundjian.length >= 4) {
                this.hanLength = false
                $('#myself-pop').modal('show');
                this.showpage = 2
                return
            }

            if (index == 3) {

                ApiService.Registrationmanagement.registerFund({
                    seq: "Math.random()*100000000000000000000",
                    businessKey: '',
                    flag: this.flag,
                    account: this.registzhang,
                    fundCode: this.fundCode,
                    fundName: this.fundName,
                    fundAbbr: this.fundjian,
                    fundType: this.mail,
                    fundClass: this.value,

                    isOriginal: 0,
                    publisherShares: 0,
                    startDate: '',
                    endDate: '',
                    unitvol: '',
                    totalShares: this.totaler,
                    registerShares: this.regist,
                    floatShares: this.moveer,
                    unitvol: '',
                    faceValue: '1',
                    coupon: '',
                    repayment: 0,
                    intrestDate: '',
                    payDate: '',
                    deadLine: '',
                    dateType: '',
                    holders: this.makepeple,

                    fileIds: '1',
                    filePaths: '1',
                    operId: this.$store.getters.operId,
                    timestamp: 0,
                }).then((res) => {
                    this.funCode = res.data.fundCode

                    if (res.ret == '0') {
                        $('#myself-pop2').modal('show');
                        this.popResult = res.message

                    } else if (res.ret == '-1') {
                        $('#myself-pop1').modal('show');
                        this.popResult = res.message
                        this.showpage = 2
                    } else if (res.ret == '20000') {
                        $('#myself-pop1').modal('show');
                        this.popResult = res.message
                        this.showpage = 2
                    }
                })
            }
            if (index == 4) {
                console.log(this.import1one, '00000000')
                if (this.papertow == '') {
                    $('#myself-pop7').modal('show');
                    this.showpage = 3
                    return
                }

                if (this.import1one.ret == 0 || this.paperone.ret == 0) {
                    this.showpage = 4
                }
                // else {
                //     if (this.import1one.ret !== 0) {
                //         $('#myself-pop6').modal('show');
                //         this.popResult1 = this.import1one.message
                //         this.showpage = 3

                //     } else if (this.paperone.ret !== 0) {
                //         $('#myself-pop6').modal('show');
                //         this.popResult1 = this.paperone.message
                //         this.showpage = 3
                //         return
                //     }

                // }

            }
        },
        upload() {
            if (this.retResult) {
                this.retResult=''
            }
            $('#uploadModal').modal('show');
            $('#uploadModal .prompt p').show();
            $('.stencil').removeClass("grey");

        },
        upload1() {
            if (this.retResult) {
                this.retResult=''
            }
            $('#uploadModal').modal('show');
            $('#uploadModal .prompt p').show();
            $('.stencil').addClass("grey");
        },
        cabtn() {
            // $('#caModal').modal('show');

            this.attachment = '{"attorney":' + this.attorney + ',"undertaking":' + this.undertaking + ',"custodyAgreement":' + this.custodyAgreement + ',"idCard":' + this.idCard + ',"bylaw":' + this.bylaw + ',"infoQuerySheet":' + this.infoQuerySheet + '}'
            console.log(typeof (this.attachment), 'ooooooo')
            ApiService.Registrationmanagement.saveRiskFile({
                seq: "Math.random()*100000000000000000000",
                businessKey: '',
                orderId: this.funCode + this.batchno,
                businessName: '骨胶初始登记',
                attachment: this.attachment,
                timestamp: 0,
            }).then((res) => {
                if (res) {
                    this.$router.go('/equityRegister')
                }

            })

        },
        btnsave() {
            this.validated = true
        },
        btnfinished() {

        }
    },
    created() {



        if (this.$route.query.data) {
            this.showpage = 3
            this.funCode = this.$route.query.data.fundCode

        }
        ApiService.Registrationmanagement.queryFundType({
            seq: 'Math.random()*100000000000000000000',
            fundtype: "06",
            businessCode: '',
            pageSize: 100,
            pageNumber: 1,
            timestamp: 0
        }).then((response) => {
            var listArray = response.data.items
            var listfist = _.first(listArray)
            console.log(listfist, 'plplpl')
            this.list.push(listfist)
            this.mail = listfist.fundtype

        })


        if (this.$route.query.id) {
            this.step(2);
            this.isproduct = false;

            this.listone = this.$route.query.list
            this.index1 = this.$route.query.index
            this.flag = '2'

            this.value1 = (this.listone[this.index1]).isOriginal

            this.value = (this.listone[this.index1]).fundClass
            this.fundCode = (this.listone[this.index1]).fundCode

            console.log(this.fundCode, '来吧来吧')
            // this.fundjian = (this.listone[this.index1]).fundAbbr
            // this.fundName = (this.listone[this.index1]).fundName
            // this.totaler = (this.listone[this.index1]).totalShares
            // this.regist = (this.listone[this.index1]).registerShares
            // this.makepeple = (this.listone[this.index1]).holders
            // this.moveer = (this.listone[this.index1]).floatShares
            // this.registzhang = (this.listone[this.index1]).account


            console.log((this.listone[this.index1]).isOriginal, 'liumang')


        }
        ApiService.Registrationmanagement.queryEnum({
            seq: 'Math.random()*100000000000000000000',
            source: 'PCC',
            type: '061064',
            subType: '',
            timestamp: 0
        }).then((response) => {
            this.mnumlist = response.data.items

            console.log(this.mnumlist, 'llllll')

        })
    },
    components: {
        shareholderRegister
    },
}

</script>
<style scoped>
.modal-myself {
    height: 185px;
    line-height: 155px;
    text-align: center;
}



























/*
 * 股权登记
 */

.upload {
    position: relative;
    /* padding: 4px 10px;
    height: 35px;
    line-height: 35px;
    
    border: 1px solid #999;
    text-decoration: none;
    color: #666; */
}

.change {
    position: absolute;
    overflow: hidden;
    width: 130px;
    height: 35px;
    right: 0;
    top: 0;
    opacity: 0;
}

.tableDIV .table>tbody>tr>td span em {
    width: 60px!important;
}

.contentDIV {
    width: 1000px;
    padding: 0px !important;
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

.dataRecord-step1 table div.pull-right:before {
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

.dataRecordTable p.btn-next {
    display: block;
}

.dataRecord-step3 {
    margin-bottom: 150px;
}

.btn-next {
    padding: 0px 0px 20px 0px;
    text-align: center;
    border-bottom: 1px solid #EBEBEB;
}

#base .btn-next {
    display: none;
}

.btn-next button {
    width: 105px;
    height: 35px;
    line-height: 30px;
    border: 1px solid #EBEBEB;
    color: #909090;
    background: #FFFFFF;
    margin: 0px 15px;
    font-size: 16px;
}

.btn-next button:hover {
    border: 1px solid #488FFE;
    background: #488FFE;
    color: #FFFFFF;
}

.dataRecordTable p.btn-next {
    display: block;
}

#base>.step-two>.userinfo-table>tbody>tr>td:first-child,
#base .step-two .userinfo-table>thead>tr>th:first-child,
.data-table-no-border>thead>tr>th:first-child,
.data-table-no-border>tbody>tr>td:first-child {
    padding-left: 75px;
    text-align: left;
}

#base>.step-two>.userinfo-table>thead>tr>th:first-child,
#base>.step-two>.userinfo-table>tbody>tr>td:first-child {
    width: 300px;
}

#base>.step-two>.userinfo-table>tbody>tr>td:last-child,
.data-table-no-border>tbody>tr>td:last-child {
    text-align: right;
}

#base>.step-two>.userinfo-table>tbody>tr>td:last-child span,
.data-table-no-border>tbody>tr>td:last-child span {
    text-align: left;
}

.userinfo-change>tbody>tr>td,
.data-table-no-border>tbody>tr>td {
    border-top: 1px solid #FFFFFF !important;
}

.userinfo-change>tbody>tr:last-child>td,
.data-table-no-border>tbody>tr:last-child>td {
    border-bottom: 1px solid #FFFFFF !important;
}

.userinfo-change>tbody>tr:nth-of-type(even),
.data-table-no-border>tbody>tr:nth-of-type(even) {
    background: #FFFFFF !important;
}





























































/*
*/

.gqfjygh-table-div .tb-search .btn-sm1 {
    width: auto;
    padding: 0 25px;
}

.gqfjygh-table-div .tb-search .btn-sm1 img {
    margin-top: -2px;
    margin-left: 5px;
}

.gqfjygh-table-div .table>tbody>tr>th:last-child {
    /*padding-right: 35px;*/
}
</style>