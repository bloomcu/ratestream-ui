<template>
  <LayoutWithoutNavigation>
    <div class="container max-width-xxs padding-top-lg">
      <form class="login-form" action="#" @submit.prevent="submit">
        <!-- Success message -->
        <div v-if="authStore.passwordResetEmailSent" class="text-component radius-lg bg-success bg-opacity-10% border border-2 border-success padding-md margin-bottom-sm">
          <h3 class="flex items-center">
            <IconCheck size="sm" class="color-success margin-right-xxxs"/>
            Check your inbox
          </h3>
          <p>If an account with that email exists, a password reset email has been sent.</p>
        </div>
        
        <!-- Form -->
        <div v-else>
          <div class="text-component text-center margin-bottom-sm">
            <h1>Forgot your password?</h1>
          </div>
          
          <div v-if="errorStore.errors.credentials" class="bg-error bg-opacity-20% padding-xs radius-md text-sm color-contrast-higher margin-bottom-xs" role="alert">
            <p>{{ errorStore.errors.credentials[0] }}</p>
          </div>
          
          <div class="text-center margin-bottom-md">
            <p>Enter your email and we’ll email you a link to reset your password.</p>
          </div>
          
          <AppInput v-model="inputs.email" label="Email" placeholder="email@email.com" required autofocus />

          <div class="margin-bottom-md">
            <AppSubmit :loading="authStore.passwordResetEmailSending">Send reset link</AppSubmit>
          </div>
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
import { ref, onMounted } from 'vue'
import { useErrorStore } from '@/app/store/base/useErrorStore'
import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'
import LayoutWithoutNavigation from '@/app/layouts/LayoutWithoutNavigation.vue'
import IconCheck from '@/app/components/base/icons/IconCheck.vue'
import AppInput from '@/app/components/base/forms/AppInput.vue'
import AppSubmit from '@/app/components/base/forms/AppSubmit.vue'

const errorStore = useErrorStore()
const authStore = useAuthStore()

const inputs = ref({
  email: ''
})

function submit() {
  const { email } = inputs.value
  authStore.requestPasswordReset(email)
}

onMounted(() => {
  authStore.passwordResetEmailSent = false
  authStore.passwordResetEmailSending = false
})
</script>
