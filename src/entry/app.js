import Vue from 'vue'
import App from '@/components/layout/App.vue'
import router from "@/router/";
import store from "@/store/";
import '@/assets/less/common.less'; //全局样式
import 'vant/lib/index.css'; 
import '@/utils/vant.js'; 
import "@/service/axios";
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
