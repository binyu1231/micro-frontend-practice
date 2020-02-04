import { PlainObject, IContainerProp } from "@micro/framework";
import { ChannelManageApi } from "./api";

export interface IChannelManageAccess extends PlainObject<boolean> {}

export interface IChannelManageRootProps extends IContainerProp {
  api: ChannelManageApi,
  access: IChannelManageAccess
}