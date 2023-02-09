<template>
  <svg 
    :class="`icon--${size}`"
    class="icon fill-current"
    viewBox="0 0 16 16"
  >
    <g><path d="M11,15a1,1,0,0,1-.707-.293l-6-6a1,1,0,0,1,0-1.414l6-6a1,1,0,0,1,1.414,1.414L6.414,8l5.293,5.293A1,1,0,0,1,11,15Z"></path></g>
  </svg>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'sm'
  }
})
</script>
