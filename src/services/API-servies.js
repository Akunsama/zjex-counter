//
//  API-servies.js
//  <project>
//
//  Created by yann_liang on 2017-05-25.
//  Copyright 2017 yann_liang. All rights reserved.
//

import Http from 'axios'
import API from '@/config/API-config'

// Http.defaults.headers.post['Access-Control-Allow-Origin'] = "*";
// Http.interceptors.response.use(function (response) {
// 	// var response=JSON.parse(response)
// 	var response=response.data.msg
// 		console.log(JSON.parse(response),"999" )
// 		return response
// })
const encodeParams = (params) => {
	let r = '?',
		p = [];
	for (let key in params) {
		p.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
	}
	return r + p.join('&');
};

//请求类
class ApiService {
	constructor() {
		//账户管理api
		this.business = {
			openAccount: this.post.bind(this, API.BUSINESS.openAccount), // 5.5.6.AIF-C06 用户开户
			queryAccount: this.post.bind(this, API.BUSINESS.queryAccount), // 5.5.5.AIF-C05 账户认证
			queryTourist: this.post.bind(this, API.BUSINESS.queryTourist), // 5.2.12.WIF-B12 游客查询
			verifyMsg:this.post.bind(this, API.BUSINESS.verifyMsg), 
			bindAccount: this.post.bind(this, API.BUSINESS.bindAccount), // 5.2.11.WIF-B11 账户绑定
			queryCustAccount: this.post.bind(this, API.BUSINESS.queryCustAccount), // 5.5.8.AIF-C08根据登记账户查询账户信息
			queryProvince: this.post.bind(this, API.BUSINESS.queryProvince),
			queryCities: this.post.bind(this, API.BUSINESS.queryCities),
			extendInfo: this.post.bind(this, API.BUSINESS.extendInfo),
			queryCustInfo: this.post.bind(this, API.BUSINESS.queryCustInfo), //单客户基本信息查询
			queryInvestor: this.post.bind(this, API.BUSINESS.queryInvestor), // 5.2.13.WIF-B13 查询投资者账户信息
			queryCustStock: this.post.bind(this, API.BUSINESS.queryCustStock), //1.1.1.	AIF-C24分页查询客户持仓信息
			
			custLogCode: this.post.bind(this, API.BUSINESS.custLogCode), //5.5.34.AIF-C33流水业务类型查询接口
			queryCompanyFlag: this.post.bind(this, API.BUSINESS.queryCompanyFlag), //查询企业标识  9.29 
			modifyCompanyFlag: this.post.bind(this, API.BUSINESS.modifyCompanyFlag), //修改企业标识 9.29
			validTranPwd: this.post.bind(this, API.BUSINESS.validTranPwd), //开户校验交易密码 9.29
		}
		// 登记管理api
		this.Registrationmanagement = {
			defendProductType: this.post.bind(this, API.REGISTRARIONMANAGEMENT.defendProductType), //企业类型维护  1.1.1.	WIF-B14产品类型维护请求
			defendBusiness: this.post.bind(this, API.REGISTRARIONMANAGEMENT.defendBusiness), //企业类型维护 1.1.1.	WIF-B15产品类型下属业务维护请求（企业类型维护）
			registerFund: this.post.bind(this, API.REGISTRARIONMANAGEMENT.registerFund), //股权登记  1.1.1.	WIF-B07企业信息登记请求（股权登记，业务办理）
			queryFundType: this.post.bind(this, API.REGISTRARIONMANAGEMENT.queryFundType), //股权登记首页接口   1.1.1.	（+）WIF-B16查询产品类型请求（企业类型维护）
			queryNoCashStream: this.post.bind(this, API.REGISTRARIONMANAGEMENT.queryNoCashStream), //股东流水查询
			inStockholders: this.post.bind(this, API.REGISTRARIONMANAGEMENT.inStockholders), //股权登记 1.1.1.	WIF-C03导入持有人名册信息（股权登记）
			queryInStockholders: this.post.bind(this, API.REGISTRARIONMANAGEMENT.queryInStockholders), //股权登记    1.1.1.	WIF-C04持有人名册导入后查询信息（股权登记）
			processStockholders: this.post.bind(this, API.REGISTRARIONMANAGEMENT.processStockholders), //股权登记  1.1.1.	WIF-C02处理持有人名册导入信息（股权登记）
			queryProductInfo: this.post.bind(this, API.REGISTRARIONMANAGEMENT.queryProductInfo), //产品管理   1.1.1.	WIF-C01查询企业持有人名册信息（产品管理）
			queryEnum: this.post.bind(this, API.REGISTRARIONMANAGEMENT.queryEnum),//1.1.1.	AIF-C28查询枚举接口
			saveFund: this.post.bind(this, API.REGISTRARIONMANAGEMENT.saveFund),//保存数据
			getFund: this.post.bind(this, API.REGISTRARIONMANAGEMENT.getFund),//得到数据
			
			saveRiskFile: this.post.bind(this, API.REGISTRARIONMANAGEMENT.saveRiskFile),//WIF-B19风控资料存储请求（股权登记）
			
			
			hehe: this.post.bind(this, API.REGISTRARIONMANAGEMENT.hehe),//测试下载
			
			
			queryStockholders: this.post.bind(this, API.REGISTRARIONMANAGEMENT.queryStockholders), //产品管理   1.1.1.	WIF-C01查询企业持有人名册信息（产品管理）
			outStockholders: this.post.bind(this, API.REGISTRARIONMANAGEMENT.stockholders) //产品管理中的清册查询   1.1.1.	WIF-C05导出持有人名册信息（产品管理）

		}
		//业务办理
		this.BusinessDealt = {
			adjustStock: this.post.bind(this, API.BUSINESSDEALT.adjustStock),
			transferNature: this.post.bind(this, API.BUSINESSDEALT.transferNature),
			transferStock: this.post.bind(this, API.BUSINESSDEALT.transferStock),
			frostStock: this.post.bind(this, API.BUSINESSDEALT.frostStock),
			unfreezeStock: this.post.bind(this, API.BUSINESSDEALT.unfreezeStock),
			queryCustAccount: this.post.bind(this, API.BUSINESSDEALT.queryCustAccount),
			queryCustStock: this.post.bind(this, API.BUSINESSDEALT.queryCustStock),
			registerFund: this.post.bind(this, API.BUSINESSDEALT.registerFund),
			queryProductInfo: this.post.bind(this, API.BUSINESSDEALT.queryProductInfo),
			queryForstStream: this.post.bind(this, API.BUSINESSDEALT.queryForstStream),
		}

		//待办任务
		this.todo = {
			queryCS: this.post.bind(this, API.TODO.queryCS), // 5.5.20.AIF-C20查询客户表单业务流水信息
			accept: this.post.bind(this, API.TODO.accept), // 5.5.23.AIF-C23业务受理接口
			queryCSDetail: this.post.bind(this, API.TODO.queryCSDetail), // 5.5.21.AIF-C21查询客户表单业务流水具体信息
			queryCustInfo: this.post.bind(this, API.TODO.queryCustInfo), // 5.5.18.AIF-C18查询个人信息
			queryCSLog: this.post.bind(this, API.TODO.queryCSLog), // 5.5.22.AIF-C22查询客户表单业务流水审核日志
			transferStockFlow: this.post.bind(this, API.TODO.transferStockFlow), // 5.5.9.AIF-C09非交易过户流程提交请求
			
			complete: this.post.bind(this, API.TODO.complete), // 5.5.30.AIF-C30业务审核接口
		}
		this.files = {
			uploadFile: this.post.bind(this, API.FILE.uploadFile), // 5.5.27.AIF-C27 文件上传
		}
		this.common = {
			sendSMS: this.post.bind(this, API.COMMON.sendSMS), // 5.5.1.AIF-C01 发送短信信息（验证码）
			updateTransPwd: this.post.bind(this, API.COMMON.updateTransPwd), //  5.5.17.AIF-C17修改交易密码
			resetTransPwd: this.post.bind(this, API.COMMON.resetTransPwd), //  5.5.16.AIF-C16重置交易密码接口
			updateStatus: this.post.bind(this, API.COMMON.updateStatus), //  5.2.9.WIF-B09修改用户状态
			modifyCustMajor: this.post.bind(this, API.COMMON.modifyCustMajor), //  5.2.6.WIF-B06修改客户重要信息接口
			updateMobile: this.post.bind(this, API.COMMON.updateMobile), //  5.2.10.WIF-B10重置登陆手机号
			register: this.post.bind(this, API.COMMON.register), //  5.5.3.AIF-C03用户注册
			queryCust: this.post.bind(this, API.COMMON.queryCust), //  5.5.3.AIF-C03用户注册
			downloadFile:this.post.bind(this, API.COMMON.downloadFile),//文件下载
			queryEnum: this.post.bind(this, API.COMMON.queryEnum),//1.1.1.	AIF-C28查询枚举接口
			Company: this.post.bind(this, API.COMMON.Company),//打印企业信息凭证loginUser
			loginUser: this.post.bind(this, API.COMMON.loginUser),
			logout: this.post.bind(this, API.COMMON.logout),
			verifySMS : this.post.bind(this, API.COMMON.verifySMS ),

			openAccount: this.post.bind(this, API.COMMON.openAccount),//开户打印
			modifyCust: this.post.bind(this, API.COMMON.modifyCust),//打印信息修改凭证
			stock: this.post.bind(this, API.COMMON.stock),//打印信息修改凭证
			transferStock: this.post.bind(this, API.COMMON.transferStock),//非交易过户凭证
			frostStock: this.post.bind(this, API.COMMON.frostStock),//份额冻结凭证
			unfreezeStock: this.post.bind(this, API.COMMON.unfreezeStock),//份额解冻凭证
		}
		this.interceptorsOfReq();
		this.interceptorsOfRes();
	}

