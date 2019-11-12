import Vue from 'vue'
import VueRouter from 'vue-router'
import { ChartPlaygroud } from './pages/chartPlaygroud'

Vue.use(VueRouter)

export function genRouter (prefix = '') {

  const p = prefix

  const routes = [
    // { path: p + '/charts', },
    { path: p + '/chart-playgroud', component: ChartPlaygroud },
    // { path: p + '/dashboards', },
    // { path: p + '/dashboard-playgroud'}
  ]

  return new VueRouter({ routes })
}
