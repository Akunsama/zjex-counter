const equityRegister = resolve => require(['@/views/showpage/equityRegister/equityRegister.vue'], resolve)


export default {
  path: '/equity-register',
  component: equityRegister,
  name: '股权登记首页',
}