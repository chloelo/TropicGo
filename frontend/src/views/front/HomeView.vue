<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { api } from '@/api/client'
  import type { Region, Tour } from '@/api/tropicgo-api'
  import iconFood from '@/assets/images/icon-food.png'
  import iconJoy from '@/assets/images/icon-joy.png'
  import iconLife from '@/assets/images/icon-life.png'
  import SectionTitle from '@/components/front/SectionTitle.vue'
  import { HERO_IMAGES } from '@/utils/hero-images'
  import { REGION_BG, REGION_ICON, REGION_TEASER, REGION_TEXT, sortRegions } from '@/utils/region'

  const regions = ref<Region[]>([])
  const tours = ref<Tour[]>([])
  const showPromoModal = ref(false)

  const lifeItems = [
    { icon: iconLife, label: '享生活' },
    { icon: iconFood, label: '享美食' },
    { icon: iconJoy, label: '享樂' },
  ]

  const testimonials = computed(() => HERO_IMAGES.index.testimonials)
  const quotes = [
    {
      text: '有些事情現在不做，以後也做不了了，只要踏出一步，視野就會不同，為自己勇敢一次！',
      author: '台中 王曉明',
      bg: 'bg-asia text-white',
    },
    {
      text: '旅行就是一碰上就戒不掉的癮，這癮有毒但我不想戒，TropicGo 的行程真的太好玩 ~不來的不是彼得是後悔！',
      author: '花蓮 郝美麗',
      bg: 'bg-gray-100 text-gray-700',
    },
    {
      text: '在宇宙之間，我們是如此渺小，人生很短，你我都很珍貴，把握當下。有夢就追，熱情要及時，快樂很簡單。',
      author: '台北 文清風',
      bg: 'bg-africa text-white',
    },
  ]

  function bgStyle(url: string) {
    return { backgroundImage: `url(${url})` }
  }

  // 「特別精選」的兩個推薦用標題找出對應的產品，「了解更多」才連得到詳情頁
  const pickMexico = computed(() => tours.value.find((t) => t.title.includes('墨西哥猶加敦')))
  const pickEgypt = computed(() => tours.value.find((t) => t.title.includes('埃及開羅')))

  onMounted(async () => {
    const [{ data: regionRes }, { data: tourRes }] = await Promise.all([
      api.regions.getRegions(),
      api.tours.getTours({}),
    ])
    regions.value = sortRegions(regionRes.data)
    tours.value = tourRes.data
  })
</script>

