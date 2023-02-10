<template>
  <div class="steps text-sm@md" aria-label="Multi-step indicator">
    <ol class="steps__list">
      <li 
        class="step cursor-pointer"
        :class="step.id <= completed ? 'step--completed' : ''"
        v-for="step in steps"
        :key="step.id"
      >
        <p class="step__label">{{ step.title }}</p>

        <span v-if="step.id < steps.length" class="step__separator" aria-hidden="true">
          <svg class="icon" viewBox="0 0 16 16"><polyline fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" points="6.5,3.5 11,8 6.5,12.5 "></polyline></svg>
        </span>

        <div class="step__circle" aria-hidden="true">
          <svg v-if="step.id === current" class="icon" viewBox="0 0 16 16">
            <g class="rotate-icon" fill="currentColor"><path d="M8 16a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8zM8 2a6 6 0 1 0 6 6 6.006 6.006 0 0 0-6-6z" opacity=".4"></path><path d="M8 0v2a6.006 6.006 0 0 1 6 6h2a8.009 8.009 0 0 0-8-8z" data-color="color-2"></path></g>
          </svg>
          <svg v-else-if="step.id <= completed" class="icon" viewBox="0 0 16 16"><polyline fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="1,9 5,13 15,3 "></polyline></svg>
          <span v-else>{{ step.id }}</span>
        </div>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const completed = ref(2)
const current = completed.value + 1

const steps = [
  { 
    id: 1, 
    title: 'Content Freeze',
  },
  { 
    id: 2, 
    title: 'Pre-Launch',
  },
  { 
    id: 3, 
    title: 'Launch',
  },
  { 
    id: 4, 
    title: 'Propagation',
  },
  { 
    id: 5, 
    title: 'Post-Launch',
  },
]
</script>

<style lang="scss">
:root {
  --steps-number: 5;
  --step-separator-line-stroke: 3px;
  --step-separator-line-gap: 3px;
  --step-circle-size: 32px;
  --step-circle-font-size: 16px;
}

.steps {
  background-color: var(--color-bg-dark);
  padding: var(--space-md);
  border-radius: var(--radius-md);
}

.steps__list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: calc(var(--space-xs) * -1);
}

.step {
  display: inline-block; // flex fallback
  display: inline-flex;
  align-items: center;
  margin-bottom: var(--space-xs); // equal to steps__list margin-bottom 👆
}

.step__label {
  color: inherit;
  text-decoration: none;
}

.step--completed .step__label, .step--current .step__label {
  color: var(--color-primary);
}

.step__separator { // on small devices -> icon separator
  margin: 0 var(--space-xs);

  // flex fallback
  display: inline-block;
  vertical-align: middle;

  .icon {
    display: block;
  }
}

.step__circle {
  display: none;
}

@include breakpoint(md) {
  .steps {
    background-color: transparent;
    padding: calc(var(--step-circle-size)/2) 0 0;
    border-radius: 0px;
    margin-left: -20px;
  }

  .steps__list {
    margin-bottom: initial;
    align-items: flex-start;

    @supports (grid-area: auto) {
      display: grid;
      align-items: start;
      grid-template-columns: repeat(var(--steps-number), 1fr);
    }
  }

  .step {
    float: left; // flex fallback
    width: calc(100% / var(--steps-number));
    justify-content: center;
    text-align: center;
    position: relative;
    margin-bottom: initial;
    padding: 0 var(--space-xs);

    @supports (grid-area: auto) {
      width: auto;
    }
  }

  .step__label {
    display: inline-block; // flex fallback
    margin-top: calc(var(--space-xxs) + var(--step-circle-size)/2);
  }

  .step__separator {
    // on bigger devices -> line connecting two adjacent steps
    position: absolute;
    top: calc(var(--step-separator-line-stroke) * -1/2);
    left: calc(50% + var(--step-circle-size)/2 + var(--step-separator-line-gap));
    height: var(--step-separator-line-stroke);
    width: calc(100% - var(--step-circle-size) - var(--step-separator-line-gap)*2);
    margin: 0;
    background-color: var(--color-contrast-lower);
    // hide text - if there's any
    color: transparent;
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;

    .step--completed & {
      background-color: var(--color-primary);
    }
  }
  
  .step__circle {
    // flex fallback
    display: inline-block;
    line-height: var(--step-circle-size);

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-contrast-lower);
    width: var(--step-circle-size);
    height: var(--step-circle-size);
    border-radius: 50%;
    position: absolute;
    left: calc(50% - var(--step-circle-size)/2);
    top: calc(var(--step-circle-size) * -1/2);
    font-size: var(--step-circle-font-size);

    .icon {
      width: var(--step-circle-font-size);
      height: var(--step-circle-font-size);
      
      .rotate-icon {
        --animation-duration: 0.65s;
        transform-origin: 8px 8px;
        animation:rotate-icon var(--animation-duration) infinite cubic-bezier(.645,.045,.355,1)
      }
    }

    .step--completed &, .step--current & {
      background-color: var(--color-primary);
      color: var(--color-white);
      @include fontSmooth;
    }
  }
}

@keyframes rotate-icon {
  0% { transform:rotate(0) }
  100% { transform:rotate(360deg) }
}
</style>
