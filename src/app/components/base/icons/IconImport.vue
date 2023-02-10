<template>
  <svg 
    :class="`icon--${size}`"
    class="icon fill-current"
    viewBox="0 0 16 16"
  >
    <g><path d="M14,0H3A2,2,0,0,0,1,2V4A1,1,0,0,0,3,4V2H14V13H12a1,1,0,0,0,0,2h2a2,2,0,0,0,2-2V2A2,2,0,0,0,14,0Z"></path><path d="M7.293,7.293,2,12.586V9A1,1,0,0,0,0,9v6a1,1,0,0,0,1,1H7a1,1,0,0,0,0-2H3.414L8.707,8.707A1,1,0,0,0,7.293,7.293Z"></path></g>
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
