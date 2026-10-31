<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { PublicConfig, SizeOption, SleeveTypeOption, OrderData } from '~/shared/types'
import { createOrderSchema } from '~/shared/schemas'

const toast = useToast()

// Fetch public store configuration
const { data: config, status, error, refresh } = await useFetch<PublicConfig>('/api/public/config')

const showSizeChart = ref(false)
const submitting = ref(false)
const submittedOrder = ref<OrderData | null>(null)
const idempotencyKey = ref('')

onMounted(() => {
  idempotencyKey.value = crypto.randomUUID ? crypto.randomUUID() : 'idemp_' + Math.random().toString(36).slice(2)
})

const sizes = computed<SizeOption[]>(() => config.value?.sizes || [])
const sleeveTypes = computed<SleeveTypeOption[]>(() => config.value?.sleeveTypes || [])
const basePrice = computed<number>(() => config.value?.basePrice || 35)
const currency = computed<string>(() => config.value?.currency || 'MYR')

// Form composable
const {
  customerName,
  contact,
  notes,
  honeypot,
  items,
  focusedRowIndex,
  focusedRow,
  totalQuantity,
  totalPrice,
  addRow,
  removeRow,
  duplicateRow,
  updateRow,
  reset,
} = useOrderForm(sizes, sleeveTypes, basePrice)

// Check if store is currently closed or deadline passed
const isClosed = computed(() => {
  if (!config.value) return false
  if (!config.value.isOpen) return true
  if (config.value.deadline) {
    const deadlineTime = new Date(config.value.deadline).getTime()
    return Date.now() > deadlineTime
  }
  return false
})

async function handleSubmit() {
  if (isClosed.value) {
    toast.error('Ordering Closed', 'This order is currently closed and no longer accepting submissions.')
    return
  }

  // Frontend validation via shared Zod schema
  const payload = {
    customerName: customerName.value,
    contact: contact.value,
    notes: notes.value,
    honeypot: honeypot.value,
    idempotencyKey: idempotencyKey.value,
    items: items.value.map((i) => ({
      shirtName: i.shirtName.trim(),
      sizeLabel: i.sizeLabel,
      sleeveLabel: i.sleeveLabel,
      quantity: Number(i.quantity),
    })),
  }

  const validation = createOrderSchema.safeParse(payload)
  if (!validation.success) {
    const firstError = validation.error.errors[0]?.message || 'Please check your order details.'
    toast.error('Validation error', firstError)
    return
  }

  submitting.value = true
  try {
    const res = await $fetch<{ order: OrderData }>('/api/public/orders', {
      method: 'POST',
      body: payload,
    })

    submittedOrder.value = res.order
    toast.success('Order placed!', `Your order code is ${res.order.code}`)
  } catch (err: any) {
    const msg = err.data?.message || err.message || 'Failed to submit order. Please try again.'
    toast.error('Order submission failed', msg)
  } finally {
    submitting.value = false
  }
}

function handleNewOrder() {
  submittedOrder.value = null
  reset()
  idempotencyKey.value = crypto.randomUUID ? crypto.randomUUID() : 'idemp_' + Math.random().toString(36).slice(2)
}
</script>

