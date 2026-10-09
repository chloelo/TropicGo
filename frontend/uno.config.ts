import { defineConfig, presetAttributify, presetIcons, presetWind3 } from 'unocss'

// region.ts 裡的 REGION_BG / REGION_TEXT 這種「存在物件裡、執行時才查表取出」的 class 字串,
// UnoCSS 單純掃原始碼文字抓不全(只有 .vue 範本裡出現過的才會穩定被抓到),用 safelist 明確列出來保證一定會產生對應的 CSS
const REGION_SLUGS = ['world', 'asia', 'america', 'africa', 'oceania']

export default defineConfig({
  safelist: [
    ...REGION_SLUGS.map((slug) => `bg-${slug}`),
    ...REGION_SLUGS.map((slug) => `text-${slug}`),
  ],
  shortcuts: {
    // 照舊版 Bootstrap .container 的斷點寬度做的容器(非滿版,寬度到某個斷點就鎖住、置中),
    // 不是 Tailwind 預設那種單純設 max-width+padding 的寫法,平板尺寸才會跟舊版一樣有較大的左右留白
    'bs-container': 'w-full mx-auto px-[15px] max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]',
    // 舊版 _utilities.scss 的 .zones:前台每個段落統一上下 60px
    zones: 'py-[60px]',
  },
  theme: {
    colors: {
      // 照舊版 _variables.scss 的 $theme-colors map-merge 搬過來(primary 實際被覆寫成 $africa,不是 Bootstrap 預設的藍色)
      // dark = 舊版 Bootstrap 實心按鈕 hover 的顏色(背景 darken 7.5%),用法 hover:bg-primary-dark
      primary: { DEFAULT: '#a36549', dark: '#89553d' },
      secondary: { DEFAULT: '#627d52', dark: '#506643' },
      asia: '#957042',
      america: '#955442',
      africa: '#a36549',
      oceania: '#497d8d',
      world: '#456996',
      sunbright: '#ffd629',
      sun: '#fdb42d',
      alert: '#d82c4f',
    },
  },
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({
      // 用到哪個 icon,build 時才轉成小小的 inline SVG,不是載入整包 FontAwesome
      collections: {
        fa6: () => import('@iconify-json/fa6-solid/icons.json').then((i) => i.default),
        'fa6-regular': () => import('@iconify-json/fa6-regular/icons.json').then((i) => i.default),
        'fa6-brands': () => import('@iconify-json/fa6-brands/icons.json').then((i) => i.default),
        // 只用到一個,不為它裝整包套件,直接貼 SVG。來源:Boxicons user-square-filled(MIT,https://github.com/box-icons/boxicons-core)
        // viewBox 從原本的 0 0 24 24 裁成跟 Font Awesome 方塊 icon 同比例(448:512)、方塊同樣填滿寬度,
        // 跟 footer 旁邊的 GitHub/LinkedIn 放在一起才會一樣大
        boxicons: {
          'user-square-filled':
            '<svg xmlns="http://www.w3.org/2000/svg" width="0.875em" height="1em" viewBox="3 1.714 18 20.571"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-4 7c0 1.71-1.29 3-3 3s-3-1.29-3-3s1.29-3 3-3s3 1.29 3 3m-8.9 9a5 5 0 0 1 4.9-4h2c2.41 0 4.43 1.72 4.9 4z"/></svg>',
        },
      },
      // 沒有這個的話 icon 的 <span> 預設是 inline,CSS 的 width/height 對 inline 的非替換元素不生效,
      // icon 會整個塌縮成 0x0 看不見(header 的愛心/購物車、footer 的社群 icon 都中這個)
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
})
