<template>
  <div
    ref="editableDiv"
    @input="handleInput"
    contenteditable
    :class="errors ? 'bg-error' : ''"
    class="rate-table-cell reset width-100% height-100% padding-xxs"
  ></div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  errors: {
    type: Array,
  },
});

const emit = defineEmits(['update:modelValue']);
const editableDiv = ref(null);

// Set initial content
onMounted(() => {
  if (editableDiv.value) {
    editableDiv.value.innerText = props.modelValue || '';
  }
});

// Watch for external changes to modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    if (editableDiv.value && editableDiv.value.innerText !== newValue) {
      editableDiv.value.innerText = newValue || '';
    }
  }
);

function handleInput(event) {
  const value = event.target.innerText;
  emit('update:modelValue', value);
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