<template>
  <div class="py-6 sm:py-12 px-4 sm:px-6">
    <!-- Loading state -->
    <div v-if="status === 'pending'" class="max-w-4xl mx-auto py-12">
      <BaseLoadingSkeleton type="card" :lines="6" />
    </div>

    <!-- Error state -->
    <div v-else-if="error || !config" class="max-w-md mx-auto text-center py-12">
      <div class="bg-red-50 dark:bg-red-950/40 rounded-2xl p-6 border border-red-200 dark:border-red-800">
        <Icon name="lucide:alert-circle" class="w-10 h-10 text-red-500 mx-auto mb-3" />
        <h3 class="font-heading font-bold text-lg text-red-800 dark:text-red-200">Unable to load order form</h3>
        <p class="text-xs text-red-600 dark:text-red-300 mt-1 mb-4">Please check your database connection or try refreshing.</p>
        <BaseButton variant="secondary" size="sm" @click="() => refresh()">Try Again</BaseButton>
      </div>
    </div>

    <!-- Success Screen overlay after placing order -->
    <div v-else-if="submittedOrder">
      <OrderSuccessScreen
        :order-code="submittedOrder.code"
        :order="submittedOrder"
        :currency="currency"
        @new-order="handleNewOrder"
      />
    </div>

    <!-- Main Order Experience -->
    <div v-else class="max-w-6xl mx-auto space-y-8 pb-24 sm:pb-8">
      <!-- Hero / Event Header -->
      <div class="text-center max-w-3xl mx-auto space-y-4">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 text-xs font-semibold border border-primary-200/60 dark:border-primary-800/40">
          <Icon name="lucide:sparkles" class="w-3.5 h-3.5 text-primary-500" />
          <span>Starting at only {{ currency }} {{ basePrice.toFixed(2) }} per shirt</span>
        </div>

        <h1 class="font-heading font-extrabold text-3xl sm:text-5xl text-gray-900 dark:text-white tracking-tight">
          {{ config.eventTitle || 'Group Shirt Order' }}
        </h1>

        <p v-if="config.eventDescription" class="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
          {{ config.eventDescription }}
        </p>

        <!-- Deadline Countdown or Closed State -->
        <div class="pt-2">
          <div v-if="isClosed" class="inline-flex items-center gap-2 px-5 py-2.5 bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 rounded-2xl font-heading font-bold text-sm border border-red-200 dark:border-red-800/60 shadow-sm">
            <Icon name="lucide:lock" class="w-4 h-4 text-red-500" />
            <span>Ordering is currently closed</span>
          </div>

          <div v-else-if="config.deadline" class="max-w-md mx-auto">
            <div class="text-[11px] uppercase tracking-wider font-semibold text-gray-400 dark:text-gray-500 mb-2">
              Time Remaining Until Order Closes
            </div>
            <BaseCountdown :deadline="config.deadline" />
          </div>
        </div>
      </div>

      <!-- Closed Message Banner if closed -->
      <div v-if="isClosed" class="max-w-xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-8 rounded-3xl border border-gray-200 dark:border-gray-700 text-center shadow-soft-lg space-y-4">
        <div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
          <Icon name="lucide:calendar-x" class="w-6 h-6" />
        </div>
        <h3 class="font-heading font-bold text-xl text-gray-900 dark:text-white">Submissions are Closed</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          The deadline for this shirt order has passed or the organizer has closed submissions. If you have already placed an order, you can still track it.
        </p>
        <NuxtLink to="/track">
          <BaseButton variant="primary" size="md">
            <Icon name="lucide:search" class="w-4 h-4 mr-1.5" />
            <span>Track Existing Order</span>
          </BaseButton>
        </NuxtLink>
      </div>

      <!-- Main Form Grid (Form on left, Sticky Preview on right) -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Left: Form inputs (7 cols on lg) -->
        <div class="lg:col-span-7 space-y-6">
          <!-- Customer Info Card -->
          <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft space-y-4">
            <h3 class="font-heading font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <Icon name="lucide:user" class="w-5 h-5 text-primary-500" />
              <span>1. Your Information</span>
            </h3>

            <div class="space-y-3">
              <BaseInput
                v-model="customerName"
                label="Full Name"
                placeholder="e.g. Sarah Jenkins"
                required
              />

              <BaseInput
                v-model="contact"
                label="Phone Number or Email"
                placeholder="e.g. +60123456789 or sarah@example.com"
                required
              />

              <!-- Honeypot anti-spam field -->
              <div class="hidden" aria-hidden="true">
                <label for="order-website">Leave this field blank</label>
                <input id="order-website" v-model="honeypot" type="text" tabindex="-1" autocomplete="off" />
              </div>

              <BaseTextarea
                v-model="notes"
                label="Special Notes or Delivery Instructions (Optional)"
                placeholder="Any special remarks for the organizer..."
                :rows="2"
              />
            </div>
          </div>

          <!-- Shirt Rows Card -->
          <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft space-y-5">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-heading font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
                  <Icon name="lucide:shirt" class="w-5 h-5 text-primary-500" />
                  <span>2. Shirt Selection</span>
                </h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Customize each shirt with a custom printed name, size, and sleeve style.
                </p>
              </div>

              <!-- Size chart modal trigger button -->
              <button
                type="button"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50 hover:bg-primary-100 dark:hover:bg-primary-900/60 border border-primary-200 dark:border-primary-800 transition"
                @click="showSizeChart = true"
              >
                <Icon name="lucide:ruler" class="w-3.5 h-3.5" />
                <span>Size Chart</span>
              </button>
            </div>

            <!-- List of shirt rows with smooth auto transitions -->
            <div class="space-y-4">
              <OrderShirtRow
                v-for="(item, idx) in items"
                :key="item._key"
                :item="item"
                :index="idx"
                :sizes="sizes"
                :sleeve-types="sleeveTypes"
                :base-price="basePrice"
                :currency="currency"
                :can-remove="items.length > 1"
                :is-focused="focusedRowIndex === idx"
                @update="(updated) => updateRow(idx, updated)"
                @remove="() => removeRow(idx)"
                @duplicate="() => duplicateRow(idx)"
                @focus="focusedRowIndex = idx"
              />
            </div>

            <!-- Add another shirt button -->
            <div class="pt-2">
              <button
                type="button"
                :disabled="items.length >= 20"
                class="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-primary-500 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition duration-200 disabled:opacity-40"
                @click="addRow"
              >
                <Icon name="lucide:plus-circle" class="w-4 h-4" />
                <span>Add Another Shirt ({{ items.length }}/20)</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Right: Live SVG T-shirt Preview (5 cols on lg, sticky) -->
        <div class="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <div class="text-xs uppercase tracking-wider font-semibold text-gray-400 dark:text-gray-500 px-1">
            Live Preview of Item #{{ focusedRowIndex + 1 }}
          </div>

          <OrderShirtPreview
            :shirt-name="focusedRow?.shirtName"
            :sleeve-type="focusedRow?.sleeveLabel"
            :size-label="focusedRow?.sizeLabel"
          />

          <!-- Order Summary Desk Card (Visible on desktop) -->
          <div class="hidden sm:block bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-5 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft space-y-4">
            <h4 class="font-heading font-bold text-sm text-gray-900 dark:text-white">
              Order Total Summary
            </h4>

            <div class="space-y-2 text-xs text-gray-600 dark:text-gray-300">
              <div class="flex justify-between">
                <span>Total Shirts</span>
                <span class="font-bold text-gray-900 dark:text-white font-mono">{{ totalQuantity }}</span>
              </div>
              <div class="flex justify-between">
                <span>Base Price</span>
                <span class="font-mono">{{ currency }} {{ basePrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between pt-2 border-t border-gray-100 dark:border-gray-700 text-sm font-bold text-gray-900 dark:text-white">
                <span>Estimated Total</span>
                <span class="font-heading text-primary-600 dark:text-primary-400 text-lg">
                  {{ currency }} {{ totalPrice.toFixed(2) }}
                </span>
              </div>
            </div>

            <BaseButton
              variant="primary"
              size="lg"
              block
              :loading="submitting"
              :disabled="totalQuantity === 0"
              class="shadow-glow-primary"
              @click="handleSubmit"
            >
              <span class="flex items-center justify-center gap-2">
                <span>Submit Order</span>
                <Icon name="lucide:check" class="w-4 h-4" />
              </span>
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Sticky Mobile Bottom Bar -->
      <OrderSummaryBar
        :total-shirts="totalQuantity"
        :total-price="totalPrice"
        :currency="currency"
        :loading="submitting"
        @submit="handleSubmit"
      />

      <!-- Size Chart Modal -->
      <OrderSizeChartModal
        :open="showSizeChart"
        :image-url="config.sizeChartImage"
        :sizes="sizes"
        @close="showSizeChart = false"
      />
    </div>
  </div>
</template>

