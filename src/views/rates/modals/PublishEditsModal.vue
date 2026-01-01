<template>
  <AppModal 
    size="xxs"
    @closed="rateStore.toggleIsPublishPromptModal()"
    :class="rateStore.isPublishPromptModalOpen ? 'modal--is-visible' : ''"
  >
    <div class="margin-bottom-md">
      <h2 class="text-md margin-bottom-sm">{{ isRevision ? 'Save confirmation' : 'Publish confirmation' }}</h2>
      <p v-if="isRevision">Saving this revision will not change the rates currently published on your website.</p>
      <p v-else>By publishing these updates, you are overwriting your existing data and publishing the updates to your website.</p>
    </div>
    
    <div class="flex gap-md items-center justify-between">
      <button @click="rateStore.toggleIsPublishPromptModal()" class="btn btn--accent">Cancel</button>
      
      <button @click="rateStore.batch()" class="btn btn--primary">
        <span v-if="rateStore.isImporting" class="flex gap-xs items-center">
          <AppCircleLoader/>
          Publishing
        </span>
        <span v-else>{{ isRevision ? 'Save' : 'Publish' }}</span>
      </button>
    </div>
  </AppModal>
</template>

<script setup>
import { computed } from 'vue'
import { useRateStore } from '@/domain/rates/store/useRateStore'
import AppModal from '@/app/components/base/modals/AppModal.vue'
import AppCircleLoader from '@/app/components/base/loaders/AppCircleLoader.vue'

const rateStore = useRateStore()
const isRevision = computed(() => rateStore.getActiveGroup.revision_of != null)
</script>
