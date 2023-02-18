<template>
  <LayoutDefault>
    <div class="container flex items-center justify-between margin-y-md">
      <h1 class="text-lg">Current rates</h1>
      <!-- <button @click="rateStore.toggleEditPromptModal()" class="btn btn--primary">Edit</button> -->
      <router-link :to="{name: 'rates-import'}" class="btn btn--primary">Edit rates</router-link>
    </div>

    <!-- <div class="container">
      <DropFile/>
    </div> -->
    
    <div v-if="rateStore.rates" class="container margin-bottom-md">
      <!-- Render rates nested into groups from api -->
      <!-- <div v-for="(group, index) in rateStore.rates" :key="index" class="border-top border-right border-left _radius-md _margin-bottom-md">
        <RateGroupTable :group="group"/>
      </div> -->
      
      <!-- Render rates using filter in store -->
      <div v-if="rateStore.rates.groups" v-for="(group, index) in rateStore.rates.groups" :key="index" class="_border _radius-md _margin-bottom-md">
        <table class="cross-table">
          <tbody class="cross-table__body">
            <tr class="cross-table__row cross-table__row--w-full">
              <td class="cross-table__cell" style="width: 28%;">{{ group.title }}</td>
              <td class="cross-table__cell" style="width: 18%;">Unique Id</td>
              <td class="cross-table__cell" style="width: 18%;">Rate</td>
              <td class="cross-table__cell" style="width: 18%;">Term</td>
              <td class="cross-table__cell" style="width: 18%;">Year</td>
            </tr>

            <tr v-for="(rate, index) in rateStore.whereGroup(group.title)" :key="index" class="cross-table__row">
              <td class="cross-table__cell"></td>
              <td class="cross-table__cell">
                {{ rate.uid }}
                <!-- <AppInlineEditor :id="rate.id" @updated="">
                  {{ rate.uid }}
                </AppInlineEditor> -->
              </td>
              <td class="cross-table__cell">
                {{ rate.columns['rate'] }}
                <!-- <AppInlineEditor :id="rate.id" @updated="">
                  {{ rate.columns['rate'] }}
                </AppInlineEditor> -->
              </td>
              <td class="cross-table__cell">
                {{ rate.columns['term'] }}
                <!-- <AppInlineEditor :id="rate.id" @updated="">
                  {{ rate.columns['term'] }}
                </AppInlineEditor> -->
              </td>
              <td class="cross-table__cell">
                {{ rate.columns['year_low'] }}-{{ rate.columns['year_high'] }}
                <!-- <AppInlineEditor :id="rate.id" @updated="">
                  {{ rate.columns['year_low'] }}-{{ rate.columns['year_high'] }}
                </AppInlineEditor> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    
      <div v-if="rateStore.whereGroup(null).length" class="_border _radius-md _margin-bottom-md">
        <table class="cross-table">
          <tbody class="cross-table__body">
            <tr class="cross-table__row cross-table__row--w-full">
              <td class="cross-table__cell" style="width: 28%;">No group</td>
              <td class="cross-table__cell" style="width: 18%;">Unique Id</td>
              <td class="cross-table__cell" style="width: 18%;">Rate</td>
              <td class="cross-table__cell" style="width: 18%;">Term</td>
              <td class="cross-table__cell" style="width: 18%;">Year</td>
            </tr>

            <tr v-for="(rate, index) in rateStore.whereGroup(null)" :key="index" class="cross-table__row">
              <td class="cross-table__cell"></td>
              <td class="cross-table__cell">{{ rate.uid }}</td>
              <td class="cross-table__cell">{{ rate.columns['term'] }}</td>
              <td class="cross-table__cell">{{ rate.columns['rate'] }}</td>
              <td class="cross-table__cell">{{ rate.columns['year_low'] }}-{{ rate.columns['year_high'] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <EditPromptModal/>
  </LayoutDefault>
</template>

<script setup>
import moment from "moment"
import { ref, onMounted } from 'vue'
import { useRateStore } from '@/domain/rates/store/useRateStore'
import LayoutDefault from '@/app/layouts/LayoutDefault.vue'
import AppInlineEditor from '@/app/components/base/forms/AppInlineEditor.vue'
import EditPromptModal from '@/views/rates/modals/EditPromptModal.vue'
import RateGroupTable from '@/views/rates/components/RateGroupTable.vue'

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
