import { defineConfig, presetAttributify, presetIcons, presetWind3 } from 'unocss'

// region.ts 裡存在物件中、執行時才取出的 class 字串，UnoCSS 掃原始碼抓不到，用 safelist 確保一定會產生
const REGION_SLUGS = ['world', 'asia', 'america', 'africa', 'oceania']

export default defineConfig({
  safelist: [
    ...REGION_SLUGS.map((slug) => `bg-${slug}`),
    ...REGION_SLUGS.map((slug) => `text-${slug}`),
    ...REGION_SLUGS.map((slug) => `hover:text-${slug}-link`),
  ],
  shortcuts: {
    // 寬度隨斷點鎖住、置中的容器（Bootstrap .container 的斷點寬度），平板才會有較大的左右留白
    'bs-container': 'w-full mx-auto px-[15px] max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]',
    // 前台每個段落統一上下 60px
    zones: 'py-[60px]',
  },
  theme: {
    colors: {
      // 品牌色：primary 赤陶色、secondary 綠色
      // dark：實心按鈕 hover 的顏色（底色加深 7.5%），用法 hover:bg-primary-dark
      primary: { DEFAULT: '#a36549', dark: '#89553d' },
      secondary: { DEFAULT: '#627d52', dark: '#506643', link: '#3e4f34' },
      // link：連結 hover 的文字色（加深 15%），用法 hover:text-asia-link
      asia: { DEFAULT: '#957042', link: '#60482b' },
      america: { DEFAULT: '#955442', link: '#60362b' },
      africa: { DEFAULT: '#a36549', link: '#6e4431' },
      oceania: { DEFAULT: '#497d8d', link: '#2f505b' },
      world: { DEFAULT: '#456996', link: '#2d4462' },
      sunbright: '#ffd629',
      sun: '#fdb42d',
      alert: '#d82c4f',
    },
  },
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({
      // 用到哪個 icon 才在 build 時轉成 inline SVG，不載入整包 Font Awesome
      collections: {
        fa6: () => import('@iconify-json/fa6-solid/icons.json').then((i) => i.default),
        'fa6-regular': () => import('@iconify-json/fa6-regular/icons.json').then((i) => i.default),
        'fa6-brands': () => import('@iconify-json/fa6-brands/icons.json').then((i) => i.default),
        // 只用到一個，直接貼 SVG，不裝整包套件。來源：Boxicons user-square-filled（MIT，https://github.com/box-icons/boxicons-core）。
        // viewBox 從 0 0 24 24 裁成跟 Font Awesome 方塊 icon 同比例（448:512），放在 GitHub、LinkedIn 旁邊才會一樣大
        boxicons: {
          'user-square-filled':
            '<svg xmlns="http://www.w3.org/2000/svg" width="0.875em" height="1em" viewBox="3 1.714 18 20.571"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-4 7c0 1.71-1.29 3-3 3s-3-1.29-3-3s1.29-3 3-3s3 1.29 3 3m-8.9 9a5 5 0 0 1 4.9-4h2c2.41 0 4.43 1.72 4.9 4z"/></svg>',
        },
      },
      // 沒有這個的話 icon 的 <span> 是 inline，width、height 不生效，icon 會縮成 0x0 看不見
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
})
