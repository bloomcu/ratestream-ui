<template>
  <svg 
    :class="`icon--${size}`"
    class="icon fill-current"
    viewBox="0 0 16 16"
  >
    <g><path d="M10.707,2.293A1,1,0,0,0,9.293,3.707L12.586,7H1A1,1,0,0,0,1,9H12.586L9.293,12.293a1,1,0,1,0,1.414,1.414l5-5a1,1,0,0,0,0-1.414Z"></path></g>
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
