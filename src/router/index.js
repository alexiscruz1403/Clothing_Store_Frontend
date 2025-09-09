import { createRouter, createWebHistory } from 'vue-router'
import { validateAdmin } from '@/api/admin'

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
      component: () => import('@/views/auth/LoginView.vue')
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
      path: '/products/:id',
      name: 'productDetail',
      component: () => import('@/views/products/ProductDetailView.vue')
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('@/views/products/FavoritesView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/products/CartView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminView.vue'),
      beforeEnter: async (to, from, next) => {
        try{
          await validateAdmin();
          next();
        }catch(error){
          next({name: 'home'});
        }
      }
    },
    {
      path: '/payment/success',
      name: 'paymentSuccess',
      component: () => import('@/views/payment/SuccessView.vue')
    },
    {
      path: '/payment/failure',
      name: 'paymentFailure',
      component: () => import('@/views/payment/FailureView.vue')
    },
    {
      path: '/my/orders',
      name: 'myOrders',
      component: () => import('@/views/orders/MyOrdersView.vue')
    },
    {
      path: '/my/orders/:id',
      name: 'myOrderDetail',
      component: () => import('@/views/orders/MyOrderDetailView.vue')
    },
    {
      path: '/my/profile',
      name: 'myProfile',
      component: () => import('@/views/profile/MyProfileView.vue')
    }
  ],
})

export default router
