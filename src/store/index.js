import { createStore } from "vuex";
import main from "./modules/main";
import sideMenu from "./modules/side-menu";
import user from "./modules/user";

const store = createStore({
  modules: {
    main,
    user,
    sideMenu
  }
});

export function useStore() {
  return store;
}

export default store;
