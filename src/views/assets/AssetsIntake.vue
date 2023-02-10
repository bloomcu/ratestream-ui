<template>  
  <div v-if="mediaStore.files" class="flex margin-auto height-100vh">
    <!-- Left -->
    <div class="flex flex-column justify-between bg-primary bg-opacity-5% border-right padding-top-xs" style="flex: 1 0 25%; position: sticky; top: 0; left: 0;">
      <div class="flex contents padding-lg">
        <AssetIntakeSteps :step="steps[step].name" @changeStep="changeStep"/>
      </div>
      
      <div class="_color-white padding-x-lg">
        <h1 class="_color-white margin-bottom-sm">{{ steps[step].title }}</h1>
        <!-- <p v-if="steps[step].description" class="margin-bottom-md" v-html="steps[step].description"></p> -->
      </div>
      
      <div class="flex justify-between bg border-top padding-y-sm padding-x-md">
        <button v-if="step > 0" @click="previousStep()" type="button" name="button" class="btn btn--subtle">Back</button>
        <button v-if="step != (steps.length - 1)" @click="nextStep()" type="button" name="button" class="btn btn--primary margin-left-auto">Next Step</button>
      </div>
    </div>
    
    <!-- Right -->
    <div class="flex flex-column" style="flex: 1 0 50%; position: relative; overflow-y: scroll;">
      <!-- Steps -->
      <div class="padding-x-xl padding-top-lg">
        <div class="flex-grow padding-bottom-xxl">
          <h4 v-if="steps[step].instructions" class="margin-bottom-sm" v-html="steps[step].instructions"></h4>
          <p v-if="steps[step].description" class="margin-bottom-md" v-html="steps[step].description"></p>
          <component 
            v-for="(component, index) in steps[step].components"
            :is="component.name"
            :key="component.key"
            v-bind="component"
          />
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import AssetIntakeSteps from '@/views/assets/components/AssetIntakeSteps.vue'
import AssetIntakeUploader from '@/views/assets/components/AssetIntakeUploader.vue'
import AssetIntakeDoDont from '@/views/assets/components/AssetIntakeDoDont.vue'

export default defineComponent({
    components: {
      AssetIntakeUploader,
      AssetIntakeDoDont,
    }
})    
</script>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useMediaStore } from '@/domain/base/media/store/useMediaStore'

const mediaStore = useMediaStore()
const step = ref(0)

watch(step, () => {
  mediaStore.index({ 'filter[tags.slug]': steps[step.value].name })
})

onMounted(() => {
  mediaStore.index({ 'filter[tags.slug]': steps[step.value].name })
})

const progress = computed(() => {
  return (step.value + 1) / steps.length * 100
})

function nextStep() {
  step.value = step.value + 1
}

function previousStep() {
  step.value = step.value - 1
}

function changeStep(number) {
  step.value = number
}

function destroyFile(file) {
  mediaStore.destroy(file)
}

const steps = [
  {
    name: 'brand',
    title: 'Brand Guide',
    instructions: 'Upload your brand usage guide document(s) here.',
    description: 'Max file size: 100MB',
    components: [
      {
        key: 1,
        name: 'AssetIntakeUploader',
        collection: 'assets',
        tag: 'brand',
      }
    ],
  },
  {
    name: 'brand',
    title: 'Brand Do\'s and Don\'ts',
    instructions: 'What Do\'s and Don\'ts should we know about for your brand?',
    description: '',
    components: [
      {
        key: 2,
        name: 'AssetIntakeDoDont',
        collection: 'assets',
        group: 'brand',
      }
    ],
  },
  {
    name: 'logo',
    title: 'Logo',
    instructions: 'Upload your logo(s) here.',
    description: 'Formats: SVG • Max file size: 100MB',
    components: [
      {
        key: 3,
        name: 'AssetIntakeUploader',
        collection: 'assets',
        tag: 'logo',
        acceptedFileTypes: ['image/svg+xml'],
      }
    ],
  },
  {
    name: 'logo',
    title: 'Logo Do\'s and Don\'ts',
    instructions: 'What Do\'s and Don\'ts should we know about for your logo?',
    description: '',
    components: [
      {
        key: 4,
        name: 'AssetIntakeDoDont',
        collection: 'assets',
        group: 'logo',
      }
    ],
  },
  {
    name: 'font',
    title: 'Desktop Fonts',
    instructions: 'Upload your fonts for desktop use.',
    description: 'Formats: TTF, TTC or OTF • Max file size: 100MB',
    components: [
      {
        key: 5,
        name: 'AssetIntakeUploader',
        collection: 'assets',
        tag: 'font',
        acceptedFileTypes: ['font/ttf', 'font/ttc', 'font/otf'],
      }
    ],
  },
  {
    name: 'font',
    title: 'Web Fonts',
    instructions: 'Upload your fonts for web use.',
    description: 'Formats: TTF, OTF, WOFF, WOFF2 or EOT • Max file size: 100MB',
    components: [
      {
        key: 6,
        name: 'AssetIntakeUploader',
        collection: 'assets',
        tag: 'font',
        acceptedFileTypes: ['font/ttf', 'font/otf', 'font/woff', 'font/woff2', 'font/eot'],
      }
    ],
  },
  {
    name: 'font',
    title: 'Font Do\'s and Don\'ts',
    instructions: 'What Do\'s and Don\'ts should we know about for your fonts?',
    description: '',
    components: [
      {
        key: 7,
        name: 'AssetIntakeDoDont',
        collection: 'assets',
        group: 'font',
      }
    ],
  },
  {
    name: 'photo',
    title: 'Images',
    instructions: 'Upload 5-10 sample images',
    description: 'Upload 5-10 images that are good examples of the kinds of images you want on your website. <br><br> Formats: JPG, JPEG, PNG or SVG • Max file size: 100MB',
    components: [
      {
        key: 8,
        name: 'AssetIntakeUploader',
        collection: 'assets',
        tag: 'photo',
        acceptedFileTypes: ['image/jpg', 'image/jpeg', 'image/png', 'image/svg+xml'],
      }
    ],
  },
  {
    name: 'photo',
    title: 'Images Do\'s and Don\'ts',
    instructions: 'What Do\'s and Don\'ts should we know about for your images?',
    description: '',
    components: [
      {
        key: 9,
        name: 'AssetIntakeDoDont',
        collection: 'assets',
        group: 'photo',
      }
    ],
  },
  {
    name: 'other',
    title: 'Other Media',
    instructions: 'Upload other brand media such as patterns, icons or other graphics.',
    description: 'Max file size: 100MB',
    components: [
      {
        key: 10,
        name: 'AssetIntakeUploader',
        collection: 'assets',
        tag: 'other',
      }
    ],
  },
  {
    name: 'other',
    title: 'Other Media Do\'s and Don\'ts',
    instructions: 'What Do\'s and Don\'ts should we know about for your other media?',
    description: '',
    components: [
      {
        key: 11,
        name: 'AssetIntakeDoDont',
        collection: 'assets',
        group: 'other',
      }
    ],
  },
  {
    name: 'other',
    title: 'Finished',
    instructions: 'Thank you! You can close this window.',
    description: '',
    components: [],
  },
]
</script>
