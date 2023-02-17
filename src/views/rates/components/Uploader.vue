<template>
  <div class="margin-bottom-md">
      <div
        class="dropzone-container margin-bottom-sm"
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
          <div v-else>Drop CSV file here or <u>click to select</u></div>
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
            <option value="">Add as new field</option>
            <option value="">Don't import</option>
            <option v-for="column in columns" :value="column">{{ column }}</option>
          </select>
        </div>
      </div> -->
      
      <!-- Publish button -->
      <div v-if="fileStore.file" class="flex gap-sm items-center float-right margin-y-sm">
        <a @click.prevent="compare()" href="" class="color-contrast-high">Compare to current rates</a>
        <button @click="rateStore.togglePublishPromptModal()" class="btn btn--primary">Publish</button>
        
        <!-- <router-link :to="{name: 'rates'}" class="color-contrast-high">Compare to current rates</router-link> -->
        <!-- <button @click="runImport()" class="btn btn--primary">
          <span v-if="rateStore.isImporting" class="flex gap-xs items-center">
            <AppCircleLoader/>
            Importing
          </span>
          <span v-else>Import</span>
        </button> -->
      </div>
      
      <!-- Publish button -->
      <div class="">
        
      </div>
      
      <!-- Table preview -->
      <div v-if="fileStore.file" class="">
        <table class="table table--expanded position-relative z-index-1 width-100% text-unit-em text-sm" aria-label="Table Example">
          <thead class="table__header">
            <tr class="table__row">
              <th 
                v-for="(header, index) in fileStore.file.headers"
                class="table__cell text-left" 
                scope="col"
              >
              {{ header }}
              </th>
            </tr>
          </thead>
          
          <tbody class="table__body">
            <tr v-for="(rate, index) in fileStore.file.csv" class="table__row">
              <td class="table__cell" role="cell">
                {{ rate.group }}
              </td>

              <td class="table__cell" role="cell">
                {{ rate.name }}
              </td>

              <td class="table__cell" role="cell">
                {{ rate.year }}
              </td>
              
              <td class="table__cell" role="cell">
                {{ rate.year_low }}
              </td>
              
              <td class="table__cell" role="cell">
                {{ rate.year_high }}
              </td>
              
              <td class="table__cell" role="cell">
                {{ rate.rate }}
              </td>
              
              <td class="table__cell" role="cell">
                {{ rate.term }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <PublishPromptModal/>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onUnmounted } from 'vue'
import { useFileStore } from '@/domain/files/store/useFileStore'
import { useRateStore } from '@/domain/rates/store/useRateStore'
// import AppCircleLoader from '@/app/components/base/loaders/AppCircleLoader.vue'
import PublishPromptModal from '@/views/rates/modals/PublishPromptModal.vue'

const fileStore = useFileStore()
const rateStore = useRateStore()

const isDragging = ref(false)
const files = ref([])
const fileInput = ref()

// Setup columns
let columns = ref(['name', 'year', 'year_low', 'year_high', 'rate', 'term'])
// let merges = ref([])
// columns.value.forEach((column) => {
//   merges[column] = ''
// })
// console.log(merges)

function cacheFiles() {
  files.value = [...fileInput.files]
  uploadFiles()
}

function selectFile(e) {
  e.preventDefault()
  fileInput.files = e.target.files
  isDragging.value = false
  cacheFiles()
}

function dropFile(e) {
  e.preventDefault()
  fileInput.files = e.dataTransfer.files
  isDragging.value = false
  cacheFiles()
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
}

function uploadFiles() {
    fileStore.store(files.value[0])
}

function compare() {
  let url = document.URL.replace('/import', '')
  window.open(url, '_blank')
}
// function generateURL(file) {
//     let fileSrc = URL.createObjectURL(file)
// 
//     setTimeout(() => {
//         URL.revokeObjectURL(fileSrc)
//     }, 1000)
// 
//     return fileSrc;
// }

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
