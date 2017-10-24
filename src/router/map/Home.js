const businessIndex = resolve => require(['@/views/business/index/businessIndex.vue'], resolve);
//账户中心
const myInfo = resolve => require(['@/views/business/account/myInfo/myInfo.vue'], resolve);
const myPosition = resolve => require(['@/views/business/account/myPosition/myPosition.vue'], resolve);
const myJournal = resolve => require(['@/views/business/account/myJournal/myJournal.vue'], resolve);
const journalProcess = resolve => require(['@/views/business/account/myJournal/journalProcess.vue'], resolve);
const mynews = resolve => require(['@/views/business/account/mynews/mynews.vue'], resolve);
import MyRequest from './MyRequest';

//登记管理
const companyMaintain = resolve => require(['@/views/business/registerManage/companyMaintain/companyMaintain.vue'], resolve);
const productMaintain = resolve => require(['@/views/business/registerManage/productMaintain/productMaintain.vue'], resolve);
const equityRegister = resolve => require(['@/views/business/registerManage/equityRegister/equityRegister.vue'], resolve);
const productRegister = resolve => require(['@/views/business/registerManage/productRegister/productRegister.vue'], resolve);
const productManage = resolve => require(['@/views/business/registerManage/productManage/productManage.vue'], resolve);
const productManageIndex = resolve => require(['@/views/business/registerManage/productManage/common/productManageIndex.vue'], resolve);
const queryShareholderList = resolve => require(['@/views/business/registerManage/productManage/common/queryShareholderList.vue'], resolve);
const infoMaintain = resolve => require(['@/views/business/registerManage/productManage/common/infoMaintain.vue'], resolve);
const queryShareholder = resolve => require(['@/views/business/registerManage/queryShareholder/queryShareholder.vue'], resolve);

//业务办理
// import BusinessDealt from './BusinessDealt';
const businessDealt = resolve => require(['@/views/business/businessDealt/businessDealt.vue'], resolve);
const handlePage = resolve => require(['@/views/business/businessDealt/handlePage.vue'], resolve);
const increaseShare = resolve => require(['@/views/business/businessDealt/increaseShare.vue'], resolve);//增资扩股 页面待确认
//代办任务
import Todo from './Todo';
//账户管理
const queryInvestor = resolve => require(['@/views/business/accountManage/queryInvestor/queryInvestor.vue'], resolve);
const singleCustomer = resolve => require(['@/views/business/accountManage/singleCustomer/singleCustomer.vue'], resolve);
const visitorQuery = resolve => require(['@/views/business/accountManage/visitorQuery/visitorQuery.vue'], resolve);
const visitorBind = resolve => require(['@/views/business/accountManage/visitorQuery/visitorBind.vue'], resolve);

const customerAccount = resolve => require(['@/views/business/accountManage/customerAccount/customerAccount.vue'], resolve);//客户开户
const customerGister = resolve => require(['@/views/business/accountManage/customerAccount/customerGister.vue'], resolve);//客户注册 

export default {
	path: "/business-index",
	component: businessIndex,
	//redirect:'/create-chain/step1',
	name: "控台首页",
	children: [
		//账户中心
		{
			path: '/myInfo',
			component: myInfo,
			name: "我的信息"
		},{
			path: '/myPosition',
			component: myPosition,
			name: "我的持仓"
		},{
			path: '/myJournal',
			component: myJournal,
			name: "我的流水"
		},{
			path: '/journalProcess',
			component: journalProcess,
			name: "我的流水页面"
		},
		MyRequest,//我的请求		
		{
			path: '/mynews',
			component: mynews,
			name: "我的消息"
		},
		//登记管理
		{
			path: '/companyMaintain',
			component: companyMaintain,
			name: "企业类型维护"
		},{
			path: '/productMaintain',
			component: productMaintain,
			name: "产品类型维护"
		},{
			path: '/equityRegister',
			component: equityRegister,
			name: "股权登记页面"
		},{
			path: '/productRegister',
			component: productRegister,
			name: "产品登记"
		},
		{
			path: '/productManage',
			component: productManage,
			name: "产品管理",
				children: [{
					path: '/productManage/productManageIndex',
					component: productManageIndex,
					name: "产品管理首页"
				},{
					path: '/productManage/queryShareholderList',
					component: queryShareholderList,
					name: "股东清册导出"
				},{
					path: '/productManage/equityRegister',
					component: equityRegister,
					name: "股权登记修改"
				},{
					path: '/productManage/infoMaintain',
					component: infoMaintain,
					name: "股东信息维护"
				}, ]
		},{
			path: '/queryShareholder',
			component: queryShareholder,
			name: "股东流水查询"
		},
		//业务办理
		// BusinessDealt,
		{
			path: '/businessDealt',
			component: businessDealt,
			name: "业务办理首页"
		},
		{
			path: '/businessDealt/handlePage',
			component: handlePage,
			name: "业务办理页"
		},
		{
			path: '/businessDealt/increaseShare',
			component: increaseShare,
			name: "增资扩股"
		},
		//代办任务
		Todo,
		//账户管理
		{
			path: '/queryInvestor',
			component: queryInvestor,
			name: "投资者查询"
		},{
			path: '/singleCustomer',
			component: singleCustomer,
			name: "单客户查询"
		},
		{
			path: '/visitorQuery',
			component: visitorQuery,
			name: "游客查询"
		},
		{
			path: '/visitorQuery/visitorBind',
			component: visitorBind,
			name: "游客开户"
		},
		{
			path: '/customerAccount',
			component: customerAccount,
			name: "客户开户"
		},
		{
			path: '/customerAccount/customerGister',
			component: customerGister,
			name: "客户注册"
		},
	]
}