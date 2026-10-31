<script setup lang="ts">
import { computed } from 'vue'

export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  class?: string
}

const props = withDefaults(
  defineProps<{
    columns: TableColumn[]
    rows: any[]
    loading?: boolean
    emptyText?: string
    selectable?: boolean
    selectedIds?: string[]
    sortBy?: string
    sortDir?: 'asc' | 'desc'
  }>(),
  {
    loading: false,
    emptyText: 'No records found',
    selectable: false,
    selectedIds: () => [],
    sortDir: 'desc',
  }
)

const emit = defineEmits<{
  (e: 'sort', key: string, dir: 'asc' | 'desc'): void
  (e: 'select', ids: string[]): void
  (e: 'rowClick', row: any): void
}>()

const isAllSelected = computed(() => {
  if (!props.rows || props.rows.length === 0) return false
  return props.rows.every((row) => props.selectedIds.includes(row.id))
})

const isIndeterminate = computed(() => {
  if (!props.rows || props.rows.length === 0) return false
  const selectedCount = props.rows.filter((row) => props.selectedIds.includes(row.id)).length
  return selectedCount > 0 && selectedCount < props.rows.length
})

function toggleSelectAll() {
  if (isAllSelected.value) {
    emit('select', [])
  } else {
    emit(
      'select',
      props.rows.map((row) => row.id)
    )
  }
}

function toggleSelectRow(id: string, e: Event) {
  e.stopPropagation()
  const exists = props.selectedIds.includes(id)
  if (exists) {
    emit(
      'select',
      props.selectedIds.filter((item) => item !== id)
    )
  } else {
    emit('select', [...props.selectedIds, id])
  }
}

function handleSort(col: TableColumn) {
  if (!col.sortable) return
  const newDir = props.sortBy === col.key && props.sortDir === 'asc' ? 'desc' : 'asc'
  emit('sort', col.key, newDir)
}
</script>

<template>
  <div class="w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/60 shadow-soft overflow-hidden">
    <!-- Table wrapper with horizontal scroll -->
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse text-xs sm:text-sm">
        <thead class="bg-gray-50/80 dark:bg-gray-900/50 text-gray-600 dark:text-gray-300 font-heading border-b border-gray-100 dark:border-gray-700/60">
          <tr>
            <!-- Select All Checkbox -->
            <th v-if="selectable" class="w-10 px-4 py-3.5">
              <input
                type="checkbox"
                :checked="isAllSelected"
                :indeterminate="isIndeterminate"
                class="rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer w-4 h-4"
                aria-label="Select all rows"
                @change="toggleSelectAll"
              />
            </th>

            <!-- Columns -->
            <th
              v-for="col in columns"
              :key="col.key"
              :class="[
                'px-4 py-3.5 font-bold tracking-wider uppercase text-[11px]',
                col.sortable ? 'cursor-pointer select-none hover:text-primary-600 dark:hover:text-primary-400' : '',
                col.class || ''
              ]"
              @click="handleSort(col)"
            >
              <div class="flex items-center gap-1.5">
                <span>{{ col.label }}</span>
                <span v-if="col.sortable" class="inline-flex">
                  <Icon
                    v-if="sortBy === col.key"
                    :name="sortDir === 'asc' ? 'lucide:arrow-up' : 'lucide:arrow-down'"
                    class="w-3.5 h-3.5 text-primary-600 dark:text-primary-400"
                  />
                  <Icon
                    v-else
                    name="lucide:arrow-up-down"
                    class="w-3.5 h-3.5 text-gray-300 dark:text-gray-600"
                  />
                </span>
              </div>
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100 dark:divide-gray-700/50">
          <!-- Loading State -->
          <tr v-if="loading">
            <td :colspan="columns.length + (selectable ? 1 : 0)" class="p-8">
              <BaseLoadingSkeleton type="table" :lines="6" />
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-else-if="rows.length === 0">
            <td :colspan="columns.length + (selectable ? 1 : 0)" class="py-12 px-4 text-center">
              <div class="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                <Icon name="lucide:inbox" class="w-10 h-10 mb-2 stroke-1" />
                <p class="text-sm font-medium">{{ emptyText }}</p>
              </div>
            </td>
          </tr>

          <!-- Data Rows -->
          <tr
            v-for="(row, idx) in rows"
            v-else
            :key="row.id || idx"
            :class="[
              'transition-colors duration-150 cursor-pointer group',
              selectedIds.includes(row.id)
                ? 'bg-primary-50/40 dark:bg-primary-950/20'
                : 'hover:bg-gray-50/80 dark:hover:bg-gray-700/30'
            ]"
            @click="emit('rowClick', row)"
          >
            <!-- Checkbox Cell -->
            <td v-if="selectable" class="px-4 py-3.5" @click.stop>
              <input
                type="checkbox"
                :checked="selectedIds.includes(row.id)"
                class="rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer w-4 h-4"
                :aria-label="`Select row ${row.code || idx}`"
                @change="toggleSelectRow(row.id, $event)"
              />
            </td>

            <!-- Default Slot or Column Keys -->
            <slot name="row" :row="row">
              <td
                v-for="col in columns"
                :key="col.key"
                :class="['px-4 py-3.5 text-gray-700 dark:text-gray-300', col.class || '']"
              >
                {{ row[col.key] }}
              </td>
            </slot>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

