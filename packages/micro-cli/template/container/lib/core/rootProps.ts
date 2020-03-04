import { PlainObject, IContainerProp } from "@micro/framework";
import { DemoApi } from "./api";

export interface IDemoAccess extends PlainObject<boolean> {
  edit: boolean
}

export interface IDemoRootProps extends IContainerProp {
  api: DemoApi,
  access: IDemoAccess
}