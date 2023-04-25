<template>
  <LayoutDefault maxWidth="md">
    <div class="container margin-top-md">
      <h2>Settings</h2>
    </div>
    
    <div class="container margin-top-md">
      <div class="card card--shadow">
        <div class="text-component">
          <!-- Embed code -->
          <h4>Install RateStream on your website</h4>
          <p>To install RateStream on your website, place this script at the top of the <span class="text-bold color-primary">&lt;head&gt;</span> section just after any <span class="text-bold color-primary">&lt;meta&gt;</span> tags.</p>
          <div v-if="organizationStore.organization" class="flex flex-column position-relative color-primary bg-primary bg-opacity-10% border border-primary border-opacity-60% margin-top-sm padding-md radius-md">
            <span class="line-height-xl">
              &lt;script&gt;window.STREAM_ORGANIZATION="{{ organizationStore.organization.slug }}"&lt;/script&gt; <br>
              &lt;script async src="{{ componentsBaseUrl }}/assets/index.js"&gt;&lt;/script&gt;
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
import { computed, onMounted } from 'vue'
import { useOrganizationStore } from '@/domain/base/organizations/store/useOrganizationStore'
import LayoutDefault from '@/app/layouts/LayoutDefault.vue'
import ButtonCopyToClipboard from '@/app/components/base/buttons/ButtonCopyToClipboard.vue'

const componentsBaseUrl = import.meta.env.VITE_COMPONENTS_BASE_URL
const organizationStore = useOrganizationStore()

let embedCode = computed(() => {
  return `<script>window.STREAM_ORGANIZATION=\"${organizationStore.organization.slug}\"<\/script>\r\n<script src=\"${componentsBaseUrl}/assets\/index.js\"><\/script>`
})

onMounted(() => {
  organizationStore.show()
})
</script>
