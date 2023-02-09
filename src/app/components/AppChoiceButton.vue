<template>
  <fieldset>
    <legend class="form-legend">Delivery method</legend>

    <div class="choice-btns flex flex-column gap-xxs">

      <div class="choice-btn padding-sm js-choice-btn">
        <!-- fallback -->
        <div class="choice-btn__fallback">
          <input type="radio" name="choice-radio-buttons" id="choice-radio-button-1" checked>
          <label for="choice-radio-button-1">Standard delivery, 4-5 days, $9.00</label>
        </div>

        <!-- custom input -->
        <div class="choice-btn__grid" aria-hidden="true">
          <div class="choice-btn__input choice-btn__input--radio">
            <svg class="icon" viewBox="0 0 16 16">
              <circle fill="currentColor" cx="8" cy="8" r="4" />
            </svg>
          </div>

          <div class="flex flex-wrap gap-xs justify-between">
            <div>
              <p class="color-contrast-higher">Standard delivery</p>
              <p class="color-contrast-medium text-sm">4-5 days</p>
            </div>

            <p class="color-contrast-higher">$9.00</p>
          </div>
        </div>
      </div>

      <div class="choice-btn padding-sm js-choice-btn">
        <!-- fallback -->
        <div class="choice-btn__fallback">
          <input type="radio" name="choice-radio-buttons" id="choice-radio-button-2">
          <label for="choice-radio-button-2">Express delivery, 1-2 days, $19.00</label>
        </div>

        <!-- custom input -->
        <div class="choice-btn__grid" aria-hidden="true">
          <div class="choice-btn__input choice-btn__input--radio">
            <svg class="icon" viewBox="0 0 16 16">
              <circle fill="currentColor" cx="8" cy="8" r="4" />
            </svg>
          </div>

          <div class="flex flex-wrap gap-xs justify-between">
            <div>
              <p class="color-contrast-higher">Express delivery</p>
              <p class="color-contrast-medium text-sm">1-2 days</p>
            </div>

            <p class="color-contrast-higher">$19.00</p>
          </div>
        </div>
      </div>

    </div>
  </fieldset>
</template>

<script setup>
// const props = defineProps({
//     progress: { 
//       type: Number,
//       default: 0
//     }
// })
</script>

<style lang="scss">
:root {
  --choice-btn-border-width: 1px;
  --choice-btn-border-radius: var(--radius-md);
  --choice-btn-align-items: center; // set vertical alignment between custom input and content [center, start, end]
  // custom input
  --choice-btn-input-size: 20px; // custom input size
  --choice-btn-input-icon-size: 16px; // icon size
  --choice-btn-input-border-width: 1px; // custom input border width
  --choice-btn-input-margin-right: var(--space-sm); // gap between custom input and content
  --choice-btn-input-translate-y: 0em; // (optional) translate-y input to align it with the text 
}

.choice-btns {}

.choice-btn__grid {
  display: none;
}

.js {
  .choice-btn__fallback {
    @include srHide; // visible only to screen readers
  }

  .choice-btn {
    position: relative;
    background-color: var(--color-bg-light);
    border-radius: var(--choice-btn-border-radius);
    box-shadow: 0 0 0 var(--choice-btn-border-width) var(--color-contrast-lower);
    user-select: none;
    cursor: pointer;
    transition: .2s;

    &.choice-btn--focus,
    &.choice-btn--checked,
    &:active {
      box-shadow: 0 0 0 2px var(--color-primary);
    }
    
    &.choice-btn--focus,
    &:active {
      box-shadow: 0 0 0 2px var(--color-primary), 0 0 0 4px alpha(var(--color-primary), 0.2);
    }
  }

  .choice-btn__grid {
    display: block; // fallback
    display: grid;
    grid-template-columns: var(--choice-btn-input-size) 1fr;
    grid-gap: var(--choice-btn-input-margin-right);
    align-items: var(--choice-btn-align-items);
  }
}

// custom input
.choice-btn__input {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-bg-light);
  width: var(--choice-btn-input-size);
  height: var(--choice-btn-input-size);
  border-width: var(--choice-btn-input-border-width);
  border-style: solid;
  border-color: alpha(var(--color-contrast-low), 0.65);
  box-shadow: var(--shadow-xs);
  position: relative;
  top: var(--choice-btn-input-translate-y);
  transition: .2s;

  .icon {
    color: var(--color-white); // icon color
    font-size: var(--choice-btn-input-icon-size);
  }

  .choice-btn:hover:not(.choice-btn--checked) & {
    border-color: alpha(var(--color-contrast-low), 1);
  }

  .choice-btn--checked & {
    border-color: var(--color-primary);
    background-color: var(--color-primary);
  }
}

.choice-btn__input--checkbox {
  border-radius: 4px;

  .icon > * {
    transition: stroke-dashoffset .3s;
    stroke-dasharray: 18;
    stroke-dashoffset: 18;
  }

  .choice-btn--checked & .icon > * {
    stroke-dasharray: 18;
    stroke-dashoffset: 0;
  }
}

.choice-btn__input--radio {
  border-radius: 50%;

  .icon {
    transition: transform .3s var(--ease-out-back);
    transform: scale(0);
  }

  .choice-btn--checked & .icon {
    transform: scale(1);
  }
}
</style>
