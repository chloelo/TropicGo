<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
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

  const route = useRoute()
  const router = useRouter()
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

  // 表單驗證在 CheckoutFormStep 裡做完,通過才會觸發這裡(付款方式必選,這裡的檢查只是讓型別確定不是 null)
  async function handleSubmitOrder() {
    const paymentMethod = form.value.payment
    if (!paymentMethod) return
    submitting.value = true
    try {
      const { data } = await api.orders.createOrder({
        customer_name: form.value.name,
        customer_email: form.value.email,
        customer_phone: form.value.tel,
        customer_address: form.value.address,
        payment_method: paymentMethod,
        message: form.value.message || undefined,
        coupon_code: appliedCoupon.value?.code,
        items: cartStore.items.map((item) => ({ tour_id: item.tourId, quantity: item.quantity })),
      })
      createdOrder.value = data.data
      orderedItems.value = [...cartStore.items]
      cartStore.clear()
      cartStore.pendingOrderId = data.data.id
      step.value = 3
      // 訂單 id 放進網址:跳去別頁再回來、重新整理,都能用下面的 watch 把訂單抓回來,不會卡在待付款找不到
      router.replace({ query: { order: data.data.id } })
    } catch {
      toast.push('建立訂單失敗', 'danger')
    } finally {
      submitting.value = false
    }
  }

  // 網址帶 ?order=訂單id(送出訂單後、從別頁回來、重新整理)就把訂單抓回來:
  // 待付款 → 確認付款那一步;已付款/已完成 → 完成訂單那一步;查不到或已取消 → 拿掉網址參數回到購物車。
  // 不是待付款(或查不到)的訂單,順便清掉 header「前往付款」的記錄
  const loadingOrder = ref(false)

  function forgetPendingOrder(id: string) {
    if (cartStore.pendingOrderId === id) cartStore.pendingOrderId = ''
  }

  async function loadOrder(id: string) {
    loadingOrder.value = true
    try {
      const { data } = await api.orders.getOrder(id)
      const order = data.data
      if (order.status === 'CANCELLED') throw new Error('訂單已取消')
      if (order.status !== 'PENDING') forgetPendingOrder(id)
      createdOrder.value = order
      step.value = order.status === 'PENDING' ? 3 : 4
    } catch {
      forgetPendingOrder(id)
      router.replace({ query: {} })
    } finally {
      loadingOrder.value = false
    }
  }

  watch(
    () => route.query.order,
    (id) => {
      if (typeof id === 'string') {
        // 剛送出訂單時資料已經在手上,不用再抓一次
        if (createdOrder.value?.id !== id) loadOrder(id)
      } else if (step.value >= 3) {
        // 在確認付款/完成訂單時點 header 的購物車(網址變回 /cart),回到購物車那一步
        createdOrder.value = null
        orderedItems.value = []
        step.value = 1
      }
    },
    { immediate: true },
  )

  // 沒有串真的金流,後端直接把待付款的訂單改成已付款(舊版 payOrder)
  async function handlePay() {
    if (!createdOrder.value) return
    paying.value = true
    try {
      const { data } = await api.orders.payOrder(createdOrder.value.id)
      createdOrder.value = data.data
      forgetPendingOrder(data.data.id)
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

    <!-- 從網址抓訂單時先撐住高度(載入提示交給全域 loader),不然會先閃一下空的購物車 -->
    <div v-if="loadingOrder" class="min-h-[300px]" />

    <!-- 舊版 .zone_cartList -->
    <section v-else-if="step === 1" class="zones">
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
          :paying="paying"
          @pay="handlePay"
        />
      </div>
    </section>

    <!-- 舊版 .zone_checkout -->
    <section v-else-if="step === 4 && createdOrder" class="zones">
      <div class="bs-container">
        <OrderCompleteStep :order="createdOrder" />
      </div>
    </section>
  </main>
</template>
