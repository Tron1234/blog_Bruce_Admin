import { getUserInfo } from '@/apis';

let userInfo = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo')
userInfo = userInfo ? JSON.parse(userInfo) : {}

const state = {
  token: localStorage.getItem('token') || sessionStorage.getItem('token') || '',
  userInfo
}

const mutations = {
  setUserInfo(state, payload) {
    if (payload.status) {
      state.userInfo = payload.data;
      localStorage.setItem('userInfo', JSON.stringify(payload.data));
    } else if (payload.status === false) {
      state.userInfo = payload.data;
      sessionStorage.setItem('userInfo', payload.data);
    } else {
      state.userInfo = payload;
      if (localStorage.getItem('userInfo')) {
        localStorage.setItem('userInfo', JSON.stringify(payload));
      } else if (sessionStorage.getItem('userInfo')) {
        sessionStorage.setItem('userInfo', JSON.stringify(payload));
      }
    }
  },
  setToken(state, payload) {
    state.token = payload.token;
    if (payload.status) {   //为真说明保持登录状态
      localStorage.setItem('token', payload.token);
    } else {
      sessionStorage.setItem('token', payload.token);
    }
  },
  clearToken(state) {
    state.token = '';
    state.userInfo = {};
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    sessionStorage.removeItem('userInfo');
  }
}

const actions = {
  async getUserInfo(store, status) {
    let data = await getUserInfo();
    store.commit('sideMenu/setMenu', data.permission, { root: true });
    store.commit('setUserInfo', { status, data });
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}