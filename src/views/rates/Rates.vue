<template>
  <LayoutDefault>
    <div class="container flex items-center justify-between margin-y-md">
      <h1 class="text-lg">Current rates</h1>
      <router-link :to="{name: 'rates-import'}" class="btn btn--primary">Edit rates</router-link>
    </div>
    
    <div v-if="rateStore.rates" class="container margin-bottom-md">
      <RateTable :rates="rateStore.rates.rates"/>
    </div>
    
    <EditPromptModal/>
  </LayoutDefault>
</template>

<script setup>
import moment from "moment"
import { ref, onMounted } from 'vue'
import { useRateStore } from '@/domain/rates/store/useRateStore'
import LayoutDefault from '@/app/layouts/LayoutDefault.vue'
import EditPromptModal from '@/views/rates/modals/EditPromptModal.vue'
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
