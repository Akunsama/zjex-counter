<template>
  <div class="tableDIV gqfjygh-table-div">
    <div class="crf-info">
      <div class="tb-table">
        <div class="tb tb1">
          <header class="tb-title">
            <p>
              <img :src="blueicon" />资金信息 </p>
          </header>
          <table class="table odd">
            <tbody>
              <tr>
                <td class="table-self">
                  序号
                </td>
                <td class="table-self">客户代码</td>
                <td class="table-self">客户名称</td>
                <td class="table-self">资金账户</td>
              </tr>
              <tr>
                <td>
                  1
                </td>
                <td>{{listone.custno}}</td>
                <td>{{listone.name}}</td>
                <td>{{listone.capitalAccount}}</td>
              </tr>

            </tbody>
          </table>
        </div>
        <div class="tb-table">
          <div class="tb tb1">
            <header class="tb-title">
              <p>
                <img :src="blueicon" />持仓信息 </p>
            </header>
            <table class="table odd">
              <tbody class="table1">
                <tr>
                  <td class="table-self">
                    序号
                  </td>
                  <td class="table-self">客户代码</td>
                  <td class="table-self">客户名称</td>
                  <td class="table-self">登记账户</td>
                  <td class="table-self">产品代码</td>
                  <td class="table-self">产品名称</td>
                  <td class="table-self">详情</td>
                </tr>
                <tr v-if="listThere.length>0">
                  <td>1</td>
                  <td>{{listone.custno}}</td>
                  <td>{{listone.name}}</td>
                  <td>{{listThere[0].account}}</td>
                  <td>{{listThere[0].fundCode}}</td>
                  <td>{{listThere[0].fundName}}</td>
                  <td class="text-center">
                    <button class="btn-sm2">查看</button>
                  </td>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="tb-next">

    </div>
  </div>
</template>
<script>
import ApiService from '@/services/API-servies'

import blueicon from '@/assets/images/blue-icon.png'
export default {
  props: {
    listThere:{
      type: Array,
      default() {
        return []
      }
    },
    listone: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  data() {
    return {
      blueicon: blueicon,

      custno: '',
      name: '',
      custTypeName: '',
      capitalAccount: '',
      account: '',
      tno: '',
      openDate: ''
    }
  },
  created() {
    ApiService.business.queryCustStock({
      seq: 'Math.random()*100000000000000000000',
      userId: '',
      custmerno:'',
      fundName:'',
      fundCode:'',
      stockNature:'',
      pageSize:1,
      pageNumber:1,
      timestamp:0,

    }).then((res) => {
      // this.custno = res.msg.data.items.

    })
    ApiService.business.queryCustAccount({
      seq: '',
      account: '',
      certType: 0,
      certNo: '',
      custno: '',
      timestamp: 0
    }).then((res) => {
      // this.custno = res.msg.data.custno
      // this.name = res.msg.data.name
      // this.capitalAccount = res.msg.data.capitalAccount
      
      // this.account = res.msg.data.account
      // this.tno = res.msg.data.tno
      // this.openDate = res.msg.data.openDate
    })
    
  }
}
</script>
<style scoped>
.table-self {
  font-size: 16px!important;
  color: #666666!important;
}

.gqfjyghDIV {
  height: 105px;
  line-height: 105px;
  /*background: url(../images/gqfjygh.png) no-repeat center;*/
  background-size: 100%, 100%;
  position: relative;
  z-index: -2;
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
  height: 45px;
  border-top: 1px solid #EBEBEB;
  border-left: 1px solid #EBEBEB;
  border-right: 1px solid #EBEBEB;
  position: relative;
}

.gqfjygh-table-div .tb-table .tb .tb-title p {
  background: #FFFFFF;
  position: absolute;
  top: -20px;
  left: -11px;
  margin: 0;
  padding: 10px 15px 10px 0px;
  color: #2EBAB4;
}

.gqfjygh-table-div .tb-table .tb .tb-title p img {
  vertical-align: middle;
  margin-right: 10px;
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
</style>