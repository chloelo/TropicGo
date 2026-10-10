<script setup lang="ts">
  import HeroBanner from '@/components/front/HeroBanner.vue'
  import SectionTitle from '@/components/front/SectionTitle.vue'
  import { HERO_IMAGES } from '@/utils/hero-images'

  const crew = [
    {
      photo: HERO_IMAGES.about.content[3],
      role: '總經理',
      text: '歡迎來到 TropicGo 這個大家庭，希望能讓各位旅客都感受到賓至如歸，Welcome home.',
    },
    {
      photo: HERO_IMAGES.about.content[4],
      role: '企劃部',
      text: 'Hi，公司的行程內容都是我們的用心的規劃，您還喜歡嗎？喜歡的話記得直接報名參加喔 : )',
    },
    {
      photo: HERO_IMAGES.about.content[5],
      role: '人資部',
      text: '是不是很嚮往這個充滿熱情的公司？如果你也有一樣的特質，一樣想帶給大家歡樂，歡迎你們的加入喔。',
    },
    {
      photo: HERO_IMAGES.about.content[6],
      role: '業務部',
      text: '有參加過行程的貴賓應該都對我們不陌生，我們都會盡量解答各位對行程上的疑惑，有任何問題歡迎提問喔。',
    },
  ]
</script>

<template>
  <main>
    <HeroBanner
      title="對生活抱持熱情"
      align="right"
      :overlay="0"
      :bg-desktop="HERO_IMAGES.about.desktop"
      :bg-mobile="HERO_IMAGES.about.mobile"
      desktop-position="50% 0"
      mobile-position="50% -80px"
    />

    <!-- 關於 TropicGo -->
    <section class="pt-[60px] md:pt-[100px] pb-[60px]">
      <div class="bs-container">
        <div class="flex flex-wrap -mx-[15px]">
          <div class="w-full md:w-1/2 px-[15px]">
            <!-- z-[3]：讓照片疊在右邊文字區的米色底塊上面 -->
            <div class="relative z-[3]">
              <img v-aos:fade-up :src="HERO_IMAGES.about.content[0]" alt="關於 TropicGo" class="max-w-full h-auto align-middle" />
            </div>
          </div>
          <div class="w-full md:w-1/2 px-[15px]">
            <div v-aos:fade-down class="relative p-4">
              <!-- 米色底塊：桌機比文字區大 120%、往左延伸壓到照片底下，往下多 30px 形成高低差；
                   手機剛好包住文字，底線改在下方 -->
              <div
                class="absolute -z-1 bg-[#f3ece9] border-africa w-full h-[105%] top-0 right-0 border-b-[3px] md:w-[120%] md:h-[120%] md:top-auto md:-bottom-[30px] md:-right-[20px] md:border-b-0 md:border-r-[3px]"
              />
              <h2 class="my-4 text-[32px] font-medium leading-[1.2]">關於 TropicGo</h2>
              <p class="mb-4">
                不管做什麼事情，有熱情才有持之以恆的動力，曾經我們也尋尋覓覓，關於自己、未來、生活……在追求什麼？每個人都有自己認定的答案，也許終其一生都不一定找的到。
              </p>
              <p class="mb-4">
                一路上會迷惘，會猶豫，甚至撞得頭破血流，結果從來不是結局，過程才是最精采豐富的，不管多麼辛苦、沮喪，都不要忘記自己對生活的渴望與熱情。
              </p>
              <p class="mb-4">
                TropicGo
                正是這樣的存在，因為我們什麼沒有，最多的就是熱情了，當你沒有了動力往前，想要休息充電，想要讓自己沉澱，就來這裡逛逛吧，或多或少都會讓你感染一些我們想要帶給您如陽光般和煦的溫暖。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 裝飾 banner。這頁的 img 都加 align-middle：圖片預設對齊文字 baseline，下方會多出約 6px 的空隙 -->
    <section class="pt-4">
      <div class="hidden md:block">
        <img v-aos:fade-down :src="HERO_IMAGES.about.content[1]" alt="" class="max-w-full h-auto align-middle" />
      </div>
      <div class="md:hidden">
        <img :src="HERO_IMAGES.about.content[2]" alt="" class="max-w-full h-auto align-middle" />
      </div>
    </section>

    <!-- TropicGo 成員：卡片高度跟著文字長度，不拉成一樣高 -->
    <section class="zones">
      <div class="bs-container">
        <SectionTitle title="TropicGo 成員" class="mb-12" />
        <div class="flex flex-wrap items-start -mx-[15px]">
          <div v-for="member in crew" :key="member.role" class="w-full md:w-1/2 lg:w-1/4 px-[15px]">
            <div v-aos:zoom-in class="shadow-[0_0_6px_#dee2e6] mb-[30px]">
              <img :src="member.photo" :alt="member.role" class="max-w-full h-auto align-middle" />
              <div class="p-[15px]">
                <h3 class="text-[24px] font-medium leading-[1.2] mb-2 pb-[10px] border-b border-[#dee2e6]">
                  {{ member.role }}
                </h3>
                <p class="mb-4">{{ member.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
