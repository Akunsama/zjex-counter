import fetch from 'utils/fetch';

//1.1.1.	WIF-B14产品类型维护请求

export function maintenance() {
  const data = {}
  return fetch({
    url: 'business/defendProductType',
    method: 'post',
    data
  });
}