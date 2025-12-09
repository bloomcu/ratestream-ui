<template>
  <LayoutDefault>
    <div class="container max-width-sm flex items-center justify-between margin-y-md">
      <h1 class="text-lg">People</h1>
    </div>
    
    <div class="container max-width-sm">
      <!-- Invitations -->
      <div class="card card--shadow margin-bottom-md">
        
        <!-- Form -->
        <form @submit.prevent="submit()">
          <h2 class="text-base margin-bottom-xs">Invite teammates</h2>
          <p class="text-sm color-contrast-medium margin-bottom-sm">Provide the email address of a teammate, and an invitation will be sent to them.</p>
          <div class="grid gap-x-sm">
            <div class="col-9">
              <input v-model="email" :class="errorStore.errors.email ? 'form-control--error' : ''" class="form-control width-100%" type="text" name="invitee-email" placeholder="Email" required>
            </div>
            <div class="col-3">
              <button v-if="sendingInvite" class="btn btn--primary width-100% height-100%" disabled>Sending...</button>
              <button v-else class="btn btn--primary width-100% height-100%">Send invite</button>
            </div>
            <div v-if="errorStore.errors.email" class="bg-error bg-opacity-20% padding-xs radius-md text-sm color-contrast-higher margin-top-xxs" role="alert">
              <p>{{ errorStore.errors.email[0] }}</p>
            </div>
          </div>
        </form>
        
        <!-- Invitations list -->
        <div v-if="inviteStore.invitations && inviteStore.invitations.length"  class="margin-top-lg">
          <h2 class="text-sm">Invited</h2>
          <table class="table table--expanded position-relative z-index-1 width-100% text-unit-em text-sm">
            <tbody class="table__body">
              <tr 
                v-for="invite in inviteStore.invitations" 
                :key="invite.uuid" 
                class="table__row"
              >
                <td class="table__cell padding-xxs" role="cell">
                  <p class="font-medium">{{ invite.email }}</p>
                </td>
                <td class="table__cell padding-xxs" role="cell">
                  {{ moment(invite.created_at).fromNow() }}
                </td>
                <td class="table__cell text-right padding-xxs" role="cell">
                  <ButtonCopyToClipboard :value="invite.url" class="btn btn--sm btn--subtle width-100%">
                    Copy invite URL
                  </ButtonCopyToClipboard>
                </td>
                <td class="table__cell padding-xxs" role="cell">
                  <ButtonDestroy @click="inviteStore.destroy(invite.uuid)"/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Users -->
      <div class="card card--shadow margin-bottom-lg">
        <h2 class="text-base margin-bottom-xs">My team</h2>
        <table class="table table--expanded position-relative z-index-1 min-width-100% max-width-100% text-unit-em text-sm">
          <thead class="table__header">
            <tr class="table__row">
              <th class="table__cell text-left padding-xxs" scope="col">User</th>
              <th class="table__cell text-left padding-xxs" scope="col">Role</th>
              <th class="table__cell text-right padding-xxs" scope="col">Joined</th>
            </tr>
          </thead>
          <tbody class="table__body">
            <tr 
              v-for="user in userStore.users"
              :key="user.id"
              class="table__row"
            >
              <td class="table__cell flex items-center padding-xxs" role="cell">
                <UserAvatar :name="user.name" size="lg"/>
                <div class="padding-left-sm">
                  <p class="font-medium margin-bottom-xxxxs">{{ user.name }}</p>
                  <p class="color-contrast-medium">{{ user.email }}</p>
                </div>
              </td>
              <td class="table__cell padding-xxs" role="cell">
                <AppChip color="outline">
                  {{ user.role }}
                </AppChip>
              </td>
              <td class="table__cell text-right padding-xxs" role="cell">
                {{ moment(user.created_at).fromNow() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </LayoutDefault>
</template>

<script setup>
import moment from "moment"
import { ref, onMounted } from 'vue'
import { useErrorStore } from '@/app/store/base/useErrorStore'
import { useInvitationStore } from '@/domain/base/invitations/store/useInvitationStore'
import { useUserStore } from '@/domain/base/users/store/useUserStore'
import LayoutDefault from '@/app/layouts/LayoutDefault.vue'
import UserAvatar from '@/domain/base/users/components/UserAvatar.vue'
import AppChip from '@/app/components/base/chips/AppChip.vue'
import ButtonDestroy from '@/app/components/base/buttons/ButtonDestroy.vue'
import ButtonCopyToClipboard from '@/app/components/base/buttons/ButtonCopyToClipboard.vue'

const errorStore = useErrorStore()
const inviteStore = useInvitationStore()
const userStore = useUserStore()

const email = ref('')
const sendingInvite = ref(false)

function submit() {
  sendingInvite.value = true
  
  inviteStore.store(email).then(() => {
    email.value = ''
    sendingInvite.value = false
  }).catch((error) => {
    sendingInvite.value = false
  })
}

onMounted(() => {
  inviteStore.index()
  userStore.index()
})
</script>
