export function deepClone(obj) {
  if (obj === null) return null;
  if (typeof obj === 'function') return obj.clone();
  if (typeof obj !== 'object') return obj;
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);
  let obj2 = new obj.constructor;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      obj2[key] = deepClone(obj[key]);
    }
  }
  return obj2;
}

Function.prototype.clone = function () {
  var that = this;
  var temp = function temporary() {
    return that.apply(this, arguments);
  };
  for (var key in this) {
    if (this.hasOwnProperty(key)) {
      temp[key] = this[key];
    }
  }
  return temp;
};

const install = app => {
  app.config.globalProperties.$deepClone = deepClone;
};

export { install as default };