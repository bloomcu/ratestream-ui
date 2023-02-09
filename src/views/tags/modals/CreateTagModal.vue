<template>
  <AppModal 
    size="xxs"
    @closed="tagStore.toggleCreateModal()" 
    :class="tagStore.createModalOpen ? 'modal--is-visible' : ''"
  >
    <form action="#" @submit.prevent="create()">
      <AppInput v-model="tag.title" label="Title" placeholder="Tag group title" required />

      <div class="margin-top-md margin-bottom-sm">
        <button class="btn btn--primary btn--md width-100%">Create Tag Group</button>
      </div>
    </form>
  </AppModal>
</template>

<script setup>
import { ref } from 'vue'
import { useTagStore } from '@/domain/tags/store/useTagStore'
import AppModal from '@/app/components/AppModal.vue'
import AppInput from '@/app/components/forms/AppInput.vue'

const tagStore = useTagStore()

const tag = ref({
  title: '',
})

function create() {
  tagStore.store(tag.value)
    .then(() => {
      tagStore.toggleCreateModal()
      tag.title = ''
    }).catch(error => {
      console.log('Error', error.response.data)
    })
}
</script>
