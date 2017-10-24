<template>
  <div class="tableDIV gqfjygh-table-div">

    <div class="crf-info">
      <div class="tb-table">

        <div class="tb-table">
          <div class="tb tb1">
            <header class="tb-title">
              <p>
                <img :src="blueicon" />客户流水
              </p>

              <div class=" tb-fist searchDIV mui-insetfocus">
                <div class="tb-fist-list">
                  <p>
                    <label class="myRequestSearch">
                      <span class='selectlabel'>业务类型</span>
                      <el-select v-model="type" placeholder="" size="small">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                          <span style="float: left">{{ item.value }}</span>
                          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                        </el-option>
                      </el-select>
                    </label>
                    <span>起止日期</span>
                    <span class="time-group">
                      <input id="start_time" class="time-input form-control" />
                      <i>
                        <img :src="datejpg" /> </i>
                    </span>
                    <span class="time-group">
                      <input id="end_time" class="time-input form-control" />
                      <i>
                        <img :src="datejpg" />
                      </i>
                    </span>
                    <button @click="singlechaXun()">查询</button>
                  </p>

                </div>
              </div>
            </header>
            <table class="table odd">
              <tbody class="table1">
                <tr>
                  <td class="table-self">
                    序号
                  </td>
                  <td class="table-self">处理结果</td>
                  <td class="table-self">业务类型</td>
                  <td class="table-self">发生时间</td>
                  <td class="table-self">产品简称</td>
                  <td class="table-self">产品代码</td>

                  <td class="table-self">备注</td>

                </tr>
                <tr v-if="listFour.length>0" v-for="(item,index) in listFour">
                  <td>{{index+1}}</td>
                  <!-- <td>{{(item.returnCode)=='0000' ? '成功' : '失败'}}</td> -->
                  <td>{{item.returnMessage}}</td>
                  <td>{{item.businessCodeName}}</td>
                  <td>{{item.transDate+'/'+item.transTime}}</td>
                  <td>{{item.fundName}}</td>
                  <td>{{item.fundCode}}</td>
                  <!-- <td>{{item.returnCode}}</td> -->
                  <td class="text-center">
                    <button class="btn-sm2" data-toggle="modal" data-target="#gqfjyghModal" @click="customer(item,index)">查看</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="pagination">
              <!-- <div class="pagetotal" v-show="false">显示：共
                          							<span style="font-size:16px;">0</span>个任务</div> -->
              <div class="paginationcontent">
                <div class="previousAllPage" @click="previousAllPage"></div>
                <div class="previousPage" @click="previousPage"></div>
                <span style="font-size:12px;vertical-align: top;">{{currectpage}} of {{totalpage}}</span>
                <div class="nextPage" @click="nextPage"></div>
                <div class="nextAllPage" @click="nextAllPage"></div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
    <!--弹窗-->
    <div class="popModal modal fade bigModal" id="gqfjyghModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">产品信息详情</h4>
          </div>
          <div class="modal-body">
            <div class="tableDIV">
              <p>查看详情</p>
              <table class="table" v-if="listFour.length>0">
                <tbody>
                  <tr>
                    <td>客户类型</td>
                    <td>{{listFour[this.index].custTypeName}}</td>
                  </tr>
                  <tr>
                    <td>证件类型</td>
                    <td>{{listFour[this.index].certTypeName}}</td>
                  </tr>
                  <tr>
                    <td>证件号码</td>
                    <td>{{listFour[this.index].certNo}}</td>
                  </tr>
                  <tr>

                    <td colspan="2">{{listFour[this.index].specification}}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn-save" id="ca-complete" data-dismiss="modal">完成</button>
            <button type="button" class="btn-close" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="tb-next">

    </div>
  </div>
</template>
<script>
import blueicon from '@/assets/images/blue-icon.png'
import datejpg from '@/assets/images/date.jpg'
import ApiService from '@/services/API-servies'

