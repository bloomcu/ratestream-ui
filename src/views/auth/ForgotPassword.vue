<template>
  <LayoutWithoutNavigation>
    <div class="container max-width-xxs padding-top-lg">
      <form class="login-form" action="#" @submit.prevent="submit">
        <div class="text-component text-center margin-bottom-sm">
          <h2>Forgot your password?</h2>
        </div>
        
        <div class="text-center margin-bottom-md">
          <p class="text-sm">Enter the email address associated with your account, and we’ll email you a link to reset your password.</p>
        </div>
        
        <AppInput v-model="inputs.email" label="Email" placeholder="email@email.com" required autofocus />

        <div class="margin-bottom-md">
          <button class="btn btn--primary btn--md width-100%">Send reset link</button>
        </div>
        
        <div class="text-center text-component">
          <p class="text-sm">
            <RouterLink :to="{ name: 'login' }">Return to log in</RouterLink>
          </p>
        </div>
        
      </form>
    </div>
  </LayoutWithoutNavigation>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/domain/auth/store/useAuthStore'
import LayoutWithoutNavigation from '@/app/layouts/LayoutWithoutNavigation.vue'
import AppInput from '@/app/components/forms/AppInput.vue'

const authStore = useAuthStore()

const inputs = ref({
  email: ''
})

function submit() {
  console.log('Password reset is not enabled')
}
</script>
