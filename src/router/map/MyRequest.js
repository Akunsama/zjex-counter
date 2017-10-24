const myRequest = resolve => require(['@/views/business/account/myRequest/myRequest.vue'], resolve);
const requestIndex = resolve => require(['@/views/business/account/myRequest/step/requestIndex.vue'], resolve);
const registryForm = resolve => require(['@/views/business/account/myRequest/step/registryForm.vue'], resolve);
const auditLog = resolve => require(['@/views/business/account/myRequest/step/auditLog.vue'], resolve);

export default {
	path: '/myRequest',
	component: myRequest,
	name: "我的请求",
	children: [{
		path: '/myRequest/registryForm',
		component: registryForm,
		name: "企业基本情况登记表"
	}, {
		path: '/myRequest/auditLog',
		component: auditLog,
		name: "提交审核"
	}, ]
}