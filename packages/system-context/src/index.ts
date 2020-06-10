import { registerApplication, start } from 'single-spa'
import { Nav } from './Nav'
import './assets/style.css'
import containerVueManifest from 'container-vue/dist/resource.json'
import containerReactManifest from 'container-react/dist/resource.json'

Nav(document.getElementById('app'))


const loadManifest = (namespace: string, manifest) => {
  const { entrypoints } = manifest
  const scriptUris = Object.keys(entrypoints).map(k => entrypoints[k].assets)
  .filter(assets => Array.isArray(assets))
  .reduce((acc, assets) => acc.concat(assets), [])
  .map(uri => `/${namespace}/${uri}`)

  const lastScriptPromise = scriptUris.reduce((last, uri) => {
    return last.then(() => {
      return new Promise((resolve, reject) => {
        const scriptElement = document.createElement('script')
        scriptElement.src = uri
        scriptElement.onload = resolve
        scriptElement.onerror = reject
        document.body.insertBefore(scriptElement, document.body.firstChild)
      })
    })

  }, Promise.resolve())

  return lastScriptPromise
}

registerApplication( //注册微前端服务
  'singleVue', 
  async () => {
    await loadManifest('container-vue', containerVueManifest)
    return window['container-vue']
  },
  location => location.pathname.startsWith('/vue') // 配置微前端模块前缀
)


registerApplication( //注册微前端服务
  'singleReact', 
  async () => {
    await loadManifest('container-react', containerReactManifest)
    return window['container-react']
  },
  location => location.pathname.startsWith('/react') // 配置微前端模块前缀
)

start()
