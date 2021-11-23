import "devextreme/dist/css/dx.material.blue.dark.compact.css";
import "./themes/generated/theme.base.css";
import "./themes/generated/theme.additional.css";
import { createApp } from "vue";
import router from "./router";
// import auth from "./auth";
import store from "./store";

import App from "./App.vue";
import appInfo from "./app-info";

const app = createApp(App);
// app.provide(auth);
app.use(router);
app.use(store);
app.config.globalProperties.$appInfo = appInfo;
app.mount("#app");
