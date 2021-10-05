const install = app => {
  app.config.globalProperties.$filter = {
    formatSex(value){
      return Number(value) ? '女':'男';
    }
  }
};

export { install as default };