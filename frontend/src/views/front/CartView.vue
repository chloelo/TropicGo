<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { api } from '@/api/client'
  import type { Order } from '@/api/tropicgo-api'
  import CartListStep, { type AppliedCoupon } from '@/components/front/CartListStep.vue'
  import CartSteps from '@/components/front/CartSteps.vue'
  import CheckoutFormStep, { type CheckoutForm } from '@/components/front/CheckoutFormStep.vue'
  import HeroBanner from '@/components/front/HeroBanner.vue'
  import OrderCompleteStep from '@/components/front/OrderCompleteStep.vue'
  import OrderConfirmStep from '@/components/front/OrderConfirmStep.vue'
  import { useCartStore, type CartItem } from '@/stores/cart'
  import { useToastStore } from '@/stores/toast'
  import { HERO_IMAGES } from '@/utils/hero-images'

  const toast = useToastStore()
  const cartStore = useCartStore()

  const step = ref(1)

  // 舊版 winScroll():換步驟時如果已經往下捲,就慢慢捲回步驟條的位置,看得到現在進行到哪一步
  // (舊版只有「前往結帳」「回上一步」有捲,這裡每次換步驟都捲,送出訂單、付款後才不會停在頁面中間)
  watch(step, () => {
    if (window.scrollY >= 10) window.scrollTo({ top: 250, behavior: 'smooth' })
  })

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

  // ---- Step 3、4:確認付款、完成訂單 ----
  const createdOrder = ref<Order | null>(null)
  // 送出訂單後購物車會清空,先留一份給確認付款那一步顯示圖片和單位
  const orderedItems = ref<CartItem[]>([])
  const paying = ref(false)

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
      orderedItems.value = [...cartStore.items]
      cartStore.clear()
      step.value = 3
    } catch {
      toast.push('建立訂單失敗', 'danger')
    } finally {
      submitting.value = false
    }
  }

  // 沒有串真的金流,後端直接把待付款的訂單改成已付款(舊版 payOrder)
  async function handlePay() {
    if (!createdOrder.value) return
    paying.value = true
    try {
      const { data } = await api.orders.payOrder(createdOrder.value.id)
      createdOrder.value = data.data
      step.value = 4
    } catch {
      toast.push('付款失敗', 'danger')
    } finally {
      paying.value = false
    }
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

    <!-- 舊版 .zone_order -->
    <section v-else-if="step === 3 && createdOrder" class="zones">
      <div class="bs-container">
        <OrderConfirmStep
          :order="createdOrder"
          :ordered-items="orderedItems"
          :payment="form.payment"
          :paying="paying"
          @pay="handlePay"
        />
      </div>
    </section>

    <!-- 舊版 .zone_checkout -->
    <section v-else-if="step === 4 && createdOrder" class="zones">
      <div class="bs-container">
        <OrderCompleteStep :order="createdOrder" :payment="form.payment" />
      </div>
    </section>
  </main>
</template>