export default {
  props: {

    // listFour: {
    //   type: Array,
    //   default() {
    //     return []
    //   }
    // },
    // listFour1: {
    //   type: Number,
    //   default() {
    //     return 0
    //   }
    // },
    account: {
      type: String,
      default() {
        return ''
      }
    },
  },
  data() {
    return {
      currectpage: 0,
      totalpage: 0,
      listFour: [],
      listFour1: 0,
      starDay: '',
      endDay: '',
      blueicon: blueicon,
      datejpg: datejpg,
      handletype: false,
      list: [],
      options: [],
      type: '',
      index: 0,

    }
  },
  mounted() {
    $('#start_time,#end_time').datetimepicker({
      language: 'zh-CN',//显示中文
      format: 'yyyy/mm/dd',//显示格式
      minView: "month",//设置只显示到月份
      initialDate: new Date(),//初始化当前日期
      autoclose: true,//选中自动关闭
      todayBtn: true,//显示今日按钮
      bootcssVer: 3,

    });


  },
  // watch: {
  //   // 监控number的变化，并自动执行下面的函数
  //   listFour1: function(val) {
  //     this.totalpage = Math.ceil(val / 15)
  //     console.log(val, '90909')

  //   },
  //   listFour: function() {
  //     this.listFourzhi = this.listFour
  //     console.log(this.listFourzhi, '90909')

  //   }
  // },
  created() {
    ApiService.Registrationmanagement.queryNoCashStream({
      seq: 'Math.random()*100000000000000000000',
      userId: "",//榕说这里不用传userId
      account: this.account,
      fundCode: '',
      businessCode: '',
      beginDate: '',
      endDate: '',
      pageSize: 15,
      pageNumber: this.currectpage,
      timestamp: 0,
    }).then((res) => {
      this.listFour = res.data.items
      this.listFour1 = res.data.total
      this.totalpage = Math.ceil(this.listFour1 / 15)

    })

    ApiService.business.custLogCode({
    }).then((res) => {
      let { ret, message, data } = res;
      if (ret == 0) {
        //成功
        console.log(data, "klklk")
        data.items.forEach((item, index) => {
          this.options.push({
            value: item.subType,
            label: item.subTypeName
          })
        })
      }
    })
  },
  methods: {
    customer(item, index) {
      this.handletype = true
      this.index = index
      console.log(this.index, 'lalalla')
    },
    singlechaXun() {
      this.starDay = $('#start_time').val().replace(/[^0-9]/ig, "")
      this.endDay = $('#end_time').val().replace(/[^0-9]/ig, "")//v-model在引入日期插件时候，会失效，这样会获取input的value的值
      if (this.listFour) {
        ApiService.Registrationmanagement.queryNoCashStream({
          userId: '',
          account: this.account,
          fundCode: '',
          businessCode: this.type,
          beginDate: this.starDay,
          endDate: this.endDay,
          pageSize: 15,
          pageNumber: this.currectpage!==1?1:this.currectpage,

        }).then((res) => {
          this.listFour = res.data.items
          this.listFour1 = res.data.total
          this.totalpage = Math.ceil(this.listFour1 / 15)
          this.currectpage = 1
          console.log(this.currectpag,'kwnfww')
          console.log(this.listFour)
        })
      }

    },
    previousPage() {
      if (this.currectpage > 1) {
        this.currectpage -= 1;
        this.search(this.currectpage);
      } else {
        return
      }
    },
    previousAllPage() {
      if (this.currectpage != 1) {
        this.currectpage = 1;
        this.search(this.currectpage);
      } else {
        return
      }
    },
    nextPage() {
      if (this.currectpage < this.totalpage) {
        this.currectpage += 1;
        this.search(this.currectpage);
      } else {
        return
      }
    },
    nextAllPage() {
      if (this.currectpage != this.totalpage) {
        this.currectpage = this.totalpage;
        this.search(this.currectpage);
      } else {
        return
      }
    },
    search(currectpage) {
      if (!currectpage) {
        this.currectpage = 1;
      }
      console.log(this.listFour1, 'jiijiji')


      ApiService.Registrationmanagement.queryNoCashStream({
        seq: 'Math.random()*100000000000000000000',
        userId: "",//榕说这里不用传userId
        account: this.account,
        fundCode: '',
        businessCode: this.type,
        beginDate: this.starDay,
        endDate: this.endDay,
        pageSize: 15,
        pageNumber: this.currectpage,
        timestamp: 0,
      }).then((res) => {
        this.listFour = res.data.items
        this.listFour1 = res.data.total
        this.totalpage = Math.ceil(this.listFour1 / 15)
      })
    },
  },
}
</script>
<style scoped>
.pagination {
  width: 100%;
}

