<template>
  <div>
    <p class="text-xs text-uppercase letter-spacing-lg color-primary">Step 3</p>
    <h1>Download assets</h1>
    <p>Download the credit union's brand assets.</p>

    <!-- Logo -->
    <h3 class="padding-top-xxxs">Logo</h3>
    <hr>
    <div class="grid gap-md">
      <div class="col-6 padding-right-sm">
        <MediaList 
          :files="mediaStore.filterByTag('logo')" 
          :deleteable="false"
          @selected="openModal"
        />
      </div>
      <div class="col-6 padding-left-md">
        <div v-if="organizationCommentsStore.filterByGroup('logo-do').length">
          <p><strong>Do's:</strong></p>
          <p v-for="item in organizationCommentsStore.filterByGroup('logo-do')" :key="item.id">
            <span class="margin-right-xxxs">✅</span> {{ item.body }}
          </p>
        </div>
        <div v-if="organizationCommentsStore.filterByGroup('logo-dont').length">
          <p class="padding-top-sm"><strong>Don'ts:</strong></p>
          <p v-for="item in organizationCommentsStore.filterByGroup('logo-dont')" :key="item.id">
            <span class="margin-right-xxxs">❌</span> {{ item.body }}
          </p>
        </div>
      </div>
    </div>

    <!-- Fonts -->
    <h3 class="padding-top-xxxs">Fonts</h3>
    <hr>
    <div class="grid gap-md">
      <div class="col-6 padding-right-sm">
        <MediaList 
          :files="mediaStore.filterByTag('font')" 
          :deleteable="false"
          @selected="openModal"
        />
      </div>
      <div class="col-6 padding-left-md">
        <div v-if="organizationCommentsStore.filterByGroup('font-do').length" >
          <p><strong>Do's:</strong></p>
          <p v-for="item in organizationCommentsStore.filterByGroup('font-do')" :key="item.id">
            <span class="margin-right-xxxs">✅</span> {{ item.body }}
          </p>
        </div>
        <div v-if="organizationCommentsStore.filterByGroup('font-dont').length">
          <p class="padding-top-sm"><strong>Don'ts:</strong></p>
          <p v-for="item in organizationCommentsStore.filterByGroup('font-dont')" :key="item.id">
            <span class="margin-right-xxxs">❌</span> {{ item.body }}
          </p>
        </div>
      </div>
    </div>

    <!-- Photographs -->
    <h3 class="padding-top-xxxs">Photographs</h3>
    <hr>
    <div class="grid gap-md">
      <div class="col-6 padding-right-sm">
        <MediaList 
          :files="mediaStore.filterByTag('photo')" 
          :deleteable="false"
          @selected="openModal"
        />
      </div>
      <div class="col-6 padding-left-md">
        <div v-if="organizationCommentsStore.filterByGroup('photo-do').length">
          <p><strong>Do's:</strong></p>
          <p v-for="item in organizationCommentsStore.filterByGroup('photo-do')" :key="item.id">
            <span class="margin-right-xxxs">✅</span> {{ item.body }}
          </p>
        </div>
        <div v-if="organizationCommentsStore.filterByGroup('photo-dont').length">
          <p class="padding-top-sm"><strong>Don'ts:</strong></p>
          <p v-for="item in organizationCommentsStore.filterByGroup('photo-dont')" :key="item.id">
            <span class="margin-right-xxxs">❌</span> {{ item.body }}
          </p>
        </div>
      </div>
    </div>

    <!-- Other -->
    <div v-if="mediaStore.filterByTag('other').length">
      <h3 class="padding-top-xxxs">Other</h3>
      <hr>
      <div class="grid gap-md">
        <div class="col-6 padding-right-sm">
          <MediaList 
            :files="mediaStore.filterByTag('other')" 
            :deleteable="false"
            @selected="openModal"
          />
        </div>
        <div class="col-6 padding-left-md">
          <div v-if="organizationCommentsStore.filterByGroup('other-do').length">
            <p><strong>Do's:</strong></p>
            <p v-for="item in organizationCommentsStore.filterByGroup('other-do')" :key="item.id">
              <span class="margin-right-xxxs">✅</span> {{ item.body }}
            </p>
          </div>
          <div v-if="organizationCommentsStore.filterByGroup('other-dont').length">
            <p class="padding-top-sm"><strong>Don'ts:</strong></p>
            <p v-for="item in organizationCommentsStore.filterByGroup('other-dont')" :key="item.id">
              <span class="margin-right-xxxs">❌</span> {{ item.body }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex gap-xs margin-top-md padding-y-md">
      <button @click="toggle('brief-brand')" class="btn btn--subtle">Back</button>
      <button @click="toggle('brief-final-instructions')" class="btn btn--primary">Next</button>
    </div>
    
    <MediaModal @closed="closeModal" :file="modalData" :deleteable="false" :class="modalData ? 'modal--is-visible' : ''"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Components
import MediaList from '@/domain/base/media/components/MediaList.vue'
import MediaModal from '@/domain/base/media/modals/MediaModal.vue'

// Stores
import { useMediaStore } from '@/domain/base/media/store/useMediaStore'
import { useOrganizationCommentsStore } from '@/domain/base/organizations/store/useOrganizationCommentsStore'
const mediaStore = useMediaStore()
const organizationCommentsStore = useOrganizationCommentsStore()

// Composables
import useToggle from '@/app/composables/base/useToggle.js'
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
  mediaStore.index()
  organizationCommentsStore.index()
})
</script>
