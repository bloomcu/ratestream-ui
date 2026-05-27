<template>
  <LayoutDefault maxWidth="lg">
    <div class="margin-y-md">
      <h1 class="text-lg">Settings</h1>
    </div>

    <div class="grid gap-md">
      <RouterLink
        :to="{ name: 'settings-embed', params: { organization: auth.organization } }"
        class="card card--is-link col-6@md"
      >
        <div class="text-component">
          <h3 class="text-md">Website embed</h3>
          <p>Install RateStream on your website with the embed script.</p>
        </div>
      </RouterLink>

      <RouterLink
        v-if="canManageSyncKey"
        :to="{ name: 'settings-sync-key', params: { organization: auth.organization } }"
        class="card card--is-link col-6@md"
      >
        <div class="text-component">
          <h3 class="text-md">RateStream sync key</h3>
          <p>Manage the key used by WordPress to verify sync requests.</p>
        </div>
      </RouterLink>
    </div>
  </LayoutDefault>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'
import LayoutDefault from '@/app/layouts/LayoutDefault.vue'

const auth = useAuthStore()

const canManageSyncKey = computed(() => {
  return ['admin', 'super_admin'].includes(auth.user?.role)
})
</script>
