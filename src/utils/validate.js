/**
 * Created by hanpanpan on 17/08/14.
 */

// 匹配身份证1 营业执照2 信用代码3 
export function isTypeID(str, code) {
  const reg1 = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
  const reg2 = /^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$/;
  const reg3 = /[A-Z0-9]{18}/g;
  switch (code) {
    case 1:
      return reg1.test(str);
      break;
    case 2:
      return reg2.test(str);
      break;
    case 3:
      return reg3.test(str);
      break;
  }
}


// 匹配国内电话
export function isTelephone(str) {
  const reg = /\d{3}-\d{8}|\d{4}-\{7,8}/;
  return reg.test(str);
}

// 手机号
export function isPhone(str) {
  const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
  return reg.test(str);
}

// 字母和数字  用户名
export function isLoginName(str) {
  const reg = /^[a-zA-Z0-9]{1,}$/;
  return reg.test(str);
}

//  6 位数字 U盾密码 
export function isPassword(str) {
  const reg = /^\d{6}$/;
  return reg.test(str);
}


/* 是否是公司邮箱*/
export function isWscnEmail(str) {
  const reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@wallstreetcn\.com$/i;
  return reg.test(str.trim());
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

// 两位小数正数
export function validatPositive(str) {
  const reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
  return reg.test(str);
}

// 验证截取小数 补0 
export function toDecimal2(x) {
  var f_x = parseFloat(x);　　
  if (isNaN(f_x))　　 {　　　　
    return 0;　　
  }　　
  var f_x = Math.round(x * 100) / 100;　　
  var s_x = f_x.toString();　　
  var pos_decimal = s_x.indexOf('.');　　
  if (pos_decimal < 0)　　 {　　　　
    pos_decimal = s_x.length;　　
    s_x += '.';　　
  }　　
  while (s_x.length <= pos_decimal + 2)　　 {　　　　
    s_x += '0';　　
  }　　
  return s_x;
}

//验证小于20位字符
export function TwentyFun(str) {
   const reg = /^.{0,20}$/;
   return reg.test(str);
}

/******************* 上面是验证部分  以下部分写方法 ************************/

//联动数字 
export function convertCurrency(num){
  if (!/^\d*(\.\d*)?$/.test(num)) { console.log("Number is wrong!"); return "Number is wrong!"; } 
  var AA = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); 
  var BB = new Array("", "拾", "佰", "仟", "萬", "億", "点", ""); 
  var a = ("" + num).replace(/(^0*)/g, "").split("."), k = 0, re = ""; 
  for (var i = a[0].length - 1; i >= 0; i--) { 
  switch (k) { 
  case 0: re = BB[7] + re; break; 
  case 4: if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0])) 
  re = BB[4] + re; break; 
  case 8: re = BB[5] + re; BB[7] = BB[5]; k = 0; break; 
  } 
  if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re; 
  if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re; k++; 
  } 

  if (a.length > 1) //加上小数部分(如果有小数部分) 
  { 
    if (re=="") {
      re='零'
    };
  re += BB[6]; 
  for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)]; 
  } 
  return re; 
}

