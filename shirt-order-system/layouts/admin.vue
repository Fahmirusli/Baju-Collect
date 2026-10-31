<script setup lang="ts">
const route = useRoute()

const pageTitle = computed(() => {
  if (route.path === '/admin') return 'Dashboard'
  if (route.path.startsWith('/admin/orders')) return 'Orders Management'
  if (route.path.startsWith('/admin/settings')) return 'Event & Store Settings'
  return 'Admin'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-[#0F1115] text-gray-800 dark:text-gray-100 flex transition-colors duration-300">
    <!-- Sidebar -->
    <AdminSidebar />

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0 lg:pl-64">
      <!-- Admin Top Bar -->
      <header class="h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-800/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 transition-colors">
        <!-- Breadcrumb / Title -->
        <div class="flex items-center gap-2 pl-12 lg:pl-0">
          <span class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Admin</span>
          <span class="text-gray-300 dark:text-gray-700">/</span>
          <h2 class="font-heading font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">
            {{ pageTitle }}
          </h2>
        </div>

        <!-- Top Right Actions -->
        <div class="flex items-center gap-3">
          <NuxtLink
            to="/"
            target="_blank"
            class="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100/70 dark:bg-gray-800/70"
          >
            <Icon name="lucide:external-link" class="w-3.5 h-3.5" />
            <span class="hidden sm:inline">View Public Store</span>
          </NuxtLink>

          <DarkModeToggle />
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

