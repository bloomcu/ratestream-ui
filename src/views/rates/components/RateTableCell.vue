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
const emit = defineEmits(['updated'])

const props = defineProps({
  id: {
    type: Number,
    default: '',
  },
})

function handleBlur(event) {
  emit('updated', props.id, event.target.innerText)
}

function handleKeydownEnter(event) {
  event.target.blur()
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
