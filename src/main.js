import Vue from 'vue';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import App from './App';
import router from './router';
import store from './store';
import services from './services';
import drective from './drective';
import utils from './utils';
import toaster from '@/utils/toaster';
import 'url-search-params-polyfill';
import 'element-ui/lib/theme-chalk/index.css';
import popover from './plugs/popover';
import '@/assets/icon/iconfont.css';
import '@/assets/icon2/iconfont.css';
import '@/assets/icon2/iconfont.js';
// date format filter
import datePipe from './filters/date';

Vue.filter('date', datePipe);
Vue.use(ElementUI);
Vue.use(drective);
Vue.use(popover);
Vue.use(VueRouter);
Vue.config.productionTip = false;
Vue.prototype.$services = services;
Vue.prototype.$utils = utils;
Vue.prototype.$toaster = toaster;
// Vue.prototype.crypto = crypto;

new Vue({
  router,
  store,
  provide: {
    $datePipe: datePipe
  },
  render: h => h(App)
}).$mount('#app');
