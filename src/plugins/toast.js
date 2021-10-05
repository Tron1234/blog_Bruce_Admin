import { createToast } from 'mosha-vue-toastify';

const toastController = {
  success(props) {
    if (typeof props === 'string') props = { title: '成功', description: props }
    return createToast(props, { type: 'success', timeout: props.timeout || 1500 });
  },
  info(props) {
    if (typeof props === 'string') props = { title:'消息',description: props }
    return createToast(props, { type: 'info', timeout: props.timeout || 1500 })
  },
  danger(props) {
    if (typeof props === 'string') props = { title: '错误', description: props }
    if (Object.prototype.toString.call(props) === '[object Object]' && !props.title) Object.assign(props, { title: '错误' });
    return createToast(props, { type: 'danger', timeout: props.timeout || 1500 })
  },
  warning(props) {
    if (typeof props === 'string') props = { title:'警告',description: props }
    return createToast(props, { type: 'warning', timeout: props.timeout || 1500 })
  },
  denied(props) {
    if (typeof props === 'string') props = { description: props }
    return createToast(props, { type: 'default', timeout: props.timeout || 1500 })
  }
}

export default {
  install: (app) => {
    app.config.globalProperties.$toast = toastController;
  }
}

export let toast = toastController;