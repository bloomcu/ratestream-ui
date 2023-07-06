<template>
  <div
    :contenteditable="canEdit"
    spellcheck="false" 
    @blur="handleBlur($event)"
    @keydown.enter="handleKeydownEnter($event)"
    :class="{'app-inline-editor__hoverable app-inline-editor__highlighted': canEdit}"
    class="app-inline-editor"
  >
    <slot/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRateStore } from '@/domain/rates/store/useRateStore'

const rateStore = useRateStore()

const props = defineProps({
  uid: {
    type: String,
    required: true,
  },
  editable: {
    type: Boolean,
    default: false,
  }
})

let canEdit = ref(props.editable)

function updateUid(event) {
  rateStore.updateUid(props.uid, event.target.innerText)
    .then(() => {
      canEdit.value = false
    })
}

function handleBlur(event) {
  updateUid(event)
}

function handleKeydownEnter(event) {
  event.target.blur()
}
</script>
