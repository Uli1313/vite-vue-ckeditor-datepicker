import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'TestView',
      component: () => import('../views/TestView.vue')
    },
  ]
})

export default router
