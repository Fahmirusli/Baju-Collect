<script setup lang="ts">
import { ref, watch } from 'vue'
import type { SettingsData, SizeSettingData, SleeveTypeSettingData } from '~/shared/types'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

useHead({
  title: 'Settings | Admin',
})

const toast = useToast()
const saving = ref(false)
const changingPassword = ref(false)

// Fetch current settings
const { data: initialSettings, status, refresh } = await useFetch<SettingsData>('/api/admin/settings')

// Local editable form
const form = ref<{
  eventTitle: string
  eventDescription: string
  currency: string
  basePrice: number
  deadline: string
  isOpen: boolean
  sizeChartImage: string | null
  sizes: SizeSettingData[]
  sleeveTypes: SleeveTypeSettingData[]
}>({
  eventTitle: '',
  eventDescription: '',
  currency: 'MYR',
  basePrice: 35,
  deadline: '',
  isOpen: true,
  sizeChartImage: null,
  sizes: [],
  sleeveTypes: [],
})

watch(
  initialSettings,
  (s) => {
    if (s) {
      form.value = {
        eventTitle: s.eventTitle,
        eventDescription: s.eventDescription || '',
        currency: s.currency,
        basePrice: s.basePrice,
        deadline: s.deadline ? new Date(s.deadline).toISOString().slice(0, 16) : '',
        isOpen: s.isOpen,
        sizeChartImage: s.sizeChartImage,
        sizes: JSON.parse(JSON.stringify(s.sizes)),
        sleeveTypes: JSON.parse(JSON.stringify(s.sleeveTypes)),
      }
    }
  },
  { immediate: true }
)

// Sizes Manager Helpers
function addSize() {
  const nextOrder = form.value.sizes.length
  form.value.sizes.push({
    id: 0, // new
    label: '',
    surcharge: 0,
    sortOrder: nextOrder,
    isActive: true,
  })
}

function removeSize(idx: number) {
  form.value.sizes.splice(idx, 1)
}

function moveSize(idx: number, dir: -1 | 1) {
  const target = idx + dir
  if (target < 0 || target >= form.value.sizes.length) return
  const temp = form.value.sizes[idx]
  form.value.sizes[idx] = form.value.sizes[target]
  form.value.sizes[target] = temp
  // Update sort orders
  form.value.sizes.forEach((s, i) => (s.sortOrder = i))
}

// Sleeve Types Manager Helpers
function addSleeveType() {
  const nextOrder = form.value.sleeveTypes.length
  form.value.sleeveTypes.push({
    id: 0,
    label: '',
    surcharge: 0,
    sortOrder: nextOrder,
    isActive: true,
  })
}

function removeSleeveType(idx: number) {
  form.value.sleeveTypes.splice(idx, 1)
}

function moveSleeveType(idx: number, dir: -1 | 1) {
  const target = idx + dir
  if (target < 0 || target >= form.value.sleeveTypes.length) return
  const temp = form.value.sleeveTypes[idx]
  form.value.sleeveTypes[idx] = form.value.sleeveTypes[target]
  form.value.sleeveTypes[target] = temp
  form.value.sleeveTypes.forEach((st, i) => (st.sortOrder = i))
}

// Image Upload handling (base64)
function onImageSelect(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files || input.files.length === 0) return

  const file = input.files[0]
  if (file.size > 2 * 1024 * 1024) {
    toast.error('File too large', 'Please select an image smaller than 2MB.')
    return
  }

  const reader = new FileReader()
  reader.onload = (event) => {
    form.value.sizeChartImage = event.target?.result as string
  }
  reader.readAsDataURL(file)
}

function removeImage() {
  form.value.sizeChartImage = null
}

