import Vue from 'vue'

// 产品类型
export function filterproduct(value) {
  switch(value) {
       case 1:
         return '所有';
         break;
       case 2:
         return '待定';
         break;
       case 3:
         return '完成';
         break;
       case 5:
         return '审核';
         break;
      }
}
// 账户状态
export function statusFilter(value) {
  switch(value) {
       case '1':
         return '正常';
         break;
       case '2':
         return '冻结';
         break;
       case '3':
         return '锁定';
         break;
       case '4':
         return '注销';
         break;
       case '99999':
        return '-';
        break;
      }
}
// 客户类型
export function custTypeFilter(value) {
  switch(value) {
       case 1:
         return '个人';
         break;
       case 2:
         return '企业投资者';
         break;
       case 3:
         return '托管企业用户';
       case 4:
         return '中心人员';
         break;
      }
}
// 开户状态
export function custStatusFilter(value) {
  switch(value) {
       case 1:
         return '无效';
         break;
       case 2:
         return '有效';
         break;
       case 3:
         return '待绑定';
         break;
       case 4:
         return '待审核';
         break;
      }
}

// 证件类型
export function certTypeFilter(value) {
  switch(value) {
       case 1:
         return '身份证';
         break;
       case 2:
         return '营业执照';
         break;
       case 3:
         return '统一社会应用代码';
         break;
       case 99999:
         return '-';
         break;
      }
}

// 账户状态
export function custStatus(value) {
  switch(value) {
       case '0':
         return '正常';
         break;
       case '1':
         return '冻结';
         break;
       case '*':
         return '销户';
         break;
	    default:
	    		return '-';
	    		break;
      }
}

// 时间过滤器
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time == 'object') {
    date = time;
  } else {
    date = new Date(parseInt(time));
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/* 数字 格式化*/
export function nFormatter(num, digits) {
  const si = [
        { value: 1E18, symbol: 'E' },
        { value: 1E15, symbol: 'P' },
        { value: 1E12, symbol: 'T' },
        { value: 1E9, symbol: 'G' },
        { value: 1E6, symbol: 'M' },
        { value: 1E3, symbol: 'k' }
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol;
    }
  }
  return num.toString();
}

// 时间格式矫正
export function timeformat(time) {
	if(time == '-'){
		return '-'
	}
	  let year = time.substr(0,4),
	month = time.substr(4,2),
	day = time.substr(6,2),
	hour = time.substr(8,2),
	minute = time.substr(10,2),
	second = time.substr(12,2);
  	return year +"/"+ month +"/"+ day +" " + hour +":" + minute +":" + second
}

//代办审核状态
export function todoStatus(oldValue) {
    switch(oldValue) {
        case '0':
            return '';
            break;
        case '1':
            return '未受理';
            break;
        case '2':
            return '审核中';
            break;
        case '3':
            return '已完成';
            break;
        case '4':
            return '已驳回';
            break;
        default:
        		return '-';
        		break;
    }
}
//代办流程状态
export function processStatus(oldValue) {
    switch(oldValue) {
        case '0':
            return '业务撤销';
            break;
        case '1':
            return '企业待受理';
            break;
        case '2':
            return '企业待审核';
            break;
        case '3':
            return '企业已完成，中心待受理';
            break;
        case '4':
            return '企业已驳回';
            break;
        case '5':
            return '中心初审待审核';
            break;
        case '6':
            return '中心初审已完成，中心复审待受理';
            break;
        case '7':
            return '中心初审驳回';
            break;
        case '8':
            return '中心复审待审核';
            break;
        case '9':
            return '中心复审已完成';
            break;
        case '10':
            return '中心初审已关闭';
            break;
        case '11':
            return '中心复审已关闭';
            break;
        default:
        		return '-';
        		break;
    }		
}

//代办流程按钮状态
export function taskStatusButton(oldValue) {
    switch(oldValue) {
        case '0':
            return '查看';
            break;
        case '1':
            return '受理';
            break;
        case '2':
            return '审核';
            break;
        case '3':
            return '受理';
            break;
        case '4':
            return '查看';
            break;
        case '5':
            return '初审';
            break;
        case '6':
            return '受理';
            break;
        case '7':
            return '查看';
            break;
        case '8':
            return '终审';
            break;
        case '9':
            return '查看';
            break;
        case '10':
            return '查看';
            break;
        case '11':
            return '查看';
            break;
        default:
        		return '';
        		break;
    }		
}

//保留两位小数
export function twoDecimalPlaces(oldValue) {
	if(oldValue){
		oldValue = String(oldValue)
		let list = oldValue.split('.');
		if(list[1]){
			if(Number(list[1])<10){
				return list[0]+list[1]+'0'
			}
		}else{
			return list[0]+'.00'
		}
	}
}//保留三个字
export function threeWords(oldValue) {
	if(oldValue && oldValue.length>3){
		return oldValue.slice(0,3)
	}else{
		return oldValue
	}
}

//备注信息
export function remark(oldValue) {
	if(oldValue){
		let list = oldValue.split('|'),str = '';
		if(list[1]){
			switch (list[0]){
				case '1':
						str = '审核通过：';
					break;
				case '2':
						str = '审核驳回：';
					break;
				case '-1':
						str = '审核关闭：';
					break;
			}
			return str+list[1]
		}else{
			return oldValue
		}
	}
}

//代码如下所示：
export function convertCurrency(money) {
  //汉字的数字
  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
  //基本单位
  var cnIntRadice = new Array('', '拾', '佰', '仟');
  //对应整数部分扩展单位
  var cnIntUnits = new Array('', '万', '亿', '兆');
  //对应小数部分单位
  var cnDecUnits = new Array('角', '分', '毫', '厘');
  //整数金额时后面跟的字符
  var cnInteger = '';//整
  //整型完以后的单位
  var cnIntLast = '点';//元
  //最大处理的数字
  var maxNum = 999999999999999.9999;
  //金额整数部分
  var integerNum;
  //金额小数部分
  var decimalNum;
  //输出的中文金额字符串
  var chineseStr = '';
  //分离金额后用的数组，预定义
  var parts;
  if (money == '') { return ''; }
  money = parseFloat(money);
  if (money >= maxNum) {
    //超出最大处理数字
    return '';
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  //转换为字符串
  money = money.toString();
  if (money.indexOf('.') == -1) {
    integerNum = money;
    decimalNum = '';
  } else {
    parts = money.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    var zeroCount = 0;
    var IntLen = integerNum.length;
    for (var i = 0; i < IntLen; i++) {
      var n = integerNum.substr(i, 1);
      var p = IntLen - i - 1;
      var q = p / 4;
      var m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        //归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
//  chineseStr += cnIntLast;
  }
  //小数部分
  if (decimalNum != '') {
    var decLen = decimalNum.length;
    chineseStr += cnIntLast;
    for (var i = 0; i < decLen; i++) {
      var n = decimalNum.substr(i, 1);
      if (n != '0') {
//      chineseStr += cnNums[Number(n)] + cnDecUnits[i];
        chineseStr += cnNums[Number(n)] ;
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == '') {
    chineseStr += cnInteger;
  }
  return chineseStr;
}

