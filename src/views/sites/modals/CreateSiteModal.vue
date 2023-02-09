<template>
  <AppModal 
    size="xxs"
    @closed="siteStore.toggleCreateModal" 
    :class="siteStore.createModalOpen ? 'modal--is-visible' : ''"
  >
    <h2 class="text-md margin-bottom-sm">Add site</h2>

    <form action="#" @submit.prevent="create()">
      <AppInput v-model="newSite.title" label="Title" placeholder="Primary Website" required />
      <AppInput v-model="newSite.domain" label="Domain" placeholder="acmecu.com" required />

      <div class="margin-top-md margin-bottom-sm">
        <button type="submit" class="btn btn--primary btn--md width-100%">Add</button>
      </div>
    </form>
  </AppModal>
</template>

<script setup>
import { ref } from 'vue'
import { useSiteStore } from '@/domain/sites/store/useSiteStore'
import AppModal from '@/app/components/AppModal.vue'
import AppInput from '@/app/components/forms/AppInput.vue'

const siteStore = useSiteStore()

const newSite = ref({
  title: '',
  url: 'https://',
})

function create() {
  siteStore.store(newSite.value)
    .then(() => {
      siteStore.toggleCreateModal()
      
      newSite.value = {
        title: '',
        url: '',
      }
    })
}
</script>
