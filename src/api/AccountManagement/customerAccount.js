import fetch from 'utils/fetch';

// 5.5.6.AIF-C06 用户开户
export function openAccount(data) {
  data.seq = parseInt(20000000000000*Math.random());
  data.timestamp = (new Date()).getTime();
  return fetch({
    url: '/user/openAccount',
    method: 'post',
     data:{msg:JSON.stringify(data)}
  });
}

// 5.5.5.AIF-C05 账户认证
export function queryAccount(data) {
  data.seq = parseInt(20000000000000*Math.random());
  data.timestamp = (new Date()).getTime();
  return fetch({
    url: '/user/queryAccount',
    method: 'post',
     data:{msg:JSON.stringify(data)}
  });
}

// 验证参数
export function verifyMsg(data) {
  data.seq = parseInt(20000000000000*Math.random());
  data.timestamp = (new Date()).getTime();
  return fetch({
    url: 'verifyMsg',
    method: 'post',
     data:{msg:JSON.stringify(data)}
  });
}

