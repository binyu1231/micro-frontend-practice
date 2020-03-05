import { PlainObject } from '@coloration/kit'
import { IGlobalModule } from '../module';

export interface IContainerProp {
  rootPath: string
  access: PlainObject<boolean>
  i18nLocale?: { [key: string]: { [key: string]: string } }
}

export interface IContainerModule extends IGlobalModule {
  mountId: string,
  name: string,
}