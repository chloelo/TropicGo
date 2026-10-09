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

  // 新增的真實行程剛好對應首頁原本的「特別精選」兩個推薦(墨西哥 / 埃及),
  // 用標題比對找出來,連結才會真的指向有效的產品細項頁(修正舊版沒有連結的問題)。
  // 特別精選的墨西哥文案主題是馬雅古文明/世界文化遺產,要對應猶加敦這筆,不是坎昆海灘渡假
  // (坎昆那筆內容不符合文案主題,已經整筆移除)
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
      <!-- padding 跟寬度限制要分兩層:外層只負責跟螢幕邊緣留白(padding),
           內層才限制寬度(跟著 h2 各斷點字級換算的 12em:30px/42px/60px → 360/504/720px)。
           兩個放同一層會互相干擾——padding 包在 max-width 裡面會把可用寬度吃掉,字還沒到 12em 就先換行了 -->
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

    <!-- 想好要去哪了嗎:照舊版 .zone_category 的 Bootstrap 結構——文字 .col-lg-4 + 卡片 .col-lg-8,
         卡片各 .col-lg-3 .col-md-6,欄距 30px;上 padding 桌機 120px、992px 以下 60px,下 padding 60px -->
    <section class="bs-container pt-[60px] lg:pt-[120px] pb-[60px]">
      <div class="flex flex-wrap -mx-[15px]">
        <div class="w-full lg:w-4/12 px-[15px] mb-8 lg:mb-0">
          <h2 class="text-[32px] font-medium leading-[1.2] mb-2">想好要去哪了嗎？</h2>
          <p class="mb-4">還沒有想法的話，來這裡找找吧，也許會有意外的驚奇。</p>
        </div>
        <!-- 平板(md,2 欄)時亞洲/非洲會往上位移 50px,跟上面文字只隔 32px 的話會蓋到文字,
             所以補一段平板專屬的上緣緩衝空間 -->
        <div class="w-full lg:w-8/12 px-[15px] md:mt-[50px] lg:mt-0">
          <div class="flex flex-wrap -mx-[15px] gap-y-[15px] md:gap-y-0">
            <!-- -50px 位移要放在「跟進場動畫不同的元素」上——zoom-in 動畫本身也是用 transform(scale),
                 寫在同一個元素上兩個會搶同一個 transform 屬性,位移會整個不見。
                 外層負責欄位和位移,內層 RouterLink 負責動畫 -->
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

    <!-- 特別精選:欄位切法、間距照舊版 Index.vue 的 Bootstrap 結構——
         .container > .row.mt-5 > .col-md-6 ×2,內層 .row > .col-lg-5(國名)+ .col-lg-7(內文);
         用 flex + 負 margin + 15px 內距重現 Bootstrap 的 30px 欄距,欄寬才會跟舊版一模一樣 -->
    <section
      class="relative zones bg-no-repeat bg-center"
      :style="{ backgroundColor: '#fffbf9', backgroundImage: `url(${HERO_IMAGES.index.zoneSelectedBg})` }"
    >
      <div class="bs-container">
        <SectionTitle title="特別精選" />

        <!-- 舊版標題 mb 8px + 這排 mt-5 48px 在 flex 的 .row 裡不會重疊,實際是 56px -->
        <div v-if="pickMexico" class="flex flex-wrap items-center -mx-[15px] mt-[56px]">
          <div class="w-full md:w-1/2 px-[15px]">
            <!-- 舊版 .num-wrap 外層是 relative + overflow-x:hidden,裝飾線寬度是「整個欄位寬度 + 35px」,
                 不是只貼著「01」數字本身,用容器寬度撐開才會看起來延伸一整條。.num 本身是 inline-block
                 (不是 plain inline span),容器高度才會貼齊數字視覺範圍,底線 bottom-[5px] 才會落在
                 數字色塊下緣內側、往上一點點,而不是陷進色塊中間或跟色塊邊緣完全重疊 -->
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
                    class="flex items-center gap-1 bg-secondary text-white px-[15px] py-[6px] mb-[30px] hover:opacity-90 transition-opacity"
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

        <!-- 舊版埃及這排沒有 align-items-center,圖片跟內文都靠上對齊(只有墨西哥那排是垂直置中) -->
        <div v-if="pickEgypt" class="flex flex-wrap -mx-[15px] mt-12">
          <!-- 埃及在桌機是「圖在左、文在右」,markup 裡圖片寫在前面,手機沒有 order 的話就會維持 DOM 順序,
               變成圖片跑到 02 方框上面——手機也要明講順序,確保永遠是「方框>標題>內文>按鈕>照片」 -->
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
                    class="flex items-center gap-1 bg-secondary text-white px-[15px] py-[6px] mb-[30px] hover:opacity-90 transition-opacity"
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

    <!-- 享生活/享美食/享樂 -->
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

      <!-- 舊版是 no-gutters(0 間距),整塊照片+引言拼在一起看起來像一體的拼貼,不是分開的卡片。
           手機版面是另一套排法(不是直接把桌機 12 欄收成 1 欄),10 個項目在兩種斷點只有「照片1/引言1」
           順序互換,其餘完全相同,用 order 明確控制,照片給基本高度、引言手機不強制跟照片同高只看內文 -->
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
