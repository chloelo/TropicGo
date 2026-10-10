import type { GlobalThemeOverrides } from 'naive-ui'

/**
 * Naive UI 的共用主題，套在 App.vue 最外層，前台、後台、登入頁都會用到。
 * primary 是品牌的赤陶色、success 是輔色綠色；hover、pressed 時顏色變深
 */
export const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#a36549',
    primaryColorHover: '#8f5940',
    primaryColorPressed: '#7a4c37',
    primaryColorSuppl: '#a36549',
    // 輔色：已付款、啟用中這類狀態標籤
    successColor: '#627d52',
    successColorHover: '#506643',
    successColorPressed: '#4a5e3e',
    successColorSuppl: '#627d52',
  },
}

/**
 * 後台疊加在共用主題上（套在 AppLayout，前台不受影響）。配色分工：
 * 綠色是動作（按鈕、開關、分頁）、赤陶色是品牌（標題、側邊選單選中項目）、紅色是刪除。
 * Naive 的 primary 是「主要按鈕的顏色」，所以後台的 primary 用綠色
 */
export const adminThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#627d52',
    primaryColorHover: '#506643',
    primaryColorPressed: '#4a5e3e',
    primaryColorSuppl: '#627d52',
  },
  Menu: {
    itemTextColorActive: '#a36549',
    itemTextColorActiveHover: '#a36549',
    itemIconColorActive: '#a36549',
    itemIconColorActiveHover: '#a36549',
    itemColorActive: 'rgba(163, 101, 73, 0.1)',
    itemColorActiveHover: 'rgba(163, 101, 73, 0.1)',
  },
  // 示範帳號的唯讀表單：停用的欄位文字維持正常深色（預設是淺灰，內容不好讀），灰底就足以表示不能編輯
  Input: {
    textColorDisabled: 'rgb(51, 54, 57)',
  },
  InternalSelection: {
    textColorDisabled: 'rgb(51, 54, 57)',
  },
  // 確認框的內距統一成跟編輯 modal 一樣（預設左右比較寬）。
  // 取消鈕：確認框打開時會自動取得焦點，預設在焦點、hover 時會變成 primary 綠色，
  // 擺在紅色刪除鈕旁邊會搶眼，所以維持灰色，只把框線加深當作回饋
  Dialog: {
    padding: '19px 24px 20px',
    peers: {
      Button: {
        // 確認框的按鈕是外框（ghost）樣式，文字色要設 Ghost 這組變數
        textColorGhostHover: 'rgb(51, 54, 57)',
        textColorGhostFocus: 'rgb(51, 54, 57)',
        textColorGhostPressed: 'rgb(51, 54, 57)',
        borderHover: '1px solid rgb(160, 160, 165)',
        borderFocus: '1px solid rgb(160, 160, 165)',
        borderPressed: '1px solid rgb(130, 130, 135)',
      },
    },
  },
}
