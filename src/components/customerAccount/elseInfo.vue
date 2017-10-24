<template>
	        <tbody>
                <tr>
                    <td colspan="4">
                       <div class="pull-right">*&nbsp;以下信息为扩展信息，可选填</div>
                    </td>
                </tr>
                <tr>
                    <td>法定姓名</td>
                    <td>
                        <input v-model='elseData.corporation' >
                    </td>
                    <td>法人手机</td>
                    <td>
                        <input v-model='elseData.corporationMobile' >
                    </td>
                </tr>
                <tr>
                   <td>公司网址</td>
                   <td>
                       <input v-model='elseData.webSite' >
                   </td>
                    <td>法人邮箱</td>
                    <td>
                        <input v-model='elseData.corporationEmiall' >
                    </td>
                </tr>
                 <tr>
                    <td>注册资金</td>
                    <td>
                        <input v-model='elseData.registerCapital' >
                    </td>
                    <td>注册日期</td>
                    <td>
                        <span class="time-group">
                          <input id="start_time"  class='form-control'/>
                          <i><img :src="datejpg" /> </i>
                        </span>  
                        <!-- <input v-model='elseData.registerDate' > -->
                    </td>
                </tr>
                   <tr>
                    <td>净资产</td>
                    <td>
                        <input v-model='elseData.netAssets' >
                    </td>
                    <td>经营范围</td>
                    <td>
                        <input v-model='elseData.scopeOfBusiness' >
                    </td>
                </tr>
                 <tr class='mui-elseInfo'>
                    <td>注册地址</td>
                    <td class='mui-insetfocus'>
                          <el-select v-model="elseData.provinceId" clearable placeholder="请选择省份" @change='queryCitiesFun(elseData.provinceId)'>
                            <el-option
                              v-for="item in provinceIdAll"
                              :key="item.provinceId"
                              :label="item.provinceName"
                              :value="item.provinceId">
                            </el-option>
                          </el-select>
                    </td>
                     <td class='mui-insetfocus'>
                          <el-select v-model="elseData.cityId" clearable placeholder="请选择城市" >
                            <el-option
                              v-for="item in cityIdAll"
                              :key="item.cityId"
                              :label="item.cityName"
                              :value="item.cityId">
                            </el-option>
                          </el-select>
                    </td>
                    <td>
                        <input v-model='elseData.registerAddress' placeholder="请输入详细地址">
                    </td>
                </tr>
              
            </tbody>
</template>

<script>
    import ApiService from '@/services/API-servies'
    import datejpg from '@/assets/images/date.jpg';
	export default {
		name: 'else-info',
		data() {
			return {
        datejpg:datejpg,
				elseData:{
                    nationality:'CHN',
                    provinceId:'',
                    cityId:'',
                    // registerDate:'',//注册日期 yyyyMMdd
                    // registerAddress:'',
                    // registerCapital:'',
                    // webSite:"",
                    // scopeOfBusiness:"",
                    // corporation:'',
                    // corporationEmiall:"",
                    // corporationMobile:"",
                    // corporationTel:"",
                    // corporationAddress:"",
                    // corporationMobile:"",
                    // netAssets:''
                },
               provinceIdAll: [
                  ],
               cityIdAll: [
                 ],
			     }
		    },
        created() {
            this.queryProvinceFun()
        },
        mounted() {
          $('#start_time').datetimepicker({
            language: 'zh-CN',//显示中文
            format: 'yyyymmdd',//显示格式
            minView: "month",//设置只显示到月份
            initialDate: new Date(),//初始化当前日期
            autoclose: true,//选中自动关闭
            todayBtn: true//显示今日按钮
          });
        },
        methods: {
            queryCitiesFun(val){
                const data = {};
                data.provinceId = val;
                ApiService.business.queryCities(data).then(response => {
                    let {
                         data,
                         message,
                         ret
                     } = response;
                     if (ret==0) {
                        this.cityIdAll = data.items;
                     };
                })
            },
            queryProvinceFun(){
                ApiService.business.queryProvince({}).then(response => {
                    let {
                         data,
                         message,
                         ret
                     } = response;
                     if (ret==0) {
                        this.provinceIdAll = data.items;
                     };
                })
            },
        },
	}
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
    .mui-elseInfo{
        .mui-insetfocus:nth-child(3){
            padding-left:0;
        }
    }
      .el-select{
        width:225px;
        margin-right:0
    }
    .time-group{
      position: relative;
          margin-left: -20px;
      i{
        position: absolute;
        font-size: 15px;
        right: -5px;
        top: 5px;
      }
    }
</style>