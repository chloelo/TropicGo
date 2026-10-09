<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { api } from '@/api/client'
  import type { Tour } from '@/api/tropicgo-api'
  import SectionTitle from '@/components/front/SectionTitle.vue'
  import TourLinkCard from '@/components/front/TourLinkCard.vue'
  import { useCartStore } from '@/stores/cart'
  import { useFavorites } from '@/composables/use-favorites'
  import { formatCurrency } from '@/utils/format'
  import { HERO_IMAGES } from '@/utils/hero-images'
  import { setPageTitle } from '@/utils/page-title'

  const route = useRoute()
  const cartStore = useCartStore()
  const { isFavorite, toggleFavorite } = useFavorites()

  const tour = ref<Tour | null>(null)
  const relatedTours = ref<Tour[]>([])
  const loading = ref(true)
  const activeImageIndex = ref(0)
  const quantity = ref(1)

  const activeImage = computed(() => tour.value?.images[activeImageIndex.value]?.url)
  const coverImage = computed(() => tour.value?.images[0]?.url)
  const subtotal = computed(() => (Number(quantity.value) || 0) * (tour.value?.price ?? 0))

  async function loadTour(id: string) {
    // 只有第一次進來(還沒有任何行程)才切成載入狀態;從「猜您可能會喜歡」換行程時保留舊內容,
    // 頁面高度不會瞬間縮短,下面的平滑捲動才看得到,等新資料回來再替換(期間有全域 loader)
    if (!tour.value) loading.value = true
    activeImageIndex.value = 0
    quantity.value = 1
    try {
      const { data } = await api.tours.getTour(id)
      tour.value = data.data
      if (tour.value?.title) setPageTitle(tour.value.title)

      // 舊版「猜您可能會喜歡」列出同地區的全部行程(排除自己),不限筆數
      if (tour.value?.region.slug) {
        const { data: listRes } = await api.tours.getTours({ region: tour.value.region.slug })
        relatedTours.value = listRes.data.filter((t: Tour) => t.id !== tour.value?.id)
      }
    } finally {
      loading.value = false
    }
  }

  // 人數框可以直接輸入,清空或打小數、負數時拉回至少 1 的整數
  function normalizeQuantity() {
    const n = Math.floor(Number(quantity.value))
    quantity.value = Number.isFinite(n) && n >= 1 ? n : 1
  }

  function handleAddToCart() {
    if (!tour.value) return
    normalizeQuantity()
    cartStore.addItem(tour.value, quantity.value)
  }

  function handleToggleFavorite() {
    if (!tour.value?.id) return
    toggleFavorite(tour.value.id)
  }

  onMounted(() => loadTour(route.params.id as string))
  // 舊版 Product.vue 的 toProduct():詳情頁換到另一個詳情頁時,用動畫慢慢滑回頂部
  // (其他換頁是直接跳到頂部,由 router 的 scrollBehavior 處理)
  watch(
    () => route.params.id,
    (id) => {
      if (!id) return
      window.scrollTo({ top: 0, behavior: 'smooth' })
      loadTour(id as string)
    },
  )
</script>

