<template>
  <LayoutWithoutNavigation>
    <div class="container max-width-xs flex items-center justify-between padding-y-md">
      <h1 class="text-lg">Tag Groups</h1>
      <button @click="tagStore.toggleCreateModal()" class="btn btn--primary">Create Tag Group</button>
    </div>

    <div class="container max-width-xs padding-y-md">
      <div v-for="tag in tagStore.tags" :key="tag.id" class="app-card text-component padding-md margin-bottom-sm">
        <h2 class="text-md">{{ tag.title }}</h2>
        <p class="text-sm">{{ tag.children_count }} tags</p>
      </div>
    </div>

    <CreateTagModal/>
  </LayoutWithoutNavigation>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTagStore } from '@/domain/tags/store/useTagStore'

import LayoutWithoutNavigation from '@/app/layouts/LayoutWithoutNavigation.vue'
import CreateTagModal from '@/views/tags/modals/CreateTagModal.vue'

const tagStore = useTagStore()

onMounted(() => {
    tagStore.index()
})
</script>
