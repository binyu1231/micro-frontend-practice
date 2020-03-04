import Asker, { AskerConf, object2Query, splitBlob, AskerResponse } from '@coloration/asker'
import { PlainObject } from '@coloration/kit'

export interface IApiConf extends AskerConf {
  skipToken?: boolean
}

export class Api extends Asker {
  
  public static store: PlainObject = {}

  constructor(apiConf?: IApiConf) {

    super(apiConf)

    this.conf

    apiConf = apiConf || {}
    
    const _before = apiConf.before
    const _after = apiConf.after
    // 处理 token
    this.conf.before = (conf: IApiConf) => {
      if (_before) conf = _before(conf)
      
      if (!apiConf.skipToken) {
        Object.assign(conf.headers, {
          token: Api.store.token,
        })
      }

      return conf
    }

    this.conf.after = (res: AskerResponse) => {
      res = res.data
      if (_after) res = _after(res)
      return res
    }
  }

  static object2Query = object2Query
  static splitBlob = splitBlob

  public get token () {
    return Api.store.token
  }

  public set token (t: string) {
    Api.store.token = t
  }
}