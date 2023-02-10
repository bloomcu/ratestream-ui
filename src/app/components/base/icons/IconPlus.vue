<template>
  <svg 
    :class="`icon--${size}`"
    class="icon fill-current"
    viewBox="0 0 16 16"
  >
    <g><path d="M15,7H9V1c0-0.6-0.4-1-1-1S7,0.4,7,1v6H1C0.4,7,0,7.4,0,8s0.4,1,1,1h6v6c0,0.6,0.4,1,1,1s1-0.4,1-1V9h6 c0.6,0,1-0.4,1-1S15.6,7,15,7z"></path></g>
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
