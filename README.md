# legend

微前端开发模板

### use

``` bash
$ npm i lerna -g
$ lerna link
$ lerna bootstrap
```

### lib

#### development

- lerna (required)
- storybook
- jest
- postcss/tailwindcss
- webpack/babel

#### production

- single-spa
- react
- antd
- vue?
- angular?

### Note

1. lerna 配合 yarn: 应该设置根目录下的 `lerna.json`, `package.json`

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


2. 并且子项目的项目依赖不使用本地路径 `"@legend/ui":"file:../"` 而**使用版本号** `"@legend/ui":"^0.01"`
*原因*: 不能监听到文件变化，修改后页面无响应



### other

- [lerna 使用介绍](https://juejin.im/post/5ced1609e51d455d850d3a6c)
