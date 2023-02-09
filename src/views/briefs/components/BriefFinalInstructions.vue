<template>
  <div>
    <p class="text-xs text-uppercase letter-spacing-lg color-primary">Step 4</p>
    <h1>Final instructions</h1>
    
    <h4>Goal #1: Be on-brand and high quality</h4>
    <p class="padding-bottom-sm">We should feel confident about sharing the concept with the client.</p>
    
    <h4>Goal #2: Create divergence</h4>
    <p>While every concept should stay within the brand guidelines, they should each be significantly different. We need divergence so the client can choose a distinct direction for their website's style.</p>
    <p>
      Examples:
      <ul>
        <li>Use different colors for ...</li>
        <ul>
          <li>Buttons</li>
          <li>Fonts</li>
          <li>Backgrounds</li>
          <li>Icons</li>
          <li>Images</li>
          <li>Graphics</li>
        </ul>
        
        <li>Use different fonts</li>
        <li>Use different blocks (or different layout variants for the blocks)</li>
        <li>Use different images</li>
        <li>Use different icons</li>
        <li>Use different graphics (independently and combined with images)</li>
      </ul>
    </p>

    <div class="flex gap-xs margin-top-md padding-y-md border-top">
      <button @click="toggle('brief-assets')" class="btn btn--subtle">Back</button>
      <button @click="toggle('brief-more-info')" class="btn btn--primary">Next</button>
    </div>
  </div>
</template>

<script setup>
import useToggle from '@/app/composables/useToggle.js'
const { toggle } = useToggle()
</script>
