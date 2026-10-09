import { createRouter, createWebHistory } from 'vue-router'
import { useAdminAuthStore } from '@/stores/admin-auth'
import { setPageTitle } from '@/utils/page-title'
import HomeView from '@/views/front/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  // 舊版 router/index.js 也是直接 return {x:0,y:0},切頁一定從頂部開始。
  // 同一頁只改 query(產品列表切換地區 tab)時不捲動——舊版切 tab 沒有換路由,畫面也不會跳
  // 詳情頁換到另一個詳情頁也不在這裡處理,改由 ProductView 用動畫慢慢滑上去(舊版的效果)
  scrollBehavior(to, from) {
    if (to.path === from.path) return false
    if (to.name === 'product' && from.name === 'product') return false
    return { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      component: () => import('@/layout/FrontLayout.vue'),
      children: [
        { path: '', name: 'home', component: HomeView },
        {
          path: 'products',
          name: 'products',
          component: () => import('@/views/front/ProductsView.vue'),
          meta: { title: '找行程' },
        },
        {
          // 標題在 ProductView 載入行程後改成行程名稱
          path: 'products/:id',
          name: 'product',
          component: () => import('@/views/front/ProductView.vue'),
          meta: { title: '行程介紹' },
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('@/views/front/CartView.vue'),
          meta: { title: '購物車' },
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('@/views/front/AboutView.vue'),
          meta: { title: '關於我們' },
        },
        {
          path: 'favorite',
          name: 'favorite',
          component: () => import('@/views/front/FavoriteView.vue'),
          meta: { title: '我的收藏' },
        },
        {
          path: ':pathMatch(.*)*',
          name: 'not-found',
          component: () => import('@/views/front/NotFoundView.vue'),
          meta: { title: '找不到頁面' },
        },
      ],
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('@/views/admin/LoginView.vue'),
      meta: { title: '後台登入' },
    },
    {
      path: '/admin',
      component: () => import('@/layout/AppLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('@/views/admin/DashboardView.vue'),
          meta: { title: '後台總覽' },
        },
        {
          path: 'tours',
          name: 'admin-tours',
          component: () => import('@/views/admin/ToursView.vue'),
          meta: { title: '後台・行程管理' },
        },
        {
          path: 'coupons',
          name: 'admin-coupons',
          component: () => import('@/views/admin/CouponsView.vue'),
          meta: { title: '後台・優惠券管理' },
        },
        {
          path: 'orders',
          name: 'admin-orders',
          component: () => import('@/views/admin/OrdersView.vue'),
          meta: { title: '後台・訂單管理' },
        },
      ],
    },
  ],
})

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true

  const authStore = useAdminAuthStore()
  if (!authStore.checked) await authStore.checkAuth()
  if (!authStore.isLoggedIn) return { name: 'admin-login' }
  return true
})

router.afterEach((to) => {
  setPageTitle(typeof to.meta.title === 'string' ? to.meta.title : undefined)
})

export default router
