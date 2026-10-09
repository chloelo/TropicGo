<script setup lang="ts">
  withDefaults(
    defineProps<{
      title: string
      bgDesktop: string
      bgMobile?: string
      desktopPosition?: string
      mobilePosition?: string
      overlay?: number
      align?: 'left' | 'right'
      titleBottom?: string
    }>(),
    {
      bgMobile: undefined,
      desktopPosition: '50% 0',
      mobilePosition: '50% 0',
      overlay: 0.4,
      align: 'left',
      titleBottom: '10%',
    },
  )
</script>

<template>
  <section class="relative h-[300px] md:h-[450px] overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-no-repeat"
      :class="bgMobile ? 'hidden md:block' : ''"
      :style="{ backgroundImage: `url(${bgDesktop})`, backgroundPosition: desktopPosition }"
    />
    <!-- 手機版跟舊版一樣用圖片原尺寸(800x600),不用 cover:各頁的 mobilePosition(例如 50% -160px)
         是照原尺寸算的往上位移,cover 會先把圖縮成 300px 高,再往上推就露出底下的灰色遮罩 -->
    <div
      v-if="bgMobile"
      class="absolute inset-0 bg-no-repeat md:hidden"
      :style="{ backgroundImage: `url(${bgMobile})`, backgroundPosition: mobilePosition }"
    />
    <div class="absolute inset-0 bg-black" :style="{ opacity: overlay }" />
    <div class="absolute inset-x-0" :style="{ bottom: titleBottom }">
      <!-- 舊版是 .container > .row.justify-content-end > .col-md-6:標題只佔容器右半欄,
           60px 的字在半欄裡放不下就自然折成兩行。text-[60px] 這種任意值只設字級不帶行高,
           會吃到 Naive UI 全域的 line-height:1.6,所以補上舊版 Bootstrap heading 的 1.2;
           mb-2 是 Bootstrap heading 預設的 margin-bottom(.5rem),base.css 把它歸零了 -->
      <div class="bs-container">
        <div class="flex justify-end -mx-[15px]">
          <div class="w-full md:w-1/2 px-[15px]">
            <h2
              class="mb-2 text-white text-[30px] md:text-[42px] lg:text-[60px] font-bold leading-[1.2]"
              :class="align === 'right' ? 'text-right' : ''"
            >
              {{ title }}
            </h2>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
