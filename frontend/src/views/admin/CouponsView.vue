<script setup lang="ts">
  import { computed, h, onMounted, reactive, ref } from 'vue'
  import {
    NButton,
    NSpace,
    NTag,
    useDialog as useNaiveDialog,
    useMessage,
    type DataTableColumns,
    type FormInst,
    type FormRules,
  } from 'naive-ui'
  import { api } from '@/api/client'
  import { apiErrorMessage } from '@/utils/api-error'
  import type { Coupon, CouponInput } from '@/api/tropicgo-api'
  import { useDialog } from '@/composables/use-dialog'
  import { useTable } from '@/composables/use-table'
  import { formatDate, toLocalDateString } from '@/utils/format'

  const message = useMessage()
  const naiveDialog = useNaiveDialog()

  const {
    data: coupons,
    page,
    totalPages,
    loading,
    load,
  } = useTable<Coupon>(async (p) => {
    const { data } = await api.admin.adminGetCoupons({ page: p })
    return { data: data.data, meta: data.meta }
  })

  const { showDialog, dialogOptions, openDialog, closeDialog } = useDialog()

  const formRef = ref<FormInst | null>(null)
  const submitting = ref(false)
  const isEdit = ref(false)
  const editingId = ref<string | null>(null)

  function emptyForm() {
    return {
      title: '',
      code: '',
      percent: 100,
      is_enabled: true,
    }
  }

  const form = reactive(emptyForm())
  // n-date-picker 用的是時間戳（ms），送出時再轉成後端要的日期字串
  const dueDateTimestamp = ref<number | null>(null)

  const rules: FormRules = {
    title: { required: true, message: '請輸入優惠券名稱', trigger: 'blur' },
    code: { required: true, message: '請輸入優惠碼', trigger: 'blur' },
    percent: { required: true, type: 'number', message: '請輸入折扣百分比', trigger: 'blur' },
  }

  onMounted(() => load(1))

  function openCreate() {
    isEdit.value = false
    editingId.value = null
    Object.assign(form, emptyForm())
    dueDateTimestamp.value = null
    openDialog({ title: '新增優惠券' })
  }

  function openEdit(coupon: Coupon) {
    isEdit.value = true
    editingId.value = coupon.id!
    Object.assign(form, {
      title: coupon.title,
      code: coupon.code,
      percent: coupon.percent,
      is_enabled: coupon.is_enabled,
    })
    dueDateTimestamp.value = coupon.due_date ? new Date(coupon.due_date).getTime() : null
    openDialog({ title: '編輯優惠券' })
  }

  async function handleSubmit() {
    await formRef.value?.validate()

    if (!dueDateTimestamp.value) {
      message.error('請選擇到期日')
      return
    }

    const payload: CouponInput = {
      ...form,
      due_date: toLocalDateString(dueDateTimestamp.value),
    }

    submitting.value = true
    try {
      if (isEdit.value && editingId.value) {
        await api.admin.adminUpdateCoupon(editingId.value, payload)
        message.success('更新成功')
      } else {
        await api.admin.adminCreateCoupon(payload)
        message.success('新增成功')
      }
      closeDialog()
      await load(page.value)
    } catch (error) {
      message.error(apiErrorMessage(error, '儲存失敗，優惠碼可能重複'))
    } finally {
      submitting.value = false
    }
  }

  function handleDelete(coupon: Coupon) {
    // 刪除不能復原：用「危險」類型（紅色圖示和刪除鈕）；取消鈕維持灰色，畫面上只有刪除鈕有顏色
    // （灰色的焦點、hover 樣式在 utils/naive-theme.ts）
    naiveDialog.error({
      title: '刪除優惠券',
      content: `確定要刪除「${coupon.title}」嗎？`,
      positiveText: '刪除',
      negativeText: '取消',
      onPositiveClick: async () => {
        try {
          await api.admin.adminDeleteCoupon(coupon.id)
          message.success('刪除成功')
          await load(page.value)
        } catch (error) {
          message.error(apiErrorMessage(error, '刪除失敗，此優惠券可能已被訂單使用，可改為停用'))
        }
      },
    })
  }

  const columns: DataTableColumns<Coupon> = [
    { title: '名稱', key: 'title' },
    { title: '優惠碼', key: 'code' },
    { title: '折扣', key: 'percent', render: (row) => `${row.percent}%` },
    { title: '到期日', key: 'due_date', render: (row) => formatDate(row.due_date) },
    {
      title: '狀態',
      key: 'is_enabled',
      render: (row) =>
        h(
          NTag,
          { type: row.is_enabled ? 'success' : 'default', size: 'small' },
          { default: () => (row.is_enabled ? '啟用' : '停用') },
        ),
    },
    {
      title: '操作',
      key: 'actions',
      render: (row) =>
        h(NSpace, null, {
          default: () => [
            // 列表上的動作按鈕：綠色外框和文字（後台的 primary 是綠色）
            h(
              NButton,
              { size: 'small', type: 'primary', ghost: true, onClick: () => openEdit(row) },
              { default: () => '編輯' },
            ),
            h(
              NButton,
              { size: 'small', type: 'error', ghost: true, onClick: () => handleDelete(row) },
              { default: () => '刪除' },
            ),
          ],
        }),
    },
  ]

  const pagination = computed(() => ({
    page: page.value,
    pageCount: totalPages.value,
    onUpdatePage: (p: number) => load(p),
  }))
</script>

<template>
  <n-card title="優惠券管理">
    <template #header-extra>
      <n-button type="primary" @click="openCreate">新增優惠券</n-button>
    </template>

    <n-data-table
      :columns="columns"
      :data="coupons"
      :loading="loading"
      :pagination="pagination"
      :row-key="(row: Coupon) => row.id"
      remote
    />

    <!-- 最高到視窗高度減上下各 40px：標題和底部按鈕固定，只有中間內容捲動，內容再多按鈕也不會被推出畫面 -->
    <n-modal
      v-model:show="showDialog"
      preset="card"
      :title="dialogOptions.title"
      style="width: 480px; max-height: calc(100vh - 80px)"
      content-scrollable
    >
      <n-form ref="formRef" :model="form" :rules="rules" label-placement="top">
        <n-form-item label="名稱" path="title">
          <n-input v-model:value="form.title" />
        </n-form-item>
        <n-form-item label="優惠碼" path="code">
          <n-input v-model:value="form.code" />
        </n-form-item>
        <n-form-item label="折扣（要付的百分比，90 代表打 9 折）" path="percent">
          <n-input-number v-model:value="form.percent" :min="1" :max="100" style="width: 100%" />
        </n-form-item>
        <n-form-item label="到期日">
          <n-date-picker v-model:value="dueDateTimestamp" type="date" style="width: 100%" />
        </n-form-item>
        <n-form-item label="啟用">
          <n-switch v-model:value="form.is_enabled" />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space justify="end">
          <n-button type="primary" ghost @click="closeDialog">取消</n-button>
          <n-button type="primary" :loading="submitting" @click="handleSubmit">儲存</n-button>
        </n-space>
      </template>
    </n-modal>
  </n-card>
</template>
