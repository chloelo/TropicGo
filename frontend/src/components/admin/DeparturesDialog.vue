<script setup lang="ts">
  import { computed, h, ref, watch } from 'vue'
  import dayjs from 'dayjs'
  import {
    NButton,
    NSpace,
    NSwitch,
    NTag,
    useDialog as useNaiveDialog,
    useMessage,
    type DataTableColumns,
  } from 'naive-ui'
  import { api } from '@/api/client'
  import type { Tour, TourDeparture } from '@/api/tropicgo-api'
  import { useAdminAuthStore } from '@/stores/admin-auth'
  import DemoLock from '@/components/admin/DemoLock.vue'
  import { apiErrorMessage } from '@/utils/api-error'
  import { formatDate, getTaipeiToday, toLocalDateString } from '@/utils/format'

  const props = defineProps<{ tour: Tour | null }>()
  const show = defineModel<boolean>('show', { required: true })

  const message = useMessage()
  const naiveDialog = useNaiveDialog()
  const authStore = useAdminAuthStore()

  // 梯次的規則錯誤（已有人報名、名額不足等）顯示後端的說明
  const SHOW_BAD_REQUEST = [400]

  const departures = ref<TourDeparture[]>([])
  const loading = ref(false)

  async function load() {
    if (!props.tour) return
    loading.value = true
    try {
      const { data } = await api.admin.adminGetDepartures(props.tour.id)
      departures.value = data.data
    } catch (error) {
      message.error(apiErrorMessage(error, '梯次載入失敗'))
    } finally {
      loading.value = false
    }
  }

  // 新增和編輯共用上方的表單；editingId 有值代表正在編輯那一筆
  const editingId = ref<string | null>(null)
  // n-date-picker 用的是時間戳（ms），送出時再轉成後端要的日期字串
  const dateTimestamp = ref<number | null>(null)
  const capacity = ref<number | null>(null)
  const submitting = ref(false)

  const editing = computed(() => departures.value.find((d) => d.id === editingId.value))
  // 已有人報名就不能改日期（後端也會擋），先在畫面上鎖住
  const dateLocked = computed(() => (editing.value?.booked_count ?? 0) > 0)
  // 名額不能少於已報名人數（後端也會擋），編輯時把下限設成已報名人數，新增時最少 1
  const minCapacity = computed(() => Math.max(1, editing.value?.booked_count ?? 0))

  function resetForm() {
    editingId.value = null
    dateTimestamp.value = null
    capacity.value = null
  }

  function startEdit(departure: TourDeparture) {
    editingId.value = departure.id
    dateTimestamp.value = dayjs(departure.departure_date).valueOf()
    capacity.value = departure.capacity
  }

  watch(show, (visible) => {
    if (!visible) return
    resetForm()
    departures.value = []
    load()
  })

  // 出發日期最早只能選明天（台灣時間），跟後端「出發當天停止報名」一致
  function isDateDisabled(timestamp: number) {
    return toLocalDateString(timestamp) <= getTaipeiToday()
  }

  // 出發當天起（台灣時間）就截止報名，改名額沒有意義，停用編輯
  function isClosed(departure: TourDeparture) {
    return departure.departure_date <= getTaipeiToday()
  }

  async function handleSubmit() {
    if (!props.tour) return
    if (dateTimestamp.value === null) {
      message.error('請選擇出發日期')
      return
    }
    if (!capacity.value) {
      message.error('請輸入名額')
      return
    }

    const payload = {
      departure_date: toLocalDateString(dateTimestamp.value),
      capacity: capacity.value,
    }
    submitting.value = true
    try {
      if (editingId.value) {
        await api.admin.adminUpdateDeparture(editingId.value, payload)
        message.success('更新成功')
      } else {
        await api.admin.adminCreateDeparture(props.tour.id, payload)
        message.success('新增成功')
      }
      resetForm()
      await load()
    } catch (error) {
      message.error(apiErrorMessage(error, '儲存失敗', SHOW_BAD_REQUEST))
    } finally {
      submitting.value = false
    }
  }

  async function toggleEnabled(departure: TourDeparture, isEnabled: boolean) {
    try {
      await api.admin.adminUpdateDeparture(departure.id, { is_enabled: isEnabled })
      message.success(isEnabled ? '已開放報名' : '已關閉報名')
      await load()
    } catch (error) {
      message.error(apiErrorMessage(error, '更新失敗', SHOW_BAD_REQUEST))
    }
  }

  function handleDelete(departure: TourDeparture) {
    naiveDialog.error({
      title: '刪除梯次',
      content: `確定要刪除 ${formatDate(departure.departure_date)} 出發的梯次嗎？`,
      positiveText: '刪除',
      negativeText: '取消',
      onPositiveClick: async () => {
        try {
          await api.admin.adminDeleteDeparture(departure.id)
          message.success('刪除成功')
          if (editingId.value === departure.id) resetForm()
          await load()
        } catch (error) {
          message.error(apiErrorMessage(error, '刪除失敗，可改為關閉報名', SHOW_BAD_REQUEST))
        }
      },
    })
  }

  type DepartureStatus = { label: string; type: 'default' | 'error' | 'success' | 'info' }

  // 狀態依日期和人數算出來，判斷順序：已截止 → 關閉報名 → 額滿 → 已成團 → 招募中
  function statusOf(departure: TourDeparture): DepartureStatus {
    if (isClosed(departure)) return { label: '已截止', type: 'default' }
    if (!departure.is_enabled) return { label: '關閉報名', type: 'default' }
    if (departure.booked_count >= departure.capacity) return { label: '額滿', type: 'error' }
    if (props.tour && departure.booked_count >= props.tour.min_group_size) {
      return { label: '已成團', type: 'success' }
    }
    return { label: '招募中', type: 'info' }
  }

  const columns: DataTableColumns<TourDeparture> = [
    { title: '出發日期', key: 'departure_date', render: (row) => formatDate(row.departure_date) },
    { title: '名額', key: 'capacity' },
    { title: '已報名', key: 'booked_count' },
    {
      title: '狀態',
      key: 'status',
      render: (row) => {
        const status = statusOf(row)
        return h(NTag, { type: status.type, size: 'small' }, { default: () => status.label })
      },
    },
    {
      title: '開放報名',
      key: 'is_enabled',
      render: (row) =>
        h(DemoLock, null, {
          default: () =>
            h(NSwitch, {
              value: row.is_enabled,
              disabled: authStore.isDemo,
              'aria-label': '開放報名',
              onUpdateValue: (value: boolean) => toggleEnabled(row, value),
            }),
        }),
    },
    {
      title: '操作',
      key: 'actions',
      render: (row) =>
        h(NSpace, null, {
          default: () => [
            h(DemoLock, null, {
              default: () =>
                h(
                  NButton,
                  {
                    size: 'small',
                    type: 'primary',
                    ghost: true,
                    disabled: authStore.isDemo || isClosed(row),
                    onClick: () => startEdit(row),
                  },
                  { default: () => '編輯' },
                ),
            }),
            h(DemoLock, null, {
              default: () =>
                h(
                  NButton,
                  {
                    size: 'small',
                    type: 'error',
                    ghost: true,
                    disabled: authStore.isDemo,
                    onClick: () => handleDelete(row),
                  },
                  { default: () => '刪除' },
                ),
            }),
          ],
        }),
    },
  ]
