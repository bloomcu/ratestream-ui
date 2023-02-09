<template>
  <div>
    <AppNavigation/>
    <main 
      class="container"
      :class="`max-width-${maxWidth}`"
    >
      <slot/>
    </main>
  </div>
</template>

<script setup>
import AppNavigation from '@/app/components/AppNavigation.vue'

const props = defineProps({
    maxWidth: { 
      type: String,
      default: 'lg',
    },
})
</script>
