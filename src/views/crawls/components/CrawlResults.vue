<template>
  <div>  
    <div class="card card--shadow">
      <div class="grid margin-bottom-sm">
        <div v-if="crawlStore.results" class="col">
          <p class="text-sm">Pages crawled</p>
          <p class="text-xl text-bold">{{ crawlStore.results.length }}</p>
        </div>
        <div v-if="isInProgress(crawlStore.crawl.status)" class="col border-left padding-left-sm">
          <p class="text-sm">Pending</p>
          <p class="text-xl text-bold">{{ crawlStore.crawl.pending }}</p>
        </div>
      </div>
      
      <CrawlsSkeletonLoader v-if="crawlStore.isLoadingResults"/>
      
      <table v-else class="table table--expanded position-relative z-index-1 width-100% text-unit-em text-sm">
        <thead class="table__header">
          <tr class="table__row">
            <th class="table__cell text-left" scope="col">Title & URLs</th>
            <th class="table__cell text-left" scope="col">Status</th>
            <th class="table__cell text-left" scope="col">Wordcount</th>
            <th class="table__cell text-left" scope="col">Redirected</th>
          </tr>
        </thead>
        
        <tbody class="table__body">
          <tr v-for="(item, index) in crawlStore.results" :key="index" class="table__row">
            <!-- Item title and url(s) -->
            <td class="table__cell flex flex-column gap-xxs" role="cell">
              <p class="text-bold">{{ item.title }}</p>
              <span v-if="item.redirected" class="text-sm">Request: <a :href="item.requested_url" target="_blank" class="text-sm color-contrast-low">{{ item.requested_url }}</a></span>
              <span class="text-sm">Destination: <a :href="item.destination_url" target="_blank" class="text-sm color-contrast-low">{{ item.destination_url }}</a></span>
            </td>
            
            <!-- Status -->
            <td class="table__cell" role="cell">
              <p :class="item.http_status == '404' ? 'color-error' : null">{{ item.http_status }}</p>
            </td>
            
            <!-- Wordcount -->
            <td class="table__cell text-left" role="cell">
              <p>{{ item.wordcount }}</p>
            </td>
            
            <!-- Redirected -->
            <td class="table__cell text-left" role="cell">
              <p :class="item.redirected ? 'color-error' : null">{{ item.redirected ? 'Yes' : 'No' }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCrawlStore } from '@/domain/crawls/store/useCrawlStore'
import CrawlsSkeletonLoader from '@/views/crawls/loaders/CrawlsSkeletonLoader.vue'

const route = useRoute()
const crawlStore = useCrawlStore()

// TODO: Move to composable
function isInProgress(status) {
  const inProgressStatuses = ['READY', 'RUNNING', 'TIMING-OUT', 'ABORTING']
  return inProgressStatuses.includes(status)
}

onMounted(() => {
  crawlStore.showResults(route.params.crawl)
})
</script>
