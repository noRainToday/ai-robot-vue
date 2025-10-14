import "./styles/index.css";
import "vfonts/Lato.css";

import { createApp } from "vue";
import i18n from "@locales/index";
import { errorHandlerPlugin } from "@renderer/utils/errorHandler";
import App from "../renderer/App.vue";

createApp(App).use(i18n).use(errorHandlerPlugin).mount("#app");