// 文件上传  type 数据动态添加
export function switchType(value) {
  switch (value) {
    case "非交易过户":
      return [{
          fileName: 'verdict',
          val: '判决书(三选一)',
          type: '财产继承过户',
          cueInfo: '提示：人民法院出具的相关判决书'
        }, {
          fileName: 'mediation',
          val: '调解书(三选一)',
          type: '财产继承过户',
          cueInfo: '提示：人民调解委员会、仲裁委员会出具调解书'
        }, {
          fileName: 'prove',
          val: '相关的证明或协议(三选一)',
          type: '财产继承过户',
          cueInfo: '提示：经公证的遗产继承协议'
        }, //财产继承
        {
          fileName: 'verdict',
          val: '判决书',
          type: '司法裁决过户',
          cueInfo: '人民法院、人民调解委员会、仲裁委员会出具的相关判决书、调解书'
        }, {
          fileName: 'mediation',
          val: '调解书（必传）',
          type: '司法裁决过户',
          cueInfo: '提示：人民调解委员会、仲裁委员会出具调解书',
          mustFile: 1
        }, //司法裁决
        {
          fileName: 'prove',
          val: '相关的证明或协议（必传）',
          type: '协议转让过户',
          cueInfo: '',
          mustFile: 1
        }, //协议转让 
        {
          fileName: 'prove',
          val: '相关的证明或协议（必传）',
          type: '赠与过户',
          cueInfo: '',
          mustFile: 1
        }, //赠与
        {
          fileName: 'divorceCert',
          val: '离婚证书',
          type: '离婚财产协议分割',
          cueInfo: ''
        }, {
          fileName: 'marriageSettle',
          val: '财产分割协议（必传）',
          type: '离婚财产协议分割',
          cueInfo: '提示：受让方如单方提出变更申请，应提供相关公证书或人民法院、人民调解委员会、仲裁委员会出具的相关判决书或调解书',
          mustFile: 1
        }, //离婚财产协议 
        {
          fileName: 'counterProve',
          val: '中心证明或协议',
          cueInfo: ''
        }, //公共部分
      ];
      break;
    case "份额性质变更":
      return [{
        fileName: 'changeLetter',
        val: '变更函（必传）',
        cueInfo: '',
        mustFile: 1
      }, {
        fileName: 'releaseLetter',
        val: '解禁函（必传）',
        cueInfo: '',
        mustFile: 1
      }, {
        fileName: 'counterProve',
        val: '中心证明或协议',
        cueInfo: ''
      }];
      break;
    case "份额调整":
      return [{
        fileName: 'changeLetter',
        val: '变更函（必传）',
        cueInfo: '',
        mustFile: 1
      }, {
        fileName: 'counterProve',
        val: '中心证明或协议',
        cueInfo: ''
      }];
      break;
    case "份额冻结":
      return [{
          fileName: 'verdict',
          val: '判决书（必传）',
          type: '司法冻结',
          cueInfo: '提示：人民法院出具的相关判决书',
          mustFile: 1
        }, //司法冻结
        // {fileName:'pledgeContract',val:'质押、借款合同（必传）',type:'05',cueInfo:''},{fileName:'registerNotice',val:'工商部门出具的《股权出质设立登记通知书》（必传）',type:'05',cueInfo:''},{fileName:'freezeSignle',val:'股交中心出具的《股权质押冻结单》',type:'05',cueInfo:''},
        {
          fileName: 'counterProve',
          val: '中心证明或协议'
        }
      ]; //公共部分
      break;
    case "份额解冻":
      return [{
          fileName: 'verdict',
          val: '判决书（必传）',
          type: '司法冻结',
          cueInfo: '提示：人民法院出具的相关判决书',
          mustFile: 1
        }, //司法冻结
        // {fileName:'pledgeContract',val:'质押、借款合同（必传）',type:'05',cueInfo:''},{fileName:'registerNotice',val:'工商部门出具的《股权出质设立登记通知书》（必传）',type:'05',cueInfo:''},{fileName:'freezeSignle',val:'股交中心出具的《股权质押冻结单》',type:'05',cueInfo:''},
        {
          fileName: 'counterProve',
          val: '中心证明或协议',
          cueInfo: ''
        }
      ]; //公共部分
      break;
    case "份额解押":
      return [
      // {
      //   fileName: 'pledgeContract',
      //   val: '质押、借款合同（必传）',
      //   cueInfo: '提示：人民法院出具的相关判决书',
      //   mustFile: 1
      // }, 
      // {
      //   fileName: 'registerNotice',
      //   val: '工商部门出具的《股权出质设立登记通知书》（必传）',
      //   cueInfo: '',
      //   mustFile: 1
      // },
       {
        fileName: 'freezeSignle',
        val: '股交中心出具的《股权质押冻结单》（必传）',
        cueInfo: '',
        mustFile: 1
      },
       {
        fileName: 'counterProve',
        val: '中心证明或协议',
        cueInfo: ''
      }];
      break;
    case "份额质押":
      return [{
        fileName: 'pledgeContract',
        val: '质押、借款合同（必传）',
        cueInfo: '',
        mustFile: 1
      }, {
        fileName: 'registerNotice',
        val: '工商部门出具的《股权出质设立登记通知书》（必传）',
        cueInfo: '',
        mustFile: 1
      }, {
        fileName: 'freezeSignle',
        val: '股交中心出具的《股权质押冻结单》',
        cueInfo: ''
      }, {
        fileName: 'counterProve',
        val: '中心证明或协议'
      }];
      break;
    case "增资扩股":
      return [{
          fileName: 'register',
          val: '定向增资登记申请书（必传）',
          type: 'init',
          cueInfo: '',
          mustFile: 1
        },
        {
          fileName: 'decision',
          val: '股东会决议（必传）',
          type: 'init',
          cueInfo: '',
          mustFile: 1
        },
        {
          fileName: 'attorney',
          val: '股权登记法人授权委托书（必传）',
          type: 'init',
          cueInfo: '',
          mustFile: 1
        },
        {
          fileName: 'appraisalReport',
          val: '评估报告',
          type: 'init',
          cueInfo: ''
        },
        {
          fileName: 'underAgree',
          val: '认购协议',
          type: 'init',
          cueInfo: ''
        },
        {
          fileName: 'busRegisterForm',
          val: '工商登记表（必传）',
          type: 'init',
          cueInfo: '',
          mustFile: 1
        },
        {
          fileName: 'revise',
          val: '企业章程修订案（必传）',
          type: 'init',
          cueInfo: '',
          mustFile: 1
        },
        {
          fileName: 'businessLicense',
          val: '营业执照（必传）',
          type: 'init',
          cueInfo: '',
          mustFile: 1
        },
        // {fileName:'shareholder',val:'股东身份证明（必传）',type:'init',cueInfo:''},
        // {fileName:'naturalRegistry',val:'自然人股东股权登记名册（必传）',type:'init',cueInfo:''},
        {
          fileName: 'permissionStock',
          val: '股权限售情况说明（必传）',
          type: 'init',
          cueInfo: '',
          mustFile: 1
        },

        {
          fileName: 'counterProve',
          val: '中心证明或协议',
          type: 'init',
          cueInfo: ''
        },

        {
          fileName: 'naturalRegistry',
          val: '自然人股东股权登记名册（必传)',
          type: 'init',
          cueInfo: '',
          mustFile: 1
        },
        {
          fileName: 'shareholder',
          val: '股东身份证明（必传)',
          type: 'init',
          cueInfo: '',
          mustFile: 1
        },
      ];
      break;
  }
}

/**
 * 把时间戳转换为日期格式
 * @param {int} time 时间格式
 */
export const formatTime = (time, type) => {
  let datetime = '';
  if (time == undefined || time == null) {
    datetime = new Date();
  } else {
    datetime = new Date(parseInt(time) * 1000);
  }
  let year = datetime.getFullYear();
  let month = (datetime.getMonth() + 1 < 10) ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
  let day = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
  let hour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours();
  let min = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes();
  let sec = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds();
  if (type == 0 || type == undefined) {
    return year + '' + month + '' + day;
  }
  if (type == 1) {
    return year + '/' + month + '/' + day;
  }
  if (type == 2) {
    return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec + '';
  }
  if (type == 3) {
    return hour + ':' + min;
  }
  if (type == 4) {
    return month + '月' + day + '日';
  }
  if (type == 5) {
    return month + '-' + day + '  ' + hour + ':' + min
  }

}
