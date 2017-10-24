<template>
        <table class="table dataRecord-step1-update mui-insetfocus"  >
                <thead>
                    <tr>
                        <th colspan="4">解冻信息</th>
                    </tr>
                </thead>
                <tbody>
                    <br />
                    <tr class="num">
                        <td class='mui-required'>解冻份额</td>
                        <td>
                            <input  v-model.number="varyinfoData.frostNum" type='text' @change='commitVal(varyinfoData.frostNum)' maxlength="13"/>
                        </td>
                        <td>
                          <input v-model='viewFronstNUm' readonly/>
                        </td>
                        <td></td>
                    </tr>
                   <!--  <tr>
                        <td>解冻类型</td>
                        <td>
                            <el-select  v-model="forstType" placeholder="" @change='fileTypeFun'>
                              <el-option
                                v-for="item in forstTypeData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>
                        </td>
                        <td></td>
                        <td></td>
                    </tr> -->
                </tbody>
        </table>
</template>

<script>
    import blueicon from '@/assets/images/blue-icon.png'
    import gqfjygh from '@/assets/images/gqfjygh.png'
    import { toDecimal2 , convertCurrency} from '@/utils/validate';

    export default {
        name: 'share-freeze',
        data() {
            return {
                gqfjygh:gqfjygh,
                blueicon:blueicon,
                viewFronstNUm:'零',
                forstType:'01',
                title:'股权份额解冻',
                varyinfoData:{
                  frostNum:'0.00',
                  remark:'',
                  // fileType:'',
                  frostType:'',
                  str:'解冻份额大于已冻结份额，请重新输入'
                },
                forstTypeData:[
                    {value:'01',label:'司法冻结'},
                    {value:'12',label:'未成年持有冻结'},
                    {value:'09',label:'中外合资股份冻结'},
                    {value:'10',label:'备案材料不齐冻结'},
                    {value:'13',label:'信息未披露冻结'},
                    // {value:'06',label:'出资未到位'},
                    {value:'06',label:'红股冻结'},
                    // {value:'05',label:'质押冻结'},
                ],
            }
        },
        props: {

        },
        methods: {
          fileTypeFun(){
              this.varyinfoData.fileType = this.forstType;
              this.varyinfoData.frostType = this.forstType
          },
          commitVal:function(value){
              this.varyinfoData.frostNum  = toDecimal2(value)
              this.viewFronstNUm = convertCurrency(toDecimal2(value))
          },
        },
        created() {
          
        },
        mounted() {
            
        },
        watch: {

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