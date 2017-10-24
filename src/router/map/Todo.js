const todo = resolve => require(['@/views/business/todo/todo.vue'], resolve);
const todoIndex = resolve => require(['@/views/business/todo/step/todoIndex.vue'], resolve);
const equityRegisterAudit = resolve => require(['@/views/business/todo/step/equityRegisterAudit.vue'], resolve);
const audit = resolve => require(['@/views/business/todo/step/audit.vue'], resolve);
const infoChangeAudit = resolve => require(['@/views/business/todo/step/infoChangeAudit.vue'], resolve);

const auditLog = resolve => require(['@/views/business/account/myRequest/step/auditLog.vue'], resolve);

export default {
	path: '/todo',
	component: todo,
	name: "代办任务",
	children: [{
		path: '/todo/todoIndex',
		component: todoIndex,
		name: "代办任务列表首页"
	}, {
		path: '/todo/audit',
		component: audit,
		name: "审核"
	}, {
		path: '/todo/equityRegisterAudit',
		component: equityRegisterAudit,
		name: "股权登记审核"
	}, {
		path: '/todo/infoChangeAudit',
		component: infoChangeAudit,
		name: "信息变更审核"
	}, {
		path: '/todo/auditLog',
		component: auditLog,
		name: "提交审核页面"
	}, ]
}