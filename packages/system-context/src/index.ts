import { registerApplication, start, unloadApplication } from 'single-spa'
import { Nav } from './Nav'
import './assets/style.css'


Nav(document.getElementById('app'))

setTimeout(() => {
  console.log(document.body)
  console.log('singleVue', window, window['singleVue'])
}, 1000)

// registerApplication( //注册微前端服务
//   'singleDemo', 
//   async () => {
//       // await runScript('http://127.0.0.1:3000/js/chunk-vendors.js');
//       // await runScript('http://127.0.0.1:3000/js/app.js');
//       const app = window['singleVue']
//       console.log('~~', app)
//       return app
//   },
//   location => true // location.pathname.startsWith('/vue') // 配置微前端模块前缀
// )


// start()
