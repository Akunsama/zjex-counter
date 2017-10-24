<template>
  <table class="table data-table-no-border">
            <thead>
                <tr>
                    <th>{{Type=='application'?"申请表":"影印件上传"}}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for='item in itemList' v-if='item.type==Type||!item.type'>
                    <td >{{item.val}}</td>
                    <td>
                          <span class='mui-operationTips'><em><i> {{item.beginName}} </i><i> {{item.endName}} </i></em>
                            <div class="tipsPop" v-if='item.uploadName'>
                               {{item.uploadName}}
                            </div>
                          </span>
                          <button class="btn-sm2 upload-pop"@click="upload(item)">上传</button>
                      </div>
                      <!-- 原版 -->
                        <!-- <span>{{item.val}}.doc</span>
                        <button class="btn-sm2 upload-pop" @click="upload(item.fileName)">上传</button> -->
                    </td>
                </tr>
            </tbody>
    </table>
</template>

<script>
  import ApiService from '@/services/API-servies';
  import Cookies from 'js-cookie';
  import { switchType } from '@/utils/validate';

  export default {
    name: 'uploadlist',
    data() {
      return {
        a:''
      }
    },
    props:  ['itemList','Type'],
    filters: {  
       
    },  
    methods: {
       upload(item) {
          $('#uploadModal').modal('show');
          this.$emit('upload',item);
      },
    },
    computed: {
      // businessTypeFun: function() {
      //  // let businessType = this.$store.getters.businessType;
   //      let businessType = Cookies.get('businessType');//防止刷新
      //  return businessType;
      // },
    },
    created() {
           
    },
    mounted() {

    },
    watch: {
      
    },
    components: {
      
    }
  }
</script>

<style scoped>


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