import iconAfrica from '@/assets/images/icon-africa.png'
import iconAmerica from '@/assets/images/icon-america.png'
import iconAsia from '@/assets/images/icon-asia.png'
import iconOceania from '@/assets/images/icon-oceania.png'
import iconWorld from '@/assets/images/icon-world.png'

// 地區的顯示順序。API 不保證回傳順序，順序一亂首頁卡片的交錯位移就會跑掉
const REGION_ORDER = ['asia', 'america', 'africa', 'oceania']

/** 照固定順序排列地區 */
export function sortRegions<T extends { slug: string }>(regions: T[]): T[] {
  return [...regions].sort((a, b) => REGION_ORDER.indexOf(a.slug) - REGION_ORDER.indexOf(b.slug))
}

// 下面的 class 都完整寫出來：UnoCSS 靜態掃描原始碼，`bg-${slug}` 這種動態組出的字串掃不到

/** 地區的背景色 class */
export const REGION_BG: Record<string, string> = {
  world: 'bg-world',
  asia: 'bg-asia',
  america: 'bg-america',
  africa: 'bg-africa',
  oceania: 'bg-oceania',
}

/** 地區的 icon 圖片 */
export const REGION_ICON: Record<string, string> = {
  world: iconWorld,
  asia: iconAsia,
  america: iconAmerica,
  africa: iconAfrica,
  oceania: iconOceania,
}

/** 首頁分類卡「立即前往」的文字色，hover 時變深 */
export const REGION_TEXT: Record<string, string> = {
  world: 'text-world hover:text-world-link',
  asia: 'text-asia hover:text-asia-link',
  america: 'text-america hover:text-america-link',
  africa: 'text-africa hover:text-africa-link',
  oceania: 'text-oceania hover:text-oceania-link',
}

/** 首頁分類卡的簡介文字 */
export const REGION_TEASER: Record<string, string> = {
  asia: '最熟悉的陌生人，想靠近卻又不敢太近，是愛情嗎？',
  america: '瑪雅文化、哈瓦那夕陽、熱帶雨林，如此豐富多變的景色，try it！',
  africa: '神秘又狂野，充滿刺激的冒險，給你不同體驗。',
  oceania: '南半球，與我們過著相反季節的國度，很是浪漫。',
}
