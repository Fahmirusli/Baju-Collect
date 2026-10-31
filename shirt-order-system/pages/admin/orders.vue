<script setup lang="ts">
import { ref, watch } from 'vue'
import type {
  PaginatedResponse,
  OrderListItem,
  SizeOption,
  SleeveTypeOption,
  SettingsData,
} from '~/shared/types'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

useHead({
  title: 'Orders Management | Admin',
})

const toast = useToast()

// Query filters state
const queryParams = ref({
  page: 1,
  limit: 20,
  search: '',
  status: '',
  paymentStatus: '',
  size: '',
  sleeve: '',
  dateFrom: '',
  dateTo: '',
  sortBy: 'created_at',
  sortDir: 'desc' as 'asc' | 'desc',
})

// Drawer & Modal states
const activeOrderId = ref<string | null>(null)
const isDrawerOpen = ref(false)
const isCreateModalOpen = ref(false)
const selectedOrderIds = ref<string[]>([])

// Fetch settings (for sizes, sleeves, base price, currency)
const { data: settingsData } = await useFetch<SettingsData>('/api/admin/settings')

const sizes = computed<SizeOption[]>(() => settingsData.value?.sizes || [])
const sleeveTypes = computed<SleeveTypeOption[]>(() => settingsData.value?.sleeveTypes || [])
const currency = computed(() => settingsData.value?.currency || 'MYR')
const basePrice = computed(() => settingsData.value?.basePrice || 35)

// Fetch orders list with query parameters
const { data: ordersData, status: loadingStatus, refresh } = await useFetch<PaginatedResponse<OrderListItem>>(
  '/api/admin/orders',
  {
    query: queryParams,
    watch: [queryParams],
  }
)

const tableColumns = [
  { key: 'code', label: 'Order Code', sortable: true },
  { key: 'customerName', label: 'Customer', sortable: true },
  { key: 'contact', label: 'Contact' },
  { key: 'totalQuantity', label: 'Shirts' },
  { key: 'totalPrice', label: 'Total Price', sortable: true },
  { key: 'status', label: 'Order Status' },
  { key: 'paymentStatus', label: 'Payment' },
  { key: 'createdAt', label: 'Created At', sortable: true },
]

function handleSort(key: string, dir: 'asc' | 'desc') {
  queryParams.value.sortBy = key
  queryParams.value.sortDir = dir
}

function handleRowClick(row: OrderListItem) {
  activeOrderId.value = row.id
  isDrawerOpen.value = true
}

function handleBulkAction(payload: { action: 'set_status' | 'set_payment_status' | 'delete'; value?: string }) {
  if (selectedOrderIds.value.length === 0) return

  $fetch('/api/admin/orders/bulk', {
    method: 'POST',
    body: {
      ids: selectedOrderIds.value,
      action: payload.action,
      value: payload.value,
    },
  })
    .then((res: any) => {
      toast.success('Bulk update', `Updated ${res.affected} orders successfully.`)
      selectedOrderIds.value = []
      refresh()
    })
    .catch((err) => {
      toast.error('Bulk action failed', err.data?.message || err.message)
    })
}

function exportExcel(filtered = true) {
  const url = new URL('/api/admin/export', window.location.origin)
  if (filtered) {
    if (queryParams.value.search) url.searchParams.set('search', queryParams.value.search)
    if (queryParams.value.status) url.searchParams.set('status', queryParams.value.status)
    if (queryParams.value.paymentStatus) url.searchParams.set('paymentStatus', queryParams.value.paymentStatus)
    if (queryParams.value.size) url.searchParams.set('size', queryParams.value.size)
    if (queryParams.value.sleeve) url.searchParams.set('sleeve', queryParams.value.sleeve)
    if (queryParams.value.dateFrom) url.searchParams.set('dateFrom', queryParams.value.dateFrom)
    if (queryParams.value.dateTo) url.searchParams.set('dateTo', queryParams.value.dateTo)
  }
  window.open(url.toString(), '_blank')
}
</script>

