import { get, post } from '@/axios';

/* 用户登录
 * params
 * nickname 昵称
 * password 密码
*/
export function deleteContact(params) {
  return post('/user/deleteContact', params);
}

export function getMessage(params) {
  return get('/user/getMessage', params);
}