</script>

<template>
  <n-modal
    v-model:show="show"
    preset="card"
    :title="`梯次管理 - ${tour?.title ?? ''}`"
    style="width: 760px; max-height: calc(100vh - 80px)"
    content-scrollable
  >
    <p class="mb-3 text-sm">成團人數：{{ tour?.min_group_size }} 人</p>
    <!-- 產品下架後前台整個看不到，梯次狀態仍照梯次本身顯示，這裡提醒避免誤會 -->
    <n-alert
      v-if="tour && !tour.is_enabled"
      type="warning"
      :show-icon="false"
      class="mb-3"
    >
      此產品已下架，前台看不到這些梯次
    </n-alert>

    <!-- 新增和編輯共用這一排；編輯時按鈕變成「儲存」，多一個「取消編輯」 -->
    <div class="flex flex-wrap items-end gap-3">
      <n-form-item
        label="出發日期"
        :show-feedback="false"
      >
        <n-date-picker
          v-model:value="dateTimestamp"
          type="date"
          placeholder="請選擇日期"
          :is-date-disabled="isDateDisabled"
          :disabled="authStore.isDemo || dateLocked"
        />
      </n-form-item>
      <n-form-item
        label="名額"
        :show-feedback="false"
      >
        <n-input-number
          v-model:value="capacity"
          placeholder="人數"
          :min="minCapacity"
          :disabled="authStore.isDemo"
        />
      </n-form-item>
      <DemoLock>
        <n-button
          type="primary"
          :loading="submitting"
          :disabled="authStore.isDemo"
          @click="handleSubmit"
        >
          {{ editingId ? '儲存' : '新增梯次' }}
        </n-button>
      </DemoLock>
      <n-button
        v-if="editingId"
        type="primary"
        ghost
        @click="resetForm"
      >
        取消編輯
      </n-button>
    </div>
    <p
      v-if="dateLocked"
      class="mt-2 text-sm"
    >
      已有人報名，出發日期不能修改
    </p>

    <n-data-table
      class="mt-4"
      :columns="columns"
      :data="departures"
      :loading="loading"
      :row-key="(row: TourDeparture) => row.id"
    />

    <template #footer>
      <n-space justify="end">
        <n-button
          type="primary"
          ghost
          @click="show = false"
        >
          關閉
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>