<template>
  <!-- 載入中的提示交給全域 loader,這裡只先撐住高度 -->
  <main v-if="loading" class="min-h-screen" />

  <main v-else-if="!tour" class="text-center text-gray-400 py-24">找不到這個行程。</main>

  <main v-else>
    <!-- 舊版 .zone_detail_bg:用產品第一張圖當背景、模糊 1px、疊 70% 黑色遮罩,高度固定 250px -->
    <section
      v-if="coverImage"
      class="relative h-[250px] bg-cover bg-center bg-no-repeat blur-[1px]"
      :style="{ backgroundImage: `url(${coverImage})` }"
    >
      <div class="absolute inset-0 bg-black/70" />
    </section>

    <!-- 桌機:產品大圖往上壓到 KV 上 70px;992px 以下整個區塊往上拉 220px 疊在 KV 上,
         圖片再往下推 30px(舊版 _product.scss 的 max-991 規則)。
         relative 讓這一層畫在 KV(有 filter,自成一層)之上 -->
    <section class="relative pt-[30px] pb-[60px] -mt-[220px] lg:mt-0">
      <div class="bs-container">
        <div class="flex flex-wrap -mx-[15px]">
          <div class="w-full lg:w-7/12 px-[15px]">
            <div class="mt-[30px] lg:-mt-[70px] mb-4">
              <img :src="activeImage" :alt="tour.title" class="w-full h-auto block" />
              <div v-if="tour.images && tour.images.length > 1" class="flex gap-2 mt-3">
                <button
                  v-for="(img, index) in tour.images"
                  :key="img.id"
                  class="w-16 h-16 overflow-hidden border-2 shrink-0"
                  :class="index === activeImageIndex ? 'border-secondary' : 'border-transparent'"
                  @click="activeImageIndex = index"
                >
                  <img :src="img.url" class="w-full h-full object-cover" alt="" />
                </button>
              </div>
            </div>
          </div>

          <div class="w-full lg:w-5/12 px-[15px]">
            <nav aria-label="breadcrumb">
              <ol class="flex flex-wrap mr-[4em] mb-4">
                <li>
                  <RouterLink to="/" class="text-[#495057] hover:text-america transition-colors">首頁</RouterLink>
                </li>
                <li class="pl-2 before:content-['/'] before:pr-2 before:text-[#6c757d]">
                  <RouterLink to="/products" class="text-[#495057] hover:text-america transition-colors">
                    產品列表
                  </RouterLink>
                </li>
                <li
                  class="pl-2 text-[#adb5bd] before:content-['/'] before:pr-2 before:text-[#6c757d]"
                  aria-current="page"
                >
                  {{ tour.title }}
                </li>
              </ol>
            </nav>

            <h2
              class="text-[32px] font-medium leading-[1.2] mb-6 pt-[10px] border-t-2 border-dotted border-africa/40 lg:mb-4 lg:pt-0 lg:border-t-0"
            >
              {{ tour.title }}
            </h2>
            <!-- 摘要是列表卡片上那句,進詳情頁先看到同一句,內容才接得上;舊版沒有這段 -->
            <p class="text-[18px] leading-[1.5] text-[#495057] mb-3">{{ tour.summary }}</p>
            <p class="leading-6 mb-4">{{ tour.content }}</p>

            <!-- 成團人數、費用已含資料庫沒有欄位,照舊版寫死 -->
            <ul class="mb-4">
              <li v-if="tour.is_popular" class="flex items-center mb-[10px]">
                <span
                  class="w-[30px] h-[30px] rounded-full bg-alert text-white text-[16px] flex items-center justify-center mr-[10px] shrink-0"
                >
                  <span class="i-fa6-fire" />
                </span>
                熱門商品
              </li>
              <li class="flex items-center mb-[10px]">
                <span
                  class="w-[30px] h-[30px] rounded-full bg-secondary text-white text-[90%] flex items-center justify-center mr-[10px] shrink-0"
                >
                  <span class="i-fa6-plane-departure" />
                </span>
                出發城市：{{ tour.departure_city }}
              </li>
              <li class="flex items-center mb-[10px]">
                <span
                  class="w-[30px] h-[30px] rounded-full bg-secondary text-white text-[90%] flex items-center justify-center mr-[10px] shrink-0"
                >
                  <span class="i-fa6-users" />
                </span>
                成團人數：15 人
              </li>
              <li class="flex items-center mb-[10px]">
                <span
                  class="w-[30px] h-[30px] rounded-full bg-secondary text-white text-[90%] flex items-center justify-center mr-[10px] shrink-0"
                >
                  <span class="i-fa6-dollar-sign" />
                </span>
                費用已含：來回機票、機場稅、燃油費
              </li>
            </ul>

            <div class="flex justify-between items-baseline">
              <del class="text-black/50">原價 {{ formatCurrency(tour.origin_price) }}</del>
              <div class="text-secondary">
                特價
                <span class="text-[24px] font-medium leading-[1.2]">{{ formatCurrency(tour.price) }}</span>
              </div>
            </div>

            <!-- 舊版 .form-row:人數加減、立即報名各佔一半,768px 以下上下堆疊;全站沒有圓角 -->
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 md:gap-x-[10px]">
              <div class="mb-4 flex h-[38px]">
                <button
                  type="button"
                  class="px-3 border border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors disabled:opacity-65 disabled:pointer-events-none"
                  :disabled="quantity <= 1"
                  @click="quantity = Math.max(1, quantity - 1)"
                >
                  <span class="i-fa6-minus" />
                </button>
                <input
                  v-model.number="quantity"
                  type="number"
                  min="1"
                  class="flex-1 min-w-0 -mx-px border border-secondary text-secondary text-center outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  aria-label="人數"
                  @blur="normalizeQuantity"
                />
                <button
                  type="button"
                  class="px-3 border border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors"
                  @click="quantity = (Number(quantity) || 0) + 1"
                >
                  <span class="i-fa6-plus" />
                </button>
              </div>
              <div class="mb-4">
                <button
                  type="button"
                  class="w-full h-[38px] bg-secondary text-white flex items-center justify-center gap-2 hover:bg-secondary-dark transition-colors"
                  @click="handleAddToCart"
                >
                  <span class="i-fa6-cart-shopping" />
                  立即報名
                </button>
              </div>
            </div>

            <div class="flex justify-between items-center">
              <div class="text-[#6c757d] whitespace-nowrap mr-3">
                小計
                <strong>{{ formatCurrency(subtotal) }}</strong>
                元
              </div>
              <button
                type="button"
                class="px-2 py-1 text-sm border border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors flex items-center gap-1"
                @click="handleToggleFavorite"
              >
                <span :class="isFavorite(tour.id) ? 'i-fa6-heart' : 'i-fa6-regular-heart'" />
                {{ isFavorite(tour.id) ? '已加入收藏' : '加入收藏' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 舊版 .description-wrap:淺米色底、右下角剪影圖 -->
    <section
      class="pt-[60px] pb-[35px] bg-[#fffbf9] bg-no-repeat"
      :style="{
        backgroundImage: `url(${HERO_IMAGES.productDescriptionWatermark})`,
        backgroundPosition: '90% 95%',
      }"
    >
      <div class="bs-container">
        <SectionTitle title="產品特色" tag="h3" class="mb-12" />
        <div class="description" v-html="tour.description" />
      </div>
    </section>

    <section v-if="relatedTours.length" class="zones">
      <div class="bs-container">
        <h3 class="text-[28px] font-medium leading-[1.2] mb-6">猜您可能會喜歡...</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[30px]">
          <TourLinkCard v-for="related in relatedTours" :key="related.id" :tour="related" />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
  /* 介紹是後台存的 HTML,base.css 把標題/段落的 margin 都歸零了,這裡比照舊版 Bootstrap 的預設補回來 */
  .description :deep(h3) {
    font-size: 28px;
    font-weight: 500;
    line-height: 1.2;
    margin-bottom: 8px;
  }

  .description :deep(h4) {
    font-size: 24px;
    font-weight: 500;
    line-height: 1.2;
    margin-bottom: 8px;
  }

  .description :deep(p) {
    line-height: 1.5;
    margin-bottom: 16px;
  }
</style>
