import { ref, computed } from 'vue'
import type { ShirtFormRow, SizeOption, SleeveTypeOption } from '~/shared/types'

export function useOrderForm(
  sizes: Ref<SizeOption[]> | SizeOption[],
  sleeveTypes: Ref<SleeveTypeOption[]> | SleeveTypeOption[],
  basePrice: Ref<number> | number
) {
  const customerName = ref('')
  const contact = ref('')
  const notes = ref('')
  const honeypot = ref('')
  const focusedRowIndex = ref(0)

  const sizesRef = isRef(sizes) ? sizes : ref(sizes)
  const sleevesRef = isRef(sleeveTypes) ? sleeveTypes : ref(sleeveTypes)
  const basePriceRef = isRef(basePrice) ? basePrice : ref(basePrice)

  function createEmptyRow(): ShirtFormRow {
    return {
      _key: 'item_' + Math.random().toString(36).slice(2, 9),
      shirtName: '',
      sizeLabel: sizesRef.value[0]?.label || 'M',
      sleeveLabel: sleevesRef.value[0]?.label || 'Short Sleeve',
      quantity: 1,
    }
  }

  const items = ref<ShirtFormRow[]>([createEmptyRow()])

  function addRow() {
    if (items.value.length < 20) {
      items.value.push(createEmptyRow())
      focusedRowIndex.value = items.value.length - 1
    }
  }

  function removeRow(index: number) {
    if (items.value.length > 1) {
      items.value.splice(index, 1)
      if (focusedRowIndex.value >= items.value.length) {
        focusedRowIndex.value = Math.max(0, items.value.length - 1)
      }
    }
  }

  function duplicateRow(index: number) {
    if (items.value.length < 20 && items.value[index]) {
      const source = items.value[index]
      items.value.splice(index + 1, 0, {
        _key: 'item_' + Math.random().toString(36).slice(2, 9),
        shirtName: source.shirtName,
        sizeLabel: source.sizeLabel,
        sleeveLabel: source.sleeveLabel,
        quantity: source.quantity,
      })
      focusedRowIndex.value = index + 1
    }
  }

  function updateRow(index: number, updated: ShirtFormRow) {
    if (items.value[index]) {
      items.value[index] = updated
    }
  }

  const focusedRow = computed(() => {
    return items.value[focusedRowIndex.value] || items.value[0]
  })

  const totalQuantity = computed(() => {
    return items.value.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => {
      const sizeSurcharge = sizesRef.value.find((s) => s.label === item.sizeLabel)?.surcharge || 0
      const sleeveSurcharge = sleevesRef.value.find((st) => st.label === item.sleeveLabel)?.surcharge || 0
      const unit = basePriceRef.value + sizeSurcharge + sleeveSurcharge
      return sum + unit * (Number(item.quantity) || 0)
    }, 0)
  })

  function reset() {
    customerName.value = ''
    contact.value = ''
    notes.value = ''
    honeypot.value = ''
    items.value = [createEmptyRow()]
    focusedRowIndex.value = 0
  }

  return {
    customerName,
    contact,
    notes,
    honeypot,
    items,
    focusedRowIndex,
    focusedRow,
    totalQuantity,
    totalPrice,
    addRow,
    removeRow,
    duplicateRow,
    updateRow,
    reset,
  }
}

