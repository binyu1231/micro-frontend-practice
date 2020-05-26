import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import singleSpaVue from 'single-spa-vue'

Vue.config.productionTip = false

const vueOptions = {
  el: '#vue',
  router,
  store,
  render: (h: any) => h(App)
}


if (!window['singleSpaNavigate' as any]) { // 如果不是single-spa模式
  delete vueOptions.el;
  new Vue(vueOptions).$mount('#vue');
}

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: vueOptions
})

export const bootstrap = [
  vueLifecycles.bootstrap
]

export const mount = [
  vueLifecycles.mount
]

export const unmount = [
  vueLifecycles.unmount
]

export default vueLifecycles
