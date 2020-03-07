import { IContainerProp } from "@coloration/micro-framework"
import { DemoApi } from "./api"
import { PlainObject } from "@coloration/kit/types"

export interface IDemoAccess extends PlainObject<boolean> {
  edit?: boolean
}

export interface IDemoRootProps extends IContainerProp {
  api: DemoApi,
  rootPath: string,
  access: IDemoAccess
}