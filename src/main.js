//js
import Vue from 'vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import * as filters from './filters'; // 全局vue filter
import IconSvg from '@/components/Icon-svg/index.vue';// svg 组件
//import 'assets/iconfont/iconfont'; // iconfont 具体图标见目录图片
import vueWaves from './directive/waves';// 水波纹指令
import Multiselect from 'vue-multiselect';// 使用的一个多选框组件，element-ui的select不能满足所有需求
//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/js/bootstrap'
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
import 'normalize.css/normalize.css';// normalize.css 样式格式化

//styles
//import "./styles/index.scss"
//css
// import '../static/css/reset.css'
// import '../static/css/element-ui.css'
//import '../static/css/iconfont.css'



import '../static/iconfont/font-awesome.min.css'
import '../static/css/bootstrap.min.css'
// import '../static/iconfont/elegant-icons.css' //缺少svg文件
import '../static/css/bootstrap-datetimepicker.min.css'

import '../static/css/owl.carousel.css'
import '../static/css/owl.theme.css'//缺少 AjaxLoader gif
import '../static/css/owl.transitions.css'
import '../static/css/animate.css'

import '../static/css/jquery.mCustomScrollbar.css'




import '../static/js/jquery.min.js'

var $ = require('jquery');
require("jquery-mousewheel")($);
require('malihu-custom-scrollbar-plugin')($);

require('bootstrap')
// menu 滚动
// import '../static/js/jquery.mCustomScrollbar.min.js'
import '../static/js/jquery.mCustomScrollbar.concat.min.js'


// 时间插件
import '../static/js/jquery-1.11.0.min.js'
import '../static/js/bootstrap-datetimepicker.min.js'
import '../static/js/bootstrap-datetimepicker.zh-CN.js'

import '../static/js/wv.js'
import '../static/js/owl.carousel.min.js'
import '../static/js/scroll.js'
import '../static/js/wow.min.js'
import '../static/js/index.js'

//加密js
import '../static/js/des.js'

//ukey
var key = require("key-manager");
console.log('key:',key)
var path = require("path");
console.log('path:',path)
var os = require('os');
console.log('os:',os)
const DEFAULT_PATH = path.join(os.homedir(), 'keystores');
console.log('DEFAULT_PATH:',DEFAULT_PATH)
//
//key.ukeyEnumDevice(function(err,obj){
//  console.log("设备名",obj.pbNameList[0])
//  key.ukeyOpenDevice(obj.pbNameList[0],function(err,obj){
//  	console.log('获得的句柄',err,obj.phDev);
//  	
//  	key.ukeyIsDefaultPin(obj.phDev,1,function(err,obj){
//  		console.log('判断初始pin',err,obj)
//  	})    
//  	
//  	key.ukeyFormatDevice(obj.phDev,'jz1234',function(err,obj){
//  		console.log('初始设备',err,obj)
//  	})
//  	
//  	
//  	key.ukeyVerifyPin(obj.phDev,1,'jz8888',function(err,obj){
//  		console.log('验证用户口令',err,obj)
//  	})
//  	
//  	key.ukeyECCGenKey(obj.phDev,function(err,obj){
//  		console.log('ukey中的密钥对',err,obj);
//  	})
//  	
//  	key.ukeyECCGetPubKey(obj.phDev,function(err,obj){
//  		console.log('ukey导出公钥',err,obj);
//  	})  
////  	key.ukeyImportRSACert(obj.phDev,DEFAULT_PATH)
//  	key.ukeyECCAddress(obj.phDev,function(err,obj){
//  		console.log("是不是地址",err,obj)
//  	})
//
//	})
//});


// register globally
Vue.component('multiselect', Multiselect);
Vue.component('icon-svg', IconSvg)
Vue.use(ElementUI);
Vue.use(vueWaves);

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

router.beforeEach((to, from, next) => {
	document.body.scrollTop = 0;
        next()
   
});

//Vue.config.silent = true;
Vue.config.productionTip = false;

new Vue({
  el: '#app',
   data() {
        return {
            loginPopFlag: false,
            redirectPath: '',
        }
    },
  router,
store,
  template: '<App/>',
  components: { App }
})



