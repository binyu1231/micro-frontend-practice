import { PlainObject } from '../types'

export interface IPackageProp {
  rootPath: string
  access: PlainObject<boolean>
  i18nLocale?: { [key: string]: { [key: string]: string } }
}

export interface IPackageModule {
  mountId: string,
  name: string,
  state: PlainObject,
  action: any
}