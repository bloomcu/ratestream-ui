<template>
  <AppModal 
    size="xxs"
    @closed="rateStore.toggleIsPublishNowPromptModal()"
    :class="rateStore.isPublishNowPromptModalOpen ? 'modal--is-visible' : ''"
  >
    <div class="margin-bottom-md">
      <h2 class="text-md margin-bottom-sm">Publish now confirmation</h2>
      <p>By publishing now, you are overwriting your existing data and publishing the updates to your website. Once published, you will no longer be able to restore the previous version</p>
    </div>
    
    <div class="flex gap-md items-center justify-between">
      <button @click="rateStore.toggleIsPublishNowPromptModal()" class="btn btn--accent">Cancel</button>
      
      <button @click="rateStore.publishNow()" class="btn btn--primary">
        <span v-if="rateStore.isImporting" class="flex gap-xs items-center">
          <AppCircleLoader/>
          Publishing
        </span>
        <span v-else>Publish Now</span>
      </button>
    </div>
  </AppModal>
</template>

<script setup>
import { useRateStore } from '@/domain/rates/store/useRateStore'
import AppModal from '@/app/components/base/modals/AppModal.vue'
import AppCircleLoader from '@/app/components/base/loaders/AppCircleLoader.vue'

const rateStore = useRateStore()
</script>
