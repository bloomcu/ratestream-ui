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
      
      <!-- Merges - CSV columns to rate columns -->
      <!-- <div v-if="fileStore.file" class="width-50% margin-bottom-md">
        <div class="flex gap-sm margin-bottom-sm">
          <div class="text-bold" style="width: 30%;">CSV columns</div>
          <div>→</div>
          <div class="text-bold">Rate columns</div>
        </div>
        <div v-for="header in fileStore.file.headers" class="flex gap-sm margin-bottom-xxs">
          <label style="width: 30%;" :for="header">{{ header }}</label>
          <div>→</div>
          <select class="" name="">
            <option value="">Add as new column</option>
            <option value="">Don't import</option>
            <option v-for="column in columns" :value="column">{{ column }}</option>
          </select>
        </div>
      </div> -->

      <!-- Error -->
      <div v-if="csvStore.csv">
        <div v-if="csvStore.csv.errors" class="color-error bg-error bg-opacity-10% border border-error border-opacity-30% padding-xs radius-lg flex-grow">
          {{ csvStore.csv.errors.uid[0] }}
        </div>
      </div>
      
      <!-- Preview -->
      <div v-if="csvStore.csv" class="flex gap-sm justify-between items-center margin-y-sm">
        <h3>Preview</h3>
        
        <div class="flex gap-md items-center">
          <!-- Compare -->
          <a v-if="rateStore.rates.length" @click.prevent="compare()" href="" class="color-contrast-high">Compare to current rates</a>
          
          <!-- Publish -->
          <button @click="rateStore.togglePublishPromptModal()" :disabled="csvStore.csv.errors" class="btn btn--primary">Publish</button>
        </div>
      </div>
      
      <!-- Table preview -->
      <div v-if="csvStore.csv" class="">
        <CSVTable 
          :columns="csvStore.csv.columns" 
          :rows="csvStore.csv.rows"
        />
      </div>
      
      <PublishPromptModal/>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, onUnmounted } from 'vue'
import { useCSVStore } from '@/domain/csv/store/useCSVStore'
import { useFileStore } from '@/domain/files/store/useFileStore'
import { useRateStore } from '@/domain/rates/store/useRateStore'
// import AppCircleLoader from '@/app/components/base/loaders/AppCircleLoader.vue'
import PublishPromptModal from '@/views/rates/modals/PublishPromptModal.vue'
import CSVTable from '@/views/rates/components/CSVTable.vue'

const csvStore = useCSVStore()
const fileStore = useFileStore()
const rateStore = useRateStore()

const isDragging = ref(false)
const files = ref([])
const fileInput = ref()

// Setup columns
// let columns = ref(['name', 'year', 'year_low', 'year_high', 'rate', 'term'])
// let merges = ref([])
// columns.value.forEach((column) => {
//   merges[column] = ''
// })
// console.log(merges)

function processFiles() {
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
  fileStore.files = []
  csvStore.csv = null
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

onMounted(() => {
  rateStore.index()  
})

onUnmounted(() => {
  fileStore.file = null
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
