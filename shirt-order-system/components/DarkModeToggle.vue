<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(val) {
    colorMode.preference = val ? 'dark' : 'light'
  },
})

function toggle() {
  isDark.value = !isDark.value
}
</script>

<template>
  <button
    type="button"
    class="relative p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-white/60 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-800 border border-gray-200/60 dark:border-gray-700/60 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggle"
  >
    <Icon
      v-if="isDark"
      name="lucide:sun"
      class="w-5 h-5 text-amber-400 transition-transform duration-300 hover:rotate-45"
    />
    <Icon
      v-else
      name="lucide:moon"
      class="w-5 h-5 text-indigo-600 transition-transform duration-300 hover:-rotate-12"
    />
  </button>
</template>

