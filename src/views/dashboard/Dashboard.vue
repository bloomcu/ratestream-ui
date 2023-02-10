<template>
  <LayoutDefault maxWidth="md">
    <div class="flex">
      <!-- <aside class="position-relative z-index-1 width-100% max-width-xxxxs padding-y-sm padding-right-md border-right">
        <AppNestedMenu title="tags" :items="tags"/>
      </aside> -->
      
      <main class="position-relative z-index-1 flex-grow height-auto padding-y-md padding-x-lg">
        <div 
          v-for="task in tasks" 
          :key="task.id" 
          :class="task.status == 'waiting' ? 'card--dark' : 'card--shadow'"
          class="card margin-bottom-xs"
        >
          <div :class="task.status == 'waiting' ? 'color-contrast-low' : ''">
            <p class="text-md text-bold margin-bottom-xs">{{ task.title }}</p>
            <p class="margin-bottom-sm">{{ task.description }}</p>
          </div>
          <RouterLink 
            :to="{ name: task.action_route, params: { organization: auth.organization }}" 
            :class="task.status == 'waiting' ? 'btn--disabled' : ''"
            class="btn btn--primary"
          >
            {{ task.action_label }}
          </RouterLink>
        </div>
      </main>      
    </div>
  </LayoutDefault>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'

import LayoutDefault from '@/app/layouts/LayoutDefault.vue'

const auth = useAuthStore()

const tasks = [
  {
    id: 1,
    title: 'Upload your brand assets',
    description: 'Complete an intake form that asks for your brand assets.',
    action_label: 'Start intake form',
    action_route: 'assetsIntake',
    status: 'ready',
  },
  {
    id: 2,
    title: 'Crawl your content',
    description: 'Start an inventory of your content by crawling your current website.',
    action_label: 'Start a crawl',
    action_route: 'crawls',
    status: 'ready',
  },
  {
    id: 3,
    title: 'Review content',
    description: 'Review the categories we have assigned to your content items.',
    action_label: 'Review content',
    action_route: 'content',
    status: 'ready',
  },
]
</script>
