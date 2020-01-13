#### Structure


``` bash
- @framework/                   # 针对 single-spa, 封装一些重复性高的功能
  |- api/
  |   |- Api{@class}            # 接口基类 - e.g. class BiApi extends Api {}
  |- package/                   # 
  |   |- 
  |- types/                     # 常用类型
  |   |- ...
  |
  |- helper/                    ### 通用函数 
  |   |- catchError             # 通用捕获异常函数 - e.g. biApi.get('').catch(catchError)
  |   |- pathPrefix 
  |- helper-react               # react 通用函数
  |   |- 
  |- helper-react-antd          # react-antd  

# 可视化模块
- @viz
  |- bar
  |- line
  |- ...

```