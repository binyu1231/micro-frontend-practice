import { Api, IApiConf, IApiOptions } from "@legend/framework"

export interface IAccountSavePayload {
  customerId: number
  customerName: string
  channelId: number
  url: string
  accountId: string
  accountName: string
}

export interface IAccountDeletePayload {
  customerId: number,
  accountId: string
}

export interface IAccountsFetchPayload {
  accountName: string,
  channelId: number | '',
}

export interface IChannelManageDto<T = any> {
  code: number
  data: T
  message: string
}

export interface IAccountSaveDto extends IChannelManageDto { }
export interface IAccountDto {
  account_id: string
  account_name: string
  channel_id: number
  channel_name: string
  customer_id: number
  customer_name: string
}
export interface IAccountsFetchDto extends IChannelManageDto<IAccountDto[]> {}

export interface IChannelsDto {
  auth_key: string
  authorize_method: string
  authorize_url: string
  channel_name: string
  developer_id: string
  id: number
  redirect_url: string
  refresh_method: string
  refresh_url: string
  secret: string
}

export interface IChannelManageApi {
  accountSave: (payload: IAccountSavePayload) => Promise<IAccountSaveDto>
  accountDelete: (payload: IAccountDeletePayload) => Promise<void>
  accountsFetch: (payload: IAccountsFetchPayload) => Promise<IAccountsFetchDto>
  channelsFetch: () => Promise<IChannelsDto[]>
}

export class ChannelManageApi extends Api implements IChannelManageApi {

  constructor (apiConf?: IApiConf, options?: IApiOptions) {

    options = options || {}

    options.skipToken = true
    super(apiConf, options)
  }

  accountSave(payload: IAccountSavePayload) {
    return this.post('/channel/saveAccount', payload)
    .then<IAccountSaveDto>(res => res.data)
  }

  accountDelete(payload: IAccountDeletePayload) {
    return this.delete('/channel/delete', payload, { responseType: 'text' })
    .then<void>(res => res.data)
  }

  accountsFetch(payload: IAccountsFetchPayload) {
    return this.get<IAccountsFetchDto>('/channel/getList', payload)
  }

  channelsFetch() {
    // 直接数组
    return this.get<IChannelsDto[]>('/channel/getAllChannels', undefined, { getCache: true })
  }
}