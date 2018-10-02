import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/new-stories',
      name: 'NewStories',
      component: Homepage,
      meta: { title: 'New Stories' }
    },
    {
      path: '/best-stories',
      name: 'BestStories',
      component: Homepage,
      meta: { title: 'Best Stories' }
    },
    {
      path: '/top-stories',
      alias: '/',
      name: 'TopStories',
      component: Homepage,
      meta: { title: 'Top Stories' }
    }
  ]
})
