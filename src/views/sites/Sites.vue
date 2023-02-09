<template>
  <LayoutDefault>
    <div class="container max-width-sm flex items-center justify-between margin-y-md">
      <h1 class="text-lg">Sites</h1>
      <button @click="siteStore.toggleCreateModal" class="btn btn--subtle">
        <IconPlus size="xs" class="color-primary"/>
        <span class="margin-left-xxs">Add site</span>
      </button>
    </div>

    <div class="container max-width-sm margin-bottom-md">
      <div v-for="site in siteStore.sites" :key="site.id" class="card card--shadow margin-bottom-sm">
        <div class="card-header">
          <p class="text-xs color-primary text-uppercase margin-bottom-xs">{{ site.title }}</p>
          <h2 class="text-md margin-bottom-sm">{{ site.domain }}</h2>
          
          <!-- <div v-if="site.last_crawl.status === 'RUNNING'" class="flex items-center margin-y-sm">
            <span class="text-sm margin-right-xxs">Crawling website</span>
            <AppCircleLoader/>
          </div> -->
          
          <!-- <div v-if="site.last_crawl.status === 'SUCCEEDED'" class="flex items-center margin-y-sm">
            <span class="text-sm">Crawled {{ moment(site.last_crawl.created_at).fromNow() }}</span>
          </div> -->
          
          <!-- <div v-if="site.last_crawl.status === 'FAILED'" class="flex items-center margin-y-sm">
            <span class="text-sm">Last crawl failed {{ moment(site.last_crawl.created_at).fromNow() }}</span>
          </div> -->
        </div>
        
        <div class="card-footer flex gap-xs border-top margin-top-sm padding-top-sm">
          <RouterLink :to="{ name: 'sitesLaunch', params: { site: site.id } }" class="btn btn--sm btn--primary">Launch Dashboard</RouterLink>
          <RouterLink :to="{ name: 'sitesEdit', params: { site: site.id } }" class="btn btn--sm btn--subtle margin-left-auto">Edit</RouterLink>
        </div>
      </div>
    </div>

    <CreateSiteModal/>
  </LayoutDefault>
</template>

<script setup>
import moment from "moment"
import { ref, onMounted } from 'vue'
import { useSiteStore } from '@/domain/sites/store/useSiteStore'
import LayoutDefault from '@/app/layouts/LayoutDefault.vue'
import AppCircleLoader from '@/app/components/loaders/AppCircleLoader.vue'
import IconPlus from '@/app/components/icons/IconPlus.vue'
import CreateSiteModal from '@/views/sites/modals/CreateSiteModal.vue'

const siteStore = useSiteStore()

onMounted(() => {
    siteStore.index()
})
</script>
