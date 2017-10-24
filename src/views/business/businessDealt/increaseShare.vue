<template>
	<div class="">

		<div class="gqfjyghDIV">
			<p>增资扩股</p>
			<img :src="gqfjygh" class="gqfjyghImg"/>
		</div>

		<div class="tableDIV gqfjygh-table-div" style="margin-bottom: 0;" v-show="showpage==1">
			<crf-info :title="title"  ref='carinfoData'></crf-info>
			
			<div class="tableDIV dataRecordTable infotable">
				<div class="dataRecord-step3">
				<table class="table dataRecord-step1-update mui-insetfocus"  >
                        <thead>
                            <tr>
                                <th colspan="4">总股本修改
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
							          <br />
                          <tr>
                              <td>原股本（股）</td>
                              <td>
                                  {{totalSharesInit}} 股
                              </td>
                              <td></td>
                              <td></td>
                          </tr>
                           <tr>
                               <td class='mui-required'>现股本（股）</td>
                               <td>
                                    <input  v-model='totalShares' type='text' onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');"  maxlength="20"/>
                               </td>
                               <td></td>
                               <td></td>
                           </tr>
                            <!-- <tr>
                                <td>备注</td>
                                <td rowspan="2">
                                    <textarea>无字段</textarea>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr> -->

                        </tbody>
        		</table>
        		<div class="tb-next">
          <button @click="routeHerf">返回</button>
					<button @click="step(2)">下一步</button>
				</div>
				</div>
			        
			</div>
			
		</div>
		
		
	<!-- 	<div class="tableDIV dataRecordTable" v-show="showpage==2">
				<div class="dataRecord-step3" >
                    <uploadlist  :itemList="itemList"  v-on:upload="changeState" Type='application' ></uploadlist>
                    <p class="btn-next">
                        <button @click="step(1)">返回</button>
                        <button id="ca-btn" @click="step(3)">下一步</button>
                    </p>
                </div>
		</div>    		
        <div class="tableDIV dataRecordTable" v-show="showpage==3">
                <div class="dataRecord-step3" >
                    <uploadlist  :itemList="itemList"  v-on:upload="changeState" Type='init'></uploadlist>  
                    <p class="btn-next">
                        <button @click="step(2)">返回</button>
                        <button id="ca-btn" @click='onsubmit'>提交</button>
                    </p>
                </div>
        </div>  -->

		  <!-- 弹窗 -->
           <div class="popModal modal fade smallModal" id="indedxModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <tips :codeview='codeview'></tips>
            </div>
      <div class="popModal modal fade smallModal" id="submitincrePop" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" >
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">温馨提示</h4>
                </div>
                <div class="modal-body one-row">
                    提交成功
                </div>
                <div class="modal-footer">
                     <button  @click='printCompanyFun' type="button" class="btn-save btn-review">打印凭证</button>
                    <button type="button" class="btn-close" data-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>
     <div class="popModal modal fade smallModal" id="finicalPop" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" >
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">温馨提示</h4>
                </div>
                <div class="modal-body one-row">
                    <!-- 总股本修改成功 -->
                    {{totalSharesInfo}}
                </div>
                <div class="modal-footer">
                     <button  @click='editHerf' type="button" data-dismiss="modal"  class="btn-save btn-review">确定</button>
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
                            <div   @click='downLoadFun'><button class="grey"><i class="fa fa-fw fa-download"></i></button></div>
                            <!-- <button class="grey"><i class="fa fa-fw fa-download"></i></button> -->
                        </li>
                        <li class='mui-loadBox'>
                            <span>文件上传</span>
                            <button @click="triggerFile()"><i class="fa fa-fw fa-upload"></i></button>
                            <form>
                                <input name="file" class="mui-uploadInput" type="file" @change='uploadFileFun($event)'>
                            </form>
                        </li>
                    </ul>
                    <div class="prompt">
                       <p >
                           {{cueInfo}}
                       </p>
                    </div>
                    <p>状态：{{uploadStatus}}<font>{{uploadName}}</font></p>
                   </div>
                   <div class="modal-footer">
                       <button type="button" class="btn-save" data-dismiss="modal" >确认</button>
                       <button type="button" class="btn-close" data-dismiss="modal">关闭</button>
                   </div>
               </div>
           </div>
       </div>
	</div>
</template>

