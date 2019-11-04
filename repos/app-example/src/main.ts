

import { registerApplication, start } from 'single-spa'
// import { PortalModule, portalModule } from '@module-data/portal/config'

// registerModule(portalModule.name, portalModule)

registerApplication(
  'portal', 
  () => import('@module-data/portal'), 
  () => true,
  { 
    rootPath: '/' 
  }
)

registerApplication(
  'label-market',
  () => import('@module-data/label-market'),
  pathPrefix('/label-market'),
  {
    rootPath: '/label-market'
  }
)

function pathPrefix(prefix: string) {
  return function(location: Location) {
      return location.pathname.indexOf(prefix) === 0
  }
}

start()