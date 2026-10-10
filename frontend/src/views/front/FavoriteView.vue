<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { api } from '@/api/client'
  import type { Tour } from '@/api/tropicgo-api'
  import HeroBanner from '@/components/front/HeroBanner.vue'
  import SectionTitle from '@/components/front/SectionTitle.vue'
  import TourLinkCard from '@/components/front/TourLinkCard.vue'
  import { useFavorites } from '@/composables/use-favorites'
  import { formatCurrency } from '@/utils/format'
  import { HERO_IMAGES } from '@/utils/hero-images'

  const { favoriteIds, toggleFavorite } = useFavorites()
  const tours = ref<Tour[]>([])
  const loading = ref(true)

  const favoriteTours = computed(() => tours.value.filter((t) => favoriteIds.value.includes(t.id)))
  const popularTours = computed(() => tours.value.filter((t) => t.is_popular))

  onMounted(async () => {
    loading.value = true
    try {
      const { data } = await api.tours.getTours({})
      tours.value = data.data
    } finally {
      loading.value = false
    }
  })
</script>

<template>
  <main>
    <HeroBanner
      title="我的收藏行程"
      align="right"
      :bg-desktop="HERO_IMAGES.favorite.desktop"
      :bg-mobile="HERO_IMAGES.favorite.mobile"
      desktop-position="50% 0"
      mobile-position="50% -160px"
    />

    <!-- 收藏清單 -->
    <section class="zones">
      <div class="bs-container">
        <div class="flex flex-wrap justify-center -mx-[15px]">
          <div class="w-full md:w-2/3 px-[15px]">
            <!-- 載入提示交給全域 loader，這裡只先撐住高度 -->
            <div v-if="loading" class="min-h-[300px]" />

            <template v-else-if="favoriteTours.length">
              <h3 class="text-[28px] font-medium leading-[1.2] border-b border-[#dee2e6] pb-4 mb-4">收藏清單列表</h3>
              <div v-for="tour in favoriteTours" :key="tour.id" class="flex items-center bg-[#f8f9fa] mb-6">
                <div class="pl-4">
                  <img :src="tour.images[0]?.url" :alt="tour.title" class="w-[120px] h-auto align-middle" />
                </div>
                <div class="relative w-full p-4">
                  <button
                    type="button"
                    class="absolute top-4 right-4 text-[20px] leading-none text-[#adb5bd] opacity-50 hover:opacity-75"
                    aria-label="取消收藏"
                    @click="toggleFavorite(tour.id)"
                  >
                    <span class="i-fa6-xmark" />
                  </button>
                  <p class="font-bold pr-6 text-africa">{{ tour.title }}</p>
                  <p>
                    <span class="text-[60%] text-[#ccc] line-through">
                      原價：{{ formatCurrency(tour.origin_price) }}/{{ tour.unit }}
                    </span>
                  </p>
                  <p class="mb-1 text-[14px] text-[#6c757d]">
                    特價：{{ formatCurrency(tour.price) }} / {{ tour.unit }}
                  </p>
                  <div class="flex justify-end">
                    <RouterLink
                      :to="`/products/${tour.id}`"
                      class="mt-2 inline-flex items-center gap-1 px-3 py-[6px] border border-secondary bg-secondary text-white hover:bg-secondary-dark hover:border-secondary-dark transition-colors"
                    >
                      了解更多
                      <span class="i-fa6-chevron-right" />
                    </RouterLink>
                  </div>
                </div>
              </div>
            </template>

            <template v-else>
              <h3 class="text-[28px] font-medium leading-[1.2] border-b border-[#dee2e6] pb-4 mb-4">
                您尚未有任何收藏行程喔！
              </h3>
              <div class="flex justify-end">
                <RouterLink
                  to="/products"
                  class="inline-flex items-center gap-1 px-3 py-[6px] border border-secondary bg-secondary text-white hover:bg-secondary-dark hover:border-secondary-dark transition-colors"
                >
                  前去逛逛
                  <span class="i-fa6-chevron-right" />
                </RouterLink>
              </div>
            </template>
          </div>
        </div>
      </div>
    </section>

    <!-- 熱門推薦用 TourLinkCard：TourCard 帶有「熱門」標籤，放在推薦區每張都會標示 -->
    <section v-if="!loading && popularTours.length" class="pb-[60px]">
      <div class="bs-container">
        <SectionTitle title="熱門推薦" tag="h3" class="mb-12" />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[30px]">
          <TourLinkCard v-for="tour in popularTours" :key="tour.id" :tour="tour" />
        </div>
      </div>
    </section>
  </main>
</template>