.pagination .pagetotal {
  font-weight: bold;
  height: 35px;
  line-height: 35px;
  width: 226px;
  float: left;
}

.pagination .paginationcontent {
  height: 35px;
  line-height: 35px;
  float: left;
}

.pagination .paginationcontent div {
  cursor: pointer;
  display: inline-block;
  width: 24px;
  height: 24px;
}

.pagination .paginationcontent span {
  font-size: 12px;
  vertical-align: super;
  display: inline-block;
  height: 24px;
}

.previousAllPage {
  background: url(image/fenye1.png) no-repeat;
}

.previousAllPage:hover {
  background: url(image/fenye-on1.png) no-repeat;
}

.previousPage {
  background: url(image/fenye2.png) no-repeat;
}

.previousPage:hover {
  background: url(image/fenye-on2.png) no-repeat;
}

.nextPage {
  background: url(image/fenye3.png) no-repeat;
}

.nextPage:hover {
  background: url(image/fenye-on3.png) no-repeat;
}

.nextAllPage {
  background: url(image/fenye4.png) no-repeat;
}

.nextAllPage:hover {
  background: url(image/fenye-on4.png) no-repeat;
}

.selectlabel {
  margin-left: 20px;
}

.table-self {
  font-size: 16px!important;
  color: #666666!important;
}

.tb-fist-list {
  width: 880px;
  height: 30px;
  padding-left: 50px;
  position: relative;
}

.searchDIV div p span.time-group {
  width: inherit !important;
  position: relative;
  margin-right: 0px;
  margin-left: 0px;
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

.searchDIV div p span.time-group i img {}

.tb-fist {}

.gqfjyghDIV {
  height: 105px;
  line-height: 105px;
  /*background: url(../images/gqfjygh.png) no-repeat center;*/
  background-size: 100%, 100%;
  position: relative;
  z-index: -2;
}

.searchDIV div p:first-child {
  border-bottom: none;
}

.gqfjyghDIV:before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background: rgba(61, 62, 63, .85);
  z-index: -1;
}

.gqfjyghDIV p {
  font-size: 16px;
  text-align: center;
  z-index: 0;
  color: #FFFFFF;
  margin: 0px;
  position: relative;
}

.gqfjyghDIV p:before {
  content: '';
  position: absolute;
  left: 432px;
  background: #FFFFFF;
  width: 3px;
  height: 3px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  border-radius: 100%;
}

.gqfjyghDIV p:after {
  content: '';
  position: absolute;
  right: 436px;
  background: #FFFFFF;
  width: 3px;
  height: 3px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  border-radius: 100%;
}

.gqfjygh-table-div {
  border-left: 1px solid #EBEBEB;
  margin-bottom: 75px;
}

.gqfjygh-table-div .title {
  text-align: left !important;
  padding: 0px 0px 0px 30px;
  height: 55px;
  line-height: 55px;
  background: #f8fbfb;
  font-size: 16px;
  color: #666666;
}

.gqfjygh-table-div .tb-search {
  text-align: center;
  padding: 30px 0px 38px 0px;
}

.gqfjygh-table-div .tb-search input {
  vertical-align: middle;
  width: 190px;
  height: 35px;
  padding: 15px;
  border: 1px solid #EBEBEB;
  font-size: 14px;
  color: #909090;
  margin: 0px 10px;
}

