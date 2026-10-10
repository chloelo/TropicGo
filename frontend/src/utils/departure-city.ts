import type { TourInput } from '@/api/tropicgo-api'

// 出發城市的選項由 openapi.yaml 的 enum 產生,跟後端驗證的清單是同一份(舊版就是這四個)
export type DepartureCity = TourInput['departure_city']

export const DEPARTURE_CITIES: DepartureCity[] = ['台北', '桃園', '台中', '高雄']

// 資料庫裡的行程是一般字串,編輯時確認是不是目前的選項之一
export function isDepartureCity(value: string): value is DepartureCity {
  return DEPARTURE_CITIES.some((city) => city === value)
}
