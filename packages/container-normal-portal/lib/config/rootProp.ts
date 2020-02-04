import { INavMenuItem } from "@component/ui"
import { IContainerProp } from '@micro/framework'
import { PortalApi } from "./api"


export interface IPortalRootProps extends IContainerProp {
  signSuccessRedirectPath?: string,
  menu?: INavMenuItem[],
  accountMenu?: INavMenuItem[],
  portalApi: PortalApi,
  systemId: number
}