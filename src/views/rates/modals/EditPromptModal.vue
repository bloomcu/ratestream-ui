<template>
  <AppModal 
    size="sm"
    @closed="rateStore.toggleEditPromptModal()"
    :class="rateStore.editPromptModalOpen ? 'modal--is-visible' : ''"
  >
    <!-- <h2 class="text-md margin-bottom-sm">Edit prompt</h2> -->
    
    <div class="flex gap-md">
      
    </div>
  </AppModal>
</template>

<script setup>
import { useRateStore } from '@/domain/rates/store/useRateStore'
import AppModal from '@/app/components/base/modals/AppModal.vue'

const rateStore = useRateStore()
</script>
