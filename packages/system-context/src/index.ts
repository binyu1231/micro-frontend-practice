import { registerApplication, start } from 'single-spa'
import { Nav } from './Nav'
import './assets/style.css'
import containerVueManifest from 'container-vue/dist/resource.json'
import containerReactManifest from 'container-react/dist/resource.json'
import containerAngularManifest from 'container-angular/dist/resource.json'
import { loadManifest } from './utils'


Nav(document.getElementById('app'))

registerApplication( //注册微前端服务
  'singleVue', 
  async () => {
    await loadManifest('container-vue', containerVueManifest)
    return window['container-vue']
  },
  location => location.pathname.startsWith('/vue'), // 配置微前端模块前缀
  { baseUrl: '/vue' }
)


registerApplication( //注册微前端服务
  'singleReact', 
  async () => {
    await loadManifest('container-react', containerReactManifest)
    return window['container-react']
  },
  location => location.pathname.startsWith('/react'), // 配置微前端模块前缀
  { baseUrl: '/react' }
)

registerApplication( //注册微前端服务
  'singleAngular', 
  async () => {
    await loadManifest('container-angular', containerAngularManifest)
    return window['container-angular']
  },
  location => location.pathname.startsWith('/container-angular'), // 配置微前端模块前缀
  { baseUrl: '/container-angular' }
)

start()
