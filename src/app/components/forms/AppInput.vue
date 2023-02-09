<template>
  <div class="margin-bottom-sm">
    <label v-if="label" class="form-label margin-bottom-xxs" :for="label">{{ label }}</label>
    <input 
      @input="updateValue($event.target.value)"
      :value="modelValue"
      :type="type"
      :name="label"
      :placeholder="placeholder"
      :required="required"
      :autofocus="autofocus"
      :disabled="disabled"
      :class="errors ? 'form-control--error' : ''"
      class="form-control width-100%" 
    >
    <div v-if="errors" class="bg-error bg-opacity-20% padding-xs radius-md text-sm color-contrast-higher margin-top-xxxs" role="alert">
      <ul v-if="errors.length > 1" class="list list--ul">
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
      <p v-else>{{ errors[0] }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { 
    type: String
  },
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String
  },
  placeholder: {
    type: String
  },
  errors: {
    type: Array
  },
  required: {
    type: Boolean,
    default: false
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

function updateValue(value) {
  emit('update:modelValue', value)
}
</script>
