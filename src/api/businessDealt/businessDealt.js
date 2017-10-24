import fetch from 'utils/fetch';

export function adjustStock(data) {
  data.seq = parseInt(20000000000000*Math.random());
  data.timestamp = (new Date()).getTime();
  return fetch({
    url: '/user/adjustStock',
    method: 'post',
     data:{msg:JSON.stringify(data)}
  });
}

export function transferNature(data) {
  data.seq = parseInt(20000000000000*Math.random());
  data.timestamp = (new Date()).getTime();
  return fetch({
    url: '/user/transferNature',
    method: 'post',
     data:{msg:JSON.stringify(data)}
  });
}

export function transferStock(data) {
  data.seq = parseInt(20000000000000*Math.random());
  data.timestamp = (new Date()).getTime();
  return fetch({
    url: '/user/transferStock',
    method: 'post',
     data:{msg:JSON.stringify(data)}
  });
}

export function frostStock(data) {
  data.seq = parseInt(20000000000000*Math.random());
  data.timestamp = (new Date()).getTime();
  return fetch({
    url: '/business/frostStock',
    method: 'post',
     data:{msg:JSON.stringify(data)}
  });
}


export function unfreezeStock(data) {
  data.seq = parseInt(20000000000000*Math.random());
  data.timestamp = (new Date()).getTime();
  return fetch({
    url: '/business/unfreezeStock',
    method: 'post',
     data:{msg:JSON.stringify(data)}
  });
}


export function queryCustAccount(data) {
  data.seq = parseInt(20000000000000*Math.random());
  data.timestamp = (new Date()).getTime();
  return fetch({
    url: '/user/queryCustAccount',
    method: 'post',
     data:{msg:JSON.stringify(data)}
  });
}

export function queryCustStock(data) {
  data.seq = parseInt(20000000000000*Math.random());
  data.timestamp = (new Date()).getTime();
  return fetch({
    url: '/user/queryCustStock',
    method: 'post',
     data:{msg:JSON.stringify(data)}
  });
}

// 增资扩股  提交
export function registerFund(data) {
  data.seq = parseInt(20000000000000*Math.random());
  data.timestamp = (new Date()).getTime();
  return fetch({
    url: '/business/registerFund',
    method: 'post',
     data:{msg:JSON.stringify(data)}
  });
}

// 增资扩股  查询列表
export function queryProductInfo(data) {
  data.seq = parseInt(20000000000000*Math.random());
  data.timestamp = (new Date()).getTime();
  return fetch({
    url: '/business/queryProductInfo',
    method: 'post',
     data:{msg:JSON.stringify(data)}
  });
}

// 冻结 解押  查询列表
export function queryForstStream(data) {
  data.seq = parseInt(20000000000000*Math.random());
  data.timestamp = (new Date()).getTime();
  return fetch({
    url: '/business/queryForstStream',
    method: 'post',
     data:{msg:JSON.stringify(data)}
  });
}