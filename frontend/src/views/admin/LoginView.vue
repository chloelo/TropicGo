<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useMessage } from 'naive-ui'
  import { useAdminAuthStore } from '@/stores/admin-auth'

  const router = useRouter()
  const message = useMessage()
  const authStore = useAdminAuthStore()

  const email = ref('')
  const password = ref('')
  const loading = ref(false)

  async function handleSubmit() {
    loading.value = true
    try {
      await authStore.login(email.value, password.value)
      router.push({ name: 'admin-dashboard' })
    } catch {
      message.error('登入失敗,請確認帳號密碼')
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <n-card title="TropicGo 後台登入" class="w-[360px]">
      <n-form @submit.prevent="handleSubmit">
        <n-form-item label="Email">
          <n-input v-model:value="email" placeholder="admin@tropicgo.test" />
        </n-form-item>
        <n-form-item label="密碼">
          <n-input
            v-model:value="password"
            type="password"
            placeholder="密碼"
            @keydown.enter="handleSubmit"
          />
        </n-form-item>
        <n-button type="primary" block :loading="loading" @click="handleSubmit">登入</n-button>
      </n-form>
    </n-card>
  </div>
</template>
