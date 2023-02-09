<script setup>
import { ref, reactive } from 'vue'

const survey = ref({
  id: 1,
  title: 'TFCU Style Tile Survey',
  type: 'Rank and reduce',
})

const question = ref({
  id: 1,
  survey_id: 1,
  type: 'Rank & Reduce',
  title: 'Which moodboard looks more appealing to you?',
  instructions: 'Click an option to select',
})

const options = ref([
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
])

const optionsShuffled = options.value.sort(function() {
  return Math.random() - .5;
});

const optionPairs = options.value.reduce(function(result, value, index, array) {
  if (index % 2 === 0)
    result.push(array.slice(index, index + 2));
  return result;
}, []);

console.log(optionPairs)

const participant = ref({
  survey_id: 1,
  ip_address: '192.0.0.98',
  name: 'Ryan Harmon',
})

const answers = ref([])

const handleVote = (option) => {
  answers.value.push({
    question_id: 1,
    option_id: option.id,
    value: 'vote'
  })
}
</script>

<template>
  <div>
    <div class="container max-width-lg text-center padding-y-sm">
      <h3>Question: {{ question.title }}</h3>
      <p>Instructions: {{ question.instructions }}</p>
      {{ answers }}
    </div>
    
    <div class="container">
      <!-- <div class="grid-auto-md gap-sm"> -->
      <div class="grid gap-sm">
        
        <div v-for="option in options" :key="option.id" class="col-6">
          <div @click="handleVote(option)" class="app-card card--is-link">
            {{ option.id }}
            <div href="card__link">
              <figure class="card__img">
                <img class="block width-100%" src="https://codyhouse.co/app/assets/img/auto-sized-grid-img-1.svg" alt="placeholder">
              </figure>
              
              <!-- <div class="card__content">
                <div class="text-component">
                  <h4>Title of the Card</h4>
                  <p class="text-sm color-contrast-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, suscipit.</p>
                </div>
              </div> -->
            </div>
          </div>
        </div>
        
      </div>
      <!-- <ul class="grid-auto-md gap-sm">
        <li><img class="block width-100%" src="https://codyhouse.co/app/assets/img/auto-sized-grid-img-1.svg" alt="placeholder"></li>
        <li><img class="block width-100%" src="https://codyhouse.co/app/assets/img/auto-sized-grid-img-1.svg" alt="placeholder"></li>
        <li><img class="block width-100%" src="https://codyhouse.co/app/assets/img/auto-sized-grid-img-1.svg" alt="placeholder"></li>
        <li><img class="block width-100%" src="https://codyhouse.co/app/assets/img/auto-sized-grid-img-1.svg" alt="placeholder"></li>
        <li><img class="block width-100%" src="https://codyhouse.co/app/assets/img/auto-sized-grid-img-1.svg" alt="placeholder"></li>
        <li><img class="block width-100%" src="https://codyhouse.co/app/assets/img/auto-sized-grid-img-1.svg" alt="placeholder"></li>
        <li><img class="block width-100%" src="https://codyhouse.co/app/assets/img/auto-sized-grid-img-1.svg" alt="placeholder"></li>
        <li><img class="block width-100%" src="https://codyhouse.co/app/assets/img/auto-sized-grid-img-1.svg" alt="placeholder"></li>
        <li><img class="block width-100%" src="https://codyhouse.co/app/assets/img/auto-sized-grid-img-1.svg" alt="placeholder"></li>
        <li><img class="block width-100%" src="https://codyhouse.co/app/assets/img/auto-sized-grid-img-1.svg" alt="placeholder"></li>
      </ul> -->
    </div>
  </div>
</template>

<style lang="scss">
/* -------------------------------- 
Auto Grid
-------------------------------- */
.grid-auto-xs, .grid-auto-sm, .grid-auto-md, .grid-auto-lg, .grid-auto-xl {
  display: grid;
  gap: var(--gap-y, 0px) var(--gap-x, 0px);
  grid-template-columns: repeat(auto-fit, minmax(var(--col-min-width), 1fr)); // auto add new cols
}

.grid-auto-xs { --col-min-width: 8rem; }
.grid-auto-sm { --col-min-width: 10rem; }
.grid-auto-md { --col-min-width: 15rem; }
.grid-auto-lg { --col-min-width: 20rem; }
.grid-auto-xl { --col-min-width: 25rem; }

// @each $breakpoint, $value in $breakpoints { 
//   @include breakpoint(#{$breakpoint}) {
//     .grid-auto-xs\@#{$breakpoint} { --col-min-width: 8rem; }
//     .grid-auto-sm\@#{$breakpoint} { --col-min-width: 10rem; }
//     .grid-auto-md\@#{$breakpoint} { --col-min-width: 15rem; }
//     .grid-auto-lg\@#{$breakpoint} { --col-min-width: 20rem; }
//     .grid-auto-xl\@#{$breakpoint} { --col-min-width: 25rem; }
//   }
// }

/* -------------------------------- 
Card
-------------------------------- */
.card {
  background-color: var(--color-bg-light);
  box-shadow: var(--inner-glow), var(--shadow-sm);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
}

.card__img {
  img {
    display: block;
    width: 100%;
  }
}

.card__content {
  padding: var(--space-xs);
}

// --link
.card--is-link {
  will-change: box-shadow;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: var(--inner-glow), var(--shadow-md);

    .card__img::after {
      opacity: 1;
    }
  }

  .card__img {
    position: relative;

    &::after { // overlay layer
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: alpha(var(--color-black), 0.2);
      opacity: 0;
      transition: opacity 0.2s;
    }
  }
}

.card__link {
  text-decoration: none;
  display: block;
  color: inherit;
}

.card__link-icon {
  position: absolute;
  z-index: 1;
  width: 64px;
  height: 64px;
  top: calc(50% - 32px);
  left: calc(50% - 32px);
  background-color: alpha(var(--color-white), 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  transition: opacity 0.2s;

  .icon {
    display: block;
    width: 32px;
    height: 32px;
    color: var(--color-black); // icon color
  }
}

.card--is-link:hover .card__link-icon {
  opacity: 1;
}
</style>
