/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Region {
  /** @format uuid */
  id: string
  /** @example "亞洲" */
  name: string
  /** @example "asia" */
  slug: string
}

export interface TourImage {
  /** @format uuid */
  id: string
  /** @format uri */
  url: string
  sort_order: number
}

export interface Tour {
  /** @format uuid */
  id: string
  title: string
  summary: string
  description: string
  /** 費用包含（簡短條列） */
  content: string
  /** @example "人" */
  unit: string
  /** @example "桃園" */
  departure_city: string
  /**
   * 成團人數
   * @example 15
   */
  min_group_size: number
  origin_price: number
  price: number
  is_popular: boolean
  is_enabled: boolean
  /** @format date-time */
  created_at: string
  /** @format date-time */
  updated_at: string
  region: Region
  images: TourImage[]
}

export interface TourInput {
  title: string
  /** @format uuid */
  region_id: string
  summary: string
  description: string
  /** 費用包含（簡短條列） */
  content: string
  unit: string
  departure_city: '台北' | '桃園' | '台中' | '高雄'
  /**
   * 成團人數
   * @min 1
   */
  min_group_size: number
  origin_price: number
  price: number
  is_popular?: boolean
  is_enabled?: boolean
  images: string[]
}

export interface Coupon {
  /** @format uuid */
  id: string
  title: string
  code: string
  /** 要付的百分比，90 代表打 9 折 */
  percent: number
  /** @format date-time */
  due_date: string
  is_enabled: boolean
}

export interface CouponInput {
  title: string
  code: string
  /**
   * @min 1
   * @max 100
   */
  percent: number
  /** @format date */
  due_date: string
  is_enabled?: boolean
}

export interface OrderItem {
  /** @format uuid */
  id: string
  title_snapshot: string
  unit_price_snapshot: number
  quantity: number
  subtotal: number
}

export interface Order {
  /** @format uuid */
  id: string
  order_number: string
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address: string
  payment_method: string | null
  message: string | null
  total_amount: number
  status: 'PENDING' | 'PAID' | 'CANCELLED' | 'COMPLETED'
  /** @format date-time */
  created_at: string
  coupon: Coupon | null
  items: OrderItem[]
}

export interface OrderInput {
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address: string
  payment_method: 'Credit' | 'LinePay' | 'ApplePay' | 'GooglePay' | 'ATM' | 'CVS'
  message?: string
  coupon_code?: string
  items: {
    /** @format uuid */
    tour_id: string
    /**
     * @min 1
     * @max 20
     */
    quantity: number
  }[]
}

export interface PaginationMeta {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface Admin {
  /** @format uuid */
  id: string
  name: string
  email: string
  role: 'admin' | 'demo'
}

export interface SuccessResponse {
  /** @example "success" */
  status: string
}

export interface ErrorResponse {
  /** @example "failed" */
  status: string
  message: string
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from 'axios'
import axios from 'axios'

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams extends Omit<
  AxiosRequestConfig,
  'data' | 'params' | 'url' | 'responseType'
> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType
  /** request body */
  body?: unknown
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> extends Omit<
  AxiosRequestConfig,
  'data' | 'cancelToken'
> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
  secure?: boolean
  format?: ResponseType
}

export enum ContentType {
  Json = 'application/json',
  JsonApi = 'application/vnd.api+json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private secure?: boolean
  private format?: ResponseType

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || 'http://localhost:8080/api',
    })
    this.secure = secure
    this.format = format
    this.securityWorker = securityWorker
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method)

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    }
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem)
    } else {
      return `${formItem}`
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key]
      const propertyContent: any[] = property instanceof Array ? property : [property]

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem))
      }

      return formData
    }, new FormData())
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const responseFormat = format || this.format || undefined

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>)
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body)
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { 'Content-Type': type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    })
  }
}

