import faker from "./faker";
import helper from "./helper";
import lodash from "./lodash";
import filter from './filter';
import deepClone from "./deepClone";

export default app => {
  app.use(faker);
  app.use(helper);
  app.use(lodash);
  app.use(filter);
  app.use(deepClone);
};
