<template>
  <LayoutDefault maxWidth="">
    <RatesSkeletonLoader v-if="rateStore.isLoading"/>

    <div v-else>

      <div v-if="!rateStore.isEditing" class="flex items-center justify-between margin-y-sm">
        <h3>Current rates</h3>
        <div class="flex gap-sm">
          <button @click="rateStore.toggleIsEditing()" class="btn btn--subtle">Edit</button>
          <router-link :to="{name: 'rates-import'}" class="btn btn--primary">Import</router-link>
        </div>
      </div>

      <div v-else class="bg-primary-lighter bg-opacity-20% padding-y-xs padding-x-sm radius-lg margin-y-sm" role="alert">
        <div class="flex items-center justify-between">
          <p>You are currently editing</p>
          <div class="flex gap-xs">
            <button @click="rateStore.cancelEditing()" class="btn btn--subtle">Cancel</button>
            <button @click="rateStore.batch()" class="btn btn--primary">Publish</button>
          </div>
        </div>
      </div>
      
      <div :class="{'padding-left-md': rateStore.isEditing}">
        <RateTable/>
      </div>
    </div>

    <!-- <div v-else class="text-component padding-md radius-lg bg-primary bg-opacity-5%">
      <h3>No rates</h3>
      <p>Let's import a CSV.</p>
      <router-link :to="{name: 'rates-import'}" class="btn btn--primary">Import CSV</router-link>
    </div> -->
  </LayoutDefault>
</template>

<script setup>
import moment from "moment"
import { ref, onMounted } from 'vue'
import { useRateStore } from '@/domain/rates/store/useRateStore'
import LayoutDefault from '@/app/layouts/LayoutDefault.vue'
import RatesSkeletonLoader from '@/views/rates/loaders/RatesSkeletonLoader.vue'
import RateTable from '@/views/rates/components/RateTable.vue'

const rateStore = useRateStore()

onMounted(() => {
  rateStore.index()
})
</script>

<style lang="scss">
.cross-table {
  position: relative;
  z-index: 1;
  width: 100%;

  .btn {
    width: 100%;
  }
}

.cross-table__icon { // e.g., checkbox icon
  --size: 20px;
}

// desktop only 👇
@include breakpoint(sm) {
  .cross-table {
    font-size: var(--text-sm);
  }

  .cross-table__row {
    .cross-table__cell:first-child {
      border-left-width: 0;
      // border-top-width: 0;
      width: 20%;
    }
  
    .cross-table__cell:last-child {
      border-right-width: 0;
    }
  }
  
  .cross-table__header {
    .cross-table__cell {
      border-top-width: 0;
    }
  }

  .cross-table__row--w-full { // row with cell spanning full width
    background-color: var(--color-bg-dark);
    
    .cross-table__cell {
      font-weight: 600;
    }
  }

  .cross-table__cell {
    border: 1px solid var(--color-bg-darker); // border style
    border-top-width: 0;
    padding: var(--space-xxs);
    // width: 25%;
    text-align: center;

    &:first-child {
      text-align: left;
    }
  }

  .cross-table__label { // inline copy of column headers (js-cross-table__label)
    display: none; // visible only in the card layout 👇
  }
}
</style>