.gqfjygh-table-div .tb-search button {
  vertical-align: middle;
  margin-left: 25px;
  width: 115px;
  height: 35px;
  text-align: center;
  font-size: 16px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

.gqfjygh-table-div .tb-table .tb {
  padding: 10px 50px 55px 50px;
}

.gqfjygh-table-div .tb-table .tb .tb-title {
  height: 100px;
  border-top: 1px solid #EBEBEB;
  border-left: 1px solid #EBEBEB;
  border-right: 1px solid #EBEBEB;
  position: relative;
}

.gqfjygh-table-div .tb-table .tb .tb-title p {
  background: #FFFFFF;
  position: absolute;
  /*top: -20px;
  left: -11px;*/
  margin: 0;
  padding: 10px 15px 10px 0px;
  margin-top: -20px;
  color: #2EBAB4;
}

.gqfjygh-table-div .tb-table .tb .tb-title p img {
  vertical-align: middle;
  /*margin-right: 10px;*/
}

.gqfjygh-table-div .table>tbody>tr>td {
  /*padding-left: 40px;*/
  width: 220px;
  text-align: left;
}

.gqfjygh-table-div .table>tbody>tr>td:first-child {
  border-left: 1px solid #EBEBEB;
  text-align: center;
}

.gqfjygh-table-div .table>tbody>tr>td:last-child {
  border-right: 1px solid #EBEBEB;
  text-align: center;
}

.gqfjygh-table-div .table.odd>tbody>tr:nth-of-type(even) {
  background: #FFFFFF !important;
}

.gqfjygh-table-div .table.odd>tbody>tr:nth-of-type(odd) {
  background: #fcfcfc !important;
}

.gqfjygh-table-div .tb2 .table.odd {
  margin-bottom: 0px !important;
}

.gqfjygh-table-div .tb2 .table.odd>tbody>tr:last-child>td {
  border-bottom: none;
  width: 150px;
}

.gqfjygh-table-div .tb2 .table.odd>tbody>tr:last-child>td:first-child {
  width: 100px;
}

.gqfjygh-table-div .tb2 .table.odd>tbody>tr:last-child>td:last-child {
  width: 130px;
  text-align: center;
}

.gqfjygh-table-div .tb2 .table.odd>tbody>tr:last-child>td.time {
  width: 200px;
}

.gqfjygh-table-div .tb2 .max-4 .table>tbody>tr>td {
  width: 150px;
}

.gqfjygh-table-div .tb2 .max-4 .table>tbody>tr>td:first-child {
  width: 100px;
}

.gqfjygh-table-div .tb2 .max-4 .table>tbody>tr>td:last-child {
  width: 130px;
  text-align: center;
}

.gqfjygh-table-div .tb2 .max-4 .table>tbody>tr>td.time {
  width: 200px;
}

.gqfjygh-table-div .tb2 .max-4 .table>tbody>tr>td span {
  display: block;
  width: 15px;
  height: 15px;
  border: 1px solid #7A7A7A;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
}

.gqfjygh-table-div .tb2 .max-4 .table>tbody>tr.checked>td span {
  border: 1px solid #2EBAB4;
}

.gqfjygh-table-div .tb2 .max-4 .table>tbody>tr.checked>td span:before {
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

.gqfjygh-table-div .tb2 .max-4 .table {
  margin-bottom: 0px;
}

.max-4 {
  height: 225px;
  overflow: auto;
}

.gqfjygh-table-div .tb-next {
  text-align: center;
  padding: 37.5px 0px 37.5px 0px;
  border-top: 1px solid #EBEBEB;
}

.gqfjygh-table-div .tb-next button {
  width: 105px;
  height: 35px;
  line-height: 30px;
  border: 1px solid #EBEBEB;
  color: #909090;
  background: #FFFFFF;
  margin: 0px 15px;
  font-size: 16px;
}

.gqfjygh-table-div .tb-next button:hover {
  border: 1px solid #488FFE;
  background: #488FFE;
  color: #FFFFFF;
}

.registration-table .crf-info .tb-table .table>tbody>tr>td:last-child {
  padding-left: 70px;
}

.registration-table .crf-info .tb-table .table>tbody>tr:first-child>td:last-child {
  padding-left: 90px !important;
  width: 250px !important;
}





































/* 弹框 */

.modal-backdrop {
  height: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, .5)
}

.modal-dialog {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: auto;
  width: 470px !important;
  height: 640px;
  color: #666666;
}

.modal-dialog .modal-body.one-row {
  padding-top: 80px;
  height: 185px;
}

#modal-1,
#modal-2,
#modal-3,
#modal-4,
#modal-5,
#ent-modal-1,
#ent-modal-2 {
  height: 320px;
}

