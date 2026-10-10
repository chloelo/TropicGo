import type { GlobalThemeOverrides } from 'naive-ui'

// Naive UI 的主題覆寫,前台、後台、登入頁共用(套在 App.vue 最外層的 n-config-provider)。
// 色碼來自舊版 _variables.scss 的 $theme-colors:primary 實際被覆寫成 $africa 赤陶色、secondary 是綠色,
// hover/pressed 跟舊版 Bootstrap 按鈕一樣是變深
export const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#a36549',
    primaryColorHover: '#8f5940',
    primaryColorPressed: '#7a4c37',
    primaryColorSuppl: '#a36549',
    // 輔色對應到 Naive 的 success:已付款、啟用中這類狀態標籤
    successColor: '#627d52',
    successColorHover: '#506643',
    successColorPressed: '#4a5e3e',
    successColorSuppl: '#627d52',
  },
}

// 後台另外疊加(套在 AppLayout,前台和登入頁不受影響),照舊版後台的配色分工:
// 綠色 = 動作(按鈕、開關、分頁、下拉選單選中),赤陶色 = 品牌(後台標題、側邊選單選中項目),紅色 = 刪除。
// Naive 的 primary 指的是「主要按鈕的顏色」,舊版 Bootstrap 的 primary 是品牌色,兩個不是同一件事,所以後台的 primary 用綠色
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
  // 刪除確認框(dialog)預設內距是上 16、左右 28、下 20,比編輯 modal(card)寬,統一成跟 card 一樣。
  // 取消鈕:確認框打開時會自動取得焦點,Naive 預設在焦點/hover 時把按鈕變成 primary(後台是綠色),
  // 綠色取消鈕擺在紅色刪除鈕旁邊會搶眼,所以這裡讓它維持灰色,只把框線加深一點當作回饋
  Dialog: {
    padding: '19px 24px 20px',
    peers: {
      Button: {
        // 確認框的按鈕是外框(ghost)樣式,文字色走 Ghost 這組變數
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
