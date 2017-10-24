import fetch from 'utils/fetch';

// 5.2.12.WIF-B12 游客查询
export function queryTourist(data) {
  
  data.seq = parseInt(20000000000000*Math.random());
  data.timestamp = (new Date()).getTime();

  return fetch({
    url: '/user/queryTourist',
    method: 'post',
    data:{msg:JSON.stringify(data)}
  });
}

// 登录密码修改
export function sendSMS(data) {
  
  data.seq = parseInt(20000000000000*Math.random());
  data.timestamp = (new Date()).getTime();

  return fetch({
    url: 'sendSMS',
    method: 'post',
    data:{msg:JSON.stringify(data)}
  });
}

// 修改用户状态
export function updateStatus(data) {
  
  data.seq = parseInt(20000000000000*Math.random());
  data.timestamp = (new Date()).getTime();

  return fetch({
    url: '/user/updateStatus',
    method: 'post',
    data:{msg:JSON.stringify(data)}
  });
}

// 5.5.15.AIF-C15 修改登录密码
export function updatePwd(data) {

  data.seq = parseInt(20000000000000*Math.random());
  data.timestamp = (new Date()).getTime();

  return fetch({
    url: '/user/updatePwd',
    method: 'post',
    data:{msg:JSON.stringify(data)}
  });
}

// 5.2.11.WIF-B11 账户绑定
export function bindAccount(data) {
  
  data.seq = parseInt(20000000000000*Math.random());
  data.timestamp = (new Date()).getTime();

  return fetch({
    url: '/user/bindAccount',
    method: 'post',
    data:{msg:JSON.stringify(data)}
  });
}