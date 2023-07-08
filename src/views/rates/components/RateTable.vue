<template>
  <div class="radius-lg border shadow-sm width-100% height-100% margin-bottom-md">
    <!-- Left and right -->
    <div class="rate-table flex flex-row justify-between width-100%">
      <table class="table table--expanded bg-light">
        <thead class="table__header table__header--sticky">
          <tr class="table__row">
            <th class="table__cell font-semibold padding-xs">Unique ID</th>
            <th v-for="column in rateStore.columns" :key="column.id" class="table__cell font-medium padding-xs">{{ column.name }}</th>
          </tr>
        </thead>

        <tbody class="table__body">
          <tr v-for="(row, rowIndex) in rateStore.rates" :key="rowIndex" class="table__row">
            <!-- Make this a component RateTableUID.vue -->
            <td class="table__cell font-semibold padding-xxs">
              <!-- <RateTableCellUid :editable="row.new" :uid="row.uid">
                {{ row.uid }}
              </RateTableCellUid> -->
              {{ row.uid }}
            </td>

            <td v-for="(column, index) in rateStore.columns" :key="index" class="table__cell">
              <RateTableCell v-model="row.data[column.name]" :disabled="!rateStore.isEditing">
                {{ row.data[column.name] }}
              </RateTableCell>

              <!-- <RateTableCell v-if="rateStore.isEditing" v-model="row.data[column.name]">
                {{ row.data[column.name] }}
              </RateTableCell>

              <span v-else>{{ row.data[column.name] }}</span> -->

              <!-- <CopyableTableCell :row="row" :column="column.name" /> -->
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Right - Add column -->
      <div v-if="rateStore.isEditing" @click="rateStore.addColumn()" class="bg-light border-left width-lg padding-xs hoverable text-center radius-lg radius-top-left-0 radius-bottom-right-0 radius-bottom-left-0">
        <IconPlus size="xs" style="position: sticky; top: 12px;"/>
      </div>
    </div>

    <!-- Bottom - Add row -->
    <div v-if="rateStore.isEditing" @click="rateStore.addRow()" class="border-top width-100% height-lg padding-xs flex flex-grow items-center hoverable" style="height: 48px;">
      <div class="flex items-center gap-xs">
        <IconPlus size="xs" />
        New row
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRateStore } from '@/domain/rates/store/useRateStore'
import RateTableCell from '@/views/rates/components/RateTableCell.vue'
// import RateTableCellUid from '@/views/rates/components/RateTableCellUid.vue'
import AppInput from '@/app/components/base/forms/AppInput.vue'
import IconPlus from '@/app/components/base/icons/IconPlus.vue'
import CopyableTableCell from './CopyableTableCell.vue'

const rateStore = useRateStore()
</script>

<style lang="scss" scoped>
.rate-table {
  background-color: #f2f3f3; 
}

.table__cell {
  box-sizing: border-box;
}

th.table__cell {
  background-color: #f2f3f3 !important;
}

.table__cell-embed-box {
  background-color: black;
  color: white;
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
</style>