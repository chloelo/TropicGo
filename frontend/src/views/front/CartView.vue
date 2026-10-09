<script setup lang="ts">
  import { computed, reactive, ref } from 'vue'
  import { RouterLink } from 'vue-router'
  import type { FormInst, FormRules } from 'naive-ui'
  import { api } from '@/api/client'
  import type { Order } from '@/api/tropicgo-api'
  import CartSteps from '@/components/front/CartSteps.vue'
  import HeroBanner from '@/components/front/HeroBanner.vue'
  import { useCartStore } from '@/stores/cart'
  import { useToastStore } from '@/stores/toast'
  import { formatCurrency } from '@/utils/format'
  import { HERO_IMAGES } from '@/utils/hero-images'

  const toast = useToastStore()
  const cartStore = useCartStore()

  // 結帳成功後也會呼叫 cartStore.clear(),那時不該跳「清除購物車」,所以通知只放在按鈕這裡
  function clearCart() {
    cartStore.clear()
    toast.push('成功清除購物車')
  }

  const step = ref(1)

  // ---- Step 1:確認清單 + 優惠碼 ----
  const couponCode = ref('')
  const appliedCoupon = ref<{ id: string; title: string; percent: number } | null>(null)
  const checkingCoupon = ref(false)

  const rawTotal = computed(() => cartStore.totalPrice)
  const discountedTotal = computed(() => {
    if (!appliedCoupon.value) return rawTotal.value
    return Math.round((rawTotal.value * appliedCoupon.value.percent) / 100)
  })

  async function applyCoupon() {
    if (!couponCode.value.trim()) return
    checkingCoupon.value = true
    try {
      const { data } = await api.coupons.checkCoupon({ code: couponCode.value.trim() })
      appliedCoupon.value = data.data
      toast.push(`優惠券套用成功，打 ${data.data.percent}%`)
    } catch {
      appliedCoupon.value = null
      toast.push('優惠碼無效或已過期', 'danger')
    } finally {
      checkingCoupon.value = false
    }
  }

  function removeCoupon() {
    appliedCoupon.value = null
    couponCode.value = ''
  }

  // ---- Step 2:填寫資料 ----
  const formRef = ref<FormInst | null>(null)
  const submitting = ref(false)
  const form = reactive({
    name: '',
    email: '',
    tel: '',
    address: '',
    payment: 'credit',
    message: '',
  })

  const paymentOptions = [
    { label: '信用卡', value: 'credit' },
    { label: 'WebATM', value: 'webatm' },
    { label: 'ATM 轉帳', value: 'atm' },
    { label: '超商代碼', value: 'cvs' },
    { label: 'ApplePay', value: 'applepay' },
    { label: 'GooglePay', value: 'googlepay' },
  ]

  const rules: FormRules = {
    name: { required: true, message: '請輸入姓名', trigger: 'blur' },
    email: {
      required: true,
      type: 'email',
      message: '請輸入正確的 Email 格式',
      trigger: ['blur', 'input'],
    },
    tel: {
      required: true,
      pattern: /^\d{8,10}$/,
      message: '請輸入 8~10 碼數字電話',
      trigger: 'blur',
    },
    address: { required: true, message: '請輸入地址', trigger: 'blur' },
  }

  // ---- Step 3:訂單結果 ----
  const createdOrder = ref<Order | null>(null)

  async function handleSubmitOrder() {
    await formRef.value?.validate()

    submitting.value = true
    try {
      const { data } = await api.orders.createOrder({
        customer_name: form.name,
        customer_email: form.email,
        customer_phone: form.tel,
        customer_address: form.address,
        message: form.message || undefined,
        coupon_code: appliedCoupon.value?.id ? couponCode.value.trim() : undefined,
        items: cartStore.items.map((item) => ({ tour_id: item.tourId, quantity: item.quantity })),
      })
      createdOrder.value = data.data
      cartStore.clear()
      step.value = 3
    } catch {
      toast.push('建立訂單失敗，請確認資料是否正確', 'danger')
    } finally {
      submitting.value = false
    }
  }

  function confirmPayment() {
    // 沒有真的金流,這裡只是情境模擬;實際付款狀態由後台人工確認後更新
    step.value = 4
  }
