<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { OrderData, OrderItemData, SizeOption, SleeveTypeOption } from '~/shared/types'

const props = defineProps<{
  open: boolean
  orderId: string | null
  sizes: SizeOption[]
  sleeveTypes: SleeveTypeOption[]
  currency: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'updated', order: OrderData): void
  (e: 'deleted', id: string): void
}>()

const toast = useToast()
const loading = ref(false)
const saving = ref(false)
const deleting = ref(false)
const showDeleteConfirm = ref(false)
const order = ref<OrderData | null>(null)

// Form states inside drawer
const form = ref<{
  customerName: string
  contact: string
  notes: string
  adminNotes: string
  status: string
  paymentStatus: string
  amountPaid: number
  items: Array<{
    shirtName: string
    sizeLabel: string
    sleeveLabel: string
    quantity: number
  }>
}>({
  customerName: '',
  contact: '',
  notes: '',
  adminNotes: '',
  status: 'pending',
  paymentStatus: 'unpaid',
  amountPaid: 0,
  items: [],
})

async function fetchOrderDetails() {
  if (!props.orderId) return
  loading.value = true
  try {
    const data = await $fetch<OrderData>(`/api/admin/orders/${props.orderId}`)
    order.value = data
    form.value = {
      customerName: data.customerName,
      contact: data.contact,
      notes: data.notes || '',
      adminNotes: data.adminNotes || '',
      status: data.status,
      paymentStatus: data.paymentStatus,
      amountPaid: Number(data.amountPaid) || 0,
      items: data.items.map((i) => ({
        shirtName: i.shirtName,
        sizeLabel: i.sizeLabel,
        sleeveLabel: i.sleeveLabel,
        quantity: i.quantity,
      })),
    }
  } catch (err: any) {
    toast.error('Failed to load order', err.message || 'Server error')
  } finally {
    loading.value = false
  }
}

watch(
  () => props.orderId,
  (newId) => {
    if (newId && props.open) {
      fetchOrderDetails()
    }
  },
  { immediate: true }
)

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen && props.orderId) {
      fetchOrderDetails()
    }
  }
)

function addItem() {
  if (form.value.items.length >= 20) return
  const defaultSize = props.sizes[0]?.label || 'M'
  const defaultSleeve = props.sleeveTypes[0]?.label || 'Short Sleeve'
  form.value.items.push({
    shirtName: '',
    sizeLabel: defaultSize,
    sleeveLabel: defaultSleeve,
    quantity: 1,
  })
}

function removeItem(idx: number) {
  if (form.value.items.length > 1) {
    form.value.items.splice(idx, 1)
  }
}

async function saveOrder() {
  if (!props.orderId) return
  if (!form.value.customerName.trim()) {
    toast.error('Validation error', 'Customer name is required')
    return
  }
  if (!form.value.contact.trim()) {
    toast.error('Validation error', 'Contact info is required')
    return
  }

  saving.value = true
  try {
    const updated = await $fetch<OrderData>(`/api/admin/orders/${props.orderId}`, {
      method: 'PUT',
      body: form.value,
    })
    order.value = updated
    toast.success('Order updated', 'Changes have been saved successfully.')
    emit('updated', updated)
    emit('close')
  } catch (err: any) {
    toast.error('Failed to save order', err.data?.message || err.message)
  } finally {
    saving.value = false
  }
}

async function deleteOrder() {
  if (!props.orderId) return
  deleting.value = true
  try {
    await $fetch(`/api/admin/orders/${props.orderId}`, { method: 'DELETE' })
    toast.success('Order deleted', 'Order removed successfully.')
    emit('deleted', props.orderId)
    emit('close')
  } catch (err: any) {
    toast.error('Failed to delete order', err.message)
  } finally {
    deleting.value = false
    showDeleteConfirm.value = false
  }
}
</script>

