<template>
  <table class="table table--expanded width-100%">
    <thead class="table__header">
      <tr class="table__row">
        <th class="table__cell font-semibold" scope="col">Unique ID</th>
        <th v-for="column in columns" :key="column.id" class="table__cell font-medium" scope="col">{{ column.name }}</th>
      </tr>
    </thead>
    <tbody class="table__body">
      <tr v-for="(row, index) in rows" :key="index" class="table__row">
        <td class="table__cell font-semibold">{{ row.uid }}</td>
        <td v-for="(column, index) in columns" :key="index" class="table__cell">
          <CopyableTableCell :row="row" :column="column.name" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import CopyableTableCell from './CopyableTableCell.vue'
const props = defineProps({
  columns: {
    type: Array
  },
  rows: {
    type: Array
  }
})

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