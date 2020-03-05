# micro framework

Micro Front-End Development Framework

### Use

``` bash
$ npm i lerna -g

# required 
$ lerna link

# install packages
$ lerna bootstrap

# storybook
$ cd packages/_component-example
_component-example $ yarn book

# a project
$ cd packages/_context-example
_context-example $ yarn start 
# or 
_context-example $ yarn build
```

### Lib

#### Development

- [x] lerna (required)
- [x] webpack/babel (required)
- [x] storybook
- [x] jest
- [x] postcss/tailwindcss

#### Production

- [x] single-spa (required)
- [x] React
- [x] Antd
- [ ] Vue
- [ ] Angular

### Feature

#### Workflow

- 开发
  - [x] 组件开发(storybook) 组件视觉还原
  - [x] 模块开发(storybook) mock数据
  - [x] 项目开发(webpack-dev-server)
- 测试
  - [x] 单元测试(jest)
  - [ ] 集成测试
- 打包
  - [x] 单独打包(webpack)
  - [ ] 打包所有
- 发布
  - [x] 单独发布(npm)
  - [x] 发布所有(lerna)



### Flow

#### install dependences


``` bash
$ lerna add @component/ui --scope=@container/some-container -S
```



### Note

1. lerna 配合 yarn: 应该设置根目录下的 `lerna.json`, `package.json`
2. 放在同一个项目里的各个package, 为了能在 storybook 预览,需要保证 React, 版本一直


```js
// lerna.json
{
  // ...
  "workspaces": ["your-path/*"],
  "useWorkspaces": true,
}
/// package.json
{
  // ...
  "workspaces": ["your-path/*"],
}
```

*原因*: 如果不设置为**工作区**，每个项目都会安装自己的依赖，导致项目中会安装很多重复依赖。导致 React
Hooks 不能从其他模块引入使用。 


2. 并且子项目的项目依赖不使用本地路径 `"@component/ui":"file:../"` 而**使用版本号** `"@component/ui":"^0.01"`
*原因*: 不能监听到文件变化，修改后页面无响应



### other

- [lerna 使用介绍](https://juejin.im/post/5ced1609e51d455d850d3a6c)
