<template>
  <LayoutWithoutNavigation v-if="organizationStore.organization">
    <div class="container max-width-sm padding-y-md">
      <div class="margin-bottom-md">
        <RouterLink :to="{ name: 'organizations' }" class="btn btn--subtle margin-bottom-md">
          <IconAngleLeft size="xs" class="color-primary"/>
          <span class="margin-left-xxs">Back</span>
        </RouterLink>

        <h1 class="text-lg">{{ organizationStore.organization.title }}</h1>
      </div>

      <form action="#" @submit.prevent="update()">
        <div class="card card--shadow margin-bottom-md">
          <div class="margin-bottom-sm">
            <p class="text-bold">General</p>
          </div>

          <AppInput
            v-model="organizationStore.organization.title"
            label="Title"
            :errors="errorStore.errors.title"
            required
          />
          <AppInput
            v-model="organizationStore.organization.slug"
            label="Slug"
            disabled
            required
          />
          <AppInput
            v-model="organizationStore.organization.rates_domain"
            label="Rates domain"
            :errors="errorStore.errors.rates_domain"
          />
        </div>

        <div class="margin-bottom-sm">
          <button type="submit" class="btn btn--primary btn--md width-100%">Update</button>
        </div>
      </form>
    </div>
  </LayoutWithoutNavigation>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useErrorStore } from '@/app/store/base/useErrorStore'
import { useOrganizationStore } from '@/domain/base/organizations/store/useOrganizationStore'
import LayoutWithoutNavigation from '@/app/layouts/LayoutWithoutNavigation.vue'
import IconAngleLeft from '@/app/components/base/icons/IconAngleLeft.vue'
import AppInput from '@/app/components/base/forms/AppInput.vue'

const route = useRoute()
const errorStore = useErrorStore()
const organizationStore = useOrganizationStore()

onMounted(() => {
  organizationStore.show()
})

function update() {
  organizationStore.update(route.params.organization)
}
</script>
