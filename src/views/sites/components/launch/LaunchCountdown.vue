<template>
  <div>
    <div v-if="expired">
      <h3 class="font-normal color-primary">Site has launched</h3>
    </div>
    <div v-if="loaded & !expired" class="flex gap-xxxs items-center">
      <div class="text-center">
        <h2 class="font-normal color-primary">{{ displayDays }}</h2>
        <p class="text-sm">days</p>
      </div>
      <h4 style="margin-top: -22px;">:</h4>
      <div class="text-center">
        <h2 class="font-normal color-primary">{{ displayHours }}</h2>
        <p class="text-sm">hours</p>
      </div>
      <h4 style="margin-top: -22px;">:</h4>
      <div class="text-center">
        <h2 class="font-normal color-primary">{{ displayMinutes }}</h2>
        <p class="text-sm">minutes</p>
      </div>
      <h4 style="margin-top: -22px;">:</h4>
      <div class="text-center">
        <h2 class="font-normal color-primary">{{ displaySeconds }}</h2>
        <p class="text-sm">seconds</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  date: { type: String }
})

const loaded = ref(false)
const expired = ref(false)

const displayDays = ref(0)
const displayHours = ref(0)
const displayMinutes = ref(0)
const displaySeconds = ref(0)

const _seconds = computed(() => 1000 )
const _minutes = computed(() => _seconds.value * 60 )
const _hours = computed(() => _minutes.value * 60 )
const _days = computed(() => _hours.value * 24 )

const end = computed(() => {
  return new Date(props.date)
})
  
function showRemaining() {
  const timer = setInterval(() => {
    const now = new Date()
    const distance = end.value.getTime() - now.getTime()
    
    if (distance < 0) {
      clearInterval(timer)
      expired.value = true
      return
    }
    
    const days = Math.floor((distance / _days.value))
    const hours = Math.floor((distance % _days.value) / _hours.value)
    const minutes = Math.floor((distance % _hours.value) / _minutes.value)
    const seconds = Math.floor((distance % _minutes.value) / _seconds.value)
    
    displayDays.value = days
    displayHours.value = hours
    displayMinutes.value = minutes
    displaySeconds.value = seconds
    
    loaded.value = true
  }, 1000)
}

onMounted(() => {
  showRemaining()
})
</script>

<style lang="scss">
</style>
