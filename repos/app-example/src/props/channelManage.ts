import { IChannelManageRootProps, ChannelManageApi } from '@module-data/channel-manage'

export const channelManageProps: IChannelManageRootProps = {
  api: new ChannelManageApi(
    { baseUrl: 'http://10.0.3.36:8080/direct-ad/api' },
  ),
  rootPath: '/channel',
  access: {}
}