<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { RouterLink } from 'vue-router'
  import { api } from '@/api/client'
  import type { Order } from '@/api/tropicgo-api'
  import CartListStep, { type AppliedCoupon } from '@/components/front/CartListStep.vue'
  import CartSteps from '@/components/front/CartSteps.vue'
  import CheckoutFormStep, { type CheckoutForm } from '@/components/front/CheckoutFormStep.vue'
  import HeroBanner from '@/components/front/HeroBanner.vue'
  import { useCartStore } from '@/stores/cart'
  import { useToastStore } from '@/stores/toast'
  import { formatCurrency } from '@/utils/format'
  import { HERO_IMAGES } from '@/utils/hero-images'

  const toast = useToastStore()
  const cartStore = useCartStore()

  const step = ref(1)

  // ---- Step 1:確認清單 + 優惠碼 ----
  const appliedCoupon = ref<AppliedCoupon | null>(null)

  // 折扣後應付金額(percent 是要付的百分比,90 代表打 9 折)
  const discountedTotal = computed(() => {
    if (!appliedCoupon.value) return cartStore.totalPrice
    return Math.round((cartStore.totalPrice * appliedCoupon.value.percent) / 100)
  })

  // ---- Step 2:填寫資料 ----
  const submitting = ref(false)
  const form = ref<CheckoutForm>({
    name: '',
    tel: '',
    email: '',
    address: '',
    payment: null,
    message: '',
  })

  // ---- Step 3:訂單結果 ----
  const createdOrder = ref<Order | null>(null)

  // 表單驗證在 CheckoutFormStep 裡做完,通過才會觸發這裡
  async function handleSubmitOrder() {
    submitting.value = true
    try {
      const { data } = await api.orders.createOrder({
        customer_name: form.value.name,
        customer_email: form.value.email,
        customer_phone: form.value.tel,
        customer_address: form.value.address,
        message: form.value.message || undefined,
        coupon_code: appliedCoupon.value?.code,
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

    <!-- 舊版 .zone_cartList -->
    <section v-if="step === 1" class="zones">
      <div class="bs-container">
        <CartListStep v-model:coupon="appliedCoupon" :payable="discountedTotal" @next="step = 2" />
      </div>
    </section>

    <!-- 舊版 .zone_form:上方只留 30px -->
    <section v-else-if="step === 2" class="pt-[30px] pb-[60px]">
      <div class="bs-container">
        <CheckoutFormStep
          v-model:form="form"
          :payable="discountedTotal"
          :submitting="submitting"
          @back="step = 1"
          @submit="handleSubmitOrder"
        />
      </div>
    </section>

    <div v-else class="max-w-4xl mx-auto px-4 py-8">
      <!-- Step 3 -->
      <section v-if="step === 3 && createdOrder" class="max-w-md mx-auto text-center">
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
