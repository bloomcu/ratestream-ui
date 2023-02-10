<template>
  <div class="date-input js-date-input">
    <label for="date-input-1" class="form-label margin-bottom-xxs">Select date<i class="sr-only">, format is dd/mm/yyyy</i>:</label>
    
    <div class="date-input__wrapper">
      <input type="text" class="form-control width-100% date-input__text js-date-input__text" placeholder="dd/mm/yyyy" autocomplete="off" id="date-input-1">
      
      <button class="reset date-input__trigger js-date-input__trigger js-tab-focus" aria-label="Select date using calendar widget" type="button">
        <svg class="icon" aria-hidden="true" viewBox="0 0 20 20"><g fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"><rect x="1" y="4" width="18" height="14" rx="1"/><line x1="5" y1="1" x2="5" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="1" y1="9" x2="19" y2="9"/></g></svg>
      </button>
    </div>
    
    <div class="date-picker js-date-picker date-picker--is-visible" role="dialog" aria-labelledby="calendar-label-1">
      <header class="date-picker__header">
        <div class="date-picker__month">
          <span class="date-picker__month-label js-date-picker__month-label" id="calendar-label-1"></span> <!-- this will contain month label + year -->

          <nav>
            <ul class="date-picker__month-nav js-date-picker__month-nav">
              <li>
                <button class="reset date-picker__month-nav-btn js-date-picker__month-nav-btn js-date-picker__month-nav-btn--prev js-tab-focus" type="button">
                  <svg class="icon icon--xs" viewBox="0 0 16 16"><title>Previous month</title><polyline points="10 2 4 8 10 14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
                </button>
              </li>

              <li>
                <button class="reset date-picker__month-nav-btn js-date-picker__month-nav-btn js-date-picker__month-nav-btn--next js-tab-focus" type="button">
                  <svg class="icon icon--xs" viewBox="0 0 16 16"><title>Next month</title><polyline points="6 2 12 8 6 14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <ol class="date-picker__week">
          <li><div class="date-picker__day">M<span class="sr-only">onday</span></div></li>
          <li><div class="date-picker__day">T<span class="sr-only">uesday</span></div></li>
          <li><div class="date-picker__day">W<span class="sr-only">ednesday</span></div></li>
          <li><div class="date-picker__day">T<span class="sr-only">hursday</span></div></li>
          <li><div class="date-picker__day">F<span class="sr-only">riday</span></div></li>
          <li><div class="date-picker__day">S<span class="sr-only">aturday</span></div></li>
          <li><div class="date-picker__day">S<span class="sr-only">unday</span></div></li>
        </ol>
      </header>

      <ol class="date-picker__dates js-date-picker__dates" aria-labelledby="calendar-label-1">
        <!-- days will be created using js -->
      </ol>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
:root {
  --date-picker-trigger-width: 2.5em; /* calendar button width */
  --date-picker-icon-size: 1em; /* calendar icon size */
  
  /* calendar */
  --date-picker-calendar-gap: 4px; /* distance between input and calendar */
  --date-picker-calendar-padding: var(--space-xxs); /* calendar padding */
  --date-picker-calendar-item-size: 2em; /* calendar date size */
  --date-picker-calendar-item-radius: var(--radius-md); /* calendar date border radius */
}

@include breakpoint(sm) {
  :root {
    --date-picker-calendar-item-size: 2.5em;
  }
}

.date-input, .date-input__wrapper {
  position: relative;
}

/* calendar button */
.date-input__trigger { 
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  height: 100%;
  width: var(--date-picker-trigger-width);
  display: none; /* hide button if JS is not enabled */
  transition: .2s;

  .icon {
    display: block;
    width: var(--date-picker-icon-size);
    height: var(--date-picker-icon-size);
    margin: auto;
  }

  &:hover {
    color: var(--color-primary);
  }

  &:active {
    transform: translateY(2px);
  }
}

.date-input__trigger {
  display: flex;
}

