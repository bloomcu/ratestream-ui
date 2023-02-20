<template>
  <LayoutDefault maxWidth="md">
    <div class="container margin-top-md">
      <h2>Settings</h2>
    </div>
    
    <div class="container margin-top-md">
      <div class="card card--shadow">
        <div class="text-component">
          <!-- Embed code -->
          <h4>Your embed code</h4>
          <p>To install RateStream, place this script at the top of the <span class="text-bold color-primary">&lt;head&gt;</span> section just after any <span class="text-bold color-primary">&lt;meta&gt;</span> tags.</p>
          <div v-if="organizationStore.organization" class="flex flex-column position-relative color-primary bg-primary bg-opacity-10% border border-primary border-opacity-60% margin-top-sm padding-md radius-md">
            <span class="line-height-xl">
              &lt;script&gt;window.STREAM_ORGANIZATION="{{ organizationStore.organization.slug }}"&lt;/script&gt; <br>
              &lt;script async src="https://components.ratestream.io/assets/index.js"&gt;&lt;/script&gt;
            </span>            

            <ButtonCopyToClipboard :value="embedCode" class="btn btn--primary position-absolute top-xs right-xs">
              Copy to clipboard
            </ButtonCopyToClipboard>
          </div>
        </div>
        
        <!-- <div class="text-component">
          <h4>How do I manually install this tracking script onto my site?</h4>
          <div>
            <p>[[ Insert detailed instructions or FAQ(s) ]]</p>
          </div>
        </div> -->
      </div>
    </div>
  </LayoutDefault>
</template>

<script setup>
import moment from "moment"
import { computed, onMounted } from 'vue'
import { useOrganizationStore } from '@/domain/base/organizations/store/useOrganizationStore'
import LayoutDefault from '@/app/layouts/LayoutDefault.vue'
import ButtonCopyToClipboard from '@/app/components/base/buttons/ButtonCopyToClipboard.vue'

const organizationStore = useOrganizationStore()

let embedCode = computed(() => {
  return `<script>window.STREAM_ORGANIZATION=\"${organizationStore.organization.slug}\"<\/script>\r\n<script src=\"https:\/\/components.ratestream.io\/assets\/index.js\"><\/script>`
})

onMounted(() => {
  organizationStore.show()
})
</script>
