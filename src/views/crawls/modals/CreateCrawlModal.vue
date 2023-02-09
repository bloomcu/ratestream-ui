<template>
  <AppModal 
    size="xxs"
    @closed="crawlStore.toggleCreateModal()" 
    :class="crawlStore.createModalOpen ? 'modal--is-visible' : ''"
  >
    <h2 class="text-md margin-bottom-sm">Crawl a website</h2>
    
    <form action="#" @submit.prevent="create()">
      <div v-if="errorStore.errors.url" class="bg-error bg-opacity-20% padding-xs radius-md text-sm color-contrast-higher margin-bottom-xs" role="alert">
        <p>{{ errorStore.errors.url[0] }}</p>
      </div>
      
      <AppInput v-model="crawl.url" label="URL" placeholder="https://" required />

      <div class="margin-top-md margin-bottom-sm">
        <button class="btn btn--primary btn--md width-100%">Start crawl</button>
      </div>
    </form>
  </AppModal>
</template>

<script setup>
import { ref } from 'vue'
import { useErrorStore } from '@/app/store/useErrorStore'
import { useCrawlStore } from '@/domain/crawls/store/useCrawlStore'
import AppModal from '@/app/components/AppModal.vue'
import AppInput from '@/app/components/forms/AppInput.vue'

const crawlStore = useCrawlStore()
const errorStore = useErrorStore()

const crawl = ref({
  url: '',
})

function create() {
  crawlStore.store(crawl.value)
    .then(() => {
      crawlStore.toggleCreateModal()
      crawl.value = {url: ''}
    })
    .catch(() => {})
}
</script>
