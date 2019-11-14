import { INavMenuItem } from "@legend/ui"
import { IPackageProp } from '@legend/framework'
import { PortalApi } from "./api"


export interface IPortalRootProps extends IPackageProp {
  signSuccessRedirectPath?: string,
  menu?: INavMenuItem[],
  accountMenu?: INavMenuItem[],
  portalApi: PortalApi,
  systemId: number
}