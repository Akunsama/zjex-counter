<template>
    <div>
        <div class="col-md-12 col-xs-12 col-lg-12 contentDIV">
            <div class="searchDIV mui-insetfocus">
                <div>
                    <p>
                        <input placeholder="请输入股东账户" v-model='consultData.account' maxlength="20"/>
                        <input placeholder="请输入产品代码" v-model='consultData.fundCode' maxlength="20"/>
                        <span style="width: 0px;"></span>
                        <span class='selectlabel'>业务类型</span>
                        <el-select v-model="consultData.businessCode" placeholder="" size="small" clearable>
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </p>
                    <p>
                        <span>发生时段</span>
                        <span class="time-group">
                            <input id="start_time" class='form-control'/>
                            <i><img :src="datejpg" /> </i>
                        </span>
                        <span class="time-group">
                            <input id="end_time" class='form-control'/>
                            <i><img :src="datejpg" /></i>
                        </span>
                        <button @click='queryNoCashStreamFun'>查询</button>
                    </p>
                </div>
            </div>
            <div class="tableDIV">
                <table class="table">
                    <thead>
                        <tr>
                            <th nowrap="nowrap">序号</th>
                            <th nowrap="nowrap">处理结果</th>
                            <th nowrap="nowrap">客户名称</th>
                            <th nowrap="nowrap">客户代码</th>
                            <th nowrap="nowrap">操作员</th>
                            <th>备注</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in list">
                            <!-- <td align='center'>{{index+1}}</td> -->
                            <td align='center'>{{item.rownum}}</td>
                            <td>{{item.returnMessage}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.custNo}}</td>
                            <td>{{item.openId}}</td>
                            <!-- <td>{{item.specification}}</td> -->
                            <td>
                               <div class='mui-operationTips' >
                                <font>{{item.specification}}</font>
                                    <div class="tipsPop" v-if='item.specification'>
                                      {{item.specification}}
                                    </div>
                                </div>
                            </td>
                            <td class="operationTD">
                                <div class="operation" @click='lookdetail(index)'>
                                    <font>查看</font>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="pagination">
                    <div class="pagetotal" v-show="false">显示：共<span style="font-size:16px;">0</span>个任务</div>
                    <div class="paginationcontent">
                            <div class="previousAllPage" @click="previousAllPage"></div>
                        <div class="previousPage" @click="previousPage"></div>
                        <span style="font-size:12px;vertical-align: top;">{{currentPage}} of {{total}}</span>
                        <div class="nextPage" @click="nextPage"></div>
                        <div class="nextAllPage" @click="nextAllPage"></div>
                    </div>
                </div>
            </div>
          <!--   <div class="block  clearfix">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[15,100, 200, 300, 400]"
                :page-size="15"
                layout="total, sizes, prev, pager, next"
                :total='total'>
              </el-pagination>
            </div> -->
        </div>
        <div class="popModal modal fade logModal" id="gqfjyghModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" v-if='total>0'>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">流水备注</h4>
                    </div>
                    <div class="modal-body">
                        <div class="tableDIV">
                            <p>查看详情</p>
                            <table class="table">
                                <tbody>
                                    <tr>
                                        <td>证件类型</td>
                                        <td>{{list[index].certTypeName}}</td>
                                    </tr>
                                    <tr>
                                        <td>证件号码</td>
                                        <td>{{list[index].certNo}}</td>
                                    </tr>
                                    <tr>
                                        <td>发生时间</td>
                                        <td>{{list[index].transDate}}{{list[index].transTime}}</td>
                                    </tr>
                                    <tr>
                                        <td>产品名称</td>
                                        <td>{{list[index].fundName}}</td>
                                    </tr>
                                    <tr>
                                        <td>产品代码</td>
                                        <td>{{list[index].fundCode}}</td>
                                    </tr>
                                     <tr>
                                        <td>业务类型</td>
                                        <td>{{list[index].businessCodeName}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-save" id="ca-complete" data-dismiss="modal">确认</button>
                        <button type="button" class="btn-close" data-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>

        
         <!-- 弹窗 -->
       <div class="popModal modal fade smallModal" id="queryPop" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <tips :codeview='codeview'></tips>
        </div>
    </div>
</template>
<script>
import datejpg from '@/assets/images/date.jpg'
import ApiService from '@/services/API-servies'
import tips from '@/components/tips/tips.vue'

export default {
    //组件名
    name: 'my-position',
    //实例的数据对象
    data() {
        return {
            datejpg: datejpg,
            myRequestSearch: '',
            options:[],
            codeview:"",
            // options: [
            //     {
            //         value: '1',
            //         label: '全部'
            //     },
            //     {
            //         value: '2',
            //         label: '权益性质变更'
            //     },
            //     {
            //         value: '3',
            //         label: '冻结'
            //     },
            //     {
            //         value: '4',
            //         label: '信息变更'
            //     },
            //     {
            //         value: '5',
            //         label: '非交易过户'
            //     },
            //     {
            //         value: '6',
            //         label: '解冻'
            //     },
            // ],
            consultData: {
                account: '',
                fundCode: '',
                businessCode: '',
                beginDate: '',
                endDate: '',

                pageSize: 15,
                pageNumber: 1,
            },
            index: 0,
            initList:[
                {
                    returnMessage: '-',
                    name: '-',
                    transDate: '-',
                    fundName: '-',
                    certTypeName: '-',
                    certNo: '-',
                    specification:'-',
                    fundCode:'-',
                    businessCodeName:'-',
                    custNo:'-',
                    
                    openId:'-',//无字段
                    rownum:'-'
                }
            ],
            list:[],
            total:0,
            currentPage:1,
        }
    },
    props: {

    },
    methods: {
        previousPage() {
            if(this.currentPage > 1) {
                this.currentPage -= 1;
                this.handleCurrentChange(this.currentPage)
            } else {
                return
            }
        },
        previousAllPage() {
            if(this.currentPage > 1) {
                this.currentPage = 1;
                this.handleCurrentChange(this.currentPage)
            } else {
                return
            }
        },
        nextPage() {
            if(this.currentPage < this.total) {
                this.currentPage += 1;
                this.handleCurrentChange(this.currentPage)
            } else {
                return
            }
        },
        nextAllPage() {
            if(this.currentPage != this.total) {
                this.currentPage = this.total;
                this.handleCurrentChange(this.currentPage)
            } else {
                return
            }
        },
        handleSizeChange(val) {
            this.consultData.pageSize = val;
            this.queryNoCashStreamFun()
         },
         handleCurrentChange(val) {
            console.log(val)
           this.consultData.pageNumber = val;
           this.queryNoCashStreamFun()
         },
        lookdetail(index) {
            $('#gqfjyghModal').modal('show');
            this.index = index
        },
        queryNoCashStreamFun() {
            // 验证必须填一项才可以查询
            if ($('#start_time').val()) {
                this.consultData.beginDate = $('#start_time').val().replace(/[^0-9]/ig,"");
            }
            if($('#end_time').val()){
                this.consultData.endDate = $('#end_time').val().replace(/[^0-9]/ig,"");
            };
            console.log(this.consultData)

            const data = this.consultData;
            if (!data.account&&!data.businessCode&&!data.fundCode&&!data.beginDate&&!data.endDate) {
                 $('#queryPop').modal('show')
                this.codeview = '查询条件不能为空，请重新输入';
            }else{
                ApiService.Registrationmanagement.queryNoCashStream(this.consultData).then(response => {
                    if (response.ret == 0) {
                        this.total = Math.ceil(response.data.total / 15);//总条数
                        if (this.total==0) {
                            this.list = this.initList;
                        }else{
                            this.list = response.data.items;
                            console.log(this.list)
                        };
                    };
                })
            };
        },
    },
    created() {
        // this.queryNoCashStreamFun()
        this.list = this.initList;
        //查询枚举
    	ApiService.business.custLogCode({}).then(res => {
			let {ret,message,data} = res;
			if(ret == 0) {
				//成功
				console.log(data)
				data.items.forEach((item,index)=>{
					this.options.push({
						value: item.subType,
						label: item.subTypeName
					})
				})
			}
		})
        
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
    components: {
        tips
    }
}
</script>

<style   rel="stylesheet/scss" lang="scss" scoped>
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

.pagination .paginationcontent{
    height:35px;
    line-height:35px;
    float: left;
}
.pagination .paginationcontent div{
    cursor: pointer;
    display: inline-block;
    width: 24px;
    height: 24px;
}
.pagination .paginationcontent span{
    font-size: 12px;
    vertical-align: super;
    display: inline-block;
    height: 24px;
}

.previousAllPage {
    background: url(./image/fenye1.png) no-repeat;
}

.previousPage {
    background: url(./image/fenye2.png) no-repeat;
}

.nextPage {
    background: url(./image/fenye3.png) no-repeat;
}

.nextAllPage {
    background: url(./image/fenye4.png) no-repeat;
}

.previousAllPage:hover {
    background: url(./image/fenye-on1.png) no-repeat;
}

.previousPage:hover {
    background: url(./image/fenye-on2.png) no-repeat;
}

.nextPage:hover {
    background: url(./image/fenye-on3.png) no-repeat;
}

.nextAllPage:hover {
    background: url(./image/fenye-on4.png) no-repeat;
}

//分页end
#gqfjyghModal .modal-dialog {
    height: 640px;
}

.modal-body {
    padding: 0;
    .table {
        margin-bottom: 150px;
    }
} // .mui-insetfocus .el-select{
// 	width: 155px;
// }
.mui-state {
    display: inline-block;
    font-weight: inherit;
    margin-right: 25;
    padding-left: 30px; //首行偏左20 
}

.searchDIV button {
    margin-left: 35px;
}

.searchDIV div p span.time-group {
    margin-left: 0px;
} // 表格样式
.tableDIV .table>thead>tr>th:first-child {
    padding: 16px 0px 16px 40px;
}

.tableDIV .table>tbody>tr>td:last-child {
    width: 80px;
    padding: 0px 40px 0px 35px;
}

tbody tr td:first-child {
    padding-left: 8px;
}
</style>