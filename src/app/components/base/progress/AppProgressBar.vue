<template>
  <div class="progress-bar flex flex-column items-center" data-animation="on">
    <div class="progress-bar__bg">
      <div class="progress-bar__fill" :style="`width: ${progress}%;`"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
    progress: { 
      type: String,
      default: '0'
    }
})
</script>

<style lang="scss">
.progress-bar {}

.progress-bar__bg { // progress bar background element
  position: relative;
  width: 100%;
  height: 5px;
  background-color: alpha(var(--color-contrast-higher), 0.1);
  flex-grow: 1;
  overflow: hidden;
}

.progress-bar__fill { // progress bar fill element
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0%; // fallback value -> make sure to set it in the HTML
  background-color: var(--color-success);
}
</style>
