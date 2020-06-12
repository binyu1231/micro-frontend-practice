# 微前端示例

- [x] Vue
  - [x] 注入参数
  - [ ] 状态同步
- [x] React
  - [x] 注入参数
  - [ ] 状态同步
- [ ] Angular single-spa 对angular9支持还不完善, 修改内容过多暂时不考虑集成
  - [ ] 注入参数
  - [ ] 状态同步

## 使用

```
legend $ yarn install
legend $ yarn bootstrap
```

## 项目结构

``` 
System Context
|- Container Vue
|- Container React
|- Container Angular
```

## 方案原理

子项目挂载到 window 上全局唯一变量. 根项目在路由命中后加载子项目的 js 入口文件完成初始化. 
微前端有多种实现方式，这里只是其中之一。

### 如何载入子项的JS文件?

子项目在打包时通过 `stats-webpack-plugin` 插件将打包后的资源文件记录到一个 JSON 文件中. 
根项目在打包时读取该文件, 并将此文件所记录的所有子项目的资源文件通过 `copy-webpack-plugin` 
插件复制到打包后的目录中.


### 优势

1. 根项目无需再对子项目进行依赖管理, 节省构建时间. 子项目也不需要考虑父包的使用环境. 
但是这里需要注意在多个 React 项目中不可以将 React, ReactDOM 构建到子项目中. 因为 React 
在使用 hooks 时要求 React 全局唯一

2. 移植性强

3. 可在多个项目中复用

### 劣势

1. 全局唯一, 因为子包的根变量挂载到了 window 上, 所以无法初始化两个相同的子项目。
而且子项目作为业务模块与组件库不同在于基本上很难在同一个项目中出现两次

2. 构建文件变大, 每个子项目都包含了一份本身所有的依赖。虽然文件体积变大，但由于是动态加载，
所以只会载入使用到的资源文件


## 构建步骤

### System Context

通过 webpack 的 `copy-webpack-plugin` 插件将所有子项目的打包文件都拷贝到根项目的打包目录中来. 

1. 打包配置

``` js
// webpack
const packageNames = ['container-vue', 'container-react', 'container-angular']

// 注意这里 container-vue/dist 中的内容都复制到了 /dist/container-vue
// 所以子项目 webpack 配置中的 publicPath 需要设置为包名 即 publicPath: '/container-vue'
// 需要注意的是所有子项目的构建目录都为 'dist'
const copyPatterns = packageNames.map(pName =>({ 
  from: path.join(__dirname, `${pName}/dist/`), 
  to: path.join(__dirname, `../dist/${pName}/`) 
}))

module.exports = {
  plugins: [
    new CopyPlugin({ patterns: copyPatterns }),
  ]
}
```

2. 注册子项目 

``` js
registerApplication( 
  //注册微前端服务名称, 与子项目无关, 用于根项目 single-spa 管理服务使用
  'singleDemo', 
  // 路径匹配时, 触发此函数.需要返回子项目的根变量
  async () => {
    // loadManifest 的作用是将 manifest 文件中记录的 js 入口文件加载到 
    // <body> 中,从而将子项目的根变量挂载到 windows 上继而启动了子项目
    // 这里的 'container-vue' 不是包名而是 webpack 复制的子项目的路径.
    // 可以看到此处比较混乱, 所以建议全部使用子项目包名作为URI 识别标识.
    // container-vue 变量
    await loadManifest('container-vue', containerVueManifest)
    // 这里的变量名是子项目打包时配置的 output.library 建议也使用包名
    return window['container-vue']
  },

  // 这里的匹配路径可以任意设置
  location => location.pathname.startsWith('/container-vue-foo') 
)


```
3. index.html

```html
<!-- public/index.html -->
<body>
<!-- 根项目容器 -->
<div id="app"></div> 
<!-- 
  子项目容器 是子项目启动时配置的 el: '#container-vue' 为了方便
  也用了子项目包名作为id
-->
<div id="container-vue"></div>
</body>

```

上面或以下的所有包名都可以使用 `import { name } from 'container-vue/package.json'` 做抽象处理这里为了方便理解没有做处理. 代码中会处理

### Container Vue

1. 创建 `Vue` 项目

``` bash
$ npm i @vue/cli -g
$ vue create container-vue
```

2. 配置 `vue.config.js`

``` js
// vue.config.js
const StatsPlugin = require('stats-webpack-plugin')

module.exports = {
  publicPath: '/container-vue',
  // css在所有环境下，都不单独打包为文件。这样是为了保证最小引入（只引入js）
  css: { extract: false },
  configureWebpack: {
      devtool: 'none', // 不打包sourcemap
      output: {
        // 全局变量名称, 在根项目初始化子项目 window['container-vue'] 
        // 此处使用 
        library: "singleVue",
        libraryTarget: "window",
      },
      plugins: [
        new StatsPlugin('micro.json', {
            chunkModules: false,
            entrypoints: true,
            source: false,
            chunks: false,
            modules: false,
            assets: false,
            children: false,
            exclude: [/node_modules/]
        }),
    ]
  },
  devServer: {
      contentBase: './',
      compress: true,
  }
}
```

3. 修改入口 

``` js
import Vue from 'vue'
import App from './App.vue'
import singleSpaVue from 'single-spa-vue'

Vue.config.productionTip = false

const vueOptions = {
  // 根项目body中的元素 id
  el: '#container-vue',
  router,
  store,
  render: (h: any) => h(App)
}

// 如果不是single-spa模式
if (!window['singleSpaNavigate' as any]) { 
  delete vueOptions.el
  // 使用自己 public/index.html 中的id
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

```

### Container React


## 其他问题