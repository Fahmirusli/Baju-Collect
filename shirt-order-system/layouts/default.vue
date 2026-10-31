<script setup lang="ts">
// Public default layout
</script>

<template>
  <div class="relative min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#0F1115] text-gray-800 dark:text-gray-100 overflow-x-hidden transition-colors duration-300">
    <!-- Ambient Gradient Blobs -->
    <div
      class="gradient-blob w-[450px] h-[450px] bg-gradient-to-tr from-primary-500/20 to-violet/20 -top-40 -left-20"
      aria-hidden="true"
    ></div>
    <div
      class="gradient-blob w-[400px] h-[400px] bg-gradient-to-br from-accent-coral/15 to-amber-400/15 top-80 -right-20"
      aria-hidden="true"
    ></div>

    <!-- Navigation Header -->
    <header class="sticky top-0 z-40 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/60 shadow-sm transition-colors">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <!-- Brand / Logo -->
        <NuxtLink to="/" class="flex items-center gap-2.5 group">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 to-violet flex items-center justify-center text-white shadow-md shadow-primary-500/20 group-hover:scale-105 transition-transform duration-200">
            <Icon name="lucide:shirt" class="w-5 h-5" />
          </div>
          <div>
            <span class="font-heading font-extrabold text-base sm:text-lg text-gray-900 dark:text-white tracking-tight">
              Group<span class="text-primary-600 dark:text-primary-400">Shirt</span>
            </span>
          </div>
        </NuxtLink>

        <!-- Right navigation items -->
        <div class="flex items-center gap-3 sm:gap-5">
          <NuxtLink
            to="/track"
            class="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition flex items-center gap-1.5"
          >
            <Icon name="lucide:search" class="w-4 h-4" />
            <span>Track Order</span>
          </NuxtLink>

          <NuxtLink
            to="/admin"
            class="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition hidden sm:inline-flex items-center gap-1"
          >
            <Icon name="lucide:shield" class="w-3.5 h-3.5" />
            <span>Admin</span>
          </NuxtLink>

          <div class="h-4 w-[1px] bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

          <DarkModeToggle />
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="relative z-10 flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="relative z-10 border-t border-gray-200/60 dark:border-gray-800/80 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md py-6 transition-colors">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
        <p>© {{ new Date().getFullYear() }} Group Shirt Order System. All rights reserved.</p>
        <div class="flex items-center gap-4 font-medium">
          <NuxtLink to="/track" class="hover:text-primary-600 dark:hover:text-primary-400 transition">
            Check Status
          </NuxtLink>
          <span>•</span>
          <NuxtLink to="/admin" class="hover:text-primary-600 dark:hover:text-primary-400 transition">
            Admin Portal
          </NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

