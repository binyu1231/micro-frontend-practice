
// 手动引入此行
// Error: In this configuration Angular requires Zone.js
import 'zone.js/dist/zone';
import { enableProdMode, NgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';

import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';


import { AppModule, setProps } from './app/app.module';
import { environment } from './environments/environment';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';

if (environment.production) {
  enableProdMode();
}

const lifecycles = singleSpaAngular({
  bootstrapFunction: singleSpaProps => {
    singleSpaPropsSubject.next(singleSpaProps);
    return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(AppModule);
  },
  template: '<div id="container-angular" />',
  Router,
  NgZone,
});


if (!window['singleSpaNavigate' as any]) { // 如果不是single-spa模式
  setProps({ baseUrl: '/containe'})
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
}

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
