<template>
  <LayoutDefault v-if="designStore.design" maxWidth="sm">
    <div class="container padding-y-md">
      <div class="margin-bottom-md">
        <RouterLink :to="{ name: 'designs' }" class="btn btn--subtle margin-bottom-md">
          <IconAngleLeft size="xs" class="color-primary"/>
          <span class="margin-left-xxs">Back</span>
        </RouterLink>
        
        <h1 class="text-lg margin-bottom-sm">{{ designStore.design.title }}</h1>
      </div>
      
      <form action="#" @submit.prevent="update()">
        <!-- General -->
        <div class="card card--shadow margin-bottom-md">
          <div class="margin-bottom-sm">
            <p class="text-bold">General</p>
          </div>
          
          <div class="margin-bottom-md">
            <AppInput v-model="designStore.design.designer_name" label="Designer name" required />
            <AppInput v-model="designStore.design.designer_email" label="Designer email" required />
          </div>
          
          <button v-if="updated" type="submit" class="btn btn--primary btn--md width-100%" disabled>Design Updated</button>
          <button v-else type="submit" class="btn btn--primary btn--md width-100%">Update</button>
        </div>
      </form>
    </div>
  </LayoutDefault>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDesignStore } from '@/domain/designs/store/useDesignStore'
import LayoutDefault from '@/app/layouts/LayoutDefault.vue'
import IconAngleLeft from '@/app/components/base/icons/IconAngleLeft.vue'
import AppInput from '@/app/components/base/forms/AppInput.vue'

const route = useRoute()
const designStore = useDesignStore()
const updated = ref(false)

onMounted(() => {
    designStore.show(route.params.design)
})

function update() {
  designStore.update()
  updated.value = true
}
</script>
