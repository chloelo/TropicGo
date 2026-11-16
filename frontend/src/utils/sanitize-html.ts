import DOMPurify from 'dompurify'

/**
 * 移除 HTML 裡可能執行程式的內容（`<script>`、`onerror` 等事件屬性、`javascript:` 連結），
 * 一般排版標籤保留。用 v-html 顯示後台輸入的內容前一定要先經過這裡：
 * 萬一後台帳號被盜、內容被塞入惡意程式，也不會在瀏覽者的頁面上執行（XSS）
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html)
}
