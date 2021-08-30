import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import VueCookies from 'vue-cookies'
import vuescroll from 'vuescroll/dist/vuescroll-native';
import "./assets/css/base.css"
import "./assets/css/buttons.css"

Vue.use(VueCookies)


Vue.config.productionTip = false;
Vue.use(vuescroll)
Vue.use(ElementUI);
Vue.prototype.$message=ElementUI.Message
axios.defaults.withCredentials = true


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
