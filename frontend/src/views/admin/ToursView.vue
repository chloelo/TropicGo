<script setup lang="ts">
  import { computed, h, onMounted, reactive, ref } from 'vue'
  import {
    NButton,
    NImage,
    NSpace,
    NTag,
    useDialog as useNaiveDialog,
    useMessage,
    type DataTableColumns,
    type FormInst,
    type FormRules,
  } from 'naive-ui'
  import { api } from '@/api/client'
  import type { Region, Tour, TourInput } from '@/api/tropicgo-api'
  import { useDialog } from '@/composables/use-dialog'
  import { useTable } from '@/composables/use-table'
  import { formatCurrency } from '@/utils/format'

  const PAGE_SIZE = 10

  const message = useMessage()
  const naiveDialog = useNaiveDialog()

  const regions = ref<Region[]>([])
  const regionOptions = computed(() => regions.value.map((r) => ({ label: r.name, value: r.id })))

  const {
    data: tours,
    page,
    total,
    loading,
    load,
  } = useTable<Tour>(async (p) => {
    const { data } = await api.admin.adminGetTours({ page: p })
    return { data: data.data, total: data.meta.total }
  })

  const { showDialog, dialogOptions, openDialog, closeDialog } = useDialog()

  const formRef = ref<FormInst | null>(null)
  const submitting = ref(false)
  const isEdit = ref(false)
  const editingId = ref<string | null>(null)

  function emptyForm() {
    return {
      title: '',
      region_id: '',
      summary: '',
      description: '',
      content: '',
      unit: '人',
      departure_city: '桃園',
      origin_price: 0,
      price: 0,
      is_popular: false,
      is_enabled: true,
    }
  }

  const form = reactive(emptyForm())
  // 圖片網址用一行一個的文字框輸入,送出時再切成陣列(比動態增減欄位簡單,也不受限於陣列筆數)
  const imagesText = ref('')

  const rules: FormRules = {
    title: { required: true, message: '請輸入行程名稱', trigger: 'blur' },
    region_id: { required: true, message: '請選擇地區', trigger: 'change' },
    summary: { required: true, message: '請輸入行程摘要', trigger: 'blur' },
    description: { required: true, message: '請輸入行程介紹', trigger: 'blur' },
    content: { required: true, message: '請輸入費用包含說明', trigger: 'blur' },
    departure_city: { required: true, message: '請輸入出發城市', trigger: 'blur' },
  }

  onMounted(async () => {
    const { data } = await api.regions.getRegions()
    regions.value = data.data
    await load(1)
  })

  function openCreate() {
    isEdit.value = false
    editingId.value = null
    Object.assign(form, emptyForm())
    imagesText.value = ''
    openDialog({ title: '新增行程' })
  }

  function openEdit(tour: Tour) {
    isEdit.value = true
    editingId.value = tour.id!
    Object.assign(form, {
      title: tour.title,
      region_id: tour.region.id,
      summary: tour.summary,
      description: tour.description,
      content: tour.content,
      unit: tour.unit,
      departure_city: tour.departure_city,
      origin_price: tour.origin_price,
      price: tour.price,
      is_popular: tour.is_popular,
      is_enabled: tour.is_enabled,
    })
    imagesText.value = tour.images.map((img) => img.url).join('\n')
    openDialog({ title: '編輯行程' })
  }

  async function handleSubmit() {
    await formRef.value?.validate()

    const images = imagesText.value
      .split('\n')
      .map((url) => url.trim())
      .filter((url) => url !== '')

    if (images.length === 0) {
      message.error('請至少提供一張圖片網址')
      return
    }

    const payload: TourInput = { ...form, images }

    submitting.value = true
    try {
      if (isEdit.value && editingId.value) {
        await api.admin.adminUpdateTour(editingId.value, payload)
        message.success('更新成功')
      } else {
        await api.admin.adminCreateTour(payload)
        message.success('新增成功')
      }
      closeDialog()
      await load(page.value)
    } catch {
      message.error('儲存失敗,請檢查欄位內容')
    } finally {
      submitting.value = false
    }
  }

  function handleDelete(tour: Tour) {
    naiveDialog.warning({
      title: '刪除行程',
      content: `確定要刪除「${tour.title}」嗎?`,
      positiveText: '刪除',
      negativeText: '取消',
      onPositiveClick: async () => {
        try {
          await api.admin.adminDeleteTour(tour.id)
          message.success('刪除成功')
          await load(page.value)
        } catch {
          message.error('刪除失敗,此行程可能已有訂單使用,可改為下架')
        }
      },
    })
  }

  const columns: DataTableColumns<Tour> = [
    {
      title: '圖片',
      key: 'image',
      width: 90,
      render: (row) =>
        row.images[0]?.url
          ? h(NImage, {
              src: row.images[0].url,
              width: 60,
              height: 60,
              objectFit: 'cover',
              previewDisabled: true,
            })
          : '—',
    },
    { title: '名稱', key: 'title' },
    { title: '地區', key: 'region', render: (row) => row.region.name },
    { title: '出發城市', key: 'departure_city' },
    { title: '價格', key: 'price', render: (row) => formatCurrency(row.price) },
    {
      title: '狀態',
      key: 'is_enabled',
      render: (row) =>
        h(
          NTag,
          { type: row.is_enabled ? 'success' : 'default', size: 'small' },
          { default: () => (row.is_enabled ? '上架' : '下架') },
        ),
    },
    {
      title: '操作',
      key: 'actions',
      render: (row) =>
        h(NSpace, null, {
          default: () => [
            h(NButton, { size: 'small', onClick: () => openEdit(row) }, { default: () => '編輯' }),
            h(
              NButton,
              { size: 'small', type: 'error', onClick: () => handleDelete(row) },
              { default: () => '刪除' },
            ),
          ],
        }),
    },
  ]

  const pagination = computed(() => ({
    page: page.value,
    pageCount: Math.max(1, Math.ceil(total.value / PAGE_SIZE)),
    onUpdatePage: (p: number) => load(p),
  }))
