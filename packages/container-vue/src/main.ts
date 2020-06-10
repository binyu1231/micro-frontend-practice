import Vue from 'vue'
import App from './App.vue'
import { genRotuer } from './router'
import store from './store'
import singleSpaVue from 'single-spa-vue'

Vue.config.productionTip = false

const vueOptions = {
  el: '#container-vue',
  router: null as any,
  store,
  render: (h: any) => h(App)
}


if (!window['singleSpaNavigate' as any]) { // 如果不是single-spa模式
  delete vueOptions.el;
  vueOptions.router = genRotuer('/')
  new Vue(vueOptions).$mount('#container-vue');
}

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: vueOptions
})

export const bootstrap = [
  (props: any) => {
    vueOptions.router = genRotuer(props.baseUrl)
    return Promise.resolve(props)
  },
  vueLifecycles.bootstrap
]

export const mount = [
  vueLifecycles.mount
]

export const unmount = [
  vueLifecycles.unmount
]

export default vueLifecycles
