<template>
  <svg 
    :class="`icon--${size}`"
    class="icon fill-current"
    viewBox="0 0 16 16"
  >
    <g><path d="M14,11a1,1,0,0,0-1,1v2H2V3H4A1,1,0,0,0,4,1H2A2,2,0,0,0,0,3V14a2,2,0,0,0,2,2H13a2,2,0,0,0,2-2V12A1,1,0,0,0,14,11Z"></path><path d="M15,0H9A1,1,0,0,0,9,2h3.586L7.293,7.293A1,1,0,1,0,8.707,8.707L14,3.414V7a1,1,0,0,0,2,0V1A1,1,0,0,0,15,0Z"></path></g>
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
