<template>
  <LayoutDefault maxWidth="xxl">
    <div class="container flex items-center justify-between margin-y-md">
      <h1 class="text-lg">Redirects</h1>
      
      <div class="flex gap-xs">
        <button @click="redirectStore.toggleRedirectImportModal()" class="btn btn--sm btn--subtle">
          <IconImport size="xs" class="color-primary"/>
          <span class="margin-left-xxs">Import new redirects</span>
        </button>
        
        <button @click="redirectStore.toggleRedirectExportModal()" class="btn btn--sm btn--primary">
          <IconExport size="xs" class="color-white"/>
          <span class="margin-left-xxs">Export for .htaccess</span>
        </button>
      </div>
    </div>
    
    <div class="container margin-bottom-md">
      <RedirectsSkeletonLoader v-if="redirectStore.isLoading"/>
      <RedirectsTable v-else/>
    </div>
  </LayoutDefault>
</template>

<script setup>
import moment from "moment"
import { onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRedirectStore } from '@/domain/redirects/store/useRedirectStore'

import LayoutDefault from '@/app/layouts/LayoutDefault.vue'
import IconImport from '@/app/components/icons/IconImport.vue'
import IconExport from '@/app/components/icons/IconExport.vue'
import RedirectsSkeletonLoader from '@/views/redirects/loaders/RedirectsSkeletonLoader.vue'
import RedirectsTable from '@/views/redirects/components/RedirectsTable.vue'

const route = useRoute()
const redirectStore = useRedirectStore()

onMounted(() => {
  redirectStore.index()
})
</script>
