<template>
		<table class="table dataRecord-step1-update mui-insetfocus"  >
                <thead>
                    <tr>
                        <th colspan="4">解押信息
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
					<br />
                    <tr class="num">
                        <td class='mui-required'>解押份额</td>
                        <td>
                             <input  v-model.number="varyinfoData.frostNum" type='text' @change='commitVal(varyinfoData.frostNum)' maxlength="13"/>
                        </td>
                        <td>
                        	<input v-model='viewFronstNUm' readonly/>
                        </td>
                        <td></td>
                    </tr>
                </tbody>
		</table>
</template>

<script>
	import { toDecimal2 , convertCurrency} from '@/utils/validate';
    import ApiService from '@/services/API-servies'

	export default {
		name: 'share-unpledge',
		data() {
			return {
				title:'股权份额解押',
                viewFronstNUm:'零',
				varyinfoData:{
                  frostNum:'0.00',
                  fileType:'',
                  remark:'',
                  frostType:'',
                  str:'解押份额大于质押份额，请重新输入'
                },
			}
		},
		props: {

		},
		methods: {
			 commitVal:function(value){
                  this.varyinfoData.frostNum  = toDecimal2(value)
                  this.viewFronstNUm = convertCurrency(toDecimal2(value))
                  // this.$store.commit('SET_VALMINNUM', this.varyinfoData.frostNum);
              },
		     queryEnumFun:function(msg){
                 var list = [];
                    ApiService.common.queryEnum(msg).then(response => {
                        var items = response.data.items;
                        items.forEach((item,index) => {
                            if (item.subTypeName=='质押冻结') {
                                this.varyinfoData.fileType = item.subType;
                                this.varyinfoData.frostType = item.subType;
                            }
                        })
                    })
              },
              forstTypeFun:function(){//冻结类型
                const data = {};
                data.source = 'PCC';
                data.type = '060011';
                this.queryEnumFun(data)
              },
        },
        created() {
            this.forstTypeFun()
        },
		mounted() {
		
		},
		watch: {

		},
        computed: {
        // pledgeStockFun: function() {
        //       let pledgeStock = this.$store.getters.pledgeStock;  //vuex组件通信
        //       return pledgeStock;
        //   },
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