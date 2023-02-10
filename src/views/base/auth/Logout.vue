<template></template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'

const authStore = useAuthStore()

onMounted(() => {
  authStore.logout()
})
</script>
