<script setup lang="ts">
import { ref } from 'vue'
import type { SizeOption, SleeveTypeOption, OrderData } from '~/shared/types'

const props = defineProps<{
  open: boolean
  sizes: SizeOption[]
  sleeveTypes: SleeveTypeOption[]
  basePrice: number
  currency: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'created', order: OrderData): void
}>()

const toast = useToast()
const submitting = ref(false)

const form = ref({
  customerName: '',
  contact: '',
  notes: '',
  adminNotes: '',
  status: 'pending',
  paymentStatus: 'unpaid',
  amountPaid: 0,
  items: [
    {
      shirtName: '',
      sizeLabel: props.sizes[0]?.label || 'M',
      sleeveLabel: props.sleeveTypes[0]?.label || 'Short Sleeve',
      quantity: 1,
    },
  ],
})

function addItem() {
  if (form.value.items.length >= 20) return
  form.value.items.push({
    shirtName: '',
    sizeLabel: props.sizes[0]?.label || 'M',
    sleeveLabel: props.sleeveTypes[0]?.label || 'Short Sleeve',
    quantity: 1,
  })
}

function removeItem(idx: number) {
  if (form.value.items.length > 1) {
    form.value.items.splice(idx, 1)
  }
}

async function submitOrder() {
  if (!form.value.customerName.trim()) {
    toast.error('Validation error', 'Customer name is required')
    return
  }
  if (!form.value.contact.trim()) {
    toast.error('Validation error', 'Contact info is required')
    return
  }

  for (let i = 0; i < form.value.items.length; i++) {
    const item = form.value.items[i]
    if (!item.shirtName.trim()) {
      toast.error('Validation error', `Shirt #${i + 1} name is required`)
      return
    }
  }

  submitting.value = true
  try {
    const created = await $fetch<OrderData>('/api/admin/orders', {
      method: 'POST',
      body: form.value,
    })
    toast.success('Order created', `Order ${created.code} successfully placed.`)
    emit('created', created)
    emit('close')
    // Reset form
    form.value = {
      customerName: '',
      contact: '',
      notes: '',
      adminNotes: '',
      status: 'pending',
      paymentStatus: 'unpaid',
      amountPaid: 0,
      items: [
        {
          shirtName: '',
          sizeLabel: props.sizes[0]?.label || 'M',
          sleeveLabel: props.sleeveTypes[0]?.label || 'Short Sleeve',
          quantity: 1,
        },
      ],
    }
  } catch (err: any) {
    toast.error('Failed to create order', err.data?.message || err.message)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <BaseDrawer :open="open" title="Create Manual Order" width="lg" @close="emit('close')">
    <div class="p-6 space-y-5">
      <p class="text-xs text-gray-500 dark:text-gray-400">
        Create an order manually as administrator. This bypasses public deadlines and rate limits.
      </p>

      <!-- Customer Details -->
      <div class="space-y-3">
        <BaseInput
          v-model="form.customerName"
          label="Customer Full Name"
          placeholder="e.g. Jane Doe"
          required
        />
        <BaseInput
          v-model="form.contact"
          label="Contact (Phone / Email)"
          placeholder="e.g. +60123456789 or email@domain.com"
          required
        />
        <BaseTextarea
          v-model="form.notes"
          label="Customer Notes"
          placeholder="Optional notes"
          :rows="2"
        />
      </div>

      <!-- Admin Status & Notes -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
        <div>
          <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Status</label>
          <select
            v-model="form.status"
            class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="in_production">In Production</option>
            <option value="ready">Ready</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Payment</label>
          <select
            v-model="form.paymentStatus"
            class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
          >
            <option value="unpaid">Unpaid</option>
            <option value="partial">Partial</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Paid ({{ currency }})</label>
          <input
            v-model.number="form.amountPaid"
            type="number"
            step="0.01"
            class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
          />
        </div>
      </div>

      <!-- Shirt Items -->
      <div class="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <label class="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
            Shirt Items
          </label>
          <button
            type="button"
            class="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
            @click="addItem"
          >
            <Icon name="lucide:plus" class="w-3.5 h-3.5" />
            <span>Add Item</span>
          </button>
        </div>

        <div class="space-y-2.5">
          <div
            v-for="(item, idx) in form.items"
            :key="idx"
            class="p-3 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-700/60 space-y-2 text-xs"
          >
            <div class="flex items-center justify-between">
              <span class="font-bold text-gray-500">Item #{{ idx + 1 }}</span>
              <button
                v-if="form.items.length > 1"
                type="button"
                class="text-red-500 hover:text-red-700"
                @click="removeItem(idx)"
              >
                <Icon name="lucide:trash-2" class="w-3.5 h-3.5" />
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <input
                v-model="item.shirtName"
                type="text"
                maxlength="20"
                placeholder="Name on shirt"
                class="px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 uppercase"
              />
              <select
                v-model="item.sizeLabel"
                class="px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <option v-for="s in sizes" :key="s.id" :value="s.label">{{ s.label }}</option>
              </select>
              <select
                v-model="item.sleeveLabel"
                class="px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <option v-for="st in sleeveTypes" :key="st.id" :value="st.label">{{ st.label }}</option>
              </select>
              <input
                v-model.number="item.quantity"
                type="number"
                min="1"
                max="20"
                class="px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center font-bold"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Action Footer -->
      <div class="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
        <BaseButton variant="secondary" size="md" @click="emit('close')">Cancel</BaseButton>
        <BaseButton variant="primary" size="md" :loading="submitting" @click="submitOrder">
          Create Order
        </BaseButton>
      </div>
    </div>
  </BaseDrawer>
</template>

