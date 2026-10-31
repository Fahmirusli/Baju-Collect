<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps<{
  deadline: string | null | undefined
}>()

const emit = defineEmits<{
  (e: 'expired'): void
}>()

const now = ref(Date.now())
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timer = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const deadlineTime = computed(() => {
  if (!props.deadline) return null
  const parsed = new Date(props.deadline).getTime()
  return isNaN(parsed) ? null : parsed
})

const timeLeft = computed(() => {
  if (!deadlineTime.value) return 0
  return Math.max(0, deadlineTime.value - now.value)
})

const isExpired = computed(() => {
  return deadlineTime.value !== null && timeLeft.value <= 0
})

watch(isExpired, (val) => {
  if (val) emit('expired')
})

const days = computed(() => Math.floor(timeLeft.value / (1000 * 60 * 60 * 24)))
const hours = computed(() => Math.floor((timeLeft.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
const minutes = computed(() => Math.floor((timeLeft.value % (1000 * 60 * 60)) / (1000 * 60)))
const seconds = computed(() => Math.floor((timeLeft.value % (1000 * 60)) / 1000))

function pad(num: number): string {
  return String(num).padStart(2, '0')
}
</script>

<template>
  <div v-if="deadlineTime" class="w-full">
    <div v-if="!isExpired" class="flex items-center justify-center gap-2 sm:gap-4" role="timer" aria-label="Order deadline countdown">
      <div class="flex flex-col items-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-2.5 sm:p-3 min-w-[54px] sm:min-w-[68px] shadow-soft border border-gray-100 dark:border-gray-700/50">
        <span class="font-heading font-extrabold text-xl sm:text-2xl text-primary-600 dark:text-primary-400">
          {{ pad(days) }}
        </span>
        <span class="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Days
        </span>
      </div>
      <span class="text-xl font-bold text-gray-400 dark:text-gray-500 -mt-3">:</span>

      <div class="flex flex-col items-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-2.5 sm:p-3 min-w-[54px] sm:min-w-[68px] shadow-soft border border-gray-100 dark:border-gray-700/50">
        <span class="font-heading font-extrabold text-xl sm:text-2xl text-primary-600 dark:text-primary-400">
          {{ pad(hours) }}
        </span>
        <span class="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Hours
        </span>
      </div>
      <span class="text-xl font-bold text-gray-400 dark:text-gray-500 -mt-3">:</span>

      <div class="flex flex-col items-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-2.5 sm:p-3 min-w-[54px] sm:min-w-[68px] shadow-soft border border-gray-100 dark:border-gray-700/50">
        <span class="font-heading font-extrabold text-xl sm:text-2xl text-primary-600 dark:text-primary-400">
          {{ pad(minutes) }}
        </span>
        <span class="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Mins
        </span>
      </div>
      <span class="text-xl font-bold text-gray-400 dark:text-gray-500 -mt-3">:</span>

      <div class="flex flex-col items-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-2.5 sm:p-3 min-w-[54px] sm:min-w-[68px] shadow-soft border border-gray-100 dark:border-gray-700/50">
        <span class="font-heading font-extrabold text-xl sm:text-2xl text-accent-coral">
          {{ pad(seconds) }}
        </span>
        <span class="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Secs
        </span>
      </div>
    </div>

    <div v-else class="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl font-medium text-sm border border-red-200 dark:border-red-800/50">
      <Icon name="lucide:clock-alert" class="w-4 h-4 shrink-0 text-red-500" />
      <span>The deadline for this order has passed.</span>
    </div>
  </div>
</template>

