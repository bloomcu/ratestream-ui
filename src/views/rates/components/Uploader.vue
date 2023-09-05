<template>
  <div class="margin-bottom-md">
      <div
        class="dropzone-container margin-bottom-sm radius-lg"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="dropFile"
      >
        <input
          @change="selectFile"
          type="file"
          name="fileInput"
          ref="fileInput"
          id="fileInput"
          class="hidden-input"
          accept=".csv"
        />

        <label for="fileInput" class="file-label">
          <div v-if="isDragging">Release to drop files here.</div>
          <div v-else><u>Upload a CSV file</u> or drop it here</div>
        </label>
        
        <div class="preview-container mt-4" v-if="files.length">
          <div v-for="file in files" :key="file.name" class="preview-card">
            <div class="flex items-center gap-sm">
              <!-- <img class="preview-img" :src="generateURL(file)" /> -->
              <p>{{ file.name }} - {{ Math.round(file.size / 1000) + "kb" }}</p>
              <button @click="remove(files.indexOf(file))" class="btn btn--subtle btn--xs">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Errors -->
      <div v-if="csvStore.errors">
        <div v-if="csvStore.errors.uid" class="color-error bg-error bg-opacity-10% border border-error border-opacity-30% padding-xs radius-lg flex-grow">
          {{ csvStore.errors.uid[0] }}
        </div>
        <div v-if="csvStore.errors.file" class="color-error bg-error bg-opacity-10% border border-error border-opacity-30% padding-xs radius-lg flex-grow">
          {{ csvStore.errors.file[0] }}
        </div>
      </div>
      
      <!-- Preview -->
      <div v-if="csvStore.columns" class="flex gap-sm justify-between items-center margin-y-sm">
        <h3>Preview</h3>
        
        <div class="flex gap-md items-center">
          <!-- Compare -->
          <a v-if="rateStore.rates.length" @click.prevent="compare()" href="" class="color-contrast-high">Compare to current rates</a>
          
          <!-- Publish -->
          <button @click="rateStore.toggleIsPublishPromptModal()" :disabled="csvStore.errors" class="btn btn--primary">Publish</button>
        </div>
      </div>
      
      <!-- Table preview -->
      <div v-if="csvStore.columns" class="">
        <CSVTable/>
      </div>
      
      <PublishCSVModal/>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, onUnmounted } from 'vue'
import { useCSVStore } from '@/domain/csv/store/useCSVStore'
import { useFileStore } from '@/domain/files/store/useFileStore'
import { useRateStore } from '@/domain/rates/store/useRateStore'
import PublishCSVModal from '@/views/rates/modals/PublishCSVModal.vue'
import CSVTable from '@/views/rates/components/CSVTable.vue'

const csvStore = useCSVStore()
const fileStore = useFileStore()
const rateStore = useRateStore()

const isDragging = ref(false)
const files = ref([])
const fileInput = ref()

function processFiles() {
  csvStore.errors = null
  files.value = [...fileInput.files]
  uploadFiles()
}

function selectFile(e) {
  e.preventDefault()
  fileInput.files = e.target.files
  isDragging.value = false
  processFiles()
}

function dropFile(e) {
  e.preventDefault()
  if (e.dataTransfer.files[0]['type'] !== 'text/csv') {
    console.log('not a CSV')
    csvStore.errors = { file: ['Invalid file type. Please select a CSV file with the .csv extension.'] }
    isDragging.value = false
    return;
  }

  fileInput.files = e.dataTransfer.files
  isDragging.value = false
  processFiles()
}

function dragover(e) {
  e.preventDefault()
  isDragging.value = true
}

function dragleave() {
  isDragging.value = false
}

function remove(file) {
  files.value.splice(file, 1)
  unmount()
}

function uploadFiles() {
  fileStore.store(files.value[0])
    .then(() => {
      // Parse first CSV file
      csvStore.show(fileStore.files[0].id)
    })
}

function compare() {
  let url = document.URL.replace('/import', '')
  window.open(url, '_blank')
}

function unmount() {
  fileStore.files = []
  csvStore.rows = null
  csvStore.columns = null
  csvStore.errors = null
}

onMounted(() => {
  rateStore.index()  
})

onUnmounted(() => {
  fileStore.file = null
  unmount()
})
</script>

<style lang="scss">
.dropzone-container {
    padding: 2rem;
    background: #f7fafc;
    border: 1px solid #e2e8f0;
}

.hidden-input {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
}

.file-label {
    font-size: 20px;
    display: block;
    cursor: pointer;
}

.preview-container {
    display: flex;
    margin-top: 2rem;
}

.preview-card {
    display: flex;
    border: 1px solid #a2a2a2;
    padding: 5px;
    margin-left: 5px;
}

.preview-img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    border: 1px solid #a2a2a2;
    background-color: #a2a2a2;
}
</style>
