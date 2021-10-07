import { get, post } from '@/axios';

export function uploadAvatar(params) {
  return post('/upload/avatar', params, { 'Content-Type': 'multipart/form-data' });
}

export function uploadArticle(params) {
  return post('/upload/article', params, { 'Content-Type': 'multipart/form-data' });
}