import { get, post } from '@/axios';

/* 用户登录
 * params
 * nickname 昵称
 * password 密码
*/
export function login(params) {
  return post('/user/login', params);
}

export function getUserInfo(params) {
  return get('/user/userInfo', params);
}

export function updateUserInfo(params) {
  return post('/user/updateUserInfo', params);
}

export function updateUserPassword(params) {
  return post('/user/updateUserPassword', params);
}

export function logout() {
  return get('/user/logout');
}

export function getAuthors(params) {
  return get('/user/authors', params);
}

export function addAuthor(params) {
  return post('/user/addAuthor', params);
}

export function updateAuthor(params) {
  return post('/user/updateAuthor', params);
}

export function deleteAuthor(params) {
  return post('/user/deleteAuthor', params);
}