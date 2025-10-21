import "./styles/index.css";
import "vfonts/Lato.css";

import { createApp } from "vue";
import i18n from "@locales/index";
import { errorHandlerPlugin } from "@renderer/utils/errorHandler";
import App from "../renderer/App.vue";
import { pinia } from "@renderer/stores/index";
import router from "@renderer/router/index";



createApp(App)
  .use(pinia)
  .use(router)
  .use(i18n)
  .use(errorHandlerPlugin)
  .mount("#app");
