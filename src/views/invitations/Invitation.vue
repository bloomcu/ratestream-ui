<template>
  <div>
    <!-- <div class="flex items-center justify-between padding-y-sm padding-x-md">
        <div>Logo</div>
        <a style="text-decoration: none;" class="reset color-contrast-medium" href="#" target="_blank">What is <span class="text-bold color-primary">BloomCU</span>?</a>
    </div> -->
    
    <div class="container max-width-lg padding-top-xxl">
      <div v-if="invitationStore.invitation && !invitationStore.isLoading" class="grid gap-xl">
        <div class="col-6 flex flex-column gap-md">
          <div class="text-component">
            <!-- <div>Organization logo</div> -->
            <h1 class="text-xxxl">
              You've been invited to join the 
              <span class="color-primary">{{ invitationStore.invitation.organization.title }}</span> team
            </h1>
            <p class="text-md">Join forces with the team and help build your next website.</p>
          </div>
          
          <div class="flex items-center">
            <AppUserAvatar :name="invitationStore.invitation.user.name"/>
            <div class="padding-left-xs">
              <p class="color-contrast-medium text-xs">Invited by</p>
              <p class="text-sm text-bold">{{ invitationStore.invitation.user.name }}</p>
            </div>
          </div>
        </div>
        
        <div class="col-5">
          <form class="login-form" action="#" @submit.prevent="register()">
            <div class="grid gap-x-sm">
              <AppInput v-model="inputs.name" label="Full name" :errors="errorStore.errors.name" required autofocus />
              <AppInput v-model="inputs.email" label="Email" required disabled />
              <AppInput v-model="inputs.password" type="password" label="Password" :errors="errorStore.errors.password" required />
              <AppInput v-model="inputs.password_confirmation" type="password" label="Confirm password" required />
            </div>

            <div class="margin-bottom-sm">
              <button class="btn btn--primary btn--md width-100%">Join</button>
            </div>
          </form>
        </div>
      </div>
      
      <InvitationSkeletonLoader v-else/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useErrorStore } from '@/app/store/useErrorStore'
import { useAuthStore } from '@/domain/auth/store/useAuthStore'
import { useInvitationStore } from '@/domain/invitations/store/useInvitationStore'
import AppInput from '@/app/components/forms/AppInput.vue'
import AppUserAvatar from '@/app/components/AppUserAvatar.vue'
import InvitationSkeletonLoader from '@/views/invitations/loaders/InvitationSkeletonLoader.vue'

const route = useRoute()
const errorStore = useErrorStore()
const authStore = useAuthStore()
const invitationStore = useInvitationStore()

const inputs = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

function register() {
  const { name, email, password, password_confirmation } = inputs.value
  authStore.registerWithInvitation(route.params.invitation, name, email, password, password_confirmation)
}

onMounted(() => {
  invitationStore.show(route.params.invitation)
    .then(() => {
      inputs.value.email = invitationStore.invitation.email
    })
})
</script>
