export default {
    agentName: {
        required: true,
        validator: function (rule, value, callback) {
            if (value == "") {
                callback(new Error('经办人姓名不能为空'));
            } else if (!/^[\da-zA-Z\u4E00-\u9FA5]{1,60}$/.test(value)) {
                callback(new Error('经办人姓名格式不正确'));
            } else if (value.length > 60) {
                callback(new Error('不能超出60个字符'));
            }
            else {
                callback();
            }
        },
        trigger: 'change'
    },
    IDNO: {
        required: true,
        validator: function (rule, value, callback) {
            if (value == "") {
                callback(new Error('身份证号码/注册号码不能为空！'));
            } else if (!/^[A-Za-z0-9]/.test(value)) {
                callback(new Error('请输入符号或字母组合,不超过40个字符'));
            } else if (value.length > 40) {
                callback(new Error('不能超出40个字符'))
            }
            else {
                callback();
            }
        },
        trugger: 'change'
    },
    NAME: {
        required: true,
        validator: function (rule, value, callback) {
            if (value == "") {
                callback(new Error('姓名不能为空'));
            } else if (!/^[\da-zA-Z0-9\u4E00-\u9FA5]{1,}$/.test(value)) {
                callback(new Error('不能包含特殊字符及空格'));
            } else if (value.length > 60) {
                callback(new Error('不能超出60个字符'));
            }
            else {
                callback();
            }
        },
        trigger: 'change'
    },
    MOBILE: {
        required: true,
        validator: function (rule, value, callback) {
            if (value == "") {
                callback(new Error('电话号码不能为空！'));
            } else if (!/^1(3|4|5|7|8)\d{9}$/.test(value)) {
                callback(new Error('电话格式不正确'));
            } else {
                callback();
            }
        },
        trugger: 'change'
    },
    FINANCINGRATE:{
        required: true,
        validator: function (rule, value, callback) {
            if (value == "") {
                callback(new Error('融资利率不能为空！'));
            } else if (!/^(?=0|.*[1-9])\d{0,3}(?:\.\d{0,2})?$/.test(value)) {
                callback(new Error('请输入:0~999.99 保留两位小数'));
            } else {
                callback();
            }
        },
        trugger: 'change'
    },
    FINANCINGAMOUNT:{
        required: true,
        validator: function (rule, value, callback) {
            if (value == "") {
                callback(new Error('融资金额不能为空！'));
            } else if (!/^(?=0|.*[1-9])\d{0,13}(?:\.\d{0,2})?$/.test(value)) {
                callback(new Error('请输入:0~9999999999999.99 保留两位小数'));
            } else {
                callback();
            }
        },
        trugger: 'change'
    },
}