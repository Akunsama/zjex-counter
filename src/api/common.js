import fetch from 'utils/fetch';

// 配置公共接口

// 5.5.27.AIF-C27 文件上传
export function uploadFile(data) {
  data.seq = parseInt(20000000000000*Math.random());
  data.timestamp = (new Date()).getTime();
  return fetch({
    url: '/business/uploadFile',
    method: 'post',
    data
  });
}
