<script setup lang="ts">
import type { SleeveTypeOption } from '~/shared/types'

const props = defineProps<{
  modelValue: string
  sleeveTypes: SleeveTypeOption[]
  currency?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function selectSleeve(label: string) {
  emit('update:modelValue', label)
}

function getIcon(label: string): string {
  const l = label.toLowerCase()
  if (l.includes('long')) return 'lucide:layers'
  if (l.includes('3/4') || l.includes('three')) return 'lucide:scissors'
  if (l.includes('sleeveless') || l.includes('tank')) return 'lucide:circle-slash'
  return 'lucide:shirt'
}
</script>

<template>
  <div class="flex flex-wrap gap-2" role="radiogroup" aria-label="Select sleeve type">
    <button
      v-for="st in sleeveTypes"
      :key="st.id"
      type="button"
      role="radio"
      :aria-checked="modelValue === st.label"
      :class="[
        'px-3.5 py-1.5 rounded-xl font-heading text-xs sm:text-sm font-semibold transition-all duration-200 border flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500',
        modelValue === st.label
          ? 'bg-gradient-to-r from-primary-600 to-violet text-white border-transparent shadow-md scale-105'
          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-950/20'
      ]"
      @click="selectSleeve(st.label)"
    >
      <Icon :name="getIcon(st.label)" class="w-3.5 h-3.5" />
      <span>{{ st.label }}</span>
      <span
        v-if="st.surcharge > 0"
        :class="[
          'text-[10px] font-mono px-1 py-0.2 rounded',
          modelValue === st.label ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
        ]"
      >
        +{{ st.surcharge }}
      </span>
    </button>
  </div>
</template>

