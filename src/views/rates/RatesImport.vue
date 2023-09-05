<template>
  <LayoutDefault>
    <div class="container margin-top-md">
      <h2>Import CSV</h2>
    </div>
    
    <!-- Under construction -->
    <!-- <div class="container margin-top-md">
      <aside class="note">
        <div class="flex items-center">
          <svg class="icon icon--md margin-right-sm" viewBox="0 0 30 30">
            <circle cx="15" cy="15" r="14" fill="var(--color-primary)" opacity=".2"></circle>
            <path fill="none" stroke="var(--color-primary)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13v9"></path>
            <circle cx="15" cy="8.5" r="1.5" fill="var(--color-primary)"></circle>
          </svg>

          <p class="note__title color-contrast-higher"><strong>CSV importing is under construction</strong></p>
        </div>

        <div class="flex margin-top-xxxs">
          <svg class="icon icon--md margin-right-sm" aria-hidden="true"></svg>

          <div class="note__content text-component">
            <p>We are currently updating the CSV import feature. You will be notified when it is available.</p>
          </div>
        </div>
      </aside>
    </div> -->

    <div class="container text-component margin-top-md">
      <p class="text-bold">CSV import requirements</p>
      <p>In order to successfully import a CSV, each row and column must have a unique ID.</p>
      <!-- <ol class="list list--ol">
        <li>Each row and column must have a unique ID.</li>
        <li>There must be no empty columns or empty rows.</li>
      </ol> -->
    </div>

    <div class="container margin-top-md">
      <Uploader/>
    </div>
  </LayoutDefault>
</template>

<script setup>
import LayoutDefault from '@/app/layouts/LayoutDefault.vue'
import Uploader from '@/views/rates/components/Uploader.vue'
</script>

<style lang="scss">
.note {
  background-color: var(--color-bg-light);
  border-left: 3px solid var(--color-primary);
  box-shadow: var(--shadow-sm);

  /* 👇 you can ovveride this padding using the padding utility classes */
  &:not([class^="padding-"]):not([class*=" padding-"]) {
    padding: var(--space-sm);
  }
}

.note--warning {
  border-left-color: var(--color-warning);
}

.note--error {
  border-left-color: var(--color-error);
}

.note--success {
  border-left-color: var(--color-success);
}

.text-component {
  /* reset in case the component is used inside a .text-component */
  .note__content > *:last-child {
    margin-bottom: 0;
  }

  .note__title {
    margin-bottom: 0;
  }
}
</style>