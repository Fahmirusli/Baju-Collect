<script setup lang="ts">
withDefaults(
  defineProps<{
    lines?: number
    type?: 'text' | 'card' | 'table'
  }>(),
  {
    lines: 3,
    type: 'text',
  }
)
</script>

<template>
  <div class="animate-pulse w-full" aria-hidden="true" aria-busy="true">
    <!-- Card Skeleton -->
    <div v-if="type === 'card'" class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700/60 shadow-soft space-y-4">
      <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3"></div>
      <div class="space-y-2">
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>

    <!-- Table Skeleton -->
    <div v-else-if="type === 'table'" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/60 overflow-hidden shadow-soft">
      <div class="h-12 bg-gray-100 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 gap-4">
        <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-20"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-32"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16 ml-auto"></div>
      </div>
      <div class="divide-y divide-gray-100 dark:divide-gray-700/50">
        <div v-for="i in lines" :key="i" class="h-14 px-4 flex items-center gap-4">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 ml-auto"></div>
        </div>
      </div>
    </div>

    <!-- Text Skeleton -->
    <div v-else class="space-y-2.5">
      <div
        v-for="i in lines"
        :key="i"
        class="h-4 bg-gray-200 dark:bg-gray-700 rounded"
        :style="{ width: i === lines ? '60%' : i % 2 === 0 ? '90%' : '100%' }"
      ></div>
    </div>
  </div>
</template>

