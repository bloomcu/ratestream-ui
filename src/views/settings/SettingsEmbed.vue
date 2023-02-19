<template>
  <LayoutDefault maxWidth="lg">
    <div class="grid gap-md margin-y-md">
      <div class="col-12">
        <h1 class="text-lg">Settings</h1>
      </div>
      
      <!-- <div class="col-4">
        <div class="text-component">
          <h4>Embed</h4>
          <p>[[ Insert description... ]]</p>
        </div>
      </div> -->
      
      <div class="col-8">
        <div class="card card--shadow">
          <div class="text-component border-bottom margin-bottom-md padding-bottom-md">
            <!-- Embed code -->
            <h5 class="text-bold margin-bottom-sm">Your embed code</h5>
            <p>[[ Insert instructions... ]]</p>
            <div class="bg-darker padding-md radius-md">
              [[ Insert embed code... ]]
            </div>
          </div>
          
          <div class="grid gap-md border-bottom margin-bottom-md padding-bottom-md">
            <h5 class="text-bold">Detailed instruction or FAQs...</h5>
            <div>
              <p>[[ Insert detailed instructions or FAQ(s) ]]</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>

<script setup>
import moment from "moment"
import { onMounted } from 'vue'
// import { useOrganizationStore } from '@/domain/base/organizations/store/useOrganizationStore'
import LayoutDefault from '@/app/layouts/LayoutDefault.vue'
// import UserAvatar from '@/domain/base/users/components/UserAvatar.vue'
// import AppChip from '@/app/components/base/chips/AppChip.vue'
// import ButtonDestroy from '@/app/components/base/buttons/ButtonDestroy.vue'
// import ButtonCopyToClipboard from '@/app/components/base/buttons/ButtonCopyToClipboard.vue'

// const organizationStore = useOrganizationStore()

onMounted(() => {
  // organizationStore.show()
})
</script>
