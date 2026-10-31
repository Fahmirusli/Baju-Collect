<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit'
  icon?: string
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  type: 'button',
  block: false,
})

const variantClasses: Record<string, string> = {
  primary:
    'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-indigo-500',
  secondary:
    'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-100 dark:hover:bg-white/20 focus-visible:ring-gray-400',
  danger:
    'bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 focus-visible:ring-red-500',
  ghost:
    'bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10 focus-visible:ring-gray-400',
  outline:
    'border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-white/5 focus-visible:ring-indigo-500',
}

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2.5',
}

const buttonClasses = computed(() => [
  'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 ease-out',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900',
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none',
  variantClasses[props.variant],
  sizeClasses[props.size],
  props.block ? 'w-full' : '',
])
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    :aria-busy="loading"
    :aria-disabled="disabled || loading"
  >
    <Icon
      v-if="loading"
      name="lucide:loader-2"
      class="animate-spin shrink-0"
      :class="size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'"
      aria-hidden="true"
    />
    <Icon
      v-else-if="icon"
      :name="icon"
      class="shrink-0"
      :class="size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'"
      aria-hidden="true"
    />
    <slot />
  </button>
</template>
