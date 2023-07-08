<template>
  <div
    contenteditable 
    spellcheck="false" 
    @blur="handleBlur($event)"
    @keydown.enter="handleKeydownEnter($event)"
    class="app-inline-editor app-inline-editor__hoverable"
  >
    <slot/>
  </div>
</template>

<script setup>
import { useRateStore } from '@/domain/rates/store/useRateStore'

const rateStore = useRateStore()

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
  rateStore.updateCell(props.uid, props.column, event.target.innerText)
  // rateStore.update(props.uid, {[props.column]: event.target.innerText})
  //   .then(() => {
  //     console.log('Rate cell successfully updated')
  //   })
}

function handleBlur(event) {
  updateRate(event)
}

function handleKeydownEnter(event) {
  event.target.blur()
}
</script>
