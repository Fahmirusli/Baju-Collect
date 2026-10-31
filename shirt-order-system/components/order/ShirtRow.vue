<script setup lang="ts">
import { computed } from 'vue'
import type { ShirtFormRow, SizeOption, SleeveTypeOption } from '~/shared/types'

const props = defineProps<{
  item: ShirtFormRow
  index: number
  sizes: SizeOption[]
  sleeveTypes: SleeveTypeOption[]
  basePrice: number
  currency: string
  canRemove: boolean
  isFocused?: boolean
}>()

const emit = defineEmits<{
  (e: 'update', item: ShirtFormRow): void
  (e: 'remove'): void
  (e: 'duplicate'): void
  (e: 'focus'): void
}>()

// Price calculations
const currentSize = computed(() => {
  return props.sizes.find((s) => s.label === props.item.sizeLabel)
})

const currentSleeve = computed(() => {
  return props.sleeveTypes.find((st) => st.label === props.item.sleeveLabel)
})

const unitPrice = computed(() => {
  const sizeSurcharge = currentSize.value?.surcharge || 0
  const sleeveSurcharge = currentSleeve.value?.surcharge || 0
  return Number((props.basePrice + sizeSurcharge + sleeveSurcharge).toFixed(2))
})

const rowTotal = computed(() => {
  return Number((unitPrice.value * props.item.quantity).toFixed(2))
})

function updateName(name: string) {
  emit('update', { ...props.item, shirtName: name.slice(0, 20) })
}

function updateSize(size: string) {
  emit('update', { ...props.item, sizeLabel: size })
}

function updateSleeve(sleeve: string) {
  emit('update', { ...props.item, sleeveLabel: sleeve })
}

function updateQuantity(qty: number) {
  emit('update', { ...props.item, quantity: qty })
}
</script>

<template>
  <div
    :class="[
      'relative p-4 sm:p-5 rounded-2xl transition-all duration-300 border shadow-soft bg-white/90 dark:bg-gray-800/90 backdrop-blur-md',
      isFocused
        ? 'border-primary-500 ring-2 ring-primary-500/20 shadow-soft-lg'
        : 'border-gray-100 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600'
    ]"
    @click="emit('focus')"
  >
    <!-- Header of Row: Shirt #, live line price, actions -->
    <div class="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-gray-100 dark:border-gray-700/50">
      <div class="flex items-center gap-2">
        <span class="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-950/80 text-primary-600 dark:text-primary-400 font-heading font-bold text-xs flex items-center justify-center">
          {{ index + 1 }}
        </span>
        <span class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Shirt Item
        </span>
      </div>

      <div class="flex items-center gap-2">
        <!-- Live Line Price -->
        <div class="text-right mr-1">
          <span class="text-xs text-gray-400 font-medium mr-1">{{ currency }} {{ unitPrice.toFixed(2) }} ea •</span>
          <span class="font-heading font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">
            {{ currency }} {{ rowTotal.toFixed(2) }}
          </span>
        </div>

        <!-- Duplicate Row Button -->
        <button
          type="button"
          class="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950/40 transition"
          title="Duplicate this shirt"
          aria-label="Duplicate this shirt row"
          @click.stop="emit('duplicate')"
        >
          <Icon name="lucide:copy" class="w-4 h-4" />
        </button>

        <!-- Remove Row Button -->
        <button
          v-if="canRemove"
          type="button"
          class="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
          title="Remove this shirt"
          aria-label="Remove this shirt row"
          @click.stop="emit('remove')"
        >
          <Icon name="lucide:trash-2" class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Row Form Fields -->
    <div class="space-y-3.5">
      <!-- 1. Name on Shirt -->
      <div>
        <div class="flex items-center justify-between mb-1">
          <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Name on Shirt <span class="text-red-500">*</span>
          </label>
          <span class="text-[11px] font-mono text-gray-400">
            {{ item.shirtName.length }}/20
          </span>
        </div>
        <input
          :value="item.shirtName"
          type="text"
          maxlength="20"
          placeholder="e.g. ALEX or CAPTAIN"
          class="w-full px-3.5 py-2 rounded-xl text-sm font-medium bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white uppercase placeholder:normal-case placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
          @input="updateName(($event.target as HTMLInputElement).value)"
          @focus="emit('focus')"
        />
      </div>

      <!-- 2. Sleeve Type Selector -->
      <div>
        <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          Sleeve Style
        </label>
        <OrderSleevePills
          :model-value="item.sleeveLabel"
          :sleeve-types="sleeveTypes"
          :currency="currency"
          @update:model-value="updateSleeve"
        />
      </div>

      <!-- 3. Size Selector -->
      <div>
        <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          Size
        </label>
        <OrderSizePills
          :model-value="item.sizeLabel"
          :sizes="sizes"
          :currency="currency"
          @update:model-value="updateSize"
        />
      </div>

      <!-- 4. Quantity Stepper -->
      <div class="flex items-center justify-between pt-1">
        <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">
          Quantity
        </label>
        <OrderQtyStepper
          :model-value="item.quantity"
          :min="1"
          :max="20"
          @update:model-value="updateQuantity"
        />
      </div>
    </div>
  </div>
</template>

