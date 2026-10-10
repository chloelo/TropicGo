<script setup lang="ts">
  import { ref } from 'vue'
  import type { FormInst, FormRules, GlobalThemeOverrides } from 'naive-ui'
  import { useCartStore } from '@/stores/cart'
  import { formatCurrency } from '@/utils/format'
  import { PAYMENT_LABEL, type PaymentMethod } from '@/utils/payment'

  export interface CheckoutForm {
    name: string
    tel: string
    email: string
    address: string
    payment: PaymentMethod | null
    message: string
  }

  defineProps<{ payable: number; submitting: boolean }>()
  const form = defineModel<CheckoutForm>('form', { required: true })
  const emit = defineEmits<{ back: []; submit: [] }>()

  const cartStore = useCartStore()

  // 下拉選單顯示中文、送出英文代碼
  const paymentOptions = Object.entries(PAYMENT_LABEL).map(([value, label]) => ({ label, value }))

  // 錯誤訊息沿用原設計的格式：「欄位名稱 為必填」
  const rules: FormRules = {
    name: { required: true, message: '聯絡人姓名 為必填', trigger: ['input', 'blur'] },
    tel: [
      { required: true, message: '電話 為必填', trigger: ['input', 'blur'] },
      { pattern: /^\d{8,10}$/, message: '電話 須為 8～10 碼數字', trigger: ['input', 'blur'] },
    ],
    email: [
      { required: true, message: 'E-mail 為必填', trigger: ['input', 'blur'] },
      { type: 'email', message: 'E-mail 須為有效的電子信箱', trigger: ['input', 'blur'] },
    ],
    address: { required: true, message: '聯絡人地址 為必填', trigger: ['input', 'blur'] },
    payment: { required: true, message: '購買方式 為必填', trigger: ['change', 'blur'] },
  }

  // 輸入框淺灰綠底、無框線、直角；欄位之間 30px，錯誤訊息就顯示在這 30px 裡，不會把下面的欄位往下推
  const FOCUS_SHADOW = '0 0 0 0.2rem rgba(163, 101, 73, 0.25)'
  const ERROR_BORDER = '1px solid #dc3545'
  const formTheme: GlobalThemeOverrides = {
    Form: {
      labelFontSizeTopMedium: '16px',
      // label 高度包含下方的 padding：文字 24px + 間距 8px
      labelHeightMedium: '32px',
      lineHeight: '1.5',
      labelPaddingVertical: '0 0 8px 0',
      labelTextColor: '#707070',
      asteriskColor: '#dc3545',
      blankHeightMedium: '38px',
      feedbackPadding: '4px 0 0 0',
      feedbackFontSizeMedium: '12.8px',
      feedbackHeightMedium: '30px',
      feedbackTextColorError: '#dc3545',
    },
    Input: {
      heightMedium: '38px',
      fontSizeMedium: '16px',
      lineHeightTextarea: '1.5',
      borderRadius: '0',
      color: '#f4f7f6',
      colorFocus: '#f4f7f6',
      colorFocusError: '#f4f7f6',
      textColor: '#495057',
      placeholderColor: '#adb5bd',
      border: 'none',
      borderHover: 'none',
      borderFocus: 'none',
      boxShadowFocus: FOCUS_SHADOW,
      borderError: ERROR_BORDER,
      borderHoverError: ERROR_BORDER,
      borderFocusError: ERROR_BORDER,
      boxShadowFocusError: '0 0 0 0.2rem rgba(220, 53, 69, 0.25)',
    },
    InternalSelection: {
      heightMedium: '38px',
      fontSizeMedium: '16px',
      borderRadius: '0',
      color: '#f4f7f6',
      colorActive: '#f4f7f6',
      textColor: '#495057',
      placeholderColor: '#495057',
      border: 'none',
      borderHover: 'none',
      borderActive: 'none',
      borderFocus: 'none',
      boxShadowActive: FOCUS_SHADOW,
      boxShadowFocus: FOCUS_SHADOW,
      borderError: ERROR_BORDER,
      borderHoverError: ERROR_BORDER,
      borderActiveError: ERROR_BORDER,
      borderFocusError: ERROR_BORDER,
    },
  }

  const formRef = ref<FormInst | null>(null)

  async function handleSubmit() {
    try {
      await formRef.value?.validate()
    } catch {
      return // 驗證沒過：錯誤訊息已經顯示在各欄位下面
    }
    emit('submit')
  }