#uploadModal .modal-dialog {
  height: 367px;
}

#modal-6,
#modal-7,
#modal-8 {
  height: 640px;
}

.modal-dialog .modal-content {
  -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0);
  border-radius: 0px;
  border: none;
  border-top: 3px solid #2ebab4;
}

.modal-dialog .modal-content .modal-header {
  height: 72px;
  text-align: center;
  font-size: 16px;
  color: #666666;
  padding: 35px 0px 0px 0px;
  position: relative;
  border-bottom: 1px solid #EBEBEB;
  margin: 0px 50px;
}

.modal-dialog .modal-content .modal-header h4 {
  font-size: 16px;
  color: #666666;
  line-height: 1;
}

.modal-dialog .modal-content .modal-header button {
  position: absolute;
  top: 15px;
  right: -35px;
  color: #696e79;
  opacity: inherit;
}

.modal-dialog .modal-content .modal-header button:hover {
  color: #2ebab4;
}

.modal-dialog .modal-content .modal-body {
  text-align: center;
}


#ent-modal-1 .modal-content .modal-body {
  height: 185px;
  padding: 50px 0px 0px;
}

#ent-modal-2 .modal-content .modal-body {
  height: 185px;
  padding: 30px 0px 0px;
}

#modal-3 .modal-content .modal-body,
#modal-4 .modal-content .modal-body,
#modal-5 .modal-content .modal-body {
  height: 185px;
  padding: 75px 0px 0px;
}

#modal-6 .modal-content .modal-body {
  height: 505px;
  padding: 40px 50px 40px 40px;
}

#modal-7 .modal-content .modal-body,
#modal-8 .modal-content .modal-body {
  height: 505px;
  padding: 80px 50px 40px 40px;
}

#uploadModal .modal-dialog .modal-content .modal-body {
  height: 185px;
  padding: 20px 70px 15px;
}

.modal-dialog .modal-content .modal-body input {
  display: block;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 225px;
  height: 35px;
  border: 1px solid #EBEBEB;
  font-size: 14px;
  color: #909090;
  padding: 15px;
}

.modal-dialog .modal-content .modal-body input:focus,
.modal-dialog .modal-content .modal-body textarea:focus {
  border: 1px solid #2EBAB4 !important;
  box-shadow: none;
}

.modal-dialog .modal-content .modal-footer {
  border-top: none;
  background: #f2f2f5;
  height: 60px;
  padding: 12.5px;
  text-align: center;
}

.modal-dialog .modal-content .modal-footer button {
  width: 90px;
  height: 35px;
  font-size: 14px;
  margin: 0px 5px;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  line-height: 31px;
}

.modal-dialog .modal-content .modal-footer button.btn-save {
  border: 1px solid #2EBAB4;
  background: #2EBAB4;
  color: #FFFFFF;
}

.modal-dialog .modal-content .modal-footer button.btn-close {
  border: 1px solid #d9d9d9;
  background: #FFFFFF;
  color: #909090;
  /*
	-webkit-box-shadow:0 0 4px 3px rgba(0,0,0,.1);  
    -moz-box-shadow:0 0 4px 3px rgba(0,0,0,.1); 
    box-shadow:0 0 4px 3px rgba(0,0,0,.1); 
    */
}

#modal-3 ul,
#modal-5 ul {
  margin: 0px;
  padding: 0px;
}

#modal-3 ul li {
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  margin: 0px 25px;
  position: relative;
  cursor: pointer;
}

#modal-5 ul li {
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  margin: 0px 50px 0px 45px;
  position: relative;
  cursor: pointer;
}

#modal-3 ul li label,
#modal-5 ul li label {
  display: inline-block;
  font-size: 14px;
  color: #7A7A7A;
  font-weight: inherit;
}