.date-input__text {
  padding-right: calc(var(--date-picker-trigger-width) + var(--space-xxxs));
}

.date-input--hide-calendar .date-input__trigger { /* hide calendar trigger when flexbox is not supported */
  display: none;
}

.date-picker {
  display: inline-block;
  position: absolute;
  left: 0;
  top: calc(var(--date-picker-calendar-gap) + 100%);
  background-color: var(--color-bg-light);
  border-radius: var(--radius-md);
  box-shadow: var(--inner-glow), var(--shadow-md);
  padding: var(--date-picker-calendar-padding);
  z-index: var(--z-index-popover, 5); 
  user-select: none;
  overflow: hidden;

  /* use rem units */
  @include spaceUnit(1rem);
  @include textUnit(1rem);

  visibility: hidden;
  opacity: 0;
  transition: visibility 0s .2s, opacity .2s;
}

.date-picker--is-visible {
  visibility: visible;
  opacity: 1;
  transition: opacity .2s;
}

.date-picker__header {}

/* month navigation */
.date-picker__month { /* wrapper */
  position: relative;
}

.date-picker__month-label { /* month name */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: var(--color-contrast-higher);
}

.date-picker__month-nav,
.date-picker__week,
.date-picker__dates {
  display: flex;
  flex-wrap: wrap;

  li {
    width: var(--date-picker-calendar-item-size);
    height: var(--date-picker-calendar-item-size);
  }
}

.date-picker__month-nav {
  position: relative;
  z-index: 1;
  justify-content: space-between;
}

.date-picker__month-nav-btn {
  width: 100%;
  height: 100%;
  border-radius: var(--date-picker-calendar-item-radius);
  color: var(--color-contrast-low); /* icon color */
  transition: transform .2s;

  .icon {
    display: block;
    margin: auto;
  }

  &:hover {
    background-color: alpha(var(--color-contrast-higher), 0.075);
    color: var(--color-contrast-higher);
  }

  &:active {
    transform: translateY(2px);
  }
}

/* list of week days */
.date-picker__week {}

/* day of the week */
.date-picker__day {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--text-sm);
  color: var(--color-contrast-low);
}

/* list of dates */
.date-picker__dates {
  width: calc(var(--date-picker-calendar-item-size)*7);
}

/* date button */
.date-picker__date {
  @include reset;
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: var(--text-sm);

  &:focus {
    outline: none;
    background-color: var(--color-bg-light);
    box-shadow: inset 0 0 0 2px alpha(var(--color-primary), 0.2);
    color: var(--color-contrast-higher);
  }

  &:focus, &:hover, &.date-picker__date--selected {
    border-radius: var(--date-picker-calendar-item-radius);
  }

  &.date-picker__date--range {
    background-color: alpha(var(--color-primary), 0.2);
    color: var(--color-contrast-higher);

    &:focus, &:hover {
      border-radius: 0;
    }

    &:focus {
      background-color: var(--color-bg-light);
    }
  }

  &.date-picker__date--selected,
  &.date-picker__date--range-start,
  &.date-picker__date--range-end {
    background-color: var(--color-primary);
    box-shadow: 0 2px 4px alpha(var(--color-primary), 0.3);
    color: var(--color-white);
    z-index: 2;

    &:focus:not(:hover) {
      box-shadow: 0 0 0 2px alpha(var(--color-primary), 0.2), 0 2px 4px alpha(var(--color-primary), 0.3);
    }
  }

  &.date-picker__date--range-start {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  &.date-picker__date--range-end {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }

  &:hover {
    background-color: var(--color-bg-light);
    box-shadow: inset 0 0 0 2px var(--color-primary);
    color: var(--color-contrast-high);
  }
}

.date-picker__date--today {
  color: var(--color-primary);
}

.date-picker__date::-moz-focus-inner { /* remove Firefox dotted-outline focus effect */
  border: none;
}
</style>
