import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import globalComponents from "./global-components";
import utils from "./utils";
import toast from './plugins/toast';
import message from './plugins/message';

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
  Prism
});
import "./assets/js/tw-starter";

// SASS Theme
import 'mosha-vue-toastify/dist/style.css';
import "./assets/sass/app.scss";

const app = createApp(App)
  .use(store)
  .use(router)
  .use(VueMarkdownEditor)
  .use(toast)
  .use(message);

globalComponents(app);
utils(app);

app.mount("#app");