<template>
  <main>
    <!-- Hero -->
    <section
      class="relative h-screen min-h-[480px] flex items-center justify-center lg:justify-end overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-cover bg-top bg-fixed"
        :style="{ backgroundImage: `url(${HERO_IMAGES.index.hero})` }"
      />
      <div class="absolute inset-0 bg-black/40" />
      <!-- 留白和寬度限制分兩層：padding 放在 max-width 裡會吃掉可用寬度，標題會提早換行 -->
      <div class="relative z-10 text-white px-4 md:px-12 lg:px-[120px]">
        <div class="max-w-[360px] md:max-w-[504px] lg:max-w-[720px]">
          <h2
            v-aos:zoom-in
            data-aos-duration="1000"
            data-aos-delay="50"
            class="text-white text-[30px] md:text-[42px] lg:text-[60px] font-bold leading-tight"
          >
            藏在回歸線裡的<span class="text-sun">熱情</span>面紗，等你來一探究竟！
          </h2>
          <div v-aos:fade-up data-aos-delay="500" class="mt-6 w-full flex justify-around gap-4">
          <button
            type="button"
            class="w-[48%] py-2 border border-white font-bold opacity-90 hover:opacity-100 transition-opacity"
            @click="showPromoModal = true"
          >
            查優惠
          </button>
          <RouterLink
            to="/products"
            class="w-[48%] py-2 text-center bg-white text-africa font-bold opacity-90 hover:opacity-100 transition-opacity"
          >
            找行程
          </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- 想好要去哪了嗎 -->
    <section class="bs-container pt-[60px] lg:pt-[120px] pb-[60px]">
      <div class="flex flex-wrap -mx-[15px]">
        <div class="w-full lg:w-4/12 px-[15px] mb-8 lg:mb-0">
          <h2 class="text-[32px] font-medium leading-[1.2] mb-2">想好要去哪了嗎？</h2>
          <p class="mb-4">還沒有想法的話，來這裡找找吧，也許會有意外的驚奇。</p>
        </div>
        <!-- 平板時亞洲、非洲卡片會往上位移 50px，這裡多留空間，避免蓋到上面的文字 -->
        <div class="w-full lg:w-8/12 px-[15px] md:mt-[50px] lg:mt-0">
          <div class="flex flex-wrap -mx-[15px] gap-y-[15px] md:gap-y-0">
            <!-- 位移放外層、進場動畫放內層：兩者都用 transform，放在同一個元素上位移會被動畫蓋掉 -->
            <div
              v-for="region in regions"
              :key="region.id"
              class="w-full md:w-1/2 lg:w-1/4 px-[15px] md:mb-[15px] lg:mb-0"
              :class="region.slug === 'asia' || region.slug === 'africa' ? 'md:-translate-y-[50px]' : ''"
            >
              <RouterLink
                v-aos:zoom-in
                :to="{ path: '/products', query: { region: region.slug } }"
                class="h-full p-[15px] text-center text-white flex flex-col items-center shadow transition-transform hover:-translate-y-1"
                :class="REGION_BG[region.slug] ?? 'bg-gray-400'"
              >
                <img :src="REGION_ICON[region.slug]" :alt="region.name" class="w-16" />
                <h3
                  class="my-4 pb-[15px] w-full text-[28px] font-medium leading-[1.2] border-b-2 border-dotted border-white/60"
                >
                  {{ region.name }}
                </h3>
                <p class="mb-4">{{ REGION_TEASER[region.slug] }}</p>
                <span
                  class="w-full bg-white px-[15px] py-[6px]"
                  :class="REGION_TEXT[region.slug] ?? 'text-gray-600'"
                >
                  立即前往
                </span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 特別精選 -->
    <section
      class="relative zones bg-no-repeat bg-center"
      :style="{ backgroundColor: '#fffbf9', backgroundImage: `url(${HERO_IMAGES.index.zoneSelectedBg})` }"
    >
      <div class="bs-container">
        <SectionTitle title="特別精選" />

        <div v-if="pickMexico" class="flex flex-wrap items-center -mx-[15px] mt-[56px]">
          <div class="w-full md:w-1/2 px-[15px]">
            <!-- 裝飾線比欄位再長 35px，超出的部分由外層 overflow-hidden 裁掉；
                 數字用 inline-block，底線才會貼在數字色塊的下緣 -->
            <div class="relative overflow-hidden mb-[30px]">
              <span class="text-[32px] lg:text-[56px] inline-block text-white bg-africa px-[10px]">01</span>
              <span class="absolute left-0 bottom-[5px] w-[calc(100%+35px)] h-[5px] bg-africa" />
            </div>
            <div class="flex flex-wrap -mx-[15px]">
              <div class="w-full lg:w-5/12 px-[15px]">
                <h3 class="text-[32px] lg:text-[56px] font-medium leading-[1.2] mb-2 text-primary">墨西哥</h3>
              </div>
              <div v-aos:zoom-in class="w-full lg:w-7/12 px-[15px]">
                <p class="mb-4">一生必去墨西哥的三大理由：</p>
                <ul class="list-disc pl-5 mb-4">
                  <li>
                    墨式美味：墨西哥料理可以說是拉丁美洲的翹楚，莫蕾醬巧克力嫩雞和仙人掌料理等其他地方吃不到的獨特美味，是世界上少數可以吃的下肚的世界文化遺產！
                  </li>
                  <li>
                    拉美古文明的搖籃：千年來璀燦奪目孕育無數美洲古文明如馬雅、阿茲特克和托爾特克，不僅被譽為世界上最偉大、也是拉美國家中少數能同時保存西班牙殖民和美洲古文明的國度之一。
                  </li>
                  <li>
                    世界文化遺產大國：截至 2017 年 9 月，墨國境內就囊括 27 項世界文化遺產、6 項自然遺產，總數量美洲排名第一！
                  </li>
                </ul>
                <div class="flex justify-end">
                  <RouterLink
                    :to="`/products/${pickMexico.id}`"
                    class="flex items-center gap-1 bg-secondary text-white px-[15px] py-[6px] mb-[30px] hover:bg-secondary-dark transition-colors"
                  >
                    了解更多
                    <span class="i-fa6-chevron-right text-xs" />
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 px-[15px]">
            <img v-aos:zoom-in :src="HERO_IMAGES.index.pickMexico" alt="墨西哥" class="w-full" />
          </div>
        </div>

        <!-- 刻意不垂直置中（原設計）：這排圖文都靠上對齊，跟墨西哥那排不同 -->
        <div v-if="pickEgypt" class="flex flex-wrap -mx-[15px] mt-12">
          <!-- 桌機圖在左、文在右；手機用 order 讓圖片排到最後 -->
          <div class="w-full md:w-1/2 px-[15px] order-2 md:order-1">
            <img v-aos:zoom-in :src="HERO_IMAGES.index.pickEgypt" alt="埃及" class="w-full" />
          </div>
          <div class="w-full md:w-1/2 px-[15px] order-1 md:order-2">
            <div class="relative overflow-hidden mb-[30px]">
              <span class="text-[32px] lg:text-[56px] inline-block text-white bg-africa px-[10px]">02</span>
              <span class="absolute left-0 bottom-[5px] w-[calc(100%+35px)] h-[5px] bg-africa" />
            </div>
            <div class="flex flex-wrap -mx-[15px]">
              <div class="w-full lg:w-5/12 px-[15px]">
                <h3 class="text-[32px] lg:text-[56px] font-medium leading-[1.2] mb-2 text-primary">埃及</h3>
              </div>
              <div v-aos:zoom-in class="w-full lg:w-7/12 px-[15px]">
                <p class="mb-4">
                  神秘而多樣化的金字塔，乃至奇幻的紅海風光；夢想中的尼羅河乘船泛遊，更有那三千年歷史的阿布辛貝世界級遺跡！TropicGo
                  精心安排搭配多段埃及國內線班機，省卻艷陽下長途行車或搭乘夜間火車之苦，讓您的埃及之旅於輕鬆悠閒中，絕無遺珠之憾！
                </p>
                <div class="flex justify-end">
                  <RouterLink
                    :to="`/products/${pickEgypt.id}`"
                    class="flex items-center gap-1 bg-secondary text-white px-[15px] py-[6px] mb-[30px] hover:bg-secondary-dark transition-colors"
                  >
                    了解更多
                    <span class="i-fa6-chevron-right text-xs" />
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 享生活、享美食、享樂 -->
    <section
      class="relative zones bg-cover bg-center bg-no-repeat bg-fixed"
      :style="{ backgroundImage: `url(${HERO_IMAGES.index.zoneDecBg})` }"
    >
      <div class="absolute inset-0 bg-black/60" />
      <div class="bs-container relative grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="item in lifeItems"
          :key="item.label"
          v-aos:zoom-in
          class="border border-white py-8 px-4 text-center text-white"
        >
          <img :src="item.icon" :alt="item.label" class="max-w-[100px] mx-auto" />
          <p class="mt-3 text-lg">{{ item.label }}</p>
        </div>
      </div>
    </section>

    <!-- 旅客怎麼說 -->
    <section class="bs-container zones">
      <SectionTitle title="旅客怎麼說" class="mb-12" />

      <!-- 照片和引言無間距拼貼；手機和桌機只有第一組照片、引言的順序對調，用 order 控制 -->
      <div class="grid grid-cols-2 md:grid-cols-12 gap-0">
        <div
          v-aos:flip-up
          class="order-1 md:order-2 col-span-2 md:col-span-3 min-h-[180px] md:min-h-[220px] bg-cover bg-center"
          :style="bgStyle(testimonials[0])"
        />
        <blockquote
          v-aos:zoom-in
          class="order-2 md:order-1 col-span-2 md:col-span-3 md:min-h-[220px] p-4 flex flex-col justify-around"
          :class="quotes[0].bg"
        >
          <p>{{ quotes[0].text }}</p>
          <footer class="text-right text-sm mt-2 italic">&mdash; {{ quotes[0].author }}</footer>
        </blockquote>
        <div
          v-aos:flip-up
          class="order-3 col-span-2 md:col-span-6 min-h-[180px] md:min-h-[220px] bg-cover bg-center"
          :style="bgStyle(testimonials[1])"
        />

        <div
          v-aos:flip-up
          class="order-4 col-span-1 md:col-span-3 min-h-[180px] md:min-h-[220px] bg-cover bg-center"
          :style="bgStyle(testimonials[2])"
        />
        <div
          v-aos:flip-up
          class="order-5 col-span-1 md:col-span-3 min-h-[180px] md:min-h-[220px] bg-cover bg-center"
          :style="bgStyle(testimonials[3])"
        />
        <blockquote
          v-aos:zoom-in
          class="order-6 col-span-1 md:col-span-3 md:min-h-[220px] p-4 flex flex-col justify-around"
          :class="quotes[1].bg"
        >
          <p>{{ quotes[1].text }}</p>
          <footer class="text-right text-sm mt-2 italic">&mdash; {{ quotes[1].author }}</footer>
        </blockquote>
        <div
          v-aos:flip-up
          class="order-7 col-span-1 md:col-span-3 min-h-[180px] md:min-h-[220px] bg-cover bg-center"
          :style="bgStyle(testimonials[4])"
        />

        <div
          v-aos:flip-up
          class="order-8 col-span-2 md:col-span-3 min-h-[180px] md:min-h-[220px] bg-cover bg-center"
          :style="bgStyle(testimonials[5])"
        />
        <blockquote
          v-aos:zoom-in
          class="order-9 col-span-2 md:col-span-6 md:min-h-[220px] p-4 flex flex-col justify-around"
          :class="quotes[2].bg"
        >
          <p>{{ quotes[2].text }}</p>
          <footer class="text-right text-sm mt-2 italic">&mdash; {{ quotes[2].author }}</footer>
        </blockquote>
        <div
          v-aos:flip-up
          class="order-10 col-span-2 md:col-span-3 min-h-[180px] md:min-h-[220px] bg-cover bg-center"
          :style="bgStyle(testimonials[6])"
        />
      </div>
    </section>

    <!-- 查優惠彈窗 -->
    <n-modal v-model:show="showPromoModal">
      <n-card
        title="最新優惠"
        closable
        class="max-w-md"
        :bordered="false"
        @close="showPromoModal = false"
      >
        <img :src="HERO_IMAGES.index.modal" alt="最新優惠" class="w-full" />
      </n-card>
    </n-modal>
  </main>
</template>
