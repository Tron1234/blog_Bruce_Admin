import { get, post } from '@/axios';

export function uploadAvatar(params) {
  return post('/upload/avatar', params, { 'Content-Type': 'multipart/form-data' });
}