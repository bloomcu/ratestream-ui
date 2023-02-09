<template>
  <div>
    <p class="text-xs text-uppercase letter-spacing-lg color-primary">Step 2</p>
    <h1>Review the brand guide</h1>
    <p>Review the brand guide so your webpage design fits the credit union’s brand.</p>
    
    <h3 class="padding-y-xxxs">Brand guide</h3>
    <div class="grid gap-md">
      <div class="col-6 padding-right-sm">
        <MediaList 
          :files="mediaStore.files" 
          :deleteable="false" 
          @selected="openModal"
        />
      </div>
      <div class="col-6 padding-left-md">
        <div v-if="organizationCommentsStore.filterByGroup('brand-do').length">
          <p><strong>Do's:</strong></p>
          <p v-for="item in organizationCommentsStore.filterByGroup('brand-do')" :key="item.id">
            <span class="margin-right-xxxs">✅</span> {{ item.body }}
          </p>
        </div>
        <div v-if="organizationCommentsStore.filterByGroup('brand-dont').length">
          <p class="padding-top-sm"><strong>Don'ts:</strong></p>
          <p v-for="item in organizationCommentsStore.filterByGroup('brand-dont')" :key="item.id">
            <span class="margin-right-xxxs">❌</span> {{ item.body }}
          </p>
        </div>
      </div>
    </div>
    
    <div class="flex gap-xs margin-top-md padding-y-md border-top">
      <button @click="toggle('brief-tutorial')" class="btn btn--subtle">Back</button>
      <button @click="toggle('brief-assets')" class="btn btn--primary">Next</button>
    </div>
    
    <MediaModal @closed="closeModal" :file="modalData" :deleteable="false" :class="modalData ? 'modal--is-visible' : ''"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Components
import MediaList from '@/domain/media/components/MediaList.vue'
import MediaModal from '@/domain/media/modals/MediaModal.vue'

// Stores
import { useMediaStore } from '@/domain/media/store/useMediaStore'
import { useOrganizationCommentsStore } from '@/domain/organizations/store/useOrganizationCommentsStore'
const mediaStore = useMediaStore()
const organizationCommentsStore = useOrganizationCommentsStore()

// Composables
import useToggle from '@/app/composables/useToggle.js'
const { toggle } = useToggle()

// Extract to a view store
let modalData = ref(null)

function openModal(file) {
  modalData.value = file
}
function closeModal() {
  modalData.value = null
}

onMounted(() => {
  mediaStore.index({ 'filter[tags.slug]': 'brand' })
  organizationCommentsStore.index()
})
</script>
