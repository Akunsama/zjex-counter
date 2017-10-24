//请求地址
//const BASE = process.env.API_ROOT, 
const BASE = 'http://192.168.10.72:8081', 
//const BASE = 'http://192.168.20.96:8081', 
//const BASE = 'http://192.168.20.105:8081', 

	//账户管理
	BUSINESS = {
		openAccount: `${BASE}/user/openAccount`, // 5.5.6.AIF-C06 用户开户
		queryAccount: `${BASE}/user/queryAccount`, // 5.5.5.AIF-C05 账户认证
		queryTourist: `${BASE}/user/queryTourist`, // 5.2.12.WIF-B12 游客查询
		bindAccount: `${BASE}/user/bindAccount`, // 5.2.11.WIF-B11 账户绑定
		verifyMsg: `${BASE}/verifyMsg`, //  账户注册
		queryCustInfo: `${BASE}/user/queryCustInfo`, //但客户查询的基本信息    1.1.1.	AIF-C18查询个人信息
		queryCustAccount: `${BASE}/user/queryCustAccount`, //但客户查询账户信息查询，  1.1.1.	AIF-C08根据登记账户查询账户信息
		queryProvince: `${BASE}/business/queryProvinces`,//省份查询
		queryCities: `${BASE}/business/queryCities`,//城市查询
		extendInfo: `${BASE}/user/extendInfo`,//扩展请求
		queryInvestor: `${BASE}/user/queryInvestor`, // 5.2.13.WIF-B13 查询投资者账户信息
		queryCustStock: `${BASE}/user/queryCustStock`,//1.1.1.	AIF-C24分页查询客户持仓信息
		
		custLogCode: `${BASE}/business/custLogCode`,//5.5.34.AIF-C33流水业务类型查询接口
		queryCompanyFlag: `${BASE}/business/queryCompanyFlag`,//查询企业标识  9.29 
		modifyCompanyFlag: `${BASE}/business/modifyCompanyFlag`,//修改企业标识 9.29
	},
	//登记管理
	REGISTRARIONMANAGEMENT = {
		defendProductType: `${BASE}/business/defendProductType`, //企业类型维护
		defendBusiness: `${BASE}/business/defendBusiness`, //企业类型维护
		
		registerFund: `${BASE}/business/registerFund`, //股权登记
		queryFundType: `${BASE}/business/queryFundType`,//股权登记首页接口   1.1.1.	（+）WIF-B16查询产品类型请求（企业类型维护）
		inStockholders: `${BASE}/business/inStockholders`, //股权登记  1.1.1.	WIF-C03导入持有人名册信息（股权登记）
		queryInStockholders: `${BASE}/business/queryInStockholders`, //股权登记    1.1.1.	WIF-C04持有人名册导入后查询信息（股权登记）
		processStockholders: `${BASE}/business/processStockholders`, //1.1.1.	WIF-C02处理持有人名册导入信息（股权登记）
		queryProductInfo: `${BASE}/business/queryProductInfo`, //产品管理首页  WIF-B18查询产品信息请求（产品管理）
		
		queryStockholders: `${BASE}/business/queryStockholders`, //产品管理  1.1.1.	WIF-C01查询企业持有人名册信息（产品管理）
		stockholders: `${BASE}/business/print/stockholders`,//产品管理中的清册查询   1.1.1.	WIF-C05导出持有人名册信息（产品管理）
		
		saveFund: `${BASE}/business/saveFund`,//点击保存按钮调用接口
		getFund: `${BASE}/business/getFund`,//点击保存按钮调用接口
		
		saveRiskFile: `${BASE}/business/saveRiskFile`,//1.1.1.	）WIF-B19风控资料存储请求（股权登记）
		
		hehe: `${BASE}/business/hehe`,//下载测试

		queryEnum: `${BASE}/business/queryEnum`, //   1.1.1.	AIF-C28查询枚举接口		
		
		queryNoCashStream: `${BASE}/user/queryNoCashStream`, //股东流水查询

	},
	//业务办理
	BUSINESSDEALT = {
		adjustStock: `${BASE}/business/adjustStock`,
		transferNature: `${BASE}/business/transferNature`,
		transferStock: `${BASE}/business/transferStock`,
		frostStock: `${BASE}/business/frostStock`,
		unfreezeStock: `${BASE}/business/unfreezeStock`,
		queryCustAccount: `${BASE}/user/queryCustAccount`,
		queryCustStock: `${BASE}/user/queryCustStock`,
		registerFund: `${BASE}/business/registerFund`,
		queryProductInfo: `${BASE}/business/queryProductInfo`,
		queryForstStream: `${BASE}/business/queryForstStream`,
	},
	//待办
	TODO = {
		queryCS: `${BASE}/user/queryCS`, // 5.5.20.AIF-C20查询客户表单业务流水信息
		accept: `${BASE}/user/accept`, // 5.5.23.AIF-C23业务受理接口
		queryCSDetail: `${BASE}/user/queryCSDetail`, // 5.5.21.AIF-C21查询客户表单业务流水具体信息
		queryCustInfo: `${BASE}/user/queryCustInfo`, // 5.5.18.AIF-C18查询个人信息
		queryCSLog: `${BASE}/user/queryCSLog`, // 5.5.22.AIF-C22查询客户表单业务流水审核日志
		transferStockFlow: `${BASE}/business/transferStockFlow`, // 5.5.9.AIF-C09非交易过户流程提交请求

		complete: `${BASE}/user/complete`, // 5.5.30.AIF-C30业务审核接口
	},
	//文件
	FILE = {
		uploadFile: `${BASE}/business/uploadFile`, // 5.5.27.AIF-C27 文件上传  同时也是股权登记的文件上传
	},

	//公共接口
	COMMON = {
		register: `${BASE}/register`, //  5.5.3.AIF-C03用户注册
		sendSMS: `${BASE}/sendSMS`, //  5.5.1.AIF-C01 发送短信信息（验证码）
		updateTransPwd: `${BASE}/user/updateTransPwd`, //  5.5.17.AIF-C17修改交易密码
		resetTransPwd: `${BASE}/user/resetTransPwd`, //  5.5.16.AIF-C16重置交易密码接口
		updateStatus: `${BASE}/user/updateStatus`, //  5.2.9.WIF-B09修改用户状态
		modifyCustMajor: `${BASE}/user/modifyCustMajor`, //  5.2.6.WIF-B06修改客户重要信息接口
		updateMobile: `${BASE}/user/updateMobile`, //  5.2.10.WIF-B10重置登陆手机号
		queryCust: `${BASE}/user/queryCust`, //  userId查询用户的客户内码、游客id
		downloadFile: `${BASE}/business/downloadFile`,
		queryEnum: `${BASE}/business/queryEnum`, //   1.1.1.	AIF-C28查询枚举接口	
		company: `${BASE}/business/print/company`, // 	打印企业信息凭证
		loginUser: `${BASE}/loginUser`, // 
		logout: `${BASE}/logout`, // 
		verifySMS : `${BASE}/verifySMS `, //

		openAccount: `${BASE}/business/print/openAccount`, //打印
		modifyCust: `${BASE}/business/print/modifyCust`, //打印
		stock: `${BASE}/business/print/stock`, //打印持仓
		transferStock: `${BASE}/business/print/transferStock`, //打印
		frostStock: `${BASE}/business/print/frostStock`, //打印
		unfreezeStock: `${BASE}/business/print/unfreezeStock`, //打印
	}
//登录
export default {
	BUSINESS: BUSINESS,
	REGISTRARIONMANAGEMENT: REGISTRARIONMANAGEMENT,
	BUSINESSDEALT:BUSINESSDEALT,
	FILE: FILE,
	TODO: TODO,
	COMMON: COMMON,
}