</script>

<template>
  <n-card title="行程管理">
    <template #header-extra>
      <n-button type="primary" @click="openCreate">新增行程</n-button>
    </template>

    <n-data-table
      :columns="columns"
      :data="tours"
      :loading="loading"
      :pagination="pagination"
      :row-key="(row: Tour) => row.id"
      remote
    />

    <n-modal
      v-model:show="showDialog"
      preset="card"
      :title="dialogOptions.title"
      style="width: 600px"
    >
      <n-form ref="formRef" :model="form" :rules="rules" label-placement="top">
        <n-form-item label="行程名稱" path="title">
          <n-input v-model:value="form.title" />
        </n-form-item>
        <n-form-item label="地區" path="region_id">
          <n-select v-model:value="form.region_id" :options="regionOptions" />
        </n-form-item>
        <n-form-item label="摘要" path="summary">
          <n-input v-model:value="form.summary" />
        </n-form-item>
        <n-form-item label="完整介紹" path="description">
          <n-input v-model:value="form.description" type="textarea" :rows="4" />
        </n-form-item>
        <n-form-item label="費用包含" path="content">
          <n-input v-model:value="form.content" type="textarea" :rows="2" />
        </n-form-item>
        <n-form-item label="單位">
          <n-input v-model:value="form.unit" />
        </n-form-item>
        <n-form-item label="出發城市" path="departure_city">
          <n-input v-model:value="form.departure_city" />
        </n-form-item>
        <n-form-item label="原價">
          <n-input-number v-model:value="form.origin_price" :min="0" style="width: 100%" />
        </n-form-item>
        <n-form-item label="優惠價">
          <n-input-number v-model:value="form.price" :min="0" style="width: 100%" />
        </n-form-item>
        <n-form-item label="圖片網址(每行一個)">
          <n-input
            v-model:value="imagesText"
            type="textarea"
            :rows="3"
            placeholder="https://example.com/1.jpg&#10;https://example.com/2.jpg"
          />
        </n-form-item>
        <n-form-item label="熱門行程">
          <n-switch v-model:value="form.is_popular" />
        </n-form-item>
        <n-form-item label="上架">
          <n-switch v-model:value="form.is_enabled" />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space justify="end">
          <n-button @click="closeDialog">取消</n-button>
          <n-button type="primary" :loading="submitting" @click="handleSubmit">儲存</n-button>
        </n-space>
      </template>
    </n-modal>
  </n-card>
</template>
