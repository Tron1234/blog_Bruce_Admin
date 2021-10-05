import { get, post } from '@/axios';

//获取文章列表
export function getArticleList(params) {
  return get('/article/privateArticleList', params);
}

export function addArticle(params) {
  return post('/article/addArticle', params);
}

//修改文章推荐状态
export function changeRecommond(params) {
  return post('/article/changeRecommond', params);
}

//删除文章
export function deleteArticle(params) {
  return get('/article/deleteArticle', params);
}
//获取文章详情
export function getArticleInfo(id) {
  return get(`/article/articleInfo/${id}`);
}
//修改文章详情
export function updateArticle(params) {
  return post('/article/updateArticle', params);
}
//修改文章状态
export function updateArticleStatus(id) {
  return post('/article/updateArticleStatus', {
    id,
    status: true
  });
}