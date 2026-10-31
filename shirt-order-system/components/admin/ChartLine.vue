<template>
  <div class="rounded-2xl bg-white p-6 shadow-soft dark:bg-[#1A1B23]">
    <h3 class="mb-4 font-heading text-lg font-semibold text-gray-900 dark:text-white">
      {{ title }}
    </h3>
    <div class="relative">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
)

const props = defineProps<{
  title: string
  labels: string[]
  data: number[]
}>()

const colorMode = useColorMode()

const chartData = computed(() => {
  return {
    labels: props.labels,
    datasets: [
      {
        label: props.title,
        data: props.data,
        backgroundColor: createGradient(),
        borderColor: '#4F46E5',
        borderWidth: 0,
        borderRadius: 8,
        borderSkipped: false,
        hoverBackgroundColor: '#4F46E5',
      },
    ],
  }
})

function createGradient(): string | string[] {
  // For SSR-safe rendering, return solid colors; gradient is applied via plugin below
  return props.data.map(() => 'rgba(79, 70, 229, 0.7)')
}

const chartOptions = computed(() => {
  const isDark = colorMode.value === 'dark'
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
  const textColor = isDark ? '#9ca3af' : '#6b7280'

  return {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.2,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? '#2D2E3A' : '#1f2937',
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
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: textColor,
          font: {
            family: 'Inter, sans-serif',
            size: 11,
          },
          maxRotation: 45,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: gridColor,
        },
        ticks: {
          color: textColor,
          font: {
            family: 'Inter, sans-serif',
            size: 11,
          },
          precision: 0,
        },
        border: {
          display: false,
        },
        beginAtZero: true,
      },
    },
  }
})
</script>
