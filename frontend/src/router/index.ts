import { isAxiosError } from 'axios'
import { createRouter, createWebHistory } from 'vue-router'
import { api } from '@/api/client'
import { useAdminAuthStore } from '@/stores/admin-auth'
import { setPageTitle } from '@/utils/page-title'
import HomeView from '@/views/front/HomeView.vue'

function waitForScrollable(position: { left: number; top: number }) {
  return new Promise<{ left: number; top: number }>((resolve) => {
    const startedAt = Date.now()
    const check = () => {
      const maxTop = document.documentElement.scrollHeight - window.innerHeight
      if (maxTop >= position.top || Date.now() - startedAt > 2000) resolve(position)
      else requestAnimationFrame(check)
    }
    check()
  })
}

const router = createRouter({
  history: createWebHistory(),
  // 換頁一律回到頂部。同一頁只改 query（產品列表切換地區）時不捲動；
  // 詳情頁換到另一個詳情頁由 ProductView 自己用動畫滑上去
  scrollBehavior(to, from, savedPosition) {
    // 瀏覽器上一頁、下一頁：回到離開時的捲動位置。資料是進頁面後才向 API 撈的，剛切過來時頁面還不夠高，
    // 所以等頁面長到夠高再捲（最多等 2 秒）
    if (savedPosition) return waitForScrollable(savedPosition)
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
          meta: { title: '產品列表' },
        },
        {
          // 標題在 ProductView 載入產品後改成產品名稱
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
      meta: { title: '後台登入', guestOnly: true },
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
          meta: { title: '後台・產品管理' },
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

router.beforeEach(async (to, from) => {
  if (!to.meta.requiresAuth && !to.meta.guestOnly) return true

  const authStore = useAdminAuthStore()
  if (!authStore.checked) await authStore.checkAuth()

  // 登入頁只給沒登入的人看；要換帳號就先登出
  if (to.meta.guestOnly) {
    if (!authStore.isLoggedIn) return true
    // 在網站內切過來（例如按上一頁）就留在原頁；網址列直接輸入會整個重新載入，
    // 不知道原本在哪一頁，所以回儀表板
    return from.matched.length > 0 ? false : { name: 'admin-dashboard' }
  }

  // 沒登入：導到登入頁，並記下原本要去的頁面，登入後回到這裡
  if (!authStore.isLoggedIn) return { name: 'admin-login', query: { redirect: to.fullPath } }
  return true
})

// 使用中 token 過期（或失效），後台 API 會回 401：清掉登入狀態，導回登入頁，登入後回到目前這頁。
// 只在已登入時處理：開站時 checkAuth 遇到失效的 token 會自己清掉
api.instance.interceptors.response.use(undefined, (error) => {
  const authStore = useAdminAuthStore()
  if (isAxiosError(error) && error.response?.status === 401 && authStore.isLoggedIn) {
    authStore.expireSession()
    router.replace({
      name: 'admin-login',
      query: { redirect: router.currentRoute.value.fullPath },
    })
  }
  return Promise.reject(error)
})

router.afterEach((to, _from, failure) => {
  // 被守衛取消的換頁（例如已登入時進登入頁、留在原頁）也會走到這裡，這時不能把標題改成目標頁的
  if (failure) return
  setPageTitle(typeof to.meta.title === 'string' ? to.meta.title : undefined)
})

export default router
