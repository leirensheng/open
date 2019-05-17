import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN'; // lang i18n
import BelTable from 'vue-bel-table';

import '@/styles/index.scss'; // global css
import '@/assets/fonts/iconfont.css';

import App from './App.vue';
import store from './store';
import router from './router';

import '@/permission'; // permission control

// register globally
import '@/components/globalComponents';

Vue.use(ElementUI, {
  size: 'small',
  locale,
});

Vue.use(BelTable, {
  table: {
    border: true,
    highlightCurrent: true,
    stripe: true,
  },
  column: {
    align: 'center',
  },
});

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
