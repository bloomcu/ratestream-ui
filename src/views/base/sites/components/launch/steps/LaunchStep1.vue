<template>
  <div v-if="siteStore.site">
    <div class="card card--shadow margin-bottom-md">
      <div class="grid gap-sm">
        <div class="col-10 text-component">
          <span class="text-sm text-uppercase color-primary">Step 1</span>
          <h4>Content freeze</h4>
        </div>
        <div class="col-12">
          <div class="card card--dark">
            <h3 class="text-base margin-bottom-xxs">
              {{ moment(siteStore.launch.freeze_date).format('dddd') }}, 
              {{ moment(siteStore.launch.freeze_date).format('LL') }}
            </h3>
            <p class="text-sm">
              {{ moment(siteStore.launch.freeze_date).format('h:mm A') }} (Mountain)
            </p>
          </div>
        </div>
        <div class="col-12 text-component">
          <p>At this time all changes within WordPress on the development site should stop.</p>
          <p><small>During the content freeze, your data is being migrated from <strong>{{ siteStore.launch.dev_domain }}</strong> to <strong>{{ siteStore.launch.prod_domain }}</strong>.</small></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment-timezone"
import { useSiteStore } from '@/domain/base/sites/store/useSiteStore'

const siteStore = useSiteStore()
</script>
