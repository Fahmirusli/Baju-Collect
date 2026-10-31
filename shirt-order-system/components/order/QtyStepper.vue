<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: number
    min?: number
    max?: number
  }>(),
  {
    min: 1,
    max: 20,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

function decrement() {
  if (props.modelValue > props.min) {
    emit('update:modelValue', props.modelValue - 1)
  }
}

function increment() {
  if (props.modelValue < props.max) {
    emit('update:modelValue', props.modelValue + 1)
  }
}
</script>

<template>
  <div class="inline-flex items-center rounded-xl bg-gray-100 dark:bg-gray-800 p-1 border border-gray-200 dark:border-gray-700/60 shadow-inner">
    <button
      type="button"
      :disabled="modelValue <= min"
      class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition disabled:opacity-40 disabled:hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500"
      aria-label="Decrease quantity"
      @click="decrement"
    >
      <Icon name="lucide:minus" class="w-4 h-4" />
    </button>

    <span class="w-10 text-center font-heading font-bold text-sm sm:text-base text-gray-900 dark:text-white" aria-live="polite">
      {{ modelValue }}
    </span>

    <button
      type="button"
      :disabled="modelValue >= max"
      class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition disabled:opacity-40 disabled:hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500"
      aria-label="Increase quantity"
      @click="increment"
    >
      <Icon name="lucide:plus" class="w-4 h-4" />
    </button>
  </div>
</template>

