<template>
  <div class="main">
      <div
        class="dropzone-container"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop"
      >
        <input
          @change="onChange"
          type="file"
          name="fileInput"
          ref="fileInput"
          id="fileInput"
          class="hidden-input"
          accept=".csv"
        />

        <label for="fileInput" class="file-label">
          <div v-if="isDragging">Release to drop files here.</div>
          <div v-else>Drop files here or <u>click here</u> to upload.</div>
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
      
      <div class="">
        <div v-for="column in columnsToMap" class="">
          {{ column }}
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, toRef, reactive } from 'vue'

// let data = reactive({
//   isDragging: false,
//   files: [],
// })
const isDragging = ref(false)
const files = ref([])
const fileInput = ref()

// Setup columns
let columns = ref([])
let columnsToMap = ref(['group', 'name', 'rate', 'term', 'year_low', 'year_high'])

columnsToMap.value.forEach((column) => {
  columns[column] = ''
})

console.log(columns)

function onChange() {
  files.value = [...fileInput.files]
  console.log(files)
}

function dragover(e) {
  e.preventDefault()
  isDragging.value = true
}

function dragleave() {
  isDragging.value = false
}

function drop(e) {
  e.preventDefault()
  fileInput.files = e.dataTransfer.files
  isDragging.value = false
  onChange()
}

function remove(file) {
  files.value.splice(file, 1)
}

function generateURL(file) {
    let fileSrc = URL.createObjectURL(file)
    
    setTimeout(() => {
        URL.revokeObjectURL(fileSrc)
    }, 1000)
    
    return fileSrc;
}

function uploadFiles() {
    const formData = new FormData();
    
    files.value.forEach((file) => {
        formData.append("selectedFiles", file);
    });

    // axios({
    //     method: "POST",
    //     url: "http://path/to/api/upload-files",
    //     data: formData,
    //     headers: {
    //         "Content-Type": "multipart/form-data",
    //     },
    // });
}
</script>

<style lang="scss">
.main {
    // display: flex;
    // flex-grow: 1;
    // align-items: center;
    // height: 100vh;
    // justify-content: center;
    // text-align: center;
    margin-bottom: 30px;
}

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
