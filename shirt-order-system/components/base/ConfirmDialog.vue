<script setup lang="ts">
interface Props {
  open: boolean
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'primary'
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Confirm Action',
  message: 'Are you sure you want to proceed?',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  variant: 'primary',
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const dialogRef = ref<HTMLDivElement | null>(null)
const confirmBtnRef = ref<HTMLButtonElement | null>(null)

const variantConfig = computed(() => {
  const configs = {
    danger: {
      icon: 'lucide:alert-triangle',
      iconBg: 'bg-red-100 dark:bg-red-900/30',
      iconColor: 'text-red-600 dark:text-red-400',
      buttonVariant: 'danger' as const,
    },
    warning: {
      icon: 'lucide:alert-circle',
      iconBg: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-amber-600 dark:text-amber-400',
      buttonVariant: 'primary' as const,
    },
    primary: {
      icon: 'lucide:info',
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/30',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      buttonVariant: 'primary' as const,
    },
  }
  return configs[props.variant]
})

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('cancel')
  }
  if (event.key === 'Enter') {
    event.preventDefault()
    emit('confirm')
  }
  // Focus trap
  if (event.key === 'Tab' && dialogRef.value) {
    const focusable = dialogRef.value.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      }
    } else {
      if (document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
  }
}

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      nextTick(() => {
        confirmBtnRef.value?.focus()
      })
    }
  }
)
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        @keydown="handleKeydown"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/40 backdrop-blur-sm"
          @click="emit('cancel')"
        />

        <!-- Dialog -->
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
          appear
        >
          <div
            ref="dialogRef"
            class="relative w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 shadow-2xl p-6"
          >
            <div class="flex items-start gap-4">
              <!-- Icon -->
              <div
                class="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                :class="[variantConfig.iconBg]"
              >
                <Icon
                  :name="variantConfig.icon"
                  class="w-5 h-5"
                  :class="[variantConfig.iconColor]"
                  aria-hidden="true"
                />
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-heading font-semibold text-gray-900 dark:text-white">
                  {{ title }}
                </h3>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {{ message }}
                </p>
              </div>
            </div>

            <!-- Actions -->
            <div class="mt-6 flex items-center justify-end gap-3">
              <BaseButton variant="ghost" size="sm" @click="emit('cancel')">
                {{ cancelText }}
              </BaseButton>
              <BaseButton
                ref="confirmBtnRef"
                :variant="variantConfig.buttonVariant"
                size="sm"
                @click="emit('confirm')"
              >
                {{ confirmText }}
              </BaseButton>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
