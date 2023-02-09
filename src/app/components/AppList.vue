<template>
  <ul class="list list--icons">
    <li v-for="item in list" :key="item.content">
      <div class="flex items-start">
        <svg class="list__icon icon color-success" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" opacity="0.2"/><path d="M9.5,17a1,1,0,0,1-.707-.293l-3-3a1,1,0,0,1,1.414-1.414L9.5,14.586l7.293-7.293a1,1,0,1,1,1.414,1.414l-8,8A1,1,0,0,1,9.5,17Z"/></svg>
        <div>{{ item.content }}</div>
      </div>
    </li>
  </ul>  
</template>

<script setup>
const props = defineProps({
  list: { 
    type: Array,
    required: true
  },
})
</script>

<style lang="scss">
:root {
  --list-space-y: 0.375em; // vertical gaps
  --list-offset: 1em;  // sublist horizontal offset
  --list-line-height-multiplier: 1; // line-height multiplier
}

.list, .text-component .list {
  padding-left: 0;
  list-style: none;

  ul, ol {
    list-style: none;
    margin: 0; // reset
    margin-top: calc((var(--list-space-y) / 2) * var(--text-space-y-multiplier, 1));
    padding-top: calc((var(--list-space-y) / 2) * var(--text-space-y-multiplier, 1));
    padding-left: var(--list-offset);
  }

  li {
    padding-bottom: calc((var(--list-space-y) / 2) * var(--text-space-y-multiplier, 1));
    margin-bottom: calc((var(--list-space-y) / 2) * var(--text-space-y-multiplier, 1));
    line-height: calc(var(--body-line-height) * var(--list-line-height-multiplier));
  }

  > li:last-child, ul > li:last-child, ol > li:last-child {
    margin-bottom: 0;
  }

  &:not(.list--border) > li:last-child, ul > li:last-child, ol > li:last-child {
    padding-bottom: 0;
  }
}

/* #region (ul + ol) */
.list--ul, .text-component .list--ul, 
.list--ol, .text-component .list--ol {
  --list-offset: calc(var(--list-bullet-size) + var(--list-bullet-margin-right));

  ul, ol {
    padding-left: 0;
  }

  li {
    @supports (--css: variables) {
      padding-left: var(--list-offset) !important;
    }
  }

  li::before {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    position: relative;
    top: -0.1em;
    
    @supports (--css: variables) {
      width: var(--list-bullet-size) !important; 
      height: var(--list-bullet-size) !important;
      margin-left: calc(var(--list-bullet-size) * -1) !important;
      left: calc(var(--list-bullet-margin-right) * -1) !important;
    }
  }
}

// unordered list
.list--ul, .text-component .list--ul { 
  --list-bullet-size: 7px; // dot width and height
  --list-bullet-margin-right: 12px; // gap between bullet and content

  > li {
    padding-left: 19px; // IE fallback
  }

  > li::before { // bullet
    content: '';
    border-radius: 50%;
    color: var(--color-contrast-lower); // bullet color
    background-color: currentColor;

    // IE fallback
    width: 7px;
    height: 7px;
    margin-left: -7px;
    left: -12px;
    // end - IE fallback
  }

  ul li::before {
    background-color: transparent;
    box-shadow: inset 0 0 0 2px currentColor;
  }
}

// ordered list
.list--ol, .text-component .list--ol { 
  --list-bullet-size: 26px; // ⚠️ use px or rem units - circle width and height
  --list-bullet-margin-right: 6px; // ⚠️ use px or rem units - gap between circle and content
  --list-bullet-font-size: 14px; // ⚠️ use px or rem units - bullet font size
  counter-reset: list-items;

  > li {
    counter-increment: list-items;
    padding-left: 32px; // IE fallback
  }

  ol {
    counter-reset: list-items;
  }

  > li::before {
    content: counter(list-items);
    font-size: var(--list-bullet-font-size, 14px);
    background-color: var(--color-contrast-lower);
    color: var(--color-contrast-high);
    line-height: 1;
    border-radius: 50%;

    // IE fallback
    width: 26px;
    height: 26px;
    margin-left: -26px;
    left: -6px;
    // end - IE fallback
  }

  ol > li::before {
    background-color: transparent;
    box-shadow: inset 0 0 0 2px var(--color-contrast-lower);
  }
}
/* #endregion */

/* #region (icons) */
.list--icons, .text-component .list--icons { // use icons as bullet points
  --list-bullet-size: 24px;
  --list-bullet-margin-right: 8px; // gap between icon and text
  --list-offset: calc(var(--list-bullet-size) + var(--list-bullet-margin-right));

  ul, ol {
    padding-left: 32px; // IE fallback

    @supports (--css: variables) {
      padding-left: var(--list-offset);
    }
  }
}

.list__icon {
  position: relative;

  // IE fallback
  width: 24px;
  height: 24px;
  margin-right: 8px;

  &:not(.top-0) {
    top: calc((1em * var(--body-line-height) - 24px) / 2);
  }
  // end - IE fallback

  @supports (--css: variables) {
    width: var(--list-bullet-size);
    height: var(--list-bullet-size);
    margin-right: var(--list-bullet-margin-right);

    &:not(.top-0) {
      top: calc((1em * var(--body-line-height) * var(--list-line-height-multiplier) - var(--list-bullet-size)) / 2);
    }
  }
}
/* #endregion */
</style>
