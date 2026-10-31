<script setup lang="ts">
import type { SizeOption } from '~/shared/types'

const props = defineProps<{
  modelValue: string
  sizes: SizeOption[]
  currency?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function selectSize(label: string) {
  emit('update:modelValue', label)
}
</script>

<template>
  <div class="flex flex-wrap gap-2" role="radiogroup" aria-label="Select shirt size">
    <button
      v-for="s in sizes"
      :key="s.id"
      type="button"
      role="radio"
      :aria-checked="modelValue === s.label"
      :class="[
        'px-3.5 py-1.5 rounded-xl font-heading text-xs sm:text-sm font-semibold transition-all duration-200 border flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500',
        modelValue === s.label
          ? 'bg-gradient-to-r from-primary-600 to-violet text-white border-transparent shadow-md scale-105'
          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-950/20'
      ]"
      @click="selectSize(s.label)"
    >
      <span>{{ s.label }}</span>
      <span
        v-if="s.surcharge > 0"
        :class="[
          'text-[10px] font-mono px-1 py-0.2 rounded',
          modelValue === s.label ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
        ]"
      >
        +{{ s.surcharge }}
      </span>
    </button>
  </div>
</template>

