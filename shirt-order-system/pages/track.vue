<script setup lang="ts">
import { ref } from 'vue'
import type { OrderData } from '~/shared/types'
import { trackOrderSchema } from '~/shared/schemas'

useHead({
  title: 'Track Order',
})

const toast = useToast()

const code = ref('')
const contact = ref('')
const loading = ref(false)
const order = ref<OrderData | null>(null)
const searched = ref(false)

async function handleTrack() {
  const payload = {
    code: code.value.trim().toUpperCase(),
    contact: contact.value.trim(),
  }

  const parsed = trackOrderSchema.safeParse(payload)
  if (!parsed.success) {
    toast.error('Validation error', parsed.error.errors[0]?.message || 'Invalid details')
    return
  }

  loading.value = true
  searched.value = true
  order.value = null

  try {
    const res = await $fetch<{ order: OrderData }>('/api/public/track', {
      method: 'POST',
      body: payload,
    })
    order.value = res.order
  } catch (err: any) {
    toast.error('Order not found', 'No order matched that code and contact information.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="py-8 sm:py-16 px-4 sm:px-6 max-w-3xl mx-auto space-y-8">
    <!-- Header -->
    <div class="text-center space-y-2">
      <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 mb-2">
        <Icon name="lucide:package-search" class="w-6 h-6" />
      </div>
      <h1 class="font-heading font-extrabold text-2xl sm:text-4xl text-gray-900 dark:text-white">
        Track Your Order
      </h1>
      <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
        Enter your order code and the contact number or email address used when placing your order.
      </p>
    </div>

    <!-- Lookup Form Card -->
    <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft-lg space-y-5">
      <form class="space-y-4" @submit.prevent="handleTrack">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Order Code
            </label>
            <div class="relative">
              <Icon name="lucide:tag" class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                v-model="code"
                type="text"
                placeholder="e.g. SHIRT-7K2M9"
                class="w-full pl-10 pr-4 py-2.5 rounded-xl font-mono text-sm uppercase bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:normal-case placeholder:font-body focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                required
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Contact (Phone or Email)
            </label>
            <div class="relative">
              <Icon name="lucide:contact" class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                v-model="contact"
                type="text"
                placeholder="e.g. +60123456789 or email@domain.com"
                class="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                required
              />
            </div>
          </div>
        </div>

        <BaseButton variant="primary" size="lg" block :loading="loading" type="submit" class="shadow-glow-primary">
          <Icon name="lucide:search" class="w-4 h-4 mr-2" />
          <span>Look Up Order</span>
        </BaseButton>
      </form>
    </div>

    <!-- Order Result Card -->
    <div
      v-if="order"
      class="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft-xl space-y-6 animate-scale-in"
    >
      <!-- Result Header -->
      <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
        <div>
          <span class="text-xs uppercase tracking-wider font-semibold text-gray-400">Order Reference</span>
          <div class="font-mono font-extrabold text-2xl text-primary-600 dark:text-primary-400">
            {{ order.code }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Ordered by <span class="font-semibold text-gray-900 dark:text-white">{{ order.customerName }}</span> on {{ new Date(order.createdAt).toLocaleDateString() }}
          </div>
        </div>

        <div class="flex items-center gap-2">
          <BaseStatusBadge :status="order.status" type="order" />
          <BaseStatusBadge :status="order.paymentStatus" type="payment" />
        </div>
      </div>

      <!-- Shirt Items Breakdown -->
      <div class="space-y-3">
        <h3 class="font-heading font-bold text-sm text-gray-900 dark:text-white">
          Ordered Shirts ({{ order.totalQuantity }})
        </h3>

        <div class="divide-y divide-gray-100 dark:divide-gray-700/60 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div
            v-for="(item, idx) in order.items"
            :key="idx"
            class="p-4 bg-gray-50/50 dark:bg-gray-900/30 flex items-center justify-between text-xs sm:text-sm"
          >
            <div>
              <div class="font-heading font-bold text-gray-900 dark:text-white uppercase">
                "{{ item.shirtName }}"
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                <span class="font-semibold text-primary-600 dark:text-primary-400">Size: {{ item.sizeLabel }}</span>
                <span>•</span>
                <span>{{ item.sleeveLabel }}</span>
                <span>•</span>
                <span>Qty: {{ item.quantity }}</span>
              </div>
            </div>

            <div class="text-right">
              <span class="font-heading font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                MYR {{ Number(item.lineTotal).toFixed(2) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Price Bar -->
      <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
        <span class="font-heading font-bold text-base text-gray-900 dark:text-white">Total Amount</span>
        <span class="font-heading font-extrabold text-2xl text-primary-600 dark:text-primary-400">
          MYR {{ Number(order.totalPrice).toFixed(2) }}
        </span>
      </div>
    </div>

    <!-- Empty / Not Found state -->
    <div
      v-else-if="searched && !loading && !order"
      class="text-center py-10 bg-white/60 dark:bg-gray-800/60 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 p-8"
    >
      <Icon name="lucide:file-question" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
      <h3 class="font-heading font-bold text-base text-gray-900 dark:text-white">No Order Found</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Please double check the code and contact info. If you need assistance, please contact the organizer.
      </p>
    </div>
  </div>
</template>

