<template>
  <!-- Mobile overlay backdrop -->
  <Transition name="fade">
    <div
      v-if="mobileOpen"
      class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
      @click="mobileOpen = false"
    />
  </Transition>

  <!-- Mobile hamburger button -->
  <button
    class="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-lg transition-colors hover:bg-gray-50 dark:bg-[#1A1B23] dark:hover:bg-[#24252F] lg:hidden"
    aria-label="Toggle navigation menu"
    @click="mobileOpen = !mobileOpen"
  >
    <Icon :name="mobileOpen ? 'lucide:x' : 'lucide:menu'" class="h-5 w-5 text-gray-700 dark:text-gray-300" />
  </button>

  <!-- Sidebar -->
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-gray-200/80 bg-white transition-all duration-300 dark:border-gray-800/50 dark:bg-[#13141B]',
      mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      collapsed ? 'w-20' : 'w-64',
    ]"
  >
    <!-- Logo / Title -->
    <div class="flex h-16 flex-shrink-0 items-center gap-3 border-b border-gray-200/80 px-4 dark:border-gray-800/50">
      <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-md">
        <Icon name="lucide:shirt" class="h-5 w-5 text-white" />
      </div>
      <Transition name="fade-slide">
        <div v-if="!collapsed" class="overflow-hidden">
          <h1 class="font-heading text-lg font-bold text-gray-900 dark:text-white">
            ShirtOrder
          </h1>
          <p class="text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Admin Panel
          </p>
        </div>
      </Transition>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 space-y-1 overflow-y-auto p-3">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :class="[
          'group flex items-center gap-3 rounded-xl px-3 py-2.5 font-body text-sm font-medium transition-all duration-200',
          isActive(item.to)
            ? 'bg-gradient-to-r from-indigo-500/10 to-indigo-500/5 text-indigo-600 dark:from-indigo-500/20 dark:to-indigo-500/10 dark:text-indigo-400'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-200',
        ]"
        @click="mobileOpen = false"
      >
        <div
          :class="[
            'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-colors',
            isActive(item.to)
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
              : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700 dark:bg-white/5 dark:text-gray-400 dark:group-hover:bg-white/10 dark:group-hover:text-gray-300',
          ]"
        >
          <Icon :name="item.icon" class="h-[18px] w-[18px]" />
        </div>
        <Transition name="fade-slide">
          <span v-if="!collapsed">{{ item.label }}</span>
        </Transition>
        <!-- Active indicator bar -->
        <div
          v-if="isActive(item.to)"
          class="absolute right-0 h-8 w-1 rounded-l-full bg-indigo-500"
        />
      </NuxtLink>
    </nav>

    <!-- Sidebar Footer -->
    <div class="flex-shrink-0 border-t border-gray-200/80 p-3 dark:border-gray-800/50">
      <!-- Dark mode toggle -->
      <button
        :class="[
          'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 font-body text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-200',
        ]"
        @click="toggleColorMode"
      >
        <div class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400">
          <Icon :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'" class="h-[18px] w-[18px]" />
        </div>
        <Transition name="fade-slide">
          <span v-if="!collapsed">{{ colorMode.value === 'dark' ? 'Light Mode' : 'Dark Mode' }}</span>
        </Transition>
      </button>

      <!-- Collapse toggle (desktop only) -->
      <button
        class="mt-1 hidden w-full items-center gap-3 rounded-xl px-3 py-2.5 font-body text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-200 lg:flex"
        @click="collapsed = !collapsed"
      >
        <div class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400">
          <Icon :name="collapsed ? 'lucide:chevrons-right' : 'lucide:chevrons-left'" class="h-[18px] w-[18px]" />
        </div>
        <Transition name="fade-slide">
          <span v-if="!collapsed">Collapse</span>
        </Transition>
      </button>

      <!-- User info & Logout -->
      <div class="mt-2 border-t border-gray-200/80 pt-3 dark:border-gray-800/50">
        <div class="flex items-center gap-3 rounded-xl px-3 py-2">
          <div class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white">
            A
          </div>
          <Transition name="fade-slide">
            <div v-if="!collapsed" class="min-w-0 flex-1">
              <p class="truncate font-body text-sm font-medium text-gray-900 dark:text-white">
                Admin
              </p>
              <p class="truncate text-xs text-gray-500 dark:text-gray-400">
                Administrator
              </p>
            </div>
          </Transition>
        </div>
        <button
          class="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 font-body text-sm font-medium text-red-500 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
          @click="handleLogout"
        >
          <div class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400">
            <Icon name="lucide:log-out" class="h-[18px] w-[18px]" />
          </div>
          <Transition name="fade-slide">
            <span v-if="!collapsed">Logout</span>
          </Transition>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute()
const colorMode = useColorMode()

const mobileOpen = ref(false)
const collapsed = ref(false)

const navItems = [
  { label: 'Dashboard', icon: 'lucide:layout-dashboard', to: '/admin' },
  { label: 'Orders', icon: 'lucide:shopping-bag', to: '/admin/orders' },
  { label: 'Settings', icon: 'lucide:settings', to: '/admin/settings' },
]

function isActive(to: string): boolean {
  if (to === '/admin') {
    return route.path === '/admin' || route.path === '/admin/'
  }
  return route.path.startsWith(to)
}

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

async function handleLogout() {
  try {
    await $fetch('/api/admin/logout', { method: 'POST' })
    await navigateTo('/admin/login')
  } catch {
    await navigateTo('/admin/login')
  }
}

// Close mobile nav on route change
watch(
  () => route.path,
  () => {
    mobileOpen.value = false
  },
)

// Close mobile nav on escape key
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      mobileOpen.value = false
    }
  }
  window.addEventListener('keydown', handleKeydown)
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}
</style>
