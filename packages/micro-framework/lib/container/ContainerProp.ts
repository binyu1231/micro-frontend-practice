import { PlainObject } from '@coloration/kit'

export interface IContainerProp {
  rootPath: string
  access: PlainObject<boolean>
  i18nLocale?: { [key: string]: { [key: string]: string } }
}

export interface IContainerModule {
  mountId: string,
  name: string,
  state: PlainObject,
  action: any
}