import {get,post} from '@/axios';

//主分类
//查询主分类
export function getMajorCategory(params) {
  return get('/category/majorCategory', params);
}
//查询主分类信息
export function getMajorCategoryDetail(params) {
  return post('/category/majorCategoryDetail', params);
}
//添加主分类
export function addMajorCategory(params) {
  return post('/category/addMajorCategory', params);
}
//删除主分类
export function deleteMajorCategory(params) {
  return post('/category/deleteMajorCategory', params);
}
//修改主分类
export function updateMajorCategory(params) {
  return post('/category/updateMajorCategory', params);
}

//次分类
//查询次分类
export function getSecondaryCategory(params) {
  return get('/category/secondaryCategory', params);
}
//查询次分类信息
export function getSecondaryCategoryDetail(params) {
  return post('/category/secondaryCategoryDetail', params);
}
//添加次分类
export function addSecondaryCategory(params) {
  return post('/category/addSecondaryCategory', params);
}
//删除次分类
export function deleteSecondaryCategory(params) {
  return post('/category/deleteSecondaryCategory', params);
}
//修改次分类
export function updateSecondaryCategory(params) {
  return post('/category/updateSecondaryCategory', params);
}

