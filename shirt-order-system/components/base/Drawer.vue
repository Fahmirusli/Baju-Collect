<script setup lang="ts">
interface Props {
  open: boolean
  title?: string
  width?: 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  width: 'md',
})

const emit = defineEmits<{
  close: []
}>()

const drawerRef = ref<HTMLDivElement | null>(null)

const widthClasses: Record<string, string> = {
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
  }
  // Focus trap
  if (event.key === 'Tab' && drawerRef.value) {
    const focusable = drawerRef.value.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return
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
        const closeBtn = drawerRef.value?.querySelector<HTMLElement>('button')
        closeBtn?.focus()
      })
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50"
        role="dialog"
        aria-modal="true"
        :aria-label="title || 'Drawer'"
        @keydown="handleKeydown"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/40 backdrop-blur-sm"
          @click="emit('close')"
        />

        <!-- Drawer panel -->
        <Transition
          enter-active-class="transition-transform duration-300 ease-out"
          enter-from-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition-transform duration-200 ease-in"
          leave-from-class="translate-x-0"
          leave-to-class="translate-x-full"
          appear
        >
          <div
            ref="drawerRef"
            class="absolute right-0 top-0 h-full w-full bg-white dark:bg-gray-800 shadow-2xl flex flex-col"
            :class="[widthClasses[width]]"
          >
            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
              <h2 class="text-lg font-heading font-semibold text-gray-900 dark:text-white truncate">
                {{ title }}
              </h2>
              <button
                type="button"
                class="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-label="Close drawer"
                @click="emit('close')"
              >
                <Icon name="lucide:x" class="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <!-- Scrollable Content -->
            <div class="flex-1 overflow-y-auto px-6 py-4">
              <slot />
            </div>

            <!-- Optional Footer -->
            <div
              v-if="$slots.footer"
              class="shrink-0 border-t border-gray-200 dark:border-gray-700 px-6 py-4"
            >
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
