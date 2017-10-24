<template>
	          <table class="table dataRecord-step1-update mui-insetfocus"  >
                      <thead>
                          <tr>
                              <th colspan="4">股权变更
                                  
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                          <br />
                          <tr>
                              <td>变更前份额性质</td>
                              <td>
                                  {{stockNatureNameFun}}
                              </td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>变更后份额性质</td>
                              <td>
                                  <el-select  v-model="varyinfoData.stockNatureAfter" placeholder="" >
                                      <el-option
                                        v-for="item in stockTypeData"
                                        :key="item.subType"
                                        :label="item.subTypeName"
                                        :value="item.subType">
                                      </el-option>
                                  </el-select>
                              </td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr class="num">
                              <td>变更数量</td>
                              <td>
                                  <input  v-model.number="varyinfoData.frostNum" type='text' @change='commitVal(varyinfoData.frostNum)' maxlength="13"/>
                              </td>
                              <td>
                                  <input v-model='viewFronstNUm' readonly/>
                              </td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>备注</td>
                              <td rowspan="2">
                                  <textarea v-model='varyinfoData.remark' maxlength="200"></textarea>
                              </td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                          </tr>

                      </tbody>
              </table>
</template>

<script>
	import blueicon from '@/assets/images/blue-icon.png'
	import gqfjygh from '@/assets/images/gqfjygh.png'


	import '@/../static/jquery-1.11.0.min.js'
	import '@/../static/jquery.mCustomScrollbar.concat.min.js'

  import { toDecimal2 , convertCurrency} from '@/utils/validate';
  import ApiService from '@/services/API-servies'


	export default {
		//组件名
		name: 'share-change',
		//实例的数据对象
		data() {
			return {
				gqfjygh:gqfjygh,
				blueicon:blueicon,		
        viewFronstNUm:'零',
        varyinfoData:{
          stockNatureAfter:'',
          remark:'',
          frostNum:'0.00',
          str:'变更份额大于可用份额，请重新输入'
        },
        stockTypeData:[
          // {subType:'0',subTypeName:'流通股'},
          // {subType:'32',subTypeName:'特别股'},
          // {subType:'2',subTypeName:'资格股'},
          // {subType:'11',subTypeName:'公众已托股'},
          // {subType:'12',subTypeName:'发起人股'},
          // {subType:'13',subTypeName:'限售股'},
          // {subType:'31',subTypeName:'定向股'},
          // {subType:'36',subTypeName:'其他'},
          // {subType:'41',subTypeName:'内部职工股'},
          // {subType:'33',subTypeName:'高管股'},
          // {subType:'43',subTypeName:'公众为托股'},
          // {subType:'44',subTypeName:'托管法人股'},
          // {subType:'45',subTypeName:'法人股'},
          // {subType:'46',subTypeName:'自然人股'}
        ],
			}
		},
		props: {

		},
		methods: {
      commitVal:function(value){
          this.varyinfoData.frostNum  = toDecimal2(value)
          this.viewFronstNUm = convertCurrency(toDecimal2(value))
      },
      stockTypeFun: function(){//股权类型
        const data = {};
        data.source = 'PCC';
        data.type = '060038';
        ApiService.common.queryEnum(data).then(response => {
          this.stockTypeData = response.data.items;
          this.varyinfoData.stockNatureAfter = this.stockTypeData[0].subType;
        })
      },
    },
		computed: {
			businessTypeFun: function() {
				let businessType = this.$store.getters.businessType;
				return businessType;
			},
      stockNatureNameFun: function() {
          let stockNatureName = this.$store.getters.stockNatureName;  //vuex组件通信
          return stockNatureName;
      },
		},
		created() {
      this.$store.commit('SET_STOCKNATURENAME', null);//初始值置空
      this.stockTypeFun()
		},
		mounted() {
			
		},
	  watch: {
      //  varyinfoData: {
      //   handler: function (newVal) {
      //       // 不能超过20位 超出不能输入  输入20位时无法补0  
      //       var value = newVal.frostNum;
      //       // if (value.toString().length>12) {
      //       //   this.varyinfoData.frostNum = Number(value.toString().substr(0,12))
      //       // };
      //   },
      //   deep: true
      // }
  },
	}
</script>

<style scoped>

#gqfjyghModal .modal-body .tableDIV {
    height: 450px;
}
#gqfjyghModal .modal-body .tableDIV {
    margin-top: 0px;
}
.gqfjyghDIV p:before {
    left: 420px;
}
.gqfjyghDIV p:after {
    right: 423px;
}
.gqfjygh-table-div .tb-next {
    margin-top: 55px;
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
</style>