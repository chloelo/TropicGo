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
    <section class="bs-container pt-16 lg:pt-[100px] pb-8">
      <div class="grid md:grid-cols-2 gap-10 items-center">
        <img :src="HERO_IMAGES.about.content[0]" alt="關於 TropicGo" class="w-full relative z-10" />
        <div class="relative bg-[#f3ece9] border-r-4 md:border-r-4 border-b-4 md:border-b-0 border-africa p-6">
          <h2 class="text-xl font-bold mb-3">關於 TropicGo</h2>
          <p class="text-gray-600 leading-relaxed">
            不管做什麼事情，有熱情才有持之以恆的動力，曾經我們也尋尋覓覓，關於自己、未來、生活……在追求什麼？每個人都有自己認定的答案，也許終其一生都不一定找的到。
          </p>
          <p class="text-gray-600 leading-relaxed mt-4">
            一路上會迷惘，會猶豫，甚至撞得頭破血流，結果從來不是結局，過程才是最精采豐富的，不管多麼辛苦、沮喪，都不要忘記自己對生活的渴望與熱情。
          </p>
          <p class="text-gray-600 leading-relaxed mt-4">
            TropicGo
            正是這樣的存在，因為我們什麼沒有，最多的就是熱情了，當你沒有了動力往前，想要休息充電，想要讓自己沉澱，就來這裡逛逛吧，或多或少都會讓你感染一些我們想要帶給您如陽光般和煦的溫暖。
          </p>
        </div>
      </div>
    </section>

    <!-- 裝飾banner -->
    <section class="pt-4">
      <img :src="HERO_IMAGES.about.content[1]" alt="" class="w-full hidden md:block" />
      <img :src="HERO_IMAGES.about.content[2]" alt="" class="w-full md:hidden" />
    </section>

    <!-- TropicGo 成員 -->
    <section class="bs-container py-16">
      <SectionTitle title="TropicGo 成員" class="mb-12" />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="member in crew" :key="member.role" class="shadow-[0_0_6px_rgba(209,213,219,0.8)]">
          <img :src="member.photo" :alt="member.role" class="w-full aspect-[4/3] object-cover" />
          <div class="p-4">
            <h3 class="font-bold text-gray-800 mb-2">{{ member.role }}</h3>
            <p class="text-sm text-gray-500">{{ member.text }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
