<script setup lang="ts">
import { ref, onMounted } from 'vue'
import confetti from 'canvas-confetti'

const props = defineProps<{
  orderCode: string
  order: {
    customerName: string
    contact: string
    items: Array<{
      shirtName: string
      sizeLabel: string
      sleeveLabel: string
      quantity: number
      unitPrice?: number
      lineTotal?: number
    }>
    totalPrice: number
    totalQuantity: number
  }
  currency: string
}>()

const emit = defineEmits<{
  (e: 'newOrder'): void
}>()

const copied = ref(false)

function copyCode() {
  if (navigator?.clipboard) {
    navigator.clipboard.writeText(props.orderCode)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2500)
  }
}

onMounted(() => {
  // Fire celebratory confetti!
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4F46E5', '#7C3AED', '#FF6B6B', '#10B981', '#F59E0B'],
    })
    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      })
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      })
    }, 250)
  } catch (e) {
    console.warn('Confetti could not run:', e)
  }
})
</script>

<template>
  <div class="max-w-2xl mx-auto p-4 sm:p-8 animate-scale-in">
    <div class="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl border border-gray-100 dark:border-gray-700 shadow-soft-xl overflow-hidden p-6 sm:p-10 text-center">
      <!-- Success Icon -->
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mb-4 animate-bounce-gentle">
        <Icon name="lucide:check-circle-2" class="w-9 h-9" />
      </div>

      <h2 class="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-white mb-2">
        Order Placed Successfully!
      </h2>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Thank you, <span class="font-semibold text-gray-900 dark:text-white">{{ order.customerName }}</span>. Your group order has been submitted.
      </p>

      <!-- Order Code Card -->
      <div class="p-5 bg-gradient-to-r from-primary-50 to-violet-50 dark:from-primary-950/30 dark:to-violet-950/30 rounded-2xl border border-primary-200 dark:border-primary-800/60 mb-8">
        <div class="text-xs uppercase tracking-wider font-semibold text-primary-600 dark:text-primary-400 mb-1">
          Your Order Tracking Code
        </div>
        <div class="flex items-center justify-center gap-3">
          <span class="font-mono font-extrabold text-2xl sm:text-3xl text-primary-700 dark:text-primary-300 tracking-wider">
            {{ orderCode }}
          </span>
          <button
            type="button"
            class="p-2 rounded-xl bg-white dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900/50 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 shadow-sm transition flex items-center gap-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
            @click="copyCode"
          >
            <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="w-4 h-4" />
            <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
          </button>
        </div>
        <p class="text-[11px] text-gray-500 dark:text-gray-400 mt-2">
          Save this code to check your order status at <NuxtLink to="/track" class="underline text-primary-600 dark:text-primary-400">/track</NuxtLink>.
        </p>
      </div>

      <!-- Order Summary Breakdown -->
      <div class="text-left border-t border-gray-100 dark:border-gray-700 pt-6 mb-8">
        <h4 class="font-heading font-bold text-sm text-gray-900 dark:text-white mb-3">
          Order Summary ({{ order.totalQuantity }} {{ order.totalQuantity === 1 ? 'shirt' : 'shirts' }})
        </h4>

        <div class="divide-y divide-gray-100 dark:divide-gray-700/60 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div
            v-for="(item, idx) in order.items"
            :key="idx"
            class="p-3.5 flex items-center justify-between text-xs sm:text-sm bg-gray-50/50 dark:bg-gray-800/40"
          >
            <div>
              <div class="font-heading font-bold text-gray-900 dark:text-white uppercase">
                "{{ item.shirtName }}"
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-0.5">
                <span class="font-semibold text-primary-600 dark:text-primary-400">{{ item.sizeLabel }}</span>
                <span>•</span>
                <span>{{ item.sleeveLabel }}</span>
                <span>•</span>
                <span>Qty: {{ item.quantity }}</span>
              </div>
            </div>

            <div v-if="item.lineTotal !== undefined" class="font-heading font-bold text-gray-900 dark:text-white">
              {{ currency }} {{ Number(item.lineTotal).toFixed(2) }}
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between pt-4 px-1">
          <span class="font-heading font-bold text-base text-gray-900 dark:text-white">Total Amount</span>
          <span class="font-heading font-extrabold text-xl text-primary-600 dark:text-primary-400">
            {{ currency }} {{ Number(order.totalPrice).toFixed(2) }}
          </span>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <BaseButton variant="primary" size="lg" class="w-full sm:w-auto" @click="emit('newOrder')">
          <Icon name="lucide:plus" class="w-4 h-4 mr-1.5" />
          <span>Place Another Order</span>
        </BaseButton>

        <NuxtLink to="/track" class="w-full sm:w-auto">
          <BaseButton variant="secondary" size="lg" class="w-full">
            <Icon name="lucide:search" class="w-4 h-4 mr-1.5" />
            <span>Track My Order</span>
          </BaseButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

