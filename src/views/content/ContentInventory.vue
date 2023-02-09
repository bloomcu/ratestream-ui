<template>
  <!-- <div class="padding-y-sm border-bottom">
    <div class="container flex justify-between">
      <div>
        <span class="text-sm">Back</span>
      </div>
      <div>
        
      </div>
    </div>
  </div> -->
  
  <LayoutDefault maxWidth="none">
    <div class="flex">
      <aside class="position-relative z-index-1 width-100% padding-y-sm padding-right-md border-right" style="max-width: 280px;">
        <AppNestedMenu v-if="statuses.status" :items="statuses.status" title="status" :selected="query['status']" @selected="filterStatus"/>
        <AppNestedMenu v-if="categories.children" :items="categories.children" title="category" :selected="query['category']" @selected="filterCategory"/>
      </aside>
      
      <main class="position-relative z-index-1 flex-grow height-100vh">
        <div class="padding-left-md">
          <ContentTableTopBar/>
          <ContentSkeletonLoader v-if="pageStore.isLoading" class="margin-top-sm"/>
          <ContentTable v-else/>
          <!-- Tutorial -->
          <!-- <div v-if="!pageStore.isLoading && !pageStore.pages.length" class="card card--shadow card--dark margin-top-md">
            <div class="text-component padding-sm">
                <h3>Crawl your content</h3>
                <p>Start an inventory of your content by crawling your current website.</p>
                <RouterLink :to="{ name: 'crawls', params: { organization: auth.organization }}" class="btn btn--primary">
                  Start a crawl
                </RouterLink>
            </div>
          </div> -->
        </div>
      </main>
      
      <ContentCategoryModal/>
      <ContentExportModal/>
    </div>
  </LayoutDefault>
</template>

<script setup>
import { watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useAuthStore } from '@/domain/auth/store/useAuthStore'
import { usePageStore } from '@/domain/pages/store/usePageStore'
import { useStatusStore } from '@/domain/statuses/store/useStatusStore'
import { useCategoryStore } from '@/domain/categories/store/useCategoryStore'
import useQuery from '@/app/composables/useQuery.js'

import LayoutDefault from '@/app/layouts/LayoutDefault.vue'
import AppNestedMenu from '@/app/components/nested-menu/AppNestedMenu.vue'
import ContentSkeletonLoader from '@/views/content/loaders/ContentSkeletonLoader.vue'
import ContentTable from '@/views/content/components/ContentTable.vue'
import ContentTableTopBar from '@/views/content/components/ContentTableTopBar.vue'
import ContentCategoryModal from '@/views/content/modals/ContentCategoryModal.vue'
import ContentExportModal from '@/views/content/modals/ContentExportModal.vue'

const auth = useAuthStore()
const pageStore = usePageStore()
const statuses = useStatusStore()
const categories = useCategoryStore()
const route = useRoute()
const { query, set, unset } = useQuery()

function indexPages() {
  pageStore.index({
    'filter[status.slug]': query.value.status,
    'filter[category.slug]': query.value.category,
    'filter[trashed]': query.value.trashed,
  })
}

function filterStatus(value) {
  value ? set('status', value) : unset('status')
}

function filterCategory(value) {
  value ? set('category', value) : unset('category')
}

watch(route, (newValue) => {
  indexPages()
}, { deep: true })

onMounted(() => {
  indexPages()
  statuses.show('page-statuses')
  categories.show('page-categories')
})
</script>
