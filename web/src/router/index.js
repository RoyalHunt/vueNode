import Vue from 'vue'
import Router from 'vue-router'
import Page404 from '@/pages/Page404'
import Clients from '@/pages/Clients'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'page404',
      component: Page404
    },
    {
      path: '/',
      redirect: '/clients'
    },
    {
      path: '/clients',
      name: 'clients',
      component: Clients
    }
  ]
})
