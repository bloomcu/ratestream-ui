<template>
  <div v-if="siteStore.site">
    <div class="card card--shadow margin-bottom-md">
      <div class="grid gap-sm">
        <div class="col-10 text-component">
          <span class="text-sm text-uppercase color-primary">Step 3</span>
          <h4>Launch</h4>
          <p>At the time of launch, DNS records for <strong>{{ siteStore.launch.prod_domain }}</strong> and <strong>www.{{ siteStore.launch.prod_domain }}</strong> will be changed.</p>
        </div>
        <div class="col-12 card card--dark text-component">
          <h5 class="margin-bottom-xxs">Point <strong>{{ siteStore.launch.prod_domain }}</strong> to <strong>{{ siteStore.launch.prod_ip }}</strong></h5>
          <p class="text-sm">Type “A”  |  Data "{{ siteStore.launch.prod_domain }}"  |  Name “@”</p>
          <div class="border-bottom margin-bottom-sm"></div>
          <h5 class="margin-bottom-xxs">Point <strong>www.{{ siteStore.launch.prod_domain }}</strong> to <strong>{{ siteStore.launch.prod_ip }}</strong></h5>
          <p class="text-sm">Type “A”  |  Data "www.{{ siteStore.launch.prod_domain }}"  |  Name “www”</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppList from '@/app/components/base/content/AppList.vue'
import { useSiteStore } from '@/domain/base/sites/store/useSiteStore'

const siteStore = useSiteStore()
</script>
