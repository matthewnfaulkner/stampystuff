import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import '@/assets/styles/fonts.css';
import '@/assets/styles/main.css';
import '@/assets/styles/tailwind.css';
// eslint-disable-next-line import/extensions
import PrimeVue from 'primevue/config';
// eslint-disable-next-line import/extensions
import Aura from '@primeuix/themes/aura';

import App from '@/app.vue';
import { routes } from '@/routes.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_PUBLIC_PATH),
  routes,
});

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false,
    },
  },
});
app.mount('#app');
