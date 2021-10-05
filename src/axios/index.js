import axios from 'axios';
import { networkConfig } from './networkConfig'; //此路径为配置代理服务器时的代理路径
import { toast } from '../plugins/toast';
import router from '../router';
import store from '../store';

function requestService(config) {
  const instance = axios.create({
    ...networkConfig,
    ...config,
  })

  // request拦截器
  instance.interceptors.request.use(config => {
    let token = localStorage.getItem('token')||sessionStorage.getItem('token')||'';
    if(token){
      config.headers.authorization = token;
    }
    console.log('请求接口：' + config.url);
    return config
  }, error => {
    return Promise.reject(error)
  })

  // 响应拦截器
  instance.interceptors.response.use(res => {
    if (res.data.code != 200) {
      toast.danger(res.data.msg);
      return Promise.reject(res)
    }
    return res.data.data;
  },
    error => {
      if(error.response.status==401){
        store.commit('user/clearToken');
        router.replace({name:'login'});
      }else{
        toast.danger(error.response.data.msg);
      }
      return Promise.reject(error)
    }
  )
  return instance(config)
}

export function get(url, params, responseType) {
  return requestService({
    method: 'get',
    url,
    params,
    //默认json格式，如果是下载文件，需要传 responseType:'blob'
    responseType: (responseType == null || responseType == '') ? 'json' : responseType
  })
}

export function post(url, data, headers ,responseType) { // url: 接口；路径；data: 请求参数；responseType：相应的数据类型，不传默认为json
  return requestService({
    method: 'post',
    url,
    data,
    headers,
    //默认json格式，如果是下载文件，需要传 responseType:'blob'
    responseType: (responseType == null || responseType == '') ? 'json' : responseType
  })
}