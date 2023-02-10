import { ref, computed } from 'vue'

const toggled = ref()

export default function useToggle() {
  
  function toggle(item) {
    item == toggled.value ? toggled.value = '' : toggled.value = item
  }

  return {
    toggled: computed(() => toggled.value),
    toggle
  }
}
