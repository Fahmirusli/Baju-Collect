<script setup lang="ts">
interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  error?: string
  required?: boolean
  rows?: number
  maxlength?: number
  id?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  placeholder: '',
  error: '',
  required: false,
  rows: 4,
  maxlength: undefined,
  id: '',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const textareaId = computed(() => props.id || `textarea-${Math.random().toString(36).slice(2, 9)}`)
const charCount = computed(() => props.modelValue?.length ?? 0)

function onInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="textareaId"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-0.5" aria-hidden="true">*</span>
    </label>
    <textarea
      :id="textareaId"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :rows="rows"
      :maxlength="maxlength"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${textareaId}-error` : undefined"
      class="w-full rounded-xl border px-4 py-2.5 text-sm font-body transition-all duration-200 resize-y
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
    <div class="flex items-center justify-between mt-1.5">
      <p
        v-if="error"
        :id="`${textareaId}-error`"
        class="text-xs text-red-500 dark:text-red-400 flex items-center gap-1"
        role="alert"
      >
        <Icon name="lucide:alert-circle" class="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        {{ error }}
      </p>
      <span v-else />
      <span
        v-if="maxlength"
        class="text-xs text-gray-400 dark:text-gray-500 tabular-nums"
      >
        {{ charCount }}/{{ maxlength }}
      </span>
    </div>
  </div>
</template>
