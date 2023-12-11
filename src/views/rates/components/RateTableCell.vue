<template>
  <div 
      v-text="modelValue"
      @input="$emit('update:modelValue', $event.target.innerText)"
      contenteditable
      :class="errors ? 'bg-error' : ''"
      class="rate-table-cell reset width-100% height-100% padding-xxs"
    ></div>
</template>

<script setup>
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

<style lang="scss">
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
