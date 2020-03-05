import { IDemoRootProps, DemoApi } from "container-demo/lib/core";

export const demoProps: IDemoRootProps = {
  api: new DemoApi({ baseUrl: 'any host you want to configure'}),
  rootPath: '',
  access: {
    edit: true
  }
}