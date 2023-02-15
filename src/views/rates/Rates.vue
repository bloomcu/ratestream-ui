<template>
  <LayoutDefault v-if="rateStore.rates">
    <div class="container flex items-center justify-between margin-y-md">
      <h1 class="text-lg">Rates</h1>
    </div>

    <!-- <div class="container max-width-sm margin-bottom-md">
      <div v-for="rate in rateStore.rates" :key="rate.id" class="card card--shadow margin-bottom-sm">
        <div class="card-header">
          <p class="text-xs color-primary text-uppercase margin-bottom-xs">{{ rate.name }}</p>
          <h2 class="text-md margin-bottom-sm">{{ rate.rate }}</h2>
        </div>
      </div>
    </div> -->
    
    <div class="container">
      <div v-for="(group, index) in rateStore.rates" :key="index" class="border radius-md margin-bottom-md">
        <table class="cross-table">
          <!-- <thead class="cross-table__header">
            <tr class="cross-table__row">
              <th class="cross-table__cell" aria-hidden="true"></th>
              <th class="cross-table__cell">Name</th>
              <th class="cross-table__cell">Rate</th>
              <th class="cross-table__cell">Term</th>
              <th class="cross-table__cell">Year</th>
            </tr>
          </thead> -->
          
          <tbody class="cross-table__body">
            <tr class="cross-table__row cross-table__row--w-full">
              <td class="cross-table__cell" style="width: 20%;">Group</td>
              <td class="cross-table__cell" style="width: 20%;">Name</td>
              <td class="cross-table__cell" style="width: 20%;">Rate</td>
              <td class="cross-table__cell" style="width: 20%;">Term</td>
              <td class="cross-table__cell" style="width: 20%;">Year</td>
            </tr>

            <tr v-for="rate in group" class="cross-table__row">
              <td class="cross-table__cell"></td>
              <td class="cross-table__cell">{{ rate.name }}</td>
              <td class="cross-table__cell">{{ rate.term }}</td>
              <td class="cross-table__cell">{{ rate.rate }}</td>
              <td class="cross-table__cell">{{ rate.year_low }}-{{ rate.year_high }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </LayoutDefault>
</template>

<script setup>
import moment from "moment"
import { ref, onMounted } from 'vue'
import { useRateStore } from '@/domain/rates/store/useRateStore'

import LayoutDefault from '@/app/layouts/LayoutDefault.vue'

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
    padding: var(--space-xs);
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

// mobile only 👇
// @include breakpoint(sm, "not all") {
//   .cross-table {
//     display: block;
//     overflow: hidden;
// 
//     .btn {
//       font-size: var(--text-sm);
//     }
//   }
// 
//   .cross-table__header { // visually hidden - still accessible to SR
//     @include srHide;
//     height: 1px;
//     width: 1px;
//     overflow: hidden;
//   }
// 
//   .cross-table__body {
//     position: relative;
//     display: flex;
//     max-width: 100%;
//     overflow: auto;
//     padding: 32px 0 var(--space-sm); // padding-top must be equal to .cross-table__cell height
// 
//     &::-webkit-scrollbar { // custom scrollbar style
//       height: 10px;
//     }
// 
//     &::-webkit-scrollbar-track { // progress bar
//       background-color: var(--color-bg-dark);
//       border-radius: 50em;
//     }
// 
//     &::-webkit-scrollbar-thumb { // handle
//       background-color: alpha(var(--color-contrast-higher), 0.2);
//       border: 2px solid transparent;
//       background-clip: content-box;
//       border-radius: 50em;
//     }
// 
//     &::-webkit-scrollbar-thumb:hover {
//       background-color: alpha(var(--color-contrast-higher), 0.3);
//     }
// 
//     &::after { // right margin at end of scrolling area
//       content: '';
//       display: block;
//       height: 1px;
//       padding-left: 1px;
//     }
//   }
// 
//   .cross-table__row { // card
//     display: flex;
//     flex-direction: column;
//     width: 260px; // card width
//     flex-shrink: 0;
//     margin-right: var(--space-sm);
//   }
// 
//   .cross-table__cell {
//     --cell-border-width: 1px;
//     display: flex;
//     padding: var(--space-sm);
//     justify-content: space-between;
//     align-items: center;
//     min-height: 54px;
// 
//     text-align: left;
// 
//     background-color: var(--color-bg);
//     border-top-width: var(--cell-border-width);
//     border-left-width: var(--cell-border-width);
//     border-right-width: var(--cell-border-width);
//     border-style: solid;
//     border-color: alpha(var(--color-contrast-higher), 0.1);
// 
//     // &:first-child { // card title
//     //   border-left-width: var(--cell-border-width);
//     //   border-top-width: var(--cell-border-width);
//     //   border-radius: var(--radius-md) var(--radius-md) 0 0;
//     //   background-color: alpha(var(--color-contrast-higher), 0.075);
//     //   font-weight: 600;
//     //   color: var(--color-contrast-higher);
//     // }
// 
//     // &:last-child {
//     //   border-right-width: var(--cell-border-width);
//     //   border-bottom-width: var(--cell-border-width);
//     //   border-radius: 0 0 var(--radius-md) var(--radius-md);
//     // }
//   }
// 
//   .cross-table__label {
//     display: inline;
//     margin-right: var(--space-xs);
//   }
// 
//   .cross-table__row--w-full {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: auto;
// 
//     .cross-table__cell { // labels on top of the table
//       border: none; // reset
//       background-color: transparent;
//       font-weight: normal;
//       min-height: 0;
//       height: 32px; // must be equal to .cross-table__body padding-top
//       padding: 0 var(--space-sm);
//       font-size: var(--text-sm);
//       color: var(--color-contrast-medium);
//     }
//   }
// }
</style>