</script>

<template>
  <!-- 明細在 DOM 裡寫在前面，手機版會排在表單上方；大螢幕用 flex-row-reverse 排到右邊 -->
  <div class="flex flex-wrap flex-row-reverse -mx-[15px]">
    <div class="w-full md:w-1/2 lg:w-1/3 px-[15px]">
      <div class="p-4 mb-12 border border-[#dee2e6]">
        <div v-for="item in cartStore.items" :key="item.tourId" class="flex mb-4">
          <img :src="item.image" :alt="item.title" class="w-12 h-12 object-cover shrink-0 mr-2" />
          <div class="w-full">
            <div class="flex justify-between">
              <p class="mr-2 font-bold">{{ item.title }}</p>
              <p class="whitespace-nowrap">{{ formatCurrency(item.price) }}</p>
            </div>
            <p class="font-bold">x {{ item.quantity }}</p>
          </div>
        </div>
        <div
          class="mt-6 pt-4 flex justify-between items-center border-t border-dashed border-[#dee2e6]"
        >
          <p class="font-bold">總計</p>
          <p class="text-[24px] font-bold leading-[1.2] text-secondary">
            {{ formatCurrency(payable) }}
          </p>
        </div>
      </div>
    </div>

    <div class="w-full md:w-1/2 lg:w-2/3 px-[15px]">
      <h3
        class="mb-6 pb-4 text-center text-[28px] font-medium leading-[1.2] border-b border-[#dee2e6]"
      >
        客戶訂單資訊
      </h3>
      <n-config-provider abstract :theme-overrides="formTheme">
        <n-form
          ref="formRef"
          :model="form"
          :rules="rules"
          require-mark-placement="right"
          @submit.prevent="handleSubmit"
        >
          <div class="flex flex-wrap -mx-[5px]">
            <n-form-item label="聯絡人姓名" path="name" class="w-full md:w-1/2 px-[5px]">
              <n-input v-model:value="form.name" placeholder="請輸入聯絡人姓名" />
            </n-form-item>
            <n-form-item label="電話" path="tel" class="w-full md:w-1/2 px-[5px]">
              <n-input
                v-model:value="form.tel"
                :input-props="{ type: 'tel' }"
                placeholder="請輸入電話"
              />
            </n-form-item>
          </div>
          <n-form-item label="E-mail" path="email">
            <n-input
              v-model:value="form.email"
              :input-props="{ type: 'email' }"
              placeholder="請輸入 E-mail"
            />
          </n-form-item>
          <n-form-item label="聯絡人地址" path="address">
            <n-input v-model:value="form.address" placeholder="請輸入聯絡人地址" />
          </n-form-item>
          <n-form-item label="購買方式" path="payment">
            <n-select
              v-model:value="form.payment"
              :options="paymentOptions"
              placeholder="請選擇付款方式"
            />
          </n-form-item>
          <n-form-item label="備註留言" path="message">
            <n-input v-model:value="form.message" type="textarea" :rows="3" placeholder="" />
          </n-form-item>

          <div class="flex justify-between items-center mb-[30px]">
            <button
              type="button"
              class="text-secondary hover:text-secondary-link transition-colors"
              @click="emit('back')"
            >
              <span class="i-fa6-chevron-left" />
              回上一步
            </button>
            <button
              type="submit"
              class="px-3 py-[6px] border border-secondary bg-secondary text-white hover:bg-secondary-dark hover:border-secondary-dark transition-colors disabled:opacity-65 disabled:pointer-events-none"
              :disabled="submitting"
            >
              確認送出
            </button>
          </div>
        </n-form>
      </n-config-provider>
    </div>
  </div>
</template>
