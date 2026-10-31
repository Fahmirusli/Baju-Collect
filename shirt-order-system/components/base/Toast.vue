<script setup lang="ts">
import type { ToastMessage } from '~/composables/useToast'

const { toasts, removeToast } = useToast()

const iconMap: Record<string, string> = {
  success: 'lucide:check-circle-2',
  error: 'lucide:x-circle',
  warning: 'lucide:alert-triangle',
  info: 'lucide:info',
}

const colorMap: Record<string, { bg: string; border: string; icon: string; text: string }> = {
  success: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-800',
    icon: 'text-emerald-500 dark:text-emerald-400',
    text: 'text-emerald-800 dark:text-emerald-200',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    icon: 'text-red-500 dark:text-red-400',
    text: 'text-red-800 dark:text-red-200',
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
    icon: 'text-amber-500 dark:text-amber-400',
    text: 'text-amber-800 dark:text-amber-200',
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'text-blue-500 dark:text-blue-400',
    text: 'text-blue-800 dark:text-blue-200',
  },
}
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed top-4 right-4 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none"
      aria-live="polite"
      aria-label="Notifications"
    >
      <TransitionGroup
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-x-8 scale-95"
        enter-to-class="opacity-100 translate-x-0 scale-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-x-0 scale-100"
        leave-to-class="opacity-0 translate-x-8 scale-95"
        move-class="transition-all duration-300 ease-out"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto rounded-xl border shadow-lg p-4 flex items-start gap-3"
          :class="[
            colorMap[toast.type]?.bg,
            colorMap[toast.type]?.border,
          ]"
          role="alert"
        >
          <Icon
            :name="iconMap[toast.type]"
            class="w-5 h-5 shrink-0 mt-0.5"
            :class="colorMap[toast.type]?.icon"
            aria-hidden="true"
          />
          <div class="flex-1 min-w-0">
            <p
              class="text-sm font-medium"
              :class="colorMap[toast.type]?.text"
            >
              {{ toast.message }}
            </p>
          </div>
          <button
            type="button"
            class="shrink-0 p-1 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            :class="colorMap[toast.type]?.icon"
            aria-label="Dismiss notification"
            @click="removeToast(toast.id)"
          >
            <Icon name="lucide:x" class="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