	get(url, params) {
		if (params) {
			url += encodeParams(params);
			//url += `&sessionid=${localStorage.sessionid}&userID=${localStorage.user? JSON.parse(localStorage.user).userID :''}`;
		}
		return Http.get(url).then(res => res.data);
	}

	post(url, params,type) {
		const file = params;
		if (type=='postfile') {
			var  init = {
				file,
				version: '1',
				tokenId: localStorage.tokenId ? localStorage.tokenId : '87362139871298',
				//type:'323'//params.warpType?params.warpType:'',
			};
			var  formdata = new FormData();
		     for(let k in init){  
		        formdata.append(k, init[k]);  
		      } 
  			return Http.post(url, formdata).then(res => {
  //			res.data.msg = JSON.parse(res.data.msg)
  				return JSON.parse(res.data.msg)
  				// console.log(res.data.msg)
  			});
		}else{
			params.seq=Math.random()*100000000000000000000;
			params.timestamp=new Date();
			if (params.fileIds) {
				params.fileIds = JSON.stringify(params.fileIds)
				params.filePaths = JSON.stringify(params.filePaths)
			};
			let data = {
				msg: params ? JSON.stringify(params): null,
				signature: 'G4+4xwudgg8JSzqQu3h4lLZ7JE+hDn3U6TjdPYh9gbxlC8TVrXmeryJMpRhnJcjXddX/Rk8RHtkVtvPaUwutYcA=',
				tokenId: localStorage.tokenId ? localStorage.tokenId : '87362139871298',
				//type:'323'//params.warpType?params.warpType:'',
			};
			return Http.post(url, data).then(res => {
				let str = res.headers['content-disposition'];
				if (str) {
					var index = str.lastIndexOf('=');
					var finalValue = str.substring(index+1).replace(/\"/g, "");
					var type = finalValue.substring(finalValue.lastIndexOf(".")+1);//取出文件类型
				};
				
				var urlInit = res.config.url;
				var url = urlInit.split(/\//)[4]; //处理url 匹配从前往后第四个值


				if ((url== 'downloadFile')||(url== 'print')) {
					var file = new File([res.data], finalValue, {type: ''});//接收文件后缀类型
					//只配有fileName参数的接口 其他自己再页面调用功能 接口太多功能不做配置
					if (JSON.parse(data.msg).fileName) {
							var link = document.createElement('a');
							link.href = window.URL.createObjectURL(file);
							link.download = JSON.parse(data.msg).fileName;
							link.click();
						}
					return file;
				}else{
					return JSON.parse(res.data.msg)
				};
			});
		};
	}
 
	interceptorsOfReq() {
		return Http.interceptors.request.use(
			config => {
				// // 对于接口进行定制请求配置
				var urlInit = config.url;
				var url = urlInit.split(/\//)[4];
				if((url== 'downloadFile')||(url== 'print')){
					config.responseType = 'blob'; 
				}
				return config;
			},
			err => {
				return Promise.reject(err);
			});
	}

	interceptorsOfRes() {
		return Http.interceptors.response.use(
			config => {
				return config;
			},
			err => {
				return Promise.reject(err);
			});
//		Http.interceptors.response.use(function (response) {
//			console.log(response)
//			console.log(response.config.url + '的响应数据↓↓↓\n', response.data);
//			if (response.data.ret == 19999) {
//				//清除登录信息
//				localStorage.removeItem('tokenId');
//				localStorage.removeItem('loginName');
//				//提示用户
//				alert('登录超时，请重新登录');
//				//关闭窗口
//				window.open("", "_self").close();
//				//vueVm.loginPopFlag = true;
//			}
//			return response.msg
//		}, function (error) {
//			console.warn("请求失败");
//			return Promise.reject(error);
//		});
	}

}

//导出一个对象
export default new ApiService();