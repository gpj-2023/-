import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'; 
import 'element-ui/lib/theme-chalk/index.css';
import * as mock from '../src/api/mock'
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  mock,
  created(){
    store.commit('addRouteList',router)
  },
  render: h => h(App)
}).$mount('#app')
