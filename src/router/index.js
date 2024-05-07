import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: ( ) => import('../views/AuthView.vue')
    }
  ]
})

export default router
