<template>
  <LayoutDefault v-if="store.crawl" maxWidth="md">
    <div class="container padding-y-md">
      <div class="flex items-center justify-between margin-bottom-md">
        <RouterLink :to="{name: 'crawls'}" class="btn btn--subtle">
          <IconAngleLeft size="xs" class="color-primary"/>
          <span class="margin-left-xxs">Back</span>
        </RouterLink>
        
        <button v-if="canAbort(store.crawl.status)" @click.stop="abort(store.crawl.id)"  class="btn btn--subtle">
          <IconCancel size="xs" class="color-primary"/>
          <span class="margin-left-xxs">Cancel</span>
        </button>
        
        <button v-if="store.crawl.status == 'SUCCEEDED' && !store.isImportingResults" @click.stop="importResults(store.crawl.id)" class="btn btn--primary">
          Import results
        </button>
        
        <button v-if="store.isImportingResults" class="btn btn--disabled">
          <AppCircleLoader/>
          <span class="margin-left-xxs">Importing</span>
        </button>
      </div>
      
      <!-- Crawl info -->
      <div class="margin-bottom-md">
        <p class="text-sm margin-bottom-xs">Created {{ moment(store.crawl.created_at).fromNow() }}</p>
        <h1 class="text-lg margin-bottom-sm">{{ store.crawl.url }}</h1>
        <!-- TODO: Create a CrawlStatus.vue component that wraps up all this logic -->
        <AppChip :color="getStatusColor(store.crawl.status)">
          <AppCircleLoader v-if="isInProgress(store.crawl.status)" class="margin-right-xxxs"/>
          {{ store.crawl.status }}
        </AppChip>
      </div>
      
      <!-- Crawl results -->
      <CrawlResults/>
    </div>
  </LayoutDefault>
</template>

<script setup>
import moment from "moment"
import { onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCrawlStore } from '@/domain/crawls/store/useCrawlStore'

import LayoutDefault from '@/app/layouts/LayoutDefault.vue'
import IconAngleLeft from '@/app/components/icons/IconAngleLeft.vue'
import IconCancel from '@/app/components/icons/IconCancel.vue'
import AppCircleLoader from '@/app/components/loaders/AppCircleLoader.vue'
import AppChip from '@/app/components/AppChip.vue'
import AppInput from '@/app/components/forms/AppInput.vue'
import CrawlsSkeletonLoader from '@/views/crawls/loaders/CrawlsSkeletonLoader.vue'
import CrawlResults from '@/views/crawls/components/CrawlResults.vue'

const route = useRoute()
const router = useRouter()
const store = useCrawlStore()

// TODO: Move to composable
function getStatusColor(status) {
  const statuses = {
    'READY': 'outline',
    'RUNNING': 'outline',
    'SUCCEEDED': 'success',
    'FAILED': 'error',
    'TIMING-OUT': 'warning',
    'TIMED-OUT': 'warning',
    'ABORTING': 'error',
    'ABORTED': 'error',
  }
  
  return status ? statuses[status] : 'outline'
}

// TODO: Move to composable
function isInProgress(status) {
  const inProgressStatuses = ['READY', 'RUNNING', 'TIMING-OUT', 'ABORTING']
  return inProgressStatuses.includes(status)
}

// TODO: Move to composable
function canAbort(status) {
  const abortableStatuses = ['READY', 'RUNNING', 'TIMING-OUT']
  return abortableStatuses.includes(status)
}

function abort(id) {
  // Todo: Create an "Abort" endpoint. Use destroy for soft-deleting
  store.destroy(id)
    .then(() => {
      store.show(id)
    })
}

function importResults(id) {
  store.importResults(id)
    .then(() => {
      router.push({ name: 'content', params: { organization: route.params.organization}})
    })
}

onMounted(() => {
  store.show(route.params.crawl)
    .then(() => {
      store.showResults(store.crawl.id)
    })
    
  window.Echo.private('DDD.Domain.Crawls.Crawl.' + route.params.crawl)
    .listen('.CrawlStatusUpdated', ({ crawl }) => {
      store.crawl = crawl
      store.showResults(route.params.crawl)
    })
})

onUnmounted(() => {
  window.Echo.leave('DDD.Domain.Crawls.Crawl.' + store.crawl.id)
})
</script>
