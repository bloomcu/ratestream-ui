<template>
  <div class="content-table__top-bar flex items-center justify-between z-index-2 shadow-xs bg radius-md radius-top-left-0 radius-top-right-0 padding-y-xs padding-x-xs margin-bottom-xs">
    <!-- Left -->
    <div class="flex items-center">
      <span class="text-sm">{{ pageStore.pages.length }} page(s)</span>
      <button v-if="pageStore.selected.length" @click="pageStore.clearSelectedPages()" class="btn btn--sm margin-left-sm">
        <span class="margin-right-xxs">{{ pageStore.selected.length }} selected</span>
        <IconClose size="xxs" class="color-primary"/>
      </button>
    </div>
    
    <!-- Right -->
    <div class="flex items-center">
      <button v-if="pageStore.selected.length" @click="pageStore.toggleContentCategoryModal()" class="flex items-center reset cursor-pointer text-sm margin-right-md">
        <IconEdit size="xxs" class="color-primary"/>
        <span class="margin-left-xxs">Edit</span>
      </button>
      
      <button @click="create()" class="flex items-center reset cursor-pointer text-sm margin-right-md">
        <IconPlus size="xxs" class="color-primary"/>
        <span class="margin-left-xxs">Add Page</span>
      </button>
      
      <button @click="pageStore.toggleContentExportModal()" class="flex items-center reset cursor-pointer text-sm margin-right-md">
        <IconExport size="xxs" class="color-primary"/>
        <span class="margin-left-xxs">Export</span>
      </button>
      
      <div class="text-sm">
        <input @input="filterArchived" :checked="query['trashed']" class="checkbox" type="checkbox" id="trashed">
        <label for="trashed">Archived</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePageStore } from '@/domain/pages/store/usePageStore'
import useQuery from '@/app/composables/base/useQuery.js'

import IconClose from '@/app/components/base/icons/IconClose.vue'
import IconEdit from '@/app/components/base/icons/IconEdit.vue'
import IconExport from '@/app/components/base/icons/IconExport.vue'
import IconPlus from '@/app/components/base/icons/IconPlus.vue'

const pageStore = usePageStore()
const { query, set, unset } = useQuery()

function create() {
  pageStore.store({title: 'New page'})
}

function filterArchived() {
  query.value['trashed'] ? unset('trashed') : set('trashed', 'only')
}
</script>

<style lang="scss">
.content-table__top-bar {
  position: sticky;
  top: 0;
  border: 1px solid var(--color-contrast-lower);
  border-top: none;
}
</style>
