<template>
  <AppModal 
    size="xxs"
    @closed="designStore.toggleCreateModal()" 
    :class="designStore.createModalOpen ? 'modal--is-visible' : ''"
  >
    <h2 class="text-md margin-bottom-sm">Create design</h2>
    
    <form action="#" @submit.prevent="create()">
      <AppInput v-model="design.designer_name" label="Designer name" placeholder="First and last" required />
      <AppInput v-model="design.designer_email" label="Designer email" placeholder="designer@email.com" required />

      <div class="margin-top-md margin-bottom-sm">
        <button class="btn btn--primary btn--md width-100%">Create</button>
      </div>
    </form>
  </AppModal>
</template>

<script setup>
import { ref } from 'vue'
import { useDesignStore } from '@/domain/designs/store/useDesignStore'
import AppModal from '@/app/components/base/modals/AppModal.vue'
import AppInput from '@/app/components/base/forms/AppInput.vue'

const designStore = useDesignStore()

const design = ref({
  title: 'Design',
  designer_name: '',
  designer_email: '',
})

function create() {
  designStore.store(design.value)
    .then(() => {
      designStore.toggleCreateModal()
      
      design.value = {
        title: 'Design',
        designer_name: '',
        designer_email: '',
      }
    })
}
</script>
