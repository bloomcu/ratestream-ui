<template>
  <AppModal 
    size="xxs"
    @closed="pageStore.toggleContentCategoryModal()" 
    :class="pageStore.contentCategoryModalOpen ? 'modal--is-visible' : ''"
  >
    <h2 class="text-md margin-bottom-sm">Update category</h2>
    <AppNestedMenu v-if="categoryStore.children" :items="categoryStore.children" :selected="category" @selected="setCategory" :showTitle="false" :showAllOption="false" />
    <button @click="updateCategory()" class="btn btn--primary">Update category</button>
  </AppModal>
</template>

<script setup>
import { ref } from 'vue'
import { usePageStore } from '@/domain/pages/store/usePageStore'
import { useCategoryStore } from '@/domain/categories/store/useCategoryStore'
import useQuery from '@/app/composables/useQuery.js'
import AppModal from '@/app/components/AppModal.vue'
import AppNestedMenu from '@/app/components/nested-menu/AppNestedMenu.vue'

const pageStore = usePageStore()
const categoryStore = useCategoryStore()
const { query } = useQuery()
let category = ref(null)

function setCategory(value) {
  category.value = value
}

function updateCategory() {
  pageStore.update(pageStore.selected, {
    category: category.value
  }).then(() => {
    pageStore.index({
      'filter[status.slug]': query.value.status,
      'filter[category.slug]': query.value.category,
    })
    
    pageStore.selected = []
  
    pageStore.toggleContentCategoryModal()
  })
}
</script>
