<template>
  <AppModal 
    size="xxs"
    @closed="rateStore.toggleIsPublishPromptModal()"
    :class="rateStore.isPublishPromptModalOpen ? 'modal--is-visible' : ''"
  >
    <div class="margin-bottom-md">
      <h2 class="text-md margin-bottom-sm">Publish confirmation</h2>
      <p>By publishing these updates, you are overwriting your existing data and publishing the updates to your website.</p>
    </div>
    
    <div class="flex gap-md items-center justify-between">
      <button @click="rateStore.toggleIsPublishPromptModal()" class="btn btn--accent">Cancel</button>
      
      <button @click="rateStore.import(csvStore.columns, csvStore.rows)" class="btn btn--primary">
        <span v-if="rateStore.isImporting" class="flex gap-xs items-center">
          <AppCircleLoader/>
          Publishing
        </span>
        <span v-else>Publish</span>
      </button>
    </div>
  </AppModal>
</template>

<script setup>
import { useRateStore } from '@/domain/rates/store/useRateStore'
import { useCSVStore } from '@/domain/csv/store/useCSVStore'
import AppModal from '@/app/components/base/modals/AppModal.vue'
import AppCircleLoader from '@/app/components/base/loaders/AppCircleLoader.vue'

const rateStore = useRateStore()
const csvStore = useCSVStore()
</script>
