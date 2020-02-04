import debounce from 'lodash.debounce'

export const catchError = debounce(function errorHandler (
  e: any, 
  handler?: (message: string) => void
) {
  
  handler = handler || window.console.error
  if (e.message) {
    try {
      const fmtMsg = JSON.parse(e.message)
      handler(fmtMsg.error || fmtMsg.message || e.message)
    }
    catch {
      handler(e.message)
    }
  }
  else {
    if (e.status && e.status === 401) {
      handler('登录超时')
    }
    else {
      handler('接口错误')
    }
  }
}, 200)