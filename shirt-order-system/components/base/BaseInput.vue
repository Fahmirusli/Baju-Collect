<script setup lang="ts">
interface Props {
  modelValue?: string | number
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'datetime-local'
  error?: string
  required?: boolean
  disabled?: boolean
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  placeholder: '',
  type: 'text',
  error: '',
  required: false,
  disabled: false,
  id: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const inputId = computed(() => props.id || `input-${Math.random().toString(36).slice(2, 9)}`)

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-0.5" aria-hidden="true">*</span>
    </label>
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${inputId}-error` : undefined"
      class="w-full rounded-xl border px-4 py-2.5 text-sm font-body transition-all duration-200
        bg-white dark:bg-white/5
        text-gray-900 dark:text-gray-100
        placeholder:text-gray-400 dark:placeholder:text-gray-500
        focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-gray-900
        disabled:opacity-50 disabled:cursor-not-allowed"
      :class="[
        error
          ? 'border-red-400 dark:border-red-500 focus:ring-red-500'
          : 'border-gray-200 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500',
      ]"
      @input="onInput"
    />
    <p
      v-if="error"
      :id="`${inputId}-error`"
      class="mt-1.5 text-xs text-red-500 dark:text-red-400 flex items-center gap-1"
      role="alert"
    >
      <Icon name="lucide:alert-circle" class="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      {{ error }}
    </p>
  </div>
</template>
