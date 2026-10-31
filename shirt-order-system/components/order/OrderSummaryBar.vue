<script setup lang="ts">
defineProps<{
  totalShirts: number
  totalPrice: number
  currency: string
  loading?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit'): void
}>()
</script>

<template>
  <div class="fixed bottom-0 inset-x-0 z-40 sm:static bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t sm:border border-gray-200/80 dark:border-gray-800 p-4 sm:p-5 sm:rounded-2xl shadow-soft-xl transition-all">
    <div class="max-w-4xl mx-auto flex items-center justify-between gap-4">
      <!-- Totals info -->
      <div>
        <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">
          Total: <span class="font-bold text-gray-900 dark:text-white">{{ totalShirts }}</span> {{ totalShirts === 1 ? 'shirt' : 'shirts' }}
        </div>
        <div class="font-heading font-extrabold text-xl sm:text-2xl text-primary-600 dark:text-primary-400">
          {{ currency }} {{ totalPrice.toFixed(2) }}
        </div>
      </div>

      <!-- Action Button -->
      <BaseButton
        variant="primary"
        size="lg"
        :loading="loading"
        :disabled="disabled || totalShirts === 0"
        type="button"
        class="min-w-[140px] sm:min-w-[180px] shadow-glow-primary"
        @click="emit('submit')"
      >
        <span class="flex items-center gap-2">
          <span>Submit Order</span>
          <Icon name="lucide:arrow-right" class="w-4 h-4" />
        </span>
      </BaseButton>
    </div>
  </div>
</template>

