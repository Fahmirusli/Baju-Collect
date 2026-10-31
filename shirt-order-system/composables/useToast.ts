export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

const toasts = ref<ToastMessage[]>([])

export function useToast() {
  function addToast(toast: Omit<ToastMessage, 'id'>) {
    const id = Math.random().toString(36).slice(2, 11)
    const duration = toast.duration ?? 4000
    const newToast: ToastMessage = { ...toast, id }
    toasts.value.push(newToast)

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }

  function removeToast(id: string) {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }

  function success(message: string, duration?: number) {
    addToast({ type: 'success', message, duration })
  }

  function error(message: string, duration?: number) {
    addToast({ type: 'error', message, duration })
  }

  function warning(message: string, duration?: number) {
    addToast({ type: 'warning', message, duration })
  }

  function info(message: string, duration?: number) {
    addToast({ type: 'info', message, duration })
  }

  return {
    toasts: readonly(toasts),
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  }
}
