<template>
  <div class="circle-loader circle-loader--v2" role="alert">
    <div aria-hidden="true">
      <svg class="circle-loader__svg" width="48" height="48" viewBox="0 0 48 48"><circle class="circle-loader__base" cx="24" cy="24" r="19" fill="none" stroke="currentColor" stroke-width="2"/><circle class="circle-loader__fill" cx="24" cy="24" r="19" fill="none" stroke="currentColor" stroke-width="2"/></svg>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
:root {
  --circle-loader-v2-size: 30px;
  --circle-loader-v2-stroke-width: 3;
}

.circle-loader {
  position: relative;
  display: inline-block;
}

@supports (animation-name: this) {
  .circle-loader__label {
    @include srHide; // show label only to screen readers if animations are supported
  }
}

// loader v2 - filling
@supports (animation-name: this) {
  .circle-loader--v2 {
    will-change: transform;
    animation: circle-loader-spinning-main 1.4s infinite linear;

    .circle-loader__svg {
      display: block;
      width: var(--circle-loader-v2-size);
      height: var(--circle-loader-v2-size);
      color: var(--color-primary); // loader color

      > * {
        stroke-width: var(--circle-loader-v2-stroke-width); // loader stroke width
      }
    }

    .circle-loader__base {
      opacity: 0.2;
    }

    .circle-loader__fill {
      stroke-linecap: round; // optional - remove if you prefer butt caps
      stroke-dashoffset: 0;
      stroke-dasharray: 90 120;
      transform-origin: 50% 50%;
      transform: rotate(45deg);
      animation: circle-loader-dash 1.4s infinite;
    }
  }
}

@keyframes circle-loader-dash {
  0%, 20% {
    stroke-dashoffset: 0;
    transform: rotate(0);
  }

  50%, 70% {
    stroke-dashoffset: 80;
    transform: rotate(270deg);
  }

  100% {
    stroke-dashoffset: 0;
    transform: rotate(360deg);
  }
}

@keyframes circle-loader-spinning-main {
  to {
    transform: rotate(360deg);
  }
}
</style>
