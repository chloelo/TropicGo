import iconAfrica from '@/assets/images/icon-africa.png'
import iconAmerica from '@/assets/images/icon-america.png'
import iconAsia from '@/assets/images/icon-asia.png'
import iconOceania from '@/assets/images/icon-oceania.png'
import iconWorld from '@/assets/images/icon-world.png'

// 舊版 ProductsFilter.vue 的分類是寫死在陣列裡的固定順序(亞洲/美洲/非洲/大洋洲),
// 這裡改成從 API 撈,但 API 沒有保證順序,後端回傳順序不穩定會讓首頁卡片的交錯位移效果跑掉
// (例如非洲剛好跟大洋洲疊在同一欄),所以撈回來後統一照這個固定順序排一次
const REGION_ORDER = ['asia', 'america', 'africa', 'oceania']

export function sortRegions<T extends { slug: string }>(regions: T[]): T[] {
  return [...regions].sort((a, b) => REGION_ORDER.indexOf(a.slug) - REGION_ORDER.indexOf(b.slug))
}

// UnoCSS 是靜態掃描 class 字串產生 CSS,動態組字串(如 `bg-${slug}`)掃描不到,
// 這裡統一用完整列出字串的寫法,跟 TourCard / ProductsView 共用
export const REGION_BG: Record<string, string> = {
  world: 'bg-world',
  asia: 'bg-asia',
  america: 'bg-america',
  africa: 'bg-africa',
  oceania: 'bg-oceania',
}

export const REGION_ICON: Record<string, string> = {
  world: iconWorld,
  asia: iconAsia,
  america: iconAmerica,
  africa: iconAfrica,
  oceania: iconOceania,
}

export const REGION_TEXT: Record<string, string> = {
  world: 'text-world',
  asia: 'text-asia',
  america: 'text-america',
  africa: 'text-africa',
  oceania: 'text-oceania',
}

// 首頁分類卡的簡介文字——原版 ProductsFilter.vue 裡的文案
export const REGION_TEASER: Record<string, string> = {
  asia: '最熟悉的陌生人，想靠近卻又不敢太近，是愛情嗎？',
  america: '瑪雅文化、哈瓦那夕陽、熱帶雨林，如此豐富多變的景色，try it！',
  africa: '神秘又狂野，充滿刺激的冒險，給你不同體驗。',
  oceania: '南半球，與我們過著相反季節的國度，很是浪漫。',
}
