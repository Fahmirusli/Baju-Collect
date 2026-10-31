<script setup lang="ts">
interface Props {
  status: string
  type?: 'order' | 'payment'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'order',
})

const orderStatusConfig: Record<string, { label: string; classes: string }> = {
  pending: {
    label: 'Pending',
    classes: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  },
  confirmed: {
    label: 'Confirmed',
    classes: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  },
  in_production: {
    label: 'In Production',
    classes: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  },
  ready: {
    label: 'Ready',
    classes: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  },
  delivered: {
    label: 'Delivered',
    classes: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  },
  cancelled: {
    label: 'Cancelled',
    classes: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  },
}

const paymentStatusConfig: Record<string, { label: string; classes: string }> = {
  unpaid: {
    label: 'Unpaid',
    classes: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  },
  partial: {
    label: 'Partial',
    classes: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  },
  paid: {
    label: 'Paid',
    classes: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  },
}

const config = computed(() => {
  const map = props.type === 'payment' ? paymentStatusConfig : orderStatusConfig
  return map[props.status] ?? {
    label: props.status,
    classes: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  }
})
</script>

<template>
  <span
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap"
    :class="config.classes"
  >
    {{ config.label }}
  </span>
</template>
