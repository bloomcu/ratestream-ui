<template>
  <AppModal 
    size="xxs"
    @closed="organizationStore.toggleCreateModal()" 
    :class="organizationStore.createModalOpen ? 'modal--is-visible' : ''"
  >
    <h2 class="text-md margin-bottom-sm">Create organization</h2>
    
    <form action="#" @submit.prevent="create()">
      <AppInput v-model="organization.title" label="Title" placeholder="Acme Credit Union" required />

      <div class="margin-top-md margin-bottom-sm">
        <button class="btn btn--primary btn--md width-100%">Create</button>
      </div>
    </form>
  </AppModal>
</template>

<script setup>
import { ref } from 'vue'
import { useOrganizationStore } from '@/domain/organizations/store/useOrganizationStore'
import AppModal from '@/app/components/AppModal.vue'
import AppInput from '@/app/components/forms/AppInput.vue'

const organizationStore = useOrganizationStore()

const organization = ref({
  title: '',
})

function create() {
  organizationStore.store(organization.value)
    .then(() => {
      organizationStore.toggleCreateModal()
      
      organization.value = {
        title: '',
      }
    })
}
</script>
