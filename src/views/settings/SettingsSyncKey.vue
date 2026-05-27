<template>
  <LayoutDefault maxWidth="md">
    <div class="margin-y-md">
      <RouterLink
        :to="{ name: 'settings', params: { organization: auth.organization } }"
        class="btn btn--subtle margin-bottom-md"
      >
        <IconAngleLeft size="xs" class="color-primary"/>
        <span class="margin-left-xxs">Settings</span>
      </RouterLink>

      <h1 class="text-lg">RateStream sync key</h1>
    </div>

    <div v-if="isForbidden" class="bg-error bg-opacity-10% border border-error border-opacity-30% padding-md radius-md" role="alert">
      <p class="text-bold margin-bottom-xxs">Permission required</p>
      <p>Only admins can manage the RateStream sync key.</p>
    </div>

    <div v-else class="grid gap-md">
      <div class="card card--shadow">
        <div class="text-component margin-bottom-md">
          <h4>Website sync</h4>
          <p>This key lets your WordPress site verify RateStream sync requests.</p>
        </div>

        <div class="border border-contrast-low border-opacity-30% padding-sm radius-md margin-bottom-md">
          <p class="text-sm color-contrast-low margin-bottom-xxs">Rates domain</p>
          <p v-if="isLoadingOrganization">Loading domain</p>
          <p v-else-if="ratesDomain" class="text-bold">{{ ratesDomain }}</p>
          <p v-else class="color-warning">
            No Rates domain is set. You can still manage the sync key, but sync jobs require a valid Rates domain.
          </p>
        </div>

        <div v-if="errorMessage" class="bg-error bg-opacity-10% border border-error border-opacity-30% padding-sm radius-md margin-bottom-md" role="alert">
          <div class="flex items-center justify-between gap-sm">
            <p>{{ errorMessage }}</p>
            <button
              type="button"
              class="btn btn--subtle btn--sm"
              :disabled="isLoadingKey || isRotating"
              @click="loadSyncKey"
            >
              Retry
            </button>
          </div>
        </div>

        <div v-if="!syncKey" class="flex gap-sm items-center">
          <button
            type="button"
            class="btn btn--primary"
            :disabled="isLoadingKey"
            @click="loadSyncKey"
          >
            <span v-if="isLoadingKey" class="flex gap-xs items-center">
              <AppCircleLoader/>
              Loading
            </span>
            <span v-else>Get sync key</span>
          </button>
        </div>

        <div v-else>
          <div v-if="keyCreated" class="bg-primary bg-opacity-10% border border-primary border-opacity-30% padding-sm radius-md margin-bottom-md" role="status">
            <p>This is the first generated key for this organization. Copy it into the WordPress/plugin setting.</p>
          </div>

          <div v-if="rotationSucceeded" class="bg-success bg-opacity-10% border border-success border-opacity-30% padding-sm radius-md margin-bottom-md" role="status">
            <p>The sync key was rotated. Update the WordPress/plugin setting with the new key.</p>
          </div>

          <div class="margin-bottom-md">
            <p class="text-sm color-contrast-low margin-bottom-xxs">Sync key</p>
            <div class="sync-key-value color-primary bg-primary bg-opacity-10% border border-primary border-opacity-60% padding-sm radius-md">
              {{ syncKey }}
            </div>
          </div>

          <div class="flex gap-sm flex-wrap">
            <button
              type="button"
              class="btn btn--primary"
              :disabled="isLoadingKey || isRotating"
              @click="copySyncKey"
            >
              Copy key
            </button>

            <button
              type="button"
              class="btn btn--accent"
              :disabled="isLoadingKey || isRotating"
              @click="openRotateModal"
            >
              <span v-if="isRotating" class="flex gap-xs items-center">
                <AppCircleLoader/>
                Rotating
              </span>
              <span v-else>Rotate key</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <AppModal
      size="xs"
      @closed="closeRotateModal"
      :class="isRotateModalOpen ? 'modal--is-visible' : ''"
    >
      <div class="margin-bottom-md">
        <h2 class="text-md margin-bottom-sm">Rotate sync key?</h2>
        <p>
          Rotating the key immediately invalidates the existing WordPress/plugin key.
          Sync requests will stop working until the WordPress/plugin setting is updated.
        </p>
      </div>

      <div v-if="errorMessage" class="bg-error bg-opacity-10% border border-error border-opacity-30% padding-sm radius-md margin-bottom-md" role="alert">
        <p>{{ errorMessage }}</p>
      </div>

      <div class="flex gap-md items-center justify-between">
        <button type="button" class="btn btn--accent" :disabled="isRotating" @click="closeRotateModal">
          Cancel
        </button>

        <button type="button" class="btn btn--primary" :disabled="isRotating" @click="rotateSyncKey">
          <span v-if="isRotating" class="flex gap-xs items-center">
            <AppCircleLoader/>
            Rotating
          </span>
          <span v-else>Rotate key</span>
        </button>
      </div>
    </AppModal>
  </LayoutDefault>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { rateApi as RateApi } from '@/domain/rates/api/rateApi'
