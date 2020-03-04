import { IContainerProp } from "@coloration/micro-framework";
import { PlainObject } from '@coloration/kit'
import { DemoApi } from "./api";

export interface IDemoAccess extends PlainObject<boolean> {
  edit: boolean
}

export interface IDemoRootProps extends IContainerProp {
  api: DemoApi,
  access: IDemoAccess
}