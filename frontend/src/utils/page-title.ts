const SITE_NAME = 'TropicGo 熱趣'

/** 設定瀏覽器分頁標題：「頁面名稱｜TropicGo 熱趣」，沒有傳入時只顯示網站名 */
export function setPageTitle(title?: string) {
  document.title = title ? `${title}｜${SITE_NAME}` : SITE_NAME
}
