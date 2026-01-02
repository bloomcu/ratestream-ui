<template>
  <AppModal
    size="xxs"
    @closed="rateStore.toggleIsSchedulePromptModal()"
    :class="rateStore.isSchedulePromptModalOpen ? 'modal--is-visible' : ''"
  >
    <div class="margin-bottom-md">
      <h2 class="text-md margin-bottom-sm">Schedule publication</h2>
      <p>Choose a date and time in your local timezone. We'll save it in UTC.</p>
    </div>

    <div class="margin-bottom-md">
      <label class="form-label" for="schedule-at">Publish at</label>
      <input
        id="schedule-at"
        type="datetime-local"
        class="form-control width-100%"
        v-model="scheduleAtLocal"
      />
    </div>

    <div class="flex gap-md items-center justify-between">
      <button @click="rateStore.toggleIsSchedulePromptModal()" class="btn btn--accent">Cancel</button>

      <button @click="onSchedule" class="btn btn--primary">
        <span v-if="rateStore.isImporting" class="flex gap-xs items-center">
          <AppCircleLoader/>
          Saving
        </span>
        <span v-else>Schedule</span>
      </button>
    </div>
  </AppModal>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRateStore } from '@/domain/rates/store/useRateStore'
import AppModal from '@/app/components/base/modals/AppModal.vue'
import AppCircleLoader from '@/app/components/base/loaders/AppCircleLoader.vue'

const rateStore = useRateStore()
const scheduleAtLocal = ref('')

const pad2 = (value) => String(value).padStart(2, '0')

const toLocalInputValue = (utcValue) => {
  if (!utcValue) return ''
  const date = new Date(utcValue)
  if (Number.isNaN(date.getTime())) return ''
  const year = date.getFullYear()
  const month = pad2(date.getMonth() + 1)
  const day = pad2(date.getDate())
  const hours = pad2(date.getHours())
  const minutes = pad2(date.getMinutes())
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

watch(
  () => rateStore.isSchedulePromptModalOpen,
  (isOpen) => {
    if (isOpen) {
      scheduleAtLocal.value = toLocalInputValue(rateStore.getActiveGroup.published_at)
    }
  }
)

const onSchedule = () => {
  rateStore.schedulePublication(scheduleAtLocal.value)
}
</script>