<script>
	import blueicon from '@/assets/images/blue-icon.png'
	import gqfjygh from '@/assets/images/gqfjygh.png'
	import crfInfo from '@/components/dealtStep/crfInfo.vue'
  import uploadlist from '@/components/dealtStep/uploadList.vue'
  import tips from '@/components/tips/tips.vue'

	import '@/../static/jquery-1.11.0.min.js'
	import '@/../static/jquery.mCustomScrollbar.concat.min.js'
  import ApiService from '@/services/API-servies'

  // import { registerFund } from 'api/businessDealt/businessDealt';
  // import { uploadFile } from 'api/common';
  import { switchType } from '@/utils/validate';
  //股权登记组件
  import shareholderRegister from '@/components/ShareholderRegister/ShareholderRegister.vue'


	export default {
		name: 'increase-share',
		data() {
			return {
				title:'增资扩股',
        totalSharesInfo:'',
        getbatchno:'股东名册登记信息',
        getfunCode:'',
				gqfjygh:gqfjygh,
				blueicon:blueicon,
        uploadStatus:'未上传',
        uploadName:"",
        cueInfo:'',
				showpage:1,
        carinfo:{},//提交通信
				checkindex:null,
				selectpro:false,
        totalShares:'',
        // examineoptions:[
        //   {value:'0',label:'送股'},
        //   {value:'32',label:'配股（资金账户)'},
        //   {value:'32',label:'缩股'},
        //   {value:'32',label:'其他增资扩股'},
        // ],
				examine:'0',
        fileName:'',
        fileIds:{},
        filePaths:{},
        submitFetch:true,
        codeview:'',
        itemList:[],
        fileType:'',
        printData:{},
        fundCode:''
			}
		},
		props: {

		},
		methods: {
      editHerf:function(){
        if (this.totalSharesInfo =='总股本修改成功') {
          this.$router.push({ path: '/equityRegister', query: { data:this.printData }});
        }
        // this.showpage=2;
        //回到顶部
        // document.body.scrollTop = 0;
      },
      routeHerf:function(){
        this.$router.push({ path: '/businessDealt', query: { businessType: "增资扩股" } });
      },
      printCompanyFun(){//打印凭证
        // 参数配置
        const msg = {};
        msg.account = this.printData.account;
        msg.fundCode = this.printData.fundCode;
        msg.fundName = this.printData.fundName;
        msg.fundAbbr = this.printData.fundAbbr;
        msg.fundType = this.printData.fundType;
        msg.isOriginal = this.printData.isOriginal;
        msg.totalShares = this.printData.totalShares;
        msg.registerShares = this.printData.registerShares;
        msg.faceValue = this.printData.faceValue;
        console.log(msg)
        ApiService.common.printCompany(msg).then(response => {
          console.log(response)
        })
      },
      downLoadFun(){
        const msg = {};
        msg.fileName = "a.zip";
        msg.filePath = "group1/M00/00/52/DAEBUFnDoE8EAAAAAAAAAAAAAAA229.zip";
        ApiService.common.downloadFile(msg).then(response => {
          console.log(response)
        })
      },
      step(index){
      				this.showpage = index;
                      if (index == 2) {
                          // this.varyinfo = this.$refs.varyinfoData.varyinfoData;
                          this.carinfo = this.$refs.carinfoData.carinfoData;
                          //股权登记组件参数
                          this.getfunCode = this.carinfo.fundCode;
                          // 验证 必须选择一条数据
                          if(!this.$refs.carinfoData.selectpro){
                              $('#indedxModal').modal('show')
                              this.codeview = '请选择需要扩股的产品'
                              this.showpage = 1
                          }else if (Number(this.totalShares)<Number(this.totalSharesInit)) {
                            $('#indedxModal').modal('show')
                            this.codeview = '现股本需大于等于原股本，请重新输入'
                            this.showpage = 1
                          }else{
                            this.onsubmit()
                          
                             this.showpage = 1
                          };
                      }else if(index == 3){
                          this.submitFetch = true;
                          // this.verifyFile('application')
                          if (!this.submitFetch){
                              this.showpage = 2
                          }
                      }
      			},
            validateFun(){
              
            },
            changeState(data) { 
                this.fileName = data.fileName;
                this.cueInfo = data.cueInfo;

                this.uploadStatus='未上传'
                this.uploadName='';
            },
            triggerFile() {
                $(".mui-uploadInput").trigger('click');
            },
            upload(){
                $('#uploadModal').modal('show');
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
                       this.fileIds[fileName] = data.fileId;
                       this.filePaths[fileName] = data.filePath; 
                      
                       this.uploadStatus = '已上传';//上传状态uploadStatus
                       this.uploadName = file.name;//上传文件名uploadName

                       const str = this.uploadName;
                       const beginName = str.substr(0,str.indexOf('.'));
                       const endName = str.substr(str.indexOf('.'),str.length);

                       const uploadAll = {};

                       uploadAll.beginName = beginName;
                       uploadAll.endName = endName;
                       uploadAll.fileName = this.fileName;
                       uploadAll.uploadStatus = this.uploadStatus;
                       uploadAll.uploadName = str;

                       // 添加数据
                       const list = this.itemList;
                       list.forEach((item) => {
                        if (item.fileName==this.fileName) {
                            // item = Object.assign(uploadAll,item);//浅拷贝  不添加 不响应
                            this.$set(item,'beginName',uploadAll.beginName)
                            this.$set(item,'endName',uploadAll.endName)
                            this.$set(item,'uploadStatus',uploadAll.uploadStatus)
                            this.$set(item,'uploadName',uploadAll.uploadName)
                        };
                       })
                       this.itemList = list;
                    };
                 })
            },
            verifyFile(fileType){
                // 验证文件提交   提示未上传 
                const list = this.itemList;
                const type = fileType;
                list.forEach((item) => {
                    if (item.type==type||!item.type) {
                        if (item.mustFile) {
                            if (!item.uploadName) {
                                $('#indedxModal').modal('show')
                                this.codeview = '请上传必传文件'
                                this.submitFetch = false;
                            }
                        };
                    };
                })
                
            },
            preSubFun(){
                const useData ={};

                useData.flag = 2;//登记 修改
                useData.account = this.carinfo.account;//账户
                useData.fundCode = this.carinfo.fundCode;//代码
                useData.fundName = this.carinfo.fundName;//名称
                useData.fundAbbr = this.carinfo.fundAbbr;//简称 
                useData.fundType = this.carinfo.fundType;//类型
                useData.isOriginal =  Number(this.carinfo.isOriginal);//首次登记 
                useData.totalShares = this.totalShares;//总份额
                useData.registerShares = this.carinfo.registerShares;//注册份额
                useData.holders = this.carinfo.holders;//持有人户数
                useData.floatShares = this.carinfo.floatShares;//流通份额
                useData.unitvol = this.carinfo.unitvol;//资产单位
                useData.fundClass = this.carinfo.fundClass;
                useData.faceValue = this.carinfo.faceValue;//面值 
                useData.operId = this.$store.getters.operId;//操作员id ;
                // useData.remark = this.remark;//缺少字段  删除字段

                // 文件集合 提交时采集页面数据  
                useData.fileIds = this.fileIds;
                useData.filePaths = this.filePaths;
                  console.log(useData)
                  this.printData = useData;
                    // delete this.varyinfo.fileType;  //删除添加的用于文件类型展示 文件数据展示的字段 不需要删除 参数赋值
                    ApiService.BusinessDealt.registerFund(useData).then(response => {
                    // registerFund(useData).then(response => {
                         let {
                              data,
                              message,
                              ret
                          } = response;
                         if (ret==0) {
                          this.fundCode = data.fundCode;
                          // $('#submitincrePop').modal('show')
                          $('#finicalPop').modal('show')
                           this.totalSharesInfo = '总股本修改成功';
                         }else {
                          $('#finicalPop').modal('show')
                          this.totalSharesInfo = '总股本修改失败';
                          // this.$message.error(message);
                        };
                    })
            },
            onsubmit(){
                this.submitFetch = true;
                // this.verifyFile('init');
                if (this.submitFetch) {this.preSubFun()};

            },
		},
		created() {
        this.itemList =  switchType('增资扩股');
		},
		mounted() {
			$('#transfer').mCustomScrollbar()
		},
		watch: {

		},
    computed: {
      totalSharesInit: function() {
          let stockNatureName = this.$store.getters.stockNatureName;  //vuex组件通信
          this.totalShares = stockNatureName;
          return stockNatureName;
      },
    },
		components: {
			crfInfo,
      uploadlist,
      tips,
      shareholderRegister
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.modal-body ul>li>div {
     display:inline-block;
  }
.prompt{
        height: 85px;
    }
      #uploadModal{
        font{
            float:right
          }
    }
#gqfjyghModal .modal-body .tableDIV {
    margin-top: 0px;
}
.bigModal .modal-dialog .modal-content .modal-body table{
	margin-bottom: 25px;
}
.tableDIV .table > thead > tr > th:last-child {
    text-align: left;
    padding-left: 30px;
}
.infotable .table > tbody > tr > td {
	text-align: left;
    width: 25%;
    padding: 0px 20px 0px 0px;
    border: none;
}
.infotable .table > tbody > tr > td:first-child {
    text-align: left;
    padding: 0px 0px 0px 35px;
}
.infotable .table > tbody > tr > td:last-child {
    text-align: left;
    padding-left: 0px;
}
.tableDIV .dataRecord-step1-update > tbody > tr td input{
	width: 100%;
}
.tableDIV .dataRecord-step1-update > tbody > tr td textarea {
    width: 100%;
    height: 90px;
    border: 1px solid #EBEBEB;
    font-size: 14px;
    color: #909090;
    padding: 15px;
}
.tableDIV .dataRecord-step1-update > tbody > tr.num td input{
	text-align: right;
}
.mui-insetfocus .el-select {
    width: 100%;
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