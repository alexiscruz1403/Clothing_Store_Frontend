import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('@/views/auth/LogoutView.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/views/products/ProductsView.vue'),
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('@/views/products/FavoritesView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/products/CartView.vue'),
    }
  ],
})

export default router
