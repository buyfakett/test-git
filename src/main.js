import Vue from 'vue'
import App from './App.vue'
// import '../plugins/element.js'
import 'font-awesome/css/font-awesome.min.css'
// import axios from 'axios'
import router from "./router";

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import service from "@/service";

Vue.use(ElementUI)
// Vue.prototype.axios = axios
Vue.prototype.service = service

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.name) {
    document.title = to.name
  }
  next()
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
