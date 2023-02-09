<template>
  <main 
    class="container"
    :class="`max-width-${maxWidth}`"
  >
    <slot/>
  </main>
</template>

<script setup>
const props = defineProps({
    maxWidth: { 
      type: String,
      default: 'lg',
    },
})
</script>
