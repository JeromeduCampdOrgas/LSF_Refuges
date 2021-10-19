import { createApp } from "vue";

import vuex from "vuex";
import store from "./store/index";
import App from "./App.vue";
import router from "./router";

createApp(App)
  .use(router)
  .use(vuex)
  .use(store)
  .mount("#app");
