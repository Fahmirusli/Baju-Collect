<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import type { SizeOption } from '~/shared/types'

const props = defineProps<{
  open: boolean
  imageUrl?: string | null
  sizes?: SizeOption[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.open) {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
})

const defaultChartData = [
  { size: 'XS', chestIn: '34-36"', chestCm: '86-91 cm', lengthIn: '26"', lengthCm: '66 cm' },
  { size: 'S', chestIn: '36-38"', chestCm: '91-96 cm', lengthIn: '27"', lengthCm: '69 cm' },
  { size: 'M', chestIn: '38-40"', chestCm: '96-101 cm', lengthIn: '28"', lengthCm: '71 cm' },
  { size: 'L', chestIn: '40-42"', chestCm: '101-106 cm', lengthIn: '29"', lengthCm: '74 cm' },
  { size: 'XL', chestIn: '42-44"', chestCm: '106-111 cm', lengthIn: '30"', lengthCm: '76 cm' },
  { size: '2XL', chestIn: '44-46"', chestCm: '111-116 cm', lengthIn: '31"', lengthCm: '79 cm' },
  { size: '3XL', chestIn: '46-48"', chestCm: '116-121 cm', lengthIn: '32"', lengthCm: '81 cm' },
  { size: '4XL', chestIn: '48-50"', chestCm: '121-127 cm', lengthIn: '33"', lengthCm: '84 cm' },
  { size: '5XL', chestIn: '50-52"', chestCm: '127-132 cm', lengthIn: '34"', lengthCm: '86 cm' },
]
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Size chart modal"
      @click.self="emit('close')"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-soft-xl border border-gray-100 dark:border-gray-700 animate-scale-in flex flex-col"
      >
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Icon name="lucide:ruler" class="w-5 h-5 text-primary-500" />
            <h3 class="font-heading font-bold text-lg text-gray-900 dark:text-white">
              Size Chart & Measurements
            </h3>
          </div>
          <button
            type="button"
            class="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition"
            aria-label="Close modal"
            @click="emit('close')"
          >
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 overflow-y-auto space-y-4">
          <!-- Custom image if uploaded -->
          <div v-if="imageUrl" class="flex justify-center mb-4">
            <img
              :src="imageUrl"
              alt="Size Chart"
              class="max-w-full max-h-[60vh] rounded-xl object-contain border border-gray-200 dark:border-gray-700 shadow-sm"
            />
          </div>

          <!-- Fallback or Default standard measurements table -->
          <div v-else class="space-y-4">
            <p class="text-xs text-gray-500 dark:text-gray-400">
              All measurements are approximate and subject to standard ±0.5" (±1.5 cm) garment manufacturing tolerances.
            </p>

            <div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table class="w-full text-left text-xs sm:text-sm">
                <thead class="bg-primary-50 dark:bg-primary-950/40 text-primary-900 dark:text-primary-200 font-heading">
                  <tr>
                    <th class="px-4 py-3 font-bold">Size</th>
                    <th class="px-4 py-3 font-semibold">Chest (Inches)</th>
                    <th class="px-4 py-3 font-semibold">Chest (CM)</th>
                    <th class="px-4 py-3 font-semibold">Body Length</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr
                    v-for="(row, idx) in defaultChartData"
                    :key="row.size"
                    :class="idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/60 dark:bg-gray-800/50'"
                  >
                    <td class="px-4 py-2.5 font-bold font-heading text-primary-600 dark:text-primary-400">
                      {{ row.size }}
                    </td>
                    <td class="px-4 py-2.5 text-gray-700 dark:text-gray-300 font-mono">
                      {{ row.chestIn }}
                    </td>
                    <td class="px-4 py-2.5 text-gray-600 dark:text-gray-400 font-mono">
                      {{ row.chestCm }}
                    </td>
                    <td class="px-4 py-2.5 text-gray-700 dark:text-gray-300 font-mono">
                      {{ row.lengthIn }} ({{ row.lengthCm }})
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700/60 flex justify-end">
          <BaseButton variant="secondary" size="sm" @click="emit('close')">
            Close
          </BaseButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>

