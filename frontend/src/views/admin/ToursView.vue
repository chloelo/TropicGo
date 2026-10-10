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
  import { apiErrorMessage } from '@/utils/api-error'
  import type { Region, Tour, TourInput } from '@/api/tropicgo-api'
  import { useDialog } from '@/composables/use-dialog'
  import { useTable } from '@/composables/use-table'
  import { DEPARTURE_CITIES, isDepartureCity, type DepartureCity } from '@/utils/departure-city'
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

  // 出發城市是下拉選單，編輯時如果原本的值不在選項裡就先清空（null），讓必填驗證提醒重新選
  type TourForm = Omit<TourInput, 'images' | 'departure_city'> & {
    departure_city: DepartureCity | null
  }

  const departureCityOptions = DEPARTURE_CITIES.map((city) => ({ label: city, value: city }))

  function emptyForm(): TourForm {
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
  // 圖片網址用一行一個的文字框輸入，送出時再切成陣列（比動態增減欄位簡單）
  const imagesText = ref('')

  const rules: FormRules = {
    title: { required: true, message: '請輸入產品名稱', trigger: 'blur' },
    region_id: { required: true, message: '請選擇地區', trigger: 'change' },
    summary: { required: true, message: '請輸入產品摘要', trigger: 'blur' },
    description: { required: true, message: '請輸入產品介紹', trigger: 'blur' },
    content: { required: true, message: '請輸入費用包含說明', trigger: 'blur' },
    departure_city: { required: true, message: '請選擇出發城市', trigger: 'change' },
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
    openDialog({ title: '新增產品' })
  }

  function openEdit(tour: Tour) {
    isEdit.value = true
    editingId.value = tour.id
    Object.assign(form, {
      title: tour.title,
      region_id: tour.region.id,
      summary: tour.summary,
      description: tour.description,
      content: tour.content,
      unit: tour.unit,
      departure_city: isDepartureCity(tour.departure_city) ? tour.departure_city : null,
      origin_price: tour.origin_price,
      price: tour.price,
      is_popular: tour.is_popular,
      is_enabled: tour.is_enabled,
    })
    imagesText.value = tour.images.map((img) => img.url).join('\n')
    openDialog({ title: '編輯產品' })
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

    // 上面的驗證已經擋掉 null，這裡的檢查只是讓型別確定出發城市不是 null
    const departureCity = form.departure_city
    if (!departureCity) return

    const payload: TourInput = { ...form, departure_city: departureCity, images }

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
    } catch (error) {
      message.error(apiErrorMessage(error, '儲存失敗，請檢查欄位內容'))
    } finally {
      submitting.value = false
    }
  }

  function handleDelete(tour: Tour) {
    // 刪除不能復原：用「危險」類型（紅色圖示和刪除鈕）；取消鈕維持灰色，畫面上只有刪除鈕有顏色
    // （灰色的焦點、hover 樣式在 utils/naive-theme.ts）
    naiveDialog.error({
      title: '刪除產品',
      content: `確定要刪除「${tour.title}」嗎？`,
      positiveText: '刪除',
      negativeText: '取消',
      onPositiveClick: async () => {
        try {
          await api.admin.adminDeleteTour(tour.id)
          message.success('刪除成功')
          await load(page.value)
        } catch (error) {
          message.error(apiErrorMessage(error, '刪除失敗，此產品可能已有訂單使用，可改為下架'))
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
    pageCount: Math.max(1, Math.ceil(total.value / PAGE_SIZE)),
    onUpdatePage: (p: number) => load(p),
  }))
</script>

<template>
  <n-card title="產品管理">
    <template #header-extra>
      <n-button type="primary" @click="openCreate">新增產品</n-button>
    </template>

    <n-data-table
      :columns="columns"
      :data="tours"
      :loading="loading"
      :pagination="pagination"
      :row-key="(row: Tour) => row.id"
      remote
    />

    <!-- 最高到視窗高度減上下各 40px：標題和底部按鈕固定，只有中間內容捲動，內容再多按鈕也不會被推出畫面 -->
    <n-modal
      v-model:show="showDialog"
      preset="card"
      :title="dialogOptions.title"
      style="width: 600px; max-height: calc(100vh - 80px)"
      content-scrollable
    >
      <n-form ref="formRef" :model="form" :rules="rules" label-placement="top">
        <n-form-item label="產品名稱" path="title">
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
          <n-select
            v-model:value="form.departure_city"
            :options="departureCityOptions"
            placeholder="請選擇"
          />
        </n-form-item>
        <n-form-item label="原價">
          <n-input-number v-model:value="form.origin_price" :min="0" style="width: 100%" />
        </n-form-item>
        <n-form-item label="優惠價">
          <n-input-number v-model:value="form.price" :min="0" style="width: 100%" />
        </n-form-item>
        <n-form-item label="圖片網址（每行一個）">
          <n-input
            v-model:value="imagesText"
            type="textarea"
            :rows="3"
            placeholder="https://example.com/1.jpg&#10;https://example.com/2.jpg"
          />
        </n-form-item>
        <!-- 兩個開關同一排各佔一半，文字在左、開關緊接在右邊。
             不用 n-form-item 的 label：左側 label 的寬度是整個表單統一算的，短的「上架」前面會空一截 -->
        <div class="grid grid-cols-2">
          <n-form-item :show-label="false">
            <span class="mr-3">熱門產品</span>
            <n-switch v-model:value="form.is_popular" aria-label="熱門產品" />
          </n-form-item>
          <n-form-item :show-label="false">
            <span class="mr-3">上架</span>
            <n-switch v-model:value="form.is_enabled" aria-label="上架" />
          </n-form-item>
        </div>
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
