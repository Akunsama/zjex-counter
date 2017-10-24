<template>
	         <table class="table dataRecord-step1-update mui-insetfocus"  >
                     <thead>
                         <tr>
                             <th colspan="4">股权调整
                                 
                             </th>
                         </tr>
                     </thead>
                     <tbody>
                         <br />
                         <tr>
                             <td>调整前份额性质</td>
                             <td>
                                {{stockNatureNameFun}}
                             </td>
                             <td></td>
                             <td></td>
                         </tr>
                         <tr>
                             <td>调整类型</td>
                             <td>
                                 <el-select  v-model="varyinfoData.adjustType" placeholder="">
                                   <el-option
                                     v-for="item in adjustTypeData"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                                   </el-option>
                                 </el-select>
                             </td>
                             <td></td>
                             <td></td>
                         </tr>
                         <tr class="num">
                             <td>调整数量</td>
                             <td>
                                 <input  v-model.number='varyinfoData.adjustNum' type='text' @change='commitVal(varyinfoData.adjustNum)' maxlength="13"/>
                             </td>
                             <td>
                                <input v-model='viewadjustNum' readonly/>
                             </td>
                             <td></td>
                         </tr>
                         <tr>
                             <td>备注</td>
                             <td rowspan="2">
                                 <textarea v-model='varyinfoData.remark' maxlength="100"></textarea>
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

    import { toDecimal2 , convertCurrency} from '@/utils/validate';


	export default {
		//组件名
		name: 'share-adjust',
		//实例的数据对象
		data() {
			return {
				gqfjygh:gqfjygh,
				blueicon:blueicon,
                adjustType:'',
                viewadjustNum:'零',
                varyinfoData:{
                  adjustType:'1',
                  remark:'',
                  adjustNum:'0.00',
                  str:'调整份额大于可用份额，请重新输入'
                },
                adjustTypeData:[
                  {value:'2',label:'调增'},
                  {value:'1',label:'调减'},
                ],
			}
		},
		props: {

		},
		methods: {
            commitVal:function(value){
                this.varyinfoData.adjustNum  = toDecimal2(value)
                this.viewadjustNum = convertCurrency(toDecimal2(value))
            },
		},
		created() {
            this.$store.commit('SET_STOCKNATURENAME', null);//初始值置空
		},
		mounted() {
			
		},
		watch: {

		},
        computed: {
           stockNatureNameFun: function() {
               let stockNatureName = this.$store.getters.stockNatureName;  //vuex组件通信
               return stockNatureName;
           },
        },
		components: {
			
		}
	}
</script>

<style scoped>

#gqfjyghModal .modal-body .tableDIV {
    height: 450px;
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
</style>