</script>

<template>
  <main>
    <HeroBanner
      title="建立訂單"
      align="right"
      :overlay="0.2"
      :bg-desktop="HERO_IMAGES.cart.desktop"
      :bg-mobile="HERO_IMAGES.cart.mobile"
      desktop-position="50% 0"
      mobile-position="50% -100px"
    />

    <section class="zones">
      <div class="bs-container">
        <CartSteps :step="step" />
      </div>
    </section>

    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Step 1 -->
      <section v-if="step === 1">
        <div v-if="cartStore.items.length === 0" class="text-center py-16">
          <p class="text-gray-400">您尚未選擇任何行程喔，快去選購吧！</p>
          <RouterLink to="/products" class="text-primary mt-2 inline-block">
            前往行程列表
          </RouterLink>
        </div>

        <template v-else>
          <div class="flex justify-end mb-3">
            <button
              class="text-sm text-gray-400 flex items-center gap-1 hover:text-alert"
              @click="clearCart"
            >
              <span class="i-fa6-trash-can" />
              清空購物車
            </button>
          </div>

          <div
            v-for="item in cartStore.items"
            :key="item.tourId"
            class="flex items-center gap-4 border-b border-gray-100 py-4"
          >
            <img :src="item.image" class="w-20 h-20 rounded object-cover shrink-0" alt="" />
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-800 line-clamp-1">{{ item.title }}</p>
              <p class="text-sm text-gray-400">{{ formatCurrency(item.price) }}/{{ item.unit }}</p>
            </div>
            <div class="flex items-center border border-gray-300 rounded-full shrink-0">
              <button
                class="w-8 h-8 flex items-center justify-center text-gray-500"
                @click="cartStore.updateQuantity(item.tourId, item.quantity - 1)"
              >
                <span class="i-fa6-minus text-xs" />
              </button>
              <span class="w-6 text-center text-sm">{{ item.quantity }}</span>
              <button
                class="w-8 h-8 flex items-center justify-center text-gray-500"
                @click="cartStore.updateQuantity(item.tourId, item.quantity + 1)"
              >
                <span class="i-fa6-plus text-xs" />
              </button>
            </div>
            <p class="w-24 text-right font-bold text-primary shrink-0">
              {{ formatCurrency(item.price * item.quantity) }}
            </p>
            <button
              class="text-gray-300 hover:text-alert shrink-0"
              @click="cartStore.removeItem(item.tourId)"
            >
              <span class="i-fa6-xmark" />
            </button>
          </div>

          <div class="mt-6 bg-gray-50 rounded-lg p-5">
            <div class="flex gap-2">
              <n-input
                v-model:value="couponCode"
                placeholder="輸入優惠碼"
                :disabled="!!appliedCoupon"
              />
              <n-button v-if="!appliedCoupon" :loading="checkingCoupon" @click="applyCoupon">
                套用
              </n-button>
              <n-button v-else quaternary @click="removeCoupon">移除</n-button>
            </div>
            <p v-if="appliedCoupon" class="text-sm text-primary mt-2 flex items-center gap-1">
              <span class="i-fa6-tag" />
              已套用「{{ appliedCoupon.title }}」,打 {{ appliedCoupon.percent }}%
            </p>

            <div class="mt-4 flex justify-between items-baseline">
              <span class="text-gray-500">總金額</span>
              <div>
                <span v-if="appliedCoupon" class="text-gray-400 line-through mr-2">
                  {{ formatCurrency(rawTotal) }}
                </span>
                <span class="text-2xl font-bold text-primary">
                  {{ formatCurrency(discountedTotal) }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-6">
            <n-button type="primary" round size="large" @click="step = 2">
              前往結帳
              <template #icon><span class="i-fa6-chevron-right" /></template>
            </n-button>
          </div>
        </template>
      </section>

      <!-- Step 2 -->
      <section v-else-if="step === 2" class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-2">
          <n-form ref="formRef" :model="form" :rules="rules" label-placement="top">
            <n-form-item label="姓名" path="name">
              <n-input v-model:value="form.name" />
            </n-form-item>
            <n-form-item label="Email" path="email">
              <n-input v-model:value="form.email" />
            </n-form-item>
            <n-form-item label="電話" path="tel">
              <n-input v-model:value="form.tel" />
            </n-form-item>
            <n-form-item label="地址" path="address">
              <n-input v-model:value="form.address" />
            </n-form-item>
            <n-form-item label="付款方式">
              <n-select v-model:value="form.payment" :options="paymentOptions" />
            </n-form-item>
            <n-form-item label="留言(選填)">
              <n-input v-model:value="form.message" type="textarea" :rows="3" />
            </n-form-item>
          </n-form>

          <div class="flex justify-between mt-4">
            <n-button round @click="step = 1">
              <template #icon><span class="i-fa6-chevron-left" /></template>
              回上一步
            </n-button>
            <n-button type="primary" round :loading="submitting" @click="handleSubmitOrder">
              送出訂單
            </n-button>
          </div>
        </div>

        <aside class="bg-gray-50 rounded-lg p-5 h-fit">
          <h3 class="font-bold text-gray-700 mb-3">訂單摘要</h3>
          <ul class="list-none text-sm text-gray-500 space-y-1 mb-3">
            <li v-for="item in cartStore.items" :key="item.tourId" class="flex justify-between">
              <span class="line-clamp-1">{{ item.title }} × {{ item.quantity }}</span>
              <span>{{ formatCurrency(item.price * item.quantity) }}</span>
            </li>
          </ul>
          <div class="flex justify-between font-bold text-primary pt-3 border-t border-gray-200">
            <span>總金額</span>
            <span>{{ formatCurrency(discountedTotal) }}</span>
          </div>
        </aside>
      </section>

      <!-- Step 3 -->
      <section v-else-if="step === 3 && createdOrder" class="max-w-md mx-auto text-center">
        <span class="i-fa6-circle-check text-primary text-5xl" />
        <h2 class="text-xl font-bold text-gray-800 mt-4">訂單已送出</h2>
        <p class="text-gray-500 mt-1">訂單編號：{{ createdOrder.order_number }}</p>

        <div class="bg-gray-50 rounded-lg p-5 mt-6 text-left text-sm space-y-2">
          <p>聯絡人：{{ createdOrder.customer_name }}</p>
          <p>Email:{{ createdOrder.customer_email }}</p>
          <p>電話：{{ createdOrder.customer_phone }}</p>
          <p class="font-bold text-primary pt-2 border-t border-gray-200">
            應付金額：{{ formatCurrency(createdOrder.total_amount) }}
          </p>
        </div>

        <n-button type="primary" round size="large" class="mt-6" @click="confirmPayment">
          確認付款
        </n-button>
      </section>

      <!-- Step 4 -->
      <section v-else-if="step === 4" class="max-w-md mx-auto text-center py-10">
        <span class="i-fa6-circle-check text-primary text-6xl" />
        <h2 class="text-2xl font-bold text-gray-800 mt-4">恭喜您，已完成付款！</h2>
        <p class="text-gray-500 mt-2">感謝您對 TropicGo 的信任，我們會盡快與您聯絡，請耐心等候。</p>
        <RouterLink
          to="/products"
          class="inline-block mt-6 px-6 py-3 bg-primary text-white hover:bg-primary-dark transition-colors"
        >
          再去逛逛
        </RouterLink>
      </section>
    </div>
  </main>
</template>
