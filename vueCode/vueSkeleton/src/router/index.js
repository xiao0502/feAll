import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import My from '@/pages/my'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/my',
      name: 'my',
      component: My
    }
  ]
})
