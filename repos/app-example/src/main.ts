

import { registerApplication, start } from 'single-spa'
import { PortalModule, protalModule } from '@module-data/portal/config'
import USMModule from 'usm'

const store = new USMModule({
  modules: {
    portal: protalModule
  }
})

console.log(store)

registerApplication(
  'portal', 
  () => import('@module-data/portal'), 
  () => true,
  { 
    store, 
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