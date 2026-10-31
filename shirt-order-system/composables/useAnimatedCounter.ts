import { ref, watch, onMounted, type Ref } from 'vue'

export function useAnimatedCounter(target: Ref<number> | number, duration = 800) {
  const current = ref(0)
  const targetRef = typeof target === 'number' ? ref(target) : target

  function animate() {
    const startValue = current.value
    const endValue = targetRef.value
    const startTime = performance.now()

    if (startValue === endValue) return

    function update(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3)
      current.value = Math.round(startValue + (endValue - startValue) * ease)

      if (progress < 1) {
        requestAnimationFrame(update)
      } else {
        current.value = endValue
      }
    }

    requestAnimationFrame(update)
  }

  onMounted(() => {
    animate()
  })

  watch(targetRef, () => {
    animate()
  })

  return current
}

