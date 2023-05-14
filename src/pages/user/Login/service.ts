import { request } from 'umi';

// 1.用户登录
export const login = async (data: any) => {
  return request('/open/user/blogin', {
    method: 'POST',
    data,
  });
};

// 2.用户退出
export async function logout() {
  return request(`/v1/account/logout`, {
    method: 'post',
  });
}

// 3.用户信息
export async function queryUserInfo() {
  return request(`/v1/account/userinfo`, {
    method: 'GET',
    // params,
  });
}
