import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/base.css"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vuescroll from 'vuescroll/dist/vuescroll-native';

// 你可以在这里设置全局配置
Vue.use(vuescroll);


Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
