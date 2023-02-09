<template>
  <div class="container max-width-xxs padding-top-xxl">
    <div class="text-component text-center">
      <span class="text-xxxl">👮‍♀️</span>
      <h1 class="text-xxxl">Not allowed</h1>
      <p class="text-md">Sorry, you don't have access to this.</p>
      <RouterLink :to="{ name: 'dashboard', params: { organization: authStore.organization}}" class="btn btn--primary">
        Dashboard
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/domain/auth/store/useAuthStore'
const authStore = useAuthStore()
</script>
