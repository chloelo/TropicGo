<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { api } from '@/api/client'
  import type { Region, Tour } from '@/api/tropicgo-api'
  import HeroBanner from '@/components/front/HeroBanner.vue'
  import TourCard from '@/components/front/TourCard.vue'
  import { HERO_IMAGES } from '@/utils/hero-images'
  import { REGION_ICON, sortRegions } from '@/utils/region'

  const route = useRoute()
  const router = useRouter()
  const regions = ref<Region[]>([])
  const tours = ref<Tour[]>([])
  const activeSlug = ref<string | null>(null)
  const loading = ref(false)

  // 舊版是 Bootstrap 的 .btn-{地區色}:hover 底色 darken 7.5%、active darken 10%。
  // 選中的分類直接用 active 色,同一時間只套一組顏色 class,不會跟 hover 互相競爭
  const TAB_COLOR: Record<string, { base: string; active: string }> = {
    world: { base: 'bg-world hover:bg-[#39577c]', active: 'bg-[#355173]' },
    asia: { base: 'bg-asia hover:bg-[#7a5c36]', active: 'bg-[#725532]' },
    america: { base: 'bg-america hover:bg-[#7a4536]', active: 'bg-[#724032]' },
    africa: { base: 'bg-africa hover:bg-[#89553d]', active: 'bg-[#804f39]' },
    oceania: { base: 'bg-oceania hover:bg-[#3c6774]', active: 'bg-[#385f6b]' },
  }

  const tabs = computed(() => [
    { slug: null, colorKey: 'world', name: '全部' },
    ...regions.value.map((r) => ({ slug: r.slug, colorKey: r.slug, name: r.name })),
  ])

  function tabClass(slug: string | null, colorKey: string) {
    const color = TAB_COLOR[colorKey]
    if (!color) return 'bg-gray-400'
    return activeSlug.value === slug ? color.active : color.base
  }

  async function loadTours() {
    loading.value = true
    try {
      const { data } = await api.tours.getTours(
        activeSlug.value ? { region: activeSlug.value } : {},
      )
      tours.value = data.data
    } finally {
      loading.value = false
    }
  }

  // 篩選狀態以網址的 ?region= 為準:切 tab 只改網址,實際載入交給下面的 watch。
  // 用 replace 不多塞瀏覽紀錄,從詳情頁按上一頁會回到帶著正確 query 的列表
  function selectRegion(slug: string | null) {
    router.replace({ query: slug ? { region: slug } : {} })
  }

  watch(
    () => route.query.region,
    (region) => {
      activeSlug.value = typeof region === 'string' ? region : null
      loadTours()
    },
    { immediate: true },
  )

  onMounted(async () => {
    const { data } = await api.regions.getRegions()
    regions.value = sortRegions(data.data)
  })
</script>

<template>
  <main>
    <HeroBanner
      title="用心為您規劃的精美行程"
      :bg-desktop="HERO_IMAGES.products.desktop"
      :bg-mobile="HERO_IMAGES.products.mobile"
      desktop-position="50% 65%"
      mobile-position="50% 50%"
      title-bottom="15%"
    />

    <section class="bs-container pb-8">
      <!-- 舊版 .wrap 是 margin-top:-80px,但外層 .zones 有 padding-top:60px,
           兩者相抵實際只往上疊 20px,只壓到 KV 下緣一點點 -->
      <!-- 舊版每格 .category 寬 160px、不換行,手機寬度不夠時 5 格一起縮窄塞在同一排;
           按鈕寬是格子寬減 30px(手機減 3px),按鈕之間的間距就是這樣來的,不是用 gap -->
      <div class="flex justify-center -mt-5 relative z-10 mb-10">
        <div v-for="tab in tabs" :key="tab.colorKey" class="w-[160px] flex justify-center">
          <button
            class="w-[calc(100%-3px)] p-[0.1rem] md:w-[calc(100%-30px)] md:p-[0.2rem] md:pt-[0.4rem] border border-transparent flex flex-col items-center justify-center shadow transition-colors"
            :class="tabClass(tab.slug, tab.colorKey)"
            @click="selectRegion(tab.slug)"
          >
            <img :src="REGION_ICON[tab.colorKey]" :alt="tab.name" class="max-w-[40px] md:max-w-[50px]" />
            <h4 class="my-[5px] text-white text-[18px] leading-[1.2]">{{ tab.name }}</h4>
          </button>
        </div>
      </div>

      <!-- 載入中的提示交給全域 loader,這裡只先撐住高度 -->
      <div v-if="loading" class="min-h-[400px]" />
      <div v-else-if="tours.length === 0" class="text-center text-gray-400 py-12">
        目前沒有符合的行程
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <TourCard v-for="tour in tours" :key="tour.id" :tour="tour" />
      </div>
    </section>
  </main>
</template>
