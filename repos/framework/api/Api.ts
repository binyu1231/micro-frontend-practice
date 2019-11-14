import Asker, { AskerConf, object2Query, splitBlob, AskerJsonpConf, AskerBatchConf } from '@coloration/asker'


export interface IApiConf extends AskerConf {}

export class Api {

  public instance: Asker = null
  public static token: string

  constructor(apiConf?: IApiConf, errorCallback?: (message: string) => void) {
    apiConf = apiConf || {}
    const _before = apiConf.before
    const _after = apiConf.after
    // 处理 token
    apiConf.before = (conf) => {
      if (_before) conf = _before(conf)
      Object.assign(conf.headers, {
        token: Api.token,
      })

      return conf
    }

    apiConf.after = (res) => {
      res = res.data
      if (_after) res = _after(res)
      return res
    }
    

    const o = new Asker(apiConf)
    this.instance = o
  }

  static get = Asker.get
  static post = Asker.post
  static put = Asker.put
  static head = Asker.head
  static delete = Asker.delete
  static patch = Asker.patch
  static option = Asker.option
  static jsonp = Asker.jsonp
  static batch = Asker.batch

  static object2Query = object2Query
  static splitBlob = splitBlob
  
  public get<T = any> (url?: string, params?: any, conf?: IApiConf) {
    return this.instance.get<T>(url, params, conf)
  }

  public head<T = any> (url?: string, params?: any, conf?: IApiConf) {
    return this.instance.head<T>(url, params, conf)
  }

  public delete<T = any> (url?: string, params?: any, conf?: IApiConf) {
    return this.instance.delete<T>(url, params, conf)
  }

  public option<T = any> (url?: string, params?: any, conf?: IApiConf) {
    return this.instance.option<T>(url, params, conf)
  }
  

  public post<T = any> (url?: string, body?: any, conf?: IApiConf) {
    return this.instance.post<T>(url, body, conf)
  }

  public put<T = any> (url?: string, body?: any, conf?: IApiConf) {
    return this.instance.put<T>(url, body, conf)
  }

  public patch<T = any> (url?: string, body?: any, conf?: IApiConf) {
    return this.instance.patch<T>(url, body, conf)
  }

  public jsonp<T = any> (url?: string, body?: any, conf?: AskerJsonpConf) {
    return this.instance.jsonp<T>(url, body, conf)
  }

  public batch<T = any> (url?: string, body?: any, conf?: AskerBatchConf) {
    return this.instance.batch<T>(url, body, conf)
  }

  public get token () {
    return Api.token
  }

  public set token (t: string) {
    Api.token = t
  }
  
}