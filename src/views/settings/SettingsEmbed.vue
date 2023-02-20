<template>
  <LayoutDefault maxWidth="sm">
    <div class="container margin-top-md">
      <h2>Settings</h2>
    </div>
    
    <div class="container margin-top-md">
      <div class="card card--shadow">
        <div class="text-component border-bottom margin-bottom-md padding-bottom-md">
          <!-- Embed code -->
          <h4>Your embed code</h4>
          <p>[[ Insert instructions... ]]</p>
          <div class="bg-darker padding-md radius-md">
            [[ Insert embed code... ]]
          </div>
        </div>
        
        <div class="text-component">
          <h4>Detailed instruction or FAQs...</h4>
          <div>
            <p>[[ Insert detailed instructions or FAQ(s) ]]</p>
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
