import type { TourInput } from '@/api/tropicgo-api'

/** 出發城市。型別由 openapi.yaml 的 enum 產生，跟後端驗證的清單是同一份 */
export type DepartureCity = TourInput['departure_city']

/** 後台下拉選單的選項，依顯示順序排列 */
export const DEPARTURE_CITIES: DepartureCity[] = ['台北', '桃園', '台中', '高雄']

/** 資料庫裡存的是一般字串，編輯產品時用來確認是不是目前的選項之一 */
export function isDepartureCity(value: string): value is DepartureCity {
  return DEPARTURE_CITIES.some((city) => city === value)
}
