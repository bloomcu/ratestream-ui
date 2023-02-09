<template>
  <div class="modal modal--animate-scale flex flex-center">
    <div @click="close()" class="modal__overlay bg-black bg-opacity-30%"></div>
    
    <div 
      class="modal__content width-100% overflow-auto bg padding-md padding-x-md radius-md inner-glow shadow-md"
      :class="`max-width-${size}`"
    >
      <slot/>
    </div>

    <button @click="close()" class="reset modal__close-btn modal__close-btn--outer display@md js-modal__close js-tab-focus">
      <svg class="icon icon--sm" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="3" x2="21" y2="21" /><line x1="21" y1="3" x2="3" y2="21" /></g>
      </svg>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'md'
  }
})

function close() {
  emit('closed')
}

const emit = defineEmits(['closed'])
</script>

<style lang="scss">
.modal {
  position: fixed;
  z-index: var(--z-index-overlay, 15); 
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0;
  visibility: hidden;
  
  &--is-visible {
    opacity: 1;
    visibility: visible;
  }
  
  &:not(.modal--is-visible) {
    pointer-events: none;
    background-color: transparent;
  }
}

/* this sets behind the modal content */
.modal__overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: pointer;
}

.modal__content {
  max-height: 90%;
}

/* close buttons */
.modal__close-btn {
  display: flex;
  flex-shrink: 0;
  border-radius: 50% !important;
  transition: 0.2s;
  cursor: pointer;

  .icon {
    display: block;
    margin: auto;
  }
  
  &--outer { /* close button - outside the modal__content */
    --size: 48px;
    width: var(--size);
    height: var(--size);
    position: fixed;
    top: var(--space-sm);
    right: var(--space-sm);
    z-index: var(--z-index-fixed-element, 10); 
    background-color: alpha(var(--color-black), 0.6) !important;
    transition: 0.2s;

    .icon {
      color: var(--color-white); /* icon color */
      transition: transform 0.3s var(--ease-out-back);
    }

    &:hover {
      background-color: alpha(var(--color-black), 1);
    }
  }
  
  &--inner { /* close button - inside the modal__content */
    --size: 32px;
    width: var(--size);
    height: var(--size);
    background-color: var(--color-bg-light);
    box-shadow: var(--inner-glow), var(--shadow-sm);
    transition: 0.2s;

    .icon {
      color: inherit; /* icon color */
    }

    &:hover {
      background-color: var(--color-bg-lighter);
      box-shadow: var(--inner-glow), var(--shadow-md);
    }
  }
}

/* animations */
:root {
  --modal-transition-duration: 0.2s; /* fallback (i.e., unless specified differently in the variations 👇) */
}

@media (prefers-reduced-motion: no-preference) {
  .modal--animate-fade {
    --modal-transition-duration: 0.2s;
    transition: opacity var(--modal-transition-duration), background-color var(--modal-transition-duration), visibility 0s var(--modal-transition-duration);

    &.modal--is-visible {
      transition: opacity var(--modal-transition-duration), background-color var(--modal-transition-duration), visibility 0s;
    }
  }

  .modal--animate-scale {
    --modal-transition-duration: 0.2s;
    transition: opacity var(--modal-transition-duration), background-color var(--modal-transition-duration), visibility 0s var(--modal-transition-duration);

    .modal__content {
      will-change: transform;
      transition: transform var(--modal-transition-duration) var(--ease-out);
    }

    &.modal--is-visible {
      transition: opacity var(--modal-transition-duration), background-color var(--modal-transition-duration), visibility 0s;

      .modal__content {
        transform: scale(1); /* reset all transformations */
      }
    }
  }

  /* scale */
  .modal--animate-scale {
    .modal__content {
      transform: scale(0.95);
    }
  }
}

// TODO: Move
.content__image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;  
}

// TODO: Move
.content__image {
  display: block;
  max-height: 80vh;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}
</style>
