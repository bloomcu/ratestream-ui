<template>
  <LayoutWithoutNavigation>
    <div class="container max-width-xxs padding-top-lg">
      <form class="login-form" action="#" @submit.prevent="submit">
        <!-- Success message -->
        <div v-if="authStore.passwordReset" class="text-component radius-lg bg-success bg-opacity-10% border border-2 border-success padding-md margin-bottom-sm">
          <h2 class="flex items-center">
            <IconCheck size="md" class="color-success margin-right-xxxs"/>
            Success!
          </h2>
          <p>Your password has been reset.</p>
          <RouterLink :to="{ name: 'login' }" class="btn btn--primary width-100%">Login now</RouterLink>
        </div>
        
        <!-- Form -->
        <div v-else>
          <div class="text-component text-center margin-bottom-sm">
            <h1>New password</h1>
            <p>Enter your new password</p>
          </div>
          
          <div v-if="errorStore.errors.password" class="bg-error bg-opacity-20% padding-xs radius-md text-sm color-contrast-higher margin-bottom-xs" role="alert">
            <p>{{ errorStore.errors.password[0] }}</p>
          </div>
          
          <AppInput v-model="inputs.password" type="password" label="Password" required />
          <AppInput v-model="inputs.password_confirmation" type="password" label="Confirm password" required />
          <AppPasswordChecker :password="inputs.password"/>

          <div class="margin-bottom-md">
            <AppSubmit :loading="authStore.passwordResetting">Reset password</AppSubmit>
          </div>
          
          <div class="text-center text-component">
            <p class="text-sm">
              <RouterLink :to="{ name: 'login' }">Return to log in</RouterLink>
            </p>
          </div>
        </div>
      </form>
    </div>
  </LayoutWithoutNavigation>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useErrorStore } from '@/app/store/base/useErrorStore'
import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'
import LayoutWithoutNavigation from '@/app/layouts/LayoutWithoutNavigation.vue'
import IconCheck from '@/app/components/base/icons/IconCheck.vue'
import AppInput from '@/app/components/base/forms/AppInput.vue'
import AppSubmit from '@/app/components/base/forms/AppSubmit.vue'
import AppPasswordChecker from '@/app/components/base/forms/AppPasswordChecker.vue'

const route = useRoute()
const errorStore = useErrorStore()
const authStore = useAuthStore()

const inputs = ref({
  password: '',
  password_confirmation: ''
})

function submit() {
  const { password, password_confirmation } = inputs.value
  authStore.resetPassword(route.query.token, route.query.email, password, password_confirmation)
}

onMounted(() => {
  authStore.passwordResetting = false
  authStore.passwordReset = false
})
</script>
