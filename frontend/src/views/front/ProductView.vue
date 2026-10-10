<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { api } from '@/api/client'
  import type { Tour } from '@/api/tropicgo-api'
  import SectionTitle from '@/components/front/SectionTitle.vue'
  import TourLinkCard from '@/components/front/TourLinkCard.vue'
  import NotFoundView from '@/views/front/NotFoundView.vue'
  import { MAX_QUANTITY, useCartStore } from '@/stores/cart'
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
    // 只有第一次進來才切成載入狀態；從「猜您可能會喜歡」換產品時保留舊內容，
    // 頁面高度不會瞬間縮短，平滑捲動才看得到
    if (!tour.value) loading.value = true
    activeImageIndex.value = 0
    quantity.value = 1
    try {
      const { data } = await api.tours.getTour(id)
      tour.value = data.data
      if (tour.value?.title) setPageTitle(tour.value.title)

      // 「猜您可能會喜歡」列出同地區的全部產品（排除自己），不限筆數
      if (tour.value?.region.slug) {
        const { data: listRes } = await api.tours.getTours({ region: tour.value.region.slug })
        relatedTours.value = listRes.data.filter((t: Tour) => t.id !== tour.value?.id)
      }
    } catch {
      // 查不到（id 打錯、已下架）：顯示 404 元件，分頁標題也跟一般 404 頁一致
      tour.value = null
      setPageTitle('找不到頁面')
    } finally {
      loading.value = false
    }
  }

  // 人數框可以直接輸入：清空、小數或負數時拉回至少 1 的整數，超過上限時改成上限
  function normalizeQuantity() {
    const n = Math.floor(Number(quantity.value))
    quantity.value = Number.isFinite(n) && n >= 1 ? Math.min(n, MAX_QUANTITY) : 1
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
  // 詳情頁換到另一個詳情頁時，用動畫慢慢滑回頂部（其他換頁由 router 的 scrollBehavior 直接跳到頂部）
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
  <!-- 載入提示交給全域 loader，這裡只先撐住高度 -->
  <main v-if="loading" class="min-h-screen" />

  <NotFoundView v-else-if="!tour" heading="找不到這個行程" message="這個行程可能已經下架，或是網址打錯了。" />

  <main v-else>
    <section
      v-if="coverImage"
      class="relative h-[250px] bg-cover bg-center bg-no-repeat blur-[1px]"
      :style="{ backgroundImage: `url(${coverImage})` }"
    >
      <div class="absolute inset-0 bg-black/70" />
    </section>

    <!-- 桌機：產品大圖往上壓到 KV 上 70px；lg 以下整個區塊往上拉 220px 疊在 KV 上，圖片再往下推 30px。
         relative：讓這一層畫在 KV 之上（KV 有 filter，自成一個圖層） -->
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
            <!-- 摘要跟列表卡片上的那句相同，進詳情頁先看到同一句，內容才接得上 -->
            <p class="text-[18px] leading-[1.5] text-[#495057] mb-3">{{ tour.summary }}</p>
            <p class="leading-6 mb-4">{{ tour.content }}</p>

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
                成團人數：{{ tour.min_group_size }} 人
              </li>
            </ul>

            <div class="flex justify-between items-baseline">
              <del class="text-black/50">原價 {{ formatCurrency(tour.origin_price) }}</del>
              <div class="text-secondary">
                特價
                <span class="text-[24px] font-medium leading-[1.2]">{{ formatCurrency(tour.price) }}</span>
              </div>
            </div>

            <!-- 人數加減、立即報名各佔一半，手機上下堆疊 -->
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
                  :max="MAX_QUANTITY"
                  class="flex-1 min-w-0 -mx-px border border-secondary text-secondary text-center outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  aria-label="人數"
                  @blur="normalizeQuantity"
                />
                <button
                  type="button"
                  class="px-3 border border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors disabled:opacity-65 disabled:pointer-events-none"
                  :disabled="quantity >= MAX_QUANTITY"
                  @click="quantity = Math.min((Number(quantity) || 0) + 1, MAX_QUANTITY)"
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
  /* 介紹是後台存的 HTML，base.css 把標題、段落的 margin 都歸零了，這裡補回來 */
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
