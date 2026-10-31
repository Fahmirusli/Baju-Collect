<script setup lang="ts">
import { ref, watch } from 'vue'
import type { SizeOption, SleeveTypeOption } from '~/shared/types'

const props = defineProps<{
  modelValue: {
    search?: string
    status?: string
    paymentStatus?: string
    size?: string
    sleeve?: string
    dateFrom?: string
    dateTo?: string
  }
  sizes: SizeOption[]
  sleeveTypes: SleeveTypeOption[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: any): void
  (e: 'reset'): void
}>()

const local = ref({ ...props.modelValue })

watch(
  () => props.modelValue,
  (val) => {
    local.value = { ...val }
  },
  { deep: true }
)

function update(key: string, value: any) {
  local.value = { ...local.value, [key]: value || undefined }
  emit('update:modelValue', local.value)
}

function resetAll() {
  local.value = {}
  emit('reset')
}

const statusOptions = [
  { value: '', label: 'All Order Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'in_production', label: 'In Production' },
  { value: 'ready', label: 'Ready' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
]

const paymentOptions = [
  { value: '', label: 'All Payment Statuses' },
  { value: 'unpaid', label: 'Unpaid' },
  { value: 'partial', label: 'Partial' },
  { value: 'paid', label: 'Paid' },
]
</script>

<template>
  <div class="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-2xl border border-gray-100 dark:border-gray-700/60 shadow-soft space-y-4">
    <!-- Row 1: Search + Quick Selects -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <!-- Search Input -->
      <div class="relative lg:col-span-2">
        <Icon
          name="lucide:search"
          class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          :value="local.search || ''"
          type="text"
          placeholder="Search by code, customer, contact, shirt name..."
          class="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
          @input="update('search', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <!-- Order Status Filter -->
      <div>
        <select
          :value="local.status || ''"
          class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition cursor-pointer"
          @change="update('status', ($event.target as HTMLSelectElement).value)"
        >
          <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>

      <!-- Payment Status Filter -->
      <div>
        <select
          :value="local.paymentStatus || ''"
          class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition cursor-pointer"
          @change="update('paymentStatus', ($event.target as HTMLSelectElement).value)"
        >
          <option v-for="opt in paymentOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>
    </div>

    <!-- Row 2: Size + Sleeve Filter + Date Range + Reset -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1 border-t border-gray-100 dark:border-gray-700/40">
      <!-- Size Filter -->
      <div>
        <select
          :value="local.size || ''"
          class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition cursor-pointer"
          @change="update('size', ($event.target as HTMLSelectElement).value)"
        >
          <option value="">All Sizes</option>
          <option v-for="s in sizes" :key="s.id" :value="s.label">
            Size: {{ s.label }}
          </option>
        </select>
      </div>

      <!-- Sleeve Type Filter -->
      <div>
        <select
          :value="local.sleeve || ''"
          class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition cursor-pointer"
          @change="update('sleeve', ($event.target as HTMLSelectElement).value)"
        >
          <option value="">All Sleeve Types</option>
          <option v-for="st in sleeveTypes" :key="st.id" :value="st.label">
            Sleeve: {{ st.label }}
          </option>
        </select>
      </div>

      <!-- Date From -->
      <div>
        <input
          :value="local.dateFrom || ''"
          type="date"
          title="Date From"
          class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition cursor-pointer"
          @input="update('dateFrom', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <!-- Date To -->
      <div>
        <input
          :value="local.dateTo || ''"
          type="date"
          title="Date To"
          class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition cursor-pointer"
          @input="update('dateTo', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <!-- Reset Button -->
      <div>
        <button
          type="button"
          class="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/60 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 transition flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
          @click="resetAll"
        >
          <Icon name="lucide:rotate-ccw" class="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>
    </div>
  </div>
</template>

