<template>
  <LayoutDefault maxWidth="none">
    <div class="container max-width-sm flex items-center justify-between margin-y-md">
      <h1 class="text-lg">Crawls</h1>
      
      <button @click="crawlStore.toggleCreateModal()" class="btn btn--subtle">
        <IconPlus size="xs" class="color-primary"/>
        <span class="margin-left-xxs">New crawl</span>
      </button>
    </div>
    
    <div class="container max-width-sm margin-bottom-md">      
      <div v-for="crawl in crawlStore.crawls" :key="crawl.id" @click="showCrawl(crawl.id)" class="card card--is-link margin-bottom-sm">
        <div class="card-header flex flex-column gap-sm">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm margin-bottom-xs">Created {{ moment(crawl.created_at).fromNow() }}</p>
              <h3 class="text-base">{{ crawl.url }}</h3>
            </div>
            
            <button v-if="canAbort(crawl.status)" @click.stop="abort(crawl.id)" class="btn btn--sm btn--subtle margin-left-sm">
              <IconCancel size="xs" class="color-primary"/>
              <span class="margin-left-xxs">Cancel</span>
            </button>
            
            <button v-if="canRestart(crawl.status)" @click.stop="restart(crawl.url)" class="btn btn--sm btn--subtle margin-left-sm">
              <IconRestart size="xs" class="color-primary"/>
              <span class="margin-left-xxs">Restart</span>
            </button>
          </div>
        </div>
        
        <div class="card-footer flex justify-between items-center border-top margin-top-sm padding-top-sm">
          <!-- TODO: Create a CrawlStatus.vue component that wraps up all this logic -->
          <AppChip :color="getStatusColor(crawl.status)">
            <AppCircleLoader v-if="isInProgress(crawl.status)" class="margin-right-xxxs"/>
            {{ crawl.status ? crawl.status : 'STARTING' }}
          </AppChip>
        </div>
      </div>
    </div>
    
    <CreateCrawlModal/>
  </LayoutDefault>
</template>

<script setup>
import moment from "moment"
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCrawlStore } from '@/domain/crawls/store/useCrawlStore'

import LayoutDefault from '@/app/layouts/LayoutDefault.vue'
import AppChip from '@/app/components/AppChip.vue'
import AppCircleLoader from '@/app/components/loaders/AppCircleLoader.vue'
import IconPlus from '@/app/components/icons/IconPlus.vue'
import IconCancel from '@/app/components/icons/IconCancel.vue'
import IconRestart from '@/app/components/icons/IconRestart.vue'
import CreateCrawlModal from '@/views/crawls/modals/CreateCrawlModal.vue'

const crawlStore = useCrawlStore()
const router = useRouter()

// TODO: Move to composable
function canAbort(status) {
  const abortableStatuses = ['READY', 'RUNNING', 'TIMING-OUT']
  return abortableStatuses.includes(status)
}

// TODO: Move to composable
function canRestart(status) {
  const restartableStatuses = ['SUCCEEDED', 'FAILED', 'TIMED-OUT', 'ABORTED']
  return restartableStatuses.includes(status)
}

function abort(id) {
  // Todo: Create an "Abort" endpoint. Use destroy for soft-deleting
  crawlStore.destroy(id)
    .then(() => {
      crawlStore.index()
    })
}

function restart(url) {
  crawlStore.store({url: url})
    .then(() => {
      crawlStore.index()
    })
}

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

function showCrawl(id) {
  router.push({name: 'crawlsShow', params: { crawl: id}})
}

onMounted(() => {
  crawlStore.index()
})
</script>