import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'
import { organizationApi as OrganizationApi } from '@/domain/base/organizations/api/organizationApi'
import useClipboard from '@/app/composables/base/useClipboard'
import LayoutDefault from '@/app/layouts/LayoutDefault.vue'
import AppCircleLoader from '@/app/components/base/loaders/AppCircleLoader.vue'
import AppModal from '@/app/components/base/modals/AppModal.vue'
import IconAngleLeft from '@/app/components/base/icons/IconAngleLeft.vue'

const allowForbiddenResponse = (status) => (status >= 200 && status < 300) || status === 403

const auth = useAuthStore()
const { copyToClipboard } = useClipboard()

const syncKey = ref('')
const ratesDomain = ref('')
const keyCreated = ref(false)
const isLoadingOrganization = ref(false)
const isLoadingKey = ref(false)
const isRotating = ref(false)
const isRotateModalOpen = ref(false)
const permissionDenied = ref(false)
const errorMessage = ref('')
const rotationSucceeded = ref(false)

const canManageSyncKey = computed(() => {
  return ['admin', 'super_admin'].includes(auth.user?.role)
})

const isForbidden = computed(() => {
  return !canManageSyncKey.value || permissionDenied.value
})

onMounted(() => {
  loadOrganization()
})

async function loadOrganization() {
  if (!canManageSyncKey.value) return

  isLoadingOrganization.value = true
  permissionDenied.value = false

  try {
    const response = await OrganizationApi.show(auth.organization, {
      validateStatus: allowForbiddenResponse,
    })

    if (response.status === 403) {
      permissionDenied.value = true
      return
    }

    ratesDomain.value = response.data.data.rates_domain
  } catch (error) {
    ratesDomain.value = ''
  } finally {
    isLoadingOrganization.value = false
  }
}

async function loadSyncKey() {
  if (!canManageSyncKey.value) {
    permissionDenied.value = true
    return
  }

  isLoadingKey.value = true
  errorMessage.value = ''
  permissionDenied.value = false

  try {
    const response = await RateApi.getSyncKey(auth.organization)

    if (response.status === 403) {
      permissionDenied.value = true
      syncKey.value = ''
      isRotateModalOpen.value = false
      return
    }

    syncKey.value = response.data.data.key
    keyCreated.value = response.data.data.created
    rotationSucceeded.value = false
  } catch (error) {
    errorMessage.value = 'Unable to load the sync key. Try again.'
  } finally {
    isLoadingKey.value = false
  }
}

function copySyncKey() {
  if (!syncKey.value || isRotating.value) return

  copyToClipboard(syncKey.value)
  toast.success('Sync key copied', {
    autoClose: 2500,
    position: 'top-center',
  })
}

function openRotateModal() {
  errorMessage.value = ''
  isRotateModalOpen.value = true
}

function closeRotateModal() {
  if (isRotating.value) return
  isRotateModalOpen.value = false
}

async function rotateSyncKey() {
  if (!canManageSyncKey.value) {
    permissionDenied.value = true
    closeRotateModal()
    return
  }

  isRotating.value = true
  errorMessage.value = ''
  permissionDenied.value = false
  rotationSucceeded.value = false

  try {
    const response = await RateApi.rotateSyncKey(auth.organization)

    if (response.status === 403) {
      permissionDenied.value = true
      syncKey.value = ''
      isRotateModalOpen.value = false
      return
    }

    syncKey.value = response.data.data.key
    keyCreated.value = false
    rotationSucceeded.value = true
    isRotateModalOpen.value = false

    toast.success('Sync key rotated', {
      autoClose: 2500,
      position: 'top-center',
    })
  } catch (error) {
    errorMessage.value = 'Unable to rotate the sync key. Try again.'
  } finally {
    isRotating.value = false
  }
}
</script>

<style lang="scss" scoped>
.sync-key-value {
  font-family: var(--font-mono, monospace);
  line-height: 1.5;
  overflow-wrap: anywhere;
  word-break: break-word;
}
</style>
