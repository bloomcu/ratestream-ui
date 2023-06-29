<template>
  <div
    contenteditable 
    spellcheck="false" 
    @blur="handleBlur($event)"
    @keydown.enter="handleKeydownEnter($event)"
    class="app-inline-editor"
  >
    <slot/>
  </div>
</template>

<script setup>
import { useRateStore } from '@/domain/rates/store/useRateStore'

const rateStore = useRateStore()
// const emit = defineEmits(['updated'])

const props = defineProps({
  uid: {
    type: String,
    required: true,
  },
  column: {
    type: String,
    required: true,
  },
})

function updateRate(event) {
  rateStore.update(props.uid, {[props.column]: event.target.innerText})
    .then(() => {
      console.log('Rate updated in RateTableCell.vue')
    })
}

function handleBlur(event) {
  // emit('updated', props.column, event.target.innerText)
  updateRate(event)
}

function handleKeydownEnter(event) {
  event.target.blur()
  // handleBlur(event)
  // updateRate()
}
</script>

<style lang="scss">
.app-inline-editor {
  text-align: left;
  // border-radius: 5px;
  padding: 10px;
  transition: 0.3s;
  cursor: text;

  &:hover,
  &:focus {
    background-color: #eee;
  }
}
</style>
