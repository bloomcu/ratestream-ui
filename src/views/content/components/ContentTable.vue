<template>
  <div class="int-table text-sm">
    <div class="int-table__inner">
      <table class="int-table__table">
        <thead class="int-table__header">
          <tr class="int-table__row">
            <!-- Select all -->
            <td class="int-table__cell">
              <div class="custom-checkbox int-table__checkbox">
                <input @click="pageStore.selectAllPages()" :checked="pageStore.selected.length == pageStore.pages.length"  class="custom-checkbox__input" type="checkbox"/>
                <div class="custom-checkbox__control"></div>
              </div>
            </td>

            <!-- <th class="int-table__cell int-table__cell--th int-table__cell--sort">
              <div class="flex items-center">
                <span>Title</span>

                <svg class="icon icon--xxs margin-left-xxxs int-table__sort-icon" viewBox="0 0 12 12">
                  <polygon class="arrow-up" points="6 0 10 5 2 5 6 0" />
                  <polygon class="arrow-down" points="6 12 2 7 10 7 6 12" />
                </svg>
              </div>
            </th> -->
            
            <th class="int-table__cell int-table__cell--th text-left">
              Title
            </th>

            <th class="int-table__cell int-table__cell--th text-left">
              Category
            </th>

            <th class="int-table__cell int-table__cell--th text-left">
              Status
            </th>

            <th class="int-table__cell int-table__cell--th text-left"></th>
          </tr>
        </thead>

        <tbody class="int-table__body">
          <tr 
            v-for="page in pageStore.pages"
            :key="page.id"
            class="int-table__row"
          >
            <!-- Checkbox -->
            <th class="int-table__cell" scope="row">
              <div class="custom-checkbox int-table__checkbox">
                <input 
                  @click.self="pageStore.selectPage(page.id, $event)" 
                  :checked="pageStore.selected.includes(page.id)" 
                  class="custom-checkbox__input" 
                  type="checkbox"
                />
                <div class="custom-checkbox__control"></div>
              </div>
            </th>
            
            <!-- Title & URL -->
            <td class="int-table__cell max-width-xs">
              <AppInlineEditor 
                :id="page.id" 
                @updated="updateTitle" 
                class="width-fit"
              >
                {{ page.title }}
              </AppInlineEditor>
              
              <a v-if="page.url" :href="page.url" target="_blank" class="text-xs color-contrast-low width-fit">{{ page.url }}</a>
            </td>
            
            <!-- Category -->
            <td class="int-table__cell">
              <!-- TODO: Either use the AppChip, or delete it and create a chip class in app css -->
              <span @click="handleCategoryClick(page.id)" class="inline-block bg-contrast-low bg-opacity-20% radius-full padding-y-xxxs padding-x-xs text-xs ws-nowrap cursor-pointer">
                {{ page.category.title }}
              </span>
            </td>
            
            <!-- Status -->
            <td class="int-table__cell">
              <div class="btns inline-flex text-xs">
                <button 
                  v-for="option in [
                   {title: 'Needs review', slug: 'needs-review'},
                   {title: 'Looks good', slug: 'looks-good'},
                   {title: 'Not sure', slug: 'not-sure'},
                  ]" 
                  :key="option.slug"
                  :class="page.status && page.status.slug === option.slug ? 'btns__btn--selected' : null"
                  @click="handleStatusClick(page.id, option)"
                  class="btns__btn"
                >
                  {{ option.title }}
                </button>
              </div>
            </td>
            
            <!-- Archive -->
            <td class="int-table__cell width-xxs">              
              <button @click="destroy(page.id)" class="btn btn--sm btn--icon float-right">
                <IconTrash size="xs" class="color-contrast-medium color-opacity-60%"/>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePageStore } from '@/domain/pages/store/usePageStore'
import AppInlineEditor from '@/app/components/base/forms/AppInlineEditor.vue'
import IconTrash from '@/app/components/base/icons/IconTrash.vue'

const pageStore = usePageStore()
// const isHighlighting = ref(false)

function updateTitle(id, title) {
  pageStore.update([id], {title: title})
}

function addUrl(id, url) {
  pageStore.update([id], {url: url})
}

function destroy(id) {
  // TODO: Abstract this away
  // Add to array if not present.
  
  // Check is this page selected already
  let index = pageStore.selected.indexOf(id)
      // if it is not selected, then select it
      index === -1 ? pageStore.selected.push(id) : null
      
  pageStore.destroy(pageStore.selected)
  
  pageStore.selected = []
}

function handleCategoryClick(id) {
  // TODO: Abstract this away
  // Add to array if not present.
  let index = pageStore.selected.indexOf(id)
      index === -1 ? pageStore.selected.push(id) : null
    
  pageStore.toggleContentCategoryModal()
}

function handleStatusClick(id, statusObj) {
  if (pageStore.selected.includes(id)) {
    // Iterate selected pages and update
    // Optimize this so we only iterate over selected pages, not all pages
    // TODO: Abstract this away
    pageStore.pages.forEach((page) => {
      if (pageStore.selected.includes(page.id)) {
        page.status = statusObj
      }
    })
    
    // Update all selected pages
    pageStore.update(pageStore.selected, {
      status: statusObj.slug
    })
    
    pageStore.selected = []
  } else {
    // Update single page
    let page = pageStore.pages.find(p => p.id === id)
        page.status = statusObj
    
    pageStore.update([id], {
      status: statusObj.title
    })
  }
}

// function highlight(id) {
//   pageStore.selected.includes(id) ? isHighlighting.value = true : isHighlighting.value = false
// }
// 
// function unhighlight() {
//   isHighlighting.value = false
// }
</script>
