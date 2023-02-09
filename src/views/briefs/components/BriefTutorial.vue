<template>
  <div>
    <p class="text-xs text-uppercase letter-spacing-lg color-primary">Step 1</p>
    <h1>Watch the video tutorial</h1>
    <!-- <iframe src="https://player.vimeo.com/video/711021881?h=f8e6454dd7" width="1024" height="576" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe> -->
    <iframe src="https://player.vimeo.com/video/743548172?h=4bd1787217" width="1024" height="576" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
    
    <div class="flex gap-xs margin-top-md padding-y-md border-top">
      <button @click="toggle('brief-intro')" class="btn btn--subtle">Back</button>
      <button @click="toggle('brief-brand')" class="btn btn--primary">Next</button>
    </div>
  </div>
</template>

<script setup>
import useToggle from '@/app/composables/useToggle.js'
const { toggle } = useToggle()
</script>
