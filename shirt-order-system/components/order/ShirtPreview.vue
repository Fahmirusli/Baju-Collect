<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    shirtName?: string
    sleeveType?: string
    sizeLabel?: string
    color?: string
  }>(),
  {
    shirtName: 'YOUR NAME',
    sleeveType: 'Short Sleeve',
    sizeLabel: 'M',
    color: 'indigo',
  }
)

const normalizedSleeve = computed(() => {
  const s = (props.sleeveType || '').toLowerCase()
  if (s.includes('sleeveless') || s.includes('tank')) return 'sleeveless'
  if (s.includes('long')) return 'long'
  if (s.includes('3/4') || s.includes('three')) return 'three-quarter'
  return 'short'
})

// Paths for each sleeve style in 300x300 viewBox
const shirtPaths = {
  // Sleeveless / Tank Top
  sleeveless:
    'M 115 35 Q 150 55 185 35 L 205 50 Q 185 100 215 130 L 215 270 L 85 270 L 85 130 Q 115 100 95 50 Z',

  // Standard Short Sleeve
  short:
    'M 120 35 Q 150 55 180 35 L 235 60 L 265 115 L 225 135 L 215 120 L 215 270 L 85 270 L 85 120 L 75 135 L 35 115 L 65 60 Z',

  // 3/4 Sleeve
  'three-quarter':
    'M 120 35 Q 150 55 180 35 L 240 55 L 280 165 L 245 178 L 220 120 L 215 270 L 85 270 L 80 120 L 55 178 L 20 165 L 60 55 Z',

  // Long Sleeve
  long:
    'M 120 35 Q 150 55 180 35 L 240 55 L 295 220 L 260 230 L 222 120 L 215 270 L 85 270 L 78 120 L 40 230 L 5 220 L 60 55 Z',
}

const currentPath = computed(() => {
  return shirtPaths[normalizedSleeve.value] || shirtPaths.short
})

const displayName = computed(() => {
  const trimmed = (props.shirtName || '').trim()
  return trimmed || 'YOUR NAME'
})
</script>

<template>
  <div class="relative flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft-xl overflow-hidden w-full max-w-[340px] mx-auto">
    <!-- Top badge: sleeve type + size -->
    <div class="flex items-center justify-between w-full px-3 py-1 mb-2">
      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-heading font-semibold bg-primary-100 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200/50 dark:border-primary-800/40">
        <Icon name="lucide:sparkles" class="w-3 h-3 text-primary-500" />
        {{ sleeveType || 'Short Sleeve' }}
      </span>

      <span class="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
        {{ sizeLabel || 'M' }}
      </span>
    </div>

    <!-- T-Shirt SVG -->
    <div class="relative w-full aspect-square max-w-[270px] flex items-center justify-center">
      <svg
        viewBox="0 0 300 300"
        class="w-full h-full drop-shadow-xl transition-all duration-300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <!-- Shirt Body Gradient -->
          <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4F46E5" />
            <stop offset="50%" stop-color="#6366F1" />
            <stop offset="100%" stop-color="#7C3AED" />
          </linearGradient>

          <!-- Inner shadow/depth -->
          <linearGradient id="foldShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.25" />
            <stop offset="100%" stop-color="#000000" stop-opacity="0.2" />
          </linearGradient>
        </defs>

        <!-- Main T-Shirt Path with animated morphology -->
        <path
          :d="currentPath"
          fill="url(#shirtGradient)"
          stroke="#3730A3"
          stroke-width="2.5"
          stroke-linejoin="round"
          class="transition-all duration-500 ease-out"
        />

        <!-- Fabric highlights overlay -->
        <path
          :d="currentPath"
          fill="url(#foldShadow)"
          class="transition-all duration-500 ease-out pointer-events-none"
        />

        <!-- Collar detail -->
        <path
          d="M 120 35 Q 150 55 180 35 Q 150 48 120 35 Z"
          fill="#312E81"
          stroke="#1E1B4B"
          stroke-width="1.5"
        />

        <!-- Inner collar tag -->
        <rect
          x="142"
          y="42"
          width="16"
          height="12"
          rx="2"
          fill="#E0E7FF"
          opacity="0.9"
        />
        <text
          x="150"
          y="51"
          font-family="monospace"
          font-size="7"
          font-weight="bold"
          fill="#3730A3"
          text-anchor="middle"
        >
          {{ sizeLabel || 'M' }}
        </text>

        <!-- Chest print area -->
        <!-- Subtle print boundary box -->
        <rect
          x="105"
          y="110"
          width="90"
          height="45"
          rx="6"
          fill="white"
          fill-opacity="0.08"
          stroke="white"
          stroke-opacity="0.2"
          stroke-dasharray="2,2"
        />

        <!-- Custom Printed Name -->
        <text
          x="150"
          y="138"
          text-anchor="middle"
          class="font-heading font-extrabold tracking-wide uppercase transition-all duration-200"
          fill="#FFFFFF"
          font-size="14"
          letter-spacing="1"
          style="text-shadow: 0 2px 4px rgba(0,0,0,0.4);"
        >
          {{ displayName }}
        </text>
      </svg>
    </div>

    <!-- Bottom helper text -->
    <div class="mt-2 text-center">
      <p class="text-xs font-medium text-gray-500 dark:text-gray-400">
        Live Preview <span class="text-primary-500 font-semibold">• 100% Cotton</span>
      </p>
    </div>
  </div>
</template>

