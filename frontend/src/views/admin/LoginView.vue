<script setup lang="ts">
  import { ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useMessage } from 'naive-ui'
  import loginBg from '@/assets/images/login-bg.jpg'
  import { useAdminAuthStore } from '@/stores/admin-auth'
  import { apiErrorMessage } from '@/utils/api-error'

  const route = useRoute()
  const router = useRouter()
  const message = useMessage()
  const authStore = useAdminAuthStore()

  const email = ref('')
  const password = ref('')
  const loading = ref(false)

  // 欄位有 required、type="email"，沒填或格式不對時瀏覽器會先擋下來，不會送到這裡
  async function handleSubmit() {
    loading.value = true
    try {
      await authStore.login(email.value, password.value)
      // 用 replace：登入頁不留在瀏覽紀錄裡，登入後按上一頁不會又回到這裡
      router.replace(redirectTarget())
    } catch (error) {
      message.error(apiErrorMessage(error, '登入失敗，請確認帳號密碼'))
    } finally {
      loading.value = false
    }
  }

  // 登入後回到原本要去的後台頁面。網址上的 redirect 可以被任意修改，
  // 所以只接受需要登入的後台頁，其他值一律回儀表板
  function redirectTarget() {
    const redirect = route.query.redirect
    if (typeof redirect === 'string') {
      const target = router.resolve(redirect)
      if (target.meta.requiresAuth) return target.fullPath
    }
    return { name: 'admin-dashboard' }
  }

  // 示範帳號是公開的唯讀帳號，帳密由環境變數帶入；沒設定就不顯示這個按鈕
  const demoEmail = import.meta.env.VITE_DEMO_EMAIL
  const demoPassword = import.meta.env.VITE_DEMO_PASSWORD

  // 先把帳密填進欄位再登入，看得到用的是哪個帳號
  function loginAsDemo() {
    if (!demoEmail || !demoPassword) return
    email.value = demoEmail
    password.value = demoPassword
    handleSubmit()
  }
</script>

<template>
  <!-- 這頁不在 FrontLayout 底下，字級和行高要自己設成 16px／1.5 -->
  <div
    class="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat text-[16px] leading-[1.5]"
    :style="{ backgroundImage: `url(${loginBg})` }"
  >
    <div
      class="w-[35rem] max-w-full my-[30px] mx-[15px] px-[15px] py-[30px] bg-white/90 rounded-[10px] shadow-[0_0_10px_#aaa]"
    >
      <h2
        class="mb-[15px] text-right text-[32px] font-medium leading-[1.2] text-africa border-b-[3px] border-africa/50"
      >
        請先登入
      </h2>
      <p
        v-if="authStore.sessionExpired"
        class="mb-4 px-4 py-3 rounded-[10px] bg-[#fff3cd] border border-[#ffeeba] text-[#856404]"
      >
        登入已逾時，請重新登入
      </p>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="login-email" class="block mb-2 text-africa">Email address</label>
          <input
            id="login-email"
            v-model="email"
            type="email"
            autocomplete="username"
            required
            class="w-full h-[38px] px-3 py-[6px] rounded-[25px] bg-white/30 border border-africa/50 text-[#495057] outline-none transition-shadow focus:shadow-[0_0_0_0.2rem_rgba(163,101,73,0.25)]"
          />
        </div>
        <div class="mb-4">
          <label for="login-password" class="block mb-2 text-africa">Password</label>
          <input
            id="login-password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
            class="w-full h-[38px] px-3 py-[6px] rounded-[25px] bg-white/30 border border-africa/50 text-[#495057] outline-none transition-shadow focus:shadow-[0_0_0_0.2rem_rgba(163,101,73,0.25)]"
          />
        </div>
        <button
          type="submit"
          class="w-full mt-2 px-3 py-[6px] rounded-[25px] border border-transparent bg-africa text-white text-[120%] disabled:opacity-65"
          :disabled="loading"
        >
          登入
        </button>
      </form>
      <template v-if="demoEmail && demoPassword">
        <button
          type="button"
          class="w-full mt-3 px-3 py-[6px] rounded-[25px] border border-africa text-africa hover:bg-africa hover:text-white transition-colors disabled:opacity-65"
          :disabled="loading"
          @click="loginAsDemo"
        >
          使用示範帳號登入
        </button>
        <p class="mt-2 text-center text-[14px] text-[#6c757d]">
          示範帳號可以瀏覽整個後台，但無法修改資料
        </p>
      </template>
    </div>
  </div>
</template>
