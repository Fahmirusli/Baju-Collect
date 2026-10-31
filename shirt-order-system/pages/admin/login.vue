<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: false,
})

useHead({
  title: 'Admin Login',
})

const toast = useToast()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  errorMessage.value = ''
  if (!username.value || !password.value) {
    errorMessage.value = 'Please enter both username and password.'
    return
  }

  loading.value = true
  try {
    await $fetch('/api/admin/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value,
      },
    })
    toast.success('Welcome back', 'Logged in successfully.')
    await navigateTo('/admin')
  } catch (err: any) {
    errorMessage.value = err.data?.message || err.message || 'Invalid username or password.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-[#FAF8F5] dark:bg-[#0F1115] relative overflow-hidden transition-colors">
    <!-- Ambient Blobs -->
    <div class="gradient-blob w-96 h-96 bg-primary-500/20 top-10 -left-10" aria-hidden="true"></div>
    <div class="gradient-blob w-96 h-96 bg-violet/20 bottom-10 -right-10" aria-hidden="true"></div>

    <div class="absolute top-6 right-6 z-20">
      <DarkModeToggle />
    </div>

    <!-- Login Card -->
    <div class="relative z-10 w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl p-8 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft-xl space-y-6 animate-scale-in">
      <!-- Header -->
      <div class="text-center space-y-2">
        <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary-600 to-violet flex items-center justify-center text-white mx-auto shadow-md shadow-primary-500/30">
          <Icon name="lucide:shield-check" class="w-7 h-7" />
        </div>
        <h1 class="font-heading font-extrabold text-2xl text-gray-900 dark:text-white">
          Admin Portal
        </h1>
        <p class="text-xs text-gray-500 dark:text-gray-400">
          Sign in to manage group shirt orders and settings
        </p>
      </div>

      <!-- Error Alert -->
      <div
        v-if="errorMessage"
        class="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/60 flex items-center gap-2.5 text-xs text-red-700 dark:text-red-300 animate-shake"
      >
        <Icon name="lucide:alert-circle" class="w-4 h-4 shrink-0 text-red-500" />
        <span>{{ errorMessage }}</span>
      </div>

      <!-- Form -->
      <form class="space-y-4" @submit.prevent="handleLogin">
        <BaseInput
          v-model="username"
          label="Username"
          placeholder="admin"
          required
        />

        <div class="space-y-1">
          <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full px-3.5 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition pr-10"
              required
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              @click="showPassword = !showPassword"
            >
              <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <BaseButton variant="primary" size="lg" block :loading="loading" type="submit" class="shadow-glow-primary">
          <Icon name="lucide:log-in" class="w-4 h-4 mr-2" />
          <span>Sign In</span>
        </BaseButton>
      </form>

      <!-- Back Link -->
      <div class="text-center pt-2">
        <NuxtLink to="/" class="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center gap-1">
          <Icon name="lucide:arrow-left" class="w-3.5 h-3.5" />
          <span>Return to public order page</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

