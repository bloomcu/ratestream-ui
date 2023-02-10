<template>
  <button class="chip chip__btn text-sm padding-y-xxxs padding-x-xs" :class="`chip--${color}`">
    <slot/>
  </button>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: 'outline',
  },
  size: {
    type: String,
    default: 'xxxs',
  },
  interactive: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss">
.chip {
  /* reset - in case the class is applied to a <button> or an <a> */
  border: 0;
  color: inherit;
  line-height: 1;
  appearance: none;

  display: inline-flex;
  align-items: center;
  border-radius: 50em;
  
  background-color: alpha(var(--color-contrast-higher), 0.1);
  
  @include fontSmooth;
  
  /* 👇 you can ovveride this padding by using the padding utility classes */
  // &:not([class^="padding-"]):not([class*=" padding-"]) {
  //   padding: var(--space-xxxs);
  // }
  
  &--outline {
    background-color: var(--color-white);
    box-shadow: inset 0 0 0 1px alpha(var(--color-contrast-high), 0.15);
  }

  &--white {
    background-color: var(--color-white);
  }

  &--error {
    background-color: alpha(var(--color-error), 0.2);
    color: var(--color-contrast-higher);
  }

  &--success {
    background-color: alpha(var(--color-success), 0.2);
    color: var(--color-contrast-higher);
  }

  &--warning {
    background-color: alpha(var(--color-warning), 0.2);
    color: var(--color-contrast-higher);
  }
}

.chip__btn {
  cursor: pointer;
  will-change: transform;
  transition: background, box-shadow, transform;
  transition-duration: .2s;

  &:hover {
    background-color: alpha(var(--color-contrast-higher), 0.075);
  }

  &:active {
    transform: translateY(1px);
  }
}
</style>
