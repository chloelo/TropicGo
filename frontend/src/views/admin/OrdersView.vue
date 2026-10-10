<script setup lang="ts">
  import { computed, h, onMounted, ref } from 'vue'
  import { NButton, NTag, useMessage, type DataTableColumns, type SelectOption } from 'naive-ui'
  import { api } from '@/api/client'
  import { apiErrorMessage } from '@/utils/api-error'
  import type { Order } from '@/api/tropicgo-api'
  import { useDialog } from '@/composables/use-dialog'
  import { useTable } from '@/composables/use-table'
  import { formatCurrency, formatDateTime } from '@/utils/format'
  import { paymentLabel } from '@/utils/payment'

  type OrderStatus = 'PENDING' | 'PAID' | 'CANCELLED' | 'COMPLETED'

  const STATUS_LABEL: Record<OrderStatus, string> = {
    PENDING: '待付款',
    PAID: '已付款',
    CANCELLED: '已取消',
    COMPLETED: '已完成',
  }

  const STATUS_TAG_TYPE: Record<OrderStatus, 'warning' | 'success' | 'error' | 'info'> = {
    PENDING: 'warning',
    PAID: 'success',
    CANCELLED: 'error',
    COMPLETED: 'info',
  }

  const STATUS_OPTIONS: SelectOption[] = (Object.keys(STATUS_LABEL) as OrderStatus[]).map(
    (status) => ({ label: STATUS_LABEL[status], value: status }),
  )

  const message = useMessage()

  const {
    data: orders,
    page,
    totalPages,
    loading,
    load,
  } = useTable<Order>(async (p) => {
    const { data } = await api.admin.adminGetOrders({ page: p })
    return { data: data.data, meta: data.meta }
  })

  const { showDialog, dialogOptions, openDialog, closeDialog } = useDialog<Order>()

  const selectedStatus = ref<OrderStatus>('PENDING')
  const updating = ref(false)

  onMounted(() => load(1))

  function openDetail(order: Order) {
    selectedStatus.value = order.status
    openDialog({ title: `訂單明細 - ${order.order_number}`, data: order })
  }

  async function handleUpdateStatus() {
    const order = dialogOptions.value.data
    if (!order?.id) return

    updating.value = true
    try {
      await api.admin.adminUpdateOrderStatus(order.id, { status: selectedStatus.value })
      message.success('狀態更新成功')
      closeDialog()
      await load(page.value)
    } catch (error) {
      message.error(apiErrorMessage(error, '更新失敗'))
    } finally {
      updating.value = false
    }
  }

  const columns: DataTableColumns<Order> = [
    { title: '訂單編號', key: 'order_number' },
    { title: '客戶', key: 'customer_name' },
    { title: '電話', key: 'customer_phone' },
    { title: '金額', key: 'total_amount', render: (row) => formatCurrency(row.total_amount) },
    {
      title: '狀態',
      key: 'status',
      render: (row) => {
        const status = row.status as OrderStatus
        return h(
          NTag,
          { type: STATUS_TAG_TYPE[status], size: 'small' },
          { default: () => STATUS_LABEL[status] },
        )
      },
    },
    { title: '建立時間', key: 'created_at', render: (row) => formatDateTime(row.created_at) },
    {
      title: '操作',
      key: 'actions',
      // 列表上的動作按鈕：綠色外框和文字，跟產品、優惠券的編輯按鈕一致
      render: (row) =>
        h(
          NButton,
          { size: 'small', type: 'primary', ghost: true, onClick: () => openDetail(row) },
          { default: () => '查看明細' },
        ),
    },
  ]

  const pagination = computed(() => ({
    page: page.value,
    pageCount: totalPages.value,
    onUpdatePage: (p: number) => load(p),
  }))
</script>

<template>
  <n-card title="訂單管理">
    <n-data-table
      :columns="columns"
      :data="orders"
      :loading="loading"
      :pagination="pagination"
      :row-key="(row: Order) => row.id"
      remote
    />

    <!-- 最高到視窗高度減上下各 40px：標題和底部按鈕固定，只有中間內容捲動，內容再多按鈕也不會被推出畫面 -->
    <n-modal
      v-model:show="showDialog"
      preset="card"
      :title="dialogOptions.title"
      style="width: 560px; max-height: calc(100vh - 80px)"
      content-scrollable
    >
      <template v-if="dialogOptions.data">
        <n-descriptions :column="1" label-placement="left" bordered size="small">
          <n-descriptions-item label="客戶">
            {{ dialogOptions.data.customer_name }}
          </n-descriptions-item>
          <n-descriptions-item label="Email">
            {{ dialogOptions.data.customer_email }}
          </n-descriptions-item>
          <n-descriptions-item label="電話">
            {{ dialogOptions.data.customer_phone }}
          </n-descriptions-item>
          <n-descriptions-item label="地址">
            {{ dialogOptions.data.customer_address }}
          </n-descriptions-item>
          <!-- 付款方式是後來才加的欄位，更早建立的訂單沒有值就不顯示 -->
          <n-descriptions-item v-if="dialogOptions.data.payment_method" label="付款方式">
            {{ paymentLabel(dialogOptions.data.payment_method) }}
          </n-descriptions-item>
          <n-descriptions-item v-if="dialogOptions.data.message" label="備註">
            {{ dialogOptions.data.message }}
          </n-descriptions-item>
          <n-descriptions-item v-if="dialogOptions.data.coupon" label="使用優惠券">
            {{ dialogOptions.data.coupon.title }}（{{ dialogOptions.data.coupon.code }}）
          </n-descriptions-item>
        </n-descriptions>

        <h4 class="mt-4 mb-2 font-bold">產品明細</h4>
        <ul class="list-none mb-4">
          <li
            v-for="item in dialogOptions.data.items"
            :key="item.id"
            class="flex justify-between py-1 border-b border-gray-100 text-sm"
          >
            <span>{{ item.title_snapshot }} × {{ item.quantity }}</span>
            <span>{{ formatCurrency(item.subtotal) }}</span>
          </li>
        </ul>
        <div class="flex justify-between font-bold mb-4">
          <span>總金額</span>
          <span>{{ formatCurrency(dialogOptions.data.total_amount) }}</span>
        </div>

        <n-form-item label="訂單狀態" label-placement="left">
          <n-select v-model:value="selectedStatus" :options="STATUS_OPTIONS" />
        </n-form-item>
      </template>

      <template #footer>
        <n-space justify="end">
          <n-button type="primary" ghost @click="closeDialog">取消</n-button>
          <n-button type="primary" :loading="updating" @click="handleUpdateStatus">
            更新狀態
          </n-button>
        </n-space>
      </template>
    </n-modal>
  </n-card>
</template>
