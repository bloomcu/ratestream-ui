<template>
  <div class="card card--shadow margin-bottom-md">
    <div class="grid gap-sm">
      <div class="col-10 text-component">
        <span class="text-sm text-uppercase color-primary">Step 5</span>
        <h4>Post-Launch</h4>
        <p>After launch, we ensure the following is complete. Then, we will send an email letting everyone involved know that the launch was successful.</p>
      </div>
      <div class="grid gap-md">
        <div class="col-4">
          <p class="text-uppercase text-sm margin-bottom-sm border-bottom padding-bottom-xs">CMS</p>
          <AppList :list="[
            { content: 'Allow search engine indexing' },
            { content: 'Test online banking' },
            { content: 'Setup GA/GTM' },
            { content: 'Enable uptime monitoring' },
            { content: 'Replace dev urls in database' },
          ]"/>
        </div>
        <div class="col-4">
          <p class="text-uppercase text-sm margin-bottom-sm border-bottom padding-bottom-xs">Plugins</p>
          <AppList :list="[
            { content: 'Enable Yoast' },
            { content: 'Enable backups' },
            { content: 'Index Algolia' },
          ]"/>
        </div>
        <div class="col-4">
          <p class="text-uppercase text-sm margin-bottom-sm border-bottom padding-bottom-xs">Server</p>
          <AppList :list="[
            { content: 'Test forced “https”' },
            { content: 'Check mixed content' },
            { content: 'Test 301 Redirects' },
          ]"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppList from '@/app/components/AppList.vue'
</script>
