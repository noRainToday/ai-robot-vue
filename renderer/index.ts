import './index.css';
import { createApp } from 'vue';
import i18n from '@locales/index';
import App from '../renderer/App.vue';

createApp(App).use(i18n).mount('#app');
