<template>
  <div>
    <p class="text-xs text-uppercase letter-spacing-lg color-primary">Intro</p>
    <h1>Style design brief</h1>
    <p class="max-width-sm">You will be designing a webpage for a credit union. This document has the information you need to get started.</p>
    
    <div class="flex gap-xs margin-top-md padding-y-md border-top">
      <button @click="toggle('brief-tutorial')" class="btn btn--primary">Start</button>
    </div>
  </div>
</template>

<script setup>
import useToggle from '@/app/composables/useToggle.js'
const { toggle } = useToggle()
</script>
