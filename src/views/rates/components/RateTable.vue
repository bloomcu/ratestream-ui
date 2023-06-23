<template>
  <div class="radius-lg border shadow-sm overflow-hidden width-100% height-100%">
    <!-- Left and right -->
    <div class="flex flex-row justify-between width-100%" style="background-color: #f2f3f3;">
      <table class="table table--expanded bg-light">
        <thead class="table__header">
          <tr class="table__row">
            <th class="table__cell font-semibold padding-xs" scope="col">Unique ID</th>
            <th v-for="column in rateStore.columns" :key="column.id" class="table__cell font-medium padding-xs" scope="col">{{ column.name }}</th>
          </tr>
        </thead>
        <tbody class="table__body">
          <tr v-for="(row, index) in rateStore.rates" :key="index" class="table__row">
            <td class="table__cell font-semibold padding-xs">{{ row.uid }}</td>
            <td v-for="(column, index) in rateStore.columns" :key="index" class="table__cell">
              <RateTableCell>
                {{ row.data[column.name] }}
              </RateTableCell>
              <!-- <CopyableTableCell :row="row" :column="column.name" /> -->
            </td>
            <!-- <td 
              v-for="(column, index) in rateStore.columns" 
              :key="index" 
              :contenteditable="isEditing"
              @click="onClick"
              @input="onInput"
              @blur="onBlur"
              @paste="onPaste"
              @keypress="onKeypress"
              :class="editableClasses"
              class="table__cell"
              ref="editableElement"
            >
              {{ row.data[column.name] }}
              <CopyableTableCell :row="row" :column="column.name" />
            </td> -->
          </tr>
        </tbody>
      </table>

      <div class="bg-light border-left width-lg padding-xs hoverable text-center">
        <IconPlus size="xs" />
      </div>
    </div>

    <!-- Bottom -->
    <div class="border-top width-100% height-lg padding-xs flex flex-grow items-center hoverable" style="height: 48px;">
      <div class="flex items-center gap-xs">
        <IconPlus size="xs" />
        New row
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRateStore } from '@/domain/rates/store/useRateStore'
// import useEditable from '@/app/composables/base/useEditable'
import RateTableCell from '@/views/rates/components/RateTableCell.vue'
import IconPlus from '@/app/components/base/icons/IconPlus.vue'
import CopyableTableCell from './CopyableTableCell.vue'

const rateStore = useRateStore()
// const { isEditing, editableElement, editableClasses, onClick, onInput, onBlur, onPaste, onKeypress } = useEditable()

// const props = defineProps({
//   columns: {
//     type: Array
//   },
//   rows: {
//     type: Array
//   }
// })
</script>

<style lang="scss" scoped>
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