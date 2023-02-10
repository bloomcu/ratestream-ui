<template>
  <div v-if="siteStore.site">
    <div class="card card--shadow margin-bottom-md">
      <div class="grid gap-sm">
        <div class="col-10 text-component">
          <span class="text-sm text-uppercase color-primary">Step 4</span>
          <h4>Propagation</h4>
          <p>When we launch, you can watch the DNS record changes propagate across the globe using DNS checkers. We will be watching for the IP address: <strong>{{ siteStore.launch.prod_ip }}</strong>.</p>
        </div>
        <div class="col-12 card card--dark text-component">
          <h5 class="margin-bottom-xxs">{{ siteStore.launch.prod_domain }}</h5>
          <p class="text-sm"><a :href="`https://www.whatsmydns.net/#A/${siteStore.launch.prod_domain}`" target="_blank">DNS Checker 1</a> | <a :href="`https://dnschecker.org/#A/${siteStore.launch.prod_domain}`" target="_blank">DNS Checker 2</a></p>
          <div class="border-bottom margin-bottom-sm"></div>
          <h5 class="margin-bottom-xxs">www.{{ siteStore.launch.prod_domain }}</h5>
          <p class="text-sm"><a :href="`https://www.whatsmydns.net/#A/www.${siteStore.launch.prod_domain}`" target="_blank">DNS Checker 1</a> | <a :href="`https://dnschecker.org/#A/www.${siteStore.launch.prod_domain}`" target="_blank">DNS Checker 2</a></p>
        </div>
        <div class="col-12 text-component">
          <p><small>Propagation can take 5-20 minutes to see changes, and 2-24 hours to see global change.</small></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSiteStore } from '@/domain/base/sites/store/useSiteStore'

const siteStore = useSiteStore()
</script>
