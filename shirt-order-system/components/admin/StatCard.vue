<template>
  <div
    class="group relative overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-[#1A1B23]"
  >
    <div class="flex items-start justify-between p-6">
      <div class="flex-1">
        <p class="font-body text-sm font-medium text-gray-500 dark:text-gray-400">
          {{ title }}
        </p>
        <p class="mt-2 font-heading text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          <span v-if="prefix" class="text-xl font-semibold text-gray-500 dark:text-gray-400">{{ prefix }}</span>
          {{ displayValue }}
          <span v-if="suffix" class="text-lg font-medium text-gray-500 dark:text-gray-400">{{ suffix }}</span>
        </p>
      </div>
      <div
        :class="iconBgClass"
        class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
      >
        <Icon :name="icon" class="h-6 w-6 text-white" />
      </div>
    </div>
    <!-- Decorative gradient bar at bottom -->
    <div :class="barClass" class="h-1 w-full" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  value: number
  prefix?: string
  suffix?: string
  icon: string
  color: 'primary' | 'success' | 'warning' | 'danger' | 'accent'
}>()

const animatedValue = ref(0)
const displayValue = computed(() => {
  if (Number.isInteger(props.value)) {
    return Math.round(animatedValue.value).toLocaleString()
  }
  return animatedValue.value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
})

const colorMap: Record<string, { bg: string; bar: string }> = {
  primary: {
    bg: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    bar: 'bg-gradient-to-r from-indigo-500 to-indigo-400',
  },
  success: {
    bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    bar: 'bg-gradient-to-r from-emerald-500 to-emerald-400',
  },
  warning: {
    bg: 'bg-gradient-to-br from-amber-500 to-amber-600',
    bar: 'bg-gradient-to-r from-amber-500 to-amber-400',
  },
  danger: {
    bg: 'bg-gradient-to-br from-rose-500 to-rose-600',
    bar: 'bg-gradient-to-r from-rose-500 to-rose-400',
  },
  accent: {
    bg: 'bg-gradient-to-br from-violet-500 to-violet-600',
    bar: 'bg-gradient-to-r from-violet-500 to-violet-400',
  },
}

const iconBgClass = computed(() => colorMap[props.color]?.bg ?? colorMap.primary.bg)
const barClass = computed(() => colorMap[props.color]?.bar ?? colorMap.primary.bar)

function animateCounter(target: number) {
  const duration = 1200
  const startTime = performance.now()
  const startValue = animatedValue.value

  function step(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3)
    animatedValue.value = startValue + (target - startValue) * eased

    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      animatedValue.value = target
    }
  }

  requestAnimationFrame(step)
}

onMounted(() => {
  animateCounter(props.value)
})

watch(
  () => props.value,
  (newVal) => {
    animateCounter(newVal)
  },
)
</script>