#modal-3 ul li input,
#modal-5 ul li input {
  width: 30px;
  height: 30px;
  display: inline-block;
  opacity: 0;
  position: absolute;
  top: 4px;
  left: -20px;
  margin: auto;
}

#modal-3 ul li span,
#modal-5 ul li span {
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

#modal-3 ul li.active span,
#modal-5 ul li.active span {
  border: 1px solid #2EBAB4;
}

#modal-3 ul li.active span:before,
#modal-5 ul li.active span:before {
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

#modal-6 .modal-content .modal-body p {
  text-align: left;
  margin: 0 0 25px;
  font-size: 16px;
  color: #7A7A7A;
}

#modal-6 .modal-content .modal-body p.remark {
  padding-top: 20px;
}

#modal-6 .modal-content .modal-body>div>span,
#modal-7 .modal-content .modal-body>div>span,
#modal-8 .modal-content .modal-body>div>span {
  display: inline-block;
  width: 80px;
  text-align: left;
  color: #7A7A7A;
}

#modal-6 .modal-content .modal-body>div input,
#modal-7 .modal-content .modal-body>div input,
#modal-8 .modal-content .modal-body>div input {
  display: inline-block;
  height: 30px;
}

#modal-6 .modal-content .modal-body>div label,
#modal-7 .modal-content .modal-body>div label,
#modal-8 .modal-content .modal-body>div label {
  width: 225px;
  font-weight: inherit;
  text-align: left;
  font-size: 14px;
  color: #7A7A7A;
  height: 20px;
  line-height: 20px;
  padding-left: 5px;
  margin-bottom: 20px;
}

#modal-6 .modal-content .modal-body>div textarea,
#modal-7 .modal-content .modal-body>div textarea,
#modal-8 .modal-content .modal-body>div textarea {
  width: 315px;
  height: 100px;
  border: 1px solid #EBEBEB;
  font-size: 14px;
  color: #909090;
  padding: 15px;
}

#modal-7 .modal-content .modal-body p,
#modal-8 .modal-content .modal-body p {
  text-align: left;
  margin: 0 0 30px;
  font-size: 16px;
  color: #7A7A7A;
}

#modal-7 .modal-content .modal-body p.remark,
#modal-8 .modal-content .modal-body p.remark {
  padding-top: 80px;
}

#uploadModal .modal-dialog .modal-content .modal-body ul {
  padding: 0px;
  margin: 0px;
}

#uploadModal .modal-dialog .modal-content .modal-body ul li {
  display: inline-block;
}

#uploadModal .modal-dialog .modal-content .modal-body ul li:first-child {
  margin-right: 60px;
}

#uploadModal .modal-dialog .modal-content .modal-body ul li span {
  margin-right: 20px;
  vertical-align: middle;
  color: #7A7A7A;
}

#uploadModal .modal-dialog .modal-content .modal-body ul li button {
  width: 50px;
  height: 25px;
  border: none;
  color: #FFFFFF;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  background: #2EBAB4;
}

#uploadModal .modal-dialog .modal-content .modal-body ul li button.grey {
  background: #d1d1d1 !important;
}

#uploadModal .modal-dialog .modal-content .modal-body ul li button i {
  font-size: 16px;
  line-height: 25px;
}

#uploadModal .modal-dialog .modal-content .modal-body ul {
  margin-bottom: 20px;
}

#uploadModal .modal-dialog .modal-content .modal-body .prompt {
  overflow: hidden;
  padding: 0px 0px 0px 0px;
  color: #7a7a7a;
  font-size: 14px;
  text-align: left;
  /*height: 81px;*/
  line-height: 1.2;
}

#uploadModal .modal-dialog .modal-content .modal-body>p {
  text-align: left;
  color: #7A7A7A;
}

#uploadModal .modal-dialog .modal-content .modal-body>p font {
  margin-left: 20px;
}

.gqfjygh-table-div .tb-table .tb .tb-title p {
  margin-top: 0px;
}

.gqfjygh-table-div .tb-table .tb .tb-title .tb-fist-list p {
  /*margin-left: 45px;*/
  margin-top: 5px;
  background: none;
}
</style>