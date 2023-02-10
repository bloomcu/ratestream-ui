<template>
  <div class="card card--shadow margin-bottom-md">
    <div class="grid gap-sm">
      <div class="col-10 text-component">
        <span class="text-sm text-uppercase color-primary">Step 2</span>
        <h4>Pre-Launch</h4>
        <p>Before launch, we ensure the following is complete.</p>
      </div>
      <div class="grid gap-md">
        <div class="col-4">
          <p class="text-uppercase text-sm margin-bottom-sm border-bottom padding-bottom-xs">CMS</p>
          <AppList :list="[
            { content: 'Set favicon' },
            { content: 'Set admin email' },
            { content: 'Set comments to manual approval' },
            { content: 'Configure anti-spam and honeypot' },
          ]"/>
        </div>
        <div class="col-4">
          <p class="text-uppercase text-sm margin-bottom-sm border-bottom padding-bottom-xs">Plugins</p>
          <AppList :list="[
            { content: 'Akismet Anti-Spam' },
            { content: 'Image Compression' },
            { content: 'Stream User Tracking' },
            { content: 'Mailgun API' },
          ]"/>
        </div>
        <div class="col-4">
          <p class="text-uppercase text-sm margin-bottom-sm border-bottom padding-bottom-xs">Security</p>
          <AppList :list="[
            { content: 'Configure security' },
            { content: 'Whitelist internal IP’s' },
          ]"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppList from '@/app/components/base/content/AppList.vue'
</script>
