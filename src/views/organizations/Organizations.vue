<template>
  <LayoutWithoutNavigation>
    <div class="flex items-center justify-between padding-y-md">
      <h1 class="text-lg">Organizations</h1>
      <button @click="organizationStore.toggleCreateModal" class="btn btn--subtle">
        <IconPlus size="xs" class="color-primary"/>
        <span class="margin-left-xxs">Create organization</span>
      </button>
    </div>

    <div class="padding-y-sm">
      <div class="grid gap-sm">
        <div v-for="(organization, index) in organizationStore.organizations" :key="index" class="col-3">
          <RouterLink :to="{ name: 'assets', params: { organization: organization.slug }}" class="card card--is-link height-xxxl flex flex-column">
            <h3 class="text-md">{{ organization.title }}</h3>
          </RouterLink>
        </div>
      </div>
    </div>
    
    <CreateOrganizationModal/>
  </LayoutWithoutNavigation>
</template>

<script setup>
// TODO
// TODO: Organizations index should derive from the user.
// TODO
import { onMounted } from 'vue'
import { useOrganizationStore } from '@/domain/organizations/store/useOrganizationStore'

import LayoutWithoutNavigation from '@/app/layouts/LayoutWithoutNavigation.vue'
import IconPlus from '@/app/components/icons/IconPlus.vue'
import CreateOrganizationModal from '@/views/organizations/modals/CreateOrganizationModal.vue'

const organizationStore = useOrganizationStore()

onMounted(() => {
    organizationStore.index()
})
</script>
