import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { EmptyRouteComponent } from './empty-route/empty-route.component';


const baseProps = {
  baseUrl: '/container-angular'
}


@NgModule({
  declarations: [
    AppComponent,
    EmptyRouteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: baseProps.baseUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function setProps (props: typeof baseProps) {
  Object.assign(baseProps, props)
}
