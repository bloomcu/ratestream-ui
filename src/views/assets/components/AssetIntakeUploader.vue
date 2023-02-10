<template>
  <div>
    <MediaUploader collection="assets" :tag="tag" :maxFileSize="maxFileSize" :acceptedFileTypes="acceptedFileTypes"/>
    <MediaList :files="mediaStore.files" @destroyed="mediaStore.destroy"/>
  </div>
</template>

<script setup>
import { useMediaStore } from '@/domain/base/media/store/useMediaStore'

import MediaUploader from '@/domain/base/media/components/MediaUploader.vue'
import MediaList from '@/domain/base/media/components/MediaList.vue'

const props = defineProps({
  collection: { 
    type: String 
  },
  tag: { 
    type: String 
  },
  maxFileSize: {
    type: String,
  },
  acceptedFileTypes: {
    type: Array,
  }
})

const mediaStore = useMediaStore()
</script>

<style lang="scss">
</style>
