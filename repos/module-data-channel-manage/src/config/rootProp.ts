import { PlainObject, IPackageProp } from "@legend/framework";
import { ChannelManageApi } from "./api";

export interface IChannelManageAccess extends PlainObject<boolean> {}

export interface IChannelManageRootProps extends IPackageProp {
  api: ChannelManageApi,
  access: IChannelManageAccess
}