<template>
  <BaseDrawer :open="open" title="Order Details" width="xl" @close="emit('close')">
    <div v-if="loading" class="p-6">
      <BaseLoadingSkeleton type="card" :lines="6" />
    </div>

    <div v-else-if="order" class="p-6 space-y-6">
      <!-- Order Header Info -->
      <div class="flex flex-wrap items-center justify-between gap-3 p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700">
        <div>
          <span class="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">Order Code</span>
          <div class="font-mono font-extrabold text-xl text-primary-600 dark:text-primary-400">
            {{ order.code }}
          </div>
          <div class="text-[11px] text-gray-400 mt-0.5">
            Placed on {{ new Date(order.createdAt).toLocaleString() }}
          </div>
        </div>

        <div class="flex items-center gap-2">
          <BaseStatusBadge :status="form.status" type="order" />
          <BaseStatusBadge :status="form.paymentStatus" type="payment" />
        </div>
      </div>

      <!-- Customer Info Section -->
      <div class="space-y-3">
        <h4 class="font-heading font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
          <Icon name="lucide:user" class="w-4 h-4 text-primary-500" />
          <span>Customer Information</span>
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <BaseInput
            v-model="form.customerName"
            label="Customer Name"
            placeholder="Full Name"
            required
          />
          <BaseInput
            v-model="form.contact"
            label="Contact (Phone / Email)"
            placeholder="e.g. +60123456789 or email@domain.com"
            required
          />
        </div>
        <BaseTextarea
          v-model="form.notes"
          label="Customer Notes"
          placeholder="Notes provided by customer"
          :rows="2"
        />
      </div>

      <!-- Status & Payment Controls -->
      <div class="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-700/60">
        <h4 class="font-heading font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
          <Icon name="lucide:sliders" class="w-4 h-4 text-primary-500" />
          <span>Order & Payment Status</span>
        </h4>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <!-- Status -->
          <div>
            <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Order Status
            </label>
            <select
              v-model="form.status"
              class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="in_production">In Production</option>
              <option value="ready">Ready</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <!-- Payment Status -->
          <div>
            <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Payment Status
            </label>
            <select
              v-model="form.paymentStatus"
              class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="unpaid">Unpaid</option>
              <option value="partial">Partial</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          <!-- Amount Paid -->
          <div>
            <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Amount Paid ({{ currency }})
            </label>
            <input
              v-model.number="form.amountPaid"
              type="number"
              step="0.01"
              min="0"
              class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <BaseTextarea
          v-model="form.adminNotes"
          label="Internal Admin Notes"
          placeholder="Private notes visible only to admin team"
          :rows="2"
        />
      </div>

      <!-- Shirt Items Line Manager -->
      <div class="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-700/60">
        <div class="flex items-center justify-between">
          <h4 class="font-heading font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
            <Icon name="lucide:shirt" class="w-4 h-4 text-primary-500" />
            <span>Shirt Line Items ({{ form.items.length }})</span>
          </h4>
          <button
            type="button"
            :disabled="form.items.length >= 20"
            class="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 flex items-center gap-1 disabled:opacity-40"
            @click="addItem"
          >
            <Icon name="lucide:plus" class="w-3.5 h-3.5" />
            <span>Add Item</span>
          </button>
        </div>

        <div class="space-y-3">
          <div
            v-for="(item, idx) in form.items"
            :key="idx"
            class="p-3 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-700/70 space-y-2 text-xs"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="font-bold text-gray-500">#{{ idx + 1 }}</span>
              <button
                v-if="form.items.length > 1"
                type="button"
                class="text-red-500 hover:text-red-700 p-1 rounded"
                title="Remove item"
                @click="removeItem(idx)"
              >
                <Icon name="lucide:trash-2" class="w-3.5 h-3.5" />
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <div class="sm:col-span-1">
                <input
                  v-model="item.shirtName"
                  type="text"
                  maxlength="20"
                  placeholder="Name on shirt"
                  class="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 uppercase"
                />
              </div>

              <div>
                <select
                  v-model="item.sizeLabel"
                  class="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                >
                  <option v-for="s in sizes" :key="s.id" :value="s.label">
                    {{ s.label }}
                  </option>
                </select>
              </div>

              <div>
                <select
                  v-model="item.sleeveLabel"
                  class="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                >
                  <option v-for="st in sleeveTypes" :key="st.id" :value="st.label">
                    {{ st.label }}
                  </option>
                </select>
              </div>

              <div>
                <input
                  v-model.number="item.quantity"
                  type="number"
                  min="1"
                  max="20"
                  class="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center font-bold"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
        <button
          type="button"
          class="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1"
          @click="showDeleteConfirm = true"
        >
          <Icon name="lucide:trash-2" class="w-4 h-4" />
          <span>Delete Order</span>
        </button>

        <div class="flex items-center gap-2">
          <BaseButton variant="secondary" size="md" @click="emit('close')">
            Cancel
          </BaseButton>
          <BaseButton variant="primary" size="md" :loading="saving" @click="saveOrder">
            Save Changes
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <BaseConfirmDialog
      :open="showDeleteConfirm"
      title="Delete Order?"
      message="Are you sure you want to delete this order? All associated line items will also be permanently removed."
      confirm-text="Delete"
      variant="danger"
      @confirm="deleteOrder"
      @cancel="showDeleteConfirm = false"
    />
  </BaseDrawer>
</template>

