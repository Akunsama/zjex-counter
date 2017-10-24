<template>
	<div>
		<div class="col-md-12 col-xs-12 col-lg-12 contentDIV">
					<div class="searchDIV mui-insetfocus">
						<div>
							<p>
								<input placeholder="请输入产品名称"/>
								<input placeholder="输入产品代码"/>										
								<label class="myRequestSearch">
									<span class='selectlabel'>业务类型</span>
									<el-select  v-model="requestSearch" placeholder="" size="small">
										  <el-option
										    v-for="item in options"
										    :key="item.value"
										    :label="item.label"
										    :value="item.value">
										  </el-option>
									</el-select>	

								<!-- 	
									<span>审核状态</span>
								    <select class="cs-select cs-skin-underline">
									    <option value="" disabled selected>所有</option>
									    <option value="1">待定</option>
									    <option value="2">完成</option>
									    <option value="3">审核中</option>
									</select> -->
								</label>								
							</p>
							<p>
								<span>提交时间</span>
								<span class="time-group">
									<input id="start_time"/>
	                				<i><img :src="datejpg" /> </i>
								</span>    
								<span class="time-group">
									<input id="end_time"/>
	                				<i><img :src="datejpg" /></i>
								</span>		
								<button>查询</button>
							</p>
						</div>
					</div>
			
			
			
			
			
			<div class="tableDIV">
						<table class="table">
						  <thead>
						    <tr>
						    	<th class="text-center">序号</th>
						      <th>业务类型</th>
						      <th>提交时间</th>
						      <th>审核状态</th>						      
						      <th class="text-center">查看详单</th>
						      <th class="text-center">审核日志</th>
						      <th class="text-center">操作</th>
						    </tr>
						  </thead>
						  <tbody>
						    <tr v-for="(item,index) in list">
						    	<td class="text-center">{{index+1}}</td>
						      <td>{{item.type}}</td>
						      <td>{{item.time}}</td>
						      <td>{{item.status}}</td>						      
						      <td class="text-center"><button class="btn-sm2" @click="search">查看</button></td>
						      <td class="text-center"><button class="btn-sm2" @click="audit">查看</button></td>
						      <td class="text-center"><button class="btn-sm2 recall">撤回</button></td>
						    </tr>
						  </tbody>
						</table>
					</div>	

        </div>
    </div>
</template>
<script>
	import datejpg from '@/assets/images/date.jpg'

    export default {
        //组件名
        name: 'my-position',
        //实例的数据对象
        data() {
            return {
            	datejpg:datejpg,
				requestSearch:'',
				examineoptions: [
					{value: '所有'}, 
					{value: '待定'},
					{value: '完成'},
					{value: '审核中'},
					],
				examine:'',
				options: [
					{value: '非交易过户'}, 
					{value: '权益性质变更'},
					{value: '股权冻结'},
					{value: '股权解冻'},
					{value: '全部'},
					],
				shareholderShow:false,
				list:[{
					type:'非交易过户',
					time:'2016/6/1 12:23:56',
					status:'未审核',
				},{
					type:'非交易过户',
					time:'2016/6/1 12:23:56',
					status:'未审核',
				},{
					type:'非交易过户',
					time:'2016/6/1 12:23:56',
					status:'未审核',
				},]
            }
        },
        //数组或对象，用于接收来自父组件的数据
        props: {

        },
        //方法
        methods: {
			search(){
				this.$router.push('/myRequest/registryForm')
			},
			audit(){
				this.$router.push('/myRequest/auditLog')
			}
        },
        created() {


        },
        mounted() {
	      	$('#start_time,#end_time').datetimepicker({
	    	  language: 'zh-CN',//显示中文
	    	  format: 'yyyy/mm/dd',//显示格式
	    	  minView: "month",//设置只显示到月份
	    	  initialDate: new Date(),//初始化当前日期
	    	  autoclose: true,//选中自动关闭
	    	  todayBtn: true//显示今日按钮
	    	});
        },
        watch: {

        },
        //组件
        components: {
        }
    }
</script>

<style>
</style>