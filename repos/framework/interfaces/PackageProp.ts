import { PlainObject } from '../types'

export interface IPackageProp {
  rootPath: string
  access: PlainObject<boolean>
}

export interface IPackageModule {
  mountId: string,
  name: string,
  state: PlainObject,
  action: any
}