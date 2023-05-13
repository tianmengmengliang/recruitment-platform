import { request } from 'umi';

function doGet(method: string) {
  return ['GET', 'get'].includes(method);
}

function validateFields(params = {}) {
  const query = {};
  Object.keys(params).forEach((item) => {
    if (params[item] || ['', false, 0] === params[item]) {
      query[item] = params[item];
    }
  });
  return query;
}

// 统一的请求方法。
export const requestData = async (method = 'GET', url: string, params: any) => {
  params = validateFields(params);
  const q = doGet(method) ? { params } : { data: params };
  return request(`${url}`, { skipErrorHandler: true, timeout: 5000, method, ...q });
};
