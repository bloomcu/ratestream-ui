<template>
  <LayoutDefault>
    <div class="container margin-top-md">
      <h2>Import CSV</h2>
    </div>
    
    <div class="container text-component margin-top-md">
      <p class="text-bold">CSV import requirements</p>
      <p>In order to successfully import a CSV, the CSV must follow these two rules:</p>
      <ol class="list list--ol">
        <li>Each row must have a unique row ID (for example, a unique name).</li>
        <li>There must be no empty columns or empty rows.</li>
      </ol>
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
