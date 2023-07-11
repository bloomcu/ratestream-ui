<template>
  <div class="radius-lg border shadow-sm width-100% height-100% margin-bottom-md">
    <!-- Left and right -->
    <div class="rate-table flex flex-row justify-between width-100% radius-lg">
      <table class="table table--expanded bg-light">
        <thead class="table__header table__header--sticky">
          <tr class="table__row">
            <th class="table__cell font-semibold padding-xs">Unique ID</th>
            <th v-for="column in rateStore.columns" :key="column.id" class="table__cell font-medium padding-xs">
              <button v-if="rateStore.isEditing" @click="rateStore.deleteColumn(column.name)" class="reset position-absolute cursor-pointer color-contrast-low" style="right: 15px;">
                <IconTrash size="xs"/>
              </button>

              {{ column.name }}
            </th>
          </tr>
        </thead>

        <tbody class="table__body">
          <tr v-for="(row, rowIndex) in rateStore.rates" :key="rowIndex" class="table__row">
            <td class="table__cell padding-xxs color-contrast-low">
              <button v-if="rateStore.isEditing" @click="rateStore.deleteRate(row.uid)" class="reset position-absolute cursor-pointer" style="left: -33px;">
                <IconTrash size="xs"/>
              </button>
              
              <span>{{ row.uid }}</span>
            </td>

            <td v-for="(column, index) in rateStore.columns" :key="index" class="table__cell position-relative">
              <RateTableCell v-if="rateStore.isEditing" v-model="row.data[column.name]">
                {{ row.data[column.name] }}
              </RateTableCell>

              <CopyableTableCell v-else-if="row.data[column.name]" :row="row" :column="column.name" />
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
        Add row
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRateStore } from '@/domain/rates/store/useRateStore'
import RateTableCell from '@/views/rates/components/RateTableCell.vue'
import AppInput from '@/app/components/base/forms/AppInput.vue'
import IconPlus from '@/app/components/base/icons/IconPlus.vue'
import IconTrash from '@/app/components/base/icons/IconTrash.vue'
import CopyableTableCell from './CopyableTableCell.vue'

const rateStore = useRateStore()
</script>

<style lang="scss" scoped>
.rate-table {
  background-color: #f2f3f3;
}

.table__header--sticky .table__cell:first-child {
  border-radius: var(--radius-md);
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