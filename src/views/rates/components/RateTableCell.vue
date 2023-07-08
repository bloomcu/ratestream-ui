<template>
  <input 
    @input="updateValue($event.target.value)"
    :value="modelValue"
    type="text"
    :disabled="disabled"
    :class="errors ? 'bg-error' : ''"
    class="rate-table-cell reset height-100% padding-xxs"
  >
</template>

<script setup>
// block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset hover:ring-2 hover:ring-indigo-600 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6

const props = defineProps({
  modelValue: { 
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  },
  errors: {
    type: Array
  },
})

const emit = defineEmits(['update:modelValue'])

function updateValue(value) {
  emit('update:modelValue', value)
}
</script>

<style>
.rate-table-cell {
  transition: 0.2s;

  &:hover,
  &:focus {
    background-color: #eee;
  }
}

.rate-table-cell:disabled {
  &:hover,
  &:focus {
    background-color: transparent;
  }
}

.rate-table-cell__new {
  background-color: alpha(var(--color-success), 0.15);

  &:hover,
  &:focus {
    background-color: alpha(var(--color-success), 0.3);
  }
}
</style>
