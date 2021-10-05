import createInstance from "./instance";

export default {
  normalTip(params) {
    const config = {
      title:'系统提示',
      type: 'normal',
      sure: '确认',
      isSure: true,
      isCancel: false
    }
    Object.assign(config, params);
    return createInstance(config);
  },
  dangerTip(params) {
    const config = {
      title:'系统提示',
      type: 'danger',
      sure: '确认',
      isSure: true,
      isCancel: false
    }
    Object.assign(config, params);
    return createInstance(config);
  },
  rightTip() {
    const config = {
      title:'系统提示',
      type: 'right',
      sure: '确认',
      isSure: true,
      isCancel: false
    }
    Object.assign(config, params);
    return createInstance(config);
  },
  normalMessage(params) {
    const config = {
      title:'系统提示',
      type: 'normal',
      sure: '确认',
      cancel: '取消',
      isSure: true,
      isCancel: true
    }
    Object.assign(config, params);
    return createInstance(config);
  },
  dangerMessage(params) {
    const config = {
      title:'系统提示',
      type: 'danger',
      sure: '确认',
      cancel: '取消',
      isSure: true,
      isCancel: true
    }
    Object.assign(config, params);
    return createInstance(config);
  },
  rightMessage(params) {
    const config = {
      title:'系统提示',
      type: 'right',
      sure: '确认',
      cancel: '取消',
      isSure: true,
      isCancel: true
    }
    Object.assign(config, params);
    return createInstance(config);
  }
}