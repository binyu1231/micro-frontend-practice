import Vue from 'vue'
import App from './App.vue'
import { genRouter } from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: genRouter()
}).$mount('#app')