// Save Settings
async function saveSettings() {
  saving.value = true
  try {
    const payload = {
      ...form.value,
      deadline: form.value.deadline ? new Date(form.value.deadline).toISOString() : null,
      sizes: form.value.sizes.map((s, idx) => ({
        id: s.id || undefined,
        label: s.label.trim(),
        surcharge: Number(s.surcharge) || 0,
        sortOrder: idx,
        isActive: s.isActive,
      })),
      sleeveTypes: form.value.sleeveTypes.map((st, idx) => ({
        id: st.id || undefined,
        label: st.label.trim(),
        surcharge: Number(st.surcharge) || 0,
        sortOrder: idx,
        isActive: st.isActive,
      })),
    }

    const res = await $fetch<{ settings: SettingsData; warnings?: string[] }>('/api/admin/settings', {
      method: 'PUT',
      body: payload,
    })

    toast.success('Settings saved', 'Configuration updated successfully.')
    if (res.warnings && res.warnings.length > 0) {
      res.warnings.forEach((w) => toast.warning('Note', w))
    }
    refresh()
  } catch (err: any) {
    toast.error('Failed to save settings', err.data?.message || err.message)
  } finally {
    saving.value = false
  }
}

// Password Change State
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})
const newGeneratedHash = ref('')

async function changePassword() {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    toast.error('Validation error', 'New passwords do not match')
    return
  }
  if (passwordForm.value.newPassword.length < 8) {
    toast.error('Validation error', 'Password must be at least 8 characters')
    return
  }

  changingPassword.value = true
  try {
    const res = await $fetch<{ success: boolean; newHash: string; message: string }>('/api/admin/password', {
      method: 'PUT',
      body: {
        currentPassword: passwordForm.value.currentPassword,
        newPassword: passwordForm.value.newPassword,
      },
    })

    newGeneratedHash.value = res.newHash
    toast.success('Password verified', res.message)
    passwordForm.value = { currentPassword: '', newPassword: '', confirmPassword: '' }
  } catch (err: any) {
    toast.error('Password change failed', err.data?.message || err.message)
  } finally {
    changingPassword.value = false
  }
}
</script>

