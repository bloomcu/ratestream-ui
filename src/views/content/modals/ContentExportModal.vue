<template>
  <AppModal 
    size="md"
    @closed="pageStore.toggleContentExportModal()" 
    :class="pageStore.contentExportModalOpen ? 'modal--is-visible' : ''"
  >
    <div class="flex justify-between margin-bottom-md">
      <div>
        <h2 class="text-md margin-bottom-xxs">Export {{ pageStore.pages.length }} page(s)</h2>
      </div>
      
      <div>
        <button @click="exportPages()" class="btn btn--sm btn--primary">
          <IconExport size="xs" class="color-white"/>
          <span class="margin-left-xxs">Export to CSV</span>
        </button>
      </div>
    </div>
    
    <table class="table table--expanded position-relative z-index-1 width-100% text-unit-em text-sm">
      <thead class="table__header">
        <tr class="table__row">
          <th class="table__cell text-left" scope="col">Page</th>
          <th class="table__cell text-left" scope="col">Category</th>
          <th class="table__cell text-left" scope="col">Wordcount</th>
        </tr>
      </thead>
      
      <tbody class="table__body">
        <tr v-for="(page, index) in pageStore.pages" :key="index" class="table__row">
          <td class="table__cell  text-left" role="cell">
            <p class="text-bold margin-bottom-xxxxs">{{ page.title }}</p>
            <a :href="page.url" target="_blank" class="text-xs color-contrast-low">{{ page.url }}</a>
          </td>

          <td class="table__cell text-left" role="cell">
            <p>{{ page.category ? page.category.title : 'Uncategorized' }}</p>
          </td>

          <td class="table__cell text-left" role="cell">
            <p>{{ page.wordcount }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </AppModal>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { usePageStore } from '@/domain/pages/store/usePageStore'
import AppModal from '@/app/components/base/modals/AppModal.vue'
import IconExport from '@/app/components/base/icons/IconExport.vue'

const route = useRoute()
const pageStore = usePageStore()
const baseURL = import.meta.env.VITE_API_BASE_URL

function exportPages() {
  // pageStore.exportToCSV()
  window.open(`${baseURL}/${route.params.organization}/pages/export/csv`, '_blank')
}
</script>
