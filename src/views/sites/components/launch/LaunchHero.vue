<template>
  <div v-if="siteStore.site">
    <!-- Title -->
    <div class="margin-bottom-md">
      <h3>Launch Dashboard</h3>
      <span>{{ siteStore.site.host }}</span>
    </div>
    
    <!-- Vitals -->
    <div class="grid gap-sm margin-bottom-lg">
      <div class="col">
        <div class="card card--shadow height-100% flex flex-column">
          <p class="text-sm margin-bottom-sm">Countdown</p>
          <LaunchCountdown :date="siteStore.launch.launch_date"/>
        </div>
      </div>
      <div class="col">
        <div class="card card--shadow height-100% flex flex-column">
          <p class="text-sm margin-bottom-sm">Launch date</p>
          <h3 class="font-normal color-primary margin-bottom-xxs">
            {{ moment(siteStore.launch.launch_date).format('dddd') }}, 
            {{ moment(siteStore.launch.launch_date).format('LL') }}
          </h3>
          <p class="text-sm">
            {{ moment(siteStore.launch.launch_date).format('h:mm A') }} (Mountain)
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment-timezone"
import { useSiteStore } from '@/domain/sites/store/useSiteStore'
import LaunchCountdown from '@/views/sites/components/launch/LaunchCountdown.vue'

const siteStore = useSiteStore()
</script>