/**
 * @title TropicGo API
 * @version 1.0.0
 * @baseUrl http://localhost:8080/api
 *
 * 熱帶國家旅行團銷售網站 — 後端 API 文件
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  regions = {
    /**
     * No description
     *
     * @tags Regions
     * @name GetRegions
     * @summary 取得所有地區分類
     * @request GET:/regions
     */
    getRegions: (params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data: Region[]
        },
        any
      >({
        path: `/regions`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }
  tours = {
    /**
     * No description
     *
     * @tags Tours
     * @name GetTours
     * @summary 取得行程列表（可依地區篩選）
     * @request GET:/tours
     */
    getTours: (
      query?: {
        /**
         * 地區 slug，不帶則回傳全部已上架行程
         * @example "asia"
         */
        region?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data: Tour[]
        },
        ErrorResponse
      >({
        path: `/tours`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tours
     * @name GetTour
     * @summary 取得單一行程詳情
     * @request GET:/tours/{id}
     */
    getTour: (id: string, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data: Tour
        },
        ErrorResponse
      >({
        path: `/tours/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }
  coupons = {
    /**
     * No description
     *
     * @tags Coupons
     * @name CheckCoupon
     * @summary 驗證優惠碼是否有效
     * @request POST:/coupons/check
     */
    checkCoupon: (
      data: {
        code: string
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data: {
            /** @format uuid */
            id: string
            title: string
            percent: number
          }
        },
        ErrorResponse
      >({
        path: `/coupons/check`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  }
  orders = {
    /**
     * No description
     *
     * @tags Orders
     * @name CreateOrder
     * @summary 建立訂單（結帳送出）
     * @request POST:/orders
     */
    createOrder: (data: OrderInput, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data: Order
        },
        ErrorResponse
      >({
        path: `/orders`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name GetOrder
     * @summary 查詢單一訂單（客人用訂單 id 查詢，不需登入）
     * @request GET:/orders/{id}
     */
    getOrder: (id: string, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data: Order
        },
        ErrorResponse
      >({
        path: `/orders/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name PayOrder
     * @summary 模擬付款（沒有串金流，待付款的訂單直接改成已付款）
     * @request POST:/orders/{id}/pay
     */
    payOrder: (id: string, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data: Order
        },
        ErrorResponse
      >({
        path: `/orders/${id}/pay`,
        method: 'POST',
        format: 'json',
        ...params,
      }),
  }
  admin = {
    /**
     * No description
     *
     * @tags Admin Auth
     * @name AdminLogin
     * @summary 管理員登入
     * @request POST:/admin/auth/login
     */
    adminLogin: (
      data: {
        /** @format email */
        email: string
        password: string
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data: {
            token: string
            admin: Admin
          }
        },
        ErrorResponse
      >({
        path: `/admin/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Auth
     * @name AdminCheck
     * @summary 驗證目前登入狀態
     * @request GET:/admin/auth/check
     * @secure
     */
    adminCheck: (params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data: Admin
        },
        ErrorResponse
      >({
        path: `/admin/auth/check`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Tours
     * @name AdminGetTours
     * @summary 行程列表（分頁，含未上架）
     * @request GET:/admin/tours
     * @secure
     */
    adminGetTours: (
      query?: {
        /** @default 1 */
        page?: number
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data: Tour[]
          meta: PaginationMeta
        },
        ErrorResponse
      >({
        path: `/admin/tours`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Tours
     * @name AdminCreateTour
     * @summary 新增行程
     * @request POST:/admin/tours
     * @secure
     */
    adminCreateTour: (data: TourInput, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data: Tour
        },
        ErrorResponse
      >({
        path: `/admin/tours`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Tours
     * @name AdminGetTour
     * @summary 取得單一行程（含未上架）
     * @request GET:/admin/tours/{id}
     * @secure
     */
    adminGetTour: (id: string, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data: Tour
        },
        ErrorResponse
      >({
        path: `/admin/tours/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Tours
     * @name AdminUpdateTour
     * @summary 更新行程（圖片整批替換）
     * @request PUT:/admin/tours/{id}
     * @secure
     */
    adminUpdateTour: (id: string, data: TourInput, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data: Tour
        },
        ErrorResponse
      >({
        path: `/admin/tours/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Tours
     * @name AdminDeleteTour
     * @summary 刪除行程（已有訂單關聯則會被擋下）
     * @request DELETE:/admin/tours/{id}
     * @secure
     */
    adminDeleteTour: (id: string, params: RequestParams = {}) =>
      this.request<SuccessResponse, ErrorResponse>({
        path: `/admin/tours/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Coupons
     * @name AdminGetCoupons
     * @summary 優惠券列表（分頁）
     * @request GET:/admin/coupons
     * @secure
     */
    adminGetCoupons: (
      query?: {
        /** @default 1 */
        page?: number
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data: Coupon[]
          meta: PaginationMeta
        },
        ErrorResponse
      >({
        path: `/admin/coupons`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Coupons
     * @name AdminCreateCoupon
     * @summary 新增優惠券
     * @request POST:/admin/coupons
     * @secure
     */
    adminCreateCoupon: (data: CouponInput, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data: Coupon
        },
        ErrorResponse
      >({
        path: `/admin/coupons`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Coupons
     * @name AdminUpdateCoupon
     * @summary 更新優惠券
     * @request PUT:/admin/coupons/{id}
     * @secure
     */
    adminUpdateCoupon: (id: string, data: CouponInput, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data: Coupon
        },
        ErrorResponse
      >({
        path: `/admin/coupons/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Coupons
     * @name AdminDeleteCoupon
     * @summary 刪除優惠券（已被訂單使用則會被擋下）
     * @request DELETE:/admin/coupons/{id}
     * @secure
     */
    adminDeleteCoupon: (id: string, params: RequestParams = {}) =>
      this.request<SuccessResponse, ErrorResponse>({
        path: `/admin/coupons/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Orders
     * @name AdminGetOrders
     * @summary 訂單列表（分頁）
     * @request GET:/admin/orders
     * @secure
     */
    adminGetOrders: (
      query?: {
        /** @default 1 */
        page?: number
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data: Order[]
          meta: PaginationMeta
        },
        ErrorResponse
      >({
        path: `/admin/orders`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Orders
     * @name AdminUpdateOrderStatus
     * @summary 更新訂單狀態
     * @request PATCH:/admin/orders/{id}/status
     * @secure
     */
    adminUpdateOrderStatus: (
      id: string,
      data: {
        status: 'PENDING' | 'PAID' | 'CANCELLED' | 'COMPLETED'
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data: Order
        },
        ErrorResponse
      >({
        path: `/admin/orders/${id}/status`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  }
}
