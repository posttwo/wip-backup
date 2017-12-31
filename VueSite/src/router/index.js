import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Pages/Index'
import Dashboard from '@/components/Pages/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})