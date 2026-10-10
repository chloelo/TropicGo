<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useMessage } from 'naive-ui'
  import loginBg from '@/assets/images/login-bg.jpg'
  import { useAdminAuthStore } from '@/stores/admin-auth'

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
      router.push({ name: 'admin-dashboard' })
    } catch {
      message.error('登入失敗，請確認帳號密碼')
    } finally {
      loading.value = false
    }
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
    </div>
  </div>
</template>
