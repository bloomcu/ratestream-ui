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
              <th v-if="canDeleteUsers" class="table__cell text-right padding-xxs" scope="col">Actions</th>
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
              <td v-if="canDeleteUsers" class="table__cell text-right padding-xxs" role="cell">
                <button
                  v-if="canDeleteUser(user)"
                  class="app-action-icon app-action-icon--danger reset margin-left-auto"
                  type="button"
                  :aria-label="`Delete ${user.name || user.email}`"
                  @click="openDeleteModal(user)"
                >
                  <IconTrash/>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <AppModal
      size="xxs"
      @closed="closeDeleteModal()"
      :class="selectedUser ? 'modal--is-visible' : ''"
    >
      <div class="margin-bottom-md">
        <h2 class="text-md margin-bottom-sm">Delete user?</h2>
        <p>
          This removes login access for
          <strong>{{ selectedUserLabel }}</strong>.
          Their rates, files, and other records will stay in place.
        </p>
      </div>

      <div class="flex gap-md items-center justify-between">
        <button
          type="button"
          class="btn btn--accent"
          :disabled="isDeletingUser"
          @click="closeDeleteModal()"
        >
          Cancel
        </button>

        <button
          type="button"
          class="btn btn--destructive"
          :disabled="isDeletingUser"
          @click="confirmDeleteUser()"
        >
          <span v-if="isDeletingUser" class="flex gap-xs items-center">
            <AppCircleLoader/>
            Deleting
          </span>
          <span v-else>Delete user</span>
        </button>
      </div>
    </AppModal>
  </LayoutDefault>
</template>

<script setup>
import moment from "moment"
import { computed, ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useErrorStore } from '@/app/store/base/useErrorStore'
import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'
import { useInvitationStore } from '@/domain/base/invitations/store/useInvitationStore'
import { useUserStore } from '@/domain/base/users/store/useUserStore'
import LayoutDefault from '@/app/layouts/LayoutDefault.vue'
import UserAvatar from '@/domain/base/users/components/UserAvatar.vue'
import AppChip from '@/app/components/base/chips/AppChip.vue'
import ButtonDestroy from '@/app/components/base/buttons/ButtonDestroy.vue'
import ButtonCopyToClipboard from '@/app/components/base/buttons/ButtonCopyToClipboard.vue'
import AppModal from '@/app/components/base/modals/AppModal.vue'
import AppCircleLoader from '@/app/components/base/loaders/AppCircleLoader.vue'
import IconTrash from '@/app/components/base/icons/IconTrash.vue'

const errorStore = useErrorStore()
const auth = useAuthStore()
const inviteStore = useInvitationStore()
const userStore = useUserStore()

const email = ref('')
const sendingInvite = ref(false)
const selectedUser = ref(null)
const isDeletingUser = ref(false)

const canDeleteUsers = computed(() => {
  return ['admin', 'super_admin'].includes(auth.user?.role)
})

const adminUserCount = computed(() => {
  return userStore.users?.filter((user) => user.role === 'admin').length || 0
})

const selectedUserLabel = computed(() => {
  if (!selectedUser.value) return 'this user'
  if (selectedUser.value.name && selectedUser.value.email) {
    return `${selectedUser.value.name} (${selectedUser.value.email})`
  }

  return selectedUser.value.name || selectedUser.value.email || 'this user'
})

function canDeleteUser(user) {
  return canDeleteUsers.value && !isCurrentUser(user) && !isLastOrganizationAdmin(user)
}

function isCurrentUser(user) {
  const hasMatchingId = user.id !== undefined && auth.user?.id !== undefined && String(user.id) === String(auth.user.id)
  const hasMatchingEmail = !!user.email && user.email === auth.user?.email

  return hasMatchingId || hasMatchingEmail
}

function isLastOrganizationAdmin(user) {
  return user.role === 'admin' && adminUserCount.value <= 1
}

function submit() {
  sendingInvite.value = true
  
  inviteStore.store(email).then(() => {
    email.value = ''
    sendingInvite.value = false
  }).catch((error) => {
    sendingInvite.value = false
  })
}

function openDeleteModal(user) {
  if (!canDeleteUser(user)) return

  selectedUser.value = user
}

function closeDeleteModal() {
  if (isDeletingUser.value) return

  selectedUser.value = null
}

async function confirmDeleteUser() {
  if (!selectedUser.value || !canDeleteUser(selectedUser.value)) return

  isDeletingUser.value = true

  try {
    const response = await userStore.destroy(selectedUser.value.id)

    if (response.status >= 200 && response.status < 300) {
      selectedUser.value = null
      toast.success('User deleted.', {
        autoClose: 2500,
        position: 'top-center',
      })
      return
    }

    if (response.status === 403) {
      toast.error('You do not have permission to delete users.', {
        autoClose: 2500,
        position: 'top-center',
      })
      return
    }

    if (response.status === 404) {
      toast.error('User not found or unavailable.', {
        autoClose: 2500,
        position: 'top-center',
      })
      return
    }

    toast.error('Unable to delete user. Please try again.', {
      autoClose: 2500,
      position: 'top-center',
    })
  } catch (error) {
    toast.error('Unable to delete user. Please try again.', {
      autoClose: 2500,
      position: 'top-center',
    })
  } finally {
    isDeletingUser.value = false
  }
}

onMounted(() => {
  inviteStore.index()
  userStore.index()
})
</script>

<style lang="scss" scoped>
.app-action-icon--danger {
  color: var(--color-error);

  &:hover {
    background-color: alpha(var(--color-error), 0.1);
  }
}

.btn--destructive {
  background-color: var(--color-error);
  border-color: var(--color-error);
  color: var(--color-white);

  &:hover {
    background-color: alpha(var(--color-error), 0.85);
  }
}
</style>