<template>
  <div class="space-y-8 max-w-5xl pb-16">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-white">
          Event & System Settings
        </h1>
        <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Configure event details, base pricing, deadlines, sizes, and sleeve types.
        </p>
      </div>

      <BaseButton variant="primary" size="md" :loading="saving" class="shadow-glow-primary" @click="saveSettings">
        <Icon name="lucide:save" class="w-4 h-4 mr-1.5" />
        <span>Save All Settings</span>
      </BaseButton>
    </div>

    <!-- 1. General Event Settings -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft space-y-4">
      <h3 class="font-heading font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
        <Icon name="lucide:calendar" class="w-5 h-5 text-primary-500" />
        <span>Event Details & Status</span>
      </h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <BaseInput
          v-model="form.eventTitle"
          label="Event / Campaign Title"
          placeholder="e.g. Annual Sports Day 2026 T-Shirt"
          required
        />

        <div class="grid grid-cols-2 gap-3">
          <BaseInput
            v-model="form.currency"
            label="Currency (Code)"
            placeholder="MYR"
            required
          />

          <BaseInput
            v-model.number="form.basePrice"
            label="Base Price (per shirt)"
            type="number"
            placeholder="35"
            required
          />
        </div>
      </div>

      <BaseTextarea
        v-model="form.eventDescription"
        label="Event Description / Instructions"
        placeholder="Details on material, pick-up dates, contact person, etc."
        :rows="3"
      />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <!-- Deadline datetime-local -->
        <div>
          <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Order Deadline (Optional)
          </label>
          <div class="flex items-center gap-2">
            <input
              v-model="form.deadline"
              type="datetime-local"
              class="w-full px-3.5 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              v-if="form.deadline"
              type="button"
              class="px-2.5 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-red-600 bg-gray-100 dark:bg-gray-700"
              title="Clear deadline"
              @click="form.deadline = ''"
            >
              Clear
            </button>
          </div>
        </div>

        <!-- Open / Closed Switch -->
        <div class="flex items-center justify-between sm:justify-start gap-4 p-3 bg-gray-50 dark:bg-gray-900/40 rounded-2xl border border-gray-200 dark:border-gray-700/60 self-end">
          <div>
            <div class="text-xs font-bold text-gray-900 dark:text-white">Store Open For Orders</div>
            <div class="text-[11px] text-gray-500">Enable or disable submissions immediately</div>
          </div>

          <label class="relative inline-flex items-center cursor-pointer">
            <input v-model="form.isOpen" type="checkbox" class="sr-only peer" />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
      </div>
    </div>

    <!-- 2. Sizes Manager -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-heading font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
            <Icon name="lucide:ruler" class="w-5 h-5 text-primary-500" />
            <span>Sizes Manager</span>
          </h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Configure available shirt sizes and per-size price surcharges (e.g. 2XL +2).
          </p>
        </div>

        <button
          type="button"
          class="px-3 py-1.5 rounded-xl text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/60 hover:bg-primary-100 border border-primary-200 dark:border-primary-800 flex items-center gap-1 transition"
          @click="addSize"
        >
          <Icon name="lucide:plus" class="w-3.5 h-3.5" />
          <span>Add Size</span>
        </button>
      </div>

      <div class="divide-y divide-gray-100 dark:divide-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div
          v-for="(s, idx) in form.sizes"
          :key="s.id || idx"
          class="p-3.5 bg-gray-50/50 dark:bg-gray-900/30 flex flex-wrap items-center justify-between gap-3 text-xs"
        >
          <!-- Reorder & Label -->
          <div class="flex items-center gap-2">
            <div class="flex flex-col">
              <button
                type="button"
                :disabled="idx === 0"
                class="text-gray-400 hover:text-gray-700 disabled:opacity-20"
                @click="moveSize(idx, -1)"
              >
                <Icon name="lucide:chevron-up" class="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                :disabled="idx === form.sizes.length - 1"
                class="text-gray-400 hover:text-gray-700 disabled:opacity-20"
                @click="moveSize(idx, 1)"
              >
                <Icon name="lucide:chevron-down" class="w-3.5 h-3.5" />
              </button>
            </div>

            <input
              v-model="s.label"
              type="text"
              placeholder="Size"
              class="w-20 px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-bold uppercase text-center"
            />
          </div>

          <!-- Surcharge -->
          <div class="flex items-center gap-2">
            <span class="text-gray-500 font-medium">Surcharge ({{ form.currency }}):</span>
            <input
              v-model.number="s.surcharge"
              type="number"
              step="0.5"
              min="0"
              class="w-20 px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center font-mono"
            />
          </div>

          <!-- Active Toggle & Delete -->
          <div class="flex items-center gap-3">
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input v-model="s.isActive" type="checkbox" class="rounded text-primary-600 focus:ring-primary-500" />
              <span class="text-gray-700 dark:text-gray-300 font-medium">Active</span>
            </label>

            <button
              type="button"
              class="text-gray-400 hover:text-red-600 p-1 rounded"
              title="Remove size"
              @click="removeSize(idx)"
            >
              <Icon name="lucide:trash-2" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Sleeve Types Manager -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-heading font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
            <Icon name="lucide:layers" class="w-5 h-5 text-violet" />
            <span>Sleeve Types Manager</span>
          </h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Manage sleeve styles (Short Sleeve, Long Sleeve, 3/4 Sleeve, Sleeveless) and surcharges.
          </p>
        </div>

        <button
          type="button"
          class="px-3 py-1.5 rounded-xl text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/60 hover:bg-primary-100 border border-primary-200 dark:border-primary-800 flex items-center gap-1 transition"
          @click="addSleeveType"
        >
          <Icon name="lucide:plus" class="w-3.5 h-3.5" />
          <span>Add Sleeve Type</span>
        </button>
      </div>

      <div class="divide-y divide-gray-100 dark:divide-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div
          v-for="(st, idx) in form.sleeveTypes"
          :key="st.id || idx"
          class="p-3.5 bg-gray-50/50 dark:bg-gray-900/30 flex flex-wrap items-center justify-between gap-3 text-xs"
        >
          <!-- Reorder & Label -->
          <div class="flex items-center gap-2">
            <div class="flex flex-col">
              <button
                type="button"
                :disabled="idx === 0"
                class="text-gray-400 hover:text-gray-700 disabled:opacity-20"
                @click="moveSleeveType(idx, -1)"
              >
                <Icon name="lucide:chevron-up" class="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                :disabled="idx === form.sleeveTypes.length - 1"
                class="text-gray-400 hover:text-gray-700 disabled:opacity-20"
                @click="moveSleeveType(idx, 1)"
              >
                <Icon name="lucide:chevron-down" class="w-3.5 h-3.5" />
              </button>
            </div>

            <input
              v-model="st.label"
              type="text"
              placeholder="e.g. Long Sleeve"
              class="w-40 px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-semibold"
            />
          </div>

          <!-- Surcharge -->
          <div class="flex items-center gap-2">
            <span class="text-gray-500 font-medium">Surcharge ({{ form.currency }}):</span>
            <input
              v-model.number="st.surcharge"
              type="number"
              step="0.5"
              min="0"
              class="w-20 px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center font-mono"
            />
          </div>

          <!-- Active Toggle & Delete -->
          <div class="flex items-center gap-3">
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input v-model="st.isActive" type="checkbox" class="rounded text-primary-600 focus:ring-primary-500" />
              <span class="text-gray-700 dark:text-gray-300 font-medium">Active</span>
            </label>

            <button
              type="button"
              class="text-gray-400 hover:text-red-600 p-1 rounded"
              title="Remove sleeve type"
              @click="removeSleeveType(idx)"
            >
              <Icon name="lucide:trash-2" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. Size Chart Image Upload -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft space-y-4">
      <h3 class="font-heading font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
        <Icon name="lucide:image" class="w-5 h-5 text-accent-coral" />
        <span>Size Chart Image</span>
      </h3>
      <p class="text-xs text-gray-500 dark:text-gray-400">
        Upload a custom image containing garment sizing specifications. If empty, the public site falls back to a standard built-in measurement table.
      </p>

      <div v-if="form.sizeChartImage" class="space-y-3">
        <img
          :src="form.sizeChartImage"
          alt="Size chart preview"
          class="max-h-48 rounded-2xl border border-gray-200 dark:border-gray-700 object-contain bg-white"
        />
        <button
          type="button"
          class="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
          @click="removeImage"
        >
          <Icon name="lucide:trash-2" class="w-3.5 h-3.5" />
          <span>Remove Image</span>
        </button>
      </div>

      <div v-else>
        <label class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 cursor-pointer transition">
          <Icon name="lucide:upload" class="w-4 h-4" />
          <span>Upload Image File (PNG, JPG)</span>
          <input type="file" accept="image/*" class="hidden" @change="onImageSelect" />
        </label>
      </div>
    </div>

    <!-- 5. Change Admin Password -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft space-y-4">
      <h3 class="font-heading font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
        <Icon name="lucide:lock" class="w-5 h-5 text-amber-500" />
        <span>Change Admin Password</span>
      </h3>

      <div
        v-if="newGeneratedHash"
        class="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs space-y-2"
      >
        <div class="font-bold text-emerald-800 dark:text-emerald-200">
          Password Hash Generated Successfully!
        </div>
        <p class="text-gray-600 dark:text-gray-300">
          Because security best practices require environment variables for credentials, copy and update this in your `.env` or Vercel dashboard:
        </p>
        <div class="font-mono bg-white dark:bg-gray-900 p-2.5 rounded-xl border border-emerald-300 select-all overflow-x-auto text-emerald-900 dark:text-emerald-300">
          NUXT_ADMIN_PASSWORD_HASH={{ newGeneratedHash }}
        </div>
      </div>

      <form class="grid grid-cols-1 sm:grid-cols-3 gap-3" @submit.prevent="changePassword">
        <BaseInput
          v-model="passwordForm.currentPassword"
          label="Current Password"
          type="password"
          required
        />
        <BaseInput
          v-model="passwordForm.newPassword"
          label="New Password (min 8 chars)"
          type="password"
          required
        />
        <BaseInput
          v-model="passwordForm.confirmPassword"
          label="Confirm New Password"
          type="password"
          required
        />

        <div class="sm:col-span-3 flex justify-end">
          <BaseButton variant="secondary" size="md" :loading="changingPassword" type="submit">
            Update Password
          </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

