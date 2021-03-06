import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "dayjs/locale/zh-cn";
import locale from "element-plus/lib/locale/lang/zh-cn";
import "@/assets/style/index.scss";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus, { locale });
app.mount("#app");