<template>
  <div class="space-y-6 pb-20">
    <!-- Top Action Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-white">
          Orders Management
        </h1>
        <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          View, filter, manage and export all shirt orders.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <!-- Export Excel dropdown/button -->
        <button
          type="button"
          class="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition flex items-center gap-2"
          @click="exportExcel(true)"
        >
          <Icon name="lucide:file-spreadsheet" class="w-4 h-4" />
          <span>Export Excel (.xlsx)</span>
        </button>

        <!-- Create Manual Order Button -->
        <BaseButton variant="primary" size="md" @click="isCreateModalOpen = true">
          <Icon name="lucide:plus" class="w-4 h-4 mr-1.5" />
          <span>Create Order</span>
        </BaseButton>
      </div>
    </div>

    <!-- Filters Panel -->
    <AdminOrderFilters
      v-model="queryParams"
      :sizes="sizes"
      :sleeve-types="sleeveTypes"
      @reset="queryParams = { page: 1, limit: 20, search: '', status: '', paymentStatus: '', size: '', sleeve: '', dateFrom: '', dateTo: '', sortBy: 'created_at', sortDir: 'desc' }"
    />

    <!-- Data Table -->
    <AdminDataTable
      :columns="tableColumns"
      :rows="ordersData?.data || []"
      :loading="loadingStatus === 'pending'"
      selectable
      :selected-ids="selectedOrderIds"
      :sort-by="queryParams.sortBy"
      :sort-dir="queryParams.sortDir"
      @sort="handleSort"
      @select="(ids) => (selectedOrderIds = ids)"
      @row-click="handleRowClick"
    >
      <template #row="{ row }">
        <td class="px-4 py-3.5 font-mono font-bold text-primary-600 dark:text-primary-400">
          {{ row.code }}
        </td>
        <td class="px-4 py-3.5 font-semibold text-gray-900 dark:text-white">
          {{ row.customerName }}
        </td>
        <td class="px-4 py-3.5 text-gray-500 dark:text-gray-400">
          {{ row.contact }}
        </td>
        <td class="px-4 py-3.5 font-bold font-mono text-gray-700 dark:text-gray-300">
          {{ row.totalQuantity }}
        </td>
        <td class="px-4 py-3.5 font-heading font-bold text-gray-900 dark:text-white">
          {{ currency }} {{ Number(row.totalPrice).toFixed(2) }}
        </td>
        <td class="px-4 py-3.5">
          <BaseStatusBadge :status="row.status" type="order" />
        </td>
        <td class="px-4 py-3.5">
          <BaseStatusBadge :status="row.paymentStatus" type="payment" />
        </td>
        <td class="px-4 py-3.5 text-[11px] text-gray-400">
          {{ new Date(row.createdAt).toLocaleDateString() }}
        </td>
      </template>
    </AdminDataTable>

    <!-- Pagination Controls -->
    <div
      v-if="ordersData && ordersData.totalPages > 1"
      class="flex items-center justify-between px-2 pt-2 text-xs text-gray-500 dark:text-gray-400"
    >
      <div>
        Showing {{ (ordersData.page - 1) * ordersData.limit + 1 }} to
        {{ Math.min(ordersData.page * ordersData.limit, ordersData.total) }} of {{ ordersData.total }} orders
      </div>

      <div class="flex items-center gap-1.5">
        <button
          type="button"
          :disabled="ordersData.page <= 1"
          class="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          @click="queryParams.page--"
        >
          Previous
        </button>
        <span class="px-2 font-bold">{{ ordersData.page }} / {{ ordersData.totalPages }}</span>
        <button
          type="button"
          :disabled="ordersData.page >= ordersData.totalPages"
          class="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          @click="queryParams.page++"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Bulk Actions Floating Bar -->
    <AdminBulkActions
      :selected-count="selectedOrderIds.length"
      :selected-ids="selectedOrderIds"
      @action="handleBulkAction"
      @clear="selectedOrderIds = []"
    />

    <!-- Order Detail Side Drawer -->
    <AdminOrderDrawer
      :open="isDrawerOpen"
      :order-id="activeOrderId"
      :sizes="sizes"
      :sleeve-types="sleeveTypes"
      :currency="currency"
      @close="isDrawerOpen = false"
      @updated="refresh"
      @deleted="refresh"
    />

    <!-- Create Manual Order Modal -->
    <AdminCreateOrderModal
      :open="isCreateModalOpen"
      :sizes="sizes"
      :sleeve-types="sleeveTypes"
      :base-price="basePrice"
      :currency="currency"
      @close="isCreateModalOpen = false"
      @created="refresh"
    />
  </div>
</template>

