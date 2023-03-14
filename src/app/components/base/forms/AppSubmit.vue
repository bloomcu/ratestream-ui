<template>
  <button 
    :class="[
    `btn--${size}`,
    `btn--${color}`,
    { 'btn-states--state-b': loading }
    ]"
    class="reset btn btn-states btn-states--preserve-width width-100%"
  >
    <span class="btn-states__content-a">
      <slot></slot>
    </span>
    <span class="btn-states__content-b inline-flex flex-center">
      <svg class="icon icon--is-spinning" aria-hidden="true" viewBox="0 0 16 16"><title>Loading</title><g stroke-width="1" fill="currentColor" stroke="currentColor"><path d="M.5,8a7.5,7.5,0,1,1,1.91,5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>
    </span>
  </button>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'md'
  },
  color: {
    type: String,
    default: 'primary'
  },
  loading: {
    type: Boolean,
    default: false
  },
})
</script>

<style lang="scss">
.btn-states {
  position: relative;
}

.btn-states--state-b:not(.btn-states--preserve-width) .btn-states__content-a {
  display: none;
}

.btn-states:not(.btn-states--state-b) .btn-states__content-b {
  display: none;
}

/* preserve button width when switching from state A to state B */
.btn-states--preserve-width {
  .btn-states__content-b {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &.btn-states--state-b .btn-states__content-a {
    visibility: hidden;
  }
}
</style>
