<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { api } from '@/api/client'
  import type { Tour } from '@/api/tropicgo-api'
  import HeroBanner from '@/components/front/HeroBanner.vue'
  import SectionTitle from '@/components/front/SectionTitle.vue'
  import TourCard from '@/components/front/TourCard.vue'
  import { useFavorites } from '@/composables/use-favorites'
  import { formatCurrency } from '@/utils/format'
  import { HERO_IMAGES } from '@/utils/hero-images'

  const { favoriteIds, toggleFavorite } = useFavorites()
  const tours = ref<Tour[]>([])
  const loading = ref(true)

  const favoriteTours = computed(() => tours.value.filter((t) => favoriteIds.value.includes(t.id!)))
  const popularTours = computed(() => tours.value.filter((t) => t.is_popular))

  onMounted(async () => {
    loading.value = true
    try {
      const { data } = await api.tours.getTours({})
      tours.value = data.data ?? []
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
    <section class="max-w-4xl mx-auto px-[15px] pt-16 lg:pt-[120px] pb-8">
      <!-- 載入中的提示交給全域 loader,這裡只先撐住高度 -->
      <div v-if="loading" class="min-h-[300px]" />

      <template v-else-if="favoriteTours.length">
        <h3 class="text-lg font-bold text-gray-800 pb-3 mb-3 border-b border-gray-200">收藏清單列表</h3>
        <div
          v-for="tour in favoriteTours"
          :key="tour.id"
          class="flex items-center gap-4 bg-gray-50 mb-4 p-3"
        >
          <img
            :src="tour.images?.[0]?.url"
            :alt="tour.title"
            loading="lazy"
            class="w-[120px] aspect-[4/3] object-cover shrink-0"
          />
          <div class="relative flex-1 min-w-0 p-3">
            <button
              class="absolute top-0 right-0 text-gray-400 hover:text-alert text-lg"
              @click="toggleFavorite(tour.id!)"
            >
              <span class="i-fa6-xmark" />
            </button>
            <p class="font-bold text-africa pr-6 line-clamp-1">{{ tour.title }}</p>
            <p class="text-sm text-gray-400 mt-1">
              <span class="line-through">原價：{{ formatCurrency(tour.origin_price) }}/人</span>
            </p>
            <p class="text-sm text-gray-500 mt-1">
              特價：{{ formatCurrency(tour.price) }} / {{ tour.unit }}
            </p>
            <div class="flex justify-end mt-2">
              <RouterLink
                :to="`/products/${tour.id}`"
                class="inline-flex items-center gap-2 bg-secondary text-white text-sm px-4 py-2 hover:opacity-90 transition-opacity"
              >
                了解更多
                <span class="i-fa6-chevron-right text-xs" />
              </RouterLink>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <h3 class="text-lg font-bold text-gray-800 pb-3 mb-3 border-b border-gray-200">
          您尚未有任何收藏行程喔！
        </h3>
        <div class="flex justify-end">
          <RouterLink
            to="/products"
            class="inline-flex items-center gap-2 bg-secondary text-white px-4 py-2 hover:opacity-90 transition-opacity"
          >
            前去逛逛
            <span class="i-fa6-chevron-right text-xs" />
          </RouterLink>
        </div>
      </template>
    </section>

    <!-- 熱門推薦 -->
    <section v-if="!loading && popularTours.length" class="bs-container pb-16">
      <SectionTitle title="熱門推薦" tag="h3" class="mb-12" />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <TourCard v-for="tour in popularTours" :key="tour.id" :tour="tour" />
      </div>
    </section>
  </main>
</template>
