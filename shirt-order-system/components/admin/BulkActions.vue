<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  selectedCount: number
  selectedIds: string[]
}>()

const emit = defineEmits<{
  (e: 'action', payload: { action: 'set_status' | 'set_payment_status' | 'delete'; value?: string }): void
  (e: 'clear'): void
}>()

const showDeleteConfirm = ref(false)

function onStatusSelect(e: Event) {
  const select = e.target as HTMLSelectElement
  const val = select.value
  if (!val) return
  emit('action', { action: 'set_status', value: val })
  select.value = ''
}

function onPaymentSelect(e: Event) {
  const select = e.target as HTMLSelectElement
  const val = select.value
  if (!val) return
  emit('action', { action: 'set_payment_status', value: val })
  select.value = ''
}

function confirmDelete() {
  showDeleteConfirm.value = false
  emit('action', { action: 'delete' })
}
</script>

<template>
  <div
    v-if="selectedCount > 0"
    class="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-gray-900/95 dark:bg-gray-800/95 text-white backdrop-blur-xl px-5 py-3 rounded-2xl shadow-soft-xl border border-gray-700 flex flex-wrap items-center gap-3 animate-slide-up"
  >
    <div class="flex items-center gap-2 pr-3 border-r border-gray-700">
      <span class="w-6 h-6 rounded-full bg-primary-500 text-white font-bold text-xs flex items-center justify-center">
        {{ selectedCount }}
      </span>
      <span class="text-xs font-semibold text-gray-200">Selected</span>
    </div>

    <!-- Set Status Dropdown -->
    <select
      class="text-xs font-medium bg-gray-800 dark:bg-gray-700 text-white border border-gray-600 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
      @change="onStatusSelect"
    >
      <option value="" disabled selected>Change Status...</option>
      <option value="pending">Set Pending</option>
      <option value="confirmed">Set Confirmed</option>
      <option value="in_production">Set In Production</option>
      <option value="ready">Set Ready</option>
      <option value="delivered">Set Delivered</option>
      <option value="cancelled">Set Cancelled</option>
    </select>

    <!-- Set Payment Dropdown -->
    <select
      class="text-xs font-medium bg-gray-800 dark:bg-gray-700 text-white border border-gray-600 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
      @change="onPaymentSelect"
    >
      <option value="" disabled selected>Change Payment...</option>
      <option value="unpaid">Set Unpaid</option>
      <option value="partial">Set Partial</option>
      <option value="paid">Set Paid</option>
    </select>

    <!-- Delete Selected Button -->
    <button
      type="button"
      class="text-xs font-semibold px-3 py-1.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white transition flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-red-500"
      @click="showDeleteConfirm = true"
    >
      <Icon name="lucide:trash-2" class="w-3.5 h-3.5" />
      <span>Delete</span>
    </button>

    <!-- Clear Selection -->
    <button
      type="button"
      class="p-1 rounded-lg text-gray-400 hover:text-white transition ml-1"
      title="Deselect all"
      @click="emit('clear')"
    >
      <Icon name="lucide:x" class="w-4 h-4" />
    </button>

    <!-- Delete Confirmation Modal -->
    <BaseConfirmDialog
      :open="showDeleteConfirm"
      title="Delete Selected Orders?"
      :message="`Are you sure you want to permanently delete ${selectedCount} selected orders? This action cannot be undone.`"
      confirm-text="Delete Orders"
      variant="danger"
      @confirm="confirmDelete"
      @cancel="showDeleteConfirm = false"
    />
  </div>
</template>

