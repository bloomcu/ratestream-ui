<template>
  <div class="search-input search-input--icon-right">
    <input class="search-input__input form-control" type="search" name="search-input" id="search-input" placeholder="Search..." aria-label="Search">
    <button class="search-input__btn">
      <svg class="icon" viewBox="0 0 20 20"><title>Submit</title><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="8" cy="8" r="6"/><line x1="12.242" y1="12.242" x2="18" y2="18"/></g></svg>
    </button>
  </div>
</template>

<script setup></script>

<style lang="scss">
:root {
  --search-input-btn-width: 3em;
  --search-input-icon-size: 1em;
  --search-input-shortcut-margin: 0.325em; /* gap between the shortcut badge and the input edges */
}

.search-input {
  position: relative;
}

.search-input__input {
  width: 100%;
  height: 100%;
  border-radius: 50em !important;
  padding-left: var(--space-sm) !important;
  border: none !important;
  
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    -webkit-appearance:none;
  }

  &::-ms-clear,
  &::-ms-reveal {
    display: none;
    width: 0;
    height: 0; 
  }

  .search-input--icon-right & {
    padding-right: var(--search-input-btn-width);
  }

  .search-input--icon-left & {
    padding-left: var(--search-input-btn-width);
  }
}

.search-input__btn {
  @include reset;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: var(--search-input-btn-width);

  &:active .icon {
    transform: translateY(2px);
  }

  .icon {
    display: block;
    --size: var(--search-input-icon-size);
    margin-left: auto;
    margin-right: auto;
    color: var(--color-contrast-low); /* icon color */
    transition: .2s;
  }

  .search-input--icon-left & {
    left: 0;
    right: auto;
    pointer-events: none;
  }
}

.search-input__btn:focus .icon,
.search-input .search-input__input:focus + .search-input__btn .icon {
  color: var(--color-primary); /* active icon color */
}

/* --shortcut */
.search-input__shortcut {
  position: absolute;
  right: var(--search-input-shortcut-margin);
  top: var(--search-input-shortcut-margin);
  height: calc(100% - var(--search-input-shortcut-margin)*2);
  display: flex;
  align-items: center;

  background-color: var(--color-bg);
  border: 1px solid var(--color-contrast-lower);
  border-radius: var(--radius-sm);

  --space-unit: 1em;
  padding: 0 var(--space-xxxs);

  line-height: 1;
  color: var(--color-contrast-medium);
}

.search-input:focus-within .search-input__shortcut {
  display: none;
}
</style>
