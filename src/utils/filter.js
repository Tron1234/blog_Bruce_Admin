const install = app => {
  app.config.globalProperties.$filter = {
    formatSex(value) {
      return Number(value) ? '女' : '男';
    },
    formatDate(date, fmt = "YYYY-mm-dd HH:MM") {
      const time = new Date(date);
      let ret;
      const opt = {
        "Y+": time.getFullYear().toString(), // 年
        "m+": (time.getMonth() + 1).toString(), // 月
        "d+": time.getDate().toString(), // 日
        "H+": time.getHours().toString(), // 时
        "M+": time.getMinutes().toString(), // 分
        "S+": time.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
      };
      return fmt;
    }
  }
};

export {
  install as
  default
};
