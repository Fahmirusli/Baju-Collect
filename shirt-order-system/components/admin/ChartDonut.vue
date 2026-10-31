<template>
  <div class="rounded-2xl bg-white p-6 shadow-soft dark:bg-[#1A1B23]">
    <h3 class="mb-4 font-heading text-lg font-semibold text-gray-900 dark:text-white">
      {{ title }}
    </h3>
    <div class="relative mx-auto" style="max-width: 280px">
      <Doughnut :data="chartData" :options="chartOptions" />
      <div
        class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
      >
        <span class="font-heading text-2xl font-bold text-gray-900 dark:text-white">
          {{ total }}
        </span>
        <span class="text-xs text-gray-500 dark:text-gray-400">Total</span>
      </div>
    </div>
    <div class="mt-6 space-y-2">
      <div
        v-for="(label, index) in labels"
        :key="label"
        class="flex items-center justify-between"
      >
        <div class="flex items-center gap-2">
          <span
            class="inline-block h-3 w-3 rounded-full"
            :style="{ backgroundColor: resolvedColors[index] }"
          />
          <span class="font-body text-sm text-gray-600 dark:text-gray-300">
            {{ label }}
          </span>
        </div>
        <span class="font-mono text-sm font-medium text-gray-900 dark:text-white">
          {{ data[index] }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps<{
  title: string
  labels: string[]
  data: number[]
  colors?: string[]
}>()

const defaultColors = [
  '#4F46E5', // indigo
  '#10B981', // emerald
  '#F59E0B', // amber
  '#EF4444', // red
  '#8B5CF6', // violet
  '#06B6D4', // cyan
  '#EC4899', // pink
  '#F97316', // orange
]

const resolvedColors = computed(() => props.colors ?? defaultColors.slice(0, props.labels.length))

const total = computed(() => props.data.reduce((sum, v) => sum + v, 0))

const colorMode = useColorMode()

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      data: props.data,
      backgroundColor: resolvedColors.value,
      borderColor: colorMode.value === 'dark' ? '#1A1B23' : '#ffffff',
      borderWidth: 3,
      hoverOffset: 6,
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  cutout: '68%',
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: colorMode.value === 'dark' ? '#2D2E3A' : '#1f2937',
      titleColor: '#f9fafb',
      bodyColor: '#d1d5db',
      cornerRadius: 8,
      padding: 12,
      titleFont: {
        family: 'Plus Jakarta Sans, sans-serif',
        size: 13,
        weight: '600' as const,
      },
      bodyFont: {
        family: 'Inter, sans-serif',
        size: 12,
      },
      callbacks: {
        label: (context: { label?: string; parsed: number }) => {
          const value = context.parsed
          const pct = total.value > 0 ? ((value / total.value) * 100).toFixed(1) : '0'
          return ` ${context.label}: ${value} (${pct}%)`
        },
      },
    },
  },
}))
</script>
